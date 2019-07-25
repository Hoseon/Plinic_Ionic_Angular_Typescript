import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, Platform } from 'ionic-angular';
import { DeviceSkinStartPage } from '../device-skin-start/device-skin-start';
import { DeviceSkinIngPage } from '../device-skin-ing/device-skin-ing';
// import { SuccessHomePage } from '../success-home/success-home';
import { TabsPage } from '../tabs/tabs';
import { BLE } from '@ionic-native/ble';


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

  spintime: any = 0;
  device : any;
  constructor(private ble: BLE,
    public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public viewCtrl: ViewController, public platform: Platform) {

      this.platform.ready().then((readySource)=>{
        this.device = this.navParams.get('device');
        console.log("연결된 디바이스 : " + JSON.stringify(this.device));
        console.log("연결된 디바이스 ID : " + this.device.id)
        // setTimeout(()=>{
        //   this.spintime = 1;
        //   let myModal = this.modalCtrl.create(DeviceSkinStartPage);
        //   myModal.present();
        // }, 3500);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceConnectCompletePage');
  }

  public deviceComplete() {
    this.viewCtrl.dismiss();
    let myModal = this.modalCtrl.create(DeviceSkinStartPage, {device : this.device});
    myModal.present();
  }

  public measureBack(){
    // this.navCtrl.push(DeviceSkinIngPage);
    // this.navCtrl.setRoot(TabsPage);
    this.ble.disconnect(this.device.id).then(result => {
      console.log("ble disconnect OK : " + result);
      this.navCtrl.setRoot(TabsPage);
    }, error =>{
      console.log("ble disconnect error :" + error);
    })
  }

  deviceFail(){
    this.ble.disconnect(this.device.id).then(result => {
      console.log("ble disconnect OK : " + result);
      this.navCtrl.setRoot(TabsPage);
    }, error =>{
      console.log("ble disconnect error :" + error);
    })
  }


}
