import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {EventEmitter} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {Item, RatingPost, Rate, QuestionPost, Question, QrResponse} from "./item.models";
import {Observable} from "rxjs/Observable";
import {Package} from "../newPackage/newPackage.models";

@Injectable()

export class ItemServices {

    private apiUrlItems: string;
    private apiUrlRating: string;
    private apiUrlQuestions: string;
    private apiUrlAnswers: string;
    private apiUrlAddQuestion: string;
    private apiUrlGetPackage: string;
    private apiUrlGetQR: string;

    constructor(private _dataServices: DataServices, private _http: Http) {
        this.apiUrlItems = "items/";
        this.apiUrlRating = "calificaciones/items/";
        this.apiUrlQuestions = "preguntas/items/";
        this.apiUrlAnswers = "preguntas/respuestas/";
        this.apiUrlAddQuestion = "preguntas/registrar";
        this.apiUrlGetPackage = "paquetes/items/";
        this.apiUrlGetQR = "http://subisqr.wwhanvbxmn.us-west-2.elasticbeanstalk.com/subis/item/";
    }

    public getItem(id: number): Observable<Item> {
        return this._dataServices.getData(Config.baseUrl + this.apiUrlItems + id).map((itemWrapper: any)=>{
            if(itemWrapper.item){
                return itemWrapper.item;
            } else {
                return itemWrapper;
            }
        });
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

    public getPackage(packageId: number): Observable<Package>{
        return this._dataServices.getData(Config.baseUrl + this.apiUrlGetPackage + packageId)
    }

    public getQr(packageId: number): Observable<QrResponse>{

        let headers = new Headers();
        headers.append('client_id', 'n8XKjM_z6OozP__BHrSd8Qr9sH4y5LcGSOdC7uNpdtRXJbsUmP');

        let options = new RequestOptions({ headers: headers});
        return this._http.get(this.apiUrlGetQR + packageId, options).map((response:Response) => {
            console.log(response);
            return response.json().data;
        }); 
    }
}

