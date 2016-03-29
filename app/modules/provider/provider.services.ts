import {Injectable} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Observable} from "rxjs/Observable";
import {Provider} from "./provider.models";

@Injectable()

export class ProviderServices {

    private apiUrl: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "entidades/";
    }

    public getProvider(id: number): Observable<Provider> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrl + id);
    }
}

