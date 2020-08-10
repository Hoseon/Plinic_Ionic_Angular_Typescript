import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkincheckGuidePage } from './skincheck-guide';

@NgModule({
  declarations: [
    SkincheckGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(SkincheckGuidePage),
  ],
})
export class SkincheckGuidePageModule {}
