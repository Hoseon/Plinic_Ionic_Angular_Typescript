import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductMainPage } from './product-main';

@NgModule({
  declarations: [
    ProductMainPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductMainPage),
  ],
})
export class ProductMainPageModule {}
