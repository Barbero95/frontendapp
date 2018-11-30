import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
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
  tagAdd: string ="";

  constructor(public navCtrl: NavController, public navParams: NavParams, private userServiceProvider: UserServiceProvider, public storage: Storage, public alertCtrl: AlertController) {
    
    this.usuario = new Usuario();

    this.storage.get('nick').then( (nick) => {

      this.usuario.nick = nick;
      //console.log("propietario valor ya guardado: " + this.propietario);
      this.inicio();
    });
  }

  inicio(){
    this.userServiceProvider.getUsuario(this.usuario.nick).subscribe( data => {
      this.usuario = data;
      //console.log("perfil data: " + usuario.nombre);
    });
  }
  addTag(){
    if(this.tagAdd.length == 0){
      //no hay tag a añadir
      this.showAlert4();
    }else{
      this.usuario.tags.push(this.tagAdd);
      this.tagAdd = "";
    }
    
  }
  //borrar un tag
  deleteTag(item): void {
    var pos = this.usuario.tags.indexOf(item);
    this.usuario.tags.splice(pos,1);
  }

  save(){
    this.userServiceProvider.updateUsuario(this.usuario).subscribe( data => {
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
