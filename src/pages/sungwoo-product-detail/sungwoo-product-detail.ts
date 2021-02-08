import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SungwooPickPage } from '../sungwoo-pick/sungwoo-pick';
 
/**
 * Generated class for the SungwooProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-product-detail',
  templateUrl: 'sungwoo-product-detail.html',
})
export class SungwooProductDetailPage {

  cucumber:boolean;
  isShowMore: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform
    ) {

      this.platform.ready().then(() => {});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooProductDetailPage');
  }

  showMore(isTrue) {
     isTrue ? this.isShowMore = true : this.isShowMore = false;
  }

  updateCucumber() {
    console.log('Cucumbers new state:' + this.cucumber);
  }

  next() {
    this.navCtrl.push(SungwooPickPage);
  }

}
