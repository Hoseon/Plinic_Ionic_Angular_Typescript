import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DeviceSkinIngPage } from '../device-skin-ing/device-skin-ing';

/**
 * Generated class for the DeviceSkinStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-skin-start',
  templateUrl: 'device-skin-start.html',
})
export class DeviceSkinStartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceSkinStartPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  public measureStart(){
    this.navCtrl.push(DeviceSkinIngPage);
  }

}