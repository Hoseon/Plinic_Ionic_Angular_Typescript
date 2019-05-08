import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing';

/**
 * Generated class for the SkinMeasureStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-measure-start',
  templateUrl: 'skin-measure-start.html',
})
export class SkinMeasureStartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SkinMeasureStartPage');
  }

dismiss() {
  this.viewCtrl.dismiss();
}

  public measureStart(){
    this.navCtrl.push(DeviceConnectIngPage);
  }


}
