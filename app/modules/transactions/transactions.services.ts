import {Config} from "../core/config";
import {Injectable} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Observable} from "rxjs/Observable";
import {Transaction} from "./transactions.models";

@Injectable()

export class TransactionsServices {

    private apiAllTransactions: string;
    private apiPurchases: string;
    private apiSales: string;

    constructor(private _dataServices: DataServices) {
        this.apiAllTransactions = "transacciones/getalltransaction";
    }

    public getAllTransactions(): Promise<Array<Transaction>> {
        return this._dataServices.getData(Config.baseUrl + this.apiAllTransactions).toPromise();
    }

    public getMyPurchases(userId: number): Promise<Array<Transaction>> {
        return this._dataServices.getData(Config.baseUrl + this.apiPurchases + userId).toPromise();
    }

    public getMySales(entityId: number): Promise<Array<Transaction>> {
        return this._dataServices.getData(Config.baseUrl + this.apiSales + entityId).toPromise();
    }
}

