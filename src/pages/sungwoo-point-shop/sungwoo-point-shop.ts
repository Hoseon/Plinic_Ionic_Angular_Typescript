import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, Slides } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { OrderDetailPage } from '../order-detail/order-detail';
import { MyinfoPage } from '../myinfo/myinfo'
import { SungwooProductDetailPage } from '../sungwoo-product-detail/sungwoo-product-detail';
import { GuidePage } from "../guide/guide";
import { ChulsukCheckPage } from "../chulsuk-check/chulsuk-check"; //숫자 카운트 되는 애니메이션 적용
import { PointZoneGuidePage } from '../point-zone-guide/point-zone-guide';

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
  productData: any;
  cosmeticData: any;
  nextDealData: any;
  deviceData: any;
  maxPoint: any; //최대사용가능 포인트
  page: any = '0';
  @ViewChild('Slides2') slides: Slides;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authService: AuthService,
    public modalCtrl: ModalController,
    public images: ImagesProvider,
    ) {

      this.platform.ready().then(() => {});

  }

  ionViewDidLoad() {
    this.getProductData();
    this.getCosmeticData();
    this.getDeviceData();
    this.getNextDealData();
  }

  ionViewWillEnter() {
    this.tabs_check();
    this.androidBackButton();
    if(this.userData) {
      if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
        this.reloadUserPoint(this.userData.email);
      }
      else {
        this.reloadUserPoint(this.userData.email);
      }
    }
  }

  ionViewCanEnter(){
    this.loadItems();
  }

  private reloadUserPoint(email) {
    this.authService.reloadUserPointfromPlinc(email).subscribe(
      data => {
        this.userData.totaluserpoint = JSON.stringify(data.totalPoint);
        this.userData.totaluserpoint = this.addComma(this.userData.totaluserpoint);
      },
      error => {
        console.log(
          "사용자 개인포인트 불러오기 에러발생 : " + JSON.stringify(error)
        );
      }
    );

  }

  public tabs_check() {
    this.authService.getPointShoptab().then(items => {
      console.log("tabs : " + items);
      this.selectedTab(items);
      this.authService.setPointShoptab(0);
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
        this.reloadUserPoint(this.userData.email);
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
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
        this.reloadUserPoint(this.userData.email);
        this.from = 'plinic';
      }
      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }

  addComma(data_value) { //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString('en');
  }

  orderDetailPage() {
    this.navCtrl.push(OrderDetailPage, {detailData : ''}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  public myinfo() {
    //2020-05-28 마이페이지 하단탭 제거
    let myModal = this.modalCtrl.create(MyinfoPage);
    myModal.onDidDismiss(data => {
      if(this.userData) {
        if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
          this.reloadUserPoint(this.userData.email);
        }
        else {
          this.reloadUserPoint(this.userData.email);
        }
      }
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

  cosmetic(productData) {
    this.navCtrl.push(SungwooProductDetailPage, {productData: productData});
  }

  getProductData() {
    this.images.getProductData().subscribe(data => {
      setTimeout(() => {
        this.productData = data;  
      }, 300);
    },err=>{
      alert("데이터 에러 발생");
    })
  }

  getCosmeticData() {
    this.images.getPlinicProductCosmetic().subscribe(data => {
      setTimeout(() => {
        this.cosmeticData = data;
      }, 300);
    },err=>{
      alert("데이터 에러 발생");
    })
  }

  getDeviceData() { 
    this.images.getPlinicProductDevice().subscribe(data => {
      setTimeout(() => {
        this.deviceData = data;
      }, 300);
    },err=>{
      alert("데이터 에러 발생");
    })
  }
  
  onSlideDrag() {
  }

  getNextDealData() {
    this.images.getPlinicProductNextDeal().subscribe(data => {
      setTimeout(() => {
        this.nextDealData = data;
      }, 300);
    },err=>{
      alert("데이터 에러 발생");
    })
  }

  getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset() * 60000).toISOString()
  }

  slideChanged(event : Event) { 
    this.page = String(this.slides.getActiveIndex());
    if (this.slides.getActiveIndex() == 1) {
      this.slides.lockSwipeToNext(true);
    } else if (this.slides.getActiveIndex() == 0) {
      this.slides.lockSwipeToNext(false);
    }
  }

  selectedTab(tab) {
    this.slides.slideTo(Number(tab));
  }

  care() {
    let myModal = this.modalCtrl.create(GuidePage, { mode: "home" });
    myModal.onDidDismiss(data => {
      this.androidBackButton();
      if (this.userData) {
        if (
          this.userData.from === "kakao" ||
          this.userData.from === "google" ||
          this.userData.from === "naver"
        ) {
          this.reloadUserPoint(this.userData.email);
        } else {
          this.reloadUserPoint(this.userData.email);
        }
      }
    });
    myModal.present();
  }

  skin() {
    this.navCtrl.parent.select(4);
  }

  chulsuk() {
    let myModal = this.modalCtrl.create(ChulsukCheckPage);
    myModal.onDidDismiss(data => {
      if (this.userData) {
        if (
          this.userData.from === "kakao" ||
          this.userData.from === "google" ||
          this.userData.from === "naver"
        ) {
          this.reloadUserPoint(this.userData.email);
        } else {
          this.reloadUserPoint(this.userData.email);
        }
      }
      if (this.platform.is("android")) {
        this.androidBackButton();
      }
    });
    myModal.present();
  }

  getMaxPoint(point, price) {
    var maxPercent;
    var amount;
    var sale;
    (maxPercent) = point;
    sale = Number(maxPercent)/100;
    amount = price;
    this.maxPoint = Number(amount) * sale;
    this.maxPoint = this.addComma(this.maxPoint);
    return this.maxPoint;
  }

  pointZoneGuid() {
    let modal = this.modalCtrl.create(PointZoneGuidePage);
    modal.onDidDismiss(data => {
    });
    modal.present();    
  }

}
