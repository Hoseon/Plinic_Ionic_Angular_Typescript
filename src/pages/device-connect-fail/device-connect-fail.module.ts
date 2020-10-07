import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceConnectFailPage } from './device-connect-fail';

@NgModule({
  declarations: [
    DeviceConnectFailPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceConnectFailPage),
  ],
})
export class DeviceConnectFailPageModule {}
