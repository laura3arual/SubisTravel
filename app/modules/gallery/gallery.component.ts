import {Component} from "angular2/core";
import {GalleryServices} from "./gallery.services";
import {Product} from "./gallery.models";

@Component({
    selector: "gallery",
    providers: [GalleryServices],
    template: require("./gallery.component.html")
})

export class GalleryComponent {
    public products:Array<any>;

    constructor(private _galleryServices: GalleryServices) {

    }

    ngOnInit() {
        this._galleryServices.getGallery().then((_products:Array<Product>) => {
            this.products = (_products !== undefined || _products !== null) ? _products.reverse() : [];
        });
    }
}