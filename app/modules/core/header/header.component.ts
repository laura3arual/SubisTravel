import {Component, OnInit} from "angular2/core";
import {Profile} from "../../profile/profile.models";

@Component({
    selector: "header-component",
    styles: [require("./header.scss").toString()],
    template: require("./header.component.html")
})

export class HeaderComponent {
    profile: Profile;

    constructor(){
        this.profile = JSON.parse(localStorage.getItem("profile"));
        console.log(this.profile);
    }
}
