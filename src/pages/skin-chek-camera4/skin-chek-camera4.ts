import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform, AlertController, ModalController, ViewController, IonicApp } from "ionic-angular";
import { SkinChekCamera5Page } from '../skin-chek-camera5/skin-chek-camera5';
import { CameraGuidePage } from '../camera-guide/camera-guide';

/**
 * Generated class for the SkinChekCamera4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-skin-chek-camera4",
  templateUrl: "skin-chek-camera4.html",
})
export class SkinChekCamera4Page {
  file1: any;
  file2: any;
  isSubLoading = true;
  button1: boolean = true;
  button2: boolean = false;
  userData: any;
  diagnose_score: any;
  ageRange: any;
  step: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public ionicApp: IonicApp,
  ) {
    if (this.navParams.get("file1")) {
      this.file1 = this.navParams.get("file1");
    }

    if (this.navParams.get("file2")) {
      this.file2 = this.navParams.get("file2");
    }

    if (this.navParams.get("userData")) {
      this.userData = this.navParams.get("userData");
    }

    if (this.navParams.get("diagnose_score")) {
      this.diagnose_score = this.navParams.get("diagnose_score");
    }

    if (this.navParams.get("ageRange")) {
      this.ageRange = this.navParams.get("ageRange");
    }

    if (this.navParams.get("step")) {
      this.step = this.navParams.get("step");
    }

    console.log("file1의 경로 : " + this.file1);
    console.log("file2의 경로 : " + this.file2);
    console.log("userData 경로 : " + this.userData);
    console.log("diagnose_score 경로 : " + this.diagnose_score);
    console.log("ageRange 경로 : " + this.ageRange);
    console.log("step 경로 : " + this.step);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SkinChekCamera4Page");
  }

  toggle_Btn(btn) {
    if(btn === 'btn1') {
      this.button1 = true;
      this.button2 = false;
    } else if (btn === 'btn2') {
      this.button1 = false;
      this.button2 = true;
    }
  }

  cancel() {
    let alert2 = this.alertCtrl.create({
      cssClass: 'push_alert_cancel2',
      title: '처음으로 돌아가시겠습니까',
      message: "연결 전 상태로 돌아가게 됩니다",
      // enableBackdropDismiss: true,
      buttons: [{
        text: '취소',
        role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '확인',  
          handler: () => {
            console.log("확인버튼 클릭");
            this.navCtrl.setRoot(CameraGuidePage);
          }
        }]
    });
    // alert2.onDidDismiss(()=>{});
    alert2.present();
  }

  next() {
    if(this.file1 && this.file2 && this.userData && this.diagnose_score) {
      this.navCtrl.push(SkinChekCamera5Page,{file1:this.file1, file2:this.file2, userData: this.userData, diagnose_score: this.diagnose_score, ageRange: this.ageRange, step: this.step}).then(() => {
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log("카메라4 페이지 닫힘");
        });
      });
    }
  }

  public dismissAllModal () {
    let activeModal = this.ionicApp._modalPortal.getActive();
    if (activeModal) {
        activeModal.dismiss().then(() => {
            this.dismissAllModal()
        });
    }
}


}
