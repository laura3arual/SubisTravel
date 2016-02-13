import {HomeComponent} from "../home/home.component";
import {GalleryComponent} from "../gallery/gallery.component";
import {ProfileComponent} from "../profile/profile.component";

export const ROUTES = [
    { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true},
    { path: '/gallery', component: GalleryComponent, name: 'Gallery'},
    { path: '/profile', component: ProfileComponent, name: 'Profile'},
    { path: '/**', redirectTo: ['Home'] }
];