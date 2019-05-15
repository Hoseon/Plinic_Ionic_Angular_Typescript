import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DeviceSkinStartPage } from '../device-skin-start/device-skin-start';
import { DeviceSkinIngPage } from '../device-skin-ing/device-skin-ing';
import {SuccessHomePage} from '../success-home/success-home';
/**
 * Generated class for the DeviceConnectCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-connect-complete',
  templateUrl: 'device-connect-complete.html',
})
export class DeviceConnectCompletePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceConnectCompletePage');
  }

  public deviceComplete() {
    // let myModal = this.modalCtrl.create(DeviceSkinStartPage);
    // myModal.present();
      this.navCtrl.push(SuccessHomePage);
  }

  public measureBack(){
    this.navCtrl.push(DeviceSkinIngPage);
  }


}
