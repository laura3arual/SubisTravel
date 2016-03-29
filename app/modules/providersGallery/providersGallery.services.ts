import {Injectable} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {ProviderListResponse, Provider} from "./providersGallery.models";

@Injectable()

export class ProvidersGalleryServices{

    private apiUrl: string;
    public providerList: Array<Provider>;
    public filter: IFilter;
    public updateProviders: EventEmitter<Array<Provider>>;
    public updatePagination: EventEmitter<number>;

    constructor(private _dataServices: DataServices) {
        this.providerList = [];
        this.filter = <IFilter>{};
        this.updateProviders = new EventEmitter();
        this.updatePagination = new EventEmitter();
    }

    public getProviders():void {
        this.filter.providers = this.filter.providers && this.filter.providers.length?this.filter.providers:undefined;
        this.filter.clasifications = this.filter.clasifications && this.filter.clasifications.length?this.filter.clasifications:undefined;
        this._dataServices.postData(Config.baseUrl + "entidades/listar", JSON.stringify(this.filter)).then((response: ProviderListResponse ) => {
            this.providerList = response.lstElements;
            this.updateProviders.emit(response.lstElements);
            this.updatePagination.emit(response.pages);
        });
    }
}

