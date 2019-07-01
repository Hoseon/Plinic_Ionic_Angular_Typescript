import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkinChartPage } from './skin-chart';

@NgModule({
  declarations: [
    // SkinChartPage,
  ],
  imports: [
    IonicPageModule.forChild(SkinChartPage),
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ]
})
export class SkinChartPageModule {}
