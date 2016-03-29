import {Injectable} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Item, RatingPost, Rate, QuestionPost, Question} from "./item.models";
import {Observable} from "rxjs/Observable";

@Injectable()

export class ItemServices {

    private apiUrlItems: string;
    private apiUrlRating: string;
    private apiUrlQuestions: string;
    private apiUrlAnswers: string;
    private apiUrlAddQuestion: string;

    constructor(private _dataServices: DataServices) {
        this.apiUrlItems = "items/";
        this.apiUrlRating = "calificaciones/items/";
        this.apiUrlQuestions = "preguntas/items/";
        this.apiUrlAnswers = "preguntas/respuestas/";
        this.apiUrlAddQuestion = "preguntas/registrar";
    }

    public getItem(id: number): Observable<Item> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlItems + id);
    }

    public rate(id: number, rating: RatingPost): Promise<any> {
        return this._dataServices.postData(Config.baseUrl + this.apiUrlRating + id, JSON.stringify(rating));
    }
    
    public getRatings(id: number): Promise<Array<Rate>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlRating + id).toPromise();
    }
    public addQuestion(question: QuestionPost): Promise<any>{
        return this._dataServices.postData(Config.baseUrl + this.apiUrlAddQuestion, JSON.stringify(question));
    }

    public getQuestions(id: number): Promise<Array<Question>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlQuestions + id).toPromise();
    }
    
    public getAnswers(parentId: number): Promise<Array<Question>> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlAnswers + parentId).toPromise();
    }

    public canComment(itemId: number, userId: number): Promise<boolean> {
        return this._dataServices.getData(Config.baseUrl + "items/" + itemId + "/permiteCalificarItem/" + userId).toPromise();
    }
}

