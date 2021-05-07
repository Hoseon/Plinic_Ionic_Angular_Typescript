import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderChangePage } from './order-change';

@NgModule({
  declarations: [
    OrderChangePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderChangePage),
  ],
})
export class OrderChangePageModule {}
