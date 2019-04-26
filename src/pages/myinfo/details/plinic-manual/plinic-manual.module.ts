import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlinicManualPage } from './plinic-manual';

@NgModule({
  declarations: [
    PlinicManualPage,
  ],
  imports: [
    IonicPageModule.forChild(PlinicManualPage),
  ],
})
export class PlinicManualPageModule {}
