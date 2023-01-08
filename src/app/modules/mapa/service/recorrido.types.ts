import { ModelExtends } from "app/modules/utils/services/model-abstract.types";


export class RecorridoModel implements ModelExtends {
    id: number;
    ruta: Ruta;
    lado: boolean;
    trayecto: Trayecto[];

    constructor(data: RecorridoResponse) {
        this.id = data.id;
        this.ruta = data.ruta;
        this.lado = data.lado;
        this.trayecto = data.trayecto;
    }

    get letafletTrayecto(): any {
        const orden = this.trayecto.sort((a, b) => a.orden - b.orden);

        return orden.map((trayecto) => {
            return { lat: trayecto.latitud, lng: trayecto.longitud };
        });
    }

    get optionNameRuta (): string {
        return this.ruta?.codigo;
    }

    toStringSearch(): string {
        return '';
    }

    toForm(): any {
        return {
            id: this.id,
            ruta: this.ruta,
            lado: this.lado,
            trayecto: this.trayecto,
        };
    }
}

export interface RecorridoResponse {
    id: number;
    ruta: Ruta;
    lado: boolean;
    trayecto: Trayecto[];
}

export interface Ruta {
    id: number;
    codigo: string;
}

export interface Trayecto {
    orden: number;
    latitud: number;
    longitud: number;
}
