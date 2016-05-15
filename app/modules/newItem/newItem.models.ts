class ItemPost {
    nombre: string;
    descripcion: string;
    imagen: string;
    valor: number;
    idClasificacion: number;
    idEntidad: number;
    idTipo: number;
}
class ItemResponse {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    estado: string;
    valor: number;
    promedioCalificacion: number;
    descripcionCantidad: string;
    idClasificacion: number;
    idEntidad: number;
    idTipo: number;
}

class QRItem {
    url_item: string;
    id_type: string;
    latitude: number;
    longitude: number;
    id_app_item: string;
}

export { ItemPost, ItemResponse, QRItem };