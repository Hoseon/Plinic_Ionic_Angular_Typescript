import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkinChartPage } from './skin-chart';

@NgModule({
  declarations: [
    SkinChartPage,
  ],
  imports: [
    IonicPageModule.forChild(SkinChartPage),
  ],
})
export class SkinChartPageModule {}
