import {Component} from "angular2/core";
import {CanActivate} from "angular2/router";
import {tokenNotExpired} from "angular2-jwt";
import {User} from "../core/models/User";
import {AppServices} from "../app/app.services";
import {UnsuscribeServices} from "./unsuscribe.services";
import {Unsuscribe} from "./unsuscribe.models";

@Component({
  selector: "profile",
    styles: [require("./unsuscribe.component.scss").toString()],
    template: require("./unsuscribe.component.html"),
    providers: [UnsuscribeServices]
})

@CanActivate(() => tokenNotExpired())

export class UnsuscribeComponent{
    unsuscribeList: Array<Unsuscribe>;

    constructor(private _unsuscribeServices: UnsuscribeServices, private _appServices: AppServices){
        this.getUnsuscribeList();
    }

    private unsuscribe(userId) {
        this._unsuscribeServices.unsuscribe(userId);
    } 
    
    private getUnsuscribeList() {
        this._unsuscribeServices.getUnsuscribes().then((unsuscribeList: Array<Unsuscribe>) => {
            this.unsuscribeList = unsuscribeList;
        });
    }
}