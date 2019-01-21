import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad';
import { AlertController } from 'ionic-angular';
import { Notificaciones } from '../../app/notificaciones';
import { MenuPrincipalPage } from '../menu-principal/menu-principal';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { ObjetoDeNickYEstado } from '../../app/objetoDeNickYEstado';
import {Socket} from "ng-socket-io";
import {ChatPage} from "../chat/chat";
import {Usuario} from "../../app/usuario";
import {ValorarPage} from "../valorar/valorar";
import {Valoracion} from "../../app/valoracion";
import {Observable} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-mostrar-actividad',
  templateUrl: 'mostrar-actividad.html',
})
export class MostrarActividadPage {

  actividadAnterior: Actividad;
  tituloAnterior: string;
  a:string[];
  vals: Valoracion[];
  usersNotificated: {};
  userFrom: Usuario;
  userTo: Usuario;
  actividadSocket: any;
  actividad: Actividad;
  notificaciones: Notificaciones;

  nickyestado: ObjetoDeNickYEstado;
  usuario: Usuario;
  propietario: Usuario;


  constructor(public navCtrl: NavController, 
    public socket: Socket,
    public navParams: NavParams,  private activityServiceProvider: ActivityServiceProvider, private userServiceProvider: UserServiceProvider,public storage: Storage, public alertCtrl: AlertController) {
    this.actividad = new Actividad();
    this.usuario = new Usuario();
    this.vals = [];

    this.actividadAnterior = new Actividad();


    this.nickyestado = new ObjetoDeNickYEstado();

    this.actividad = this.navParams.get('act');
    this.actividadAnterior = this.actividad;


    this.tituloAnterior = this.actividadAnterior.titulo;
    this.usuario = this.navParams.get('usuario');
    this.notificaciones = new Notificaciones();
    this.getUser(this.actividad.propietario);
    this.getValoraciones();




  }

  getUser(nick: string) {
    this.userServiceProvider.getUsuario(nick).subscribe( data => {
      this.propietario = data;
    });
  }


  getValoraciones(){
    let suma: number = 0;
    let mitja:number;
    if(this.actividad.valoraciones) {
      for (let i=0; i < this.actividad.valoraciones.length; i++){
        this.activityServiceProvider.getValoracion(this.actividad.valoraciones[i]).subscribe( (valoracio) => {
          if (valoracio != null){
            console.log("titulo"+ valoracio.titulo);
            console.log("estrellas"+ valoracio.estrellas);
            suma=suma+valoracio.estrellas;
            this.vals.push(valoracio);
            mitja=suma/this.actividad.valoraciones.length;
            console.log("la mitja es:"+ mitja);
            this.actividad.estrellas=mitja;
          }else{

            this.showAlert3();

          }
        }, (error) => {
          this.showAlert2();
        });
      }



    }


  }



 gotoValorarPage(){
   this.navCtrl.push(ValorarPage, {'actividad': this.actividad});
 }

 actualizar(){
  this.activityServiceProvider.updateActividad(this.actividad,this.tituloAnterior).subscribe( data => {
    if(data != null){
      this.navCtrl.setRoot(MenuPrincipalPage);
    }else{
      this.showAlert3();
    }
  });

 }

  contactar(){
//Aqui se iniciarlizaria un chat que le debería tocar a Bruno
    this.navCtrl.push(ChatPage,
      {
        from: this.usuario,
        to: this.propietario,
        actividad: this.actividad._id,
        userNick: this.usuario.nick
      });
  }
  solicitar(){
    this.showAlert1();
  }
  cancelar(){
    this.navCtrl.pop();
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

            this.storage.get('nick').then(val => {
              this.notificaciones.dueñoActividad=this.actividad.propietario;
              this.notificaciones.participanteActividad=val;
              this.notificaciones.tituloActividad = this.actividad.titulo;
              this.notificaciones.flag = 1;

          //--------------------------------------
            this.usersNotificated = {
              userFrom: val,
              userTo: this.actividad.propietario,
              actividad: this.actividad
            };

            this.socket.emit('notificacion', this.usersNotificated);

            //---------------------------

              this.userServiceProvider.postEnvioNotificaciones(this.notificaciones).subscribe( data => {

                  this.showAlert4()
                },
                 err => {this.showAlert5()});

            });


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
