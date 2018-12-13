import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../app/usuario';
import { Actividad } from '../../app/actividad';
import { AlertController } from 'ionic-angular';
import {EditarActividadPage} from "../editar-actividad/editar-actividad";

/**
 * Generated class for the ActividadesEnCursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actividades-en-curso',
  templateUrl: 'actividades-en-curso.html',
})
export class ActividadesEnCursoPage {

  cliente: string ="";

  items: Array<{title: string, note: string, icon: string}>;

  propietario: string = "";
  usuario: Usuario;
  actividades: Actividad[];
  actividades2: Actividad[];
  index: number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private activityServiceProvider: ActivityServiceProvider, public storage: Storage, public alertCtrl: AlertController) {
    //es como iniciaar el local storage si no no obtenemos lso datos
    this.actividades = []; this.actividades2 = [];
    this.storage.get('nick').then( (nick) => {
      this.propietario = nick;
      this.inicio();
    });
  }




  //al iniciar
  inicio(){

    //this.inicialitzer();

    //pedimos el usuario
    this.activityServiceProvider.getActividadesPropietario(this.propietario).subscribe( (activitats) => {
      /*
      console.log(activitats);
      for(var b in activitats){
        console.log(activitats[b].clientes)
        for (var c in activitats[b].clientes){
          console.log(activitats[b].clientes[c]);
          console.log(this.index);
          console.log('la actividad es ' + activitats[b]);
          //this.actividades2.push = activitats.;
          this.index = this.index +1;
        }

      }
      */
     for (let i=0; i<activitats.length; i++){
      if (activitats[i].clientes.length != 0){
        this.actividades.push(activitats[i]);
        console.log(this.actividades[i].titulo);
        for (let y=0; y<this.actividades[i].clientes.length; y++){
          this.actividades2.push(this.actividades[i]);
          console.log(this.actividades2[y].titulo);
        }
      }
     }

     //this.generarLista(this.actividades);

      //console.log(this.actividades2);
      //this.actividades = this.actividades2;
      //this.actividades = activitats;
    });

  }
  
  goToEditarActividad(actividad: Actividad){
    this.navCtrl.push(EditarActividadPage, {'act': actividad});


  }
  aceptarActivity(actividad: Actividad, ind:number){
    actividad.clientes[ind].estado = 2;
    this.activityServiceProvider.updateActividad(actividad,actividad.titulo).subscribe( data => {
      if(data != null){
        this.showAlert1();
      }else{
        this.showAlert3();
      }
    });
  
   }
   declinarACtivity(actividad: Actividad, ind:number){
     actividad.clientes[ind].estado = 2;
     this.activityServiceProvider.updateActividad(actividad,actividad.titulo).subscribe( data => {
       if(data != null){
         this.showAlert1();
       }else{
         this.showAlert3();
       }
     });
   
    }

    finalitzarACtivity(actividad: Actividad, ind:number){
      actividad.clientes[ind].estado = 2;
      this.activityServiceProvider.updateActividad(actividad,actividad.titulo).subscribe( data => {
        if(data != null){
          this.showAlert1();
        }else{
          this.showAlert3();
        }
      });
    
     }


   showAlert3() {
    const alert = this.alertCtrl.create({
      title: 'Solicitar Actividad',
      subTitle: 'No se ha podido solicitar la actividad',
      buttons: ['OK']
    });
    alert.present();
    
  }
  showAlert1() {
    const alert = this.alertCtrl.create({
      title: 'Aceptar Actividad',
      subTitle: 'Actividad aceptada',
      buttons: ['OK']
    });
    alert.present();
    
  }

}
