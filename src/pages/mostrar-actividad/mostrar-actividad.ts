import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.actividad = new Actividad();
    this.actividad = this.navParams.get('act');
  }

  

}
