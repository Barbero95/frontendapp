import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
//import { MenuPrincipalPage } from '../menu-principal/menu-principal';
import { SideMenuPage } from '../side-menu/side-menu';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { Login } from '../../app/login';
import { Usuario } from '../../app/usuario';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //La pagina home que es la predefinida por ionic es el Login
  username: string;
  password: string;
  login: Login;
  usuario: Usuario;

  constructor(public navCtrl: NavController, private forntendServices: FrontendServicesProvider, private storage: Storage) {
    this.login = {
      nick:"",
      password:""
    }
  }

  gologin(){
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);
    this.login.nick = this.username;
    this.login.password = this.password;
    this.forntendServices.validarUser(this.login).subscribe(data => this.usuario = data);
    if (this.usuario == null){

    }else{
      this.storage.set('nick', this.username);
      this.navCtrl.setRoot(SideMenuPage);
    }
    

  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
