import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCard } from './user-card';

@NgModule({
  declarations: [
    UserCard,
  ],
  imports: [
    IonicPageModule.forChild(UserCard),
  ],
  exports: [
    UserCard
  ]
})
export class UserCardModule {}
