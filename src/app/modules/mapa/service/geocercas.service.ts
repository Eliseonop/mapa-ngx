import { GeocercasModel,GeocercasResponse } from './geocercas.types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelServiceAbstract } from '../../utils/services/model-abstract.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeocercasService extends ModelServiceAbstract<
    GeocercasModel,
    GeocercasResponse
> {
    url = 'api/rutas/geocercas';

    itemsFilters$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    _service: HttpClient = this._httpClient;

    constructor(private _httpClient: HttpClient) {
        super();
    }

    interfaceToModelAbstract(data: GeocercasResponse): GeocercasModel {
        return new GeocercasModel(data);
    }
}
