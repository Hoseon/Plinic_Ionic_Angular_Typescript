import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, Loading } from 'ionic-angular';
import { AuthService } from '../../../../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';



/**
 * Generated class for the QnaWritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qna-write',
  templateUrl: 'qna-write.html',
})
export class QnaWritePage {

  loading: Loading;
  registerQna = { qna_select: '', qna_input : ''};
  qna_input: any;
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();


  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController, private auth: AuthService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QnaWritePage');
  }

  ionViewWillEnter() {
    this.loadItems();
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        // tabs[ key ].style.transform = 'translateY(56px)';
        tabs[key].style.display = 'none';
      });
    } // end if
  }

  public loadItems() {
    this.auth.getUserStorage().then(items => {

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
        };
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
        };
        // console.log(this.userData);
      }
    });
  }

  qna_submit() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "문의하기",
      message: "문의하기 내용을 전송하시겠습니까? <br> 관리자에게 답변을 받을 수 있습니다.",
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
            this.auth.qnaSave(this.userData.email, this.registerQna).subscribe(data => {
              if(data !== ""){
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert',
                  title: '문의하기',
                  message: "문의하기가 정상적으로 등록 되었습니다. <br>관리자에게 답변을 받을 수 있습니다.",
                  buttons: [
                    {
                      text: '확인',
                      handler: () => {
                        this.navCtrl.pop();
                      }
                    }
                  ]
                });
                alert2.present();
              }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            }, error => {
              this.showError(JSON.parse(error._body).msg);
            });
          }
        }]
    });
    alert.present();

    console.log(this.userData.email);
    console.log(this.userData.email);
    console.log(this.registerQna.qna_input);
    console.log(this.registerQna.qna_select);
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

}
