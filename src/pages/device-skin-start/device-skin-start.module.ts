import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceSkinStartPage } from './device-skin-start';

@NgModule({
  declarations: [
    DeviceSkinStartPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceSkinStartPage),
  ],
})
export class DeviceSkinStartPageModule {}
