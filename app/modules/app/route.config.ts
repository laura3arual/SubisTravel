import {HomeComponent} from "../home/home.component";
import {GalleryComponent} from "../gallery/gallery.component";
import {ProfileComponent} from "../profile/profile.component";
import {ItemComponent} from "../item/item.component";

export const ROUTES = [
    { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true},
    { path: '/item/:id', component: ItemComponent, name: 'Item'},
    { path: '/gallery', component: GalleryComponent, name: 'Gallery'},
    { path: '/profile', component: ProfileComponent, name: 'Profile'}
];