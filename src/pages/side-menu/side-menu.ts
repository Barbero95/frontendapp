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
  rootPage: any = MenuPrincipalPage;
  pages: Array<{title: string, component: any, icon: string}>;
  pageExit: {title: string, component: any, icon: string}
  propietario: string = "";
  nick: string = "";
  estrellas: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,public statusBar: StatusBar, 
    public splashScreen: SplashScreen, public platform: Platform, private frontendServices: FrontendServicesProvider, public storage: Storage,public alertCtrl: AlertController) {
      //this.initializeApp();
      this.pages = [
      { title: 'Menu Principal', component: MenuPrincipalPage, icon:"home" },
      { title: 'Catálogo', component: CatalogoPage, icon: "book"},
      { title: 'Crear Actividad', component: CrearActividadPage, icon:"add-circle"}
      ];
      this.pageExit = { title: 'LogOut', component: HomePage, icon: "exit" };

    this.storage.get('nick').then( (propietario) => {
      //this.propietario = val;
      console.log("propietario valor directo de storage: " + propietario);
      this.propietario = propietario;
      console.log("propietario valor ya guardado: " + this.propietario);
      this.inicio();
    });
    
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
      this.nick = data.nick;
      //modifico estrellas para probar
      //this.estrellas = data.estrellas;
      this.estrellas = 3.2;
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
            this.menu.close();
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }

}
