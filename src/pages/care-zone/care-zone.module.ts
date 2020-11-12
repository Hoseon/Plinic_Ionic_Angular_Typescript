import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareZonePage } from './care-zone';

@NgModule({
  declarations: [
    CareZonePage,
  ],
  imports: [
    IonicPageModule.forChild(CareZonePage),
  ],
})
export class CareZonePageModule {}
