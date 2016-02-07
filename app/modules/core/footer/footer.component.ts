import {Component, OnInit} from "angular2/core";

@Component({
    selector: "footer-component",
    styles: [require("./footer.scss").toString()],
    template: require("./footer.component.html")
})

export class FooterComponent {

    constructor() {
        
    }
}
