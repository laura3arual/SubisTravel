import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {OrderBy} from "../core/pipes/orderBy.pipe";
import {AppServices} from "../app/app.services";
import {UserQuery} from "../core/models/User";
import {ItemServices} from "../item/item.services";
import {Item} from "../item/item.models";
import {ROUTER_DIRECTIVES, RouteParams, Router} from "angular2/router";
import {MyPurchasesServices} from "./myPurchases.services";
import {Transaction} from "./myPurchases.models";

@Component({
    template: require("./myPurchases.component.html"),
    styles: [require("./myPurchases.components.scss").toString()],
    pipes: [OrderBy],
    providers: [MyPurchasesServices],
    directives: [ROUTER_DIRECTIVES]
})

export class MyPurchasesComponent implements OnInit{
   public transactions: Array<Transaction>;
    private userId: number;
    public userName: string;
    constructor(private _myPurchasesServices: MyPurchasesServices,
                private _appServices: AppServices,
                private _itemServices: ItemServices,
                private _routeParams: RouteParams,
                private _router: Router) {
     this.transactions = [];
        if(this._appServices.user.role === 3 || this._appServices.user.role === 4) {
            this.loadMyPurchases();
        } else {
            this._router.navigate( ['Home'] );
        }
    }

    ngOnInit():any {
        this.userId = this._routeParams.get("id")?Number(this._routeParams.get("id")):this._appServices.user.internalUserId;
        this.userName = this._routeParams.get("name")?this._routeParams.get("name"):null;
       }

    private loadMyPurchases() {
        this._myPurchasesServices.getMyPurchases(this._appServices.user.internalUserId).then((transactions: Array<Transaction>) => {
           this.transactions =  transactions;
            _.each(this.transactions, (transaction: Transaction) => {
                this._itemServices.getItem(this.userId).toPromise().then((item: Item) => {
                   transaction.item =  item;
                });
            });
        });
    }
}


