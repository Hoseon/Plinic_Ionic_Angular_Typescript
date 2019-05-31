import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { PlinicManualPage } from './details/plinic-manual/plinic-manual';
import { QnaPage } from './details/qna/qna';
import { TermsPage } from './details/terms/terms';
import { ReRegisterPage } from '../re-register/re-register'
import { NoticePage } from './details/notice/notice'
import { FCM } from '@ionic-native/fcm';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
    private alertCtrl: AlertController, private plt: Platform, private fcm: FCM) {
     this.plt.ready().then(() => {
       this.loadItems();
     });
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
      this.backend.registerToken('');
    }
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

  public noti(){
    this.navCtrl.push(NoticePage);
  }

  public loadItems(){
    this.authService.getUserStorage().then(items => {
      this.userData = items;
      // this.userData = {
      //   accessToken: items.accessToken,
      //   id: items.id,
      //   age_range: items.age_range,
      //   birthday: items.birthday,
      //   email: items.email,
      //   gender: items.gender,
      //   nickname: items.nickname,
      //   profile_image: items.profile_image,
      //   thumbnail_image: items.thumbnail_image,
      // };
      // this.accessToken = items.accessToken
      // this.id = items.id
      // this.age_range = items.age_range
      // this.birthday = items.birthday
      // this.email = items.email
      // this.gender = items.gender
      // this.nickname = items.nickname
      // this.profile_image = items.profile_image
      // this.thumbnail_image =  items.thumbnail_image
    });
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
