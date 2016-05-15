
import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Category} from "../providersFilters/categories/categories.models";
@Injectable()

export class ProfileServices {

    private apiUrl: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "entidades/solicitarBaja/";
    }

    public requestUnsuscribe(entityId: number): Promise<Array<Category>>{
        return this._dataServices.getData(Config.baseUrl + this.apiUrl + entityId).toPromise()
    }
}

