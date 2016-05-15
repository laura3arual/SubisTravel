import {Component} from "@angular/core";
import {CanActivate} from "@angular/router-deprecated";
import {tokenNotExpired} from "angular2-jwt";
import {User} from "../core/models/User";
import {AppServices} from "../app/app.services";
import {ProfileServices} from "./profile.services";

@Component({
  selector: "profile",
    styles: [require("./profile.component.scss").toString()],
    template: require("./profile.component.html"),
    providers: [ProfileServices]
})

@CanActivate(() => tokenNotExpired())

export class ProfileComponent{
    profile: User;

    constructor(private _profileServices: ProfileServices, private _appServices: AppServices){
        this.profile = JSON.parse(localStorage.getItem("profile"));
        console.log(this.profile);
    }

    private unsuscribe() {
        this._profileServices.requestUnsuscribe(this._appServices.user.internalEntityId);
    }
}