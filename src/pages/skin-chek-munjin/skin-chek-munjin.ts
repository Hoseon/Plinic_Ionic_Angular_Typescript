import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { ItemSearchPage } from '../item-search/item-search'
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture'
import { SkinChekConnectPage } from '../skin-chek-connect/skin-chek-connect';
import { SkinChekConnect2Page } from '../skin-chek-connect2/skin-chek-connect2';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';

/**
 * Generated class for the SkinChekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-chek-munjin',
  templateUrl: 'skin-chek-munjin.html',
})
export class SkinChekMunjinPage {

  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  isLoadMain : boolean = false;
  isLoadSub : boolean = false;
  loadMainData : any;
  loadSubData : any;
  diagnose_score = {
    diagnose_score1 : 22,
    diagnose_score2 : 22,
    diagnose_score3 : 22,
  }
  diagnose_score_default1: number = 2;
  diagnose_score_default2: number = 1;
  diagnose_score_default3: number = 1;
  diagnose_score2: number = 22;
  diagnose_score3: number = 22;
  diagnose_score4: number = 22;
  all_score: number = 0;
  isDisabledRange1 : boolean = false;
  isDisabledRange2 : boolean = false;
  isDisabledRange3 : boolean = false;
  isNext: boolean = true;
  step: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public auth: AuthService,
    public images: ImagesProvider,
  ) {
    if(this.navParams.get('step')) {
      this.step = this.navParams.get('step');
    }
    console.log("현재 스텝 상태는 : "  + this.step);
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad SkinChekMunJinPage');
    await this.loadItems();
  }

  async ionViewDidEnter(){
    console.log('ionViewDidLoad SkinChekMunJinPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
          snsid: items.snsid
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
      }
    });
  }

  public next() {
    this.navCtrl.push(SkinChekConnect2Page, { step : this.step, munjin : this.diagnose_score }).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("설문 페이지 닫힘");
      });
    });
  }

  public range_change1(range) {
    if (range._value === 1) {
      this.diagnose_score.diagnose_score1 = 11;
    }
    if (range._value === 2) {
      this.diagnose_score.diagnose_score1 = 22;
    }
    if (range._value === 3) {
      this.diagnose_score.diagnose_score1 = 33;
    }
    // console.log("first_range" + range._value);
    // console.log("this.first_all_score=============" + this.all_score);
    // console.log("this.first_diagnose_score=============" + this.diagnose_score);
  }

  public range_change2(range) {
    if (range._value === 1) {
      this.diagnose_score.diagnose_score2 = 33;
    }
    if (range._value === 2) {
      this.diagnose_score.diagnose_score2 = 22;
    }
    if (range._value === 3) {
      this.diagnose_score.diagnose_score2 = 11;
    }
    // console.log("first_range" + range._value);
    // console.log("this.first_all_score=============" + this.all_score);
    // console.log("this.first_diagnose_score=============" + this.diagnose_score);
  }

  public range_change3(range) {
    if (range._value === 1) {
      this.diagnose_score.diagnose_score3 = 11;
    }
    if (range._value === 2) {
      this.diagnose_score.diagnose_score3 = 22;
    }
    if (range._value === 3) {
      this.diagnose_score.diagnose_score3 = 33;
    }
    // console.log("first_range" + range._value);
    // console.log("this.first_all_score=============" + this.all_score);
    // console.log("this.first_diagnose_score=============" + this.diagnose_score);
  }

  public enable_Range(num) {
    if(num === '1') {
    this.isDisabledRange1 = false
    } else if(num === '2') { 
      this.isDisabledRange2 = false;
    }  else if(num === '3') {
      this.isDisabledRange3 = false;
    }

    if(!this.isDisabledRange1 && !this.isDisabledRange2 && !this.isDisabledRange3) {
      console.log("모두 오케이");
      this.isNext = true;

    }
  }
}
