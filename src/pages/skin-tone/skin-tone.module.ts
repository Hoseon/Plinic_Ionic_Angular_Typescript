import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkinTonePage } from './skin-tone';

@NgModule({
  declarations: [
    SkinTonePage,
  ],
  imports: [
    IonicPageModule.forChild(SkinTonePage),
  ],
})
export class SkinTonePageModule {}
