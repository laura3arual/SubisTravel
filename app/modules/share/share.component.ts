import {Component, Input} from "@angular/core";
import {ShareServices} from "./share.services";
import {Observable} from "rxjs/Observable";

@Component({
	selector: "social-share",
	styles: [require("./share.component.scss").toString()],
	template: require("./share.component.html"),
	directives: [],
	providers: [ShareServices]
})
export class ShareComponent {
	@Input() image: string;
	@Input() description: string;
	@Input() link: string;
	@Input() title: string;
	constructor(private _shareServices: ShareServices) {
	}
	public openFacebook() {
		this._shareServices.getBitlyUrl(this.getShareUrl()).subscribe((shortUrl: string) => {
			window.open(`https://www.facebook.com/sharer/sharer.php?u=${shortUrl}&display=popup&ref=plugin`, 'Subis Travel', 'height=500,width=500');
		});
	}

	public openTwitter() {
		this._shareServices.getBitlyUrl(this.getShareUrl()).subscribe((shortUrl: string) => {
		let shareText = "Esto me parece interesante: ";
			window.open(`http://twitter.com/share?url=${shortUrl}&text=${shareText}`, 'Subis Travel', 'height=500,width=500');
		});
	}

	private getShareUrl() {
		let shareServerBaseUrl = "https://subistravel.herokuapp.com/";
		return `${shareServerBaseUrl}?url=${encodeURIComponent(this.image)}&link=${encodeURIComponent(this.link)}&title=${this.title}&desc=${encodeURIComponent(this.description)}`;
	}



}
