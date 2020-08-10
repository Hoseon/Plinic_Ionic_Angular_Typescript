import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChalMissionStartPage } from './chal-mission-start';

@NgModule({
  declarations: [
    ChalMissionStartPage,
  ],
  imports: [
    IonicPageModule.forChild(ChalMissionStartPage),
  ],
})
export class ChalMissionStartPageModule {}
