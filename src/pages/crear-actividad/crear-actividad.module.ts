import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearActividadPage } from './crear-actividad';

@NgModule({
  declarations: [
    CrearActividadPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearActividadPage),
  ],
})
export class CrearActividadPageModule {}
