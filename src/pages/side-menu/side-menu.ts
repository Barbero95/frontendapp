import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CatalogoPage } from '../catalogo/catalogo';
import { MenuPrincipalPage } from '../menu-principal/menu-principal';
import { CrearActividadPage } from '../crear-actividad/crear-actividad';
import { PerfilPage } from '../perfil/perfil';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,public statusBar: StatusBar,
    public splashScreen: SplashScreen, public platform: Platform) {
      this.initializeApp();
      this.pages = [
      { title: 'Menu Principal', component: MenuPrincipalPage, icon:"home" },
      { title: 'Catálogo', component: CatalogoPage, icon: "book"},
      { title: 'Crear Actividad', component: CrearActividadPage, icon:"add-circle"}
    ];
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  goPerfil(){
    this.nav.setRoot(PerfilPage);
  }

}
