import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceConnectFailPage');
  }

  public deviceReConnect(){
    this.navCtrl.push(DeviceConnectIngPage);
  }

  public measureBack(){
    this.navCtrl.setRoot(HomePage);
  }

}
