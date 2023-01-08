import { HttpClient } from '@angular/common/http';
import {
    tap,
    Observable,
    BehaviorSubject,
    map,
    shareReplay,
} from 'rxjs';
import { ModelExtends } from './model-abstract.types';

export abstract class ModelServiceAbstract<
    ModelClass extends ModelExtends,
    Response
> {
    itemsQuery: BehaviorSubject<ModelClass[]> = new BehaviorSubject([]);
    itemCache$: Observable<ModelClass[]>;
    items$: BehaviorSubject<ModelClass[]> = new BehaviorSubject([]);
    list: ModelClass[];
    oneItem: BehaviorSubject<ModelClass | null> = new BehaviorSubject(null);

    name: string;
    itemsSearch = this.items$.value;

    abstract url: string;
    abstract _service: HttpClient;

    constructor() {}

    getList(): Observable<ModelClass[]> {
        if (!this.itemCache$) {
            this.itemCache$ = this.refreshList().pipe(shareReplay(1));
        }
        return this.itemCache$;
    }
    refreshList(): Observable<ModelClass[]> {
        return this._service.get<Response[]>(this.url).pipe(
            map(res =>
                res.map(item => this.interfaceToModelAbstract(item))
            ),
            tap((data) => {
                this.list = data;
                this.items$.next(data);
            })
        );
    }

    getListQuery(query?: string): Observable<ModelClass[]> {
        const url = query ? `${this.url}${query}` : this.url;
        return this._service.get<Response[]>(url).pipe(
            map(res =>
                res.map(item => this.interfaceToModelAbstract(item))
            ),

            tap((res) => {
                this.itemsQuery.next(res);
            }),
            shareReplay(1)
        );
    }
    createItem(data: any): Observable<ModelClass> {
        return this._service.post<Response>(this.url, data).pipe(
            map(res => this.interfaceToModelAbstract(res)),
            tap((res) => {
                this.items$.next([...this.items$.value, res]);
            })
        );
    }
    deleteItem(data: ModelClass): Observable<Response> {
        return this._service.delete<Response>(`${this.url}/${data.id}`).pipe(
            tap(() => {
                const newItems = this.items$.value.filter(
                    item => item.id !== data.id
                );
                this.items$.next(newItems);
            })
        );
    }
    getItemById(id: number | string): Observable<ModelClass> {
        return this._service.get<Response>(`${this.url}/${id}`).pipe(
            map(res => this.interfaceToModelAbstract(res)),
            tap(res => this.oneItem.next(res))
        );
    }
    updateItem(data: ModelClass): Observable<ModelClass> {
        console.log(data);
        return this._service.put<Response>(`${this.url}/${data.id}`, data).pipe(
            map(res => this.interfaceToModelAbstract(res)),
            tap((res) => {
                //TODO: remplazar buscando
                const newItems = this.items$.value.map((item) => {
                    if (item.id === res.id) {
                        return res;
                    } else {
                        return item;
                    }
                });
                this.items$.next(newItems);
            })
        );
    }
    searchItemAsync(leters: string): Observable<ModelClass[]> {
        return this._service.get<Response[]>(this.url).pipe(
            map(res =>
                res.map(item => this.interfaceToModelAbstract(item))
            ),
            tap((res) => {
                const newItems = res.filter((item) => {
                    const valores = Object.values(item)
                        .toString()
                        .toLowerCase();
                    return valores.includes(leters);
                });
                this.items$.next(newItems);
            })
        );
    }
    searchItem(leter: string): void {
        if (leter !== '') {
            const filterSerarch = this.itemsSearch.filter((item) => {
                // retornar todos los items que contengan la letra
                const itemString = item.toStringSearch().trim().toLowerCase();
                console.log(itemString);
                return itemString.includes(leter.trim().toLowerCase());
            });
            this.items$.next(filterSerarch);
        } else {
            this.items$.next(this.itemsSearch);
        }
    }
    // getFilterItems(data?): void {
    //     const { type, column, id } = data;
    //     console.log(type, column);
    //     //type: true o false, column: nombre de la columna
    //     console.log(type);
    //     if (typeof type === 'boolean') {
    //         this.itemCache$.subscribe((res) => {
    //             // filtrar por tipo
    //             const filterSerarch = res.filter(
    //                 item => item[column] === type
    //             );
    //             this.items$.next(filterSerarch);
    //         });
    //         return;
    //     }
    //     if (id) {
    //         this.itemCache$.subscribe((res) => {
    //             // filtrar por tipo
    //             const filterSerarch = res.filter(
    //                 item => item[column].id === id
    //             );
    //             this.items$.next(filterSerarch);
    //         });
    //         return;
    //     }
    //     if (type === null || id === null) {
    //         console.log(this.list);
    //         this.items$.next(this.list);
    //         return;
    //     }

    //     // this.items$.next(filterSerarch);
    //     // console.log(this.itemsSearch);
    //     // console.log(this.items$.value);
    //     // console.log(this.list);
    // }

    sortItemsAsync(data: DataSort): Observable<ModelClass[]> {
        const { direction, active } = data;
        return this._service.get<Response[]>(this.url).pipe(
            map(res =>
                res.map(item => this.interfaceToModelAbstract(item))
            ),
            tap((res) => {
                const newItems = res.sort((a, b) => {
                    if (typeof a[active] === 'string') {
                        if (direction === 'asc') {
                            return a[active][0].toLowerCase() >
                                b[active][0].toLowerCase()
                                ? 1
                                : -1;
                        } else {
                            return a[active][0].toLowerCase() <
                                b[active][0].toLowerCase()
                                ? 1
                                : -1;
                        }
                    } else {
                        if (direction === 'asc') {
                            return a[active] > b[active] ? 1 : -1;
                        } else {
                            return a[active] < b[active] ? 1 : -1;
                        }
                    }
                });
                this.items$.next(newItems);
            })
        );
    }

    abstract interfaceToModelAbstract(data: Response): ModelClass;
}

interface DataSort {
    active: string;
    direction: string;
}
