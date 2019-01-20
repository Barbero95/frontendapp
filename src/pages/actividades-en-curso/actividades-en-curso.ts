import { Component, NgZone } from '@angular/core';
import { Events } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../app/usuario';
import { Actividad } from '../../app/actividad';
import { AlertController } from 'ionic-angular';
import { EditarActividadPage } from "../editar-actividad/editar-actividad";

import { PerfilAjenoPage } from "../perfil-ajeno/perfil-ajeno";
import { ValorarPage } from '../valorar/valorar';


class ActividadesUsuario {
    actividad: string;
    idCliente: string;
    cliente: string;
    estado: number;
    propietario: string;
    horasActividad: number;
    horasTotal: number;
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

  horaspropietario: number;
  propietario: string = "";
  nickUsuario: string = "";
  idpropietario: string = "";
  idcli:string = "";
  usuario2: Usuario;
  usuario: Usuario;
  actividades: Actividad[];
  actividades2: Actividad[];
  index: number = 0;
  result: ActividadesUsuario[] = [];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private userServiceProvider: UserServiceProvider, 
    private activityServiceProvider: ActivityServiceProvider, 
    public storage: Storage, 
    public alertCtrl: AlertController,
    public events: Events,
    private zone: NgZone) 
    {
    //es como iniciaar el local storage si no no obtenemos lso datos
    this.actividades = []; this.actividades2 = [];
    this.storage.get('nick').then( (nick) => {
      this.nickUsuario = nick;
      //console.log("el nick es : "+ this.propietario);

      this.userServiceProvider.getUsuario(this.nickUsuario).subscribe((ua) => {
        //console.log(ua)
        this.idpropietario = ua._id;
        this.horaspropietario = ua.horasUsuario;
        //console.log("el id del propietario es :" + this.idpropietario);
      })
      this.inicio();
    });
    //refresh page
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
    
    //on volguem obligar a refresh page posem:
    //this.events.publish('updateScreen');
  }




  //al iniciar
  inicio(){
    //pedimos el usuario
    this.activityServiceProvider.getActividadesPropietario(this.nickUsuario).subscribe( (activitats) => {

      for(let a of activitats) {
        for(let c of a.clientes) {
          let o = new ActividadesUsuario();
          o.actividad = a.titulo;
          o.idCliente = c.idCliente;
          o.estado = c.estado;
          o.propietario = this.nickUsuario;
          o.horasActividad = a.horasActividad;
          if(o.estado == 4){
            this.horaspropietario = this.horaspropietario - a.horasActividad;
          }
          o.horasTotal = this.horaspropietario;
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
            o.horasActividad = a.horasActividad;
            if(o.estado == 4){
              this.horaspropietario = this.horaspropietario + a.horasActividad;
            }
            o.horasTotal = this.horaspropietario;
            o.cliente = this.nickUsuario;
          //si soy el cliente no me debe salir la opción de poder aceptar o rechazar la actividad y ahora esta saliendo
          //codigo de david -------------------
          if (o.estado==1){
            //pongo un estado inventado para k no salga lo de acpetar o rechazar
            o.estado = 10;
          }
          //-----------------
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
  //esto sobra?
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
        //this.showAlert1();
        //refresh page
        //this.inicio();
        //this.events.publish('updateScreen');
        this.navCtrl.setRoot(ActividadesEnCursoPage);
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
            //d.estado = 4;
            d.estado = 2;
          }

        }

      }
      //console.log(dat);
      this.activityServiceProvider.updateActividad(dat,dat.titulo).subscribe( data => {
        if(data != null){
          this.showAlert1();
          //refresh page
          //this.inicio;
        }else{
          this.showAlert3();
        }
      })
      this.userServiceProvider.getUsuario(propi).subscribe( data1 => {
          console.log("------------------------");
          console.log(data1.nick + data1.horasUsuario);
          data1.horasUsuario = data1.horasUsuario + dat.horasActividad;
          console.log(data1.nick + data1.horasUsuario);
          this.userServiceProvider.updateUsuario(data1).subscribe();
        
      })
      this.userServiceProvider.getUserById(clienId).subscribe(data2 => {
          console.log("------------------------");
          console.log(data2.nick + data2.horasUsuario);
          data2.horasUsuario = data2.horasUsuario - dat.horasActividad;
          console.log(data2.nick + data2.horasUsuario);
          this.userServiceProvider.updateUsuario(data2).subscribe();
        
      })
      this.navCtrl.setRoot(ActividadesEnCursoPage);
    })

  }

  valorarActividad(titulo: string , propi: string , clienId: string){
    this.activityServiceProvider.getActividadDePropietarioByName(propi,titulo).subscribe( data =>{
      this.navCtrl.push(ValorarPage, {'actividad': data});
    })  
  }
  
  declinarActivity(actividad: Actividad, ind:number){
    actividad.clientes[ind].estado = 2;
    this.activityServiceProvider.updateActividad(actividad,actividad.titulo).subscribe( data => {
      if(data != null){
        this.showAlert1();
        //refresh page
        //this.inicio;
      }else{
        this.showAlert3();
      }
    });
  }

  getColor(est) {
    console.log(est);
    switch (est) {
      case '1':
        return 'green';
      case '2':
        return 'blue';
      case '3':
        return 'red';
      case '4':
        return 'yellow';
      case '10':
        return 'green';
    }
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
