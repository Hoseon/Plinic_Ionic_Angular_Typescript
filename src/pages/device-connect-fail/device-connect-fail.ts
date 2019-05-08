import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DeviceConnectFailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-connect-fail',
  templateUrl: 'device-connect-fail.html',
})
export class DeviceConnectFailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceConnectFailPage');
  }

  public measureBack(){
    this.navCtrl.pop();
  }

}