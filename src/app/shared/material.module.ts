import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
    exports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatLuxonDateModule,
        MatChipsModule,
        MatTableModule,
        MatTooltipModule
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatLuxonDateModule,
        MatChipsModule,
        MatTableModule,
        MatTooltipModule
    ],
})
export class MaterialModule {}
