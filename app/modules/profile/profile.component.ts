import {Component} from "angular2/core";
import {CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";
import {Profile} from "./profile.models";

@Component({
  selector: "profile",
    styles: [require("./profile.scss").toString()],
    template: require("./profile.component.html")
})

@CanActivate(() => tokenNotExpired())

export class ProfileComponent{
    profile: Profile;

    constructor(){
        this.profile = JSON.parse(localStorage.getItem("profile"));
        console.log(this.profile);
    }
}