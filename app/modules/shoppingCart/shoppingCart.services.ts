import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {ShoppingCart, ShoppingCartItem, ShoppingCartItemPost, BuyPost} from "./shoppingCart.models";
import {AppServices} from "../app/app.services";
import {Config} from "../core/config";
import {ItemServices} from "../item/item.services";
import {Item} from "../item/item.models";
import {NotificationServices} from "../core/services/notification.services";
import {EventEmitter} from "@angular/core";

@Injectable()

export class ShoppingCartServices {

    private apiUrlAddItem: string;
    private apiUrlRemoveItem: string;
    private apiUrlGetShoppingCart: string;
    private apiUrlBuy: string;
    public shoppingCart: ShoppingCart;
    public updateShoppingCart: EventEmitter<number>;

    constructor(private _dataServices: DataServices,
                private _appServices: AppServices,
                private _itemServices: ItemServices,
                private _notificationServices: NotificationServices) {
        this.apiUrlAddItem = "transacciones/agregarACarrito";
        this.apiUrlRemoveItem = "transacciones/eliminarDeCarrito/";
        this.apiUrlGetShoppingCart = "transacciones/enCarrito/";
        this.apiUrlBuy = "transacciones/realizarCompra";
        this.shoppingCart = new ShoppingCart();
        this.updateShoppingCart = new EventEmitter<number>();
    }

    public addItem(item: ShoppingCartItemPost): Promise<any>{
        return this._dataServices.postData(Config.baseUrl + this.apiUrlAddItem, JSON.stringify(item)).then(() => {
            this.loadShoppingCart();
            this.updateShoppingCart.emit(null);
        });
    }
    public removeItem(itemId: number): void{
        this._dataServices.deleteData(Config.baseUrl + this.apiUrlRemoveItem + itemId);
        setTimeout(() => {
            this.loadShoppingCart();
            this.updateShoppingCart.emit(null);
        }, 1000)
    }

    public loadShoppingCart(){
        let userId = this._appServices.user.internalUserId;
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
        this._notificationServices.showSuccess("Tu compra ha sido exitosa!");
        setTimeout(() => {
            this.updateShoppingCart.emit(null);
        }, 1000);
    }
}

