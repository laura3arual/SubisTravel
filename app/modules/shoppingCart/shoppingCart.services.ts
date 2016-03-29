import {Injectable} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {ShoppingCart, ShoppingCartItem, ShoppingCartItemPost, BuyPost} from "./shoppingCart.models";
import {AppServices} from "../app/app.services";
import {Config} from "../core/config";
import {ItemServices} from "../item/item.services";
import {Item} from "../item/item.models";
@Injectable()

export class ShoppingCartServices {

    private apiUrlAddItem: string;
    private apiUrlRemoveItem: string;
    private apiUrlGetShoppingCart: string;
    private apiUrlBuy: string;
    public shoppingCart: ShoppingCart;

    constructor(private _dataServices: DataServices, private _appServices: AppServices, private _itemServices: ItemServices) {
        this.apiUrlAddItem = "transacciones/agregarACarrito";
        this.apiUrlRemoveItem = "transacciones/eliminarDeCarrito/";
        this.apiUrlGetShoppingCart = "transacciones/enCarrito/";
        this.apiUrlBuy = "transacciones/realizarCompra";
        this.shoppingCart = new ShoppingCart();
    }

    public addItem(item: ShoppingCartItemPost): Promise<any>{
        return this._dataServices.postData(Config.baseUrl + this.apiUrlAddItem, JSON.stringify(item)).then(() => {
            this.loadShoppingCart();
        });
    }
    public removeItem(itemId: number): void{
        this._dataServices.deleteData(Config.baseUrl + this.apiUrlRemoveItem + itemId);
        setTimeout(() => {
            this.loadShoppingCart();
        }, 1000)
    }

    public loadShoppingCart(){
        let userId = this._appServices.user.internalEntityId;
        this._dataServices.getData(Config.baseUrl + this.apiUrlGetShoppingCart + userId).toPromise().then((items: Array<ShoppingCartItem>) => {
            this.shoppingCart.items = items;
            _.each(this.shoppingCart.items, (shoppingCartItem: ShoppingCartItem) => {
                this._itemServices.getItem(shoppingCartItem.idItem).toPromise().then((item: Item) => {
                    shoppingCartItem.detail = item;
                });
            });
        })
    }

    public buy() {
        let transaction = new BuyPost();
        transaction.idsTransacction = _.pluck(this.shoppingCart.items, "id");
        this._dataServices.postData(Config.baseUrl + this.apiUrlBuy, JSON.stringify(transaction));
        setTimeout(() => {
            this.loadShoppingCart();
        }, 1000)
    }
}

