import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkinMeasureStartPage } from './skin-measure-start';

@NgModule({
  declarations: [
    SkinMeasureStartPage,
  ],
  imports: [
    IonicPageModule.forChild(SkinMeasureStartPage),
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ]
})
export class SkinMeasureStartPageModule {}
