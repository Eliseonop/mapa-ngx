import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { FuseMockApiUtils } from '@fuse/lib/mock-api';
import { recorridosData, geocercasData } from './data';
import { markersData } from './data-markers';

@Injectable({
    providedIn: 'root',
})
export class RutasApi {
    private _recorridosData: any[] = recorridosData;
    private _geocercasData: any[] = geocercasData;
    private _markersData: any[] = markersData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        /**
         * Get recorridos
         */
        this._fuseMockApiService
            .onGet('api/rutas/recorridos')
            .reply(() => [200, cloneDeep(this._recorridosData)]);

        /**
         * Get Geocercas
         */
        this._fuseMockApiService
            .onGet('api/rutas/geocercas')
            .reply(() => [200, cloneDeep(this._geocercasData)]);

        //peticion para obtener geocercas por id

        /**
         * Get geocerca by id
         */
        this._fuseMockApiService
            .onGet('api/rutas/geocercas/:id')
            .reply(({ request }) => {
                const id = request.params.get('id');
                const geocerca = this._geocercasData.find(
                    (geocerca) => geocerca.id === id
                );
                return [200, cloneDeep(geocerca)];
            });

        /**
         * Get markers
         */
        this._fuseMockApiService
            .onGet('api/rutas/markers')
            .reply(() => [200, cloneDeep(this._markersData)]);

        // this._fuseMockApiService
        //     .onPost('api/rutas/recorridos')
        //     .reply(({ request }) => {
        //         // Create a new label
        //         const recorrido = {
        //             id: FuseMockApiUtils.guid(),
        //             title: request.body.title,
        //         };

        //         // Update the labels
        //         this._recorridosData.push(recorrido);

        //         return [200, cloneDeep(recorrido)];
        //     });
    }
}
