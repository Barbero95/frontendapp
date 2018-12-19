import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Valoracion} from "../../app/valoracion"
import {ActivityServiceProvider} from "../../providers/activity-service/activity-service";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-valorar',
  templateUrl: 'valorar.html',
})
export class ValorarPage {

  valoracion: Valoracion;
  tituloActividad: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,  private activityServiceProvider: ActivityServiceProvider, public storage: Storage, public alertCtrl: AlertController) {


    this.valoracion = new Valoracion();

    this.storage.get('nick').then( (nick) => {

      this.valoracion.propietario = nick;
    });

    this.tituloActividad = this.navParams.get('tit');




  }

  valorar(){


  }


  cancel() {
    this.navCtrl.pop();
  }


}
