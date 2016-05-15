import {HomeComponent} from "../home/home.component";
import {GalleryComponent} from "../gallery/gallery.component";
import {ProfileComponent} from "../profile/profile.component";
import {ItemComponent} from "../item/item.component";
import {ProvidersComponent} from "../providers/providers.component";
import {ProviderComponent} from "../provider/provider.component";
import {NewItemComponent} from "../newItem/newItem.component";
import {ShoppingCartComponent} from "../shoppingCart/shoppingCart.component";
import {TransactionsComponent} from "../transactions/transactions.component";
import {MyPurchasesComponent} from "../myPurchases/myPurchases.component";
import {MySalesComponent} from "../mySales/mySales.component";
import {UnsuscribeComponent} from "../unsuscribe/unsuscribe.component";
import {NewProviderComponent} from "../newProvider/newProvider.component";
import {NewPackageComponent} from "../newPackage/newPackage.component";
import {MyMessageComponent} from "../myMessages/myMessages.component";
import {SendMessageComponent} from "../sendMessages/sendMessages.component";
import {ReportsComponent} from "../reports/reports.component";

export const ROUTES = [
    { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true},
    { path: '/item/:id', component: ItemComponent, name: 'Item'},
    { path: '/gallery', component: GalleryComponent, name: 'Gallery'},
    { path: '/profile', component: ProfileComponent, name: 'Profile'},
    { path: '/providers', component: ProvidersComponent, name: 'Providers'},
    { path: '/provider/:id', component: ProviderComponent, name: 'Provider'},
    { path: '/new-item', component: NewItemComponent, name: 'NewItem'},
    { path: '/new-package', component: NewPackageComponent, name: 'NewPackage'},
    { path: '/new-provider', component: NewProviderComponent, name: 'NewProvider'},
    { path: '/shopping-cart', component: ShoppingCartComponent, name: 'ShoppingCart'},
    { path: '/transactions', component: TransactionsComponent, name: 'Transactions'},
    { path: '/my-purchases', component: MyPurchasesComponent, name: 'MyPurchases'},
    { path: '/my-sales', component: MySalesComponent, name: 'MySales'},
    { path: '/my-messages', component: MyMessageComponent, name: 'MyMessages'},
    { path: '/send-messages', component: SendMessageComponent, name: 'SendMessages'},
    { path: '/reports', component: ReportsComponent, name: 'Reports'},
    { path: '/unsuscribe', component: UnsuscribeComponent, name: 'Unsuscribe'}
];