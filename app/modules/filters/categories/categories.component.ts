import {Component} from "angular2/core";
import {CategoryServices} from "./categories.services";
import {Category} from "./categories.models";
import {GalleryServices} from "../../gallery/gallery.services";

@Component({
    selector: "categories",
    providers: [CategoryServices],
    template: require("./categories.component.html"),
    directives: [],
    styles: [require("./categories.component.scss").toString()]
})

export class CategoriesComponent {
    public categoryList: Array<Category>;
    private currentCategories: Array<number>;

    constructor(private _categoriesServices: CategoryServices, private _galleryServices: GalleryServices) {
        this._categoriesServices.getCategories();
        this.categoryList = [];
        this.currentCategories = [];
    }

    ngOnInit() {
        this._categoriesServices.updateCategories.subscribe((categoryrList: Array<Category>) => { this.updateCategoryList(categoryrList)});
    }

    private updateCategoryList(itemList: Array<Category>) {
        this.categoryList = itemList;
    }

    private updateCategory(categoryId: number) {
        if(this.currentCategories.indexOf(categoryId) === -1) {
            this.currentCategories.push(categoryId)
        } else {
           this.currentCategories = _.without(this.currentCategories, categoryId);
        }
        this.filterGallery();
    }

    private filterGallery(){
        this._galleryServices.filter.clasifications = this.currentCategories.length?this.currentCategories:undefined;
        this._galleryServices.getGallery();
    } 

}