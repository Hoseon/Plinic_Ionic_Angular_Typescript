import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SkinMeasureStartPage } from '../../../skin-measure-start/skin-measure-start';

/**
 * Generated class for the BluetoothConnectIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetooth-connect-ing',
  templateUrl: 'bluetooth-connect-ing.html',
})
export class BluetoothConnectIngPage {

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothConnectIngPage');
  }


  public connect_start(){
      this.nav.push(SkinMeasureStartPage);
  }
}
