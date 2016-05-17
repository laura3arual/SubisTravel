import {User, UserQuery} from "../core/models/User";
class Item {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    estado: string;
    valor: number;
    promedioCalificacion: number;
    idClasificacion: number;
    idEntidad: number;
    idTipo: number;
    calificaciones: string;
    descripcionCantidad: string;
}

class RatingPost {
    valor: number;
    idUsuario: number;
    comentario: string;
}

class QuestionPost {
    descripcion: string;
    idItem: number;
    idUsuario: number;
    idPreguntaPadre: number;
}

class Rate {
    id: number;
    fecha: string;
    valor: number;
    comentario: string;
    idCatalogo: number;
    idItem: number;
    idUsuario: number;
    user: UserQuery;
}

class Question {
    id: number;
    descripcion: string;
    fecha: string;
    idCatalogo: number;
    idItem: number;
    idUsuario: number;
    idPreguntaPadre: string;
    user: UserQuery;
    answers: Array<Question>;
}

class QrResponseObjectData {
    id_item: number;
    url_item: string;
    id_type: number;
    latitude: number;
    longitude: number;
    id_client: number;
    url_image_qr: string;
    id_app_item: number;
}

class QrResponse {
    message: string;
    "objectData": QrResponseObjectData;
}

export { Item,  RatingPost, Rate, QuestionPost, Question, QrResponse};