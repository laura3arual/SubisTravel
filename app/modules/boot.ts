import "font-awesome-webpack";
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './app/app.component';
import {DataServices} from "./core/services/data.services";
import {Http} from "angular2/http";

import {LocationStrategy} from "angular2/router";
import {HashLocationStrategy} from "angular2/router";
import {provide} from "angular2/core";

bootstrap(AppComponent, [
    Http,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    DataServices,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
])
    .catch(err => console.error(err));
