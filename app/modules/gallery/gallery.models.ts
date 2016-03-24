class Item {
    id: number;
    descripcion: string;
    estado: string;
    valor: number;
    idClasificacion: number;
    idEntidad: number;
    idTipo: number;
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

export {
    Item, Estado, ItemListResponse
};
