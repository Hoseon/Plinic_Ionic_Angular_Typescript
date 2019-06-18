import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyNumberPage } from './modify-number';

@NgModule({
  declarations: [
    ModifyNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyNumberPage),
  ],
})
export class ModifyNumberPageModule {}
