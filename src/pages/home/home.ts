import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { MenuprincipalPage } from '../menuprincipal/menuprincipal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController) {

  }

  login(){
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);
    this.navCtrl.push(MenuprincipalPage);

  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
