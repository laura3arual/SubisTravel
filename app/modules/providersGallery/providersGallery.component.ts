import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Provider} from "./providersGallery.models";
import {PaginationComponent} from "../providersFilters/pagination/pagination.component";
import {ProvidersGalleryServices} from "./providersGallery.services";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
  

@Component({
    selector: "providers-gallery",
    providers: [],
    template: require("./providersGallery.component.html"),
    directives: [PaginationComponent, ROUTER_DIRECTIVES],
    styles: [require("./providersGallery.component.scss").toString()]
})

export class ProvidersGalleryComponent {
    public providers:Observable<Array<Provider>>;
    public subscription: any;
    private pages: number;
    private nElements: number;

    constructor(private _providersGalleryServices: ProvidersGalleryServices) {
        this._providersGalleryServices.filter.page = 1; 
        this._providersGalleryServices.getProviders();
    }

    ngOnInit(){
        this.providers = this._providersGalleryServices.updateProviders;
    }

}