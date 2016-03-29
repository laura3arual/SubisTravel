import {Config} from "../core/config";
import {Injectable} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Transaction} from "./myPurchases.models";

@Injectable()

export class MyPurchasesServices {

    private apiUrl: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrl = "transacciones/compras/";
    }

    public getMyPurchases(userId: number): Promise<Array<Transaction>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrl + userId).toPromise();
    }

}

