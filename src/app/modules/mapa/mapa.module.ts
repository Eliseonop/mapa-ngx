import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecorridosComponent } from './recorridos/recorridos.component';
import { MaterialModule } from 'app/shared/material.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';
import { mapaRoutes } from './mapa.routing';
import { ModalDragComponent } from './modal-drag/modal-drag.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SelectUtilModule } from '../utils/select-util/select-util.module';

@NgModule({
  declarations: [
    RecorridosComponent,
    ModalDragComponent
  ],
  imports: [
    RouterModule.forChild(mapaRoutes),
    CommonModule,
    MaterialModule,
    DragDropModule,
    LeafletModule,
    SelectUtilModule
  ]
})
export class MapaModule { }
