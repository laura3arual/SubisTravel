class ProviderPost {
    direccion: string;
    email: string;
    identificacion: string;
    nombre: string;
    imagenPrincipal: string;
    estado: string;
    idTipo: number;
    password: string;
    constructor(){
        this.idTipo = 4;
        this.estado = null;
    }

}
export { ProviderPost };