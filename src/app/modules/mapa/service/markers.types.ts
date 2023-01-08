import { ModelExtends } from "app/modules/utils/services/model-abstract.types";

export class MarkersModel implements ModelExtends {

    id: number;
    activo: boolean;
    audio: string;
    lado: boolean;
    latitud: number;
    liquidar: boolean;
    longitud: number;
    metros: number;
    nombre: string;
    orden: number;
    radio: number;
    ruta: Ruta;
    terminal: boolean;
    velocidad: number;
    timestamp: Date;
    tarifas: any[];

    constructor(data: MarkersResponse) {
        this.id = data.id;
        this.activo = data.activo;
        this.audio = data.audio;
        this.lado = data.lado;
        this.latitud = data.latitud;
        this.liquidar = data.liquidar;
        this.longitud = data.longitud;
        this.metros = data.metros;
        this.nombre = data.nombre;
        this.orden = data.orden;
        this.radio = data.radio;
        this.ruta = data.ruta;
        this.terminal = data.terminal;
        this.velocidad = data.velocidad;
        this.timestamp = data.timestamp;
        this.tarifas = data.tarifas;
    }

    toStringSearch(): string {
        return '';
    }

    toForm(): any {}

}


export interface MarkersResponse {
    id:        number;
    activo:    boolean;
    audio:     string;
    lado:      boolean;
    latitud:   number;
    liquidar:  boolean;
    longitud:  number;
    metros:    number;
    nombre:    string;
    orden:     number;
    radio:     number;
    ruta:      Ruta;
    terminal:  boolean;
    velocidad: number;
    timestamp: Date;
    tarifas:   any[];
}

export interface Ruta {
    id:     number;
    codigo: string;
}
