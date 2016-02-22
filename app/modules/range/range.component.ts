import {Component} from "angular2/core";
import {ViewChild} from "angular2/core";
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";
let noUiSlider: any = require("nouislider/distribute/nouislider.min.js");


@Component({
    selector: "range",
    providers: [],
    template: require("./range.component.html"),
    directives: [],
    styles: [require("./range.component.scss").toString()]
})

export  class RangeComponent {
    @ViewChild('sliderDomElement') sliderDomElement;
    noUiSlider: any;
    @Input() start: number[];
    @Input() range: any;
    @Input() pips: any;
    @Output() end: EventEmitter<any> = new EventEmitter();

    ngAfterViewInit() {
        let sliderMin = document.getElementById('sliderMin');
        noUiSlider.create(sliderMin, {
            start: [10000, 1000000],
            connect: true,
            step: 1,
            range: {
                'min': 10000,
                'max': 1000000
            },
            format: wNumb({
                decimals: 0
            })
        });

        let sliderMax = document.getElementById('sliderMax');
        noUiSlider.create(sliderMax, {
            start: [10000, 1000000],
            connect: true,
            step: 1,
            range: {
                'min': 10000,
                'max': 1000000
            },
            format: wNumb({
                decimals: 0
            })
        });

    }

    private logSlider(inNoUiSlider: any) {
        console.log(inNoUiSlider);
    }
}
