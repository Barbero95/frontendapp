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
      maxZoom: 16,
      minZoom: 0,
      zoomSnap: 0,
      zoomDelta: 0.25
    }).addTo(this.map);
    this.map.setView(new leaflet.LatLng(this.actividad.localizacion[0], this.actividad.localizacion[1]), 16);
    this.addMarker();
  }
  addMarker() {
    let markerGroup = leaflet.featureGroup();
    let marker = leaflet.marker([this.actividad.localizacion[0], this.actividad.localizacion[1]],16).on('click', () => {
      alert('marker clicked');
    })
    markerGroup.addLayer(marker);
    this.map.addLayer(markerGroup);
  }
 
}
