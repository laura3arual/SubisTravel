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

export {
    Item, Estado
};