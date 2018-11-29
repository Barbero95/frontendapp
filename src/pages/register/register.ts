import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Usuario } from '../../app/usuario';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
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

  nombre: string = "";
  apellido: string = "";
  username: string = "";
  password: string = "";
  repassword: string = "";

  usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private frontendService: FrontendServicesProvider, public alertCtrl: AlertController) {
    this.usuario = {
      nombre:this.nombre,
      apellido:this.apellido,
      nick:this.username,
      email:"",
      estrellas:0,
      tags: ["uni"],
      imagen:"",
      password:"",
      actividadesPropietario:[],
      actividadesCliente:[],
      _id:0,
      __v:0
    }
  }

  register(){
    if(this.username.length==0 || this.password.length==0 || this.repassword.length==0){
      this.showAlert1();
      //alert("Introduce todo los datos!");
    }
    else if(this.password != this.repassword ){
      this.showAlert2();
      //alert("La contraseña no es igual");
    }
    else{
      this.usuario.password = this.password;
      this.usuario.nick = this.username;
      this.frontendService.postUsuario(this.usuario).subscribe( data => {this.navCtrl.push(HomePage)}, err => console.error('Ops: ' + err.message));
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
