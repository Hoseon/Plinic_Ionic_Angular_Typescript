import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SungwooProductDetailPage } from './sungwoo-product-detail';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    SungwooProductDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SungwooProductDetailPage),
    StarRatingModule,
  ],
})
export class SungwooProductDetailPageModule {}
