import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Provider} from "./providersGallery.models";
import {PaginationComponent} from "../providersFilters/pagination/pagination.component";
import {ProvidersGalleryServices} from "./providersGallery.services";


@Component({
    selector: "providers-gallery",
    providers: [],
    template: require("./providersGallery.component.html"),
    directives: [PaginationComponent, ROUTER_DIRECTIVES],
    styles: [require("./providersGallery.component.scss").toString()]
})

export class ProvidersGalleryComponent {
    public providers:Array<Provider>;
    public subscription: any;
    private pages: number;
    private nElements: number;

    constructor(private _providersGalleryServices: ProvidersGalleryServices) {
        this.providers = [];
        this._providersGalleryServices.getProviders();
    }

    ngOnInit(){
        this.subscription = this._providersGalleryServices.updateProviders.subscribe((providersList: Array<Provider>) => {
            this.updateProviderList(providersList);
        });
    }

    private updateProviderList(providersList: Array<Provider>) {
        this.providers = providersList;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}