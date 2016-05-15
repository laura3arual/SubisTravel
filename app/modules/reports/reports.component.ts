import {Component} from "@angular/core";
import {OrderBy} from "../core/pipes/orderBy.pipe";
import {AppServices} from "../app/app.services";
import {ItemServices} from "../item/item.services";
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {ReportsServices} from "./reports.services";
import {QueryReport, SearchReport} from "./reports.models";
import {Observable} from "rxjs/Observable";

@Component({
    template: require("./reports.component.html"),
    styles: [require("./reports.components.scss").toString()],
    pipes: [OrderBy],
    providers: [ReportsServices],
    directives: [ROUTER_DIRECTIVES]
})

export class ReportsComponent{
    public queries: Observable<Array<QueryReport>>;
    public searches: Observable<Array<SearchReport>>;
    public currentTab: string;
    constructor(private _reportsServices: ReportsServices,
                private _appServices: AppServices,
                private _itemServices: ItemServices,
                private _router: Router) {

        this.currentTab = "searches";
        this.loadReports();
    }

    private loadReports() {
        this.queries = this._reportsServices.getQueries(this._appServices.user.internalUserId);
        this.searches = this._reportsServices.getSearches(this._appServices.user.internalUserId);
    }


}


