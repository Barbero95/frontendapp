import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../app/usuario';
import { AlertController } from 'ionic-angular';
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import{Notificaciones} from '../../app/notificaciones';



/**
 * Generated class for the NotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {

  items: Array<{title: string, note: string, icon: string}>;

  propietario: string = "";
  usuario: Usuario;
  notificaciones: Notificaciones[];


  constructor(public chatService: ChatServiceProvider,
    public userService: UserServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    private userServiceProvider: UserServiceProvider) {

//es como iniciaar el local storage si no no obtenemos lso datos
this.storage.get('nick').then( (nick) => {
this.propietario = nick;
this.inicio();
});
}
  //al iniciar
  inicio(){
    this.userServiceProvider.getReciboNotificaciones(this.propietario).subscribe( (data) => {
      this.notificaciones = data;
     });

  }
  contactar(){
    


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }

}
