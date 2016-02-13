import {Injectable} from "angular2/core";
import {Product} from "./gallery.models";
import {DataServices} from "../core/services/data.services";

@Injectable()

export class GalleryServices implements IGalleryServices{

    private apiUrl: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "http://ec2-54-200-178-107.us-west-2.compute.amazonaws.com:8080/SubisTravelWeb/services/entidades";
    }

    public getGallery():Promise<Array<any>> {
        return this._dataServices.getData(this.apiUrl).then((response: Array<Product>) => {
            return response;
        });
    }

}