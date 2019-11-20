import { IonicPage, App } from 'ionic-angular';
import { Component, Inject } from '@angular/core';
import { NavController, Platform, AlertController, ModalController, Loading, LoadingController, ViewController, Events, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { SkinChartPage } from '../skin-chart/skin-chart'
import { CareZonePage } from '../care-zone/care-zone'
import { SkinMeasureStartPage } from '../skin-measure-start/skin-measure-start'
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { TranslateService } from 'ng2-translate/ng2-translate'
import { TabsPage } from '../tabs/tabs'
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing'
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start'
import { CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end'
import { DOCUMENT } from '@angular/common';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ImageLoader } from 'ionic-image-loader';
import { CallNumber } from '@ionic-native/call-number';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { BeautyTipAddPage } from '../beauty-tip-add/beauty-tip-add';
import { PlinicManualPage } from '../myinfo/details/plinic-manual/plinic-manual';
import { SkinDiagnoseMoisturePage } from '../skin-diagnose-moisture/skin-diagnose-moisture';
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture';
import { CommunityModifyPage } from '../community/community-modify/community-modify';
import { CommunityPage } from '../community/community';
import { QnaReadPage } from '../myinfo/details/qna/qna-read/qna-read'
import { Observable } from 'rxjs/Rx';
import { FCM } from '@ionic-native/fcm';
import { SearchPage } from '../community/search/search';





@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData: any;
  bannerData: any;
  imageUrl: any;
  carezoneData: any;
  missionData: any;
  missionID: any;
  jwtHelper: JwtHelper = new JwtHelper();
  careDataOBJ: any;
  first_carezone_title: any;
  first_carezone_body: any;
  first_carezone__id: any;
  first_carezone_missioncount: any;
  first_carezone_maxmember: any;
  first_carezone_startDate: Date;
  second_carezone_title: any;
  second_carezone_body: any;
  second_carezone__id: any;
  // second_carezone_missioncount: any;
  second_carezone_missioncount: Array<any> = new Array<any>();
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
  beauty_data_type2: any;
  beauty_data_title2: any;
  beauty_data_id2: any;
  beauty_data_url2: any;
  beauty_data_type3: any;
  beauty_data_title3: any;
  beauty_data_id3: any;
  beauty_data_url3: any;
  beauty_data_type4: any;
  beauty_data_title4: any;
  beauty_data_id4: any;
  beauty_data_url4: any;
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

  // displayTime: any;
  displayTime: Array<any> = new Array<any>();
  displayTime2: any;
  secondsRemaining: any = 1000000;
  secondsRemaining2: any = 2000000;
  runTimer: boolean = true;

  subscriptionTimer: any;
  subscriptionTimer2: any;
  // timeremaining: any;
  timeremaining: Array<any> = new Array<any>();
  timeremaining2: any;

  endmission: Array<any> = new Array<any>();
  startmission: Array<any> = new Array<any>();

  first_missionMemberData: any;
  missionmember: Array<any> = new Array<any>();
  second_missionMemberData: any;



  constructor(
    private fcm: FCM,
    public toastCtrl: ToastController,
    public platform: Platform, public nav: NavController, public auth: AuthService, public _kakaoCordovaSDK: KakaoCordovaSDK,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, private images: ImagesProvider, private modalCtrl: ModalController,
    public translateService: TranslateService, public bluetoothle: BluetoothLE, public viewCtrl: ViewController,
    private themeableBrowser: ThemeableBrowser, private imageLoader: ImageLoader, public app: App, private callNumber: CallNumber
    , @Inject(DOCUMENT) document, public events: Events) {
    this.platform.ready().then((readySource) => {

      // this.currentDate = new Date().toISOString();

      // this.loadItems();
      this.bannerData = this.roadbanner();
      //this.roadcareZone();
      // this.firstCarezoneData = this.firstLoadCareZone();
      // this.secondCarezoneData = this.secondLoadCareZone();
      // this.thirdCarezoneData = this.thirdLoadCareZone();
      // this.roadbeauty();
      // this.timerTick();
      // this.timerTick2();


      if (this.skin_diagnose_first_check === null || false) {
        this.auth.setUserStoragediagnose_first_check(this.skin_diagnose_first_check);
        // console.log("===================="+this.skin_diagnose_first_check);
      }
      if (this.auth.bluetooth_connect() == true) {
        //this.nav.push(SkinChartPage);
      }


      this.platform.registerBackButtonAction(() => {
        let nav = app._appRoot._getActivePortal() || app.getActiveNav();
        let activeView = nav.getActive();

        console.log("activeView.name===================" + activeView.name);

        if (activeView != null) {
          if (this.nav.canGoBack()) {
            this.nav.pop();
          }
          else if (activeView.isOverlay) {
            activeView.dismiss();
          }
          else {
            // backgroundMode.moveToBackground();
            if (activeView.name === 'QnaPage'
              || activeView.name === 'QnaReadPage'
              || activeView.name === 'PersonalinfoPage'
              || activeView.name === 'PlinicManualPage'
              || activeView.name === 'MarketingPage'
              || activeView.name === 'BluetoothConnectIngPage'
              || activeView.name === 'BluetoothDisconnectPage'
              || activeView.name === 'TermsPage'
              || activeView.name === 'NoticePage'
              || activeView.name === 'CareZoneMissionStartPage'
              || activeView.name === 'CareZoneMissionIngPage'
              || activeView.name === 'CareZoneMissionDeadlineEndPage'
              || activeView.name === 'CareZoneMissionDeadlinePage'
              || activeView.name === 'CareZoneMissionCompletePage'
              || activeView.name === 'MyPage'
              || activeView.name === 'MyCommunityModifyPage'
              || activeView.name === 'SettingPage'
            ) {
              console.log("activeView.name===================111111111000000");
              activeView.dismiss();
            }
            else if (
              activeView.name === 'CareZonePage'
              || activeView.name === 'CommunityPage'
              || activeView.name === 'MyinfoPage'
            ) {
              console.log("activeView.name===================22222222000000");
              this.nav.parent.select(0);
            }
            else {
              let alert = this.alertCtrl.create({
                cssClass: 'push_alert_cancel',
                title: "plinic",
                message: "앱을 종료하시겠습니까?",
                buttons: [
                  {
                    text: '취소',
                    role: 'cancel',
                    handler: () => {
                      console.log('취소');
                    }
                  },
                  {
                    text: '확인',
                    handler: () => {
                      console.log('확인'),
                        this.platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
                    }
                  }]
              });
              alert.present();
            }
          }
        }
      });

      if (this.platform.is('ios')) {
        this.fcm.subscribeToTopic('plinic');

        this.fcm.getToken().then(token => {
          console.log("FCM iOS Token :::::::::::::" + token);
        })

        this.fcm.onNotification().subscribe((data) => {
          if (data.wasTapped) {
            //커뮤니티 (뷰티노트, 피부고민 알림 처리)
            if (data.mode === 'qna' || data.mode === 'note') {
              // this.nav.parent.select(3).then(() => {
              let myModal = this.modalCtrl.create(CommunityModifyPage, { id: data.id, mode: data.mode });
              myModal.onDidDismiss(data => {
                // this.ionViewWillEnter();
                // this.nav.parent.select(3)
              });
              myModal.present();
              // });
            }
            if (data.mode === 'myqna') {  //문의하기
              // this.nav.parent.select(4).then(() => {
              let myModal = this.modalCtrl.create(QnaReadPage, { id: data.id });
              myModal.onDidDismiss(data => {
                // this.ionViewWillEnter();
              });
              myModal.present();
              // });
            }
          } else {
            if (data.mode === 'qna' || data.mode === 'note') {
              const toast = this.toastCtrl.create({
                showCloseButton: true,
                closeButtonText: 'OK',
                message: "작성한 게시물에 댓글이 등록되었습니다. \n" + data.aps.alert.title + '\n' + data.aps.alert.body,
                duration: 10000
              });
              toast.present();
              console.log("Received in foreground - iOS");
            };

            if (data.mode === 'myqna') {
              const toast = this.toastCtrl.create({
                showCloseButton: true,
                closeButtonText: 'OK',
                message: "문의하신 게시물에 댓글이 등록되었습니다. \n" + data.aps.alert.title + '\n' + data.aps.alert.body,
                duration: 10000
              });
              toast.present();
              console.log("Received in foreground - iOS");
            }
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          console.log("FCM iOS Refresh Token :::::::::::::" + token);
        });
      }
      if (this.platform.is('android')) {
        console.log("android platform");
        this.fcm.subscribeToTopic('all');

        this.fcm.getToken().then(token => {
          console.log("FCM Token :::::::::::::" + token);
        })

        this.fcm.onNotification().subscribe(data => {
          console.log("FCM data ::::::::::::::" + JSON.stringify(data));
          if (data.wasTapped) {
            if (data.mode === 'qna' || data.mode === 'note') {
              // this.nav.parent.select(3).then(() => {
              let myModal = this.modalCtrl.create(CommunityModifyPage, { id: data.id, mode: data.mode });
              myModal.onDidDismiss(data => {
                // this.ionViewWillEnter();
                this.nav.parent.select(3)
              });
              myModal.present();
              // });
            }
            if (data.mode === 'myqna') {
              // this.nav.parent.select(4).then(() => {
              let myModal = this.modalCtrl.create(QnaReadPage, { id: data.id });
              myModal.onDidDismiss(data => {
                // this.ionViewWillEnter();
              });
              myModal.present();
              // });
            }
          } else {
            if (data.mode === 'qna' || data.mode === 'note') {
              const toast = this.toastCtrl.create({
                showCloseButton: true,
                closeButtonText: 'OK',
                message: "작성한 게시물에 댓글이 등록되었습니다. \n" + data.title + '\n' + data.body,
                duration: 10000
              });
              toast.present();
            }
            if (data.mode === 'myqna') {
              const toast = this.toastCtrl.create({
                showCloseButton: true,
                closeButtonText: 'OK',
                message: "문의하신 게시물에 댓글이 등록되었습니다. \n" + data.title + '\n' + data.body,
                duration: 10000
              });
              toast.present();
              // this.showAlert(JSON.stringify(data.aps.alert));
              console.log("Received in foreground - android");
            }
          }
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          console.log("FCM Refresh Token :::::::::::::" + token);
        });
      }


    });
  }


  ionViewDidLoad() {
    this.skin_first_check();
    this.skin_first_moisture_score();
    this.skin_first_oil_score();
    this.skin_oil_score();
    this.skin_moisture_score();
  }

  ionViewWillLeave() {
    this.subscriptionTimer.complete();
    this.subscriptionTimer2.complete();
    console.log("Timer Clear!");
  }

  public community_qna_modify(id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, { id: id, mode: 'qna' });
    myModal.present();
  }

  public skinQnaLoad() {
    this.images.skinQnaLoad().subscribe(data => {
      this.skinQnaData = data;
    });
  }

  public skin_first_check() {
    this.auth.getUserStoragediagnose_first_check().then(items => {
      this.skin_diagnose_first_check = items;
      // console.log("skin_diagnose_first_check========" + this.skin_diagnose_first_check);
      //console.log("items" + items);
    });
  }

  public skin_moisture_score() {
    this.auth.getUserStoragediagnose_moisture().then(items => {
      this.all_moisture_score = items;
      this.all_total_score += this.all_moisture_score / 2;
      // console.log("all_moisture_score==========" + this.all_moisture_score);
      // console.log("all_total_score=========" + this.all_total_score);
      //console.log("items" + items);
    });
  }

  public skin_oil_score() {
    this.auth.getUserStoragediagnose_oil().then(items => {
      this.all_oil_score = items;
      this.all_total_score += this.all_oil_score / 2;
      // console.log("all_oil_score=========" + this.all_oil_score);
      // console.log("all_total_score=========" + this.all_total_score);
      //console.log("items" + items);
    });
  }

  public skin_first_moisture_score() {
    this.auth.getUserStoragediagnose_first_moisture().then(items => {
      this.all_first_moisture_score = items;
      this.all_first_total_score += this.all_first_moisture_score / 2;
      // console.log("all_first_moisture_score==========" + this.all_first_moisture_score);
      // console.log("all_first_total_score==========" + this.all_first_total_score);
      //console.log("items" + items);
    });
  }

  public skin_first_oil_score() {
    this.auth.getUserStoragediagnose_first_oil().then(items => {
      this.all_first_oil_score = items;
      this.all_first_total_score += this.all_first_oil_score / 2;
      // console.log("all_first_oil_score=======" + this.all_first_oil_score);
      // console.log("all_first_total_score=======" + this.all_first_total_score);
      //console.log("items" + items);
    });
  }



  public skin_measure() {
    // let alert = this.alertCtrl.create({
    //   cssClass: 'push_alert',
    //   title: "plinic",
    //   message: "준비중입니다.",
    //   buttons: [{
    //     text: '확인'
    //   }]
    // });
    // alert.present();
    if (this.skin_diagnose_first_check) {
      let myModal = this.modalCtrl.create(SkinDiagnoseMoisturePage);
      myModal.present();
    }
    else {
      let myModal = this.modalCtrl.create(SkinDiagnoseFirstMoisturePage);
      myModal.present();
    }
  }

  public beauty_add() {
    // this.nav.push(BeautyTipAddPage);
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: "plinic",
      message: "준비중입니다.",
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }

  public plinic_manual() {
    this.nav.push(PlinicManualPage);
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
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          // this.thumb_image = false;
        } else {
          // this.thumb_image = true;
        }
        this.chkmission(this.userData.email);


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
        };
        this.chkmission(this.userData.email);

      }
      this.auth.getSkinScore(this.userData.email).subscribe(items => {
        this.skinScoreData = items;

        if (items !== '') {
          this.skinScoreChk = true;
          var i = (parseInt(this.skinScoreData.score.length) - 1);
          // console.log("ii" + i);
          var k = (parseInt(this.skinScoreData.score.length) - 2);
          // console.log("kk" + i);

          if (i >= 0) {

            this.circle_moisture = this.skinScoreData.score[i].moisture;
            this.circle_oil = this.skinScoreData.score[i].oil;
            this.circle_date = this.skinScoreData.score[i].saveDate.substr(0, 10);

            this.total_score = (parseInt(this.circle_moisture) + parseInt(this.circle_oil)) / 2;
            // console.log("total :" + this.total_score);

          }
          if (k >= 0) {
            this.pre_circle_moisture = this.skinScoreData.score[k].moisture;
            this.pre_circle_oil = this.skinScoreData.score[k].oil;
            this.pre_circle_date = this.skinScoreData.score[k].saveDate.substr(0, 10);

            this.pre_total_score = (parseInt(this.pre_circle_moisture) + parseInt(this.pre_circle_oil)) / 2;
            // console.log("pre_total :" + this.pre_total_score);

          }
          // console.log("this.circle_moisture" + this.circle_moisture);

          // console.log("moisture:::::::" + this.skinScoreData.score[i].moisture);
          // console.log("oil:::::::" + this.skinScoreData.score[i].oil);
        }
      });
    });
  }


  openBrowser_ios(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    browser.insertCss({
      file: 'assets/img/close.png',
      code: '.navbar-fixed-top {display: block !important;}'
    });
    browser.reload();
    browser.on('closePressed').subscribe(data => {
      browser.close();
    })
  }

  openBrowser_android(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    browser.insertCss({
      file: 'assets/img/close.png',
      code: '.navbar-fixed-top {display: block !important;}'
    });
    browser.reload();
    browser.on('closePressed').subscribe(data => {
      browser.close();
    })
  }


  ionViewWillEnter() {
    this.loadItems();
    this.skinQnaLoad();
    this.firstCarezoneData = this.firstLoadCareZone();
    this.secondCarezoneData = this.secondLoadCareZone();
    // this.thirdCarezoneData = this.thirdLoadCareZone();
    this.roadbeauty();
    this.timerTick();
    this.timerTick2();
    // console.log("Enter Home");
    //this.nav.parent.select(0);
    //this.loadItems();
    // this.showLoading();
    //this.bannerData = this.roadbanner();
    //this.roadcareZone();
    //this.roadbeauty();
    //this.loading.dismiss();
    //this.nav.setRoot(TabsPage);
    // console.log("End Home");
  }

  ionViewDidEnter() {
    // this.auth.registerSnS();

    // this.translateService.get('helloWorld').subscribe(
    //   hi => {
    //     let alert = this.alertCtrl.create({
    //       title: hi,
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   }beauty_add
    // )

  }


  public customer_service() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: "고객센터",
      message: "언제나 친절히 모시겠습니다. <br> 오전10시 ~ 오후 5시 <br>( 점심시간 12시~1시 )",
      buttons: [{
        text: '연결하기',
        handler: () => {
          // console.log('연결하기'),
          //02.2038.4876
          this.callNumber.callNumber("18334870", true)
        }
      }]
    });
    alert.present();
  }


  public moisture_help() {
    // console.log('view');
    document.getElementById("view").style.display = "block";
  }


  public close() {
    // console.log('close');
    document.getElementById("view").style.display = "none";
    // document.getElementById("view2").style.display = "none";
  }

  openBasicModal() {
    if (this.platform.is('android')) {
      let myModal = this.modalCtrl.create(SkinMeasureStartPage);
      myModal.present();
    }

    if (this.platform.is('ios') || this.platform.is('core')) {
      // this.showAlert("ios 블루투스 기능 준비 중입니다. <br />감사합니다.")
      let myModal = this.modalCtrl.create(SkinMeasureStartPage);
      myModal.present();
    }

  }
  openModalWithParams() {
    let myModal = this.modalCtrl.create(SkinMeasureStartPage, { 'myParam': "test" });
    myModal.present();
  }



  public roadbanner() {
    this.images.bannerRoad().subscribe(data => {
      this.bannerData = data;
    });
  }

  public diffdate(date1: Date = new Date(), date2: Date = new Date()) {
    return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
  }

  //20190617 미션 참여자 인원 count
  public first_missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
      // console.log(data);
    });

    // this.images.getMissionMember(id).subscribe(data => {
    //   this.first_missionMemberData = data;
    // });

  }

  //20190617 미션 참여자 인원 count
  public second_missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
      this.second_carezone_missioncount = data;
      this.secondCount++;

    });

    this.images.getMissionMember(id).subscribe(data => {
      this.second_missionMemberData = data;
    });
  }

  //20190617 미션 참여자 인원 count
  public third_missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
      this.third_carezone_missioncount = data;
    });
  }

  public firstLoadCareZone() {
    this.images.first_carezoneRoad().subscribe(data => {
      this.firstCarezoneData = data;

      if (data !== '') {
        for (let i = 0; i < data.length; i++) {

          this.images.missionCount(data[i]._id).subscribe(counter => {
            this.missionCounter[i] = counter;
            // console.log(this.missionCounter[i]);
          });

          this.timeremaining[i] = (new Date(data[i].endmission).getTime() - new Date().getTime()) / 1000;
          // this.timeremaining = (new Date(data[0].endmission).getTime() - new Date().getTime()) / 1000;
        }
      }

      for (let i = 0; i < data.length; i++) {
        //미션별로 참여자 수 구하기



        this.images.getMissionMember(data[i]._id).subscribe(data3 => {
          if (data3 !== '') {
            this.missionmember[i] = data3;
            // for (var k = 0; k < data3.length; k++) {
            //   this.memberRanking[i] = {
            //     email: data3[k].email,
            //     usetime: data3[k].usetime,
            //     rank: i + 1,
            //     image_url: data3[k].image_url
            //   }
            // }
          }
        });

        this.endmission[i] = new Date(data[i].endmission);

      }
    });
  }

  public secondLoadCareZone() {
    this.images.second_carezoneRoad().subscribe(data => {
      this.secondCarezoneData = data;
      for (let i = 0; i < data.length; i++) {
        this.second_missionCount(data[i]._id);
        this.getthirdday[i] = new Date(data[i].startmission)
        this.timeremaining2 = (new Date(data[i].endmission).getTime() - new Date().getTime()) / 1000;
        if (this.diffdate(this.currentDate, this.getthirdday[i]) > -3 && this.diffdate(this.currentDate, this.getthirdday[i]) < -2) {
          this.images.missionCount(data[i]._id).subscribe(data2 => {
            this.missionCounter2[i] = data2;
            this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)

            if (this.percent[i] <= 50) {
              this.ingmdchuchun[i] = true;
              this.ingapproaching[i] = false;
            }
            if (this.percent[i] > 50) {
              this.ingmdchuchun[i] = false;
              this.ingapproaching[i] = true;
            }
          });
        } else if (this.diffdate(this.currentDate, this.getthirdday[i]) > -2 && this.diffdate(this.currentDate, this.getthirdday[i]) < -1) {
          // console.log("D-111111111111");
          this.images.missionCount(data[i]._id).subscribe(data2 => {
            this.missionCounter2[i] = data2;
            //console.log("최대인원 백분율 구하기 : " + parseInt(data[i].maxmember));
            //console.log("참여인원 백분율 구하기 : " + parseInt(this.missionCounter[i]));
            this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
            //console.log(this.percent[i])

            if (this.percent[i] <= 50) {
              //console.log("MD추천");
              this.ingmdchuchun[i] = true;
              this.ingapproaching[i] = false;
            }
            if (this.percent[i] > 50) {
              //console.log("마감임박");
              this.ingmdchuchun[i] = false;
              this.ingapproaching[i] = true;
            }
          });
        } else if (this.diffdate(this.currentDate, this.getthirdday[i]) > -3 && this.diffdate(this.currentDate, this.getthirdday[i]) <= 0) {
          // console.log("모집중 ");
          this.images.missionCount(data[i]._id).subscribe(data2 => {
            this.missionCounter2[i] = data2;
            // console.log("최대인원 백분율 구하기 : " + parseInt(data[i].maxmember));
            // console.log("참여인원 백분율 구하기 : " + parseInt(this.missionCounter[i]));
            this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
            // console.log(this.percent[i])

            if (this.percent[i] <= 50) {
              // console.log("MD추천");
              this.ingmdchuchun[i] = true;
              this.ingapproaching[i] = false;
            }
            if (this.percent[i] > 50) {
              // console.log("마감임박");
              this.ingmdchuchun[i] = false;
              this.ingapproaching[i] = true;
            }
          });

        } else {
          // this.new[i] = false;thirdLoadCareZone
          // this.recruiting[i] = true;
          // this.mdchuchun[i] = false;
          // this.approaching[i] = false;
          // this.endrecruit[i] = false;
        }
      }

      // this.first_missionCount(data[0]._id);
    });
  }

  public thirdLoadCareZone() {
    this.images.third_carezoneRoad().subscribe(data => {
      this.thirdCarezoneData = data;
      if (data !== '') {
        if (data[0]._id !== "" || data[0]._id !== undefined || data[0].id !== null) {
          this.third_missionCount(data[0]._id);
          this.getday = new Date(data[0].startmission);
          this.dday = this.diffdate(this.getday, this.currentDate);
          // this.chkDay = this.dday
          this.dday = (parseInt(this.dday) - 2)
        }
      }

    });
  }


  public roadcareZone() {
    // this.images.maincarezoneRoad().subscribe(data => {
    //   //console.log(data);
    //   this.first_carezone_title = data[0].title;
    //   this.first_carezone_body = data[0].body;
    //   this.first_carezone__id = data[0]._id;
    //   this.first_missionCount(data[0]._id);
    //   this.first_carezone_maxmember = (data[0].maxmember);
    //   this.first_carezone_startDate = new Date(data[0].startmission);
    //   this.second_carezone_title = data[1].title;
    //   this.second_carezone_body = data[1].body;
    //   this.second_carezone__id = data[1]._id;
    //   this.second_missionCount(data[1]._id);
    //   this.second_carezone_maxmember = (data[1].maxmember);
    //   this.second_carezone_startDate = new Date(data[1].startmission);
    //   this.third_carezone_title = data[2].title;
    //   this.third_carezone_body = data[2].body;
    //   this.third_carezone__id = data[2]._id;
    //   this.third_missionCount(data[2]._id);
    //   this.third_carezone_maxmember = (data[1].maxmember);
    //   this.third_carezone_startDate = new Date(data[2].startmission);
    //   // this.currentDate = new Date();
    //   // this.currentDate.setDate( this.currentDate.getDate() + 2 );
    //
    //   if (this.diffdate(this.currentDate, this.first_carezone_startDate) < -10) {
    //     this.new = true;
    //     this.recruiting = true;
    //     this.mdchuchun = false;
    //     this.approaching = false;
    //     this.endrecruit = false;
    //   } else if (this.diffdate(this.currentDate, this.first_carezone_startDate) < -7) {
    //     this.new = false;
    //     this.recruiting = true;
    //     this.mdchuchun = true;
    //     this.approaching = false;
    //     this.endrecruit = false;
    //   } else if (this.diffdate(this.currentDate, this.first_carezone_startDate) < -3 || this.diffdate(this.currentDate, this.first_carezone_startDate) < 0) {
    //     this.new = false;
    //     this.recruiting = true;
    //     this.mdchuchun = false;
    //     this.approaching = true;
    //     this.endrecruit = false;
    //   } else if (this.diffdate(this.currentDate, this.first_carezone_startDate) >= 0) {
    //     this.new = false;
    //     this.recruiting = false;
    //     this.mdchuchun = false;
    //     this.approaching = false;
    //     this.endrecruit = true;
    //   } else {
    //     this.new = false;
    //     this.recruiting = true;
    //     this.mdchuchun = false;
    //     this.approaching = false;
    //     this.endrecruit = false;
    //   }
    //
    //
    //   if (this.diffdate(this.currentDate, this.second_carezone_startDate) < -10) {
    //     this.second_new = true;
    //     this.second_recruiting = true;
    //     this.second_mdchuchun = false;
    //     this.second_approaching = false;
    //     this.second_endrecruit = false;
    //   } else if (this.diffdate(this.currentDate, this.second_carezone_startDate) < -7) {
    //     this.second_new = false;
    //     this.second_recruiting = true;
    //     this.second_mdchuchun = true;
    //     this.second_approaching = false;
    //     this.second_endrecruit = false;
    //   } else if (this.diffdate(this.currentDate, this.second_carezone_startDate) < -3 || this.diffdate(this.currentDate, this.second_carezone_startDate) < 0) {
    //     this.second_new = false;
    //     this.second_recruiting = true;
    //     this.second_mdchuchun = false;
    //     this.second_approaching = true;
    //     this.second_endrecruit = false;
    //   } else if (this.diffdate(this.currentDate, this.second_carezone_startDate) >= 0) {
    //     this.second_new = false;
    //     this.second_recruiting = false;
    //     this.second_mdchuchun = false;
    //     this.second_approaching = false;
    //     this.second_endrecruit = true;
    //   } else {
    //     this.second_new = false;
    //     this.second_recruiting = true;
    //     this.second_mdchuchun = false;
    //     this.second_approaching = false;
    //     this.second_endrecruit = false;
    //   }
    //
    //   if (this.diffdate(this.currentDate, this.third_carezone_startDate) < -10) {
    //     this.third_new = true;
    //     this.third_recruiting = true;
    //     this.third_mdchuchun = false;
    //     this.third_approaching = false;
    //     this.third_endrecruit = false;
    //   } else if (this.diffdate(this.currentDate, this.third_carezone_startDate) < -7) {
    //     this.third_new = false;
    //     this.third_recruiting = true;
    //     this.third_mdchuchun = true;
    //     this.third_approaching = false;
    //     this.third_endrecruit = false;
    //   } else if (this.diffdate(this.currentDate, this.third_carezone_startDate) < -3 || this.diffdate(this.currentDate, this.third_carezone_startDate) < 0) {
    //     this.third_new = false;
    //     this.third_recruiting = true;
    //     this.third_mdchuchun = false;
    //     this.third_approaching = true;
    //     this.third_endrecruit = false;
    //   } else if (this.diffdate(this.currentDate, this.third_carezone_startDate) >= 0) {
    //     this.third_new = false;
    //     this.third_recruiting = false;
    //     this.third_mdchuchun = false;
    //     this.third_approaching = false;
    //     this.third_endrecruit = true;
    //   } else {
    //     this.third_new = false;
    //     this.third_recruiting = true;
    //     this.third_mdchuchun = false;
    //     this.third_approaching = false;
    //     this.third_endrecruit = false;
    //   }
    //
    //
    //
    //   // if(this.third_carezone_startDate <= this.currentDate){
    //   // } else{
    //   // }
    //
    //
    //
    //
    //   this.carezoneData = data;
    // });
  }

  public roadbeauty() {
    this.images.communityEditorHomeBeautyLoad().subscribe(data => {
      this.beauty_data_type1 = data[0].title;
      this.beauty_data_title1 = data[0].body;
      this.beauty_data_id1 = data[0].filename;
      this.beauty_data_url1 = data[0].posturl;
      this.beauty_data_type2 = data[1].title;
      this.beauty_data_title2 = data[1].body;
      this.beauty_data_id2 = data[1].filename;
      this.beauty_data_url2 = data[1].posturl;
      this.beauty_data_type3 = data[2].title;
      this.beauty_data_title3 = data[2].body;
      this.beauty_data_id3 = data[2].filename;
      this.beauty_data_url3 = data[2].posturl;
      this.beauty_data_type4 = data[3].title;
      this.beauty_data_title4 = data[3].body;
      this.beauty_data_id4 = data[3].filename;
      this.beauty_data_url4 = data[3].posturl;
      this.beautyData = data;
    });
  }

  // public roadbeauty() {
  //   this.images.mainbeautyRoad().subscribe(data => {
  //     this.beauty_data_type1 = data[0].title;
  //     this.beauty_data_title1 = data[0].body;
  //     this.beauty_data_id1 = data[0]._id;
  //     this.beauty_data_url1 = data[0].posturl;
  //     this.beauty_data_type2 = data[1].title;
  //     this.beauty_data_title2 = data[1].body;
  //     this.beauty_data_id2 = data[1]._id;
  //     this.beauty_data_url2 = data[1].posturl;
  //     this.beauty_data_type3 = data[2].title;
  //     this.beauty_data_title3 = data[2].body;
  //     this.beauty_data_id3 = data[2]._id;
  //     this.beauty_data_url3 = data[2].posturl;
  //     this.beauty_data_type4 = data[3].title;
  //     this.beauty_data_title4 = data[3].body;
  //     this.beauty_data_id4 = data[3]._id;
  //     this.beauty_data_url4 = data[3].posturl;
  //     this.beautyData = data;
  //   });
  // }



  public kakao_request() {
    this._kakaoCordovaSDK
      .requestMe().then((res) => {
        //this.showAlert("리퀘스트미 :" + JSON.stringify(res));
      })
  }

  public kakao_scope() {
    let values = {
      targetScopes: ['account_email', 'age_range', 'gender'],
    };

    let userData: any;

    this._kakaoCordovaSDK
      .checkScopeStatus(null)
      .then((res) => {
        this.showAlert("스코프111" + JSON.stringify(res));
      })

  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: text,
      buttons: ['OK']
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

    if (this.missionData === null || this.missionData === undefined) {
      this.nav.push(CareZoneMissionStartPage, { carezoneData: carezoneData });
    } else if (carezoneData._id === this.missionData.missionID) {
      this.nav.push(CareZoneMissionIngPage, { carezoneData: carezoneData });
    } else {
      this.nav.push(CareZoneMissionStartPage, { carezoneData: carezoneData });
    }
  }
  public mission_deadline_end(id) {
    this.nav.push(CareZoneMissionDeadlineEndPage, { _id: id });
  }

  // public logout(){
  //   this.auth.logout();
  // }

  // public roadstorage(){
  //   this.userData = this.auth.getUserInfo();
  //
  // }




  public openCareZoneTab(): void {
    // The second tab is the one with the index = 1
    //this.nav.push(TabsPage, { selectedTab: 1 });
    this.nav.parent.select(1);
  }

  public openCommunityTab1(): void {
    this.nav.parent.select(3);
    this.events.publish('tabs1', "tabs1");
    this.auth.setUserStoragetab(true);
  }

  public openCommunityTab3(): void {
    this.nav.parent.select(3);
    this.events.publish('tabs3', "tabs3");
    this.auth.setUserStoragetab(false);
  }

  //20190617 미션 참여중인지 체크 하기
  public chkmission(email) {
    // this.showLoading();
    //console.log("chkBtn" + this.chkBtn);
    this.images.chkMission(email).subscribe(data => {
      if (data.length <= 0) {
        console.log("챌린지를 완료 했거나 참여중인게 없을때");
        // this.chkBtn = true; //챌린지 미 참여 중일때
      } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].missioncomplete) { //완료하지 못한 미션이 있는 체크
            this.missionData = data[i];
            this.missionID = data[i].missionID;
            // if (this.carezoneData2._id === data[i].missionID) { //완료하지 못한 미션이 현재 미션과 동일한지 체크
            //   this.chkBtn = true; //동일 하면 미션 시작할수 있도록 하고
            // } else {
            //   this.chkBtn = false; //동일하지 않으면 다른 챌림치 참여중이라고 한다.
            // }
          }
        }
      } else {
        console.log("이상한 값이 들어 왔을때 챌린지 참여 안한걸로");
        // this.chkBtn = false;
      }
      // if (data !== '' || data !== null || data !== undefined) {
      //   //this.chkBtn = true;
      //   this.missionData = data;
      //   //this.endDate = data.endmission.substr(0, 10);
      //   //console.log(JSON.stringify(data));
      //   // this.loading.dismiss();
      // } else if (data === '' || data === null || data === undefined) {
      //   //this.chkBtn = false;
      // } else {
      //   this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      // }
    });

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }


  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  getSecondsAsDigitalClock2(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }


  timerTick() {
    this.subscriptionTimer = Observable.interval(1000).subscribe(x => {

      for (var i = 0; i < this.timeremaining.length; i++) {
        this.timeremaining[i]--;
        // console.log(this.timeremaining[i]--);
        this.displayTime[i] = this.getSecondsAsDigitalClock(this.timeremaining[i]);
      }
      // this.timeremaining--;
      // this.displayTime = this.getSecondsAsDigitalClock(this.timeremaining);

    });


    // var timer = setTimeout(() => {
    //   if (!this.runTimer) {
    //     clearTimeout(timer);
    //     console.log("Clear Timeout");
    //     return;
    //   }
    //   this.secondsRemaining--;
    //   this.getSecondsAsDigitalClock(this.secondsRemaining);
    //
    //   if(this.secondsRemaining > 0) {
    //     this.timerTick();
    //   } else {
    //     // this.hasFinished = true;
    //   }
    //
    // }, 1000);
    //
    // if (!this.runTimer) {
    //   clearTimeout(timer);
    //   console.log("Clear Timeout");
    //   return;
    // }
  }

  timerTick2() {
    this.subscriptionTimer2 = Observable.interval(1000).subscribe(x => {
      this.timeremaining2--;
      this.displayTime2 = this.getSecondsAsDigitalClock(this.timeremaining2);

    });
  }

  ingCarezone(missionId) {
    this.nav.push(CareZoneMissionIngPage, { carezoeId: missionId })
  }


  public community_search() {
    let myModal = this.modalCtrl.create(SearchPage);
    myModal.onDidDismiss(data => {

    });
    myModal.present();
  }

}
