import {Item} from "../item/item.models";
class ShoppingCart  {
    items: Array<ShoppingCartItem>;
    constructor(){
     this.items = [];
    }
}

class ShoppingCartItem {
    id: number;
    cantidad: number;
    estado: string;
    fecha: number;
    valor: number;
    idItem: number;
    idUsuario: number;
    detail: Item;
}

class ShoppingCartItemPost {
    idItem: number;
    idUser: number;
    quantity: number;
}

class BuyPost {
    idsTransacction: Array<number>;
}
export { ShoppingCart, ShoppingCartItem, ShoppingCartItemPost, BuyPost };