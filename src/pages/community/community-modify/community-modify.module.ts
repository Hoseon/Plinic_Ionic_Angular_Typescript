import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityModifyPage } from './community-modify';

@NgModule({
  declarations: [
  CommunityModifyPage,
  ],
  imports: [
  IonicPageModule.forChild(CommunityModifyPage),
  ],
})
export class CommunityModifyPageModule {}
