import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

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

  titulo: string;
  descripcion: string;
  tags: string;
  arrayTags: string[];
  ciudad: string;
  actividad: Actividad;
  localizacion: number[];
  respuestaTitulo: Actividad;
  propietario: string;

  //Para alertas
  alert1: boolean = false;
  alert2: boolean = false;
  alert3: boolean = false;
  alert4: boolean = false;
  alert5: boolean = false;

  //GPS
  latitude: number = 41.27530691061249;
  longitude: number = 1.9866693019866941;

  constructor(public navCtrl: NavController, public navParams: NavParams, private frontendServices: FrontendServicesProvider, private storage: Storage, public alertCtrl: AlertController) {
    this.actividad = {
      _id:"",
      __v:0,
      titulo:"",
      descripcion:"",
      estrellas:0,
      propietario: "",
      tags:[""],
      clientes:[],
      ubicacion:"",
      localizacion: []
    };
    this.respuestaTitulo = {
      _id:"",
      __v:0,
      titulo:"",
      descripcion:"",
      estrellas:0,
      propietario: "",
      tags:[""],
      clientes:[],
      ubicacion:"",
      localizacion: []
    };
  }


  crearActividad(){
    this.localizacion = [this.latitude,this.longitude];
    //hacer set del storage y meter el nick
    this.storage.get('nick').then((val) => {
      console.log('Your nick is', val);
      this.propietario = val;
    });
    this.actividad.propietario = this.propietario;
    if(this.titulo == ""){this.alert2 = true;
    }else{
      this.actividad.titulo = this.titulo;
      this.frontendServices.getActividadDePropietario(this.actividad).subscribe( data => this.respuestaTitulo = data)
      if(this.respuestaTitulo == null){
        this.alert1 = true;
      }
      this.alert1= false;
      this.alert2 = false;
    }
    if(this.descripcion == ""){this.alert3 = true;}else{this.alert3 = false;}
    if(this.tags == ""){this.alert4 = true;}else{this.alert4 = false;}
    if(this.ciudad == ""){this.alert5 = true;}else{this.alert5 = false;}

    if(this.titulo != "" && this.descripcion != "" && this.tags != "" && this.ciudad != ""){
      this.actividad = {
        _id:"",
        __v:0,
        titulo:this.titulo,
        descripcion:this.descripcion,
        estrellas:0,
        propietario: "time4time",
        tags:this.arrayTags,
        clientes:[],
        ubicacion:"Barcelona",
        localizacion: this.localizacion
      }; 
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

}
