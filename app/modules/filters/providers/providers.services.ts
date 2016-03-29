import {Injectable, EventEmitter} from "angular2/core";
import {Provider} from "./providers.models";
import {DataServices} from "../../core/services/data.services";
import {Config} from "../../core/config";

@Injectable()

export class ProvidersServices implements IProvidersServices{

    private apiUrl: string;
    public proviederList: Array<Provider>;
    public updateProviders: EventEmitter<Array<Provider>>;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "entidades/porTipo/4";
        this.proviederList = [];
        this.updateProviders = new EventEmitter();
    }

    public getProviders():void {
        this._dataServices.getData(Config.baseUrl + this.apiUrl).subscribe((response: Array<Provider>) => {
            this.proviederList = response;
            this.updateProviders.emit(response);
        });
    }
}

