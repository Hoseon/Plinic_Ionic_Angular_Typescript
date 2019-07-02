import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkinDiagnosePage } from './skin-diagnose';

@NgModule({
  declarations: [
    SkinDiagnosePage,
  ],
  imports: [
    IonicPageModule.forChild(SkinDiagnosePage),
  ],
})
export class SkinDiagnosePageModule {}
