import {Component} from "angular2/core";
import {GalleryServices} from "../../gallery/gallery.services";
import {ItemType} from "../../gallery/gallery.models";


@Component({
    selector: "item-types",
    template: require("./types.component.html"),
    directives: [],
    styles: [require("./types.component.scss").toString()]
})

export class ItemTypeComponent {
    public itemTypeList: Array<ItemType>;
    private currentItemTypes: Array<number>;

    constructor(private _galleryServices: GalleryServices) {
        this.itemTypeList = [
            {
                id: 11,
                name: "Producto"
            },
            {
                id: 12,
                name: "Servicio"
            },
            {
                id: 13,
                name: "Paquete"
            }
        ];
        this.currentItemTypes = [];
    }

    private updateTypeList(itemTypeList: number) {
        if(this.currentItemTypes.indexOf(itemTypeList) === -1) {
            this.currentItemTypes.push(itemTypeList)
        } else {
           this.currentItemTypes = _.without(this.currentItemTypes, itemTypeList);
        }
        this.filterGallery();
    }

    private filterGallery(){
        this._galleryServices.filter.types = this.currentItemTypes.length?this.currentItemTypes:undefined;
        this._galleryServices.getGallery();
    } 

}