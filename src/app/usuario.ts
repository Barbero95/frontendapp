export class Usuario {
    _id: number;
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
}