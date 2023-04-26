import { Component, OnInit } from '@angular/core'
import {
    Circle,
    CircleOptions,
    divIcon,
    LatLng,
    Marker,
    Polyline,
    PolylineOptions,
    tileLayer
} from 'leaflet'
import { BehaviorSubject } from 'rxjs'

import { GeocercasService } from '../service/geocercas.service'
import { GeocercasModel } from '../service/geocercas.types'
import { MarkersService } from '../service/markers.service'
import { MarkersModel } from '../service/markers.types'
import { RecorridoService } from '../service/recorrido.service'
import { MapOptions } from 'leaflet'

@Component({
    selector: 'app-leaflet-map',
    templateUrl: './leaflet-mapa.component.html',
    styleUrls: ['./leaflet-mapa.component.scss']
})
export class LeafletMapaComponent implements OnInit {
    // Propiedades del mapa
    layers: BehaviorSubject<any> = new BehaviorSubject<any>([])
    listPolylinePoints: BehaviorSubject<any> = new BehaviorSubject<any>([])
    listCirclePoints: BehaviorSubject<any> = new BehaviorSubject<any>([])
    listMarkersPoints: BehaviorSubject<any> = new BehaviorSubject<any>([])
    // listaRecorridos: any[] = [];
    options: MapOptions

    bounds: any = null
    constructor (
        private recorridoService: RecorridoService,
        private geocercasService: GeocercasService,
        private markersService: MarkersService
    ) {}

    ngOnInit (): void {
        this.options = {
            layers: [
                tileLayer(
                    'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxpc2VvZGV2IiwiYSI6ImNsZ3hzYTlqMzAyaG4zZm1wbmRoNHRzc3gifQ.g3WxzUD3kbWdLM-kY88Vdw',
                    {
                        maxZoom: 18,
                        attribution:
                            '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                        tileSize: 512,
                        zoomOffset: -1
                    }
                )
            ],
            zoom: 13,
            center: { lat: -12.0432, lng: -77.0282 }
        }

        this.subscribeToGeocercasServiceItems()
        this.subscribeToMarkersServiceItems()
        this.subscribeToRecorridoServiceItems()
    }

    private subscribeToGeocercasServiceItems (): void {
        this.geocercasService.itemsFilters$.subscribe(data => {
            if (data) {
                const myCircles = this.mapDataToCirclePoints(data)
                this.listCirclePoints.next(
                    this.mapCirclePointsToLayers(myCircles)
                )
            }
        })
    }
    private subscribeToMarkersServiceItems (): void {
        this.markersService.itemsFilters$.subscribe(data => {
            if (data) {
                const myMarkers = this.mapDataToMarkersPoints(data)

                this.listMarkersPoints.next(
                    this.mapMarkersPointsToLayers(myMarkers)
                )
            }
        })
    }
    private mapDataToMarkersPoints (data: MarkersModel[]): MarketLeafletModel[] {
        return data.map(marker => {
            return {
                latLng: [marker.latitud, marker.longitud],
                option: {
                    title: marker.nombre
                },
                orden: marker.orden ? marker.orden : 0,
                information: `
                <div>
                    <h3><strong>Nombre</strong> ${marker.nombre} </h3>
                    <div><strong>Ruta</strong> ${marker.ruta.codigo} </div>
                </div>
                `
            }
        })
    }

    private mapMarkersPointsToLayers (markersPoints: any[]): Marker[] {
        return markersPoints.map(d => {
            const myMarker = new Marker(d.latLng, d.option)
            myMarker.bindPopup(d.information, {
                offset: [0, -30]
            })
            // myMarker
            //     .bindTooltip(d.option.title, {
            //         permanent: true,
            //         className: 'bold',
            //         offset: [0, 0],
            //     })
            //     .openTooltip();
            const myBus = 'bus-verde'
            const myIcon = divIcon({
                className: 'bg-transparent ',
                html: `<img class="relative -top-10 -left-2" src="../../../../assets/bus/${myBus}.png" />
                        <span class="text-black absolute -top-4 left-1 ">${d.orden}</span>`

                // hacer que el icono se vea en arriva de la posicion
            })
            myMarker.setIcon(myIcon)
            return myMarker
        })
    }

    private mapDataToCirclePoints (
        data: GeocercasModel[]
    ): CircleLeafletModel[] {
        return data.map(geocerca => {
            return {
                latLng: [geocerca.latitud, geocerca.longitud],
                option: {
                    color: geocerca.lado ? 'red' : 'blue',
                    radius: geocerca.radio
                }
            }
        })
    }
    mapCirclePointsToLayers (circlePoints: any[]): Circle[] {
        return circlePoints.map(d => {
            return new Circle(d.latLng, d.option)
        })
    }

    private subscribeToRecorridoServiceItems (): void {
        this.recorridoService.itemsFilters$.subscribe(data => {
            if (data) {
                const myRecorridos = this.mapDataToPolylinePoints(data)
                this.listPolylinePoints.next(
                    this.mapPolylinePointsToLayers(myRecorridos)
                )
            }
        })
    }

    mapDataToPolylinePoints (data: any[]): PolylineLeafletModel[] {
        return data.map(recorrido => {
            return {
                trayecto: recorrido.letafletTrayecto,
                option: {
                    color: recorrido.lado ? 'red' : 'blue',
                    weight: 5
                }
            }
        })
    }

    mapPolylinePointsToLayers (
        polylinePoints: PolylineLeafletModel[]
    ): Polyline[] {
        return polylinePoints.map(d => {
            const newPolyline = new Polyline(d.trayecto, d.option)
            const goBounds = newPolyline.getBounds()
            this.bounds = goBounds
            return newPolyline
        })
    }
}

interface MarketLeafletModel {
    latLng: number[]
    option: any
}

interface CircleLeafletModel {
    latLng: number[]
    option: CircleOptions
}

interface PolylineLeafletModel {
    trayecto: LatLng[]
    option: PolylineOptions
}
