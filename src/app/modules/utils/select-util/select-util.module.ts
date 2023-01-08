import { MaterialModule } from './../../../shared/material.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectUtilComponent } from './select-util.component';

@NgModule({
    declarations: [SelectUtilComponent],
    imports: [CommonModule, MaterialModule,SharedModule],
    exports: [SelectUtilComponent],
})
export class SelectUtilModule {}
