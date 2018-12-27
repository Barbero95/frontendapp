import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../app/usuario';
import { Actividad } from '../../app/actividad';
import { AlertController } from 'ionic-angular';
import { EditarActividadPage } from "../editar-actividad/editar-actividad";

import { PerfilAjenoPage } from "../perfil-ajeno/perfil-ajeno";

/**
 * Generated class for the ActividadesEnCursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class ActividadesUsuario {
    actividad: string;
    idCliente: string;
    cliente: string;
    estado: number;
    propietario: string;
}

@IonicPage()
@Component({
  selector: 'page-actividades-en-curso',
  templateUrl: 'actividades-en-curso.html',
})
export class ActividadesEnCursoPage {

  idCliente: string 
  //cliente: string;="";

  items: Array<{title: string, note: string, icon: string}>;

  propietario: string = "";
  idpropietario: string = "";
  idcli:string = "";
  usuario2: Usuario;
  usuario: Usuario;
  actividades: Actividad[];
  actividades2: Actividad[];
  index: number = 0;
  result: ActividadesUsuario[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private userServiceProvider: UserServiceProvider, private activityServiceProvider: ActivityServiceProvider, public storage: Storage, public alertCtrl: AlertController) {
    //es como iniciaar el local storage si no no obtenemos lso datos
    this.actividades = []; this.actividades2 = [];
    this.storage.get('nick').then( (nick) => {
      this.propietario = nick;
      //console.log("el nick es : "+ this.propietario);

      this.userServiceProvider.getUsuario(this.propietario).subscribe((ua) => {
        //console.log(ua)
        this.idpropietario = ua._id;
        //console.log("el id del propietario es :" + this.idpropietario);
      })
      this.inicio();
    });
  }




  //al iniciar
  inicio(){

    //this.inicialitzer();

    //pedimos el usuario
    this.activityServiceProvider.getActividadesPropietario(this.propietario).subscribe( (activitats) => {

      for(let a of activitats) {
        for(let c of a.clientes) {
          let o = new ActividadesUsuario();
          o.actividad = a.titulo;
          o.idCliente = c.idCliente;
          o.estado = c.estado;
          o.propietario = this.propietario;
          this.result.push(o);
        }
      }

      for(let a of this.result) {
        this.userServiceProvider.getUserById(a.idCliente).subscribe( data => {
          a.cliente = data.nick;
          //console.log(data.nick);
        });
      }

    //console.log("la id que deberiamos haber mandado es + "+ this.idpropietario);
    this.activityServiceProvider.getActividadesCliente(this.idpropietario).subscribe((act) =>{
      
      for(let a of act) {
        for(let c of a.clientes) {
          let o = new ActividadesUsuario();
          if (c.idCliente == this.idpropietario){
            o.actividad = a.titulo;
            o.propietario = a.propietario;
            o.idCliente = c.idCliente;
            o.estado = c.estado;
            o.cliente = this.propietario;
          this.result.push(o);
          }
        }
      }



    })
    });
    

  }
  


  perfilAjeno(actividad: Actividad){
    this.navCtrl.push(PerfilAjenoPage, {'usuario': actividad.propietario});

  }


  goToEditarActividad(actividad: Actividad){
    this.navCtrl.push(EditarActividadPage, {'act': actividad});


  }
  aceptarActivity(nombre: string , propi: string , clienId: string){
    //console.log("la actividad del usuario es :" + nombre);
    //console.log("el propietario es :" + propi);
    this.activityServiceProvider.getActividadDePropietarioByName(propi,nombre).subscribe( dat =>{
      
      for(let d of dat.clientes){
        //console.log( "el d.idCliente es "+d.idCliente + "y el id guardado es " + clienId);
        if (d.idCliente == clienId){
          //console.log("ha entrado");
          d.estado = 2;

        }

      }
      //console.log(dat);
      this.activityServiceProvider.updateActividad(dat,dat.titulo).subscribe( data => {
      if(data != null){
        this.showAlert1();
      }else{
        this.showAlert3();
      }
    });


    })
    
  
  }
  finalitzarActivity(nombre: string , propi: string , clienId: string){
    //console.log("la actividad del usuario es :" + nombre);
    //console.log("el propietario es :" + propi);
    this.activityServiceProvider.getActividadDePropietarioByName(propi,nombre).subscribe( dat =>{
      
      for(let d of dat.clientes){
        //console.log( "el d.idCliente es "+d.idCliente + "y el id guardado es " + clienId);
        if (d.idCliente == clienId){
          //console.log("ha entrado");
          if(d.estado ==2){
            d.estado = 3;
          }
          else{
            d.estado = 4;
          }
          

        }

      }
      //console.log(dat);
      this.activityServiceProvider.updateActividad(dat,dat.titulo).subscribe( data => {
      if(data != null){
        this.showAlert1();
      }else{
        this.showAlert3();
      }
    });


    })
    
  
  }


  
   declinarACtivity(actividad: Actividad, ind:number){
     actividad.clientes[ind].estado = 2;
     this.activityServiceProvider.updateActividad(actividad,actividad.titulo).subscribe( data => {
       if(data != null){
         this.showAlert1();
       }else{
         this.showAlert3();
       }
     });
   
    }

    

   showAlert3() {
    const alert = this.alertCtrl.create({
      title: 'Solicitar Actividad',
      subTitle: 'No se ha podido solicitar la actividad',
      buttons: ['OK']
    });
    alert.present();
    
  }
  showAlert4() {
    const alert = this.alertCtrl.create({
      title: 'Usuario por ref',
      subTitle: 'No se ha podido obtener el usuario por la referencia',
      buttons: ['OK']
    });
    alert.present();
    
  }
  showAlert1() {
    const alert = this.alertCtrl.create({
      title: 'Aceptar Actividad',
      subTitle: 'Actividad aceptada',
      buttons: ['OK']
    });
    alert.present();
    
  }

}
