import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {ItemServices} from "./item.services";
import {RouteParams, Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Item, RatingPost, Rate, QuestionPost, Question} from "./item.models";
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
    private users: Array<UserQuery>;
    private package: Package;
    private userRole: number;
    public currentUrl: string;

    constructor(private _itemServices: ItemServices,
                private _routeParams: RouteParams,
                private _appServices: AppServices,
                private _shoppingCartServices: ShoppingCartServices,
                private _router: Router) {

        this.userRole = this._appServices.user.role;
        this.item = new Item();
        this.currentRating = new RatingPost();
        this.currentQuestion = new QuestionPost();
        this.currentRating.idUsuario = _appServices.user.internalUserId || 1;
        this.currentQuestion.idUsuario = _appServices.user.internalUserId || 1;
        this.ratings = [];
        this.users = [];
        this.canComment = false;
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
            this.getRatings();
            this.getQuestions();
            this.currentQuestion.idItem = item.id;
            this._itemServices.canComment(this.item.id, this._appServices.user.internalUserId).then((response: boolean) => {
                this.canComment = response;
            });
            if(this.item.idTipo === 13) {
                this._itemServices.getPackage(this.item.id).subscribe((pack: Package) => {
                    this.package = pack;
                });
            }
        });
        
       this.currentUrl = window.location.href;
    }

    ngAfterViewChecked(){
        if(this._appServices.config && this.showRatingsAndComments != undefined){
            this.showRatingsAndComments = this._appServices.config.commentsAndRatings;
        }
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


