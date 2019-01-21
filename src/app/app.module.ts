import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StarRatingModule } from 'ionic3-star-rating';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { MenuPrincipalPage } from '../pages/menu-principal/menu-principal';
import { CatalogoPage } from '../pages/catalogo/catalogo';
import { CrearActividadPage } from '../pages/crear-actividad/crear-actividad';
import { PerfilPage } from '../pages/perfil/perfil';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { SideMenuPage } from '../pages/side-menu/side-menu';
import { MostrarActividadPage } from '../pages/mostrar-actividad/mostrar-actividad';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ActivityServiceProvider } from '../providers/activity-service/activity-service';
import { EditarActividadPage } from '../pages/editar-actividad/editar-actividad';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { PerfilAjenoPage } from '../pages/perfil-ajeno/perfil-ajeno';
import { ActividadesAjenasPage } from '../pages/actividades-ajenas/actividades-ajenas';

import { ActividadesEnCursoPage } from '../pages/actividades-en-curso/actividades-en-curso';
import {ValorarPage} from '../pages/valorar/valorar';
import { Camera } from '@ionic-native/camera';
import {ChatPage} from "../pages/chat/chat";
import {WrappedSocket} from "ng-socket-io/dist/src/socket-io.service";
import {SocketIoConfig, SocketIoModule} from "ng-socket-io";
import {ChatServiceProvider} from "../providers/chat-service/chat-service";
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { MapaPage } from '../pages/mapa/mapa';
import {ChatListPage} from "../pages/chat-list/chat-list";

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {}};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    MenuPrincipalPage,
    CatalogoPage,
    CrearActividadPage,
    EditarPerfilPage,
    PerfilPage,
    SideMenuPage,
    MostrarActividadPage,
    EditarActividadPage,
    ActividadesEnCursoPage,
    NotificacionesPage,
    ActividadesAjenasPage,
    PerfilAjenoPage,
    ChatPage,
    ValorarPage,
    MapaPage,
    ChatListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StarRatingModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
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
    PerfilPage,
    SideMenuPage,
    MostrarActividadPage,
    EditarActividadPage,
    ActividadesEnCursoPage,
    NotificacionesPage,
    ActividadesAjenasPage,
    PerfilAjenoPage,
    ChatPage,
    ValorarPage,
    MapaPage,
    ChatListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true},
    UserServiceProvider,
    Camera,
    ActivityServiceProvider,
    Geolocation,
    WrappedSocket,
    Facebook,
    SocialSharing,
    ChatServiceProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule {}
