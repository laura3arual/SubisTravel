import {Injectable} from "@angular/core";

@Injectable()
export class NotificationServices {
    public toastr: Toastr;
    constructor() {
        this.toastr = require("toastr");
        this.toastr.options = <ToastrOptions>{
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            onclick: null,
            showDuration: 100,
            hideDuration: 1000,
            timeOut: 5000,
            extendedTimeOut: 1000,
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        };
    }

    showSuccess(message: string) {
        this.toastr.success(message);
    }

    showError(message: string) {
        this.toastr.error(message);
    }

    showWarning(message: string) {
        this.toastr.warning(message);
    }

    showInfo(message: string) {
        this.toastr.info(message);
    }

}