import {Injectable} from "angular2/core";
import {DataServices} from "../core/services/data.services";
import {Config} from "../core/config";
import {User, UserQuery} from "../core/models/User";
import {Credentials, InternalSession} from "./app.models";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";

declare var Auth0Lock;

@Injectable()

export class AppServices {

    private apiUrlSocialLogin: string;
    public user: User;
    private lock;
    private jwtHelper;

    constructor(private _dataServices: DataServices) {

        this.lock = new Auth0Lock("B51ODht1f4rqVqT9V3kGohThilQylG4L", "subistravel.auth0.com");
        this.jwtHelper = new JwtHelper();
        this.apiUrlSocialLogin = "usuarios/accederConSocialId";
        this.user = new User();
        this.loadUser();
    }

    public getUserById(userId: number): Promise<UserQuery>{
        return this._dataServices.getData(Config.baseUrl + "entidades/" + userId).toPromise();
    }

    public loadUser() {
        let profile = localStorage.getItem("profile");
        this.user = profile?<User>(JSON.parse(profile)):<User>{};
    }

    public login(){
        let self = this;
        this.lock.show((err: string, profile: any, id_token: string) => {
            if (err){
                throw new Error(err);
            }
            localStorage.setItem("id_token", id_token);
            this.internalLogin(profile);
        });

        self.loggedIn();
    }
    
    public logout() {
        this.clearStorage();
        this.user = <User>{};
        this.loggedIn();
    }

    public loggedIn(){
        return tokenNotExpired();
    }


    private internalLogin(profile: User): void {
        this.user = profile;
        let credentials = new Credentials();
        credentials.socialId = profile.user_id;
        credentials.picture = profile.picture;
        credentials.name = profile.name;
        this._dataServices.postData(Config.baseUrl + this.apiUrlSocialLogin, JSON.stringify(credentials)).then((session: InternalSession) => {
            this.user = profile;
            this.user.role = session.idType;
            this.user.internalEntityId = session.idEntity;
            this.user.internalUserId = session.idUser || 1;
            localStorage.setItem("profile", JSON.stringify(this.user));
        });
    }

    private clearStorage(){
        localStorage.removeItem("profile");
        localStorage.removeItem("id_token");
    }
}

