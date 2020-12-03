import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailBuyPage } from './product-detail-buy';

@NgModule({
  declarations: [
    ProductDetailBuyPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailBuyPage),
  ],
})
export class ProductDetailBuyPageModule {}
