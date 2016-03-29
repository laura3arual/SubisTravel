class Provider {
    id: number;
    direccion: string;
    email: string;
    identificacion: string;
    nombre: string;
    imagenPrincipal: string;
    idTipo: number;
};


class ProviderListResponse {
    lstElements: Array<Provider>;
    pages: number;
    elements: number;
}

export {
   Provider, ProviderListResponse
};

