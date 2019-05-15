import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { DeviceConnectCompletePage } from '../device-connect-complete/device-connect-complete';
import { DeviceConnectFailPage } from '../device-connect-fail/device-connect-fail';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { SuccessHomePage} from '../success-home/success-home';
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

  spintime: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetoothle: BluetoothLE,
    public platform: Platform, private alertCtrl: AlertController
  ) {
    this.platform.ready().then((readySource) => {

      setTimeout(() => {
        this.spintime = 1;
        if (this.platform.is('cordova')) {
          this.bluetoothle.initialize().then(ble => {
            //console.log('ble', ble.status) // logs 'enabled'
            if (ble.status === "enabled") {
              this.navCtrl.push(DeviceConnectCompletePage);
            } else {
              this.navCtrl.push(DeviceConnectFailPage);
            }
          });
        }
      }, 3500);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceConnectIngPage');
  }

  public successpage(){
      this.navCtrl.push(SuccessHomePage);
  }

  public measureBack() {
    this.navCtrl.pop();
  }

  public deviceComplete() {
    this.navCtrl.push(DeviceConnectCompletePage);
  }

  public deviceFail() {
    this.navCtrl.push(DeviceConnectFailPage);
  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }


}
