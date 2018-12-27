import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Usuario } from '../../app/usuario';
import { Actividad } from '../../app/actividad';
import { MostrarActividadPage } from '../mostrar-actividad/mostrar-actividad';
import { Busqueda } from '../../app/busqueda';
import { Geolocation } from '@ionic-native/geolocation';
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import { MapaPage } from '../mapa/mapa';
import {ChatListPage} from "../chat-list/chat-list";


@IonicPage()
@Component({
  selector: 'page-menu-principal',
  templateUrl: 'menu-principal.html',
})
export class MenuPrincipalPage {
  nick: string = "";
  usuario: Usuario;
  actividades: Actividad[];
  actividades2: Actividad[];
  actividadesEncontradas: Actividad[];
  search: Busqueda;
  actividad1: Actividad;
  numberMsg: number;

  //coge los tags del usuario en tagsBusqueda y tagABuscra coge cada tga del array de tags del usuario
  tagsBusqueda: string[] = [];
  tagABuscar: string = "";

  //Es el search que encontramos en la pagina, busca lo que pongamos
  searchString: string = "";

  //GPS
  distancia: number = 0;
  latitude: number = 41.27530691061249;
  longitude: number = 1.9866693019866941;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private activityServiceProvider: ActivityServiceProvider,
              private userServiceProvider: UserServiceProvider,
              private chatServiceProvider: ChatServiceProvider,
              public storage: Storage,
              public alertCtrl: AlertController,
              private geolocation: Geolocation) {

    this.usuario = new Usuario();
    this.search = new Busqueda();
    this.actividad1 = new Actividad();
    this.actividades = [];
    this.actividades2 = [];
    this.actividadesEncontradas = [];

    this.storage.get('nick').then( (nick) => {
      console.log("propietario valor directo de storage: " + nick);
      this.nick = nick;

      this.inicio();
    });
  }

  ionViewDidEnter() {
    this.getNumberMessages();
  }

  //al iniciar
  inicio(){
    //cogemos la posicion de la persona
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      this.search.latitude = resp.coords.latitude;
      // resp.coords.longitude
      this.search.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    //pedimos el usuario
    this.userServiceProvider.getUsuario(this.nick).subscribe( (data) => {
      this.usuario = data;
      this.chatServiceProvider.getMessagesNotSeen(this.usuario).subscribe(messages => {
        this.numberMsg = messages.number;
        console.log('number', this.numberMsg);
      });

      console.log("paso 1: " + this.usuario.nick);
      if(this.usuario.tags.length == 0){
        this.showAlert1();
      }else{
        this.tagsBusqueda = this.usuario.tags;
        for (let i=0; i<this.tagsBusqueda.length; i++){
          this.tagABuscar = this.tagsBusqueda[i];
          console.log( "paso2: " + this.tagABuscar);
          this.activityServiceProvider.getActividadesPorTagPerfil(this.tagsBusqueda[i]).subscribe( (acts) => {
            if (acts != null){
              this.actividadesEncontradas = acts;
              for (let i=0; i<this.actividadesEncontradas.length; i++){
                if(this.actividadesEncontradas[i].propietario != this.nick){
                  this.actividades.push(this.actividadesEncontradas[i]);
                }
              }
            }
            if (this.usuario.tags.length == 0){
              this.showAlert5();
            }
          });
        }
      }

    });
  }

  //Barra de busqueda: buscamos por palabra clave
  goSearch(){
    if(this.searchString.length == 0){
      this.actividades = [];
      this.showAlert4;
    }else{
      //buscamos la palabra por tag
      //this.activityServiceProvider.getActividadesPorTagPerfil(this.searchString).subscribe( (acts) => this.actividades = acts);

      //buscamos la palabra por distancia (gps) y tag
      this.search.tag = this.searchString;
      this.search.distance = this.distancia;

      this.activityServiceProvider.postActividadesGPS(this.search).subscribe( (acts) => {
          this.actividades = acts;
      });

      this.activityServiceProvider.postBusquedaGeoEnDescripcion(this.search).subscribe( (acts2) => {
        this.actividades2 = acts2;
      });

      if(this.actividades.length == 0 && this.actividades2.length == 0){
        console.log("no hay actividades cercanas");
      }

    }
  }

  //pasamos la actividad a la page mapa para mostrar la actividad en el mapa
  verMapaActividad(actividad: Actividad){
    this.navCtrl.push(MapaPage, {'act': actividad, 'usuario': this.usuario});
  }

  //cuando selecionamos una actividad
  goMostrarActividad (actividad: Actividad){
    this.navCtrl.push(MostrarActividadPage, {'act': actividad, 'usuario': this.usuario});
  }
  BusquedaTag(tag){
    this.actividades2 = [];
    this.activityServiceProvider.getActividadesPorTagPerfil(tag).subscribe( (acts) => {
      this.actividades = acts;
    });
  }
  solicitarActividad(){

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

  showAlert4() {
    const alert = this.alertCtrl.create({
      title: 'Busqueda',
      subTitle: 'No hay nada a buscar',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert5() {
    const alert = this.alertCtrl.create({
      title: 'Actividades recomendadas',
      subTitle: 'Para tus tags no tenemos actividades para recomendarte.',
      buttons: ['OK']
    });
    alert.present();
  }
 
  showAlert7() {
    const alert = this.alertCtrl.create({
      title: 'Busqueda',
      subTitle: 'No hay actividades cercanas.',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert8() {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error.',
      buttons: ['OK']
    });
    alert.present();
  }

  getNumberMessages() {
    this.userServiceProvider.getUsuario(this.nick).subscribe((data) => {
      this.usuario = data;
      this.chatServiceProvider.getMessagesNotSeen(this.usuario).subscribe(messages => {
        this.numberMsg = messages.number;
        console.log('number', this.numberMsg);
      });
    });
  }

  goToChatList() {
    this.navCtrl.push(ChatListPage, {'usuario': this.usuario});
  }

}
