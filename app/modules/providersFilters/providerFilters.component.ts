import {CategoriesComponent} from "./categories/categories.component";
import {Component} from "@angular/core";
import {ControlGroup, FormBuilder} from "@angular/common";
import {ProvidersGalleryServices} from "../providersGallery/providersGallery.services";

@Component({
    selector: "providers-filters",
    template: require("./providerFilters.component.html"),
    styles: [require("./providerFilters.component.scss").toString()],
    directives: [CategoriesComponent]
})

export class ProviderFiltersComponent{

    private searchForm: ControlGroup;

    constructor(private _providersGalleryServices: ProvidersGalleryServices, fb: FormBuilder) {
        this.searchForm = fb.group({
            searchText: ""
        });
    }

    private filterGallery(){
        if(this.searchForm.value.searchText){
            this._providersGalleryServices.filter.name = this.searchForm.value.searchText;
        } else {
            this._providersGalleryServices.filter.name = undefined;
        }
        this._providersGalleryServices.getProviders();
    }

}


