import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { ItemSearchPage } from '../item-search/item-search'
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture'
import { SkinChekConnectPage } from '../skin-chek-connect/skin-chek-connect'
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
  diagnose_score: number = 2;
  diagnose_score2: number = 2;
  diagnose_score3: number = 2;
  diagnose_score4: number = 2;
  all_score: number = 0;
  isDisabledRange1 : boolean = true;
  isDisabledRange2 : boolean = true;
  isDisabledRange3 : boolean = true;
  isNext: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public auth: AuthService,
    public images: ImagesProvider,
  ) {
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
    this.navCtrl.push(SkinChekConnectPage).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("설문 페이지 닫힘");
      });
    });
  }

  public range_change(range) {
    if (this.diagnose_score === 1) {
      this.all_score = this.all_score - 1;
    }
    if (this.diagnose_score === 2) {
      this.all_score = this.all_score + 0;
    }
    if (this.diagnose_score === 3) {
      this.all_score = this.all_score + 1;
    }
    // console.log("first_range" + range.value);
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
