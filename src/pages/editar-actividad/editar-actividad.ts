import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { Actividad } from '../../app/actividad';
import {CatalogoPage} from "../catalogo/catalogo";


@IonicPage()
@Component({
  selector: 'page-editar-actividad',
  templateUrl: 'editar-actividad.html',
})
export class EditarActividadPage {

  actividadAnterior: Actividad;
  tituloAnterior: string;
  actividad:Actividad;


  tag: string="";





  constructor(public navCtrl: NavController, public navParams: NavParams,  private activityServiceProvider: ActivityServiceProvider, public storage: Storage, public alertCtrl: AlertController) {

    this.actividad = new Actividad();

    this.actividadAnterior = new Actividad();

    this.actividad = this.navParams.get('act');

    this.actividadAnterior = this.navParams.get('act');

    this.tituloAnterior = this.actividadAnterior.titulo;

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

  save(){

    if (this.actividad.titulo.length != 0 ) {

      this.activityServiceProvider.getActividadDePropietario(this.actividad).subscribe((data) => {

        //if (data.titulo == null) {

          this.activityServiceProvider.updateActividad(this.actividad, this.tituloAnterior).subscribe(data => {

            if (data != null) {
              this.navCtrl.setRoot(CatalogoPage);
            }

            else {
              this.showAlert3();
            }
          });
        //}

        //else {

          //this.showAlert2();
        //}

      });
    }

      else {

        this.showAlert1();

      }

  }

  cancel() {
    this.navCtrl.pop();
  }

  showAlert1 () {
    const alert = this.alertCtrl.create({
      title: 'Editar Actividad',
      subTitle: 'Escribe un titulo',
      buttons: ['OK']
    });
    alert.present();

  }

  showAlert2 () {
  const alert = this.alertCtrl.create({
    title: 'Editar Actividad',
    subTitle: 'Ya existe una actividad con este titulo',
    buttons: ['OK']
  });
  alert.present();

  }

  showAlert3() {
    const alert = this.alertCtrl.create({
      title: 'Editar Actividad',
      subTitle: 'No se ha podido guardar bien los datos',
      buttons: ['OK']
    });
    alert.present();
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
