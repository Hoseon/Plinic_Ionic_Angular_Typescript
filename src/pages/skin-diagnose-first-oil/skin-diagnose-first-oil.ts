import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, AlertController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture';
import { TabsPage } from '../tabs/tabs';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';

/**
 * Generated class for the SkinDiagnoseFirstOilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-diagnose-first-oil',
  templateUrl: 'skin-diagnose-first-oil.html',
})
export class SkinDiagnoseFirstOilPage {


  diagnose_score: number = 2;
  diagnose_score2: number = 2;
  diagnose_score3: number = 2;
  diagnose_score4: number = 2;
  diagnose_score5: number = 2;

  all_oil_score: number = 0;

  score: any;
  moisture: any;
  currentDate: Date = new Date();
  notimeDate: Date = new Date();


  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();


  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, private alertCtrl: AlertController,
    public auth: AuthService, public toastCtrl: ToastController) {
    this.score = navParams.get('score');
    this.moisture = this.score.moisture;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SkinDiagnoseOilPage');
    this.loadItems();
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
      // this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      // this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }


  public range_change(range) {
    if (this.diagnose_score === 1) {
      this.all_oil_score = this.all_oil_score - 1;
    }
    if (this.diagnose_score === 2) {
      this.all_oil_score = this.all_oil_score + 0;
    }
    if (this.diagnose_score === 3) {
      this.all_oil_score = this.all_oil_score + 1;
    }
    // console.log("first_range" + range.value);
    // console.log("first_all_oil_score=============" + this.all_oil_score);
    // console.log("first_diagnose_score=============" + this.diagnose_score);
  }

  public range_change2(range) {
    if (this.diagnose_score2 === 1) {
      this.all_oil_score = this.all_oil_score - 1;
    }
    if (this.diagnose_score2 === 2) {
      this.all_oil_score = this.all_oil_score + 0;
    }
    if (this.diagnose_score2 === 3) {
      this.all_oil_score = this.all_oil_score + 1;
    }
    // console.log("first_range" + range.value);
    // console.log("first_all_oil_score=============" + this.all_oil_score);
    // console.log("first_diagnose_score2=============" + this.diagnose_score2);
  }

  public range_change3(range) {
    if (this.diagnose_score3 === 1) {
      this.all_oil_score = this.all_oil_score - 1;
    }
    if (this.diagnose_score3 === 2) {
      this.all_oil_score = this.all_oil_score + 0;
    }
    if (this.diagnose_score3 === 3) {
      this.all_oil_score = this.all_oil_score + 1;
    }
    // console.log("first_range" + range.value);
    // console.log("first_all_score=============" + this.all_oil_score);
    // console.log("first_diagnose_score3=============" + this.diagnose_score3);
  }

  public range_change4(range) {
    if (this.diagnose_score4 === 1) {
      this.all_oil_score = this.all_oil_score - 1;
    }
    if (this.diagnose_score4 === 2) {
      this.all_oil_score = this.all_oil_score + 0;
    }
    if (this.diagnose_score4 === 3) {
      this.all_oil_score = this.all_oil_score + 1;
    }
    // console.log("first_range" + range.value);
    // console.log("first_all_score=============" + this.all_oil_score);
    // console.log("first_diagnose_score4=============" + this.diagnose_score4);
  }

  public range_change5(range) {
    if (this.diagnose_score5 === 1) {
      this.all_oil_score = this.all_oil_score - 1;
    }
    if (this.diagnose_score5 === 2) {
      this.all_oil_score = this.all_oil_score + 0;
    }
    if (this.diagnose_score5 === 3) {
      this.all_oil_score = this.all_oil_score + 1;
    }
    // console.log("first_range" + range.value);
    // console.log("first_all_score=============" + this.all_oil_score);
    // console.log("first_diagnose_score5=============" + this.diagnose_score5);
  }


  public next_page() {
    //this.showAlert(this.all_score);
    if (this.all_oil_score < 0) {
      this.all_oil_score = 0;
    }

    var today = this.currentDate.getFullYear() + "-" + this.get2digits(this.currentDate.getMonth() + 1) + "-" + this.get2digits(this.currentDate.getDate());
    // console.log("오일오일오일오일오늘오늘오늘오늘오늘" + today);

    this.notimeDate = new Date(today);
    // console.log("노타임 노타임 : " + this.notimeDate)


    this.score = {
      oil: (this.all_oil_score * 20),
      moisture: this.moisture,
      saveDate: this.notimeDate,
    }
    this.auth.skinChartSave(this.userData.email, this.score).subscribe(data => {
      if (data !== '') {
        // this.auth.setUserStoragediagnose_first_oil(this.all_oil_score*20);
        this.auth.setUserStoragediagnose_first_check(true);
        if (this.platform.is('android')) {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_android',
            message: '최초 스킨차트 문진표 등록이 완료되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_ios',
            message: '최초 스킨차트 문진표 등록이 완료되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        this.navCtrl.setRoot(TabsPage);
        // console.log("데이터 등록 성공");
      } else {
        // console.log("데이터 등록 실패");
        this.navCtrl.setRoot(TabsPage);
      }
    })
    // this.auth.setUserStoragediagnose_first_oil(this.all_oil_score*20);

  }


  public dissmiss() {
    this.navCtrl.popTo(SkinDiagnoseFirstMoisturePage);
  }



  showAlert(text) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: '알림',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }


  public get2digits(num) {
    return ("0" + num).slice(-2);
  }

}
