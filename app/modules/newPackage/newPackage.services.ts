
import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Observable} from "rxjs/Observable";
import {PackagePost, Package} from "./newPackage.models";
import {Item} from "../item/item.models";
import {ItemListResponse} from "../gallery/gallery.models";
@Injectable()

export class NewPackageServices {

    private apiUrlCreatePackage: string;
    private apiUrlGetItems: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrlCreatePackage = "paquetes/guardar";
        this.apiUrlGetItems = "items";
    }

    public createPackage(packageInfo: PackagePost): void {
        this._dataServices.putData(Config.baseUrl + this.apiUrlCreatePackage, JSON.stringify(packageInfo));
    }

    public getItems(): Promise<ItemListResponse>{
        return this._dataServices.postData(Config.baseUrl + this.apiUrlGetItems, JSON.stringify({}))
    }
}

