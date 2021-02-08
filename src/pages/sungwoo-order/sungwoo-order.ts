import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {AuthHttp,AuthModule,JwtHelper,tokenNotExpired} from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service'
declare var cordova: any;

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

  onClickBillPayment() {
    var userCode = 'imp24449006';                       // 가맹점 식별코드
    // --------------------------------- 정기결제 연동
    var data = {
      pg: 'html5_inicis.INIBillTst',                           // PG사 정기결제
      pay_method: 'card',      
      name: '아임포트 코르도바 테스트',                   // 주문명
      merchant_uid: 'mid_' + new Date().getTime(),  // 주문번호
      customer_uid: this.userData.email,                              // 결제금액
      amount: '0',                              // 결제금액
      buyer_name: '홍길동',                           // 구매자 이름
      buyer_tel: '01012341234',                     // 구매자 연락처
      buyer_email: 'example@example.com',           // 구매자 이메일
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181",
      app_scheme: 'plinic',                        // 앱 URL 스킴
      m_redirect_url : 'https://plinic.cafe24app.com/billings'
    };

    var titleOptions = {
      text: '플리닉 정기결제 테스트2',                   // 타이틀
      textColor: '#ffffff',                         // 타이틀 색
      textSize: '20',                               // 타이틀 크기
      textAlignment: 'left',                        // 타이틀 정렬 유형
      backgroundColor: '#344e81',                   // 타이틀 배경색
      show: true,                                   // 타이틀 유무
      leftButtonType: 'back',                       // 왼쪽 버튼 유형
      leftButtonColor: '#ffffff',                   // 왼쪽 버튼 색
      rightButtonType: 'close',                     // 오른쪽 버튼 유형
      rightButtonColor: '#ffffff',                  // 오른쪽 버튼 색
    };
  
    var params = {
      userCode: userCode,                // 타이틀 옵션
      data: data,                          // 가맹점 식별코드
      titleOptions: titleOptions,                                    // 결제 데이터
      callback: this.callback,                           // 콜백 함수
    }
    cordova.plugins.IamportCordova.payment(params);
      
      // , (res)=>{
      // if(res.success) {
      //   console.log("결제가 정상적으로 이루어짐-----------------------" + JSON.stringify(res));  
      //   // jQuery.ajax({
      //   //   url: "https://www.myservice.com/billings/", // 서비스 웹서버
      //   //   method: "POST",
      //   //   headers: { "Content-Type": "application/json" },
      //   //   data: {
      //   //     customer_uid: "gildong_0001_1234", // 카드(빌링키)와 1:1로 대응하는 값
      //   //   }
      //   // });
      // }}


    // var titleOptions = {
    //   text: '아임포트 코르도바 테스트',                   // 타이틀
    //   textColor: '#ffffff',                         // 타이틀 색
    //   textSize: '20',                               // 타이틀 크기
    //   textAlignment: 'left',                        // 타이틀 정렬 유형
    //   backgroundColor: '#344e81',                   // 타이틀 배경색
    //   show: true,                                   // 타이틀 유무
    //   leftButtonType: 'back',                       // 왼쪽 버튼 유형
    //   leftButtonColor: '#ffffff',                   // 왼쪽 버튼 색
    //   rightButtonType: 'close',                     // 오른쪽 버튼 유형
    //   rightButtonColor: '#ffffff',                  // 오른쪽 버튼 색
    // };
  }

  callback(response) {
    console.log("결제 결과 : " + JSON.stringify(response));

    // if(response.imp_success === "true") {
    //   console.log("빌링 결제 시작");
    //   let headers = new Headers();
    //   headers.append("Content-Type", "application/json");
      
    //     let body = {
    //       customer_uid : this.customer_uid
    //     };

    //   return this.http.post('http://plinic.cafe24app.com/' + 'api/billings', JSON.stringify(body), { headers: headers })
    //   .map(res => res.json())
    //   .map(data => {
    //     return data;
    //   });
    // }



      //빌링 키를 정상적으로 받아 왔을 때
      //{"imp_success":"true","imp_uid":"imp_946862702500","merchant_uid":"mid_1596525861875"}
      // , (res)=>{
      // if(res.success) {
      //   console.log("결제가 정상적으로 이루어짐-----------------------" + JSON.stringify(res));  
      //   // jQuery.ajax({
      //   //   url: "https://www.myservice.com/billings/", // 서비스 웹서버
      //   //   method: "POST",
      //   //   headers: { "Content-Type": "application/json" },
      //   //   data: {
      //   //     customer_uid: "gildong_0001_1234", // 카드(빌링키)와 1:1로 대응하는 값
      //   //   }
      //   // });
      // }}
    // else {
    //   //빌링 키 수신 실패
    // }
    /**
     * 결과 페이지로 이동
     * 결과는 JSON을 string화 해서 쿼리 형태로 넘김
     * {"imp_success":"true","imp_uid":"imp_946862702500","merchant_uid":"mid_1596525861875"}
    */
    // window.location.href = 'result.html?' + JSON.stringify(response);
  }


}
