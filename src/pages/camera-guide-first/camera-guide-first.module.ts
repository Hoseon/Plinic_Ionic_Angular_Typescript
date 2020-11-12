import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraGuideFirstPage } from './camera-guide-first';

@NgModule({
  declarations: [
    CameraGuideFirstPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraGuideFirstPage),
  ],
})
export class CameraGuideFirstPageModule {}
