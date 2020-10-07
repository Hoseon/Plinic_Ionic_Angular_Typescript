import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, ViewController, ModalController  } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing'
import { SkinChekPage } from '../skin-chek/skin-chek';


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
    this.navCtrl.push(SkinChekPage, {step : this.step }).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("페이지 닫힘");
      });
    });
    // let myModal = this.modalCtrl.create(SkinChekPage);
    // myModal.onDidDismiss(data => {
    //   let tabs = document.querySelectorAll('.tabbar');
    //   if (tabs !== null) {
    //     Object.keys(tabs).map((key) => {
    //       // tabs[ key ].style.transform = 'translateY(0)';
    //       tabs[key].style.display = 'block';
    //       tabs[key].style.display = '';
    //     });
    //   }
    // })
    // myModal.present();
  }

}
