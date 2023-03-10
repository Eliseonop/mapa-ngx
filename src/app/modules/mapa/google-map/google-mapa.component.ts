import { MarkersModel } from './../service/markers.types';
import { RecorridoModel, Trayecto } from './../service/recorrido.types';
import { Polyline } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MarkersService } from '../service/markers.service';
import { GeocercasService } from '../service/geocercas.service';
import { RecorridoService } from '../service/recorrido.service';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import {
    MapRectangle,
    GoogleMap,
    MapCircle,
    MapPolyline,
    MapInfoWindow,
    MapMarker,
} from '@angular/google-maps';
import { MapaService } from '../mapa.service';
import { GeocercasModel } from '../service/geocercas.types';

@Component({
    selector: 'app-google-mapa',
    templateUrl: './google-mapa.component.html',
})
export class GoogleMapaComponent implements OnInit {
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
    @ViewChild('map', { static: false }) map: google.maps.Map;
    mapaCargado: boolean = false;
    mapaRenderizado: boolean = false;
    options: google.maps.MapOptions = {
        center: { lat: -11.9795, lng: -77.0657 },
        zoom: 14,
    };
    listPolylines: ModelPolylineGoogle[] = [];

    listMarkers: ModelMarkersGoogle[] = [];
    listGeocercas: ModelGeocercasGoogle[] = [];
    zoom = 13;

    constructor(
        private _recorridoService: RecorridoService,
        private _geocercasService: GeocercasService,
        private _markersService: MarkersService,
        private _mapaService: MapaService
    ) {}

    ngOnInit(): void {
        this._mapaService.getApiLoaded().subscribe({
            next: () => {
                this.mapaCargado = true;
                // console.log('mi mapa', this.map);
                // setTimeout(() => {

                // }, 1000);
                // aqui puedes inicializar el mapa
            },
        });
        // ir a peru al cargar el mapa
    }
    openInfoWindow(marker: MapMarker, content: string) {
        this.infoWindow.options = {
            content: content,
        };
        this.infoWindow.open(marker);

        // agregar el contenido del infoWindow
    }

    private subscribeToGeocercasServiceItems(): void {
        this._geocercasService.itemsFilters$.subscribe((data) => {
            if (data) {
                this.listGeocercas = this.mapDataToGeocercas(data);
            }
        });
    }
    tilesLoadesGo(): void {
        if (!this.mapaRenderizado) {
            this.subscribeToRecorridoServiceItems();
            this.subscribeToMarkersServiceItems();
            this.subscribeToGeocercasServiceItems();
            this.mapaRenderizado = true;
        }
        console.log('tilesLoadesGo');
    }

    mapDataToGeocercas(data: GeocercasModel[]): ModelGeocercasGoogle[] {
        return data.map((geocerca) => {
            return {
                center: {
                    lat: geocerca.latitud,
                    lng: geocerca.longitud,
                },
                radius: geocerca.radio,
                options: {
                    strokeColor: geocerca.lado ? '#ff0000' : '#0000ff',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    fillColor: geocerca.lado ? '#ff0000' : '#0000ff',
                    fillOpacity: 0.35,
                },
            };
        });
    }

    private subscribeToMarkersServiceItems(): void {
        this._markersService.itemsFilters$.subscribe((data) => {
            if (data) {
                this.listMarkers = this.mapDataToMarkers(data);
                console.log('listMarkers', this.listMarkers);
            }
        });
    }

    mapDataToMarkers(data: MarkersModel[]): ModelMarkersGoogle[] {
        return data.map((marker: MarkersModel) => {
            return {
                position: {
                    lat: marker.latitud,
                    lng: marker.longitud,
                },
                title: marker.nombre,

                options: {
                    label: {
                        text: marker.nombre,
                        color: '#000000',
                        className: 'bg-white p-1 rounded',
                    },

                    icon: {
                        url: 'https://png.pngtree.com/png-vector/20220821/ourmid/pngtree-map-icon-color-design-png-image_6119979.png',
                        labelOrigin: new google.maps.Point(20, 60),
                        scaledSize: new google.maps.Size(50, 50),
                        strokeColor: '#0000ff',
                        strokeWeight: 2,
                        fillColor: '#0000ff',
                    },
                },
                information: `
                <div>
                    <h3><strong>Nombre</strong> ${marker.nombre}</h3>
                    <p><strong>Codigo</strong> ${marker.ruta.codigo}</p>
                    <p><strong>Terminal</strong> ${marker.terminal}</p>
                </div>

                `,
            };
        });
    }

    private subscribeToRecorridoServiceItems(): void {
        this._recorridoService.itemsFilters$.subscribe((data) => {
            if (data) {
                this.listPolylines = this.mapDataToPolylinePoints(data);
                if (this.map && this.listPolylines.length > 0) {
                    const mybouns = new google.maps.LatLngBounds();

                    this.listPolylines[0].path.forEach((point) => {
                        mybouns.extend(point);
                    });
                    try {
                        this.map.fitBounds(mybouns, {
                            top: 100,
                        });
                    } catch (e) {
                        console.log('error', e);
                    }
                }
            }
        });
    }

    mapDataToPolylinePoints(data: RecorridoModel[]): ModelPolylineGoogle[] {
        return data.map((recorrido: RecorridoModel) => {
            return {
                path: recorrido.googleTrayecto.map(
                    (item) => new google.maps.LatLng(item)
                ),
                options: {
                    strokeColor: recorrido.lado ? '#ff0000' : '#0000ff',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    fillOpacity: 0.35,
                },
            };
        });
    }
}
interface ModelPolylineGoogle {
    path: google.maps.LatLng[];
    options: google.maps.PolylineOptions;
}

interface ModelMarkersGoogle {
    position: google.maps.LatLngLiteral;
    title: string;
    options: google.maps.MarkerOptions;
    information: string;
}
interface ModelGeocercasGoogle {
    center: google.maps.LatLngLiteral;
    radius: number;
    options: google.maps.CircleOptions;
}
