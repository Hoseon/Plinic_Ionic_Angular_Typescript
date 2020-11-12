import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';

/**
 * Generated class for the ProductReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-review',
  templateUrl: 'product-review.html',
})
export class ProductReviewPage {

  product_Num: any;
  productData: any;
  ingredient: Array<any> = new Array<any>();
  preFunction: Array<any> = new Array<any>();
  function: Array<any> = new Array<any>();
  review: any =  {
    content : '',
    rating: 3,
    product_num : '',
    product_name : ''
  }
  isRegisterBtn: boolean = false;
  userData: any;
  thumb_image: any;
  jwtHelper: JwtHelper = new JwtHelper();
  from: any;
  profileimg_url: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public platform : Platform,
      private images: ImagesProvider,
      private auth: AuthService,
      public alertCtrl: AlertController
    ) {
      if(this.navParams.get('productData')){
        this.productData = this.navParams.get('productData');
        console.log(this.productData);
        this.review.product_num = this.productData.product_num;
        this.review.product_name = this.productData.product_name;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductReviewPage');
    this.loadItems();
  }

  loadProductData() {
    this.images.getProductDetail(this.product_Num).subscribe(data => {
      this.productData = data;
      if(data.ingredient != '') {
        for(let i = 0; i < data.ingredient.length; i++) {
          this.ingredient[i] = data.ingredient[i].korean_name 
        }
        // console.log(this.productData.function.length);
        this.preFunction = data.function.split(',');
        if(this.preFunction.length >= 4) {
          this.function[0] = this.preFunction[0];
          this.function[1] = this.preFunction[1];
          this.function[2] = this.preFunction[2];
        } else {
          this.function = this.preFunction;
        }
      }
      console.log("화장품 데이터 가져 온것 확인" + data);
    }, error => {
      alert("상품 데이터 가져오기 에러");
    })
  }



  logRatingChange(rating){
    console.log("changed rating: ",rating);
    this.review.rating = rating;
    // do your stuff
    console.log(this.review);
    console.log(this.review.content.length);
  }

  checkTextarea(event) {
    console.log(this.review.content.length);
    console.log(this.review.rating);
    if(this.review.content.length > 5) {
      this.isRegisterBtn = true;
    } else if(this.review.content.length < 5 ) {
      this.isRegisterBtn = false;
    }
  }

  registerReview() {
    this.auth.registerReview(this.userData.email, this.review).subscribe(data => {
      this.showAlert("리뷰가 등록되었습니다.");
    }, error => {
      this.showAlert("리뷰 등록에 실패하였습니다")
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
          email: items.email,
          gender: items.gender,
          nickname: items.nickname,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: items.from,
          snsid: items.snsid
        };
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
  
        this.from= 'plinic';
      }
      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }


  showAlert(text) {
    let alert = this.alertCtrl.create({
      cssClass:'push_alert',
      title: 'Plinic',
      message: text,
      buttons: [{
        text: '확인',
        role: 'cancel',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }



}
