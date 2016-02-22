import {Injectable} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Provider} from "./providers.models";

@Injectable()

export class ProvidersServices implements IProvidersServices{

    private apiUrl: string;
    public proviederList: Array<Provider>;
    public updateProviders: EventEmitter<Array<Provider>>;

    constructor(private _dataServices: DataServices) {
        this.proviederList = [];
        this.updateProviders = new EventEmitter();
    }

    public getProviders():void {
        this._dataServices.getData(Config.baseUrl + "entidades/porTipo/4").then((response: Array<Provider>) => {
            this.proviederList = response;
            this.updateProviders.emit(response);
        });
    }
}

