import {Component} from "angular2/core";
import "jquery";
import "jquery-ui";
import {GalleryServices} from "../../gallery/gallery.services";


@Component({
    selector: "range",
    providers: [],
    template: require("./range.component.html"),
    directives: [],
    styles: [require("./range.component.scss").toString()]
})

export  class RangeComponent {
    slideMaxValue: number;
    slideMinValue: number;

    constructor(private _galleryServices: GalleryServices) {
        this.slideMinValue = 10000;
        this.slideMaxValue= 1000000;
    }

    ngOnInit() {
        (<any>$(".slider-max")).slider({
            range: false,
            orientation: "horizontal",
            min: 10000,
            max: 1000000,
            value: 10000,
            step: 10000,
            slide: (event, ui) => {
                this.slideMaxValue= ui.value;
                this.updateRange();
            }
        });
        (<any>$(".slider-min")).slider({
            range: false,
            orientation: "horizontal",
            min: 10000,
            max: 1000000,
            value: 10000,
            step: 10000,
            slide: (event, ui) => {
                this.slideMinValue = ui.value;
                this.updateRange();
            }
        });
    }

    private updateRange() {
        if(this.slideMinValue) {
            this._galleryServices.filter.minValue = this.slideMinValue;
        } else {
            this._galleryServices.filter.minValue = undefined;
        }
        if(this.slideMaxValue) {
            this._galleryServices.filter.maxValue = this.slideMaxValue;
        } else {
            this._galleryServices.filter.maxValue = undefined;
        }
        this.filterGallery();
    }

    private filterGallery(){
        this._galleryServices.getGallery();
    }

}
