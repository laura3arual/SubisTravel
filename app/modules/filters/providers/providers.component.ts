import {Component} from "angular2/core";
import {ProvidersServices} from "./providers.services";
import {Provider} from "./providers.models";
import {GalleryServices} from "../../gallery/gallery.services";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: "providers",
    providers: [ProvidersServices],
    template: require("./providers.component.html"),
    directives: [ROUTER_DIRECTIVES],
    styles: [require("./providers.component.scss").toString()]
})

export class ProvidersComponent {
    public providerList: Array<Provider>;
    private currentProviders: Array<number>;

    constructor(private _providersServices: ProvidersServices, private _galleryServices: GalleryServices) {
        this._providersServices.getProviders();
        this.providerList = [];
        this.currentProviders = [];
    }

    ngOnInit() {
        this._providersServices.updateProviders.subscribe((providerList: Array<Provider>) => { this.updateProviderList(providerList)});
    }

    private updateProviderList(itemList: Array<Provider>) {
        this.providerList = itemList;
    }

    private updateProvider(providerId: number) {
        if(this.currentProviders.indexOf(providerId) === -1) {
            this.currentProviders.push(providerId)
        } else {
           this.currentProviders = _.without(this.currentProviders, providerId);
        }
        this.filterGallery();
    }

    private filterGallery(){
        this._galleryServices.filter.providers = this.currentProviders.length?this.currentProviders:undefined;
        this._galleryServices.getGallery();
    }

}