import {Component} from "@angular/core";
import {ControlGroup, FormBuilder} from "@angular/common";
import {GalleryServices} from "../gallery/gallery.services";
import {ProvidersComponent} from "./providers/providers.component";
import {RangeComponent} from "./range/range.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ItemTypeComponent} from "./types/types.component";

@Component({
    selector: "filters",
    template: require("./filters.component.html"),
    styles: [require("./filters.component.scss").toString()],
    directives: [ProvidersComponent, RangeComponent, CategoriesComponent, ItemTypeComponent]
})

export class FiltersComponent{

    private searchForm: ControlGroup;

    constructor(private _galleryServices: GalleryServices, fb: FormBuilder) {
        this.searchForm = fb.group({
            searchText: ""
        });
        this.searchForm.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(() => {this.filterGallery()});
    }

    private filterGallery(){
        if(this.searchForm.value.searchText){
            this._galleryServices.filter.name = this.searchForm.value.searchText;
        } else {
            this._galleryServices.filter.name = undefined;
        }
        this._galleryServices.getGallery();
    }

}


