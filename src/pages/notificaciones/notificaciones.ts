import { Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../app/usuario';
import { AlertController } from 'ionic-angular';
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import{Notificaciones} from '../../app/notificaciones';
import { PerfilAjenoPage } from '../perfil-ajeno/perfil-ajeno';
import { Socket } from 'ng-socket-io';

import {Observable} from "rxjs/Observable";

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
  notificacion: Notificaciones;
  notificacion2: Notificaciones;
  users: {};
  userFrom: Usuario;
  userTo: Usuario;
  actividad: any;
  
 notifications = [];


 @ViewChild(Content) content: Content;

  constructor(public chatService: ChatServiceProvider,
    public userService: UserServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public socket: Socket,
    public alertCtrl: AlertController,
    private userServiceProvider: UserServiceProvider) {

//es como iniciaar el local storage si no no obtenemos lso datos
this.storage.get('nick').then( (nick) => {
this.propietario = nick;
this.inicio();
});
this.getNotificationsSocket().subscribe();

    }


  //al iniciar
  inicio(){
    this.userServiceProvider.getReciboNotificaciones(this.propietario).subscribe( (data) => {
      this.notificaciones = data;

     });



  }

  perfil(usuario: String){
    this.navCtrl.push(PerfilAjenoPage, {'usuario': usuario});

  }
  aceptar(){}
  contactar(){
    


  }

  denegar(notificacion: Notificaciones){

    this.notificacion = notificacion;

    this.userServiceProvider.postRechazoNotificaciones(this.notificacion).subscribe( data => {
this.inicio();
      },
       err => {
         

       });


 }

getNotificationsSocket() {
    let observable = new Observable(obs => {
      this.socket.on('notificacion', data => {

        if(data.userFrom=this.propietario){

        this.notificacion2.dueñoActividad=data.userTo;
        this.notificacion2.participanteActividad=data.userFrom;
        this.notificacion2.tituloActividad = data.actividad;
        this.notificacion2.flag = 1;
        this.userServiceProvider.postEnvioNotificaciones(this.notificacion2).subscribe( data => {
          
        }, err => {});
      }
      });
    });
   return observable;
 }


  ionViewDidLoad() {
  


    console.log('ionViewDidLoad NotificacionesPage');
  }

}
