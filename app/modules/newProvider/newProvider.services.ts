
import {Injectable} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {ProviderPost} from "./newProvider.models";
@Injectable()

export class NewProviderServices {

    private apiUrl: string;
    private apiUrlClasificaciones: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "items/crear";
        this.apiUrlClasificaciones = "clasificaciones";
    }

    public createProvider(item: ProviderPost): void {
        this._dataServices.postData(Config.baseUrl + this.apiUrl, JSON.stringify(item));
    }

}

