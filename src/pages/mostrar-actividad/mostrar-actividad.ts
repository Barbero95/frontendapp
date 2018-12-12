import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad';
import { AlertController } from 'ionic-angular';
import { Notificaciones } from '../../app/notificaciones';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import {ChatPage} from "../chat/chat";
import {Usuario} from "../../app/usuario";
/**
 * Generated class for the MostrarActividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostrar-actividad',
  templateUrl: 'mostrar-actividad.html',
})
export class MostrarActividadPage {

  actividad: Actividad;
  notificaciones: Notificaciones;
  usuario: Usuario;
  propietario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userServiceProvider: UserServiceProvider,public storage: Storage, public alertCtrl: AlertController) {
    this.actividad = new Actividad();
    this.actividad = this.navParams.get('act');
    this.usuario = this.navParams.get('usuario');
    this.notificaciones = new Notificaciones();
    this.getUser(this.actividad.propietario);
  }

  getUser(nick: string) {
    this.userServiceProvider.getUsuario(nick).subscribe( data => {
      this.propietario = data;
    });
  }

  showAlert1() {
    const alert = this.alertCtrl.create({
      title: 'Solicitar actividad',
      subTitle: '¿Estás seguro de que deseas solicitar una actividad con el usuario que colgó la oferta? Se recomienda contactar antes con él',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            // Relleno un objecto que crea un nexo entre el propietario de la actividad,
            // el candidato que la pide y una flag
            // esta flag indicará si se recibe una notificación rollo twitter
            // si la notificación ya se ha leído, ya no aparecerá
            this.notificaciones.dueñoActividad=this.actividad.propietario;
            this.storage.get('nick').then(val => {
              this.notificaciones.participanteActividad = val;
            });
            this.notificaciones.flag=1;
            this.userServiceProvider.getEnvioNotificaciones(this.notificaciones).subscribe( data => this.navCtrl.pop(), err => {});

          }
        }
      ]
    });
    alert.present();
  }



  contactar(){
//Aqui se iniciarlizaria un chat que le debería tocar a Bruno
    this.navCtrl.push(ChatPage, {from: this.usuario, to: this.propietario});
  }
  solicitar(){
    this.showAlert1();
  }
  cancelar(){
    this.navCtrl.pop();
  }


}
