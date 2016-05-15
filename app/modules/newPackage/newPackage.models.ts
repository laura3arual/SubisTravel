import {Item} from "../item/item.models";
class PackagePost {
    idItemPaquete: number;
    idsItemsIncluidos: Array<number>;
    constructor(){
        this.idsItemsIncluidos = [];
    }
}

class Package {
    idItemPaquete: number;
    idsItemsIncluidos: Array<number>;
    itemPaquete: Item;
    itemsIncluidos: Array<Item>;
}

export { PackagePost, Package };