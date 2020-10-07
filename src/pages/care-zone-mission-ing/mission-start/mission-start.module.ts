import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionStartPage } from './mission-start';

@NgModule({
  declarations: [
    MissionStartPage,
  ],
  imports: [
    IonicPageModule.forChild(MissionStartPage),
  ],
})
export class MissionStartPageModule {}
