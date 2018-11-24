import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { MenuPrincipalPage } from '../menu-principal/menu-principal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //La pagina home que es la predefinida por ionic es el Login
  username: string;
  password: string;

  constructor(public navCtrl: NavController) {

  }

  login(){
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);
    this.navCtrl.setRoot(MenuPrincipalPage);

  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
