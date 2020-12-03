import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform , ModalController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { SungwooProductDetailPage } from '../sungwoo-product-detail/sungwoo-product-detail';
import { MyinfoPage } from '../myinfo/myinfo';
import { ProductDetailBuyPage } from '../product-detail-buy/product-detail-buy';

// import { SearchPage } from './search/search';

/**
 * Generated class for the SungwooCosmeticsMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-cosmetics-main',
  templateUrl: 'sungwoo-cosmetics-main.html',
})
export class SungwooCosmeticsMainPage {
  jwtHelper: JwtHelper = new JwtHelper();
  userData: any;
  thumb_image: any;
  from: any;
  profileimg_url: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    public modalCtrl: ModalController,
    public authService: AuthService,
    public alertCtrl: AlertController,
    ) {

    this.platform.ready().then(() => {});

  }

  public product_search() {
    let alert = this.alertCtrl.create({
      cssClass:'push_alert_cancel3',
      title: '해지 신청을 하시겠습니까?',
      message: '기간만료일 2020.10.14<br>기간만료 후 일주일 내 제품을 보내주세요',
      buttons: [
        {
          text: '정기결제 유지',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '해지 신청',
          handler: () => {
          }
        },
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooCosmeticsMainPage');
  }

  async ionViewWillEnter() {
    if(this.userData) {
      if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
        this.reloadUserPoint(this.userData.snsid);
      }
      else {
        this.reloadUserPoint(this.userData.email);
      }
    }
  }

  ionViewCanEnter() {
    this.loadItems();
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

  private reloadUserPoint(email) {
    this.authService.reloadUserPointfromPlincShop(email).subscribe(data =>{
      // console.log("커뮤니티 사용자 포인트 : " + data)
      this.userData.totaluserpoint = data.point;
      this.userData.totaluserpoint = this.addComma(this.userData.totaluserpoint);
    });
  }

  addComma(data_value) { //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString('en');
  }

  productDetail(product_Num) {
    let modal = this.modalCtrl.create(ProductDetailBuyPage, {Product_Num : product_Num});
      modal.present();
      modal.onDidDismiss(data => {
        //코드 작성
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



}
