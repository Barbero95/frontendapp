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
import { UserServiceProvider } from '../../providers/user-service/user-service';
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
  nick: string = "";
  estrellas: number = 0;
  usuario: Usuario;
  foto = null;
  //caso primero de cargar foto del backend
  //this.foto = "http://localhost:3000/uploads/" + this.nick + ".png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,public statusBar: StatusBar, 
    public splashScreen: SplashScreen, public platform: Platform, private userServiceProvider: UserServiceProvider, public storage: Storage,public alertCtrl: AlertController) {
      
      console.log("**** CONSTRUCTOR ****");
      this.usuario = new Usuario();
      this.storage.get('nick').then( (data) => {
        this.nick = data;
        console.log("propietario valor ya guardado: " + this.nick);
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
    this.userServiceProvider.getUsuario(this.nick).subscribe( data => {
      console.log("**** GET USUARIO *****", JSON.stringify(data));
      this.usuario = data;
      this.foto = this.usuario.imagen;
      console.log("Side nick en data" + data.nick);
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
            //this.menu.close();
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }

}
