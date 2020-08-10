import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the ProductSungbunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-sungbun',
  templateUrl: 'product-sungbun.html',
})
export class ProductSungbunPage {
  productData : any;
  ingredient: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
  ) {
    if(this.navParams.get('productData')) {
      this.productData = this.navParams.get('productData');
      this.ingredient = this.productData.ingredient;
    }
    // console.log(this.productData);
    console.log(this.ingredient);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSungbunPage');
  }

}
