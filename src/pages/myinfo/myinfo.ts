import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
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
  birthday : string;
  email : string;
  gender: string;
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
  push_check:boolean;
  backend: any;
  registerToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  blu_connect : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
    private alertCtrl: AlertController, private platform: Platform, private fcm: FCM, public bluetoothle: BluetoothLE) {


     this.platform.ready().then(() => {
       this.loadItems();
       this.loadNotice();
    });
  }

  ionViewDidEnter(){
    this.blu_connect = this.authService.bluetooth_connect();
    console.log('blu_connect=====================' + this.authService.bluetooth_connect());
  }

  public Reregiter(){
    this.navCtrl.push(ReRegisterPage, {
      birthday : this.userData.birthday,
        email : this.userData.email,
        gender : this.userData.gender,
        nickname : this.userData.nickname
    });
  }


  getToken(){
  this.fcm.getToken().then(token => {
    this.backend.registerToken(token);
  });
}

  public push_change(){
    if(this.push_check){
        this.getToken();
        console.log("켜진 상태");
    }
    else{
      console.log("꺼진 상태");
      let alert = this.alertCtrl.create({
          cssClass:'push_alert_cancel',
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
            text : '확인',
            handler: () => {
              console.log('확인');
            }
         }]
      });
      alert.present();
      this.backend.registerToken('');
    }
 }

  public blue_disconnect(){
    this.navCtrl.push(BluetoothConnectIngPage);
  }

  public blue_connect(){
    this.navCtrl.push(BluetoothDisconnectPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyinfoPage');
  }

  public logout(){
    //this.authService.logout();
    this.authService.kakao_authlogout();
  }

  public plinic_manual(){
    this.navCtrl.push(PlinicManualPage);
  }

  public plinic_qna(){
    this.navCtrl.push(QnaPage);
  }

  public terms(){
    this.navCtrl.push(TermsPage);
  }

  public personalinfo(){
    this.navCtrl.push(PersonalinfoPage);
  }
  public noti(){
    this.navCtrl.push(NoticePage);
  }

  public loadItems(){
    this.authService.getUserStorage().then(items => {

      this.userData = items;

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
      };
      // this.accessToken = items.accessToken
      // this.id = items.id
      // this.age_range = items.age_range
      // this.birthday = items.birthday
      // this.email = items.email
      // this.gender = items.gender
      // this.nickname = items.nickname
      // this.profile_image = items.profile_image
      // this.thumbnail_image =  items.thumbnail_image
      console.log(this.userData);
    });
  }

  public loadNotice(){
    this.authService.getNotice().subscribe(items => {
      this.noticeData = items;
    })
  }

  showAlert(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
