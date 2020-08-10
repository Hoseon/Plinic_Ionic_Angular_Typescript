import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipListPage } from './membership-list';

@NgModule({
  declarations: [
    MembershipListPage,
  ],
  imports: [
    IonicPageModule.forChild(MembershipListPage),
  ],
})
export class MembershipListPageModule {}
