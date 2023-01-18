import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared/material.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';
import { mapaRoutes } from './mapa.routing';
import { ModalDragComponent } from './modal-drag/modal-drag.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SelectUtilModule } from '../utils/select-util/select-util.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapaComponent } from './mapa.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { LeafletMapaComponent } from './leaflet-recorridos/leaflet-mapa.component';
import { GoogleMapaComponent } from './google-map/google-mapa.component';
@NgModule({
    declarations: [
        LeafletMapaComponent,
        ModalDragComponent,
        GoogleMapaComponent,
        MapaComponent,
    ],
    imports: [
        RouterModule.forChild(mapaRoutes),
        CommonModule,
        MaterialModule,
        DragDropModule,
        MatSlideToggleModule,
        LeafletModule,
        SelectUtilModule,
        GoogleMapsModule,
        FormsModule,
    ],
})
export class MapaModule {}
