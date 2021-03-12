import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { SungwooPickPage } from "../sungwoo-pick/sungwoo-pick";
import { ProductReviewPage } from "../product-review/product-review";
import { ImagesProvider } from "../../providers/images/images";
import { AuthService } from "../../providers/auth-service";
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';

/**
 * Generated class for the SungwooProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sungwoo-product-detail",
  templateUrl: "sungwoo-product-detail.html",
})
export class SungwooProductDetailPage {
  product_num: any;
  cucumber: boolean;
  isShowMore: boolean;
  productData: any;
  productReview: any;
  avgRating: any;
  userData: any;
  thumb_image: any;
  profileimg_url: any;
  jwtHelper: JwtHelper = new JwtHelper();
  from: any;
  isLike: boolean = true;
  testData: any;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public images: ImagesProvider,
    public authService: AuthService,
  ) {
    this.platform.ready().then(() => {
      if (this.navParams.get("productData"))
        this.productData = this.navParams.get("productData");
      this.product_num = this.navParams.get("productData").product_num;
      this.getProductReview(this.product_num);
    });
  }

  async ionViewDidLoad() {
    await this.loadItems();
    
    // console.log("ionViewDidLoad SungwooProductDetailPage");
  }

  showMore(isTrue) {
    isTrue ? (this.isShowMore = true) : (this.isShowMore = false);
  }

  updateCucumber() {
    // console.log("Cucumbers new state:" + this.cucumber);
  }

  next(productData, userData) {
    console.log(productData);
    console.log(userData);
    this.navCtrl.push(SungwooPickPage, {productData : productData, userData : userData});
  }

  addComma(data_value) {
    //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString("en");
  }

  write_Review(product_num) {
    this.navCtrl
      .push(ProductReviewPage, { productData: this.productData })
      .then(() => {
        this.navCtrl.getActive().onDidDismiss((data) => {
          this.getProductReview(this.product_num);
        });
      });
  }

  getProductReview(product_num) {
    this.images.getProductReview(product_num).subscribe((data) => {
      this.productReview = data;
      this.avgRating = this.getAvgRating(this.productReview);
      // console.log("상품 리뷰 : " + JSON.stringify(this.productReview));
    });
  }

  // 이메일 마스킹 처리 2020-06-02
  emailSecurity(userEmail) {
    var id = userEmail.split("@")[0];
    var mail = userEmail.split("@")[1];
    var maskingId = function (id) {
      var splitId = id.substring(0, 2);
      for (var i = 1; i < id.length; i++) {
        splitId += "*";
      }
      return splitId;
    };
    var maskingMail = function (mail) {
      var splitMail = "";
      for (var i = 1; i < mail.length; i++) {
        splitMail += "*";
      }
      splitMail += mail.substring(mail.length - 1, mail.length);
      return splitMail;
    };
    userEmail = maskingId(id) + "@" + mail;
    return userEmail;
  }

  getCovertKoreaTime(time) {
    return new Date(
      new Date(time).getTime() - new Date().getTimezoneOffset() * 60000
    ).toISOString();
  }

  getAvgRating(rating) {
    // console.log(rating);
    var avgRating = 0;
    rating.forEach((element) => {
      avgRating = avgRating + element.rating;
    });

    avgRating = avgRating / rating.length;
    return avgRating.toFixed(1);
  }

  like(product_num, email) {
    this.images.productLike(product_num, email).subscribe(
      (result) => {
        this.productData = result[0];
        for (let i = 0; i < result[0].likeUser.length; i++) {
          // console.log(result.docs2.likeUser[i].email)
          if (result[0].likeUser[i].email === email) {
            this.isLike = false;
          } 
        }
      },
      (error) => {
        alert("처리 에러 관리자에게 문의하세요");
      }
    );
  }

  dislike(product_num, email) {
    this.images.productdisLike(product_num, email).subscribe(
      (result) => {
        this.productData = result[0];
        this.isLike = true;
        for (let i = 0; i < result[0].likeUser.length; i++) {
          if (result[0].likeUser[i].email === email) {
            this.isLike = true;
          } 
        }
      },
      (error) => {
        alert("authService처리 에러 관리자에게 문의하세요");
      }
    );
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

      if (this.productData) {
        for (let i = 0; i < this.productData.likeUser.length; i++) {
          // console.log(result.docs2.likeUser[i].email)
          this.productData.likeUser[0].email === this.userData.email ? this.isLike = false : this.isLike = true;
        }
      }
    });
  }
}
