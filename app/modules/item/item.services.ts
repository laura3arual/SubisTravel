import {Injectable} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Item} from "./item.models";
import {Observable} from "rxjs/Observable";

@Injectable()

export class ItemServices {

    private apiUrl: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "items/";
    }

    public getItem(id: number): Observable<Item> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrl + id);
    }
}

