import {Component} from "angular2/core";
import {ProvidersComponent} from "../providers/providers.component";
import {RangeComponent} from "../range/range.component";
import {ControlGroup} from "angular2/common";
import {GalleryServices} from "../gallery/gallery.services";
import {FormBuilder} from "angular2/common";
import {CategoriesComponent} from "../categories/categories.component";

@Component({
    selector: "filters",
    template: require("./filters.component.html"),
    styles: [require("./filters.component.scss").toString()],
    directives: [ProvidersComponent, RangeComponent, CategoriesComponent]
})

export class FiltersComponent{

    private searchForm: ControlGroup;

    constructor(private _galleryServices: GalleryServices, fb: FormBuilder) {
        this.searchForm = fb.group({
            searchText: ""
        });
    }

    private filterGallery(){
        if(this.searchForm.value.searchText){
            this._galleryServices.filter.name = this.searchForm.value.searchText;
            this._galleryServices.getGallery();
        }
    }

}


