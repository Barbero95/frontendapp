import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Usuario } from '../../app/usuario';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public frontendService: FrontendServicesProvider) {
    this.usuario = {
      nombre:this.nombre,
      apellido:this.apellido,
      nick:this.username,
      email:"",
      estrellas:0,
      tags: [""],
      imagen:"",
      password:"",
      actividadesPropietario:[],
      actividadesCliente:[],
      _id:0,
      __v:0
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    if(this.username.length==0 || this.password.length==0 || this.repassword.length==0){
      alert("Introduce todo los datos!");
    }
    else if(this.password != this.repassword ){
      alert("La contraseña no es igual");
    }
    else{
      this.usuario.password = this.password;
      this.usuario.nick = this.username;
      this.frontendService.postUsuario(this.usuario).subscribe( data => {this.navCtrl.push(HomePage)}, err => console.error('Ops: ' + err.message));
    }
  }
}
