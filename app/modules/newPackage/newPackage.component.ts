import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {ItemType, ItemListResponse} from "../gallery/gallery.models";
import {AppServices} from "../app/app.services";
import {Category} from "../providersFilters/categories/categories.models";
import {Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {PackagePost} from "./newPackage.models";
import {NewItemServices} from "../newItem/newItem.services";
import {ItemPost, ItemResponse} from "../newItem/newItem.models";
import {NewPackageServices} from "./newPackage.services";
import {Item} from "../gallery/gallery.models";

@Component({
    template: require("./newPackage.component.html"),
    styles: [require("./newPackage.components.scss").toString()],
    providers: [NewItemServices, NewPackageServices],
    directives: [ROUTER_DIRECTIVES]
})

export class NewPackageComponent implements OnInit{
    private currentItem: ItemPost;
    private currentPackage: PackagePost;
    public categories: Array<Category>;
    private items: Array<Item>;

    constructor(private _newPackageServices: NewPackageServices,
                private _newItemServices: NewItemServices,
                private _appServices: AppServices,
                private _router: Router) {
        this.categories = [];
        this.items = [];
        this.currentItem = new ItemPost();
        this.currentItem.idTipo = 13;
        this.currentPackage = new PackagePost();
        this.currentItem.idEntidad = this._appServices.user.internalEntityId;
       
        this._newItemServices.getCategories().subscribe((categories: Array<Category>) => {
            this.categories = categories;
        });
        this._newPackageServices.getItems().then((items: ItemListResponse) =>{
            this.items = items.lstElements;
        })
    }

    ngOnInit():any {
        $(document).ready(function() {
            (<any>$('select')).material_select();
        });
    }

    public createItem() {
        this._newItemServices.createItem(this.currentItem).then((item: ItemResponse) => {
            this.currentPackage.idItemPaquete = item.id;
        });

    }
    public createPackage() {
        this._newPackageServices.createPackage(this.currentPackage);
        this._router.navigate( ['Home'] );
    }


    public setClasificationId(value: string) {
        this.currentItem.idClasificacion = Number(value);
    }

    public updateItemList(id: number){
        if(this.currentPackage.idsItemsIncluidos.indexOf(id) === -1) {
            this.currentPackage.idsItemsIncluidos.push(id)
        } else {
            this.currentPackage.idsItemsIncluidos = _.without(this.currentPackage.idsItemsIncluidos, id);
        }
    }
}


