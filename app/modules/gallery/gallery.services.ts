import {Injectable} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Item} from "./gallery.models";

@Injectable()

export class GalleryServices implements IGalleryServices{

    private apiUrl: string;

    constructor(private _dataServices: DataServices) {
    }

    public getGallery(filter: IFilter):Promise<Array<any>> {
        return this._dataServices.postData(Config.baseUrl + "items", JSON.stringify(filter)).then((response: Array<Item>) => {
            return response;
        });
    }
}

