import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ROUTES} from "./route.config";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../core/components/header/header.component";
import {GalleryServices} from "../gallery/gallery.services";
import "../../assets/styles/subis.travel/main.scss";
import {ProvidersGalleryServices} from "../providersGallery/providersGallery.services";
import {AppServices} from "./app.services";
import {ShoppingCartServices} from "../shoppingCart/shoppingCart.services";
import {ItemServices} from "../item/item.services";

@Component({
    selector: 'app',
    styles: [require("./app.component.scss").toString()],
    providers: [GalleryServices, ProvidersGalleryServices, AppServices, ShoppingCartServices, ItemServices],
    template: require("./app.component.html"),
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent,
        FooterComponent
    ],
    pipes: []
})

@RouteConfig(ROUTES)

export class AppComponent implements OnInit{
    private role;

    ngOnInit():any {
        (<any>$(".button-collapse")).sideNav();
    }

    constructor(private _appServices: AppServices) {
        this.role = _appServices.user.role;
    }

    login(){
      this._appServices.login();
    }

    public logout(){
       this._appServices.logout();
    }

    public loggedIn() {
        return this._appServices.loggedIn();
    }
}
