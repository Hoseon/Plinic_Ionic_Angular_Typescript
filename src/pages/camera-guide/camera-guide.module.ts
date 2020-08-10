import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraGuidePage } from './camera-guide';

@NgModule({
  declarations: [
    CameraGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(CameraGuidePage),
  ],
})
export class CameraGuidePageModule {}
