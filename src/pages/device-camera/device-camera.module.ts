import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceCameraPage } from './device-camera';

@NgModule({
  declarations: [
    DeviceCameraPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceCameraPage),
  ],
})
export class DeviceCameraPageModule {}
