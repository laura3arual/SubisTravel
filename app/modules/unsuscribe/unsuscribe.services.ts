
import {Injectable} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Category} from "../providersFilters/categories/categories.models";
import {Unsuscribe} from "./unsuscribe.models";
@Injectable()

export class UnsuscribeServices {

    private getUnsuscribesUrl: string;
    private unsuscribeUrl: string;

    constructor(private _dataServices: DataServices) {
        this.getUnsuscribesUrl = "entidades/solicitudesBaja";
        this.unsuscribeUrl = "entidades/darBaja/";
    }

    public getUnsuscribes(): Promise<Array<Unsuscribe>>{
        return this._dataServices.getData(Config.baseUrl + this.getUnsuscribesUrl).toPromise();
    }
    public unsuscribe(entityId: number): void {
        this._dataServices.getData(Config.baseUrl + this.unsuscribeUrl + entityId).toPromise();
    }
} 

