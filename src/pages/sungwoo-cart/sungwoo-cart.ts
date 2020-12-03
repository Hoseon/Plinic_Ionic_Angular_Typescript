import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SungwooOrderPage } from '../sungwoo-order/sungwoo-order';

/**
 * Generated class for the SungwooCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-cart',
  templateUrl: 'sungwoo-cart.html',
})
export class SungwooCartPage {

  //추가
  cucumber: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform
    
    ) {

      this.platform.ready().then(() => {});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooCartPage');
  }

  //추가
  updateCucumber() {
    console.log('Cucumbers new state:' + this.cucumber);
  }

  order() {
    this.navCtrl.push(SungwooOrderPage);
  }

  

}
