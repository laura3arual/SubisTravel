import {Injectable} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Item} from "./gallery.models";

@Injectable()

export class GalleryServices implements IGalleryServices{

    private apiUrl: string;
    public itemList: Array<Item>;
    public filter: IFilter;
    public updateItems: EventEmitter<Array<Item>>;

    constructor(private _dataServices: DataServices) {
        this.itemList = [];
        this.filter = <IFilter>{};
        this.updateItems = new EventEmitter();
    }

    public getGallery():void {
        this._dataServices.postData(Config.baseUrl + "items", JSON.stringify(this.filter)).then((response: Array<Item>) => {
            this.itemList = response;
            this.updateItems.emit(response);
        });
    }
}

