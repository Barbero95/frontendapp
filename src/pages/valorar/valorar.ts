import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Valoracion} from "../../app/valoracion"
import {ActivityServiceProvider} from "../../providers/activity-service/activity-service";
import {Storage} from "@ionic/storage";
import {CatalogoPage} from "../catalogo/catalogo";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-valorar',
  templateUrl: 'valorar.html',
})
export class ValorarPage {

  valoracion: Valoracion;


  constructor(public navCtrl: NavController, public navParams: NavParams, private activityServiceProvider: ActivityServiceProvider, public storage: Storage, public alertCtrl: AlertController) {


    this.valoracion = new Valoracion();

    this.storage.get('nick').then((nick) => {

      this.valoracion.propietario = nick;
    });

    this.valoracion.idAct = this.navParams.get('idAct');


  }

  valorar() {

    if (this.valoracion.descripcion.length != 0 || this.valoracion.titulo.length != 0 || this.valoracion.estrellas != 0) {

      this.activityServiceProvider.postValoracion(this.valoracion).subscribe((data) => {

        if (data != null) {
          this.Gracias();
          this.navCtrl.setRoot(HomePage);
        } else {
          this.showAlert1();
        }
      }, (error) => {
        this.showAlert1();
      })
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
