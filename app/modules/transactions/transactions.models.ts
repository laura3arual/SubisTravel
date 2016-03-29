import {Item} from "../item/item.models";
import {UserQuery} from "../core/models/User";

class Transaction {
    id: number;
    cantidad: number;
    estado: string;
    fecha: string;
    valor: number;
    idItem: number;
    idUsuario: number;
    item: Item;
    user: UserQuery;
}

export { Transaction };