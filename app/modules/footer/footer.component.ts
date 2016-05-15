import {Component, OnInit} from "@angular/core";

@Component({
    selector: "footer-component",
    styles: [require("./footer.component.scss").toString()],
    template: require("./footer.component.html")
})

export class FooterComponent {

    constructor() {
        
    }
}
