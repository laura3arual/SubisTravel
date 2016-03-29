import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {ShoppingCartServices} from "./shoppingCart.services";
import {ShoppingCart} from "./shoppingCart.models";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    template: require("./shoppingCart.component.html"),
    styles: [require("./shoppingCart.components.scss").toString()],
    providers: [],
    directives: [ROUTER_DIRECTIVES]
})

export class ShoppingCartComponent implements OnInit{
    private currentCart: ShoppingCart;

    constructor(private _shoppingCartServices: ShoppingCartServices) {
        this._shoppingCartServices.loadShoppingCart();
        this.currentCart = this._shoppingCartServices.shoppingCart;
    }

    ngOnInit():any {
    }

    public removeItem(itemId) {
        this._shoppingCartServices.removeItem(itemId);
    }
    
    public buy() {
        this._shoppingCartServices.buy();
    }
}


