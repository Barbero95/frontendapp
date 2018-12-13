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

  actividadAnterior: Actividad;
  tituloAnterior: string;
  a:string[];

  actividad: Actividad;
  notificaciones: Notificaciones;
  
  nickyestado: ObjetoDeNickYEstado;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private activityServiceProvider: ActivityServiceProvider, private userServiceProvider: UserServiceProvider,public storage: Storage, public alertCtrl: AlertController) {
    this.actividad = new Actividad();

    this.actividadAnterior = new Actividad();
    

    this.nickyestado = new ObjetoDeNickYEstado();

    this.actividad = this.navParams.get('act');

    this.actividadAnterior = this.navParams.get('act');

    this.tituloAnterior = this.actividadAnterior.titulo;
    this.notificaciones = new Notificaciones();
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
          //this.notificaciones.dueñoActividad=this.actividad.propietario;
          //this.storage.get('nick').then(val => {
          //  this.notificaciones.participanteActividad = val;
          //});
          //this.notificaciones.flag=1;
          //this.userServiceProvider.getEnvioNotificaciones(this.notificaciones).subscribe( data => this.navCtrl.pop(), err => {});
            this.storage.get('nick').then(val => {
              this.userServiceProvider.getUsuario(val).subscribe( data =>{
                this.nickyestado.User = data._id;
                console.log(data._id);
                this.nickyestado.estado = 1;
              this.actividad.clientes.push(this.nickyestado);
              //console.log('estado'+this.nickyestado.estado);
              console.log('nick'+this.nickyestado.User);
              console.log('los clientes son ' + this.actividad.clientes[0].User);
              this.actualizar();

              });
              //this.nickyestado.idUser = val;
              
            });



            //proba amb array
          //this.storage.get('nick').then(val => {
          //  this.userServiceProvider.getUsuario(val).subscribe( data =>{
          //    //this.nickyestado.idUser = data._id;
          //    console.log(data._id);
          //    //this.nickyestado.estado = 1;

          //  
          //  this.a = [data._id ,'1'];
          //  this.actividad.clientes.push(this.a);
          //  //console.log('estado'+this.nickyestado.estado);
          //  //console.log('nick'+this.nickyestado.idUser);
          //  //console.log('los clientes son ' + this.actividad.clientes[0].idUser);
          //  this.actualizar();

          //  });
          //  //this.nickyestado.idUser = val;
          //  
          //});
            
          }
        }
      ]
    });
    alert.present();
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
  }
  solicitar(){
    this.showAlert1();
  }
  cancelar(){
    this.navCtrl.pop();
  }
  showAlert3() {
    const alert = this.alertCtrl.create({
      title: 'Solicitar Actividad',
      subTitle: 'No se ha podido solicitar la actividad',
      buttons: ['OK']
    });
    alert.present();
  }
  

}
