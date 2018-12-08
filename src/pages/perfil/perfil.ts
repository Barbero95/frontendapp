import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Usuario } from '../../app/usuario';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  propietario: string = "";

  nick: string = "";
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  estrellas: number = 0;
  tags: string[] = [""];
  imagen: string = "";
  foto;
  usuario: Usuario;


  constructor(public navCtrl: NavController, public navParams: NavParams, private userServiceProvider: UserServiceProvider, public storage: Storage, public alertCtrl: AlertController) {
    
    this.usuario = new Usuario();

    this.storage.get('nick').then( (propietario) => {
      //this.propietario = val;
      console.log("propietario valor directo de storage: " + propietario);
      this.propietario = propietario;
      console.log("propietario valor ya guardado: " + this.propietario);
      this.inicio();
    });
  }

  inicio(){
    this.userServiceProvider.getUsuario(this.propietario).subscribe( data => {
      this.usuario = data;
    });

    //cargamos la foto
    this.foto = "http://localhost:3000/uploads/" + this.propietario + ".png";
  }

  goEditarPerfil(){
    this.navCtrl.push(EditarPerfilPage);
  }
}
