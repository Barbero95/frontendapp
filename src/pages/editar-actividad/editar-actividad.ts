import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { PerfilPage } from '../perfil/perfil';
import { Actividad } from '../../app/actividad';


@IonicPage()
@Component({
  selector: 'page-editar-actividad',
  templateUrl: 'editar-actividad.html',
})
export class EditarActividadPage {





  actividadAnterior: Actividad;
  actividad:Actividad;






  constructor(public navCtrl: NavController, public navParams: NavParams,  private frontendServices: FrontendServicesProvider, public storage: Storage, public alertCtrl: AlertController) {

    this.actividad = new Actividad();

    this.actividadAnterior = this.navParams.get('actividad');

    this.actividad = this.navParams.get('actividad');


  }



}
