import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { OrderCancel2Page } from '../order-cancel2/order-cancel2'

/**
 * Generated class for the OrderCancel1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-cancel1',
  templateUrl: 'order-cancel1.html',
})
export class OrderCancel1Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillCancel1Page');
  }

  bill2() {
    this.navCtrl.push(OrderCancel2Page).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("멤버십 해지 신청 페이지 닫힘");
      });
    });
  }

}
