import {Component} from "angular2/core";
import {RouteConfig } from "angular2/router";
import {HeaderComponent} from "../core/components/header/header.component";
import {GalleryComponent} from "../gallery/gallery.component";
import {GalleryServices} from "../gallery/gallery.services";
import {FormBuilder} from "angular2/common";
import {ControlGroup} from "angular2/common";


@Component({
	selector: "home",
	styles: [require("./home.component.scss").toString()],
	template: require("./home.component.html"),
	directives: [
		GalleryComponent],
	providers: [GalleryServices]
})
export class HomeComponent {
	private searchForm: ControlGroup;

	constructor(private _galleryServices: GalleryServices, fb: FormBuilder) {
		this.searchForm = fb.group({
			searchText: ""
		});
	}

	private filterGallery(){
		this._galleryServices.filter.name = this.searchForm.value.searchText;
		this._galleryServices.getGallery();
	}
}
