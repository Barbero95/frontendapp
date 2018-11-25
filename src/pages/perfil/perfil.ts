import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private frontendServices: FrontendServicesProvider, public storage: Storage, public alertCtrl: AlertController) {
    
    this.storage.get('nick').then( (propietario) => {
      //this.propietario = val;
      console.log("propietario valor directo de storage: " + propietario);
      this.propietario = propietario;
      console.log("propietario valor ya guardado: " + this.propietario);
      this.inicio();
    });
  }

  inicio(){
    this.frontendServices.getUsuario(this.propietario).subscribe( data => {
      this.nick = data.nick;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.email = data.email;
      this.estrellas = data.estrellas;
      this.tags = data.tags;
      this.imagen = data.imagen;
      console.log("perfil data: " + data.nick)
    });
  }

  goEditarPerfil(){
    this.navCtrl.push(EditarPerfilPage);
  }
}
