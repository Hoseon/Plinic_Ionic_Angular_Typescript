import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkinGuidePage } from './skin-guide';

@NgModule({
  declarations: [
    SkinGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(SkinGuidePage),
  ],
})
export class SkinGuidePageModule {}
