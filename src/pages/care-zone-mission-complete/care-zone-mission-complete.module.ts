import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareZoneMissionCompletePage } from './care-zone-mission-complete';

@NgModule({
  declarations: [
    // CareZoneMissionCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(CareZoneMissionCompletePage),
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ]
})
export class CareZoneMissionCompletePageModule {}
