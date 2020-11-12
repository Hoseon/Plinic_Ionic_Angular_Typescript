import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointLogPage } from './point-log';

@NgModule({
  declarations: [
    PointLogPage,
  ],
  imports: [
    IonicPageModule.forChild(PointLogPage),
  ],
})
export class PointLogPageModule {}
