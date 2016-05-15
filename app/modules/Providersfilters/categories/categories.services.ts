import {Injectable} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Category} from "./categories.models";
import {DataServices} from "../../core/services/data.services";
import {Config} from "../../core/config";

@Injectable()

export class CategoryServices {

    private apiUrl: string;
    public categoryList: Array<Category>;
    public updateCategories: EventEmitter<Array<Category>>;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "clasificaciones"; 
        this.categoryList = [];
        this.updateCategories = new EventEmitter<Array<Category>>();
    }

    public getCategories():void {
        this._dataServices.getData(Config.baseUrl + this.apiUrl).subscribe((response: Array<Category>) => {
            this.categoryList = response;
            this.updateCategories.emit(response);
        });
    }
}

