import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {NewItemServices} from "./newItem.services";
import {ItemPost, QRItem} from "./newItem.models";
import {ItemType} from "../gallery/gallery.models";
import {AppServices} from "../app/app.services";
import {Category} from "../providersFilters/categories/categories.models";
import {Router} from "@angular/router-deprecated";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MouseEvent} from "angular2-google-maps/core";
import {GeolocationServices} from "../core/services/geolocation.services";
import {Position, Marker} from "../core/models/Position";


@Component({
    template: require("./newItem.component.html"),
    styles: [require("./newItem.components.scss").toString()],
    providers: [NewItemServices],
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})

export class NewItemComponent implements OnInit{
    private currentItem: ItemPost;
    public categories: Array<Category>;
    private itemTypes: Array<ItemType>;
    public position: Position;
    public marker: Marker;
    public currentQRItem: QRItem;

    constructor(private _newItemServices: NewItemServices,
                private _appServices: AppServices,
                private _router: Router,
                private _geolocationServices: GeolocationServices) {
        this.position = new Position(51.673858, 7.815982);
        this.marker = new Marker();
        this.categories = [];
        this.currentItem = new ItemPost();
        this.currentItem.idEntidad = this._appServices.user.internalEntityId;
        this.itemTypes = [
            {
                id: 11,
                name: "Producto"
            },
            {
                id: 12,
                name: "Servicio"
            }
        ];
        this._newItemServices.getCategories().subscribe((categories: Array<Category>) => {
            this.categories = categories;
        });

      this._geolocationServices.getCurrentLocation().subscribe((position: Position) => {
            this.position = position;
        });
    }

    ngOnInit():any {
        $(document).ready(function() {
            (<any>$('select')).material_select();
        });
    }

    public create() {
        this._newItemServices.createItem(this.currentItem);
        this._router.navigate( ['Home'] );
        this._newItemServices.registerQR(this.currentQRItem);
    }
    public setIdType(value: string) {
        this.currentItem.idTipo = Number(value);
    }

    public setClasificationId(value: string) {
        this.currentItem.idClasificacion = Number(value);
    }

    public imageChange(input){
        let reader = new FileReader();
        reader.addEventListener("load", (event) => {
            this.currentItem.imagen =  (<any>event.target).result;
        });
        if (input.files[0]) {
            reader.readAsDataURL(input.files[0]);
        }
    }
    public  selectPlace (event: MouseEvent) {
        this.currentQRItem.latitude = event.coords.lat;
        this.currentQRItem.longitude = event.coords.lng;
        this.marker = new Marker(event.coords.lat, event.coords.lng, "lugar", true);
    }
}


