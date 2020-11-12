import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {AuthHttp,AuthModule,JwtHelper,tokenNotExpired} from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service'
/**
 * Generated class for the SungwooOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-order',
  templateUrl: 'sungwoo-order.html',
})
export class SungwooOrderPage {
  productData : any;
  userData: any;
  userData2: any;
  email: string;
  name: string;
  jwtHelper: JwtHelper = new JwtHelper();
  profileimg_url: string;

  // orderData = {
  //   pname: '',
  //   password: '',
  //   name: '',
  //   gender: '',
  //   country: '',
  //   birthday: '',
  //   skincomplaint: '',
  //   imagePath: '',
  //   user_jwt: 'true',
  //   pushtoken: '',
  //   phonenumber: '',
  //   snsid: '',
  //   from: '',
  //   ispush: false,
  // };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    public authService : AuthService
    
    ) {

      this.navParams.get('userData') ? this.userData2 = this.navParams.get('userData') : this.userData2;
      // if(this.navParams.get('productData')) {
      //   this.productData = this.navParams.get('productData');
      // }
      this.platform.ready().then(() => {});
      // console.log('이메일, 이름 : ' + JSON.stringify(this.productData));
      // console.log('응?' + this.productData);
  }

  async ionViewDidLoad() {
    await this.loadItems();

    console.log('ionViewDidLoad SungwooOrderPage');
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

  public createOrder() {
    this.navCtrl.push('SungwooOrderPage');
  }

  // public pname_add() {
  //   console.log('pname_add');
  //   return this.orderData.pname="";
  // }

}
