import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class ShareServices {
    private bitlyToken: string;
    private bitlyUrl: string;

    constructor(private _http: Http) {
        this.bitlyToken = "c5fa137eaa8f6c3512dc3fe5c05db81f17b39ce7";
    }

    getBitlyUrl(url: string): Observable<string> {
        this.bitlyUrl = `https://api-ssl.bitly.com/v3/shorten?access_token=${this.bitlyToken}&longUrl=${encodeURIComponent(url)}`;
        return this._http.get(this.bitlyUrl)
        .map(resp => resp.json())
        .map((response: any) => {
            return response.data.url;
        });
    }
}