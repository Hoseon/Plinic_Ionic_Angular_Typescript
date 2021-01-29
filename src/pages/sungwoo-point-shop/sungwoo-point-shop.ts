import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the SungwooPointShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-point-shop',
  templateUrl: 'sungwoo-point-shop.html',
})
export class SungwooPointShopPage {

  cucumber: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform
    
    ) {

      this.platform.ready().then(() => {});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooPointShopPage');
  }

  updateCucumber() {
     console.log('Cucumbers new state:' + this.cucumber);
  }

}
