import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Notificaciones } from '../../app/notificaciones';

import { Usuario } from '../../app/usuario';
import { Login } from '../../app/login';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserServiceProvider {

  // URL to web api
  private usuariosUrl: string = 'http://localhost:3000/users';

  constructor(public http: HttpClient) {}

  /* *********** GET *********** */

  getUsuario(nick: any): Observable<Usuario> {
    const url = `${this.usuariosUrl}/${nick}`;
    return this.http.get<Usuario>(url);
  }

  getLogin(username: string , password: string): Observable<Usuario> {
    const url = `${this.usuariosUrl}/login/${username}/${password}`;
    return this.http.get<Usuario>(url);
  }
  getUserByRef(ref: string): Observable<Usuario> {
    const url = `${this.usuariosUrl}/userByRef/${ref}`;
    return this.http.get<Usuario>(url);
  }
  getUserById(idCliente: string): Observable<Usuario> { 
    const url = `${this.usuariosUrl}/userById/${idCliente}`;
    return this.http.get<Usuario>(url);
  }
 /* getEnvioNotificaciones(usuario: Usuario): Observable<Notificaciones> {
    const url = `${this.usuariosUrl}/Enotificaciones/${usuario.nick}/${usuario.notificaciones.pop()}}`;
    return this.http.get<Notificaciones>(url);
  }*/

  getReciboNotificaciones(dueñoActividad: string): Observable<Notificaciones[]> {
    const url = `${this.usuariosUrl}/Rnotificaciones/${dueñoActividad}`;
    return this.http.get<Notificaciones[]>(url);
  }


  /* *********** POST *********** */
  validarUser(log: Login): Observable<Usuario> {
    const url = `${this.usuariosUrl}/validacion`
    return this.http.post<Usuario>(url, log, httpOptions);
  }
  postEnvioNotificaciones (notificaciones: Notificaciones): Observable<Usuario> {
    const url = `${this.usuariosUrl}/ENotificaciones`
    return this.http.post<Usuario>(url, notificaciones, httpOptions);
  }
  postUsuario (usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario, httpOptions);
  }
  postUsuarioByRef(ref: string): Observable<Usuario> {
    console.log(ref);
    const url = `${this.usuariosUrl}/getUserByRef`;
    return this.http.post<Usuario>(url, ref, httpOptions);
  }
  postUsuarioById(id: string): Observable<Usuario> {
    const url = `${this.usuariosUrl}/getUserById/${id}`;
    return this.http.post<Usuario>(url, id, httpOptions);
  }
  postRechazoNotificaciones (notificaciones: Notificaciones): Observable<Usuario> {
    const url = `${this.usuariosUrl}/RechazoNotificaciones/${notificaciones.participanteActividad}/${notificaciones.tituloActividad}`
    return this.http.post<Usuario>(url, notificaciones, httpOptions);
  }


  //foto perfil
  createFoto (posData: FormData): void{
    let url =  `${this.usuariosUrl}/foto/perfil`;
    this.http.post(url,posData);
  }

  /* *********** PUT *********** */
  // Update the user on the server
  updateUsuario (usuario: Usuario): Observable<any> {
    const url = `${this.usuariosUrl}/${usuario.nick}`;
    return this.http.put(url, usuario, httpOptions);
  }

  /* *********** DELETE *********** */
  // Delete Usuario

}
