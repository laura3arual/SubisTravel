import {Config} from "../core/config";
import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {MyMessage} from "./myMessages.models";
import {Observable} from "rxjs/Observable";
@Injectable()

export class MyMessagesServices {

    private apiUrl: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "mensajes/usuarios/";
    }

    public getReceivedMyMessages(entityId: number): Observable<Array<MyMessage>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrl + entityId + "/recibidos");
    }

    public getMySentMessages(entityId: number): Observable<Array<MyMessage>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrl + entityId + "/enviados");
    }

}

