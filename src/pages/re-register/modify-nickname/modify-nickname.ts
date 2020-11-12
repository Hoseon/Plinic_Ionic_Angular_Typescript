import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, ViewController, AlertController } from 'ionic-angular';
import { ReRegisterPage } from '../../re-register/re-register';
import { AuthService } from '../../../providers/auth-service';

/**
 * Generated class for the ModifyNicknamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-nickname',
  templateUrl: 'modify-nickname.html',
})
export class ModifyNicknamePage {

  nickname: string;
  userData: any;

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, private events: Events, public viewCtrl: ViewController, private auth: AuthService, public alertCtrl: AlertController) {
    this.platform.ready().then(() => {
      if (this.navParams.get('userData')) {
        this.userData = this.navParams.get('userData');
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyNicknamePage');
  }


  public navpop() {
    this.nav.popTo(ReRegisterPage);
  }

  public nickname_valid() {
    this.auth.updateUserNickname(this.userData.email, this.nickname).subscribe(data => {
      if (data !== "") {
        this.showAlert("닉네임 저장", "닉네임 저장이 완료 되었습니다. <br> 닉네임 변경은 재 로그인 하면 변경됩니다.");

      }
    }, error => {
      this.showError("[오류] 닉네임 저장 실패 <br> 재 로그인 후 다시 시도해주세요.")
    })


    // this.nav.pop().then(() => {
    // // Trigger custom event and pass data to be send back
    // //  this.viewCtrl.dismiss();
    // this.events.publish('custom-user-events', this.nickname);
    // });
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: message,
      buttons: [
        {
          text: '확인',
          handler: () => {
            this.navpop();
            // this.setUserData();
          }
        }
      ]
    });
    alert.present();
  }


  showError(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }


  public setUserData() {
    this.userData = {
      accessToken: this.userData.accessToken,
      id: this.userData.id,
      age_range: this.userData.age_range,
      birthday: this.userData.birthday,
      email: this.userData.email,
      gender: this.userData.gender,
      nickname: this.nickname,
      profile_image: this.userData.profile_image,
      thumbnail_image: this.userData.thumbnail_image,
      from: 'plinic'
    };
    this.auth.setUserStorage(this.userData);
  }
}
