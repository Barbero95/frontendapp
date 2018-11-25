import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
//import { MenuPrincipalPage } from '../menu-principal/menu-principal';
import { SideMenuPage } from '../side-menu/side-menu';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { Login } from '../../app/login';
import { Usuario } from '../../app/usuario';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, private forntendServices: FrontendServicesProvider, public storage: Storage, public alertCtrl: AlertController) {
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
    this.forntendServices.validarUser(this.login).subscribe( (data) => {
      if (data == null){
        this.showAlert();
      }else{
        
        this.navCtrl.setRoot(SideMenuPage);
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
