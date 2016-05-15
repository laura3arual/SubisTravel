import {Component} from "@angular/core";
import {GalleryServices} from "./gallery.services";
import {Item} from "./gallery.models";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {PaginationComponent} from "../filters/pagination/pagination.component";


@Component({
    selector: "gallery",
    providers: [],
    template: require("./gallery.component.html"),
    directives: [PaginationComponent, ROUTER_DIRECTIVES],
    styles: [require("./gallery.component.scss").toString()]
})

export class GalleryComponent {
    public items:Array<Item>;
    public subscription: any;
    private pages: number;
    private nElements: number;

    constructor(private _galleryServices: GalleryServices) {
        this.items = [];
        this._galleryServices.getGallery();
    }

    ngOnInit(){
        this.subscription = this._galleryServices.updateItems.subscribe((itemList: Array<Item>) => {
            this.updateItemList(itemList);
        });
    }

    private updateItemList(itemList: Array<Item>) {
        this.items = itemList;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}