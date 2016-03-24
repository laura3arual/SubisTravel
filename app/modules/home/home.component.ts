import {Component} from "angular2/core";
import {GalleryComponent} from "../gallery/gallery.component";
import {FiltersComponent} from "../filters/filters.component";


@Component({
	selector: "home",
	styles: [require("./home.component.scss").toString()],
	template: require("./home.component.html"),
	directives: [GalleryComponent, FiltersComponent],
	providers: []
})
export class HomeComponent {
	constructor() {
	}
}
