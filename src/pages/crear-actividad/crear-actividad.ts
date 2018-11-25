import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { SideMenuPage } from '../side-menu/side-menu';

/**
 * Generated class for the CrearActividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-actividad',
  templateUrl: 'crear-actividad.html',
})
export class CrearActividadPage {

  titulo: string = "";
  descripcion: string = "";
  tags: string = "";
  arrayTags: string[];
  ciudad: string = "";
  actividad: Actividad;
  localizacion: number[];
  propietario: string = "";

  //Para alertas
  alert1: boolean = false;
  alert2: boolean = false;
  alert3: boolean = false;
  alert4: boolean = false;
  alert5: boolean = false;

  //GPS
  latitude: number = 41.27530691061249;
  longitude: number = 1.9866693019866941;

  constructor(public navCtrl: NavController, public navParams: NavParams, private frontendServices: FrontendServicesProvider, public storage: Storage, public alertCtrl: AlertController) {
    this.storage.get('nick').then(val => {
      this.propietario = val;
    });
    console.log("propietario nivel crear actividad" + this.propietario);
  }
  getNick(){
    this.storage.get('nick').then(val => {
      this.propietario = val;
    });
    console.log("propietario nivel crear actividad" + this.propietario);
  }
  ponerDatos(){
    this.getNick();
    this.localizacion = [this.latitude,this.longitude];
    //hacer set del storage y meter el nick
    this.actividad = {
      _id:"",
      __v:0,
      titulo:this.titulo,
      descripcion:this.descripcion,
      estrellas:0,
      propietario: this.propietario,
      tags:this.arrayTags,
      clientes:[],
      ubicacion:this.ciudad,
      localizacion: this.localizacion
    };
  }

  crearActividad(){
    this.ponerDatos();
    if(this.titulo == ""){this.alert2 = true;
    }else{
      this.frontendServices.getActividadDePropietario(this.actividad).subscribe( (data) => {
        if(data == null){
          console.log("he entrado aqui");
        }else{
          this.showAlert1();
        }
      });
      this.alert2 = false;
    }
    if(this.descripcion == ""){this.alert3 = true;}else{this.alert3 = false;}
    if(this.tags == ""){this.alert4 = true;}else{this.alert4 = false;}
    if(this.ciudad == ""){this.alert5 = true;}else{this.alert5 = false;}

    if(this.titulo != "" && this.descripcion != "" && this.tags != "" && this.ciudad != ""){
      this.frontendServices.postActividad(this.actividad).subscribe( act => {
        if(act == null){
          this.showAlert2();
        }
        else{this.navCtrl.setRoot(SideMenuPage);}  
      }, err => console.error('Ops: ' + err.message)); 
    }
  }
  showAlert1() {
    const alert = this.alertCtrl.create({
      title: 'Actividad',
      subTitle: 'Esta actividad ya la tienes en tu catálogo',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2() {
    const alert = this.alertCtrl.create({
      title: 'Actividad',
      subTitle: 'Error al crear la actividad',
      buttons: ['OK']
    });
    alert.present();
  }

}
