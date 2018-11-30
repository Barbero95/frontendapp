import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { Usuario } from '../../app/usuario';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the EditarPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {

  usuario: Usuario;
  propietario: string = "";
  nombre: string = ""; 
  apellido: string = ""; 
  password: string = "";
  email: string = "";
  tagAdd: string ="";
  arrayTags: string[] = [""];



  constructor(public navCtrl: NavController, public navParams: NavParams, private frontendServices: FrontendServicesProvider, public storage: Storage, public alertCtrl: AlertController) {
    this.storage.get('nick').then( (propietario) => {
      //this.propietario = val;
      console.log("propietario valor directo de storage: " + propietario);
      this.propietario = propietario;
      console.log("propietario valor ya guardado: " + this.propietario);
      this.inicio();
    });
  }

  inicio(){
    this.frontendServices.getUsuario(this.propietario).subscribe( data => {
      this.usuario = data;
      this.nombre = this.usuario.nombre;
      this.apellido = this.usuario.apellido;
      this.email = this. usuario.email;
      this.arrayTags = this.usuario.tags;

      console.log("perfil data: " + data.nombre)
    });
  }
  addTag(){
    if(this.tagAdd.length == 0){
      //no hay tag a añadir
      this.showAlert4();
    }else{
      this.arrayTags.push(this.tagAdd);
      this.tagAdd = "";
    }
    
  }
  //borrar un tag
  deleteTag(item): void {
    var pos = this.arrayTags.indexOf(item);
    this.arrayTags.splice(pos,1);
  }

  save(){
    this.usuario.nombre = this.nombre;
    this.usuario.apellido = this.apellido;
    this.usuario.email = this.email;
    this.usuario.tags = this.arrayTags;
    this.frontendServices.updateUsuario(this.usuario).subscribe( data => {
      if(data != null){
        this.navCtrl.setRoot(PerfilPage);
      }else{
        this.showAlert3();
      }
    });
  }
  cancel(){
    this.navCtrl.pop();
  }
  //alerta no hay tag para añadir la casilla esta vacia
  showAlert4() {
    const alert = this.alertCtrl.create({
      title: 'Editar Perfil',
      subTitle: 'No hay tag para añadir',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert3() {
    const alert = this.alertCtrl.create({
      title: 'Editar Perfil',
      subTitle: 'No se ha podido guardar bien los datos',
      buttons: ['OK']
    });
    alert.present();
  }
}
