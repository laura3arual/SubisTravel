import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {ShoppingCartServices} from "./shoppingCart.services";
import {ShoppingCart} from "./shoppingCart.models";
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";

@Component({
    template: require("./shoppingCart.component.html"),
    styles: [require("./shoppingCart.components.scss").toString()],
    directives: [ROUTER_DIRECTIVES]
})

export class ShoppingCartComponent implements OnInit{
    private currentCart: ShoppingCart;

    constructor(private _shoppingCartServices: ShoppingCartServices, private _router: Router) {
        this._shoppingCartServices.loadShoppingCart();
        this.currentCart = this._shoppingCartServices.shoppingCart;
    }

    ngOnInit():any {
        $(document).ready(function(){
            (<any>$('.tooltipped')).tooltip();
            (<any>$('.collapsible')).collapsible({
                accordion : false
            });
        });
    }

    public removeItem(itemId) {
        this._shoppingCartServices.removeItem(itemId);
    }
    
    public buy() {
        this._shoppingCartServices.buy();
        setTimeout(() => {
            this._router.navigate(['Home']);
        }, 1000)
    }
}


