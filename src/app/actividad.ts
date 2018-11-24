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
    localizacion: number[];
    ubicacion: string;
}