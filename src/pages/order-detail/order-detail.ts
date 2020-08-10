import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {AuthHttp,AuthModule,JwtHelper,tokenNotExpired} from 'angular2-jwt';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  detailOrderData: any;
  all: boolean = true;
  weekly: boolean = false;
  monthly: boolean = false;
  threemonthly: boolean = false;
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  thumb_image: any;
  chkUserImage: any;
  profileimg_url: any;
  today: Date = new Date();
  yearAgo: Date = new Date();
  weekAgo: Date = new Date();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public auth: AuthService,
  ) {
    if(this.navParams.get('detailData')) {
      this.detailOrderData = this.navParams.get('detailData');
      this.yearAgo.setMonth(this.yearAgo.getMonth()-12);
    }
  }

  async ionViewDidLoad() {
    await this.loadItems();
    console.log('ionViewDidLoad OrderDetailPage');
  }

  ionViewDidEnter(){
   console.log("ionViewDidEnter");
  }

  public loadItems() {
    this.auth.getUserStorage().then(items => {
      // console.log("토큰 값을 가져 왔는가?" + JSON.stringify(items));
      if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver' || items.from === 'apple') {
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
          pushtoken: items.pushtoken,
          from: items.from,
          snsid: items.snsid,
          totaluseitme: items.totalusetime,
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
        } else {
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
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          pushtoken: this.jwtHelper.decodeToken(items).pushtoken,
          from: 'plinic',
          totaluseitme: items.totalusetime
        };

        if (this.userData) {
          this.auth.getUserImage(this.userData.email).subscribe(items => {
            if (items) {
              this.thumb_image = items
              this.chkUserImage = true;
              this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
              this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
            }
          });
        }
      }
    });



  }

  All() {
    this.all = true;
    this.weekly=false;
    this.monthly=false;
    this.threemonthly=false;
    this.auth.getOrderList(this.userData.email, 'All').subscribe(data => {
      this.detailOrderData = data;
      this.yearAgo = new Date();
      this.yearAgo.setMonth(this.yearAgo.getMonth()-12);
    }, error => {
      console.log("데이터 전체 불러오기 에러" + error);
    });

  }

  weeklyy() {
    this.all = false;
    this.weekly=true;
    this.monthly=false;
    this.threemonthly=false;
    this.auth.getOrderList(this.userData.email, 'Weekly').subscribe(data => {
      this.detailOrderData = data;
      this.yearAgo = new Date();
      this.yearAgo.setDate(this.yearAgo.getDate()-7); //일주일전

    }, error => {
      console.log("데이터 1주일 불러오기 에러" + error);
    });
  }

  monthy(){
    this.all = false;
    this.weekly=false;
    this.monthly=true;
    this.threemonthly=false;
    this.auth.getOrderList(this.userData.email, 'Monthy').subscribe(data => {
      this.detailOrderData = data;
      this.yearAgo = new Date();
      this.yearAgo.setMonth(this.yearAgo.getMonth()-1); //한달전
    }, error => {
      console.log("데이터 1달 불러오기 에러" + error);      
    });
  }

  threeMonthy() {
    this.all = false;
    this.weekly=false;
    this.monthly=false;
    this.threemonthly=true;
    this.auth.getOrderList(this.userData.email, 'ThreeMonthy').subscribe(data => {
      this.detailOrderData = data;
      this.yearAgo = new Date();
      this.yearAgo.setMonth(this.yearAgo.getMonth()-3); //한달전
    }, error => {
      console.log("데이터 3달 불러오기 에러" + error);      
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  dateConvert(date) {
    var month = '';
    var day = '';

    month = date.substr(5,2);
    day = date.substr(8,2);

    return month + '월' + day + '일';
  }

  logRatingChange(rating){
    console.log("changed rating: ",rating);
    // do your stuff
  }



}
