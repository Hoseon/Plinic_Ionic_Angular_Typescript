import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceSkinSensorIngPage } from './device-skinsensor-ing';

@NgModule({
  declarations: [
    // DeviceSkinSensorIngPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceSkinSensorIngPage),
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ]
})
export class DeviceSkinSensorIngPageModule {}
