import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Usuario } from '../../app/usuario';
import { PerfilPage } from '../perfil/perfil';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {
  @ViewChild(Content) content: Content;

  usuario: Usuario;
  usuarioPrevio: Usuario;
  tagAdd: string ="";
  base64Image;
  foto = null;
  selectedFile: File = null;
  repassword: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private userServiceProvider: UserServiceProvider, public storage: Storage, public alertCtrl: AlertController, private  camera: Camera, public http: HttpClient) {
    
    this.usuario = new Usuario();
    this.usuarioPrevio = new Usuario();

    this.storage.get('nick').then( (nick) => {

      this.usuario.nick = nick;
      //console.log("propietario valor ya guardado: " + this.propietario);
      this.inicio();
    });
    
  }

  inicio(){
    this.userServiceProvider.getUsuario(this.usuario.nick).subscribe( data => {
      this.usuario = data;
      this.usuarioPrevio = this.usuario;
      this.foto = this.usuario.imagen;
      this.repassword = this.usuario.password;
    });
    //this.foto = "http://localhost:3000/uploads/" + this.usuario.nick + ".png";
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
    if(this.usuario.password != this.repassword ){
      this.showAlert2();
      //alert("La contraseña no es igual");
    }
    else{
      this.userServiceProvider.updateUsuario(this.usuario).subscribe( data => {
        if(data != null){
          this.navCtrl.setRoot(PerfilPage);
        }else{
          this.showAlert3();
        }
      });
    }
    
  }
  cancel(){
    this.navCtrl.pop();
  }
  //cargar foto para movil
  openGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }
  //subir la foto
  upload(){
    let url = "http://localhost:3000/users/foto/avatar"
    let posData = new FormData();
    //posData.append('file', this.base64Image);
    posData.append('avatar',this.selectedFile, this.usuario.nick);
    
    let  data: Observable<any> = this.http.post(url, posData);
    data.subscribe((result) => {
      console.log(result);
    });
    
    //this.userServiceProvider.createFoto(posData).subscribe( data => this.updateAvatar());
    this.updateAvatar();

  }
  //cargar foto para web
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }

  updateAvatar(){
    this.usuarioPrevio.imagen = "http://localhost:3000/uploads/" + this.usuario.nick + ".png";
    console.log("nick de la copia: " + this.usuarioPrevio.nick);
    console.log("nick de la copia: " + this.usuarioPrevio.imagen);

    this.userServiceProvider.updateUsuario(this.usuarioPrevio).subscribe( data => {
      if(data != null){
        this.foto = "http://localhost:3000/uploads/" + this.usuario.nick + ".png";
      }else{
        this.showAlert3();
      }
    });
  }



  //la contraseña no es la misma
  showAlert2() {
    const alert = this.alertCtrl.create({
      title: 'Registro',
      subTitle: 'La contraseña no coincide',
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
  //alerta no hay tag para añadir la casilla esta vacia
  showAlert4() {
    const alert = this.alertCtrl.create({
      title: 'Editar Perfil',
      subTitle: 'No hay tag para añadir',
      buttons: ['OK']
    });
    alert.present();
  }
}
