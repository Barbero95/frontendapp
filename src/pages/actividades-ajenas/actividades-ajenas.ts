import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../app/usuario';
import { AlertController } from 'ionic-angular';
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import{Notificaciones} from '../../app/notificaciones';
import { PerfilAjenoPage } from '../perfil-ajeno/perfil-ajeno';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { Actividad } from '../../app/actividad';
import {EditarActividadPage} from "../editar-actividad/editar-actividad";
import {ChatPage} from "../chat/chat";
import {ChatUser} from "../../app/chatUser";




/**
 * Generated class for the ActividadesAjenasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actividades-ajenas',
  templateUrl: 'actividades-ajenas.html',
})
export class ActividadesAjenasPage {


  
  propietario: string = "";
  usuario: Usuario;
  notificaciones: Notificaciones[];
  notificacion: Notificaciones;
  perfilAConsultar: String;
  actividades: Actividad[];




  constructor(public navCtrl: NavController, public navParams: NavParams,  private activityServiceProvider: ActivityServiceProvider, private userServiceProvider: UserServiceProvider,public storage: Storage, public alertCtrl: AlertController) {
     this.usuario = new Usuario();
     

   // this.perfilAConsultar = this.navParams.get('usuario');
   //Comento hasta migrarlo al oto texto
    this.perfilAConsultar = "sotis";
    this.userServiceProvider.getUsuario(this.perfilAConsultar).subscribe( data => {
      this.usuario = data;
    });

    this.activityServiceProvider.getActividadesPropietario(this.perfilAConsultar).subscribe(data=>
      this.actividades = data)

    this.inicio();

  }

  inicio(){
  }

}
