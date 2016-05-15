import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Observable} from "rxjs/Observable";
import {Provider} from "./provider.models";
import {Category} from "../filters/categories/categories.models";

@Injectable()

export class ProviderServices {

    private apiUrlGetProvider: string;
    private apiUrlUpdateProvider: string;
    private apiUrlCategories: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrlGetProvider = "entidades/";
        this.apiUrlUpdateProvider = "entidades/actualizar";
        this.apiUrlCategories = "clasificaciones";
    }

    public getProvider(id: number): Observable<Provider> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlGetProvider + id);
    }

    public updateProvider(provider: Provider) {
        return this._dataServices.putData(Config.baseUrl + this.apiUrlUpdateProvider, JSON.stringify(provider));
    }
    
    public getCategories(): Observable<Array<Category>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlCategories);
    }
}

