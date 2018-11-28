import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { CatalogoPage } from '../catalogo/catalogo';
import { MenuPrincipalPage } from '../menu-principal/menu-principal';
import { CrearActividadPage } from '../crear-actividad/crear-actividad';
import { PerfilPage } from '../perfil/perfil';
import { FrontendServicesProvider } from '../../providers/frontend-services/frontend-services';
import { HomePage } from '../home/home';
import { Usuario } from '../../app/usuario';

/**
 * Generated class for the SideMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenuPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, component: any, icon: string}>;
  pageExit: {title: string, component: any, icon: string}
  propietario: string = "";
  nick: string = "";
  estrellas: number = 0;
  usuario: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,public statusBar: StatusBar, 
    public splashScreen: SplashScreen, public platform: Platform, private frontendServices: FrontendServicesProvider, public storage: Storage,public alertCtrl: AlertController) {
      //this.initializeApp();

      this.storage.get('nick').then( (propietario) => {
        //this.propietario = val;
        console.log("propietario valor directo de storage: " + propietario);
        this.propietario = propietario;
        console.log("propietario valor ya guardado: " + this.propietario);
        this.inicio();
        this.rootPage = MenuPrincipalPage;
      });

      this.pages = [
      { title: 'Menu Principal', component: MenuPrincipalPage, icon:"home" },
      { title: 'Catálogo', component: CatalogoPage, icon: "book"},
      { title: 'Crear Actividad', component: CrearActividadPage, icon:"add-circle"}
      ];
      this.pageExit = { title: 'LogOut', component: HomePage, icon: "exit" };

      
    
  }
  inicialitzer(){
    this.usuario = {
      nombre:"",
      apellido:"",
      nick:"",
      email:"",
      estrellas:0,
      tags: [""],
      imagen:"",
      password:"",
      actividadesPropietario:[],
      actividadesCliente:[],
      _id:0,
      __v:0
    }
  }
  /*
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  */

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  goPerfil(){
    this.menu.close();
    this.nav.setRoot(PerfilPage);
  }

  inicio(){
    this.frontendServices.getUsuario(this.propietario).subscribe( data => {
      this.usuario = data;
      this.nick = this.usuario.nick;
      this.estrellas = this.usuario.estrellas;
      console.log("Side nick en data" + data.nick);
      console.log("Side nick en usuario" + this.usuario.nick);
      console.log("Side nick en nick" + this.nick);
    });

  }
  goExit(){
    this.showConfirm();
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'LogOut',
      message: '¿Estas seguro que quieres salir de la aplicación?',
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
            this.storage.remove('nick');
            this.menu.close();
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }

}
