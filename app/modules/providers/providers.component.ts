import {ProvidersGalleryComponent} from "../providersGallery/providersGallery.component";
import {Component} from "@angular/core";
import {ProviderFiltersComponent} from "../providersFilters/providerFilters.component";

@Component({
	selector: "providers",
	styles: [require("./providers.component.scss").toString()],
	template: require("./providers.component.html"),
	directives: [ProvidersGalleryComponent, ProviderFiltersComponent],
	providers: []
})
export class ProvidersComponent {
	constructor() {
	}
}
