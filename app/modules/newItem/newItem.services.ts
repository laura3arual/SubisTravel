
import {Injectable} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {ItemPost} from "./newItem.models";
import {Category} from "../providersFilters/categories/categories.models";
import {Observable} from "rxjs/Observable";
@Injectable()

export class NewItemServices {

    private apiUrl: string;
    private apiUrlClasificaciones: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "items/crear";
        this.apiUrlClasificaciones = "clasificaciones";
    }

    public createItem(item: ItemPost): void {
        this._dataServices.postData(Config.baseUrl + this.apiUrl, JSON.stringify(item));
    }

    public getCategories(): Observable<Array<Category>>{
        return this._dataServices.getData(Config.baseUrl + this.apiUrlClasificaciones)
    }
}

