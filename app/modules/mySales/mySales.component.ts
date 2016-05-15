import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {OrderBy} from "../core/pipes/orderBy.pipe";
import {AppServices} from "../app/app.services";
import {ItemServices} from "../item/item.services";
import {Item} from "../item/item.models";
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {Transaction} from "./mySales.models";
import {MySalesServices} from "./mySales.services";
import {UserQuery} from "../core/models/User";

@Component({
    template: require("./mySales.component.html"),
    styles: [require("./mySales.components.scss").toString()],
    pipes: [OrderBy],
    providers: [MySalesServices],
    directives: [ROUTER_DIRECTIVES]
})

export class MySalesComponent{
   public transactions: Array<Transaction>;

    constructor(private _mySalesServices: MySalesServices,
                private _appServices: AppServices,
                private _itemServices: ItemServices,
                private _router: Router) {
     this.transactions = [];
        if(this._appServices.user.role === 4) {
            this.loadMySales();
        } else {
            this._router.navigate( ['Home'] );
        }
    }

    private loadMySales() {
        this._mySalesServices.getMySales(this._appServices.user.internalEntityId).then((transactions: Array<Transaction>) => {
            this.transactions =  transactions;
            _.each(this.transactions, (transaction: Transaction) => {
                transaction.fecha = moment(transaction.fecha).format('MMMM Do YYYY, h:mm:ss a');
                this._itemServices.getItem(transaction.idItem).toPromise().then((item: Item) => {
                    transaction.item =  item;
                });
                this._appServices.getUserById(transaction.idUsuario).then((user: UserQuery) => {
                    transaction.user =  user;
                });
            });
        });
    }
}


