import { ModelExtends } from './../services/model-abstract.types';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, BehaviorSubject } from 'rxjs';
import { ModelServiceAbstract } from '../services/model-abstract.service';

@Component({
    selector: 'app-select-util',
    templateUrl: './select-util.component.html',
    styleUrls: ['./select-util.component.scss'],
})
export class SelectUtilComponent<IModel extends ModelExtends, Response>
    implements OnInit
{
    @ViewChild(MatSelect) select: MatSelect;
    @Input() form: FormGroup = this._formBuilder.group({
        name: [null as any],
    });
    @Input() label: string = 'name';
    @Input() nameControl: string;
    @Input() optionName: string = 'name';
    @Input() optionsArray: IModel[] = [];
    @Input() optionsArrayObservable: Observable<any>;
    @Input() service: ModelServiceAbstract<IModel, Response>;
    options: BehaviorSubject<IModel[]> = new BehaviorSubject<IModel[]>(null);
    constructor(private _formBuilder: FormBuilder) {}
    ngOnInit(): void {
        // console.log(this.select);
        if (this.optionsArrayObservable) {
            this.optionsArrayObservable.subscribe({
                next: (data) => {
                    this.options.next(data);
                },
            });
        }

        if (this.service) {
            // this.service.getList().subscribe();

            this.service.items$.subscribe((data) => {
                this.options.next(data);
            });
            this.service.getList().subscribe();
        }
        // if (this.optionsArray) {
        //     this.options.next(this.optionsArray);
        // }
    }
}
