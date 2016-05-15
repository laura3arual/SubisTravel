import {Config} from "../core/config";
import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {SearchReport, QueryReport} from "./reports.models";
import {Observable} from "rxjs/Observable";

@Injectable()

export class ReportsServices {

    private apiUrlGetQueries: string;
    private apiUrlGetSearches: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrlGetQueries = "reportes/usuarios/{{1}}/items/consultas";
        this.apiUrlGetSearches = "reportes/usuarios/{{1}}/items/busquedas";
    }

    public getSearches(entityId: number): Observable<Array<SearchReport>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlGetSearches.replace(<any>"{{1}}", <any>entityId));
    }
    public getQueries(entityId: number): Observable<Array<QueryReport>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlGetQueries.replace(<any>"{{1}}", <any>entityId));
    }
}

