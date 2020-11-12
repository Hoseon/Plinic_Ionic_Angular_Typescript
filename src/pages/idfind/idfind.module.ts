import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdfindPage } from './idfind';

@NgModule({
  declarations: [
    IdfindPage,
  ],
  imports: [
    IonicPageModule.forChild(IdfindPage),
  ],
})
export class IdfindPageModule {}
