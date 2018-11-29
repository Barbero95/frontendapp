import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../app/usuario';
import { Actividad } from '../../app/actividad';
import { MostrarActividadPage } from '../mostrar-actividad/mostrar-actividad';
import {HomePage} from "../home/home";
import { AlertController } from 'ionic-angular';
import {EditarActividadPage} from "../editar-actividad/editar-actividad";




@IonicPage()
@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
})
export class CatalogoPage {

  items: Array<{title: string, note: string, icon: string}>;

  propietario: string = "";
  usuario: Usuario;
  actividades: Actividad[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private frontendServices: FrontendServicesProvider, public storage: Storage, public alertCtrl: AlertController) {
    //es como iniciaar el local storage si no no obtenemos lso datos
    this.storage.get('nick').then( (nick) => {
      this.propietario = nick;
      this.inicio();
    });
  }




  //al iniciar
  inicio(){

    //this.inicialitzer();

    //pedimos el usuario
    this.frontendServices.getActividadesPropietario(this.propietario).subscribe( (activitats) => {
      this.actividades = activitats;
    });

  }

  eliminarActivity(actividad: Actividad): void{
    // es un showConfirm

      const confirm = this.alertCtrl.create({
        title: 'Eliminar Activitat',
        message: '¿Estas seguro que quieres eliminar la actividad?',
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Agree',
            handler: () => {
              console.log('Agree clicked');
              this.frontendServices.deleteActividad(actividad).subscribe(act => {
                if (act != null){
                  this.inicio();
                }
                else {
                  //he de posar una alerta
                }
              }, err => console.error('Ops: ' + err.message));
            }
          }
        ]
      });
      confirm.present();



  }

  goToEditarActividad(actividad: Actividad){
    this.navCtrl.push(EditarActividadPage, actividad);


  }

}
