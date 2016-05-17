
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {ItemPost, ItemResponse, QRItem} from "./newItem.models";
import {Category} from "../providersFilters/categories/categories.models";
import {Observable} from "rxjs/Observable";
@Injectable()

export class NewItemServices {

    private apiUrl: string;
    private apiUrlClasificaciones: string;
    private apiUrlQRCreate: string;

    constructor(private _dataServices: DataServices, private _http: Http) {
        this.apiUrl = "items/crear";
        this.apiUrlClasificaciones = "clasificaciones";
        this.apiUrlQRCreate = "http://subisqr.wwhanvbxmn.us-west-2.elasticbeanstalk.com/subis/item";

    }

    public createItem(item: ItemPost): Promise<ItemResponse> {
        return this._dataServices.postData(Config.baseUrl + this.apiUrl, JSON.stringify(item));
    }
    
    public registerQR(item: QRItem): Observable<ItemResponse> {
        return this._http.post(this.apiUrlQRCreate, JSON.stringify(item)).map((response: Response) =>{
            return response.json();
        });
    }

    public getCategories(): Observable<Array<Category>>{
        return this._dataServices.getData(Config.baseUrl + this.apiUrlClasificaciones)
    }
    
}

