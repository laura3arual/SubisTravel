
import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {ProviderPost} from "./newProvider.models";
import {Category} from "../filters/categories/categories.models";
import {Observable} from "rxjs/Observable";
@Injectable()

export class NewProviderServices {

    private apiUrlCreateProvider: string;
    private apiUrlCategories: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrlCreateProvider = "entidades/agregarProveedor";
        this.apiUrlCategories = "clasificaciones";
    }

    public createProvider(item: ProviderPost): void {
        this._dataServices.postData(Config.baseUrl + this.apiUrlCreateProvider, JSON.stringify(item));
    }

    public getCategories(): Observable<Array<Category>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlCategories);
    }

}

