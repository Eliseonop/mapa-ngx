import { BehaviorSubject, filter } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RecorridoService } from '../service/recorrido.service';
import { GeocercasService } from '../service/geocercas.service';
import { MarkersService } from '../service/markers.service';

@Component({
    selector: 'app-modal-drag',
    templateUrl: './modal-drag.component.html',
    styleUrls: ['./modal-drag.component.scss'],
})
export class ModalDragComponent implements OnInit {
    form = this._formBuilder.group({
        id: [''],
        lado: [null as number],
        ruta: [null as number],
    });
    myListRecorridos = [];
    myListGeocercas = [];
    myListMarkers = [];
    listLadoOptions = [
        { id: 1, name: 'lado A' },
        { id: 2, name: 'lado B' },
    ];
    listRutas$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    constructor(
        private _recorridoService: RecorridoService,
        private _geocercasService: GeocercasService,
        private _markersService: MarkersService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.disableLadoFormControl();
        this.subscribeToRutaValueChanges();
        this.getMyList();
        this.getListRutas();
        this.subscribeToFormValueChanges();
    }

    private disableLadoFormControl(): void {
        this.form.get('lado').disable();
    }

    private subscribeToRutaValueChanges(): void {
        this.form.get('ruta').valueChanges.subscribe((value) => {
            if (value) {
                this.form.get('lado').enable();
            }
        });
    }

    private getMyList(): void {
        this._recorridoService.items$.subscribe((data) => {
            this.myListRecorridos = data;
        });
        this._geocercasService.getList().subscribe();
        this._geocercasService.items$.subscribe((data) => {
            this.myListGeocercas = data;
        });

        this._markersService.getList().subscribe();

        this._markersService.items$.subscribe((data) => {
            this.myListMarkers = data;
        });
    }

    private getListRutas(): void {
        this._recorridoService.getList().subscribe((data) => {
            const rutaOptions = data
                .map((item) => item.ruta)
                .filter(
                    (item, index, self) =>
                        self.findIndex((t) => t.id === item.id) === index
                );
            this.listRutas$.next(rutaOptions);
        });
    }

    private subscribeToFormValueChanges(): void {
        this.form.valueChanges.subscribe((value) => {
            let recorridosFilterList = this.myListRecorridos;
            let geocercasFilterList = this.myListGeocercas;
            let markersFilterList = this.myListMarkers;
            if (value.ruta) {
                recorridosFilterList = this.myListRecorridos.filter(
                    (item) => item.ruta.id === value.ruta
                );
                    
                geocercasFilterList = this.myListGeocercas.filter(
                    (item) => item.ruta.id === value.ruta
                );

                markersFilterList = this.myListMarkers.filter(
                    (item) => item.ruta.id === value.ruta
                );

                if (value.lado === 1) {
                    recorridosFilterList = recorridosFilterList.filter(
                        (item) => item.lado === false
                    );
                    geocercasFilterList = geocercasFilterList.filter(
                        (item) => item.lado === false
                    );
                }
                if (value.lado === 2) {
                    recorridosFilterList = recorridosFilterList.filter(
                        (item) => item.lado === true
                    );
                    geocercasFilterList = geocercasFilterList.filter(
                        (item) => item.lado === true
                    );
                }
            }
            this._recorridoService.itemsFilters$.next(recorridosFilterList);

            this._geocercasService.itemsFilters$.next(geocercasFilterList);

            this._markersService.itemsFilters$.next(markersFilterList);
        });
    }
}
