import {Component, OnInit} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {ROUTES} from "./route.config";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../core/components/header/header.component";
import {GalleryServices} from "../gallery/gallery.services";
import "../../assets/styles/subis.travel/main.scss";
import {ProvidersGalleryServices} from "../providersGallery/providersGallery.services";
import {AppServices} from "./app.services";
import {ShoppingCartServices} from "../shoppingCart/shoppingCart.services";
import {ItemServices} from "../item/item.services";
import {User} from "../core/models/User";
import {NotificationServices} from "../core/services/notification.services";

@Component({
    selector: 'app',
    styles: [require("./app.component.scss").toString()],
    providers: [GalleryServices, ProvidersGalleryServices, AppServices, ShoppingCartServices, ItemServices, NotificationServices], 
    template: require("./app.component.html"),
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent,
        FooterComponent
    ],
    pipes: []
})

@RouteConfig(ROUTES)

export class AppComponent{
    private currentUser: User;
    private showReports: boolean;
    private showMessages: boolean;
    private currentConfig: IProduct;

    constructor(private _appServices: AppServices) {
        this.currentUser = this._appServices.user?this._appServices.user:<User>{};
    }

    ngOnInit():any {
        (<any>$(".button-collapse")).sideNav();
    }



    ngAfterViewChecked(){
        // this.currentUser = this._appServices.user?this._appServices.user:<User>{};
    }


    login(){
      this._appServices.login().then(() => {
          this.currentUser = this._appServices.user;
      });
    }

    public logout(){
       this._appServices.logout();
        this.currentUser = this._appServices.user; 
    }

    public loggedIn() {
        this.showReports = this._appServices.config ? this._appServices.config.reports:false;
        this.showMessages = this._appServices.config ? this._appServices.config.messageSystem:false;
        return this._appServices.loggedIn();

    }

    public getCurrentRole(){
        return this.currentUser.role;
    }
}
