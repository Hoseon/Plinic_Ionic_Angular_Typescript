import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityWritePage } from './community-write';

@NgModule({
  declarations: [
  //  CommunityWritePage,
  ],
  imports: [
    //IonicPageModule.forChild(CommunityWritePage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
   ],
})
export class CommunityWritePageModule {}
