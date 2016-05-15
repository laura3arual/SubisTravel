import "font-awesome-webpack";
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import {provide} from '@angular/core';

import {AppComponent} from './app/app.component';
import {DataServices} from "./core/services/data.services";
import {Http} from "@angular/http";
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from "angular2-google-maps/core";
import {GeolocationServices} from "./core/services/geolocation.services";

bootstrap(AppComponent, [
    Http,
    HTTP_PROVIDERS,
    DataServices,
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    GeolocationServices

])
    .catch(err => console.error(err));
