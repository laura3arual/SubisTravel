import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {GalleryServices} from "../../gallery/gallery.services";
@Component({
    selector: "pagination",
    template: require("./pagination.componet.html"),
    styles: [require("./pagination.component.scss").toString()]
})

export class PaginationComponent implements OnInit{
    private pageSetSize: number;
    private pageSetSteps: number;
    private pageSetIndex: number;
    private lastPage: number;
    private currentPage: number;
    private maxPages: number;
    private currentPages: Array<number>;

    constructor(private _galleryServices: GalleryServices){
        this.currentPage = 1;
        this.pageSetSize = 5;
        this.pageSetSteps = 3;
        this.pageSetIndex = 0;
        this.lastPage = 1;
        this.maxPages = 10;

    }

    ngOnInit() {
        this._galleryServices.updatePagination.subscribe((pages: number) => this.setMaxPages(pages));
    }

    private setCurrentPage(page: number) {
        this.currentPage = page;
        this._galleryServices.filter.page = page;
        this._galleryServices.getGallery();
    }

    private setMaxPages(pages: number) {
        this.maxPages = pages;
        this.currentPages = this.generatePageNumbers();
    }

    private generatePageNumbers() {
        let pageList = [];
        let starts = 1 + this.pageSetIndex * this.pageSetSteps;
        for(let i = starts; (i < starts + this.pageSetSize) && (i <= this.maxPages); i++) {
            pageList.push(i);
        }
        this.lastPage = _.last(pageList);
        return pageList;
    }

    isTheLastSet(){
        return _.contains(this.currentPages, this.maxPages);
    }

    private loadMorePages(){
        this.pageSetIndex ++;
        this.currentPages = this.generatePageNumbers() ;
    }

    private loadLessPages() {
        this.pageSetIndex --;
        this.currentPages = this.generatePageNumbers() ;
    }
}