import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {AppServices} from "../app/app.services";
import {Router} from "@angular/router-deprecated";
import {NewProviderServices} from "./newProvider.services";
import {ProviderPost} from "./newProvider.models";
import {Observable} from "rxjs/Observable";
import {Category} from "../filters/categories/categories.models";

@Component({
    template: require("./newProvider.component.html"),
    styles: [require("./newProvider.components.scss").toString()],
    providers: [NewProviderServices]
})

export class NewProviderComponent implements OnInit{
    private currentProvider: ProviderPost;
    private categories: Observable<Array<Category>>;
    private defaultImage: string;

    constructor(private _newProviderServices: NewProviderServices,
                private _appServices: AppServices,
                private _router: Router) {
        this.currentProvider = new ProviderPost();
        this.loadCategories();
        this.defaultImage = "data:image/png;base64,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";
    }
    ngOnInit():any {
        $(document).ready(function() {
            (<any>$('select')).material_select();
        });
    }
    public create() {
        this._newProviderServices.createProvider(this.currentProvider);
        this._router.navigate( ['Providers'] );
    }

    private loadCategories(){
        this.categories = this._newProviderServices.getCategories();
    }

    public setCategory(type) {
        this.currentProvider.idTipo = Number(type);
    }

    public imageChange(input){
        let reader = new FileReader();
        reader.addEventListener("load", (event) => {
            this.currentProvider.imagenPrincipal =  (<any>event.target).result;
        });
        if (input.files[0]) {
            reader.readAsDataURL(input.files[0]);
        }
    }
}


