import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the ProductMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-main',
  templateUrl: 'product-main.html',
})
export class ProductMainPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public platform: Platform,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductMainPage');
  }

}
