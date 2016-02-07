import {Injectable} from "angular2/core";
import {Product} from "./gallery.models";
import {DataServices} from "../core/services/data.services";

@Injectable()

export class GalleryServices implements IGalleryServices{

    private apiUrl: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "http://jsonplaceholder.typicode.com/posts";
    }

    public getGallery():Promise<Array<any>> {
        return this._dataServices.getData(this.apiUrl).then((response: Array<Product>) => {
            return response;
        });
    }

}