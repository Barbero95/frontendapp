import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule }    from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { MenuPrincipalPage } from '../pages/menu-principal/menu-principal';
import { CatalogoPage } from '../pages/catalogo/catalogo';
import { CrearActividadPage } from '../pages/crear-actividad/crear-actividad';
import { PerfilPage } from '../pages/perfil/perfil';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { FrontendServicesProvider } from '../providers/frontend-services/frontend-services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    MenuPrincipalPage,
    CatalogoPage,
    CrearActividadPage,
    EditarPerfilPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    MenuPrincipalPage,
    CatalogoPage,
    EditarPerfilPage,
    CrearActividadPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FrontendServicesProvider
  ]
})
export class AppModule {}
