import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, ViewController, ModalController  } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing'
import { SkinChekPage } from '../skin-chek/skin-chek';
import { SkincheckGuidePage } from '../skincheck-guide/skincheck-guide';
import { SkinChekMunjinPage } from '../skin-chek-munjin/skin-chek-munjin';


/**
 * Generated class for the CameraGuidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-guide-first',
  templateUrl: 'camera-guide-first.html',
})
export class CameraGuideFirstPage {
  step: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
  ) {
    if(this.navParams.get('step')) {
      this.step = this.navParams.get('step')
    }
    console.log("현재 스텝 상태는 : "  + this.step);

}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraGuidePage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter CameraGuidePage');
  }


  public measureBack() {
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  start() {
    if(this.step ==='first_update') { 
      this.navCtrl.push(SkinChekPage, {step : this.step }).then(() => {
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log("페이지 닫힘");
        });
      });
    } else {
      this.navCtrl.push(SkinChekMunjinPage, {step : this.step }).then(() => {
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log("페이지 닫힘");
        });
      });
    }

    
  }

  //20200521 이용안내 페이지로 이동
  chartguide() {
    let modal = this.modalCtrl.create(SkincheckGuidePage);
    modal.onDidDismiss(data => {
    });
    modal.present();
  }

}
