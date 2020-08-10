import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyqnaPage } from './myqna';

@NgModule({
  declarations: [
    MyqnaPage,
  ],
  imports: [
    IonicPageModule.forChild(MyqnaPage),
  ],
})
export class MyqnaPageModule {}
