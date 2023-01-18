import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
    BehaviorSubject,
    Observable,
    catchError,
    map,
    of,
    shareReplay,
    tap,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MapaService {
    url = `https://maps.googleapis.com/maps/api/js?key=${environment.API_KEY_MAPS}`;
    apiLoaded$: Observable<any>;

    constructor(private _httpClient: HttpClient) {}

    getApiLoaded(): Observable<any> {
        if (!this.apiLoaded$) {
            this.apiLoaded$ = this._httpClient.jsonp(this.url, 'callback').pipe(
                tap((data) => {
                    // aqui se carga el mapa
                    console.log('holaaaa');
                }),
                shareReplay(1)
            );
        }
        return this.apiLoaded$;
    }
}
