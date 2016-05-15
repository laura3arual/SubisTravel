import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class GeolocationServices {
    public getCurrentLocation(): Observable<Position> {
        let location = new Subject<Position>();
        if(this.isAvailable()) {
            window.navigator.geolocation.getCurrentPosition((position: Position) => {
                location.next(position);
            });
        }
        return location;
    }

    private isAvailable(){
        return "geolocation" in navigator;
    }
}