import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BillCancel2Page } from '../bill-cancel2/bill-cancel2'

/**
 * Generated class for the BillCancel1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-cancel1',
  templateUrl: 'bill-cancel1.html',
})
export class BillCancel1Page {

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
    this.navCtrl.push(BillCancel2Page).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("멤버십 해지 신청 페이지 닫힘");
      });
    });
  }

}
