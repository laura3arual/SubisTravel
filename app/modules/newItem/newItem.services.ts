
import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {ItemPost, ItemResponse, QRItem} from "./newItem.models";
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

    public createItem(item: ItemPost): Promise<ItemResponse> {
        return this._dataServices.postData(Config.baseUrl + this.apiUrl, JSON.stringify(item));
    }
    
    public registerQR(item: QRItem): Promise<ItemResponse> {
        return this._dataServices.postData(Config.baseUrl + this.apiUrl, JSON.stringify(item));
    }

    public getCategories(): Observable<Array<Category>>{
        return this._dataServices.getData(Config.baseUrl + this.apiUrlClasificaciones)
    }
    
}

