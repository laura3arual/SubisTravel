import {Injectable} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Item} from "./gallery.models";
import {ItemListResponse} from "./gallery.models";

@Injectable()

export class GalleryServices implements IGalleryServices{

    private apiUrl: string;
    public itemList: Array<Item>;
    public filter: IFilter;
    public updateItems: EventEmitter<Array<Item>>;
    public updatePagination: EventEmitter<number>;

    constructor(private _dataServices: DataServices) {
        this.itemList = [];
        this.filter = <IFilter>{};
        this.updateItems = new EventEmitter();
        this.updatePagination = new EventEmitter();
    }

    public getGallery():void {
        this.filter.providers = this.filter.providers && this.filter.providers.length?this.filter.providers:undefined;
        this.filter.clasifications = this.filter.clasifications && this.filter.clasifications.length?this.filter.clasifications:undefined;
        this._dataServices.postData(Config.baseUrl + "items", JSON.stringify(this.filter)).then((response: ItemListResponse ) => {
            this.itemList = response.lstElements;
            this.updateItems.emit(response.lstElements);
            this.updatePagination.emit(response.pages);
        });
    }
}

