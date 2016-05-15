import {Injectable} from "@angular/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {User, UserQuery} from "../core/models/User";
import {Credentials, InternalSession} from "./app.models";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {BasicProduct, IntermediateProduct, ProProduct} from "../core/models/SubisTravelProducts";

declare var Auth0Lock;

@Injectable()

export class AppServices {

    private apiUrlSocialLogin: string;
    private apiUrlShoppingCartBadge: string;
    private apiUrlProductConfiguration: string;
    public user: User;
    public config: IProduct;
    private lock;
    private jwtHelper;

    constructor(private _dataServices: DataServices) {

        this.lock = new Auth0Lock("B51ODht1f4rqVqT9V3kGohThilQylG4L", "subistravel.auth0.com");

        this.jwtHelper = new JwtHelper();
        this.apiUrlSocialLogin = "usuarios/loguear";
        this.apiUrlShoppingCartBadge = "transacciones/cantidadEnCarrito/";
        this.apiUrlProductConfiguration= "config/front/feature";
        this.user = new User();
        this.loadUser();
        this.loadProductConfiguration();
    }

    public getUserById(userId: number): Promise<UserQuery>{
        return this._dataServices.getData(Config.baseUrl + "entidades/" + userId).toPromise();
    }

    public loadUser() {
        let profile = localStorage.getItem("profile");
        this.user = profile?<User>(JSON.parse(profile)):<User>{};
    }

    public login(): Promise<any>{
        return new Promise((resolve, reject) => {
            let loginAuth: any = {
                connections: ['Username-Password-Authentication'],
                icon:           'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-group-128.png',
                showIcon:       true
            };
            if(this.config.socialNetworkAuthentication) {
                let socialNetworks = ['facebook', 'twitter'];
                loginAuth.connections = [ ...socialNetworks, ...loginAuth.connections] ;
            }
            this.lock.show(
                loginAuth,(err: string, profile: any, id_token: string) => {
                    if (err){
                        throw new Error(err);
                    }
                    localStorage.setItem("id_token", id_token);
                    this.internalLogin(profile).then(() => {
                        resolve(true);
                    });
                });

            this.loggedIn();

        });

    }

    public logout() {
        this.clearStorage();
        this.user = <User>{};
        this.loggedIn();
    }

    public loggedIn(){
        return tokenNotExpired();
    }

    public getShoppingCartBadge(): Observable<number>{
        return this._dataServices.getData(Config.baseUrl + this.apiUrlShoppingCartBadge + this.user.internalUserId);
    }


    private internalLogin(profile: User): Promise<any> {
        this.user = profile;
        let credentials = new Credentials();
        credentials.socialId = profile.user_id;
        credentials.picture = profile.picture;
        credentials.name = profile.name;
        credentials.email = undefined;
        return new Promise((resolve, reject) => {
            this._dataServices.postData(Config.baseUrl + this.apiUrlSocialLogin, JSON.stringify(credentials)).then((session: InternalSession) => {
                this.user = profile;
                this.user.role = session.idType;
                this.user.internalEntityId = session.idEntity;
                this.user.internalUserId = session.idUser || 1;
                localStorage.setItem("profile", JSON.stringify(this.user));
                resolve(true);
            });
        });
    }

    private clearStorage(){
        localStorage.removeItem("profile");
        localStorage.removeItem("id_token");
    }

    private loadProductConfiguration(){
        this._dataServices.getData(Config.baseUrl + this.apiUrlProductConfiguration).subscribe((configProduct: any) => {
            switch (configProduct.productType) {
                case 'Basico':
                {
                    this.config = new BasicProduct();
                    break;
                }
                case 'Intermedio':
                {
                    this.config = new IntermediateProduct();
                    break;
                }
                case 'Pro':
                {
                    this.config = new ProProduct();
                    break;
                }
                default: {
                    this.config = new BasicProduct();
                    break;
                }
            }
        });
    }
}

