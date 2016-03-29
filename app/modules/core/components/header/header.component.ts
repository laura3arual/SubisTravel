import {Component, OnInit} from "angular2/core";
import {AppServices} from "../../../app/app.services";
import {User} from "../../models/User";

@Component({
    selector: "header-component",
    styles: [require("./header.component.scss").toString()],
    template: require("./header.component.html")
})

export class HeaderComponent {
    profile: User;

    constructor(private _appServices: AppServices){
        this.profile = this._appServices.user;
    }
}
