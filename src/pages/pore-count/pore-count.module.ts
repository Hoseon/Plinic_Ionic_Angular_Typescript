import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoreCountPage } from './pore-count';

@NgModule({
  declarations: [
    PoreCountPage,
  ],
  imports: [
    IonicPageModule.forChild(PoreCountPage),
  ],
})
export class PoreCountPageModule {}
