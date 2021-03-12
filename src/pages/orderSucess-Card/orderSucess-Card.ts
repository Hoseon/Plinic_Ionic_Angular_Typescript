import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {AuthHttp,AuthModule,JwtHelper,tokenNotExpired} from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service'
import { ImagesProvider } from '../../providers/images/images';
import { AdressPage } from '../adress/adress';
declare var cordova: any;

/**
 * Generated class for the OrderSucessCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderScuess-Card',
  templateUrl: 'orderSucess-Card.html',
})
export class OrderSucessCardPage {
  productData : any;
  userData: any;
  userData2: any;
  email: string;
  name: string;
  jwtHelper: JwtHelper = new JwtHelper();
  profileimg_url: string;
  ProductCount: number;
  ProductAmount: number;
  isCard: boolean = true;
  isTrans: boolean = false;
  totalAmount: number = 0;
  agreePay: boolean = false;
  tempAddr: boolean = false;
  addrname: any; //배송지 정보 의 이름
  phonenumber: any; //배송지 번호
  address: any; //배송지 주소1
  buildingName: any; //배송지 주소2
  zonecode: any; //배송지 우편번호
  desc: any; //배송메세지
  istempAddr: boolean = false;
  addressData: any;
  isAddressData: boolean = false;
  paymentData: any;
  paid_at: any;
  paid_at2: any;
  paid_at3: any;
  quota: any;
  payMethod: any;
  vbank_date: any;
  usePoint: any;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    public authService: AuthService,
    public images: ImagesProvider,
    
  ) {
    this.platform.ready().then(() => {
      if (this.navParams.get('userData')) { this.userData = this.navParams.get('userData') };
      if (this.navParams.get('productCount')) { this.ProductCount = this.navParams.get('productCount') };
      if (this.navParams.get('usePoint')) { this.usePoint = this.navParams.get('usePoint') };
      if (this.navParams.get('productData')) { this.productData = this.navParams.get('productData') };
      if (this.navParams.get('data')) {
        this.paymentData = this.navParams.get('data');
        console.log(this.paymentData);
        this.authService.setUserOrders(this.userData.email, this.ProductCount, this.usePoint,  this.paymentData, this.productData).subscribe(data => {
          console.log("결제 정보 저장 성공");
        })
        //결제가 완료 되면 여기서 오더 정보가 저장되도록 한다.
        
        this.unixTimStamptoKist(this.paymentData.paid_at);
        this.pay_method(this.paymentData.pay_method);
        if (this.paymentData.pay_method === 'vbank') {
          this.unixTimStamptoKistVbankDate(this.paymentData.vbank_date);
        }
        this.cardQuota(this.paymentData.card_quota);
      }
    });      
  }

  async ionViewDidLoad() {
    
  }

  ionViewDidEnter() {
    
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
          snsid: items.snsid,
          ispush: items.ispush,
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
          birthday: this.jwtHelper.decodeToken(items).birthday,
          gender: this.jwtHelper.decodeToken(items).gender,
          skincomplaint: this.jwtHelper.decodeToken(items).skincomplaint,
          email: this.jwtHelper.decodeToken(items).email,
          nickname: this.jwtHelper.decodeToken(items).name,
          ispush: this.jwtHelper.decodeToken(items).ispush,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: 'plinic',
        };
        this.authService.getUserImage(this.userData.email).subscribe(items => {
          if (items) {
            this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
            this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
          }
          // (this.userData.ispush) ? this.push_check = true : this.push_check = false;
        });
      }


    });
  }


  addComma(data_value) {
    //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString("en");
  }

  toStringKoreaWon(data) {
    //숫자 세자리 마다 컴마 붙히기
    return data + "원";
  }

  goToShop() {
    this.navCtrl.parent.select(2);
  }

  unixTimStamptoKist(t) {
    var date = new Date(t * 1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();

    console.log(year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2));
    this.paid_at =  year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
    this.paid_at3 =  year + "." + month.substr(-2) + "." + day.substr(-2)
    this.paid_at2 =  year + "년 " + month.substr(-2) + "월 " + day.substr(-2) + "일";
  }
  unixTimStamptoKistVbankDate(t) {
    var date = new Date(t * 1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();

    this.vbank_date = year + "년 " + month.substr(-2) + "월" + day.substr(-2) + "일 " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
  }

  cardQuota(quota) {
    if (quota === 0) {
      this.quota = '일시불';
    } else {
      this.quota = String(quota) + '개월';
    }
  }

  pay_method(method) {
    if (method === 'card') {
      this.payMethod =  '신용카드';
    } else if (method === 'vbank') {
      this.payMethod =  '무통장입금';      
    }
  }

}
