import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the BillCancel2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-cancel2',
  templateUrl: 'bill-cancel2.html',
})
export class BillCancel2Page {

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



}
