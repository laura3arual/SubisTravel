import {Component, OnInit} from "@angular/core";
import {OrderBy} from "../core/pipes/orderBy.pipe";
import {AppServices} from "../app/app.services";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {MyMessage} from "./myMessages.models";
import {MyMessagesServices} from "./myMessages.services";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Component({
    template: require("./myMessages.component.html"),
    styles: [require("./myMessages.components.scss").toString()],
    pipes: [OrderBy],
    providers: [MyMessagesServices],
    directives: [ROUTER_DIRECTIVES]
})

export class MyMessageComponent implements OnInit{
    public receivedMessages: Observable<Array<MyMessage>>;
    public sentMessages: Observable<Array<MyMessage>>;
    public currentTab: string;

    constructor(private _myMessagesServices: MyMessagesServices,
                private _appServices: AppServices) {
        this.receivedMessages = new Subject<Array<MyMessage>>();
        this.sentMessages = new Subject<Array<MyMessage>>();
        this.loadMyMessages();
        this.currentTab = "recibidos";
    }

    ngOnInit():any {
    }

    private loadMyMessages() {
        this.receivedMessages = this._myMessagesServices.getReceivedMyMessages(this._appServices.user.internalUserId);
        this.sentMessages = this._myMessagesServices.getMySentMessages(this._appServices.user.internalUserId);
    }

    private getDate(date: string) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
}


