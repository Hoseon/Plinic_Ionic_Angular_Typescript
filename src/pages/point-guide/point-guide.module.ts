import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointGuidePage } from './point-guide';

@NgModule({
  declarations: [
    PointGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(PointGuidePage),
  ],
})
export class PointGuidePageModule {}
