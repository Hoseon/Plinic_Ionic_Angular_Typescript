import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the BillCancel4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-cancel4',
  templateUrl: 'bill-cancel4.html',
})
export class BillCancel4Page {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillCancel4Page');
  }

}
