import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityTipPage } from './communityTip';

@NgModule({
  declarations: [
    CommunityTipPage,
  ],
  imports: [
  IonicPageModule.forChild(CommunityTipPage),
  ],
})
export class CommunityTipPageModule {}
