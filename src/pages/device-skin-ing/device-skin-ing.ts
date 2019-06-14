import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController, IonicApp, ToastController  } from 'ionic-angular';
// import { SuccessHomePage } from '../success-home/success-home';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the DeviceSkinIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-skin-ing',
  templateUrl: 'device-skin-ing.html',
})
export class DeviceSkinIngPage {

  spintime: any = 0;
  home: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public modalCtrl: ModalController,
    public viewCtrl: ViewController, public ionicApp: IonicApp, public toastCtrl: ToastController) {

    this.platform.ready().then((readySource)=>{
      setTimeout(()=>{
        this.spintime = 1;
        this.navCtrl.setRoot(TabsPage);
        if(platform.is('android')){
         const toast = this.toastCtrl.create({
          cssClass: 'blu_toast_android',
          message: '블루투스 연결이 완료되었습니다.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      else{
        const toast = this.toastCtrl.create({
         cssClass: 'blu_toast_ios',
         message: '블루투스 연결이 완료되었습니다.',
         duration: 3000,
         position: 'bottom'
       });
       toast.present();
      }
      }, 3500);
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceSkinIngPage');
  }

  cancel(){
    this.navCtrl.pop();
  }


  cancel_home(){
    this.navCtrl.setRoot('TabsPage');
  }
}
