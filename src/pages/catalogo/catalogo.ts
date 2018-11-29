import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../app/usuario';
import { Actividad } from '../../app/actividad';
import { MostrarActividadPage } from '../mostrar-actividad/mostrar-actividad';



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


  constructor(public navCtrl: NavController, public navParams: NavParams, private frontendServices: FrontendServicesProvider, public storage: Storage) {
    //es como iniciaar el local storage si no no obtenemos lso datos
    this.storage.get('nick').then( (propietario) => {
      //this.propietario = val;
      console.log("propietario valor directo de storage: " + propietario);
      this.propietario = propietario;
      console.log("propietario valor ya guardado: " + this.propietario);
      this.inicio();
    });
  }




  //al iniciar
  inicio(){

    //this.inicialitzer();

    //pedimos el usuario
    this.frontendServices.getActividadesPropietarioDani(this.propietario).subscribe( (activitats) => {
      this.actividades = activitats;

    });

  }


}
