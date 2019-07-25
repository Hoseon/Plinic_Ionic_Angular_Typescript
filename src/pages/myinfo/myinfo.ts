import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { PlinicManualPage } from './details/plinic-manual/plinic-manual';
import { QnaPage } from './details/qna/qna';
import { TermsPage } from './details/terms/terms';
import { ReRegisterPage } from '../re-register/re-register';
import { NoticePage } from './details/notice/notice';
import { PersonalinfoPage } from './details/personalinfo/personalinfo';
import { FCM } from '@ionic-native/fcm';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { BluetoothConnectIngPage } from './details/bluetooth-connect-ing/bluetooth-connect-ing';
import { BluetoothDisconnectPage } from './details/bluetooth-disconnect/bluetooth-disconnect';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { CareZonePage } from '../care-zone/care-zone';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';


/**
 * Generated class for the MyinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myinfo',
  templateUrl: 'myinfo.html',
})

export class MyinfoPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public storage: Storage,
    private alertCtrl: AlertController, private platform: Platform, private fcm: FCM, public bluetoothle: BluetoothLE, public modalCtrl: ModalController) {


    this.platform.ready().then(() => {
    });
  }

  ionViewWillEnter() {
    this.loadimagePath();
    this.loadItems();
    this.loadNotice();

  }

  public loadimagePath() {
    this.authService.getUserStorageimagePath().then(items => {
      this.imagePath = items;
    });
  }

  ionViewDidEnter() {
    this.blu_connect = this.authService.bluetooth_connect();
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

  public Reregiter() {
    // this.navCtrl.push(ReRegisterPage, {
    //   birthday : this.userData.birthday,
    //     email : this.userData.email,
    //     gender : this.userData.gender,
    //     nickname : this.userData.nickname
    // });

    //20190619 내정보 변경 작업
    //SNS계정 로그인일 경우 회원 정보가 수정되지 않게 하며


    if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
      this.showAlert("SNS계정 회원은 정보를 수정 할 수 없습니다.");
    } else {
      let myModal = this.modalCtrl.create(ReRegisterPage);
      myModal.onDidDismiss(data => {
        this.imagePath = data.imagePath;
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
    if (this.push_check) {
      // this.getToken();
      console.log("켜진 상태");
    }
    else {
      console.log("꺼진 상태");
      let alert = this.alertCtrl.create({
        cssClass: 'push_alert_cancel',
        title: "추천 알림",
        message: "알림을 해제하시면 플리닉 이벤트 및 <br> 주요 정보를 받아 보실 수 없습니다. <br> 알림을 해제하시겠습니까?",
        buttons: [
          {
            text: '취소',
            role: 'cancel',
            handler: () => {
              console.log('취소'),
                this.push_check = true;
            }
          },
          {
            text: '확인',
            handler: () => {
              console.log('확인');
            }
          }]
      });
      alert.present();
      this.backend.registerToken('');
    }
  }

  public blue_disconnect() {
    this.navCtrl.push(BluetoothConnectIngPage);
  }

  public blue_connect() {
    this.navCtrl.push(BluetoothDisconnectPage);
  }

  ionViewDidLoad() {
  }

  public logout() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "로그아웃",
      message: "플리닉을 로그아웃 하시겠습니까?",
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: '확인',
          handler: () => {
            if (this.userData.from === 'plinic') {
              this.authService.logout();
              this.navCtrl.setRoot(LoginPage);
              this.navCtrl.popToRoot();
            } else if (this.userData.from === 'naver') {
              this.authService.naver_logout();
            } else if (this.userData.from === 'google' || this.userData.from === 'kakao') {
              this.authService.kakao_authlogout();
            } else {
              this.authService.logout();
              this.navCtrl.setRoot(LoginPage);
              this.navCtrl.popToRoot();
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
    this.navCtrl.push(PlinicManualPage);
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
          birthday: items.birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: items.gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: 'plinic',
        };
      }

      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
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

  public openCareZoneTab(): void {
    // The second tab is the one with the index = 1
    //this.nav.push(TabsPage, { selectedTab: 1 });
    this.navCtrl.parent.select(1);
  }

}
