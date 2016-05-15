import {Component} from "@angular/core";
import {OrderBy} from "../core/pipes/orderBy.pipe";
import {AppServices} from "../app/app.services";
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {SendMessagesServices} from "./sendMessages.services";
import {SendMessage} from "./sendMessages.models";
import {Observable} from "rxjs/Observable";
import {User} from "../core/models/User";

@Component({
    template: require("./sendMessages.component.html"),
    styles: [require("./sendMessages.components.scss").toString()],
    pipes: [OrderBy],
    providers: [SendMessagesServices],
    directives: [ROUTER_DIRECTIVES]
})

export class SendMessageComponent {
    public currentMessage: SendMessage;
    public managers: Observable<Array<User>>;
    public providers: Observable<Array<User>>;
    public clients: Observable<Array<User>>;
    constructor(private _sendMessagesServices: SendMessagesServices,
                private _appServices: AppServices,
                private _router: Router) {
        this.currentMessage = new SendMessage();
        this.managers = this._sendMessagesServices.getManagers();
        this.providers = this._sendMessagesServices.getProviders();
        this.clients = this._sendMessagesServices.getClients();
    }

    private sendMessage() {
        this.currentMessage.idUsuarioOrigen = this._appServices.user.internalUserId;
        this.currentMessage.idMensajeRelacionado = 1;
        this._sendMessagesServices.sendMessage(this.currentMessage);
        this.currentMessage = new SendMessage();
    }

}


