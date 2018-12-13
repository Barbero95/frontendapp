import { ObjetoDeNickYEstado } from "./objetoDeNickYEstado";
import {Room} from "./room";


export class Actividad {
    _id: string;
    __v: number;
    titulo: string;
    descripcion: string;
    estrellas:number;
    tags: string[];
    propietario: string;
    rooms: Room[];
    fullRooms: any[];
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
        this.rooms = [];
        this.tags = [];
        this.clientes = [];
        this.horasActividad = 0;
        this.contadorEstrellasActividad = 0;
        this.ubicacion = "";
        this.localizacion = [];

        //
    }
}

