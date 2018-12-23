import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Valoracion} from "../../app/valoracion"
import {ActivityServiceProvider} from "../../providers/activity-service/activity-service";
import {Storage} from "@ionic/storage";
import {MenuPrincipalPage} from "../menu-principal/menu-principal";
import {Actividad} from "../../app/actividad";

@IonicPage()
@Component({
  selector: 'page-valorar',
  templateUrl: 'valorar.html',
})
export class ValorarPage {

  valoracion: Valoracion;
  act: Actividad;



  constructor(public navCtrl: NavController, public navParams: NavParams, private activityServiceProvider: ActivityServiceProvider, public storage: Storage, public alertCtrl: AlertController) {


    this.valoracion = new Valoracion();
    this.act = new Actividad();

    this.storage.get('nick').then((nick) => {

      this.valoracion.propietario = nick;
    });
    this.act = this.navParams.get('actividad');



  }

  valorar() {
    this.valoracion.idAct = this.act._id;
    if (this.valoracion.descripcion.length != 0 && this.valoracion.titulo.length != 0 && this.valoracion.estrellas != 0) {
      this.activityServiceProvider.postValoracion(this.valoracion).subscribe((data) => {
        this.act.valoraciones.push(data._id);
        if (data != null) {
          this.activityServiceProvider.updateActividad(this.act, this.act.titulo).subscribe((data2) => {
            if(data2 != null){
              this.Gracias();
              this.navCtrl.setRoot(MenuPrincipalPage);
            }else{
              this.showAlert1();
            }
          });
        } else {
          this.showAlert1();
        }
      }, (error) => {
        this.showAlert1();
      });
    } else {
      this.showAlert2();
    }

  }


  cancel() {
    this.navCtrl.pop();
  }


  Gracias() {
    const alert = this.alertCtrl.create({
      title: 'Gracias',
      subTitle: 'Gracias por tu valoración',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert1() {
    const alert = this.alertCtrl.create({
      title: 'Valoración',
      subTitle: 'No se ha posteado bien',
      buttons: ['OK']
    });
    alert.present();

  }

  showAlert2() {
    const alert = this.alertCtrl.create({
      title: 'Valoracion',
      subTitle: 'Titulo Actividad o titulo valoracion vacio',
      buttons: ['OK']
    });
    alert.present();

  }

}
