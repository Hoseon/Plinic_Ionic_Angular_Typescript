import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, TextInput, AlertController } from 'ionic-angular';
import {AuthHttp,AuthModule,JwtHelper,tokenNotExpired} from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service'
import { ImagesProvider } from '../../providers/images/images';
import { AdressPage } from '../adress/adress';
import { OrderSucessCardPage } from '../orderSucess-Card/orderSucess-Card';
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
  ProductCount: number;
  ProductAmount: number;
  isCard: boolean = true;
  isTrans: boolean = false;
  totalAmount: number = 0;
  totalAmount2: number = 0; // 포인트까지 차감된 금액
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
  usePoint: number = 0;
  usePointComma: any;
  userPointLog: any;
  userPointLogFinalCheck: any;
  maxPoint: number = 0; //최대사용가능 포인트
  maxPointComma: any;
  totalPoint: any;
  totalPointCheck: any;
  totalPointFinalCheck: any;
  @ViewChild('pointInput') pointInput: TextInput;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    public authService: AuthService,
    public images: ImagesProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
  ) {
    
      this.navParams.get('userData') ? this.userData2 = this.navParams.get('userData') : this.userData2;
      // if(this.navParams.get('productData')) {
      //   this.productData = this.navParams.get('productData');
      // }
      this.platform.ready().then(() => {
        this.navParams.get('productData') ? this.productData = this.navParams.get('productData') : this.productData;
        this.navParams.get('ProductCount') ? this.ProductCount = this.navParams.get('ProductCount') : this.ProductCount;
        this.navParams.get('ProductAmount') ? this.ProductAmount = this.navParams.get('ProductAmount') : this.ProductAmount;
        this.totalAmount = this.ProductAmount + 3000; //배송비 추가
        this.totalAmount2 = this.ProductAmount + 3000; //배송비 추가
        if (this.navParams.get('userData')) {
          this.userData = this.navParams.get('userData');
        } else {
          this.loadItems();
        }
      });      
  }

  async ionViewDidLoad() {
    this.authService.getUserStorageAddress('storageAddress').then(data => {
      if (data != null || data != undefined) {
        this.addrname = data.name;
        this.address = data.address;
        this.buildingName = data.buildingName;
        this.desc = data.desc;
        this.phonenumber = data.phonenumber;
        this.zonecode = data.zonecode;
        this.istempAddr = true; 
      }
    })
  }

  ionViewDidEnter() {
    if(this.userData && !this.tempAddr) {
      this.getUserAddress(this.userData.email);
    }
    if (this.userData) {
      this.getUserPoint(this.userData.email);
    }
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


  async onClickPayment() { //카드 결제

    //배송지 정보 체크
    if (!this.addrname && !this.phonenumber && !this.address && !this.buildingName && !this.zonecode) {
      this.showAlertCtrl('배송지 정보가 올바르지 않습니다');
      return;
    }
    //동의 체크
    if (!this.agreePay) {
      this.showAlertCtrl('결제 동의가 필요 합니다.');
      return;
    }

    // this.totalPointFinalCheck = this.getUserPointFinalCheck(this.userData.email);

    this.images.getUserPointLog(this.userData.email).subscribe(point => {
      if (point) {
        this.userPointLogFinalCheck = point;
        this.totalPointFinalCheck = this.userPointLogFinalCheck.totalPoint;  

        console.log("사용자 첫 조회 포인트 : " + this.totalPointCheck);
        console.log("사용자 두번째 조회 포인트 : " + this.totalPointFinalCheck);
        if (this.totalPointCheck === this.totalPointFinalCheck) {
          var userCode = 'imp24449006';                       // 가맹점 식별코드
          // --------------------------------- 정기결제 연동
          var data = {
            pg: 'html5_inicis.MOIplinics',                           // PG사 일반결제
            pay_method: 'card',      
            name: this.productData.product_name,                   // 주문명
            merchant_uid: 'mid_' + new Date().getTime(),  // 주문번호
            amount: this.totalAmount2,                              // 결제금액
            buyer_name: this.userData.nickname,                           // 구매자 이름
            buyer_tel: this.phonenumber,                     // 구매자 연락처
            buyer_email: this.userData.email,           // 구매자 이메일
            buyer_addr: this.address + ' ' + this.buildingName,
            buyer_postcode: this.zonecode,
            app_scheme: 'plinic',                        // 앱 URL 스킴
          };

          var titleOptions = {
            text: '플리닉 상품구매',                   // 타이틀
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
            callback: (response: any) => {
              this.paymentData = response;
              if (response.imp_success) {
                //구매가 성공하면 포인트 사용 여부에 따라 차감 이력 발생
                // this.usePoint 사용 이력
                this.setUserPointLog();
                
                //구매가 성공하면 아임포트에서 결제정보를 가져와서 성공화면으로 전달
                this.getIamPortPayment(response.imp_uid);
              }
            },                             // 콜백 함수
          }
          cordova.plugins.IamportCordova.payment(params);
        } else {
          this.showAlertCtrl('결제 실패 사용자 포인트 변경');
          return false;
        }
      }
    }, error => {
      this.showAlertCtrl('결제 실패 사용자 포인트 변경');
      return false;
    })

    
    
    
  }

  onClickPaymentVbank() { //실시간 계좌이체

    //배송지 정보 체크
    if (!this.addrname && !this.phonenumber && !this.address && !this.buildingName && !this.zonecode) {
      this.showAlertCtrl('배송지 정보가 올바르지 않습니다');
      return;
    }
    //동의 체크
    if (!this.agreePay) {
      this.showAlertCtrl('결제 동의가 필요 합니다.');
      return;
    }

    this.images.getUserPointLog(this.userData.email).subscribe(point => {
      if (point) {
        this.userPointLogFinalCheck = point;
        this.totalPointFinalCheck = this.userPointLogFinalCheck.totalPoint;

        var userCode = 'imp24449006';                       // 가맹점 식별코드
        // --------------------------------- 정기결제 연동
        var data = {
          pg: 'html5_inicis.MOIplinics',                           // PG사 일반결제
          pay_method: 'vbank',      
          name: this.productData.product_name,                   // 주문명
          merchant_uid: 'mid_' + new Date().getTime(),  // 주문번호
          amount: this.totalAmount2,                              // 결제금액
          buyer_name: this.userData.nickname,                           // 구매자 이름
          buyer_tel: this.phonenumber,                     // 구매자 연락처
          buyer_email: this.userData.email,           // 구매자 이메일
          buyer_addr: this.address + ' ' + this.buildingName,
          buyer_postcode: this.zonecode,
          app_scheme: 'plinic',                        // 앱 URL 스킴
        };

        var titleOptions = {
          text: '플리닉 상품구매',                   // 타이틀
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
          callback: (response: any) => {
            this.paymentData = response;
            if (response.imp_success) {
              this.getIamPortPayment(response.imp_uid); //결제 정보 조회
              
              //포인트 차감 이력 저장
              this.setUserPointLog();
            }
          },                             // 콜백 함수               // 콜백 함수
        }
        cordova.plugins.IamportCordova.payment(params);
      }
    });
    
    
  }

  callback(response) {  
    // 결제 결과 : {"imp_success":"true","imp_uid":"imp_999978856134","merchant_uid":"mid_1614148978001"}
    if (response.imp_success) {
      console.log("결제 성공??");
      this.getIamPortPayment(response.imp_uid);
    }
  }

  registAdress() {
    this.navCtrl.push(AdressPage).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        if (data.tempAddr) {
          this.tempAddr = data.tempAddr;
          //임시 저장소에 저장된 경우에는 이 주소를 그대로 배송지 정보에 넣어 준다..
          this.addrname = data.data.name;
          this.phonenumber = data.data.phonenumber;
          this.address = data.data.address;
          this.buildingName = data.data.buildingName;
          this.zonecode = data.data.zonecode;
          this.desc = data.data.desc;
          this.istempAddr = true;
        } else if (!data.tempAddr) {
          this.tempAddr = data.tempAddr
          //임시 저장소에 저장이 안되었을때 등록된 주소지를 불러 온다. 서버api호출//
          this.getUserAddress(this.userData.email);
          this.istempAddr = false;
        }
      });
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

  togglePay(payment) {
    if (payment === 'card') {
      this.isCard = true;
      this.isTrans = false;
    } else if (payment === 'trans') {
      this.isCard = false;
      this.isTrans = true;
    } else {
      this.isCard = true;
      this.isTrans = false;
    }
  }

  closePoint() {
    this.navCtrl.parent.select(2);
  }

  getUserAddress(email)  {
    this.images.getUserAddress(email).subscribe(data => {
      if(!this.tempAddr) {
        this.addressData = data;
        for (let i = 0; i < this.addressData.address.length; i++) {
          if (this.addressData.address[i].isMain) {
            this.isAddressData = true;
            this.addrname = this.addressData.address[i].name;
            this.phonenumber = this.addressData.address[i].phonenumber;
            this.address = this.addressData.address[i].address;
            this.buildingName = this.addressData.address[i].buildingName;
            this.zonecode = this.addressData.address[i].zonecode;
          }
        }
      }
    }, error => {
        // alert("주소 정보 가져 오기 에러 발생2")
      })
  }

  public getIamPortPayment(imp_uid) {
    this.authService.getIamPortPayment(imp_uid).subscribe(data => {
      this.navCtrl.push(OrderSucessCardPage, { data: data, productCount: this.ProductCount, userData: this.userData, usePoint: this.usePoint, productData: this.productData}).then(() => {
        this.navCtrl.getActive().onDidDismiss(data => {
        });
      });
      //모달창은 select(2); 이동이 되지 않아 PUSH로 변경
      // let myModal = this.modalCtrl.create(OrderSucessCardPage, {
      //   data: data
      // });
      // myModal.onDidDismiss(data => {
      //   this.navCtrl.parent.select(2);
      // });
      // myModal.present();
    }, err => {
      alert('결제정보를 불러오는데 실패했습니다.');
      console.log('아임포트 결제 정보 가져 오기 실패');
    })
  }

  getUserPoint(email) {
    this.images.getUserPointLog(email).subscribe(data => {
      this.userPointLog = data;
      this.totalPoint = this.userPointLog.totalPoint;
      this.totalPointCheck = this.userPointLog.totalPoint;
    })
  }

  
    
  

  getMaxPoint(point, price) {
    var maxPercent;
    var amount;
    var sale;
    (maxPercent) = point;
    sale = Number(maxPercent)/100;
    amount = price;
    this.maxPoint = Number(amount) * sale;
    this.maxPointComma = this.addComma(this.maxPoint);
    return this.maxPointComma;
  }

  useMaxPoint(checked) {
    
    
  }

  updateChek(event) {
    if (event.checked) {
      if (this.maxPoint >= this.userPointLog.totalPoint) {
        this.usePoint = this.userPointLog.totalPoint;
        this.usePointComma = this.addComma(this.usePoint);
        this.totalPoint = this.userPointLog.totalPoint - this.usePoint; 
        this.totalAmount2 = this.totalAmount - this.usePoint;
        this.pointInput.disabled = true;  
      } else if (this.maxPoint < this.userPointLog.totalPoint) {
        this.usePoint = this.maxPoint;
        this.usePointComma = this.addComma(this.usePoint);
        this.totalPoint = this.userPointLog.totalPoint - this.usePoint; 
        this.totalAmount2 = this.totalAmount - this.usePoint;
        this.pointInput.disabled = true;  
      }
      // this.usePoint = this.maxPoint;
      // this.usePointComma = this.addComma(this.usePoint);
      // this.totalPoint = this.userPointLog.totalPoint - this.usePoint; 
      // this.totalAmount2 = this.totalAmount - this.usePoint;
      // this.pointInput.disabled = true;  
      
    } else {
      this.totalPoint = this.userPointLog.totalPoint;
      this.usePoint = 0;
      this.usePointComma = this.addComma(this.usePoint);
      this.totalAmount2 = this.totalAmount;
      this.pointInput.disabled = false;
    }
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      // event.preventDefault();
      console.log(inputChar);
    }
  }

  usePointBit() {
    if (isNaN(Number(this.usePointComma))) {
      this.usePoint = 0;
      this.usePointComma = '';
      this.showAlertCtrl("숫자만 입력하세요");
      return false;
    } else {
      // this.usePoint; //실제 포인트 Number 데이터 
      // this.usePointComma; // Input창에 표시 되는 값
      // this.totalPoint; //현재 사용자의 실제 보유 포인트
      // this.userPointLog.totalPoint; //현재 사용자의 실제 보유 포인트

      if (Number(this.usePointComma) > Number(this.userPointLog.totalPoint)) { // 사용포인트가 보유포인트를 넘을때
        this.totalPoint = this.userPointLog.totalPoint;
        this.usePointComma = '';
        this.usePoint = 0;
        this.showAlertCtrl("보유 포인트가 부족합니다");  
        return false;
      } else if (Number(this.usePointComma) > Number(this.maxPoint)) {
        this.totalPoint = this.userPointLog.totalPoint
        this.usePointComma = '';
        this.usePoint = 0;
        this.showAlertCtrl("최대 사용포인트를 초과했습니다.");
        return false;
      } else {
        this.usePoint = Number(this.usePointComma);
        this.usePointComma = this.addComma(this.usePoint);
        this.totalPoint = this.userPointLog.totalPoint - this.usePoint;
        this.totalAmount2 = this.totalAmount - this.usePoint;
      }
    }
  }

  showAlertCtrl(text) {
    if (this.platform.is('ios')) {
      let alert = this.alertCtrl.create({
        cssClass: 'push_alert_ios',
        message: text,
        enableBackdropDismiss: true,
        buttons: [{
          text: '확인',
            handler: () => {
            }
          },
        ]
      });
      alert.onDidDismiss(()=>{
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        cssClass: 'push_alert',
        message: text,
        enableBackdropDismiss: true,
        buttons: [{
          text: '확인',
            handler: () => {
            }
          },
        ]
      });
      alert.onDidDismiss(()=>{
      });
      alert.present();
    }
  }

  setUserPointLog() {
    var points = {
      reason: '제품구매',
      point: (Number(this.usePoint) * -1),
      status: 'buy'
    }
    var usePoint = (Number(this.usePoint) * -1);

    this.authService.setUserPointLog(this.userData.email, points, usePoint).subscribe(data => {
      // console.log("포인트 이력 저장 완료 : " + JSON.stringify(data));
    })
  }
}
