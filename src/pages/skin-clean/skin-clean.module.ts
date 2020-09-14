import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkinCleanPage } from './skin-clean';

@NgModule({
  declarations: [
    SkinCleanPage,
  ],
  imports: [
    IonicPageModule.forChild(SkinCleanPage),
  ],
})
export class SkinCleanPageModule {}
