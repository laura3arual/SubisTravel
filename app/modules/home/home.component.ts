import {Component} from "angular2/core";
import {RouteConfig } from "angular2/router";
import {HeaderComponent} from "../core/header/header.component";
import {GalleryComponent} from "../gallery/gallery.component";


@Component({
	selector: "home",
	styles: [require("./home.component.scss").toString()],
	template: require("./home.component.html"),
	directives: [
		GalleryComponent]
})
export class HomeComponent {

	constructor() {}

}
