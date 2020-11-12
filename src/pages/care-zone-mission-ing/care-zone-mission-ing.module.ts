import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { CareZoneMissionIngPage } from './care-zone-mission-ing';



@NgModule({
  declarations: [
    // CareZoneMissionIngPage,
  ],
  imports: [
    IonicPageModule.forChild(CareZoneMissionIngPage),
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ]
})
export class CareZoneMissionIngPageModule {}
