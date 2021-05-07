import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderReturnPage } from './order-return';

@NgModule({
  declarations: [
    OrderReturnPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderReturnPage),
  ],
})
export class OrderReturnPageModule {}
