class Item {
    id: number;
    descripcion: string;
    estado: string;
    valor: number;
    idClasificacion: number;
    idEntidad: number;
    idTipo: number;
    imagen: string;
};

enum Estado {
    ACTIVO,
    INACTIVO,
    PUBLICADO
};

class ItemListResponse {
    lstElements: Array<Item>;
    pages: number;
    elements: number;
}

class ItemType {
    id: number;
    name: string;
}


export {
    Item, Estado, ItemType, ItemListResponse
};