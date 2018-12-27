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
import { MenuPrincipalPage } from '../menu-principal/menu-principal';
import { ObjetoDeNickYEstado } from '../../app/objetoDeNickYEstado';

import {ValorarPage} from "../valorar/valorar";
import {Valoracion} from "../../app/valoracion";




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
  
  notificacion2: Notificaciones;
  perfilAConsultar: String;
  actividades: Actividad[];

  actividadAnterior: Actividad;
  tituloAnterior: string;
  a:string[];
  vals: Valoracion[];

  actividad: Actividad;

  nickyestado: ObjetoDeNickYEstado;




  constructor(public navCtrl: NavController, public navParams: NavParams,  private activityServiceProvider: ActivityServiceProvider, private userServiceProvider: UserServiceProvider,public storage: Storage, public alertCtrl: AlertController) {
     this.usuario = new Usuario();
     this.actividad = new Actividad();
     this.notificacion2 = new Notificaciones();
     


     this.nickyestado = new ObjetoDeNickYEstado();

 
    this.perfilAConsultar = this.navParams.get('usuario');
    this.userServiceProvider.getUsuario(this.perfilAConsultar).subscribe( data => {
      this.usuario = data;
    });

    this.activityServiceProvider.getActividadesPropietario(this.perfilAConsultar).subscribe(data=>
      this.actividades = data)

    this.inicio();

  }

  inicio(){
  }
  
  solicitar(actividad: Actividad){

    this.actividad = actividad;
    this.userServiceProvider.getUsuario(this.perfilAConsultar).subscribe( data =>{
      this.nickyestado.idCliente = data._id;
      console.log(data._id);
      this.nickyestado.estado = 1;
      this.actividad.clientes.push(this.nickyestado);
      //console.log('estado'+this.nickyestado.estado);
      console.log('nick'+this.nickyestado.idCliente);
      console.log('los clientes son ' + this.actividad.clientes[0].idCliente);

    });

    this.activityServiceProvider.updateActividad(this.actividad,this.actividad.titulo).subscribe( data => {
      if(data != null){
        this.navCtrl.setRoot(MenuPrincipalPage);
      }else{
        this.showAlert3();
      }
    });


    this.notificacion2.dueñoActividad=actividad.propietario;
    this.notificacion2.participanteActividad=this.perfilAConsultar;
    this.notificacion2.tituloActividad = actividad.titulo;
    this.notificacion2.flag = 1;

    this.userServiceProvider.postEnvioNotificaciones(this.notificacion2).subscribe( data => {

        this.showAlert4()
      },
       err => {this.showAlert5()});
  //  this.showAlert1();
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
/*
            this.storage.get('nick').then(val => {
              this.userServiceProvider.getUsuario(val).subscribe( data =>{
                this.nickyestado.idCliente = data._id;
                console.log(data._id);
                this.nickyestado.estado = 1;
                this.actividad.clientes.push(this.nickyestado);
                //console.log('estado'+this.nickyestado.estado);
                console.log('nick'+this.nickyestado.idCliente);
                console.log('los clientes son ' + this.actividad.clientes[0].idCliente);
                this.actualizar();

              });

            });
*/
              this.notificacion2.dueñoActividad=this.actividad.propietario;
              this.notificacion2.participanteActividad=this.perfilAConsultar;
              this.notificacion2.tituloActividad = this.actividad.titulo;
              this.notificacion2.flag = 1;

              this.userServiceProvider.postEnvioNotificaciones(this.notificacion2).subscribe( data => {

                  this.showAlert4()
                },
                 err => {this.showAlert5()});

          }
        }
      ]
    });
    alert.present();
  }
  showAlert2() {
    const alert = this.alertCtrl.create({
      title: 'Buscar Valoracion',
      subTitle: 'No se ha podido encontrar la valoracion',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert3() {
    const alert = this.alertCtrl.create({
      title: 'Solicitar Actividad',
      subTitle: 'No se ha podido solicitar la actividad',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert4() {
    const alert = this.alertCtrl.create({
      title: 'Solicitar Actividad',
      subTitle: 'Actividad solicitada',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert5() {
    const alert = this.alertCtrl.create({
      title: 'Solicitar Actividad',
      subTitle: 'La actividad ya está solicitada',
      buttons: ['OK']
    });
    alert.present();
  }

}
