import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, ViewController, ModalController, App  } from 'ionic-angular';
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
  selector: 'page-camera-guide',
  templateUrl: 'camera-guide.html',
})
export class CameraGuidePage {
  step: any;
  title_line1: any;
  title_line2: any;
  sub_line1: any;
  sub_line2: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public app: App,
  ) {
    if(this.navParams.get('step')) {
      this.step = this.navParams.get('step')
    }
    if(this.step === 'first') {
      this.title_line1 = "서비스 이용을 위해";
      this.title_line2 = "최초 피부를 측정해볼까요?";
      this.sub_line1 = "정확한 피부리포트를 제공 받으시려면";
      this.sub_line2 = "설명을 잘 보시고 측정해주세요.";
    } else {
      this.title_line1 = "데일리 피부 측정을";
      this.title_line2 = "시작해볼까요?";
      this.sub_line1 = "정확한 피부리포트를 제공 받으시려면";
      this.sub_line2 = "설명을 잘 보시고 측정해주세요.";
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
    console.log("111");
    // this.navCtrl.parent.select(4);
    // this.app.getRootNav().dismiss();
    this.app.navPop()
  }

  start() {
    if(this.step ==='first') { 
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
