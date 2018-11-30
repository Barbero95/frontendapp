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


  tag: string="";



  constructor(public navCtrl: NavController, public navParams: NavParams,  private frontendServices: FrontendServicesProvider, public storage: Storage, public alertCtrl: AlertController) {

    this.actividad = new Actividad();

    this.actividadAnterior = this.navParams.get('actividad');

    this.actividad = this.navParams.get('actividad');


  }

  addTag(){
    if(this.tag.length == 0){
      //no hay tag a añadir
      this.showAlert4();
    }else{
      //this.arrayTags.push(this.tag);
      this.actividad.tags.push(this.tag);
      this.tag = "";
    }

  }
  //borrar un tag
  deleteTag(item): void {
    var pos = this.actividad.tags.indexOf(item);
    this.actividad.tags.splice(pos,1);
  }

  showAlert4() {
    const alert = this.alertCtrl.create({
      title: 'Actividad',
      subTitle: 'No hay tag para añadir',
      buttons: ['OK']
    });
    alert.present();
  }

}
