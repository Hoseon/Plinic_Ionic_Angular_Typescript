import { IonicPage, App } from "ionic-angular";
import { Component, Inject, ViewChild, ElementRef } from "@angular/core";
import {
  NavController,
  Platform,
  AlertController,
  ModalController,
  Loading,
  LoadingController,
  ViewController,
  Events,
  ToastController
} from "ionic-angular";
import { AuthService } from "../../providers/auth-service";
import { ImagesProvider } from "../../providers/images/images";
import { KakaoCordovaSDK, AuthTypes } from "kakao-sdk";
import { SkinChartPage } from "../skin-chart/skin-chart";
import { CareZonePage } from "../care-zone/care-zone";
import { SkinMeasureStartPage } from "../skin-measure-start/skin-measure-start";
import { TranslateService } from "ng2-translate/ng2-translate";
import { TabsPage } from "../tabs/tabs";
import { CareZoneMissionIngPage } from "../care-zone-mission-ing/care-zone-mission-ing";
import { CareZoneMissionStartPage } from "../care-zone-mission-start/care-zone-mission-start";
import { CareZoneMissionDeadlineEndPage } from "../care-zone-mission-deadline-end/care-zone-mission-deadline-end";
import { ChalMissionIngPage } from "../chal-mission-ing/chal-mission-ing";
import { ChalMissionStartPage } from "../chal-mission-start/chal-mission-start";
import { DOCUMENT } from "@angular/common";
import {
  ThemeableBrowser,
  ThemeableBrowserOptions,
  ThemeableBrowserObject
} from "@ionic-native/themeable-browser";
import { ImageLoader } from "ionic-image-loader";
import { CallNumber } from "@ionic-native/call-number";
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from "angular2-jwt";
import { BeautyTipAddPage } from "../beauty-tip-add/beauty-tip-add";
import { PlinicManualPage } from "../myinfo/details/plinic-manual/plinic-manual";
import { SkinDiagnoseMoisturePage } from "../skin-diagnose-moisture/skin-diagnose-moisture";
import { SkinDiagnoseFirstMoisturePage } from "../skin-diagnose-first-moisture/skin-diagnose-first-moisture";
import { CommunityModifyPage } from "../community/community-modify/community-modify";
import { CommunityPage } from "../community/community";
import { QnaReadPage } from "../myinfo/details/qna/qna-read/qna-read";
import { AlarmTestPage } from "../alarmtest/alarmtest";
import { Observable } from "rxjs/Rx";
import { FCM } from "@ionic-native/fcm";
import { SearchPage } from "../community/search/search";
import { DeviceConnectIngPage } from "../device-connect-ing/device-connect-ing";
import { Flip } from "number-flip"; //숫자 카운트 되는 애니메이션 적용
import { ChulsukCheckPage } from "../chulsuk-check/chulsuk-check"; //숫자 카운트 되는 애니메이션 적용
import { MyinfoPage } from "../myinfo/myinfo";
import { GuidePage } from "../guide/guide";
import { RegistercompletePage } from "../register/registercomplete/registercomplete";
import { RewardPage } from "../reward/reward";
import { textDef } from "@angular/core/src/view";
import { SkinChekCamera2Page } from "../skin-chek-camera2/skin-chek-camera2";
import { Geolocation } from "@ionic-native/geolocation"; //안드로이드 API 29버전에서 BLE 연결 이슈로 인하여 위치정보 수집을 미리 한다. 2020-11-10
import { ProductReviewPage } from "../product-review/product-review";
import { SkinChekCamera5Page } from '../skin-chek-camera5/skin-chek-camera5';
import { AdressPage } from '../adress/adress';
import { OrderSucessCardPage } from '../orderSucess-Card/orderSucess-Card';
import { SungwooBeautyPage } from '../sungwoo-beauty/sungwoo-beauty';
import { OrderDetailPage } from '../order-detail/order-detail';
import { PostBoxPage } from '../postbox/postbox';
import { BleTestPage } from '../bletest/bletest';
import { LoginpagePage } from '../login/loginpage/loginpage';


@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  flipAnim = null;
  isFlip: boolean = false;

  @ViewChild("numberbtn", { read: ElementRef }) private flipbtn: ElementRef;
  currentAppVer: any = "1.0.176";
  appCheck: boolean = false;
  userData: any;
  bannerData: any;
  imageUrl: any;
  carezoneData: any;
  missionData: any;
  challengeData: any;
  missionID: any;
  jwtHelper: JwtHelper = new JwtHelper();
  careDataOBJ: any;
  second_carezone_maxmember: any;
  second_carezone_startDate: Date;
  third_carezone_title: any;
  third_carezone_body: any;
  third_carezone__id: any;
  third_carezone_missioncount: any;
  third_carezone_maxmember: any;
  third_carezone_startDate: Date;
  loading: Loading;
  // missionCounter: any;
  missionCounter: Array<any> = new Array<any>();

  beauty_data_type1: any;
  beauty_data_title1: any;
  beauty_data_id1: any;
  beauty_data_url1: any;
  beauty_data_viewId1: any;
  beauty_data_views1: any;
  beauty_data_midtext1: any;
  beauty_data_type2: any;
  beauty_data_title2: any;
  beauty_data_id2: any;
  beauty_data_url2: any;
  beauty_data_viewId2: any;
  beauty_data_views2: any;
  beauty_data_midtext2: any;
  beautyData: any;
  imgUrl: any;
  currentDate: Date = new Date();
  new: any;
  recruiting: any;
  mdchuchun: any;
  approaching: any;
  endrecruit: any;
  second_new: any;
  second_recruiting: any;
  second_mdchuchun: any;
  second_approaching: any;
  second_endrecruit: any;
  third_new: any;
  third_recruiting: any;
  third_mdchuchun: any;
  third_approaching: any;
  third_endrecruit: any;
  firstCarezoneData: any;
  secondCarezoneData: any;
  thirdCarezoneData: any;
  secondCount: any = 0;
  getday: any;
  dday: any;
  chkDay: any;
  d5: Array<any> = new Array<any>();
  d4: Array<any> = new Array<any>();
  d3: Array<any> = new Array<any>();
  d2: Array<any> = new Array<any>();
  d1: Array<any> = new Array<any>();
  ingmdchuchun: Array<boolean> = new Array<boolean>();
  ingapproaching: Array<boolean> = new Array<boolean>();
  missionCounter2: Array<any> = new Array<any>();
  percent: Array<any> = new Array<any>();
  getthirdday: Array<any> = new Array<any>();
  skin_diagnose_first_check = false;
  all_moisture_score: any = 0;
  all_oil_score: any = 0;
  all_first_moisture_score: any = 0;
  all_first_oil_score: any = 0;
  all_first_total_score: any = 0;
  all_total_score: any = 0;
  skinScoreChk = false;
  skinScoreData: any;
  circle_moisture: any = 0;
  circle_oil: any = 0;
  circle_date: any;
  pre_circle_moisture: any = 0;
  pre_circle_oil: any = 0;
  pre_circle_date: any;
  chartDateData = [];
  chartOilData = [];
  chartMoistureData = [];
  array1 = [];
  chartDateData2: Array<any>;
  total_score: any = 0;
  pre_total_score: any = 0;
  skinQnaData: any;
  displayTime: Array<any> = new Array<any>();
  displayTime2: any;
  secondsRemaining: any = 1000000;
  secondsRemaining2: any = 2000000;
  runTimer: boolean = true;
  subscriptionTimer: any;
  subscriptionTimer2: any;
  timeremaining: Array<any> = new Array<any>();
  timeremaining2: any;
  endmission: Array<any> = new Array<any>();
  startmission: Array<any> = new Array<any>();
  first_missionMemberData: any;
  missionmember: Array<any> = new Array<any>();
  second_missionMemberData: any;
  totaluserpoint: any = 0;
  topBannerData: any;
  movieData: any;
  youTubeArrayData: Array<any> = new Array<any>();
  videoDetailData: Array<any> = new Array<any>();
  isExitApp: boolean = false;
  checkPlinicUser: any;
  popupData: any;
  adUrl: any;

  constructor(
    private fcm: FCM,
    private geolocation: Geolocation,
    public toastCtrl: ToastController,
    public platform: Platform,
    public nav: NavController,
    public auth: AuthService,
    public _kakaoCordovaSDK: KakaoCordovaSDK,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private images: ImagesProvider,
    private modalCtrl: ModalController,
    public translateService: TranslateService,
    public viewCtrl: ViewController,
    private themeableBrowser: ThemeableBrowser,
    private imageLoader: ImageLoader,
    public app: App,
    private callNumber: CallNumber,
    @Inject(DOCUMENT) document,
    public events: Events
  ) {
    this.platform.ready().then(readySource => {
      this.geolocation
        .getCurrentPosition()
        .then(resp => {
        })
        .catch(error => {
          console.log("Error getting location", error);
        });
    });
  }

  ngOnInit() {
    // console.log("ngOnInit Home");
    if (this.platform.is("android")) {
      //안드로이드 app.scss의 내용과 ios의 내용이 달라 분기로 구분함
      setTimeout(() => {
        this.auth.getHomePopUpCheck().then(
          result => {
            if (result != null) {
              let setDate = new Date(result.date);
              setDate.setDate(setDate.getDate() + 2);
              if (
                this.getCovertKoreaTime(setDate).substr(0, 10) <
                this.getCovertKoreaTime(new Date()).substr(0, 10)
              ) {
                this.showAlertProduct_android("test", "test"); //안드로이드 app.scss의 내용과 ios의 내용이 달라 분기로 구분함
              }
            } else {
              this.showAlertProduct_android("test", "test"); //안드로이드 app.scss의 내용과 ios의 내용이 달라 분기로 구분함
            }
          },
          error => {
            console.log("팝업 가져오기 에러 : " + error);
          }
        );
            // // 어플 오픈 시 해당 회원 마지막 이력 업데이트
            // this.auth.giveupMember(this.userData.email).subscribe(data => {
            // });
      }, 3000);
    } else {
      setTimeout(() => {
        this.auth.getHomePopUpCheck().then(
          result => {
            if (result != null) {
              let setDate = new Date(result.date);
              setDate.setDate(setDate.getDate() + 2);
              if (
                this.getCovertKoreaTime(setDate).substr(0, 10) <
                this.getCovertKoreaTime(new Date()).substr(0, 10)
              ) {
                this.showAlertProduct_ios("test", "test"); //안드로이드 app.scss의 내용과 ios의 내용이 달라 분기로 구분함
              }
            } else {
              this.showAlertProduct_ios("test", "test"); //안드로이드 app.scss의 내용과 ios의 내용이 달라 분기로 구분함
            }
          },
          error => {
            console.log("팝업 가져오기 에러 : " + error);
          }
        );
        // if(this.userData.email == '') {
        //   this.auth.giveupMember(this.userData.email).subscribe(data => {
            
        //   });
        // }
            // // 어플 오픈 시 해당 회원 마지막 이력 업데이트
            // this.auth.giveupMember(this.userData.email).subscribe(data => {
            // });
      }, 3000);
    }
  }

  ionViewDidLoad() {
    console.log("didLoad");
    this.loadItems();
    this.roadbeauty();
    this.firstCarezoneData = this.firstLoadCareZone();
    this.bannerData = this.roadbanner();
    this.topbannerLoad();
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
    if (!this.appCheck) {
      this.compareAppVersion();
    }
    this.auth.setUserStoragetab(0);
    this.getPopupList();
  }

  ionViewWillEnter() {
    this.skinQnaLoad();
    if (this.userData) {
      this.challengeChkMission(this.userData.email);

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
  }

  ionViewDidEnter() {

    if (this.platform.is("ios") || this.platform.is("android")) {
      this.inItFCM();
      if (this.platform.is("android")) {
        this.androidBackButton();
      }
    }
    this.getBeautyMovie();
  }

  ionViewWillLeave() {
    this.isFlip = true;
  }

  public community_qna_modify(id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, {
      id: id,
      mode: "qna"
    });
    myModal.onDidDismiss(data => {
      this.androidBackButton();
    });
    myModal.present();
  }

  public skinQnaLoad() {
    this.images.skinQnaLoad().subscribe(data => {
      this.skinQnaData = data;
    });
  }

  public skin_moisture_score() {
    this.auth.getUserStoragediagnose_moisture().then(items => {
      this.all_moisture_score = items;
      this.all_total_score += this.all_moisture_score / 2;
    });
  }

  public skin_oil_score() {
    this.auth.getUserStoragediagnose_oil().then(items => {
      this.all_oil_score = items;
      this.all_total_score += this.all_oil_score / 2;
    });
  }

  public skin_first_moisture_score() {
    this.auth.getUserStoragediagnose_first_moisture().then(items => {
      this.all_first_moisture_score = items;
      this.all_first_total_score += this.all_first_moisture_score / 2;
    });
  }

  public skin_first_oil_score() {
    this.auth.getUserStoragediagnose_first_oil().then(items => {
      this.all_first_oil_score = items;
      this.all_first_total_score += this.all_first_oil_score / 2;
    });
  }

  public skin_measure() {
    if (this.skin_diagnose_first_check) {
      let myModal = this.modalCtrl.create(SkinDiagnoseMoisturePage);
      myModal.present();
    } else {
      let myModal = this.modalCtrl.create(SkinDiagnoseFirstMoisturePage);
      myModal.present();
    }
  }

  public beauty_add() {
    let alert = this.alertCtrl.create({
      cssClass: "push_alert",
      title: "plinic",
      message: "준비중입니다.",
      buttons: [
        {
          text: "확인"
        }
      ]
    });
    alert.present();
  }

  public plinic_manual() {
    this.nav.push(PlinicManualPage);
  }

  public loadItems() {
    this.auth.getUserStorage().then(items => {
      if (
        items.from === "kakao" ||
        items.from === "google" ||
        items.from === "naver" || 
        items.from === "apple"
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
          snsid: items.snsid
        };
        if (
          this.userData.thumbnail_image === "" ||
          this.userData.thumbnail_image === undefined
        ) {
          // this.thumb_image = false;
        } else {
          // this.thumb_image = true;
        }
        // this.chkmission(this.userData.email); 2020-02-10 챌린지 체크로 변경되어 주석 처리
        this.challengeChkMission(this.userData.email);
        // this.reloadUserPoint(this.userData.snsid); 2021-03-17 포인트 불러 오기 변경
        this.reloadUserPoint(this.userData.email);
        if (this.userData === null || this.userData === undefined || this.userData.email === '') {
          this.auth.logout().then(() => {
            this.app.getRootNav().setRoot(LoginpagePage);
          });
        }
        this.isPlinicUser(this.userData.email);
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
          totaluserpoint: this.jwtHelper.decodeToken(items).totaluserpoint,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image
        };
        this.challengeChkMission(this.userData.email);
        this.reloadUserPoint(this.userData.email);
        if (this.userData === null || this.userData === undefined || this.userData.email === '') {
          this.auth.logout().then(() => {
            this.app.getRootNav().setRoot(LoginpagePage);
          });
        }
        this.isPlinicUser(this.userData.email);
      }
      
    });
  }

  openBrowser_ios(url, title, id) {
    this.images.communityBeautyViewsUpdate(id).subscribe(data => {});

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: "#6562b9"
      },
      title: {
        color: "#FFFFFF",
        showPageTitle: true,
        staticText: title
      },
      closeButton: {
        wwwImage: "assets/img/close.png",
        align: "left",
        event: "closePressed"
      },
      backButton: {
        wwwImage: "assets/img/back.png",
        align: "right",
        event: "backPressed"
      },
      forwardButton: {
        wwwImage: "assets/img/forward.png",
        align: "right",
        event: "forwardPressed"
      }
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(
      url,
      "_blank",
      options
    );
    browser.insertCss({
      file: "assets/img/close.png",
      code: ".navbar-fixed-top {display: block !important;}"
    });
    browser.reload();
    browser.on("closePressed").subscribe(data => {
      browser.close();
    });
  }

  openBrowser_android(url, title) {
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: "#6562b9"
      },
      title: {
        color: "#FFFFFF",
        showPageTitle: true,
        staticText: title
      },
      closeButton: {
        wwwImage: "assets/img/close.png",
        align: "left",
        event: "closePressed"
      },
      backButton: {
        wwwImage: "assets/img/back.png",
        align: "right",
        event: "backPressed"
      },
      forwardButton: {
        wwwImage: "assets/img/forward.png",
        align: "right",
        event: "forwardPressed"
      }
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(
      url,
      "_blank",
      options
    );
    browser.insertCss({
      file: "assets/img/close.png",
      code: ".navbar-fixed-top {display: block !important;}"
    });
    browser.reload();
    browser.on("closePressed").subscribe(data => {
      browser.close();
    });
  }

  showAlertwithCancel(title, message) {
    let alert = this.alertCtrl.create({
      cssClass: "push_alert_cancel2",
      title: title,
      message: message,
      buttons: [
        {
          text: "홈으로",
          handler: () => {
            console.log("마이페이지 확인");
            this.nav.popToRoot();
          }
        },
        {
          text: "마이페이지 확인",
          handler: () => {
            this.nav.parent.select(1).then(() => this.nav.push(MyinfoPage));
            console.log("홈으로 가기");
          }
        }
      ]
    });
    alert.present();
    this.nav.pop().then(() => this.nav.pop());
  }

  public customer_service() {
    let alert = this.alertCtrl.create({
      cssClass: "push_alert",
      title: "고객센터",
      message:
        "언제나 친절히 모시겠습니다. <br> 오전10시 ~ 오후 5시 <br>( 점심시간 12시~1시 )",
      buttons: [
        {
          text: "연결하기",
          handler: () => {
            this.callNumber.callNumber("18334870", true);
          }
        }
      ]
    });
    alert.present();
  }

  public close() {
    document.getElementById("view").style.display = "none";
  }

  openBasicModal() {
    if (this.platform.is("android")) {
      let myModal = this.modalCtrl.create(SkinMeasureStartPage);
      myModal.present();
    }

    if (this.platform.is("ios") || this.platform.is("core")) {
      let myModal = this.modalCtrl.create(SkinMeasureStartPage);
      myModal.present();
    }
  }
  openModalWithParams() {
    let myModal = this.modalCtrl.create(SkinMeasureStartPage, {
      myParam: "test"
    });
    myModal.present();
  }

  public roadbanner() {
    this.images.bannerRoad().subscribe(data => {
      this.bannerData = data;
    });
  }

  public diffdate(date1: Date = new Date(), date2: Date = new Date()) {
    return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
  }

  public firstLoadCareZone() {
    this.images.first_carezoneRoad().subscribe(data => {
      this.firstCarezoneData = data;

      if (data !== "") {
        for (let i = 0; i < data.length; i++) {
          this.timeremaining[i] =
            (new Date(data[i].endmission).getTime() - new Date().getTime()) /
            1000;
        }
      }

      for (let i = 0; i < data.length; i++) {
        this.images.getMissionMember(data[i]._id).subscribe(data3 => {
          if (data3 !== "") {
            this.missionmember[i] = data3;
          }
        });

        this.endmission[i] = new Date(data[i].endmission);
      }
    });
  }

  public roadbeauty() {
    this.images.communityEditorHomeBeautyLoad().subscribe(data => {
      this.beauty_data_type1 = data[0].title;
      this.beauty_data_title1 = data[0].body;
      this.beauty_data_id1 = data[0].filename;
      this.beauty_data_url1 = data[0].posturl;
      this.beauty_data_viewId1 = data[0]._id;
      this.beauty_data_views1 = data[0].views;
      this.beauty_data_midtext1 = data[0].midtext;
      this.beauty_data_type2 = data[1].title;
      this.beauty_data_title2 = data[1].body;
      this.beauty_data_id2 = data[1].filename;
      this.beauty_data_url2 = data[1].posturl;
      this.beauty_data_viewId2 = data[1]._id;
      this.beauty_data_views2 = data[1].views;
      this.beauty_data_midtext2 = data[1].midtext;
      this.beautyData = data;
    });
  }

  public kakao_request() {
    this._kakaoCordovaSDK.requestMe().then(res => {
    });
  }

  public kakao_scope() {
    let values = {
      targetScopes: ["account_email", "age_range", "gender"]
    };

    let userData: any;

    this._kakaoCordovaSDK.checkScopeStatus(null).then(res => {
      this.showAlert("스코프111" + JSON.stringify(res));
    });
  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: "Alert",
      message: text,
      buttons: ["OK"]
    });
    alert.present();
  }

  public skin_chart() {
    this.nav.push(SkinChartPage);
  }

  public care_zone() {
    this.nav.push(CareZonePage);
  }

  public mission_ing() {
    this.nav.push(CareZoneMissionIngPage);
  }
  public mission_start(carezoneData) {
    //console.log(_id);
    console.log("미션 아이디 :" + this.missionID);
    if (!this.missionID) {
      this.nav.push(ChalMissionStartPage, { carezoneData: carezoneData });
    } else if (carezoneData._id === this.challengeData.missionID) {
      this.nav.push(ChalMissionIngPage, { carezoneData: carezoneData });
    } else {
      this.nav.push(ChalMissionStartPage, { carezoneData: carezoneData });
    }
  }
  public mission_deadline_end(id) {
    this.nav.push(CareZoneMissionDeadlineEndPage, { _id: id });
  }

  public openCareZoneTab(): void {
    this.nav.parent.select(1);
  }

  public openCommunityTab1() {
    // this.auth.setUserStoragetab(0); //그래서 스토리지에 저장을 하고 그것을 이동한 페이지에서 스토리지에 값을 불러와 슬라이드로 이동
    this.nav.parent.select(3); //이벤트 처리 방법은 좋은 방법이나 페이지가 넘어가면 동작이 안되는 문제가 발생
    this.events.publish("tabs1", "tabs1");
  }

  public openCommunityTab2() {
    this.auth.setUserStoragetab(2);
    this.nav.parent.select(3);
    this.events.publish("tabs2", "tabs2");
  }

  public openCommunityTab3() {
    this.auth.setUserStoragetab(1);
    this.nav.parent.select(3);
    this.events.publish("tabs3", "tabs3");
  }

  //20200210 챌린지 참여 중인지 체크 하기
  public challengeChkMission(email) {
    this.images.ChallengeChkMission(email).subscribe(data => {
      if (data.length <= 0) {
        this.challengeData = "";
      } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].missioncomplete) {
            //완료하지 못한 미션이 있는 체크
            this.challengeData = data[i];
            this.missionID = data[i].missionID;
          }
        }
      } else {
        console.log("이상한 값이 들어 왔을때 챌린지 참여 안한걸로");
      }
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "잠시만 기다려주세요"
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: "push_alert",
      title: "Plinic",
      message: text,
      buttons: ["OK"]
    });
    alert.present();
  }

  test_noti() {
    let myModal = this.modalCtrl.create(GuidePage, { mode: "home" });
    myModal.onDidDismiss(data => {
      console.log("케어 포인트 닫힘");
      this.androidBackButton();
      if (this.userData) {
        this.isFlip = true;
        // console.log("사용자 포인트 리로드");
        if (
          this.userData.from === "kakao" ||
          this.userData.from === "google" ||
          this.userData.from === "naver"
        ) {
          // this.reloadUserPoint(this.userData.snsid); 2021-03-17 포인트 불러 오기 변경 snsId -> email
          this.reloadUserPoint(this.userData.email);
        } else {
          this.reloadUserPoint(this.userData.email);
        }
      }
    });
    myModal.present();
  }

  flip() {
    if (!this.flipAnim) {
      this.flipAnim = new Flip({
        node: this.flipbtn.nativeElement,
        from: "00",
        to: this.userData.totaluserpoint,
        separator: ",",
        duration: 1.5,
        delay: 0.3
      });
    }
  }

  public chulsuk_check() {
    let myModal = this.modalCtrl.create(ChulsukCheckPage);
    myModal.onDidDismiss(data => {
      if (this.userData) {
        this.isFlip = true;
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
      console.log("출석체크 페이지 닫음");
      if (this.platform.is("android")) {
        this.androidBackButton();
      }
    });
    myModal.present();
  }

  public myinfo() {
    //2020-05-28 마이페이지 하단탭 제거
    let myModal = this.modalCtrl.create(MyinfoPage);
    myModal.onDidDismiss(data => {
      if (this.userData) {
        this.isFlip = true;
        if (
          this.userData.from === "kakao" ||
          this.userData.from === "google" ||
          this.userData.from === "naver"
        ) {
          // this.reloadUserPoint(this.userData.snsid); 2021-03-17 snsid => email로 변경
          this.reloadUserPoint(this.userData.email);
        } else {
          this.reloadUserPoint(this.userData.email);
        }
      }
      console.log("내정보 페이지 닫음");
      if (this.platform.is("android")) {
        this.androidBackButton();
      }
    });
    myModal.present();
  }

  private reloadUserPoint(email) {

    this.auth.reloadUserPointfromPlinc(email).subscribe(
      data => {
        this.userData.totaluserpoint = JSON.stringify(data.totalPoint);
        this.totaluserpoint = JSON.stringify(data.totalPoint);
        this.totaluserpoint = this.addComma(this.totaluserpoint);
        // console.log("사용자 포인트 리로드 : " + this.userData.totaluserpoint);
        setTimeout(() => {
          this.flip();
        }, 3000);
      },
      error => {
        console.log(
          "사용자 개인포인트 불러오기 에러발생 : " + JSON.stringify(error)
        );
      }
    );

    // this.auth.reloadUserPointfromPlincShop(email).subscribe(
    //   data => {
    //     this.userData.totaluserpoint = JSON.stringify(data.point);
    //     this.totaluserpoint = JSON.stringify(data.point);
    //     this.totaluserpoint = this.addComma(this.totaluserpoint);
    //     // console.log("사용자 포인트 리로드 : " + this.userData.totaluserpoint);
    //     setTimeout(() => {
    //       this.flip();
    //     }, 3000);
    //   },
    //   error => {
    //     console.log(
    //       "사용자 개인포인트 불러오기 에러발생 : " + JSON.stringify(error)
    //     );
    //   }
    // );
  }

  addComma(data_value) {
    //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString("en");
  }

  private topbannerLoad() {
    this.images.topbannerLoad().subscribe(data => {
      this.topBannerData = data;
    });
  }

  private inItFCM() {
    if (this.platform.is("ios")) {
      this.fcm.subscribeToTopic("plinic");

      this.fcm.getToken().then(token => {
        console.log("FCM iOS Token :::::::::::::" + token);
        if (this.userData) {
          this.auth.updatePushToken(this.userData.email, token).subscribe(
            data => {},
            error => {
              console.log("푸쉬토큰 업데이트 실패 : " + JSON.stringify(error));
            }
          );
        }
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          this.images.alarmTypeUpdate2(data.id).subscribe(data => {
          //앱 밖에서 알림을 클릭하여 접근 했을 시,
          //커뮤니티 (뷰티노트, 피부고민 알림 처리)
            if (data.mode === "qna" || data.mode === "note") {
              // this.nav.parent.select(3).then(() => {
              let myModal = this.modalCtrl.create(CommunityModifyPage, {
                id: data.id,
                mode: data.mode
              });
              myModal.onDidDismiss(data => {});
              myModal.present();
            }
            if (data.mode === "myqna") {
              //문의하기
              let myModal = this.modalCtrl.create(QnaReadPage, { id: data.id });
              myModal.onDidDismiss(data => {});
              myModal.present();
            }
            if (data.mode === "alarm") {
              //내 알람페이지
              let myModal = this.modalCtrl.create(AlarmTestPage, {
                id: data.id,
                mode: data.mode
              });
              myModal.onDidDismiss(data => {});
              myModal.present();
            }
          }); 
        } else {
          // 앱 안에서 클릭했을시
          if (data.mode === "qna" || data.mode === "note") {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: "OK",
              message:
                "작성하신 게시물에 댓글이 등록되었습니다. \n" +
                data.aps.alert.title +
                "\n" +
                data.aps.alert.body,
              duration: 10000
            });
            toast.present();
            console.log("Received in foreground - iOS");
          }

          if (data.mode === "myqna") {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: "OK",
              message:
                "문의하신 게시물에 댓글이 등록되었습니다. \n" +
                data.aps.alert.title +
                "\n" +
                data.aps.alert.body,
              duration: 10000
            });
            toast.present();
            console.log("Received in foreground - iOS");
          }

          if (data.mode === "alarm") {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: "OK",
              message:
                "작성하신 게시물에 댓글이 등록되었습니다. \n" +
                data.aps.alert.title +
                "\n" +
                data.aps.alert.body,
              duration: 10000
            });
            toast.present();
            console.log("Received in foreground - iOS");
          }
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        if (this.userData) {
          this.auth.updatePushToken(this.userData.email, token).subscribe(
            data => {},
            error => {
              console.log("푸쉬토큰 업데이트 실패 : " + JSON.stringify(error));
            }
          );
        }
        console.log("FCM iOS Refresh Token :::::::::::::" + token);
      });
    }
    if (this.platform.is("android")) {
      this.fcm.subscribeToTopic("all");

      this.fcm.getToken().then(token => {
        console.log("FCM Token :::::::::::::" + token);
        if (this.userData) {
          this.auth.updatePushToken(this.userData.email, token).subscribe(
            data => {},
            error => {
              console.log("푸쉬토큰 업데이트 실패 : " + JSON.stringify(error));
            }
          );
        }
      });

      this.fcm.onNotification().subscribe(data => {
        console.log("FCM data ::::::::::::::" + JSON.stringify(data));
        if (data.wasTapped) {
          this.images.alarmTypeUpdate2(data.id).subscribe(data => {
            //앱 밖에서 클릭 했을 경우 처리
            if (data.mode === "qna" || data.mode === "note") {
              let myModal = this.modalCtrl.create(CommunityModifyPage, {
                id: data.id,
                mode: data.mode
              });
              myModal.onDidDismiss(data => {
                this.nav.parent.select(3);
              });
              myModal.present();
              // });
            }
            if (data.mode === "myqna") {
              let myModal = this.modalCtrl.create(QnaReadPage, { id: data.id });
              myModal.onDidDismiss(data => {});
              myModal.present();
              // });
            }
            if (data.mode === "alarm") {
              let myModal = this.modalCtrl.create(AlarmTestPage, {
                id: data.id,
                mode: data.mode
              });
              myModal.onDidDismiss(data => {
                this.nav.parent.select(3);
              });
              myModal.present();
              // });
            }
          }); 
        } else {
          //앱 안에서 클릭 했을 경우 처리
          if (data.mode === "qna" || data.mode === "note") {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: "OK",
              message:
                "작성한 게시물에 댓글이 등록되었습니다. \n" +
                data.title +
                "\n" +
                data.body,
              duration: 10000
            });
            toast.present();
          }
          if (data.mode === "myqna") {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: "OK",
              message:
                "문의하신 게시물에 댓글이 등록되었습니다. \n" +
                data.title +
                "\n" +
                data.body,
              duration: 10000
            });
            toast.present();
            console.log("Received in foreground - android");
          }
          if (data.mode === "alarm") {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: "OK",
              message:
                "작성한 게시물에 댓글이 등록되었습니다. \n" +
                data.title +
                "\n" +
                data.body,
              duration: 10000
            });
            toast.present();
          }
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("FCM Refresh Token :::::::::::::" + token);
        if (this.userData) {
          this.auth.updatePushToken(this.userData.email, token).subscribe(
            data => {},
            error => {
              console.log("푸쉬토큰 업데이트 실패 : " + JSON.stringify(error));
            }
          );
        }
      });
    }
  }

  public compareAppVersion() {
    this.appCheck = true;
    this.auth.compareAppVersion().subscribe(
      data => {
        if (this.platform.is('android')) {
          if (this.currentAppVer === data.androidAppVersion) {
            console.log("앱 버전이 같음");
          } else {
            console.log("앱 버전이 다름");
            this.showAlertUpdate(
              "업데이트",
              "새로운 버전이 <br> 업데이트 되었습니다."
            );
          }
        } else if (this.platform.is('ios')) {
          if (this.currentAppVer === data.iosAppVersion) {
            console.log("앱 버전이 같음");
          } else {
            console.log("앱 버전이 다름");
            this.showAlertUpdate(
              "업데이트",
              "새로운 버전이 <br> 업데이트 되었습니다."
            );
          }
        }
        
      },
      error => {
        console.log("앱 버전 불러 오기 실패" + JSON.stringify(error));
      }
    );
  }

  showAlertUpdate(title, message) {
    let alertUpdate = this.alertCtrl.create({
      cssClass: "push_alert_cancel2",
      message: message,
      buttons: [
        {
          text: "다음에하기",
          handler: () => {
            console.log("업데이트 다음에 하기");
          }
        },
        {
          text: "업데이트",
          handler: () => {
            if (this.platform.is("ios")) {
              window.open(
                "https://itunes.apple.com/app/id1470360506",
                "_system"
              );
            } else if (this.platform.is("android")) {
              window.open(
                "https://play.google.com/store/apps/details?id=com.g1p.plinic&hl=ko",
                "_system"
              );
            }
          }
        }
      ]
    });
    alertUpdate.present();
  }

  getPopupList() {
    this.images.getPopupList().subscribe((data) => {
      setTimeout(() => {
        this.popupData = data;
      }, 300);
    },err=>{
      alert("데이터 에러 발생");
    })
  }

  showAlertProduct_android(title, message) {
    this.popupData;
    var filename = this.popupData.filename;
    console.log(this.popupData.filename);
    let alertUpdate = this.alertCtrl.create({
      cssClass: "push_alert_product2_android",

      message:
        // '<img class="product_android" src="assets/img/home/popup.png" />',
        '<img class="product_android" *ngIf="popupData" src="https://plinic.s3.ap-northeast-2.amazonaws.com/'+this.popupData.filename+'"/>',

      inputs: [
        {
          type: "checkbox",
          label: "3일간 보지 않기",
          // value:'check',
          handler: data => {
            if (data.checked) {
              var userPopup = {
                checked: data.checked,
                date: new Date().toISOString()
              };
              this.auth.setHomePopUpCheck(userPopup);
            } else {
              this.auth.setHomePopUpCheck(null);
            }
          }
        },
        {
          type: "text",
          label: "닫기",
          handler: () => {
            console.log("닫기버튼 선택");
            alertUpdate.dismiss();
          }
        }
      ],
      // buttons: [
      //   {
      //     text: "회원혜택 보러가기",
      //     handler: () => {
      //       this.auth.setPointShoptab(1);
      //       this.nav.parent.select(2);
      //       // this.openBrowser_android(
      //       //   "https://smartstore.naver.com/plinic",
      //       //   "플리닉"
      //       // );
      //     }
      //   }
      // ]
    });
    alertUpdate.present();
  }

  showAlertProduct_ios(title, message) {
    let alertUpdate = this.alertCtrl.create({
      cssClass: "push_alert_product2_ios",

      message:
        // '<img class="product_ios" src="assets/img/home/popup.png" />',
        '<img class="product_ios" *ngIf="popupData" src="https://plinic.s3.ap-northeast-2.amazonaws.com/'+this.popupData.filename+'"/>',

      inputs: [
        {
          type: "checkbox",
          label: "3일간 보지 않기",
          handler: data => {
            if (data.checked) {
              var userPopup = {
                checked: data.checked,
                date: new Date().toISOString()
              };
              this.auth.setHomePopUpCheck(userPopup);
            } else {
              this.auth.setHomePopUpCheck(null);
            }
          }
        },
        {
          type: "text",
          label: "닫기",
          handler: () => {
            console.log("닫기버튼 선택");
            alertUpdate.dismiss();
          }
        }
      ],
      // buttons: [
      //   {
      //     text: "회원혜택 보러가기",
      //     handler: () => {
      //       this.auth.setPointShoptab(1);
      //       this.nav.parent.select(2);
      //       // this.openBrowser_android(
      //       //   "https://smartstore.naver.com/plinic",
      //       //   "플리닉"
      //       // );
      //     }
      //   }
      // ]
    });
    alertUpdate.present();
  }

  getCovertKoreaTime(time) {
    return new Date(
      new Date(time).getTime() - new Date().getTimezoneOffset() * 60000
    ).toISOString();
  }

  //20201016 페이지 개발용 화장품 임시
  productMain() {
    this.nav.push(SkinChekCamera5Page);
  }

  androidBackButton() {
    if (this.platform.is("android")) {
      this.platform.registerBackButtonAction(() => {
        console.log("백버튼 호출");
        this.auth.getUserStoragetab().then(result => {
          if (result === 0) {
            let alert = this.alertCtrl.create({
              cssClass: "push_alert_cancel",
              title: "plinic",
              message: "앱을 종료하시겠습니까?",
              buttons: [
                {
                  text: "취소",
                  role: "cancel",
                  handler: () => {
                    console.log("취소");
                    this.isExitApp = false;
                  }
                },
                {
                  text: "종료",
                  handler: () => {
                    console.log("확인"), this.platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
                  }
                }
              ]
            });
            if (!this.isExitApp) {
              alert.present();
              this.isExitApp = true;
            }
          }
        });
      });
    }
  }

  goToAddress() {
    this.nav.push(OrderSucessCardPage);
  }
  goToReward() {
    this.nav.push(RewardPage);
  }

  unixTimStamptoKist(t) {
    var date = new Date(1614213300 * 1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();

    console.log(year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2));
  }

  getBeautyMovie() {
    this.images.getBeautyMovie().subscribe(data => {
      this.movieData = data
      if (data) {
        var k = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].items.length > 0) {
            this.youTubeArrayData[k] = data[i].items[0];
            k++;
            this.getOneMovieData(data[i].items[0].id, i);
          }
        }
      }
    });
  }

  getOneMovieData(movieId, index) {
    this.images.getOneBeautyMovie(movieId).subscribe(data=> {
      this.videoDetailData[index] = data;
    });
  }

  public openMoviePage(youTubeData) {
    let myModal = this.modalCtrl.create(SungwooBeautyPage, { youTubeData: youTubeData});
    myModal.onDidDismiss(data => {
    });
    myModal.present();

  }

  goToPoinZone() {
    this.nav.parent.select(2);
  }

  orderDetailPage() {
    this.nav.push(OrderDetailPage, {}).then(() => {
      this.nav.getActive().onDidDismiss(data => {
        console.log("배송 조회 페이지 닫힘");
      });
    });
  }

  goToTemplate() {
    this.nav.push(BleTestPage);
  }

  isPlinicUser(email) {
    this.images.isPlinicUser(email).subscribe(data => {
      this.checkPlinicUser = data;
      if (this.checkPlinicUser !== '') {
        console.log(this.checkPlinicUser.email + " : 정상 사용자 존재함");
      } else {
        this.auth.logout().then(() => {
          this.app.getRootNav().setRoot(LoginpagePage);
        });
      }
      this.auth.giveupMember(email).subscribe(data => {
      });
    }, error => {
      this.auth.logout().then(() => {
        this.app.getRootNav().setRoot(LoginpagePage);
      });
    })
  }

  ingCarezone(missionId) {
    this.nav.push(ChalMissionIngPage, { carezoeId: missionId }).then(() => {
      this.nav.getActive().onDidDismiss(data => {
        console.log("진행중인 챌린치 창이 닫힘");
        if (this.userData) {
          this.challengeChkMission(this.userData.email);
        }
      });
    });
  }


}
