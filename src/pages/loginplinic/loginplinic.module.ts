import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginplinicPage } from './loginplinic';

@NgModule({
  declarations: [
    LoginplinicPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginplinicPage),
  ],
  exports: [
    LoginplinicPage
  ]
})
export class LoginplinicPageModule {}
