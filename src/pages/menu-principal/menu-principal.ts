import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Usuario } from '../../app/usuario';
import { Actividad } from '../../app/actividad';
import { MostrarActividadPage } from '../mostrar-actividad/mostrar-actividad';



/**
 * Generated class for the MenuPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-principal',
  templateUrl: 'menu-principal.html',
})
export class MenuPrincipalPage {
  propietario: string = "";
  usuario: Usuario;
  actividades: Actividad[];
  actividad1: Actividad;
  tagsBusqueda: string[] = [];
  tagABuscar: string = "";
  searchTag: string = "";
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private frontendServices: FrontendServicesProvider, public storage: Storage, public alertCtrl: AlertController) {
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
    //pedimos el usuario
    this.frontendServices.getUsuario(this.propietario).subscribe( (data) => {
      this.usuario = data;
      console.log("paso 1: " + this.usuario.nick);
      if(this.usuario.tags[0].length == 0){
        this.showAlert1();
      }else{
        this.tagsBusqueda = this.usuario.tags;
        for (let i=0; i<this.tagsBusqueda.length; i++){
          this.tagABuscar = this.tagsBusqueda[i];
          console.log( "paso2: " + this.tagABuscar);
        }
        this.frontendServices.getActividadesPorTagPerfil(this.tagsBusqueda[0]).subscribe( (acts) => this.actividades = acts);
      }
    });
    
  }
  
  //Barra de busqueda: buscamos por palabra clave
  goSearch(){
    if(this.searchTag.length == 0){

    }else{
      this.frontendServices.getActividadesPorTagPerfil(this.searchTag).subscribe( (acts) => this.actividades = acts);
    }
  }

  //cuando selecionamos una actividad
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(MostrarActividadPage, {
      item: item
    });
  }

  //Debes rellenar el perfil
  showAlert1() {
    const alert = this.alertCtrl.create({
      title: 'Menu Principal',
      subTitle: 'Si quieres que te salga una busqueda sobre los tags que te interesan deberías ir al perfil y editarlo.',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2() {
    const alert = this.alertCtrl.create({
      title: 'Menu Principal',
      subTitle: 'Para buscar actividades introduce algún dato.',
      buttons: ['OK']
    });
    alert.present();
  }


  


}
