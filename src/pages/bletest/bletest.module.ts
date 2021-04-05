import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleTestPage } from './bletest';

@NgModule({
  declarations: [
    BleTestPage,
  ],
  imports: [
    IonicPageModule.forChild(BleTestPage),
  ],
})
export class BleTestPagePageModule {}
