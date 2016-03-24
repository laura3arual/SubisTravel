import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {ItemServices} from "./item.services";
import {RouteParams} from "angular2/router";
import {Item} from "./item.models";

@Component({
    template: require("./item.component.html"),
    styles: [require("./item.components.scss").toString()],
    providers: [ItemServices]
})

export class ItemComponent implements OnInit{
    private item: Item;

    constructor(private _itemServices: ItemServices, private _routeParams: RouteParams) {
        this.item = new Item();
    }

    ngOnInit():any {
        let itemId = Number(this._routeParams.get("id"));
        this._itemServices.getItem(itemId).subscribe((item: Item) => {
            this.item = item;
        })
    }

}


