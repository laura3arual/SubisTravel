class BasicProduct implements IProduct {
    socialNetworkAuthentication:boolean;
    commentsAndRatings:boolean;
    reports:boolean;
    messageSystem:boolean;
    qr :boolean;
    constructor() {
        this.socialNetworkAuthentication = false;
        this.commentsAndRatings = false;
        this.reports = false;
        this.messageSystem = false;
        this.qr = false;
    }
}

class IntermediateProduct implements IProduct {
    socialNetworkAuthentication:boolean;
    commentsAndRatings:boolean;
    reports:boolean;
    messageSystem:boolean;
    qr :boolean;
    constructor() {
        this.socialNetworkAuthentication = true;
        this.commentsAndRatings = true;
        this.reports = false;
        this.messageSystem = false;
        this.qr = false;
    }
}
class ProProduct implements IProduct {
    socialNetworkAuthentication:boolean;
    commentsAndRatings:boolean;
    reports:boolean;
    messageSystem:boolean;
    qr :boolean;
    constructor() {
        this.socialNetworkAuthentication = true;
        this.commentsAndRatings = true;
        this.reports = true;
        this.messageSystem = true;
        this.qr = true;
    }
}

export {BasicProduct, IntermediateProduct, ProProduct};