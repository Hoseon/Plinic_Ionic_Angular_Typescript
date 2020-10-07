import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MembershipListPage } from '../membership-list/membership-list'
import { BillCancel1Page } from '../bill-cancel1/bill-cancel1';
 
/**
 * Generated class for the MembershipManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membership-manage',
  templateUrl: 'membership-manage.html',
})
export class MembershipManagePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform : Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipManagePage');
  }

  list() {
    this.navCtrl.push(MembershipListPage).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("멤버십 내역 페이지 닫힘");
      });
    });
  }

  billCancel() {
    this.navCtrl.push(BillCancel1Page).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("멤버십 해지 신청 페이지 닫힘");
      });
    });
  }

}
