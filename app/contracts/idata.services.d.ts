import {Observable} from "rxjs/Observable";
interface IDataServices {
	getData(restUrl: string, headers?): Observable<any>;
	postData(restUrl: string, data: string, headers?): Promise<any>;
	deleteData(restUrl: string): Promise<any>;
}