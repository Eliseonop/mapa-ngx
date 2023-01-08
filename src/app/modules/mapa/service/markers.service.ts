import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelServiceAbstract } from '../../utils/services/model-abstract.service';
import { BehaviorSubject } from 'rxjs';
import { MarkersModel, MarkersResponse } from './markers.types';

@Injectable({
    providedIn: 'root',
})
export class MarkersService extends ModelServiceAbstract<
    MarkersModel,
    MarkersResponse
> {
    url = 'api/rutas/markers';

    itemsFilters$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    _service: HttpClient = this._httpClient;

    constructor(private _httpClient: HttpClient) {
        super();
    }

    interfaceToModelAbstract(data: MarkersResponse): MarkersModel {
        return new MarkersModel(data);
    }
}
