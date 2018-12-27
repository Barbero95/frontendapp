import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../app/usuario';
import { AlertController } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import{Notificaciones} from '../../app/notificaciones';
import { Actividad } from '../../app/actividad';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { ObjetoDeNickYEstado } from '../../app/objetoDeNickYEstado';
import {ActividadesAjenasPage} from "../actividades-ajenas/actividades-ajenas";
import {ChatPage} from "../chat/chat";
import {EditarActividadPage} from "../editar-actividad/editar-actividad";


/**
 * Generated class for the PerfilAjenoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-ajeno',
  templateUrl: 'perfil-ajeno.html',
})
export class PerfilAjenoPage {


  
  propietario: string = "";
  usuario: Usuario;
  notificaciones: Notificaciones[];
  notificacion: Notificaciones;
  perfilAConsultar: String;



  constructor(public navCtrl: NavController, public navParams: NavParams,  private activityServiceProvider: ActivityServiceProvider, private userServiceProvider: UserServiceProvider,public storage: Storage, public alertCtrl: AlertController) {
    this.usuario = new Usuario();
     

   this.perfilAConsultar = this.navParams.get('usuario');
    this.userServiceProvider.getUsuario(this.perfilAConsultar).subscribe( data => {
      this.usuario = data;
    });

    this.inicio();

  }

  inicio(){
  }

  contactar(){}
  actividades(){
    this.navCtrl.push(ActividadesAjenasPage, ({'usuario': this.perfilAConsultar}));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilAjenoPage');
  }

}
