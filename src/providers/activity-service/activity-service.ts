import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Actividad } from '../../app/actividad';

/*
  Generated class for the ActivityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ActivityServiceProvider {

  // URL to web api
  private actividadesUrl: string = 'http://localhost:3000/actividades';

  constructor(public http: HttpClient) {}

  /* *********** GET *********** */

  //get de una actividad en concreto
  getActividad(titulo: string): Observable<Actividad> {
    const url = `${this.actividadesUrl}/${titulo}`;
    return this.http.get<Actividad>(url);
  }

  // Esto sirve para editar catalogo
  getActividadDePropietario(actividad: Actividad): Observable<Actividad> {
    const url = `${this.actividadesUrl}/pidiendo/${actividad.propietario}/${actividad.titulo}`;
    return this.http.get<Actividad>(url);
  }

  //get de todas las actividades de un usuario
  getActividadesPropietario (propietario: String): Observable<Actividad[]>
  {
    const url = `${this.actividadesUrl}/propietario/${propietario}`

    return this.http.get<Actividad[]>(url);
  }

  //es una busqueda para el menu principal de las actividades relacionadas con los tags que te gustan
  getActividadesPorTagPerfil (tagPerfil: string): Observable<Actividad[]> {
    const url = `${this.actividadesUrl}/porPerfil/${tagPerfil}`;
    return this.http.get<Actividad[]>(url);
  }

  ////GPS dame todas las actividades cerca de mi y con este tag
  /*
  getActividadesGPS (): Observable<Actividad[]> {
    const url = `${this.actividadesUrl}/busqueda/GPS`;
    return this.http.get<Actividad[]>(url);
  }
  */  



  /* *********** POST *********** */
  // Save methods

  //crear actividad
  postActividad (actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.actividadesUrl, actividad, httpOptions);
  }

  //GPS
  /*
  postActividadesGPS (busqueda: Busqueda): Observable<Actividad[]> {
    const url = `${this.actividadesUrl}/busqueda/GPS`;
    return this.http.post<Actividad[]>(url, busqueda, httpOptions);
  }
  */



  /* *********** PUT *********** */
  // update the activity on the server
  updateActividad (actividad: Actividad, title: string): Observable<any> {
    const url = `${this.actividadesUrl}/update/${title}`;
    return this.http.put(url, actividad, httpOptions);
  }

  /* *********** DELETE *********** */
  // Delete an activity from an user
    deleteActividad (actividad: Actividad): Observable<any> {
      const url = `${this.actividadesUrl}/${actividad.propietario}/${actividad.titulo}`;
      return this.http.delete(url,httpOptions);
    }
}
