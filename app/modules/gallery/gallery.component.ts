import {Component} from "angular2/core";
import {GalleryServices} from "./gallery.services";
import { Item } from "./gallery.models";
import {PaginationComponent} from "../core/components/pagination/pagination.component";

@Component({
    selector: "gallery",
    providers: [GalleryServices],
    template: require("./gallery.component.html"),
    directives: [PaginationComponent],
    styles: [require("./gallery.component.scss").toString()]
})

export class GalleryComponent {
    public items:Array<Item>;
    public filter: IFilter;

    constructor(private _galleryServices: GalleryServices) {
        this.filter = <IFilter>{};
    }

    ngOnInit() {
        this._galleryServices.getGallery(this.filter).then((_items:Array<Item>) => {
            this.items = (_items !== undefined || _items !== null) ? _items.reverse() : [];
        });
    }
}