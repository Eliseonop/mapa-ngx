import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelServiceAbstract } from '../../utils/services/model-abstract.service';
import { RecorridoModel, RecorridoResponse } from './recorrido.types';

@Injectable({
    providedIn: 'root',
})
export class RecorridoService extends ModelServiceAbstract<
    RecorridoModel,
    RecorridoResponse
> {
    url = 'api/rutas/recorridos';

    _service: HttpClient = this._httpClient;

    itemsFilters$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    constructor(private _httpClient: HttpClient) {
        super();
    }

    interfaceToModelAbstract(data: RecorridoResponse): RecorridoModel {
        return new RecorridoModel(data);
    }
}
