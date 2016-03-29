import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {ProviderServices} from "./provider.services";
import {Provider} from "./provider.models";

@Component({
    template: require("./provider.component.html"),
    styles: [require("./provider.components.scss").toString()],
    providers: [ProviderServices]
})

export class ProviderComponent implements OnInit{
    private provider: Provider;

    constructor(private _providerServices: ProviderServices, private _routeParams: RouteParams) {
        this.provider = new Provider();
    }

    ngOnInit():any {
        let providerId = Number(this._routeParams.get("id"));
        this._providerServices.getProvider(providerId).subscribe((provider: Provider) => {
            this.provider = provider;
        })
    }

}


