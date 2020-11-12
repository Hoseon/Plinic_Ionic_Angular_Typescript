import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessHomePage } from './success-home';

@NgModule({
  declarations: [
    SuccessHomePage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessHomePage),
  ],
})
export class SuccessHomePageModule {}
