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
  mode: any;
  carezoneData: any;
  timer: any;
  isTimer: boolean;


  constructor(
      private ble: BLE,
      public navCtrl: NavController, 
      public navParams: NavParams,
      public modalCtrl: ModalController, 
      public viewCtrl: ViewController, 
      public platform: Platform
    ) {

      this.platform.ready().then((readySource)=>{

        if (this.navParams.get('carezoneData')) {
          this.carezoneData = this.navParams.get('carezoneData');
          this.isTimer = true;
        }
  
        if (this.navParams.get('mode')) {
          this.mode = this.navParams.get('mode');
        }

        if (this.navParams.get('device')) {
          this.device = this.navParams.get('device');
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceConnectCompletePage');
  }

  ionViewDidEnter(){
  if(this.device !=='') {
      this.timer = setTimeout(() => {
        this.navCtrl.push(DeviceSkinIngPage, { device: this.device, 'carezoneData': this.carezoneData, mode: this.mode }); //20200527 중간 성공페이지 보여지도록 처리
        this.device = '';
      }, 3000);
    }
  }


  ionViewWillLeave(){
   clearTimeout(this.timer);
  }

  public deviceComplete() {
    if(this.platform.is('cordova')){
      this.viewCtrl.dismiss();
      let myModal = this.modalCtrl.create(DeviceSkinStartPage, {device : this.device});
      myModal.present();
    } else {
      // this.viewCtrl.dismiss();
      let myModal = this.modalCtrl.create(DeviceSkinStartPage);
      myModal.present();
    }



  }

  public measureBack(){
    clearTimeout(this.timer);
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
    clearTimeout(this.timer);
    this.ble.disconnect(this.device.id).then(result => {
      console.log("ble disconnect OK : " + result);
      this.navCtrl.setRoot(TabsPage);
    }, error =>{
      console.log("ble disconnect error :" + error);
    })
  }


}
