import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { SungwooDeliveryPage } from '../sungwoo-delivery/sungwoo-delivery';
import { OrderCancel3Page } from '../order-cancel/order-cancel3/order-cancel3';
import { OrderChangePage } from '../order-cancel/order-change/order-change';
import { OrderCancelPage } from '../order-cancel/order-cancel/order-cancel';
import { OrderReturnPage } from '../order-cancel/order-return/order-return';
import { KakaoCordovaSDK, KLCustomTemplate, KLLinkObject, KLSocialObject, KLButtonObject, KLContentObject, KLFeedTemplate, AuthTypes } from 'kakao-sdk';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  detailOrderData: any;
  all: boolean = true;
  weekly: boolean = false;
  monthly: boolean = false;
  threemonthly: boolean = false;
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  thumb_image: any;
  chkUserImage: any;
  profileimg_url: any;
  orderList: any;
  today: Date = new Date();
  yearAgo: Date = new Date();
  weekAgo: Date = new Date();
  loading: Loading;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public auth: AuthService,
    public images: ImagesProvider,
    public alertCtrl: AlertController,
    public _kakaoCordovaSDK: KakaoCordovaSDK,
    public loadingCtrl: LoadingController,
    
  ) {
    this.loadItems();
    if (this.navParams.get('orderList')) {
      this.detailOrderData = this.navParams.get('orderList');
      this.yearAgo.setMonth(this.yearAgo.getMonth() - 12);
    }
  }

  async ionViewDidLoad() {
    
    // console.log('ionViewDidLoad OrderDetailPage');
  }

  ionViewDidEnter() {
    // console.log("ionViewDidEnter");
    if (this.navParams.get('orderList')) {
      this.detailOrderData = this.navParams.get('orderList');
      this.yearAgo.setMonth(this.yearAgo.getMonth() - 12);
    } else {
      this.getUserOrders(this.userData.email);
    }
  }

  public loadItems() {
    this.auth.getUserStorage().then(items => {
      // console.log("토큰 값을 가져 왔는가?" + JSON.stringify(items));
      if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver' || items.from === 'apple') {
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
          pushtoken: items.pushtoken,
          from: items.from,
          snsid: items.snsid,
          totaluseitme: items.totalusetime,
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
        } else {
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
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          pushtoken: this.jwtHelper.decodeToken(items).pushtoken,
          from: 'plinic',
          totaluseitme: items.totalusetime
        };

        if (this.userData) {
          this.auth.getUserImage(this.userData.email).subscribe(items => {
            if (items) {
              this.thumb_image = items
              this.chkUserImage = true;
              this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
              this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
            }
          });
        }
      }
    });



  }

  All() {
    this.all = true;
    this.weekly = false;
    this.monthly = false;
    this.threemonthly = false;
    this.auth.getOrderList(this.userData.email, 'All').subscribe(data => {
      this.detailOrderData = data;
      this.yearAgo = new Date();
      this.yearAgo.setMonth(this.yearAgo.getMonth() - 12);
    }, error => {
      console.log("데이터 전체 불러오기 에러" + error);
    });

  }

  weeklyy() {
    this.all = false;
    this.weekly = true;
    this.monthly = false;
    this.threemonthly = false;
    this.auth.getOrderList(this.userData.email, 'Weekly').subscribe(data => {
      this.detailOrderData = data;
      this.yearAgo = new Date();
      this.yearAgo.setDate(this.yearAgo.getDate() - 7); //일주일전

    }, error => {
      console.log("데이터 1주일 불러오기 에러" + error);
    });
  }

  monthy() {
    this.all = false;
    this.weekly = false;
    this.monthly = true;
    this.threemonthly = false;
    this.auth.getOrderList(this.userData.email, 'Monthy').subscribe(data => {
      this.detailOrderData = data;
      this.yearAgo = new Date();
      this.yearAgo.setMonth(this.yearAgo.getMonth() - 1); //한달전
    }, error => {
      console.log("데이터 1달 불러오기 에러" + error);
    });
  }

  threeMonthy() {
    this.all = false;
    this.weekly = false;
    this.monthly = false;
    this.threemonthly = true;
    this.auth.getOrderList(this.userData.email, 'ThreeMonthy').subscribe(data => {
      this.detailOrderData = data;
      this.yearAgo = new Date();
      this.yearAgo.setMonth(this.yearAgo.getMonth() - 3); //한달전
    }, error => {
      console.log("데이터 3달 불러오기 에러" + error);
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  dateConvert(date) {
    date = this.getCovertKoreaTime(date);
    var month = '';
    var day = '';

    month = date.substr(5, 2);
    day = date.substr(8, 2);

    return month + '월' + day + '일';
  }

  logRatingChange(rating) {
    console.log("changed rating: ", rating);
    // do your stuff
  }

  getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset() * 60000).toISOString()
  }

  getUserOrders(email) {
    this.images.getUserOrders(email).subscribe(data => {
      this.orderList = data;
      this.detailOrderData = data;
    })
  }

  deliveryInfo(detailData) {
    this.navCtrl.push(SungwooDeliveryPage, { detailData: detailData });
  }

  orderCancel1(detailData) {
    if (detailData.status === 'status_ready' || detailData.status === 'paid') {
      this.navCtrl.push(OrderCancelPage, { detailData: detailData });
    } else if (detailData.status === 'cencel_request' || detailData.status === 'cencel_progress' || detailData.status === 'cencel_completed') { //이미 취소 신청
      this.showAlertArg('이미 주문취소가 진행중입니다', '추가사항은 카카오 1:1문의를 이용해주세요');
    } else if (detailData.status === 'return_request' || detailData.status === 'return_progress' || detailData.status === 'return_completed') { //이미 취소 신청
      this.showAlertArg('반품이 진행중입니다', '추가사항은 카카오 1:1문의를 이용해주세요');
    } else if (detailData.status === 'swap_request' || detailData.status === 'swap_during' || detailData.status === 'swap_completed') { //이미 취소 신청
      this.showAlertArg('교환이 진행중입니다', '추가사항은 카카오 1:1문의를 이용해주세요');
    } else {
      this.showAlertArg('배송이 시작되었습니다', '지금은 주문취소가 어렵습니다<br>상품수령 후 진행해주세요');
    }
  }
  
  returnProduct(detailData) { 
    if (detailData.status === 'deliver_ready' || detailData.status === 'deliver_during' || detailData.status === 'deliver_completed') {
      this.navCtrl.push(OrderReturnPage, {detailData: detailData});
    } else if (detailData.status === 'status_ready' || detailData.status === 'paid') {
      this.showAlertArg('반품을 신청할 상품이 없습니다', '상품을 한번 더 확인 해주세요');
    } else if (detailData.status === 'cencel_request' || detailData.status === 'cencel_progress' || detailData.status === 'cencel_completed') {
      this.showAlertArg('반품을 신청할 상품이 없습니다', '추가사항은 카카오 1:1문의를 이용해주세요');
    } else if (detailData.status === 'return_request' || detailData.status === 'return_progress' || detailData.status === 'return_completed') {
      this.showAlertArg('이미 반품을 신청하였습니다', '추가사항은 카카오 1:1문의를 이용해주세요');
    } else if (detailData.status === 'swap_request' || detailData.status === 'swap_during' || detailData.status === 'swap_completed') {
      this.showAlertArg('현재 교환을 신청하였습니다', '추가사항은 카카오 1:1문의를 이용해주세요');
    } else {

    }
  }

  chageProduct(detailData) {
    if (detailData.status === 'deliver_completed' || detailData.status === 'deliver_ready' || detailData.status === 'deliver_during') {
      this.navCtrl.push(OrderChangePage, {detailData: detailData});
    } else if (detailData.status === 'status_ready' || detailData.status === 'paid') {
      this.showAlertArg('교환을 신청할 상품이 없습니다', '상품을 한번 더 확인 해주세요');
    }
    // else if (detailData.status === 'deliver_ready' || detailData.status === 'deliver_during') {
    //   this.showAlertArg('상품이 배송중입니다', '상품수령 후 진행해주세요');
    // }
    else if (detailData.status === 'cencel_request' || detailData.status === 'cencel_progress' || detailData.status === 'cencel_completed') {
      this.showAlertArg('교환을 신청할 상품이 없습니다', '추가사항은 카카오 1:1문의를 이용해주세요');
    } else if (detailData.status === 'return_request' || detailData.status === 'return_progress' || detailData.status === 'return_completed') {
      this.showAlertArg('현재 반품이 진행중입니다', '추가사항은 카카오 1:1문의를 이용해주세요');
    } else if (detailData.status === 'swap_request' || detailData.status === 'swap_during' || detailData.status === 'swap_completed') {
      this.showAlertArg('이미 교환이 진행중입니다', '추가사항은 카카오 1:1문의를 이용해주세요');
    }
  }

  orderCompleted(detailData) {
    if (detailData.status === 'deliver_during') {
      this.confirmOrder(detailData);
    } else {
      this.notConfirmOrder(detailData);
    }
  }

  statusToString(status) {
    if (status === 'ready') {
      //주문전
      return '주문완료'
    } else if (status === 'paid') {
      //결제완료
      return '결제완료'
    } else if (status === 'deliver_ready') {
      return '상품 준비중'
    } else if (status === 'deliver_during') {
      return '배송중'
    } else if (status === 'deliverComp') {
      return '배송완료'
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: "배송이 시작되었습니다.",
      message: "지금은 주문 취소가 어렵습니다<br>카카오1:1상담을 통해 문의해주세요",
      buttons: [
        {
          text: '1:1상담 바로가기',
          handler: () => {
          }
        }]
    });
    alert.present();
  }

  showAlertArg(title, text) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_order',
      title: title,
      message: text,
      buttons: [
        {
          text: '확인',
          handler: () => {
          }
        }]
    });
    alert.present();
  }

  kakaoChat() {
    let plusFriendTemplate = {
      plusFriendId: '_PMxjxjxb',
    };
    this._kakaoCordovaSDK
      .chatPlusFriend(plusFriendTemplate)
      .then(
        res => {
        },
        err => {
        }
      )
      .catch(err => {
      });
  }

  convertStatusKor(engData) {
    switch (engData) {
      case 'status_ready' : return '결제 확인중';
      case 'paid' : return '결제 확인';
      case 'deliver_ready' : return '배송 준비중';
      case 'deliver_during' : return '배송중';
      case 'deliver_completed' : return '배송 완료';
      case 'cencel_request' : return '취소 요청';
      case 'cencel_progress' : return '취소 처리중';
      case 'cencel_completed' : return '취소 완료';
      case 'return_request' : return '반품 요청';
      case 'return_progress' : return '반품 처리중';
      case 'return_completed' : return '반품 완료';
      case 'swap_request' : return '교환 요청';
      case 'swap_during' : return '교환중';
      case 'swap_completed' : return '교환 완료';
      default: return "결제 확인중";
    }
  }

  checkDelivery(status) { //2021-04-16 주문 상태를 체크 하여 교환 요청 버튼 visible처리
    if (status === 'deliver_during' || status === 'deliver_completed' || status === 'cencel_request' || status === 'cencel_progress' || status === 'cencel_completed' || status === 'return_request' || status === 'return_progress' || status === 'return_completed'|| status === 'swap_request' || status === 'swap_during' || status === 'swap_completed') {
      return true;
    } else {
      return false;
    }
  }

  checkChange(status) { //2021-04-16 주문 상태를 체크 하여 교환 요청 버튼 visible처리
    if (status === 'deliver_completed') {
      return true;
    } else {
      return false;
    }
  }
  
  checkReturn(status) { //2021-04-16 주문 상태를 체크 하여 반품 요청 버튼 visible처리
    if (status === 'deliver_ready' || status === 'deliver_during' || status === 'deliver_completed') {
      return true;
    } else {
      return false;
    }
  }

  checkCancel(status) { //2021-04-16 주문 상태를 체크 하여 취소 요청 버튼 visible처리
    if (status === 'status_ready' || status === 'paid') {
      return true;
    } else {
      return false;
    }
  }

  confirmOrderProcess(title, message) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: "구매확정",
      message: "구매확정이 완료되었습니다.",
      buttons: [
        {
          text: '확인',
          handler: () => {
          }
        }]
    });
    alert.present();
  }


  confirmOrder(detailData) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "구매확정",
      message: "구매를 확정하시겠습니까?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '확인',
          handler: () => {
            this.updateDeliverCompleted(detailData);
          }
        }]
    });
    alert.present();
  }

  notConfirmOrder(detailData) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "구매확정",
      message: "배송중 상태만 구매 확정이 가능합니다",
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '확인',
          handler: () => {
          }
        }]
    });
    alert.present();
  }


  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      cssClass: 'plinic_alert',
      spinner: 'hide',
      content: `<img width="100px" height="100px" src="assets/img/loading/DualBall-1.9s-200px.gif" />`,
      duration: 10000
    });

    this.loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    this.loading.present();
  }

  updateDeliverCompleted(detailData) {
    this.presentLoadingCustom();
    this.auth.updateCompletedOrders(this.userData.email, detailData._id).subscribe(data => {
      this.confirmOrderProcess("구매확정", "구매확정이 완료되었습니다.");
      this.getUserOrders(this.userData.email);
      this.loading.dismiss();
    }, error => {
      this.confirmOrderProcess("구매확정 실패", "서비스가 처리 되지 않았습니다.");
      this.loading.dismiss();
    });
  }


}
