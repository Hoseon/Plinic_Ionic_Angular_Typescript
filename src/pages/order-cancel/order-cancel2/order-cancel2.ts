import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { OrderCancel3Page } from '../order-cancel3/order-cancel3';

/**
 * Generated class for the OrderCancel2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-cancel2',
  templateUrl: 'order-cancel2.html',
})
export class OrderCancel2Page {

  agree1: boolean = false;
  agree2: boolean = false;
  agree3: boolean = false;
  agree4: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillCancel2Page');
  }

  updateagree() {
    // console.log('agree new state:' + this.agree);
    // console.log('agree new state:' + this.agree1);
    // console.log('agree new state:' + this.agree2);
    }

  bill3() {
    this.navCtrl.push(OrderCancel3Page).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("멤버십 해지 신청 페이지 닫힘");
      });
    });
  }



}
