import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ModalController, Loading, LoadingController } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
import { PlinicManualPage } from '../details/plinic-manual/plinic-manual';
import { UseGuidePage } from '../../use-guide/use-guide';
import { QnaPage } from '../details/qna/qna';
import { FaqPage } from '../details/faq/faq';
import { TermsPage } from '../details/terms/terms';
import { ReRegisterPage } from '../../re-register/re-register';
import { NoticePage } from '../details/notice/notice';
import { PersonalinfoPage } from '../details/personalinfo/personalinfo';
// import { FCM } from '@ionic-native/fcm';
// import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { BluetoothConnectIngPage } from '../details/bluetooth-connect-ing/bluetooth-connect-ing';
import { BluetoothDisconnectPage } from '../details/bluetooth-disconnect/bluetooth-disconnect';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { CareZonePage } from '../../care-zone/care-zone';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../login/login';
import { async } from 'q';
import { MembershipManagePage } from '../../bill/membership-manage/membership-manage';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  noticeData: any;
  userData: any;
  accessToken: string;
  id: string;
  age_range: string;
  birthday: string;
  email: string;
  gender: string;
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
  jwtHelper: JwtHelper = new JwtHelper();
  push_check: boolean;
  backend: any;
  registerToken: any;
  blu_connect: boolean;
  profileimg_url: any;
  imagePath: any;
  from: any;
  loading : Loading;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public authService: AuthService, 
      public storage: Storage,
      private alertCtrl: AlertController, 
      private platform: Platform,
      // private fcm: FCM,
      // public bluetoothle: BluetoothLE, 
      public modalCtrl: ModalController,
      public loadingCtrl : LoadingController
    ) {

      this.platform.ready().then(() => {
      });

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    await this.loadItems();
    await this.loadimagePath();
  }

  async ionViewDidEnter() {
    console.log('ionViewDidEnter SettingPage');
    await this.loadNotice();
    await this.getUserPush(this.userData.email);
    // this.blu_connect = this.authService.bluetooth_connect();
    // console.log('blu_connect=====================' + this.authService.bluetooth_connect());
    // this.loadItems();
    // this.loadNotice();
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        // tabs[ key ].style.transform = 'translateY(0)';
        tabs[key].style.display = 'block';
        tabs[key].style.display = '';
      });
    } // end if
  }


  ionViewWillEnter() {
    console.log('ionViewWillEnter SettingPage');
  }

public loadimagePath() {
  this.authService.getUserStorageimagePath().then(items => {
    this.imagePath = items;
  });
}



public Reregiter() {
  // this.navCtrl.push(ReRegisterPage, {
  //   birthday : this.userData.birthday,
  //     email : this.userData.email,
  //     gender : this.userData.gender,
  //     nickname : this.userData.nickname
  // });

  //20190619 ????????? ?????? ??????
  //SNS?????? ???????????? ?????? ?????? ????????? ???????????? ?????? ??????


  if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
    this.showAlert("SNS?????? ????????? ????????? <br>?????? ??? ??? ????????????.");
  } else {
    let myModal = this.modalCtrl.create(ReRegisterPage, {userData: this.userData});
    myModal.onDidDismiss(data => {
      this.imagePath = data.imagePath;
      this.authService.getUserImage(this.userData.email).subscribe(items => {
        if (items) {
          this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
          this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
        }
      });
    });
    myModal.present();
  }
}

// getToken() {
//   this.fcm.getToken().then(token => {
//     this.backend.registerToken(token);
//   });
// }

public push_change() {
  this.showLoading();
  if (this.push_check) {
    this.authService.changePush(this.userData.email, this.push_check).subscribe(data => {
      this.loading.dismiss();
      console.log("?????? ?????? ??????");
    }, error => {
      this.loading.dismiss();
      this.showAlert("?????? ?????? ?????? ?????? <br> ??????????????? ?????? ????????????");
    })
  }
  else {
    console.log("?????? ??????");
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      // title: "?????? ??????",
      message: "????????? ??????????????? ????????? ????????? ??? <br> ?????? ????????? ?????? ?????? ??? ????????????. <br> ????????? ?????????????????????????",
      buttons: [
        {
          text: '??????',
          role: 'cancel',
          handler: () => {
            console.log('??????');
          }
        },
        {
          text: '??????',
          handler: () => {
            console.log('??????');
            this.authService.changePush(this.userData.email, this.push_check).subscribe(data => {
              this.loading.dismiss();
              console.log("?????? ?????? ??? ??????");
            }, error => {
              this.loading.dismiss();
              this.showAlert("?????? ?????? ?????? ?????? <br> ??????????????? ?????? ????????????");
            })
          }
        }]
    });
    alert.present();
    // this.backend.registerToken('');
  }
}

public blue_disconnect() {
  this.navCtrl.push(BluetoothConnectIngPage);
}

public blue_connect() {
  this.navCtrl.push(BluetoothDisconnectPage);
}


public logout() {
  let alert = this.alertCtrl.create({
    cssClass: 'push_alert_cancel',
    title: "????????????",
    message: "???????????? ???????????? ???????????????????",
    buttons: [
      {
        text: '??????',
        role: 'cancel',
        handler: () => {}
      },
      {
        text: '??????',
        handler: () => {
          if (this.userData.from === 'plinic') {
            console.log("????????? ????????????")
            this.authService.logout().then(()=>{
              this.navCtrl.setRoot(LoginPage).then(()=>{
                this.navCtrl.popToRoot();
              });
            });
          } else if (this.userData.from === 'naver') {
            this.authService.naver_logout();
            this.navCtrl.setRoot(LoginPage);
            console.log("????????? ????????? ????????????");
          } else if (this.userData.from === 'google' || this.userData.from === 'kakao') {
            console.log("????????? ?????? ????????? ????????????");
            this.authService.kakao_authlogout();
            this.navCtrl.setRoot(LoginPage);
          } else {
            console.log("????????? ????????????")
            this.authService.logout().then(()=>{
              this.navCtrl.setRoot(LoginPage).then(()=>{
                this.navCtrl.popToRoot();
              });
            });
          }
        }
      }]
  });
  alert.present();
}


// public plinic_carezone(){
//   this.navCtrl.push(CareZonePage);
// }

public plinic_manual() {
  this.navCtrl.push(UseGuidePage);
}

public plinic_qna() {
  this.navCtrl.push(QnaPage);
}

public terms() {
  this.navCtrl.push(TermsPage);
}

public personalinfo() {
  this.navCtrl.push(PersonalinfoPage);
}
public noti() {
  this.navCtrl.push(NoticePage);
}

public plinic_FAQ() {
  this.navCtrl.push(FaqPage);
}

public loadItems() {
  this.authService.getUserStorage().then(items => {

    if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver') {
      this.userData = {
        accessToken: items.accessToken,
        id: items.id,
        age_range: items.age_range,
        birthday: items.birthday,
        email: items.email,
        gender: items.gender,
        nickname: items.nickname,
        profile_image: items.profile_image,
        thumbnail_image: items.thumbnail_image,
        from: items.from,
        snsid: items.snsid,
        ispush: items.ispush,
      };
      if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
        //this.thumb_image = false;
      } else {
        //this.thumb_image = true;
      }
    } else {
      this.userData = {
        accessToken: items.accessToken,
        id: items.id,
        age_range: items.age_range,
        birthday: this.jwtHelper.decodeToken(items).birthday,
        gender: this.jwtHelper.decodeToken(items).gender,
        skincomplaint: this.jwtHelper.decodeToken(items).skincomplaint,
        email: this.jwtHelper.decodeToken(items).email,
        nickname: this.jwtHelper.decodeToken(items).name,
        ispush: this.jwtHelper.decodeToken(items).ispush,
        profile_image: items.profile_image,
        thumbnail_image: items.thumbnail_image,
        from: 'plinic',
      };
      this.authService.getUserImage(this.userData.email).subscribe(items => {
        if (items) {
          this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
          this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
        }
        // (this.userData.ispush) ? this.push_check = true : this.push_check = false;
      });
    }


  });
}

public getUserPush(email) {
  this.showLoading();
  this.authService.getUserPush(email).subscribe(data => {
    this.loading.dismiss();
    console.log('???????????? ????????? ' + data);
    this.push_check = data;
  }, error => {
    this.loading.dismiss();
    console.log("?????? ?????? ?????? ?????? ??????");
  })

}



public loadNotice() {
  this.authService.getNotice().subscribe(items => {
    this.noticeData = items;
  })
}

showAlert(text) {
  //this.loading.dismiss();

  let alert = this.alertCtrl.create({
    cssClass: 'push_alert',
    title: 'Plinic',
    message: text,
    buttons: ['OK']
  });
  alert.present();
}

showLoading() {
  this.loading = this.loadingCtrl.create({
    content: '???????????? ????????????????????????'
  });
  this.loading.present();
}

bill() {
  this.navCtrl.push(MembershipManagePage).then(() => {
    this.navCtrl.getActive().onDidDismiss(data => {
      console.log("????????? ?????? ????????? ??????");
    });
  });
}



}
