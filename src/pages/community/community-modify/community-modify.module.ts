import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityModifyPage } from './community-modify';

@NgModule({
  declarations: [
   CommunityModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityModifyPage),
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ]
})
export class CommunityModifyPageModule {}
