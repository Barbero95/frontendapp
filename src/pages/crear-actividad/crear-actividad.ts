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
  tag: string = "";
  arrayTags: string[] = [];
  ciudad: string = "";
  actividad: Actividad;
  localizacion: number[];
  propietario: string = "";

  //GPS
  latitude: number = 41.27530691061249;
  longitude: number = 1.9866693019866941;

  constructor(public navCtrl: NavController, public navParams: NavParams, private frontendServices: FrontendServicesProvider, public storage: Storage, public alertCtrl: AlertController) {
    this.storage.get('nick').then(val => {
      this.propietario = val;
    });
    console.log("propietario nivel crear actividad" + this.propietario);
  }

  //Ponemos todos los valores del formulario en la actividad y cogemos el nick en el local storage
  ponerDatos(){
    //obtenemos el nick del local storage
    this.storage.get('nick').then(val => {
      this.propietario = val;
    });
    console.log("propietario nivel crear actividad" + this.propietario);

    //introducimos la posición donde estamos
    this.localizacion = [this.latitude,this.longitude];

    //guardamos todas las variables en la actividad
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

  //Cuando le damos al botón de crear
  crearActividad(){
    //llamamos a introducir todos los datos en actividad
    this.ponerDatos();

    //comprobamos que todos los campos esta rellenos
    if(this.titulo.length == 0 || this.descripcion.length == 0 || this.arrayTags[0].length == 0 || this.ciudad.length == 0 ){
      //alert("Introduce todo los datos!");
      this.showAlert3();
    }
    else{
      //comprobamos que el titulo no exista ya para este usuario
      if(this.titulo.length != 0 ){
        this.frontendServices.getActividadDePropietario(this.actividad).subscribe( (data) => {
          if(data == null){
            //ahora creamos la actividad ya que hemos comprobado que no existe dicho titulo
            this.frontendServices.postActividad(this.actividad).subscribe( act => {
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
      this.arrayTags.push(this.tag);
      this.tag = "";
    }
    
  }
  //borrar un tag
  deleteTag(item): void {
    var pos = this.arrayTags.indexOf(item);
    this.arrayTags.splice(pos,1);
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

  /*
  //del frontend web
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
  */

}
