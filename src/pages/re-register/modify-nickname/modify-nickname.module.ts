import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyNicknamePage } from './modify-nickname';

@NgModule({
  declarations: [
    ModifyNicknamePage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyNicknamePage),
  ],
})
export class ModifyNicknamePageModule {}
