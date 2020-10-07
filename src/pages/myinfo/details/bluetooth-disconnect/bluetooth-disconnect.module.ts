import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BluetoothDisconnectPage } from './bluetooth-disconnect';

@NgModule({
  declarations: [
    BluetoothDisconnectPage,
  ],
  imports: [
    IonicPageModule.forChild(BluetoothDisconnectPage),
  ],
})
export class BluetoothDisconnectPageModule {}
