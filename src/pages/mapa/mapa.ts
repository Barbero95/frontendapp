import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Actividad } from '../../app/actividad';
import { Usuario } from '../../app/usuario';

import leaflet from 'leaflet';
import 'leaflet-draw';




@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  actividad: Actividad;
  usuario: Usuario;

  @ViewChild('map') mapContainer: ElementRef;

  map: any;

  lat: any;
  long: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.actividad = new Actividad();
    this.usuario = new Usuario();

    this.actividad = this.navParams.get('act');
    this.usuario = this.navParams.get('usuario');


  }
  // para hacer mapa he tocado el archivo tsconfig.json apartado types

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 14
    }).addTo(this.map);
  }
  addMarker() {
    let prompt = this.alertCtrl.create({
      title: 'Add Marker',
      message: "Enter location",
      inputs: [
        {
          name: 'city',
          placeholder: 'City'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            
            this.geoCodeandAdd(data.city);
          }
        }
      ]
    });
    prompt.present();
  }
 
  geoCodeandAdd(city) {
    
  }
  
}
