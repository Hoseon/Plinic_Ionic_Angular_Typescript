import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { SungwooOrderPage } from '../sungwoo-order/sungwoo-order';
import { SungwooCartPage } from '../sungwoo-cart/sungwoo-cart';
import { SungwooPickPage } from '../sungwoo-pick/sungwoo-pick';
import { SungwooProductDetailPage } from '../sungwoo-product-detail/sungwoo-product-detail';
import { SungwooDeliveryPage } from '../sungwoo-delivery/sungwoo-delivery';
import { SungwooBeautyPage } from '../sungwoo-beauty/sungwoo-beauty';
import { SungwooCosmeticsMainPage } from '../sungwoo-cosmetics-main/sungwoo-cosmetics-main';
import { SungwooCosmeticsTabPage } from '../sungwoo-cosmetics-tab/sungwoo-cosmetics-tab';
import { SungwooPointShopPage } from '../sungwoo-point-shop/sungwoo-point-shop';

/**
 * Generated class for the SungwooSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-setting',
  templateUrl: 'sungwoo-setting.html',
})
export class SungwooSettingPage {

  userData: any;

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
    console.log('ionViewDidLoad SungwooSettingPage');
  }

  sungWoo_Order() {
    this.navCtrl.push(SungwooOrderPage);
    console.log("성우 주문 페이지")
  }

  sungWoo_Cart() {
    this.navCtrl.push(SungwooCartPage);
    console.log("성우 장바구니 페이지")
  }

  sungWoo_Pick() {
    this.navCtrl.push(SungwooPickPage);
    console.log("성우 상품선택 페이지")
  }

  sungWoo_Product_Detail() {
    this.navCtrl.push(SungwooProductDetailPage);
    console.log("성우 상품정보 페이지")
  }

  sungWoo_Delivery() {
    this.navCtrl.push(SungwooDeliveryPage);
    console.log("성우 배송조회 페이지")
  }
  
  sungWoo_Beauty() {
    this.navCtrl.push(SungwooBeautyPage);
    console.log("성우 뷰티영상 페이지")
  }

  sungWoo_Cosmetics_Main() {
    this.navCtrl.push(SungwooCosmeticsMainPage);
    console.log("성우 화장품메인 페이지")
  }

  sungWoo_Cosmetics_tab() {
    this.navCtrl.push(SungwooCosmeticsTabPage);
    console.log("성우 화장품모아보기 페이지")
  }

  sungWoo_Point_Shop() {
    this.navCtrl.push(SungwooPointShopPage);
  }

  //추가
  updateCucumber() {
    console.log('Cucumbers new state:' + this.cucumber);
  }

}
