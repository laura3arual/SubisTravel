class User {
    user_id: string;
    internalEntityId: number;
    internalUserId: number;
    role: number;
    name: string;
    given_name: string;
    gender: string;
    picture: string;
}
class UserQuery {
    id: number;
    direccion: string;
    email: string;
    identificacion: string;
    nombre: string;
    imagenPrincipal: string;
    idTipo: number;
}

export {User, UserQuery};