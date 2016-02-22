import {Component} from "angular2/core";
import {GalleryServices} from "./gallery.services";
import { Item } from "./gallery.models";
import {PaginationComponent} from "../core/components/pagination/pagination.component";
import {ProvidersComponent} from "../providers/providers.component";
import {ViewChild} from "angular2/core";
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {RangeComponent} from "../range/range.component";


@Component({
    selector: "gallery",
    providers: [],
    template: require("./gallery.component.html"),
    directives: [PaginationComponent, ProvidersComponent, RangeComponent],
    styles: [require("./gallery.component.scss").toString()]
})

export class GalleryComponent {
    public items:Array<Item>;
    public subscription: any;

    constructor(private _galleryServices: GalleryServices) {
        this._galleryServices.getGallery();
    }

    ngOnInit(){
        this.subscription = this._galleryServices.updateItems.subscribe((itemList: Array<Item>) => { this.updateItemList(itemList)});
    }

    private updateItemList(itemList: Array<Item>) {
        this.items = itemList;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}