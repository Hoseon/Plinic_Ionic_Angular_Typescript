import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { SungwooCartPage } from "../sungwoo-cart/sungwoo-cart";
import { SungwooOrderPage } from "../sungwoo-order/sungwoo-order";

/**
 * Generated class for the SungwooPickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sungwoo-pick",
  templateUrl: "sungwoo-pick.html"
})
export class SungwooPickPage {
  cucumber: boolean;
  ProductCount: number = 1; //상품갯수
  originalAmount: number = 40000;
  ProductAmount: number = 40000; //실제 상품 금액
  ProductAmountString: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.ProductAmount = this.originalAmount * this.ProductCount;
      this.ProductAmountString = this.addComma(this.ProductAmount);
      this.ProductAmountString = this.toStringKoreaWon(
        this.ProductAmountString
      );
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SungwooPickPage");
  }

  //추가
  updateCucumber() {
    console.log("Cucumbers new state:" + this.cucumber);
  }

  buy() {
    this.navCtrl.push(SungwooCartPage);
  }

  order() {
    this.navCtrl.push(SungwooOrderPage);
  }

  minus() {
    console.log("마이너스");
    this.ProductCount === 0 ? this.ProductCount : this.ProductCount--;
    this.ProductAmount = this.originalAmount * this.ProductCount;
    this.ProductAmountString = this.addComma(this.ProductAmount);
    this.ProductAmountString = this.toStringKoreaWon(this.ProductAmountString);
  }

  plus() {
    console.log("Plus");
    this.ProductCount++;
    this.ProductAmount = this.originalAmount * this.ProductCount;
    this.ProductAmountString = this.addComma(this.ProductAmount);
    this.ProductAmountString = this.toStringKoreaWon(this.ProductAmountString);
  }

  addComma(data_value) {
    //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString("en");
  }

  toStringKoreaWon(data) {
    //숫자 세자리 마다 컴마 붙히기
    return data + "원";
  }

}
