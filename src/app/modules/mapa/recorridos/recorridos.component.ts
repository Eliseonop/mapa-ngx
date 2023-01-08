import { GeocercasModel } from '../service/geocercas.types';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RecorridoService } from '../service/recorrido.service';
import {
    tileLayer,
    latLng,
    LatLngExpression,
    circle,
    polygon,
    marker,
    polyline,
    Polyline,
    PolylineOptions,
    LatLngBounds,
    Bounds,
    Circle,
    Marker,
} from 'leaflet';
import { GeocercasService } from '../service/geocercas.service';
import { MarkersService } from '../service/markers.service';
import { MarkersModel } from '../service/markers.types';

@Component({
    selector: 'app-recorridos',
    templateUrl: './recorridos.component.html',
    styleUrls: ['./recorridos.component.scss'],
})
export class RecorridosComponent implements OnInit {
    // Propiedades del mapa
    layers: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    listPolylinePoints = [];
    listCirclePoints = [];
    listMarkersPoints = [];
    // listaRecorridos: any[] = [];
    options = {
        layers: [
            tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }),
        ],
        zoom: 13,
        center: latLng(-11.9795, -77.0657),
    };

    bounds: any = null;

    constructor(
        private recorridoService: RecorridoService,
        private geocercasService: GeocercasService,
        private markersService: MarkersService
    ) {}

    ngOnInit(): void {
        this.layers.next([
            new Marker([-11.9795, -77.0657], { title: 'Mi posición'
            
        }),
            new Circle([-11.9795, -77.0657], { radius: 3000 }),
            new Circle([-11.9195, -77.0157], { radius: 1200 }),
        ]);

        this.subscribeToRecorridoServiceItems();
        this.subscribeToGeocercasServiceItems();
        this.subscribeToMarkersServiceItems();
    }
    private subscribeToMarkersServiceItems(): void {
        this.markersService.itemsFilters$.subscribe((data) => {
            if (data) {
                this.listMarkersPoints = this.mapDataToMarkersPoints(data);
                this.layers.next(
                    this.layers.value.concat(
                        this.mapMarkersPointsToLayers(this.listMarkersPoints)
                    )
                );
            }
        });
    }
    private subscribeToGeocercasServiceItems(): void {
        this.geocercasService.itemsFilters$.subscribe((data) => {
            if (data) {
                this.listCirclePoints = this.mapDataToCirclePoints(data);
                this.layers.next(
                    this.layers.value.concat(
                        this.mapCirclePointsToLayers(this.listCirclePoints)
                    )
                );
            }
        });
    }
    private mapDataToMarkersPoints(data: MarkersModel[]): any[] {
        return data.map((marker) => {
            return {
                latLng: [marker.latitud, marker.longitud],
                option: {
                    title: marker.nombre,
                },
            };
        });
    }

    private mapMarkersPointsToLayers(markersPoints: any[]): any[] {
        return markersPoints.map((d) => {
            return new Marker(d.latLng, d.option);
        });
    }

    private mapDataToCirclePoints(data: GeocercasModel[]): any[] {
        return data.map((geocerca) => {
            return {
                latLng: [geocerca.latitud, geocerca.longitud],
                option: {
                    color: geocerca.lado ? 'red' : 'blue',
                    radius: geocerca.radio,
                },
            };
        });
    }
    mapCirclePointsToLayers(circlePoints: any[]): any[] {
        return circlePoints.map((d) => {
            return new Circle(d.latLng, d.option);
        });
    }

    private subscribeToRecorridoServiceItems(): void {
        this.recorridoService.itemsFilters$.subscribe((data) => {
            if (data) {
                this.listPolylinePoints = this.mapDataToPolylinePoints(data);
                this.layers.next(
                    this.mapPolylinePointsToLayers(this.listPolylinePoints)
                );
            }
        });
    }

    mapDataToPolylinePoints(data: any[]): any[] {
        return data.map((recorrido) => {
            return {
                trayecto: recorrido.letafletTrayecto,
                option: {
                    color: recorrido.lado ? 'red' : 'blue',
                    weight: 5,
                },
            };
        });
    }

    mapPolylinePointsToLayers(polylinePoints: any[]): any[] {
        return polylinePoints.map((d) => {
            const newPolyline = new Polyline(d.trayecto, d.option);
            const goBounds = newPolyline.getBounds();
            this.bounds = goBounds;
            return newPolyline;
        });
    }
}
