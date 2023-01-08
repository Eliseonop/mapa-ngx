import { ModelExtends } from '../../utils/services/model-abstract.types';

export class GeocercasModel implements ModelExtends {
    id: number;
    activo: boolean;
    audio: string;
    control: boolean;
    datear: boolean;
    desde: Date;
    hasta: null;
    lado: boolean;
    latitud: number;
    liquidar: boolean;
    longitud: number;
    metros: number;
    nombre: string;
    orden: number;
    radio: number;
    refrecuenciar: boolean;
    retorno: boolean;
    ruta: Ruta;
    sagrado: boolean;
    terminal: boolean;
    timestamp: Date;

    constructor(data: GeocercasResponse) {
        this.id = data.id;
        this.activo = data.activo;
        this.audio = data.audio;
        this.control = data.control;
        this.datear = data.datear;
        this.desde = data.desde;
        this.hasta = data.hasta;
        this.lado = data.lado;
        this.latitud = data.latitud;
        this.liquidar = data.liquidar;
        this.longitud = data.longitud;
        this.metros = data.metros;
        this.nombre = data.nombre;
        this.orden = data.orden;
        this.radio = data.radio;
        this.refrecuenciar = data.refrecuenciar;
        this.retorno = data.retorno;
        this.ruta = data.ruta;
        this.sagrado = data.sagrado;
        this.terminal = data.terminal;
        this.timestamp = data.timestamp;
    }

    toStringSearch(): string {
        return '';
    }

    toForm(): any {}
}

export interface GeocercasResponse {
    id: number;
    activo: boolean;
    audio: string;
    control: boolean;
    datear: boolean;
    desde: Date;
    hasta: null;
    lado: boolean;
    latitud: number;
    liquidar: boolean;
    longitud: number;
    metros: number;
    nombre: string;
    orden: number;
    radio: number;
    refrecuenciar: boolean;
    retorno: boolean;
    ruta: Ruta;
    sagrado: boolean;
    terminal: boolean;
    timestamp: Date;
}

export interface Ruta {
    id: number;
    codigo: string;
}
