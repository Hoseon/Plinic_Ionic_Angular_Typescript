import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SungwooCartPage } from '../sungwoo-cart/sungwoo-cart';

/**
 * Generated class for the SungwooPickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-pick',
  templateUrl: 'sungwoo-pick.html',
})
export class SungwooPickPage {

  cucumber:boolean;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform
    
    ) {

      this.platform.ready().then(() => {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooPickPage');
  }

  //추가
  updateCucumber() {
    console.log('Cucumbers new state:' + this.cucumber);
  }

  buy() {
    this.navCtrl.push(SungwooCartPage);
  }

}
