import {Config} from "../core/config";
import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {SendMessage} from "./sendMessages.models";
import {Observable} from "rxjs/Observable";
import {User} from "../core/models/User";
@Injectable()

export class SendMessagesServices {

    private apiUrl: string;
    private apiUrlGetEntities: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "mensajes/enviar";
        this.apiUrlGetEntities = "entidades/usuarios/tipos/";
    }

    public sendMessage(message: SendMessage): Promise<any> {
        return this._dataServices.postData(Config.baseUrl + this.apiUrl, JSON.stringify(message));
    }

    public getManagers(): Observable<Array<User>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlGetEntities + "Administrador");
    }

    public getProviders(): Observable<Array<User>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlGetEntities + "Empresa");
    }

    public getClients(): Observable<Array<User>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlGetEntities + "Cliente");
    }

}

