import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ROUTES} from "./route.config";
import {FooterComponent} from "../footer/footer.component";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";
import {HeaderComponent} from "../core/components/header/header.component";
import {GalleryServices} from "../gallery/gallery.services";
import "../../assets/styles/subis.travel/main.scss";

declare var Auth0Lock;

@Component({
    selector: 'app',
    styles: [require("./app.component.scss").toString()],
    providers: [GalleryServices],
    template: require("./app.component.html"),
    directives: [ROUTER_DIRECTIVES,
        HeaderComponent,
        FooterComponent
    ],
    pipes: []
})

@RouteConfig(ROUTES)

export class AppComponent implements OnInit{

    ngOnInit():any {
        (<any>$(".button-collapse")).sideNav();
    }

    private lock;
    private jwtHelper;


    constructor() {
        this.lock = new Auth0Lock("B51ODht1f4rqVqT9V3kGohThilQylG4L", "subistravel.auth0.com");
        this.jwtHelper = new JwtHelper();
    }
    login(){
        let self = this;
        this.lock.show((err: string, profile: string, id_token: string) => {
            if (err){
                throw new Error(err);
            }
            localStorage.setItem("profile", JSON.stringify(profile));
            localStorage.setItem("id_token", id_token);

            console.log(
                this.jwtHelper.decodeToken(id_token),
                this.jwtHelper.getTokenExpirationDate(id_token),
                this.jwtHelper.isTokenExpired(id_token)
            );
        });

        self.loggedIn();
    }

    logout(){
        localStorage.removeItem("profile");
        localStorage.removeItem("id_token");
        this.loggedIn();
    }

    loggedIn(){
        return tokenNotExpired();
    }


}
