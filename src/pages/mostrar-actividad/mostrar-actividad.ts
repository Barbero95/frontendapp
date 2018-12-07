import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad';
import { AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.actividad = new Actividad();
    this.actividad = this.navParams.get('act');
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
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
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
  

}
