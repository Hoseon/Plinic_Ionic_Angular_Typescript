import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { OrderDetailPage } from '../order-detail/order-detail';
import { MyinfoPage } from '../myinfo/myinfo'
import { SungwooProductDetailPage } from '../sungwoo-product-detail/sungwoo-product-detail';

/**
 * Generated class for the SungwooPointShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-point-shop',
  templateUrl: 'sungwoo-point-shop.html',
})
export class SungwooPointShopPage {
  jwtHelper: JwtHelper = new JwtHelper();
  cucumber: boolean;
  userData: any;
  thumb_image: any;
  profileimg_url: any;
  from: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public authService: AuthService,
    public modalCtrl: ModalController,
    ) {

      this.platform.ready().then(() => {});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooPointShopPage');
  }

  ionViewWillEnter(){
    if(this.userData) {
      if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
        this.reloadUserPoint(this.userData.snsid);
      }
      else {
        this.reloadUserPoint(this.userData.email);
      }
    }
  }

  ionViewCanEnter(){
    this.loadItems();
  }

  updateCucumber() {
     console.log('Cucumbers new state:' + this.cucumber);
  }

  private reloadUserPoint(email) {
    this.authService.reloadUserPointfromPlincShop(email).subscribe(data =>{
      // console.log("커뮤니티 사용자 포인트 : " + data)
      this.userData.totaluserpoint = data.point;
      this.userData.totaluserpoint = this.addComma(this.userData.totaluserpoint);
    });
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
          snsid: items.snsid
        };
        this.reloadUserPoint(this.userData.snsid);
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
        }
        // this.chkmission(this.userData.email);
        // this.chkIngmission(this.userData.email);
      } else {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: items.birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: items.gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          // totaluserpoint: this.jwtHelper.decodeToken(items).totaluserpoint,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: 'plinic',
        };
        this.reloadUserPoint(this.userData.email);
        // this.chkmission(this.userData.email);
        // this.chkIngmission(this.userData.email);
        this.from = 'plinic';
      }
      // console.log("사용자 포인트는? : " + this.userData.totaluserpoint);
      
      // console.log("사용자 포인트는? : " + this.userData.totaluserpoint);
      // console.log("사용자 이메일은? : " + this.userData.email);
      

      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }

  addComma(data_value) { //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString('en');
  }

  // public community_search() {
  //   let myModal = this.modalCtrl.create(SearchPage);
  //   myModal.onDidDismiss(data => {

  //   });
  //   myModal.present();
  // }

  orderDetailPage() {
    this.navCtrl.push(OrderDetailPage, {detailData : ''}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("배송 조회 페이지 닫힘");
      });
    });
  }

  public myinfo() {
    //2020-05-28 마이페이지 하단탭 제거
    // this.nav.push(MyinfoPage); 

    let myModal = this.modalCtrl.create(MyinfoPage);
    myModal.onDidDismiss(data => {
      if(this.userData) {
        if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
          this.reloadUserPoint(this.userData.snsid);
        }
        else {
          this.reloadUserPoint(this.userData.email);
        }
      }
      console.log("내정보 페이지 닫음");
      this.androidBackButton();

    });
    myModal.present();
  }

    //20201125 안드로이드 백 버튼 처리
    androidBackButton() {
      if(this.platform.is('android')) {
        this.platform.registerBackButtonAction(()=>{
          this.navCtrl.parent.select(0);
        });
      }
    }
  
    cosmetic() {
      this.navCtrl.push(SungwooProductDetailPage);
    }
  

}
