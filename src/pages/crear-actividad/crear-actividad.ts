import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Actividad } from '../../app/actividad';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { SideMenuPage } from '../side-menu/side-menu';
import { Geolocation } from '@ionic-native/geolocation';

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

  tag: string = "";
  actividad: Actividad;
  localizacion: number[] = [];
  

  //GPS
  latitude: number = 41.27530691061249;
  longitude: number = 1.9866693019866941;

  constructor(public navCtrl: NavController, public navParams: NavParams, private activityServiceProvider: ActivityServiceProvider, public storage: Storage, public alertCtrl: AlertController, private geolocation: Geolocation) {
   this.actividad = new Actividad();
   console.log ('******* Crear Actividad ********');
   this.inicio();
  }

  inicio(){
    //cogemos la posicion de la persona
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      this.latitude = resp.coords.latitude;
      // resp.coords.longitude
      this.longitude = resp.coords.longitude;
      //guardamos la posicion dentro de la actividad;
      this.localizacion = [this.latitude,this.longitude];
      this.actividad.localizacion = this.localizacion;
      console.log ('loc: ' + this.localizacion);
      console.log ('loc dentro de la actividad: ' + this.actividad.localizacion);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  //Cuando le damos al botón de crear
  crearActividad(){
      this.storage.get('nick').then(val => {
        this.actividad.propietario = val;
        this.comprobacion();
      });
  }

  //comprobamos que todos los campos esta rellenos
  comprobacion(){
    if(this.actividad.titulo.length == 0 || this.actividad.descripcion.length == 0 || this.actividad.tags.length == 0 || this.actividad.ubicacion.length == 0 ){
      //alert("Introduce todo los datos!");
      this.showAlert3();
    }
    else{
      //comprobamos que el titulo no exista ya para este usuario
      if(this.actividad.titulo.length != 0 ){
        this.activityServiceProvider.getActividadDePropietario(this.actividad).subscribe( (data) => {
          if(data == null){
            //ahora creamos la actividad ya que hemos comprobado que no existe dicho titulo
            this.activityServiceProvider.postActividad(this.actividad).subscribe( act => {
              if(act == null){
                //por alguna razon no se ha podido crear esta actividad => mirar base de datos si pasa este paso
                this.showAlert2();
              }
              else{this.navCtrl.setRoot(SideMenuPage);}  
            }, err => console.error('Ops: ' + err.message)); 
          }else{
            this.showAlert1();
          }
        });
      }
    }
  }
  //añadir los tags
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

  //alerta cuando ya existe la misma actividad se comprueba por el titulo
  //un mismo usuario solo puede tener x actividades si el titulo es diferente
  showAlert1() {
    const alert = this.alertCtrl.create({
      title: 'Actividad',
      subTitle: 'Esta actividad ya la tienes en tu catálogo',
      buttons: ['OK']
    });
    alert.present();
  }
  //Error al guardar la actividad en la base de datos
  showAlert2() {
    const alert = this.alertCtrl.create({
      title: 'Actividad',
      subTitle: 'Error al crear la actividad',
      buttons: ['OK']
    });
    alert.present();
  }
  //alerta porque faltan campos por rellenar
  showAlert3() {
    const alert = this.alertCtrl.create({
      title: 'Actividad',
      subTitle: 'Rellena todos los campos',
      buttons: ['OK']
    });
    alert.present();
  }
  //alerta no hay tag para añadir la casilla esta vacia
  showAlert4() {
    const alert = this.alertCtrl.create({
      title: 'Actividad',
      subTitle: 'No hay tag para añadir',
      buttons: ['OK']
    });
    alert.present();
  }

}
