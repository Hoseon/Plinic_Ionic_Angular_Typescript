import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceConnectCompletePage } from '../device-connect-complete/device-connect-complete';
import { DeviceConnectFailPage } from '../device-connect-fail/device-connect-fail';

/**
 * Generated class for the DeviceConnectIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-connect-ing',
  templateUrl: 'device-connect-ing.html',
})
export class DeviceConnectIngPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceConnectIngPage');
  }

  public measureBack(){
    this.navCtrl.pop();
  }

  public deviceComplete(){
    this.navCtrl.push(DeviceConnectCompletePage);
  }

  public deviceFail(){
    this.navCtrl.push(DeviceConnectFailPage);
  }


}
