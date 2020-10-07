import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';

/**
 * Generated class for the PointLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point-log',
  templateUrl: 'point-log.html',
})
export class PointLogPage {
  page = "0";
  pointLogData : any;
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  pointPlusData = [];
  pointMinusData = [];

  @ViewChild(Slides) slides: Slides;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public auth: AuthService,
  ) {
  }

  async ionViewDidLoad() {

    console.log('ionViewDidLoad PointLogPage');
    await this.loadItems();
    await this.plincShopGetPointAll();
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter PointLogPage');
  }

  close() {
    this.navCtrl.pop();
  }

  selectedTab(tab) {
    this.slides.slideTo(tab);
  }

  slideChanged($event) {
    this.page = $event._snapIndex.toString();
    if (this.page !== '0' && this.page !== '1' && this.page !== '2' && this.page !== '3' && this.page !== '4') {
      setTimeout(() => {
        this.slides.slideTo(0, 0);
      }, 100)
    }
  }

  plincShopGetPointAll() {
    this.auth.plinicShopGetUserPoint().subscribe(data=> {
      this.pointLogData = data;
      for(let i=0; i < data.length; i++) {
        if(JSON.stringify(data[i].point).indexOf('-') >= 0) {
          if(data[i].name === this.userData.email ) {
            this.pointMinusData.push(data[i]);
          }
        } else {
          if(data[i].name === this.userData.email ) {
            this.pointPlusData.push(data[i]);
          }
        }
      }
    }, error=> {
      console.log("사용자 유저포인트 불러오기 에러 : " +error);
    })
  }

  public loadItems() {
    this.auth.getUserStorage().then(items => {
      if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver') {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: items.birthday,
          email: items.snsid,
          gender: items.gender,
          nickname: items.nickname,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: items.from,
          snsid: items.snsid
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          // this.thumb_image = false;
        } else {
          // this.thumb_image = true;
        }
        // this.chkmission(this.userData.email); 2020-02-10 챌린지 체크로 변경되어 주석 처리

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
          totaluserpoint: this.jwtHelper.decodeToken(items).totaluserpoint,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
        };
      }
    });
  }

  getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset()*60000).toISOString()
  }

}
