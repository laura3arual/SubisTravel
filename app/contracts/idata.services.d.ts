interface IDataServices {
	getData(restUrl: string, headers?): Promise<any>;
	postData(restUrl: string, data: string, headers?): Promise<any>;
	deleteData(restUrl: string): Promise<any>;
}