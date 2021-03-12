import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { SungwooCartPage } from "../sungwoo-cart/sungwoo-cart";
import { SungwooOrderPage } from "../sungwoo-order/sungwoo-order";
import { AuthService } from "../../providers/auth-service";
import { ImagesProvider } from "../../providers/images/images";
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';

/**
 * Generated class for the SungwooPickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sungwoo-pick",
  templateUrl: "sungwoo-pick.html"
})
export class SungwooPickPage {
  cucumber: boolean;
  ProductCount: number = 1; //상품갯수
  originalAmount: number = 0;
  ProductAmount: number = 0; //실제 상품 금액
  ProductAmountString: any;
  productData: any;
  userData: any;
  thumb_image: any;
  profileimg_url: any;
  jwtHelper: JwtHelper = new JwtHelper();
  from: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private authService: AuthService,
    private images: ImagesProvider,
  ) {
    this.platform.ready().then(() => {
      this.navParams.get('productData') ? this.productData = this.navParams.get('productData') : this.productData;
      
      if (this.navParams.get('userData')) {
        this.userData = this.navParams.get('userData');
      } else {
        this.loadItems();
      }
      this.originalAmount = this.productData.Amount;
      this.ProductAmount = this.productData.Amount;
      this.ProductAmount = this.originalAmount * this.ProductCount;
      this.ProductAmountString = this.addComma(this.ProductAmount);
      this.ProductAmountString = this.toStringKoreaWon(
        this.ProductAmountString
      );
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SungwooPickPage");
  }

  //추가
  updateCucumber() {
    console.log("Cucumbers new state:" + this.cucumber);
  }

  order() {
    this.navCtrl.push(SungwooCartPage);
  }

  buy(productData, userData, ProductCount, ProductAmount) {
    this.navCtrl.push(SungwooOrderPage, {
      productData: productData,
      userData: userData,
      ProductCount: ProductCount,
      ProductAmount: ProductAmount
    });
  }

  minus() {
    console.log("마이너스");
    this.ProductCount === 0 ? this.ProductCount : this.ProductCount--;
    this.ProductAmount = this.originalAmount * this.ProductCount;
    this.ProductAmountString = this.addComma(this.ProductAmount);
    this.ProductAmountString = this.toStringKoreaWon(this.ProductAmountString);
  }

  plus() {
    console.log("Plus");
    this.ProductCount++;
    this.ProductAmount = this.originalAmount * this.ProductCount;
    this.ProductAmountString = this.addComma(this.ProductAmount);
    this.ProductAmountString = this.toStringKoreaWon(this.ProductAmountString);
  }

  addComma(data_value) {
    //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString("en");
  }

  toStringKoreaWon(data) {
    //숫자 세자리 마다 컴마 붙히기
    return data + "원";
  }


  public loadItems() {
    this.authService.getUserStorage().then((items) => {
      if (
        items.from === "kakao" ||
        items.from === "google" ||
        items.from === "naver"
      ) {
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
        };
        if (
          this.userData.thumbnail_image === "" ||
          this.userData.thumbnail_image === undefined
        ) {
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
          from: "plinic",
        };

        this.from = "plinic";
      }
    });
  }


}
