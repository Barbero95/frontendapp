import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { SideMenuPage } from '../side-menu/side-menu';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Login } from '../../app/login';
import { Usuario } from '../../app/usuario';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import {Socket} from "ng-socket-io";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { last } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Autenticación
  authenticated = false;

  //La pagina home que es la predefinida por ionic es el Login
  username: string;
  password: string;
  login: Login;
  usuario: Usuario;
  usuario2: Usuario;

  constructor(public navCtrl: NavController,
              private userServiceProvider: UserServiceProvider,
              public storage: Storage,
              public alertCtrl: AlertController,
              public socket: Socket,
              public fb: Facebook) {
                this.usuario2 = new Usuario;
  }
  ponerDatos(){
    this.login = {
      nick:this.username,
      password:this.password
    }
    this.storage.set('nick', this.login.nick);
    console.log("Nivel Login:" + this.login.nick);
  }

  ponerDatosFacebook(na){
    this.login = {
      nick:na,
      password:"facebook"
    }
    this.storage.set('nick', this.login.nick);
    console.log("Nivel Login:" + this.login.nick);
  }

  gologin(){
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);
    this.ponerDatos();
    this.storage.set('my_token', 'hola').then( () => {
      this.userServiceProvider.validarUser(this.login).subscribe( (data) => {
        if (data == null){
          this.showAlert();
        }else{
          //cambio a la app
          this.socket.connect();
          this.socket.emit('set-username', this.username);
          
          //añado token de autenticación al storage y paso al side menu
          this.storage.set('my_token', data.token).then(() => {
            console.log("token:" + data);
            this.authenticated = true;
            this.navCtrl.setRoot(SideMenuPage);
          });
          
        }
      });
    });
    
    



  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }


  facebookLoginAction()
  {
    // Login with permissions
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
    .then( (res: FacebookLoginResponse) => {

        // The connection was successful
        if(res.status == "connected") {

            // Get user ID and Token
            var fb_id = res.authResponse.userID;
            var fb_token = res.authResponse.accessToken;

            // Get user infos from the API
            this.fb.api("/me?fields=name,gender,birthday,email,id,short_name,first_name,last_name", []).then((user) => {

              // Get the connected user details
              var gender    = user.gender;
              var birthday  = user.birthday;
              var name      = user.name;
              var email     = user.email;
              var id = user.id;
              var short_name = user.short_name;
              var first_name = user.first_name;
              var last_name = user.last_name;


              console.log("=== USER INFOS ===");
              console.log("Gender : " + gender);
              console.log("Birthday : " + birthday);
              console.log("Name : " + name);
              console.log("Email : " + email);
              console.log ("User Id : " + id);
              console.log ("Short name : " + short_name);
              console.log ("First name : " + first_name);
              console.log ("Last name : " + last_name);



              this.ponerDatosFacebook(short_name);
              this.storage.set('my_token', 'hola').then( () => {
                this.userServiceProvider.validarUser(this.login).subscribe( (data) => {
                  if (data == null){
                  this.usuario2.nick = short_name;
                  this.usuario2.password = "facebook";
                  this.usuario2.nombre = first_name;
                  this.usuario2.apellido = last_name;
                  this.usuario2.email = email;
                  //guardamos en la url de foto de perfil la de por defecto
                  this.usuario2.imagen = "/assets/images/porDefecto.png";
                  //iniciamos las horas del nuevo usuario
                  this.usuario2.horasUsuario = 20;
                  //enviamos el usuario al backend
                  this.userServiceProvider.postUsuario(this.usuario2).subscribe( data => {
                    
                    
                    this.ponerDatosFacebook(short_name);
                    this.storage.set('my_token', 'hola').then( () => {
                      this.userServiceProvider.validarUser(this.login).subscribe( (data) => {
                        if (data == null){
                          this.showAlert();
                        }else{
                          //cambio a la app
                          this.socket.connect();
                          this.socket.emit('set-username', this.username);
                          
                          //añado token de autenticación al storage y paso al side menu
                          this.storage.set('my_token', data.token).then(() => {
                            console.log("token:" + data);
                            this.authenticated = true;
                            this.navCtrl.setRoot(SideMenuPage);
                          });
                          
                        }
                      });
                    });
                  
                  
                  }, err => {
                    console.error('Ops: ' + err.message);
                    this.showAlert();
                  });






                  }else{
                    //cambio a la app
                    this.socket.connect();
                    this.socket.emit('set-username', this.username);
                    
                    //añado token de autenticación al storage y paso al side menu
                    this.storage.set('my_token', data.token).then(() => {
                      console.log("token:" + data);
                      this.authenticated = true;
                      this.navCtrl.setRoot(SideMenuPage);
                    });
                    
                  }
                });
              });
          });
        }
        // An error occurred while loging-in
        else {

            console.log("An error occurred...");

        }

    })
    .catch((e) => {
        console.log('Error logging into Facebook', e);
    });
      
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Usuario o contraseña incorrectos',
      buttons: ['OK']
    });
    alert.present();
  }
}
