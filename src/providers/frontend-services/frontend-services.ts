import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {Usuario} from '../../app/usuario';
import {Actividad} from '../../app/actividad';

/*
  Generated class for the FrontendServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class FrontendServicesProvider {

    // URL to web api
    private usuariosUrl: string = 'http://localhost:3000/users';
    private actividadesUrl: string = 'http://localhost:3000/actividades';
   
    constructor(private http: HttpClient) { }
   
    /* GET: De todos los usuarios, de un usuario, de todas las actividades o de una actividad */
    //get de una actividad en concreto
    getActividad(titulo: string): Observable<Actividad> {
      const url = `${this.actividadesUrl}/${titulo}`;
      return this.http.get<Actividad>(url);
    }
    getUsuario(username: string): Observable<Usuario> {
      const url = `${this.usuariosUrl}/${username}`;
      return this.http.get<Usuario>(url);
    }
    getLogin(username: string , password: string): Observable<Usuario> {
      const url = `${this.usuariosUrl}/login/${username}/${password}`;
      return this.http.get<Usuario>(url);
    }
  
    //get de todas las actividades de un usuario
    getActividadesPropietario(actividad: Actividad): Observable<Actividad[]> {
      const url = `${this.actividadesUrl}/propietario/${actividad.propietario}`;
      return this.http.get<Actividad[]>(url)
      //.pipe(
      //  tap(_ => this.log(`El propietario=${actividad.propietario}`)),
       // catchError(this.handleError<Actividad>(`error`))
   //   );
   ;
    }
  
    validarUser(usuario: Usuario): Observable<Usuario> {
      const url = `http://localhost:3000/users/validacion`;
      return this.http.post<Usuario>(url, usuario, httpOptions);
    }
  
    /*POST: Crear usuario o crear actividad*/
    //////// Save methods //////////
    //crear actividad
    postActividad (actividad: Actividad): Observable<Actividad> {
      return this.http.post<Actividad>(this.actividadesUrl, actividad, httpOptions);
    }
    
    ////GPS dame todas las actividades cerca de mi y con este tag
    /*
    postActividadesGPS (busqueda: Busqueda): Observable<Actividad[]> {
      const url = `${this.actividadesUrl}/busqueda/GPS`;
      return this.http.post<Actividad[]>(url, busqueda, httpOptions);
    }
    getActividadesGPS (): Observable<Actividad[]> {
      const url = `${this.actividadesUrl}/busqueda/GPS`;
      return this.http.get<Actividad[]>(url);
    }
    */
  
  
    postUsuario (usuario: Usuario): Observable<Usuario> {
      return this.http.post<Usuario>(this.usuariosUrl, usuario, httpOptions);
    }
  
  // Esto sirve para editar catalogo
     getActividadDePropietario(actividad: Actividad): Observable<Actividad> {
      const url = `${this.actividadesUrl}/pidiendo/${actividad.propietario}/${actividad.titulo}`;
      return this.http.get<Actividad>(url);
    }
   
    /** PUT: update the user on the server */
  
    /** PUT: update the activity on the server */
    //modificar una actividad
    updateActividad (actividad: Actividad, title: string): Observable<any> {
      const url = `${this.actividadesUrl}/update/${title}`;
      return this.http.put(url, actividad, httpOptions);
    }
    updateUsuario (usuario: Usuario): Observable<any> {
      const url = `${this.usuariosUrl}/${usuario.nick}`;
      return this.http.put(url, usuario, httpOptions);
    }
    
  
  
  
  
    /** DELETE: Delete an activity from an user*/
    //borrar una actividad
    deleteActividad (actividad: Actividad): Observable<any> {
      const url = `${this.actividadesUrl}/${actividad.propietario}/${actividad.titulo}`;
      return this.http.delete(url,httpOptions);
    }

}
