import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarActividadPage } from './editar-actividad';

@NgModule({
  declarations: [
    EditarActividadPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarActividadPage),
  ],
})
export class EditarActividadPageModule {}
