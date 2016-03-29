import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {NewItemServices} from "./newItem.services";
import {ItemPost} from "./newItem.models";
import {ItemType} from "../gallery/gallery.models";
import {AppServices} from "../app/app.services";
import {Category} from "../providersFilters/categories/categories.models";
import {Router} from "angular2/router";

@Component({
    template: require("./newItem.component.html"),
    styles: [require("./newItem.components.scss").toString()],
    providers: [NewItemServices]
})

export class NewItemComponent implements OnInit{
    private currentItem: ItemPost;
    public categories: Array<Category>;
    private itemTypes: Array<ItemType>;

    constructor(private _newItemServices: NewItemServices,
                private _appServices: AppServices,
                private _router: Router) {
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
            },
            {
                id: 13,
                name: "Paquete"
            }
        ];
        this._newItemServices.getCategories().subscribe((categories: Array<Category>) => {
            this.categories = categories;
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
    }
    public setIdType(value: string) {
        this.currentItem.idTipo = Number(value);
    }

    public setClasificationId(value: string) {
        this.currentItem.idClasificacion = Number(value);
    }
}


