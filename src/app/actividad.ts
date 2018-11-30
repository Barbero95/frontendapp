import { ObjetoDeNickYEstado } from "./objetoDeNickYEstado";


export class Actividad {
    _id: string;
    __v: number;
    titulo: string;
    descripcion: string;
    estrellas:number;
    tags: string[];
    propietario: string;
    clientes: ObjetoDeNickYEstado[];
    horasActividad: number;
    contadorEstrellasActividad: number;
    localizacion: number[];
    ubicacion: string;

    constructor(){
        this._id = "";
        this.__v = 0;
        this.titulo = "";
        this.descripcion = "";
        this.estrellas = 0;
        this.propietario = "";
        this.tags = [];
        this.clientes = [];
        this.horasActividad = 0;
        this.contadorEstrellasActividad = 0;
        this.ubicacion = "";
        this.localizacion = [];
    }
}

