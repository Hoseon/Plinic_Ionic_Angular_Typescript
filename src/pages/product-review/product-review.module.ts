import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductReviewPage } from './product-review';
import { StarRatingModule } from 'ionic3-star-rating';


@NgModule({
  declarations: [
    ProductReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductReviewPage),
    StarRatingModule
  ],
})
export class ProductReviewPageModule {}
