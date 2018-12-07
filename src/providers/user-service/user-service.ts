import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getUsuario(nick: string): Observable<Usuario> {
    const url = `${this.usuariosUrl}/${nick}`;
    return this.http.get<Usuario>(url);
  }

  getLogin(username: string , password: string): Observable<Usuario> {
    const url = `${this.usuariosUrl}/login/${username}/${password}`;
    return this.http.get<Usuario>(url);
  }
  //get de foto perfil
  getAvatar(username: string): Observable<File> {
    const url = `${this.usuariosUrl}/foto/perfil/${username}.png`;
    return this.http.get<File>(url);
  }

  /* *********** POST *********** */
  validarUser(log: Login): Observable<Usuario> {
    const url = `${this.usuariosUrl}/validacion`
    return this.http.post<Usuario>(url, log, httpOptions);
  }

  postUsuario (usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario, httpOptions);
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
