import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { SuccessHomePage } from '../success-home/success-home';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public modalCtrl: ModalController,) {

    this.platform.ready().then((readySource)=>{
      setTimeout(()=>{
        this.spintime = 1;
        let myModal = this.modalCtrl.create('TabsPage',{
          home : 'successHome'
        });
        myModal.present();
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
