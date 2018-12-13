import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { SideMenuPage } from '../side-menu/side-menu';
import { MenuPrincipalPage } from '../menu-principal/menu-principal';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Login } from '../../app/login';
import { Usuario } from '../../app/usuario';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import {Socket} from "ng-socket-io";

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

  constructor(public navCtrl: NavController,
              private userServiceProvider: UserServiceProvider,
              public storage: Storage,
              public alertCtrl: AlertController,
              public socket: Socket) {
  }
  ponerDatos(){
    this.login = {
      nick:this.username,
      password:this.password
    }
    this.storage.set('nick', this.login.nick);
    console.log("Nivel Login:" + this.login.nick);
  }

  gologin(){
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);
    this.ponerDatos();
    this.userServiceProvider.validarUser(this.login).subscribe( (data) => {
      if (data == null){
        this.showAlert();
      }else{
        //cambio a la app
        this.socket.connect();
        this.socket.emit('set-username', this.username);
        this.navCtrl.setRoot(SideMenuPage);
        //this.navCtrl.setRoot(MenuPrincipalPage);
      }
    });



  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Usuario o contraseña incorrectos',
      buttons: ['OK']
    });
    alert.present();
  }
}
