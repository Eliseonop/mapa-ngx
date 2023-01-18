import { Component } from '@angular/core';

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
})
export class MapaComponent {

    public changeMap: boolean = false;


    cambiarEstadoMapa() {
        this.changeMap = !this.changeMap;
    }
}
