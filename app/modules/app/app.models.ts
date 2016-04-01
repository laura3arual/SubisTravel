const Roles = {
    3: "Cliente",
    4: "Empresa",
    5: "Administrador",
};

class Credentials {
    socialId: string;
    picture: string;
    name: string;
    email: string;
}
class InternalSession {
    idEntity: number;
    idType: number;
    idUser: number;
}

export {Roles, Credentials, InternalSession};