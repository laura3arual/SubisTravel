import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {OrderBy} from "../core/pipes/orderBy.pipe";
import {Transaction} from "./transactions.models";
import {TransactionsServices} from "./transactions.services";
import {AppServices} from "../app/app.services";
import {UserQuery} from "../core/models/User";
import {ItemServices} from "../item/item.services";
import {Item} from "../item/item.models";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";

@Component({
    template: require("./transactions.component.html"),
    styles: [require("./transactions.components.scss").toString()],
    pipes: [OrderBy],
    providers: [TransactionsServices],
    directives: [ROUTER_DIRECTIVES]
})

export class TransactionsComponent implements OnInit{
    public transactions: Array<Transaction>;

    constructor(private _transactionsServices: TransactionsServices,
                private _appServices: AppServices,
                private _itemServices: ItemServices,
                private _router: Router) {
        this.transactions = [];
        if(this._appServices.user.role === 5) {
            this.loadAllTransactions();
        } else {
            this._router.navigate( ['Home'] );
        }
    }

    ngOnInit():any {
    }

    private loadAllTransactions() {
        this._transactionsServices.getAllTransactions().then((transactions: Array<Transaction>) => {
            this.transactions =  transactions;
            _.each(this.transactions, (transaction: Transaction) => {
                this._appServices.getUserById(transaction.idUsuario).then((user: UserQuery) => {
                    transaction.user =  user;
                });
                this._itemServices.getItem(transaction.idItem).toPromise().then((item: Item) => {
                    transaction.item =  item;
                });
            });
        });
    }
}


