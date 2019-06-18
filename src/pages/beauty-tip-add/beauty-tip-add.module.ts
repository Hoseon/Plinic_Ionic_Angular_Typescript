import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeautyTipAddPage } from './beauty-tip-add';



@NgModule({
  declarations: [
    BeautyTipAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BeautyTipAddPage),
  ]
})
export class BeautyTipAddPageModule {}
