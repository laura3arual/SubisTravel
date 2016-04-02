import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {AppServices} from "../app/app.services";
import {Router} from "angular2/router";
import {NewProviderServices} from "./newProvider.services";
import {ProviderPost} from "./newProvider.models";

@Component({
    template: require("./newProvider.component.html"),
    styles: [require("./newProvider.components.scss").toString()],
    providers: [NewProviderServices]
})

export class NewProviderComponent implements OnInit{
    private currentProvider: ProviderPost;

    constructor(private _newProviderServices: NewProviderServices,
                private _appServices: AppServices,
                private _router: Router) {
        this.currentProvider = new ProviderPost();
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
}


