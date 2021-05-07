import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SungwooPointShopPage } from './sungwoo-point-shop';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    SungwooPointShopPage,
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(SungwooPointShopPage),
  ],
})
export class SungwooPointShopPageModule {}
