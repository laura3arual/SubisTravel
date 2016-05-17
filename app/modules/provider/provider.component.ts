import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {ProviderServices} from "./provider.services";
import {Provider} from "./provider.models";
import {Category} from "../filters/categories/categories.models";
import {Observable} from "rxjs/Observable";
import {AppServices} from "../app/app.services";

@Component({
    template: require("./provider.component.html"),
    styles: [require("./provider.components.scss").toString()],
    providers: [ProviderServices]
})

export class ProviderComponent implements OnInit{
    private provider: Provider;
    public showEdit: boolean;
    private categories: Observable<Array<Category>>;
    private currentCategory: String;
    private allowedToEdit: boolean;

    constructor(private _providerServices: ProviderServices, private _routeParams: RouteParams, private _appServices: AppServices) {
        this.provider = new Provider();
        this.showEdit = false;
        this.currentCategory = undefined;
        this.allowedToEdit = this._appServices.user.role === 5;
    }

    ngOnInit():any {
        this.getProvider();
    }

    private getProvider() {
        let providerId = Number(this._routeParams.get("id"));
        this._providerServices.getProvider(providerId).subscribe((provider: any) => {
            this.provider = provider;
            this.provider.estado = provider.estado?provider.estado:null;
            this.provider.identificacion = provider.identificacion?provider.identificacion:null;
            this.loadCategories();
        })
    }
    private loadCategories(){
        this.categories = this._providerServices.getCategories();
        this.categories.subscribe((categories: Array<Category>) => {
            let theCategory = _.find(categories, (category: Category) =>{
                return category.id === this.provider.idTipo;
            });
            this.currentCategory = theCategory.nombre;
            this.showEdit = false;
        });
    }

    public update() {
        this._providerServices.updateProvider(this.provider);
        setTimeout(() => {
            this.getProvider();
        }, 1000);
    }

    public setCategory(type) {
        this.provider.idTipo = Number(type);
    }


    public imageChange(input){
        let reader = new FileReader();
        reader.addEventListener("load", (event) => {
            this.provider.imagenPrincipal =  (<any>event.target).result;
        });
        if (input.files[0]) {
            reader.readAsDataURL(input.files[0]);
        }
    }

}


