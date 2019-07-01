import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareZoneMissionDeadlinePage } from './care-zone-mission-deadline';

@NgModule({
  declarations: [
    // CareZoneMissionDeadlinePage,
  ],
  imports: [
    IonicPageModule.forChild(CareZoneMissionDeadlinePage),
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ]
})
export class CareZoneMissionDeadlinePageModule {}
