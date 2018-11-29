export class Usuario {
    _id: string;
    __v: number;
    nombre: string;
    apellido: string;
    nick: string;
    email: string;
    password: string;
    tags: string[];
    estrellas: number;
    imagen: string;
    horasUsuario: number;
    contadorEstrellasUsuario: number;
    actividadesPropietario: number[];
    actividadesCliente: number[];

    constructor(){
        this._id = "";
        this.__v = 0;
        this.nombre = "";
        this.apellido = "";
        this.nick = "";
        this.email = "";
        this.password = "";
        this.tags = [];
        this.estrellas = 0;
        this.imagen = "";
        this.horasUsuario = 0;
        this.contadorEstrellasUsuario = 0;
        this.actividadesPropietario = [];
        this.actividadesCliente = [];
    }
}