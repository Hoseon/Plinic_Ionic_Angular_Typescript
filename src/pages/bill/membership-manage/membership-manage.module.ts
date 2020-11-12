import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipManagePage } from './membership-manage';

@NgModule({
  declarations: [
    MembershipManagePage,
  ],
  imports: [
    IonicPageModule.forChild(MembershipManagePage),
  ],
})
export class MembershipManagePageModule {}
