import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Usuario } from '../../app/usuario';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  usuario: Usuario;
  repassword: string = "";



  constructor(public navCtrl: NavController, public navParams: NavParams, private userServiceProvider: UserServiceProvider, public alertCtrl: AlertController) {
    this.usuario = new Usuario();
  }

  register(){
    if(this.usuario.nick.length==0 || this.usuario.password.length==0 || this.repassword.length==0){
      this.showAlert1();
      //alert("Introduce todo los datos!");
    }
    else if(this.usuario.password != this.repassword ){
      this.showAlert2();
      //alert("La contraseña no es igual");
    }
    else{
      this.userServiceProvider.postUsuario(this.usuario).subscribe( data => {this.navCtrl.push(HomePage)}, err => console.error('Ops: ' + err.message));
    }
  }

  //rellenar todos los campos
  showAlert1() {
    const alert = this.alertCtrl.create({
      title: 'Registro',
      subTitle: 'Rellena todos los campos',
      buttons: ['OK']
    });
    alert.present();
  }
  //la contraseña no es la misma
  showAlert2() {
    const alert = this.alertCtrl.create({
      title: 'Registro',
      subTitle: 'La contraseña no coincide',
      buttons: ['OK']
    });
    alert.present();
  }
  //este nick ya existe
  showAlert3() {
    const alert = this.alertCtrl.create({
      title: 'Registro',
      subTitle: 'Este usuario ya existe',
      buttons: ['OK']
    });
    alert.present();
  }
}
