import {Injectable} from "angular2/core";
import {Headers} from "angular2/http";
import {RequestOptionsArgs} from "angular2/http";
import {Http} from "angular2/http";
import {Response} from "angular2/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataServices {

    private _options: RequestOptionsArgs = {};

    constructor(private _http: Http) {
        this._options.headers = new Headers();
        this._options.headers.append("Authorization", "Bearer ");
        this._options.headers.append("Content-Type", "application/json; charset=utf-8");
    }

    public getData(_restUrl: string, _headers: Headers = undefined): Observable<any> {
        this.setHeaders(_headers);

        return this._http.get(_restUrl)
            .map((response: any) => {
                return response.json();
            }).catch(this.handleError);
    }

    public postData(_restUrl: string, _data: string, _headers: Headers = undefined): Promise<any> {
        this.setHeaders(_headers);

        return this._http.post(_restUrl, _data, this._options)
            .map((response: any) => JSON.parse(response._body)).toPromise()
            .then((response: any) => {
                return response;
            });
    }

    public deleteData(_restUrl: string): Promise<any> {
        return this._http.delete(_restUrl)
            .map((response: any) => JSON.parse(response._body)).toPromise()
            .then((response: any) => {
                return response;
            });
    }

    private setHeaders(headers: Headers) : void {
        if (headers !== undefined) {
            this._options.headers = headers;
        }
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}