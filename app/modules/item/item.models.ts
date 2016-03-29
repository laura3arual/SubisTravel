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

export { Item,  RatingPost, Rate, QuestionPost, Question};