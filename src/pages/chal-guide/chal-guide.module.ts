import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChalGuidePage } from './chal-guide';

@NgModule({
  declarations: [
    ChalGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(ChalGuidePage),
  ],
})
export class ChalGuidePageModule {}
