import {Component} from "angular2/core";
import {GalleryServices} from "./gallery.services";
import { Item } from "./gallery.models";
import {PaginationComponent} from "../core/components/pagination/pagination.component";
import {ProvidersComponent} from "../providers/providers.component";
import {ViewChild} from "angular2/core";
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";

let noUiSlider: any = require("nouislider/distribute/nouislider.min.js");

@Component({
    selector: "gallery",
    providers: [],
    template: require("./gallery.component.html"),
    directives: [PaginationComponent, ProvidersComponent],
    styles: [require("./gallery.component.scss").toString()]
})

export class GalleryComponent {
    public items:Array<Item>;
    public subscription: any;
    @ViewChild('sliderDomElement') sliderDomElement;
    noUiSlider: any;
    @Input() start: number[];
    @Input() range: any;
    @Input() pips: any;
    @Output() end: EventEmitter<any> = new EventEmitter();

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

    ngAfterViewInit() {
        //noUiSlider.create(this.sliderDomElement.nativeElement,
        //    {
        //        start: [20, 80],
        //        range: {
        //            'min': 0,
        //            'max': 100
        //        },
        //        connect: true,
        //        step: 1,
        //        format: wNumb({
        //            decimals: 0
        //        }),
        //        pips: 3
        //    });
        //this.noUiSlider = this.sliderDomElement.nativeElement.noUiSlider;
        //this.noUiSlider.on('end', this.logSlider);
    }


    private logSlider(inNoUiSlider: any) {
        console.log(inNoUiSlider);
    }
}