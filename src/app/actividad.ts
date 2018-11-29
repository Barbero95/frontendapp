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
}