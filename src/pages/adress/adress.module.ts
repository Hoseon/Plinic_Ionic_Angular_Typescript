import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdressPage } from './adress';

@NgModule({
  declarations: [
    AdressPage,
  ],
  imports: [
    IonicPageModule.forChild(AdressPage),
  ]

})
export class AdressPageModule {}
