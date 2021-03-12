import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSucessCardPage } from './orderSucess-Card';

@NgModule({
  declarations: [
    OrderSucessCardPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSucessCardPage),
  ],
})
export class OrderSucessCardPageModule {}
