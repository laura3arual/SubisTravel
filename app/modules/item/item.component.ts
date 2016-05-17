import {Component, ChangeDetectorRef} from "@angular/core";
import {OnInit} from "@angular/core";
import {ItemServices} from "./item.services";
import {RouteParams, Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Item, RatingPost, Rate, QuestionPost, Question, QrResponse} from "./item.models";
import {AppServices} from "../app/app.services";
import {User, UserQuery} from "../core/models/User";
import * as moment from "moment";
import {OrderBy} from "../core/pipes/orderBy.pipe";
import {ShoppingCartServices} from "../shoppingCart/shoppingCart.services";
import {ShoppingCartItemPost} from "../shoppingCart/shoppingCart.models";
import {Package} from "../newPackage/newPackage.models";
import {NewPackageServices} from "../newPackage/newPackage.services";
import {ShareComponent} from '../share/share.component';

@Component({
    template: require("./item.component.html"),
    styles: [require("./item.components.scss").toString()],
    pipes: [OrderBy],
    directives: [ROUTER_DIRECTIVES, ShareComponent],
    providers: []
})

export class ItemComponent implements OnInit{
    private item: Item;
    private currentRating: RatingPost;
    private currentQuestion: QuestionPost;
    private ratings: Array<Rate>;
    private questions: Array<Question>;
    private canComment: boolean;
    private showRatingsAndComments: boolean;
    private showNetworkShare: boolean;
    private showQR: boolean;
    private users: Array<UserQuery>;
    private package: Package;
    private userRole: number;
    public currentUrl: string;
    public currentQRCode: string;

    constructor(private _itemServices: ItemServices,
                private _routeParams: RouteParams,
                private _appServices: AppServices,
                private _shoppingCartServices: ShoppingCartServices,
                private _router: Router,
                private _changeDetectorRef: ChangeDetectorRef) {

        this.userRole = this._appServices.user.role;
        this.item = new Item();
        this.currentRating = new RatingPost();
        this.currentQuestion = new QuestionPost();
        this.currentRating.idUsuario = _appServices.user.internalUserId || 1;
        this.currentQuestion.idUsuario = _appServices.user.internalUserId || 1;
        this.ratings = [];
        this.users = [];
        this.canComment = false;
        this.currentQRCode = "data:image/png;base64,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";
    }
 
    ngOnInit():any {
        (<any>$('.collapsible')).collapsible({
            accordion : false
        });
        $(document).ready(function(){
            (<any>$('.tooltipped')).tooltip();
        });
        let itemId = Number(this._routeParams.get("id"));
        this._itemServices.getItem(itemId).subscribe((item: any) => {
            this.item = item; 
            if(this._appServices.config.commentsAndRatings) {
                this.getRatings();
                this.getQuestions();
                this.currentQuestion.idItem = item.id;
                if(this._appServices.loggedIn()) {
                    this._itemServices.canComment(this.item.id, this._appServices.user.internalUserId).then((response: boolean) => {
                        this.canComment = response;
                    });
                }
            }

            if(this.item.idTipo === 13) {
                this._itemServices.getPackage(this.item.id).subscribe((pack: Package) => {
                    this.package = pack;
                });
            }
            
            this._itemServices.getQr(itemId).subscribe((response: QrResponse) => {
                this.currentQRCode = response.objectData.url_image_qr;
            })
        });
        
       this.currentUrl = window.location.href;
    }

    ngAfterViewChecked(){
        if(this._appServices.config && this.showRatingsAndComments === undefined){
            this.showRatingsAndComments = this._appServices.config.commentsAndRatings;
        }

        if(this._appServices.config && this.showNetworkShare === undefined){
            this.showNetworkShare = this._appServices.config.socialNetworkAuthentication;
        }

        if(this._appServices.config && this.showQR === undefined){
            this.showQR = this._appServices.config.qr;
        }
        this._changeDetectorRef.detectChanges();
    }

    public rate() {
        this._itemServices.rate(this.item.id, this.currentRating).then(() => {
            this.getRatings();
            this.currentRating = new RatingPost();
        });
    }

    public addQuestion() {
        this._itemServices.addQuestion(this.currentQuestion).then(() => {
            this.getQuestions();
            this.currentQuestion = new QuestionPost();
        });
    }
    public addAnswer(question: Question, message: string) {
        let response = _.extend({}, this.currentQuestion);
        response.idPreguntaPadre = question.id;
        response.descripcion = message;
        this._itemServices.addQuestion(response).then(() => {
            this.getAnswers(question);
        });
    }

    public addItemToShoppingCart(itemId: number, quantity: number){
        if (!this._appServices.loggedIn()) {
            this._appServices.login();
        } else {
            let shoppingCartItemPost = new ShoppingCartItemPost();
            shoppingCartItemPost.idItem = itemId;
            shoppingCartItemPost.idUser = this._appServices.user.internalUserId;
            shoppingCartItemPost.quantity = quantity;
            this._shoppingCartServices.addItem(shoppingCartItemPost).then(() => {
                this._router.navigate( ['ShoppingCart'] );
            });
        }
    }

    private getRatings() {
        this._itemServices.getRatings(this.item.id).then((ratings: Array<Rate>) => {
            this.ratings = ratings;
            _.each(this.ratings, (rate: Rate) => {
                rate.fecha = moment(rate.fecha).format('MMMM Do YYYY, h:mm:ss a');
                let savedUser = _.find(this.users, {id: rate.idUsuario});
                if(savedUser) {
                    rate.user = savedUser;
                } else {
                    this._appServices.getUserById(rate.idUsuario). then((user: UserQuery) => {
                        this.users.push(user);
                        rate.user = user;
                    });
                }
            });
        });
    }

    private getQuestions() {
        this._itemServices.getQuestions(this.item.id).then((questions: Array<Question>) => {
            this.questions = questions;
            _.each(this.questions, (question: Question) => {
                question.fecha = moment(question.fecha).format('MMMM Do YYYY, h:mm:ss a');
                let savedUser = _.find(this.users, {id: question.idUsuario});
                if(savedUser) {
                    question.user = savedUser;
                } else {
                    this._appServices.getUserById(question.idUsuario). then((user: UserQuery) => {
                        this.users.push(user);
                        question.user = user;
                    });
                }
                this.getAnswers(question);
            });
        });
    }

    public getAnswers(question: Question){
        this._itemServices.getAnswers(question.id).then((answers: Array<Question>) => {
            _.each(answers, (answer: Question) => {
                answer.fecha = moment(answer.fecha).format('MMMM Do YYYY, h:mm:ss a');
                let savedUser = _.find(this.users, {id: answer.idUsuario});
                if(savedUser) {
                    answer.user = savedUser;
                } else {
                    this._appServices.getUserById(answer.idUsuario). then((user: UserQuery) => {
                        this.users.push(user);
                        answer.user = user;
                    });
                }
            });
            question.answers = answers;
        });
    }

    public loggedIn() {
        return this._appServices.loggedIn();
    }
    
    
}


