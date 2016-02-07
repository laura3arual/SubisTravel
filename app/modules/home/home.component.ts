import {Component} from "angular2/core";
import {RouteConfig } from "angular2/router";
import {ROUTES} from "../core/routes/route.config";
import {HeaderComponent} from "../core/header/header.component";


@Component({
	selector: "home",
	template: require("./home.component.html"),
	directives: []
})
export class HomeComponent {

	constructor() {}

}
