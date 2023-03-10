import { IonicPage, App } from 'ionic-angular';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, AlertController, ModalController, Loading, LoadingController, ViewController, Events, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { SkinChartPage } from '../skin-chart/skin-chart'
import { CareZonePage } from '../care-zone/care-zone'
import { SkinMeasureStartPage } from '../skin-measure-start/skin-measure-start'
import { TranslateService } from 'ng2-translate/ng2-translate'
import { TabsPage } from '../tabs/tabs'
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing'
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start'
import { CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end'
import { ChalMissionIngPage } from '../chal-mission-ing/chal-mission-ing';
import { ChalMissionStartPage } from '../chal-mission-start/chal-mission-start';
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
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing'
import { Flip } from 'number-flip'; //?????? ????????? ?????? ??????????????? ?????? 
import { ChulsukCheckPage } from '../chulsuk-check/chulsuk-check'; //?????? ????????? ?????? ??????????????? ?????? 
import { MyinfoPage } from '../myinfo/myinfo'
import { GuidePage } from '../guide/guide'
import { RegistercompletePage } from '../register/registercomplete/registercomplete'
import { RewardPage } from '../reward/reward';
import { textDef } from '@angular/core/src/view';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  flipAnim = null;
  isFlip : boolean = false;

  @ViewChild('numberbtn', { read: ElementRef}) private flipbtn: ElementRef;
  currentAppVer: any = '1.0.11';
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
  beauty_data_type3: any;
  beauty_data_title3: any;
  beauty_data_id3: any;
  beauty_data_url3: any;
  beauty_data_viewId3: any;
  beauty_data_views3: any;
  beauty_data_midtext3: any;
  beauty_data_type4: any;
  beauty_data_title4: any;
  beauty_data_id4: any;
  beauty_data_url4: any;
  beauty_data_viewId4: any;
  beauty_data_views4: any;
  beauty_data_midtext4: any;
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

  constructor(
    private fcm: FCM,
    public toastCtrl: ToastController,
    public platform: Platform, public nav: NavController, public auth: AuthService, public _kakaoCordovaSDK: KakaoCordovaSDK,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, private images: ImagesProvider, private modalCtrl: ModalController,
    public translateService: TranslateService, 
    public viewCtrl: ViewController,
    private themeableBrowser: ThemeableBrowser, private imageLoader: ImageLoader, public app: App, private callNumber: CallNumber
    , @Inject(DOCUMENT) document, public events: Events) {
    this.platform.ready().then((readySource) => {
      // if (this.skin_diagnose_first_check === null || false) {
      //   this.auth.setUserStoragediagnose_first_check(this.skin_diagnose_first_check);
      // }
    });
  }
  
  async ngOnInit() {
    console.log('ngOnInit Home');
    if(this.platform.is('android')) { //??????????????? app.scss??? ????????? ios??? ????????? ?????? ????????? ?????????
      setTimeout(() => {
        this.auth.getHomePopUpCheck().then(result=> {
          if(result != null) {
            let setDate = new Date(result.date);
            setDate.setDate(setDate.getDate()+2);
            if(this.getCovertKoreaTime(setDate).substr(0,10) < this.getCovertKoreaTime(new Date()).substr(0,10)){
              this.showAlertProduct_android('test', 'test'); //??????????????? app.scss??? ????????? ios??? ????????? ?????? ????????? ?????????
            }
          } else {
            this.showAlertProduct_android('test', 'test'); //??????????????? app.scss??? ????????? ios??? ????????? ?????? ????????? ?????????
          } 
        }, error => {
          console.log("?????? ???????????? ?????? : " + error);
        })  
      }, 3000);
    } else {
      setTimeout(() => {
        this.auth.getHomePopUpCheck().then(result=> {
          if(result != null) {
            let setDate = new Date(result.date);
            setDate.setDate(setDate.getDate()+2);
            if(this.getCovertKoreaTime(setDate).substr(0,10) < this.getCovertKoreaTime(new Date()).substr(0,10)){
              this.showAlertProduct_ios('test', 'test'); //??????????????? app.scss??? ????????? ios??? ????????? ?????? ????????? ?????????
            }
          } else {
            this.showAlertProduct_ios('test', 'test'); //??????????????? app.scss??? ????????? ios??? ????????? ?????? ????????? ?????????
          } 
        }, error => {
          console.log("?????? ???????????? ?????? : " + error);
        })
      }, 3000);
    }
  }

  async ionViewDidLoad() {
    await this.loadItems();
    await this.roadbeauty();
    this.firstCarezoneData = await this.firstLoadCareZone();
    this.bannerData = await this.roadbanner();
    this.topbannerLoad();
    if(this.userData) {
      if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
        this.reloadUserPoint(this.userData.snsid);
      }
      else {
        this.reloadUserPoint(this.userData.email);
      }
    }
    if(!this.appCheck) {
      this.compareAppVersion();
    }
    this.auth.setUserStoragetab(0);
  }

  async ionViewWillEnter() {
    await this.skinQnaLoad();
    this.challengeChkMission(this.userData.email);
    if(this.userData) {
      if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
        this.reloadUserPoint(this.userData.snsid);
      }
      else {
        this.reloadUserPoint(this.userData.email);
      }
    }
    this.secondCarezoneData = this.secondLoadCareZone();
    // this.timerTick();
    // this.timerTick2();
  }

  async ionViewDidEnter() {
    this.inItFCM();
    // setTimeout(() => {
    // this.flip();
    // }, 3000)
  }


  ionViewWillLeave() {
    this.isFlip= true;
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
    }
    else {
      let myModal = this.modalCtrl.create(SkinDiagnoseFirstMoisturePage);
      myModal.present();
    }
  }

  public beauty_add() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: "plinic",
      message: "??????????????????.",
      buttons: [{
        text: '??????'
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
          from: items.from,
          snsid: items.snsid
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          // this.thumb_image = false;
        } else {
          // this.thumb_image = true;
        }
        // this.chkmission(this.userData.email); 2020-02-10 ????????? ????????? ???????????? ?????? ??????
        this.challengeChkMission(this.userData.email);
        this.reloadUserPoint(this.userData.snsid);

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
          thumbnail_image: items.thumbnail_image,
        };
        // console.log("totaluserpoint : " + this.userData.totaluserpoint);
        // this.chkmission(this.userData.email); 2020-02-10 ????????? ????????? ???????????? ?????? ??????
        this.challengeChkMission(this.userData.email);
        this.reloadUserPoint(this.userData.email);
      }
      // this.auth.getSkinScore(this.userData.email).subscribe(items => {
      //   this.skinScoreData = items;

      //   if (items !== '') {
      //     this.skinScoreChk = true;
      //     var i = (parseInt(this.skinScoreData.score.length) - 1);
      //     // console.log("ii" + i);
      //     var k = (parseInt(this.skinScoreData.score.length) - 2);
      //     // console.log("kk" + i);

      //     if (i >= 0) {

      //       this.circle_moisture = this.skinScoreData.score[i].moisture;
      //       this.circle_oil = this.skinScoreData.score[i].oil;
      //       this.circle_date = this.skinScoreData.score[i].saveDate.substr(0, 10);

      //       this.total_score = (parseInt(this.circle_moisture) + parseInt(this.circle_oil)) / 2;
      //       // console.log("total :" + this.total_score);

      //     }
      //     if (k >= 0) {
      //       this.pre_circle_moisture = this.skinScoreData.score[k].moisture;
      //       this.pre_circle_oil = this.skinScoreData.score[k].oil;
      //       this.pre_circle_date = this.skinScoreData.score[k].saveDate.substr(0, 10);

      //       this.pre_total_score = (parseInt(this.pre_circle_moisture) + parseInt(this.pre_circle_oil)) / 2;
      //       // console.log("pre_total :" + this.pre_total_score);

      //     }
      //     // console.log("this.circle_moisture" + this.circle_moisture);

      //     // console.log("moisture:::::::" + this.skinScoreData.score[i].moisture);
      //     // console.log("oil:::::::" + this.skinScoreData.score[i].oil);
      //   }
      // });
    });
  }

  openBrowser_ios(url, title, id) {

    this.images.communityBeautyViewsUpdate(id).subscribe(data => {
    });

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#FFFFFF',
        showPageTitle: true,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'right',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'right',
        event: 'forwardPressed'
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

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#FFFFFF',
        showPageTitle: true,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'right',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'right',
        event: 'forwardPressed'
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


  

  showAlertwithCancel(title, message) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel2',
      title: title,
      message: message,
      buttons: [{
        text: '?????????',
        handler: () => {
          console.log('??????????????? ??????');
          this.nav.popToRoot();
          }
        },
        {
          text: '??????????????? ??????',
          handler: () => {
          this.nav.parent.select(1).then(() => this.nav.push(MyinfoPage));
          console.log('????????? ??????');
          }
        }]
    });
    alert.present();
    this.nav.pop().then(() => this.nav.pop())
  }



  public customer_service() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: "????????????",
      message: "????????? ????????? ??????????????????. <br> ??????10??? ~ ?????? 5??? <br>( ???????????? 12???~1??? )",
      buttons: [{
        text: '????????????',
        handler: () => {
          this.callNumber.callNumber("18334870", true)
        }
      }]
    });
    alert.present();
  }


  public moisture_help() {
    document.getElementById("view").style.display = "block";
  }


  public close() {
    document.getElementById("view").style.display = "none";
  }

  openBasicModal() {
    if (this.platform.is('android')) {
      let myModal = this.modalCtrl.create(SkinMeasureStartPage);
      myModal.present();
    }

    if (this.platform.is('ios') || this.platform.is('core')) {
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

  //20190617 ?????? ????????? ?????? count
  public first_missionCount(id) {
    this.images.missionCount(id).subscribe(data => {
    });
  }

  //20190617 ?????? ????????? ?????? count
  public second_missionCount(id) {
    this.images.missionCount(id).subscribe(data => {
      this.second_carezone_missioncount = data;
      this.secondCount++;

    });

    this.images.getMissionMember(id).subscribe(data => {
      this.second_missionMemberData = data;
    });
  }

  //20190617 ?????? ????????? ?????? count
  public third_missionCount(id) {
    this.images.missionCount(id).subscribe(data => {
      this.third_carezone_missioncount = data;
    });
  }

  public firstLoadCareZone() {
    this.images.first_carezoneRoad().subscribe(data => {
      this.firstCarezoneData = data;

      if (data !== '') {
        for (let i = 0; i < data.length; i++) {
          this.timeremaining[i] = (new Date(data[i].endmission).getTime() - new Date().getTime()) / 1000;
        }
      }

      for (let i = 0; i < data.length; i++) {
        this.images.getMissionMember(data[i]._id).subscribe(data3 => {
          if (data3 !== '') {
            this.missionmember[i] = data3;
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
        // this.second_missionCount(data[i]._id);
        this.getthirdday[i] = new Date(data[i].startmission)
        this.timeremaining2 = (new Date(data[i].endmission).getTime() - new Date().getTime()) / 1000;
        if (this.diffdate(this.currentDate, this.getthirdday[i]) > -3 && this.diffdate(this.currentDate, this.getthirdday[i]) < -2) {
          // this.images.missionCount(data[i]._id).subscribe(data2 => {
          //   this.missionCounter2[i] = data2;
          //   this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)

          //   if (this.percent[i] <= 50) {
          //     this.ingmdchuchun[i] = true;
          //     this.ingapproaching[i] = false;
          //   }
          //   if (this.percent[i] > 50) {
          //     this.ingmdchuchun[i] = false;
          //     this.ingapproaching[i] = true;
          //   }
          // });
        } else if (this.diffdate(this.currentDate, this.getthirdday[i]) > -2 && this.diffdate(this.currentDate, this.getthirdday[i]) < -1) {
          // console.log("D-111111111111");
          // this.images.missionCount(data[i]._id).subscribe(data2 => {
          //   this.missionCounter2[i] = data2;
          //   //console.log("???????????? ????????? ????????? : " + parseInt(data[i].maxmember));
          //   //console.log("???????????? ????????? ????????? : " + parseInt(this.missionCounter[i]));
          //   this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
          //   //console.log(this.percent[i])

          //   if (this.percent[i] <= 50) {
          //     //console.log("MD??????");
          //     this.ingmdchuchun[i] = true;
          //     this.ingapproaching[i] = false;
          //   }
          //   if (this.percent[i] > 50) {
          //     //console.log("????????????");
          //     this.ingmdchuchun[i] = false;
          //     this.ingapproaching[i] = true;
          //   }
          // });
        } else if (this.diffdate(this.currentDate, this.getthirdday[i]) > -3 && this.diffdate(this.currentDate, this.getthirdday[i]) <= 0) {
          // console.log("????????? ");
          // this.images.missionCount(data[i]._id).subscribe(data2 => {
          //   this.missionCounter2[i] = data2;
          //   // console.log("???????????? ????????? ????????? : " + parseInt(data[i].maxmember));
          //   // console.log("???????????? ????????? ????????? : " + parseInt(this.missionCounter[i]));
          //   this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
          //   // console.log(this.percent[i])

          //   if (this.percent[i] <= 50) {
          //     // console.log("MD??????");
          //     this.ingmdchuchun[i] = true;
          //     this.ingapproaching[i] = false;
          //   }
          //   if (this.percent[i] > 50) {
          //     // console.log("????????????");
          //     this.ingmdchuchun[i] = false;
          //     this.ingapproaching[i] = true;
          //   }
          // });

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
      this.beauty_data_type3 = data[2].title;
      this.beauty_data_title3 = data[2].body;
      this.beauty_data_id3 = data[2].filename;
      this.beauty_data_url3 = data[2].posturl;
      this.beauty_data_viewId3 = data[2]._id;
      this.beauty_data_views3 = data[2].views;
      this.beauty_data_midtext3 = data[2].midtext;
      this.beauty_data_type4 = data[3].title;
      this.beauty_data_title4 = data[3].body;
      this.beauty_data_id4 = data[3].filename;
      this.beauty_data_url4 = data[3].posturl;
      this.beauty_data_viewId4 = data[3]._id;
      this.beauty_data_views4 = data[3].views;
      this.beauty_data_midtext4 = data[3].midtext;

      this.beautyData = data;
    });
  }


  public kakao_request() {
    this._kakaoCordovaSDK
      .requestMe().then((res) => {
        //this.showAlert("??????????????? :" + JSON.stringify(res));
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
        this.showAlert("?????????111" + JSON.stringify(res));
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
    console.log("?????? ????????? :"  + this.missionID);
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

  public async openCommunityTab1() {
    await this.auth.setUserStoragetab(0); //????????? ??????????????? ????????? ?????? ????????? ????????? ??????????????? ??????????????? ?????? ????????? ??????????????? ??????
    this.nav.parent.select(3); //????????? ?????? ????????? ?????? ???????????? ???????????? ???????????? ????????? ????????? ????????? ??????
    this.events.publish('tabs1', "tabs1");
  }

  public async openCommunityTab2() {
    await this.auth.setUserStoragetab(2);
    this.nav.parent.select(3);
    this.events.publish('tabs2', "tabs2");
  }

  public async openCommunityTab3() {
    await this.auth.setUserStoragetab(1);
    this.nav.parent.select(3);
    this.events.publish('tabs3', "tabs3");
  }

  //20200210 ????????? ?????? ????????? ?????? ??????    
  public challengeChkMission(email) {
    this.images.ChallengeChkMission(email).subscribe(data => {
      if (data.length <= 0) {
        this.challengeData = '';
      } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].missioncomplete) { //???????????? ?????? ????????? ?????? ??????
            this.challengeData = data[i];
            this.missionID = data[i].missionID;
          }
        }
      } else {
        console.log("????????? ?????? ?????? ????????? ????????? ?????? ????????????");
      }
    });

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '????????? ??????????????????'
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
        this.displayTime[i] = this.getSecondsAsDigitalClock(this.timeremaining[i]);
      }
    });
  }

  timerTick2() {
    this.subscriptionTimer2 = Observable.interval(1000).subscribe(x => {
      this.timeremaining2--;
      this.displayTime2 = this.getSecondsAsDigitalClock(this.timeremaining2);

    });
  }

  ingCarezone(missionId) {
    this.nav.push(ChalMissionIngPage, { carezoeId: missionId }).then(() => {
      this.nav.getActive().onDidDismiss(data => {
        console.log("???????????? ????????? ?????? ??????");
        if(this.userData) {
          this.challengeChkMission(this.userData.email)
        }
      });
    });
  }


  public community_search() {
    let myModal = this.modalCtrl.create(SearchPage);
    myModal.onDidDismiss(data => {

    });
    myModal.present();
  }

  test_noti() {

    let myModal = this.modalCtrl.create(GuidePage, {mode : 'home'});
    myModal.onDidDismiss(data => { 
      console.log("?????? ????????? ??????");
      if(this.userData){
        this.isFlip = true;
        // console.log("????????? ????????? ?????????");
        if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
          this.reloadUserPoint(this.userData.snsid);
        }
        else {
          this.reloadUserPoint(this.userData.email);
        }
      }
    })
    myModal.present();
  }

  flip() {
    if (!this.flipAnim) {
      this.flipAnim = new Flip({
        node: this.flipbtn.nativeElement,
        from: '00',
        to: this.userData.totaluserpoint,
        separator: ',',
        duration: 1.5,
        delay: 0.3,
      })
    }
  }

  public chulsuk_check() {
    let myModal = this.modalCtrl.create(ChulsukCheckPage);
    myModal.onDidDismiss(data => {
      if(this.userData) {
       this.isFlip = true; 
       if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
        this.reloadUserPoint(this.userData.snsid);
      }
      else {
        this.reloadUserPoint(this.userData.email);
      }
      }
      console.log("???????????? ????????? ??????");
    });
    myModal.present();
  }

  public myinfo() {
    //2020-05-28 ??????????????? ????????? ??????
    let myModal = this.modalCtrl.create(MyinfoPage);
    myModal.onDidDismiss(data => {
      if(this.userData) {
       this.isFlip = true; 
       if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
        this.reloadUserPoint(this.userData.snsid);
      }
      else {
        this.reloadUserPoint(this.userData.email);
      }
      }
      console.log("???????????? ????????? ??????");
    });
    myModal.present();
  }

  private reloadUserPoint(email) {
    this.auth.reloadUserPointfromPlincShop(email).subscribe(data=>{
      this.userData.totaluserpoint = JSON.stringify(data.point);
      this.totaluserpoint = JSON.stringify(data.point);
      this.totaluserpoint = this.addComma(this.totaluserpoint);
      // console.log("????????? ????????? ????????? : " + this.userData.totaluserpoint);
      setTimeout(() => {
      this.flip();
      }, 3000);
    },error=>{
      console.log("????????? ??????????????? ???????????? ???????????? : " +JSON.stringify(error));
    })
  }

  addComma(data_value) { //?????? ????????? ?????? ?????? ?????????
    return Number(data_value).toLocaleString('en');
  }

  private topbannerLoad() {
    this.images.topbannerLoad().subscribe(data => {
      this.topBannerData = data;
    })
  }

  private inItFCM() {
    if (this.platform.is('ios')) {
      this.fcm.subscribeToTopic('plinic');

      this.fcm.getToken().then(token => {
        console.log("FCM iOS Token :::::::::::::" + token);
        if(this.userData) {
          this.auth.updatePushToken(this.userData.email, token).subscribe(data => {
          }, error =>{
            console.log("???????????? ???????????? ?????? : " + JSON.stringify(error));
          });
        }
      })

      this.fcm.onNotification().subscribe((data) => {
        if (data.wasTapped) { //??? ????????? ????????? ???????????? ?????? ?????? ???,
          //???????????? (????????????, ???????????? ?????? ??????)
          if (data.mode === 'qna' || data.mode === 'note') {
            // this.nav.parent.select(3).then(() => {
            let myModal = this.modalCtrl.create(CommunityModifyPage, { id: data.id, mode: data.mode });
            myModal.onDidDismiss(data => {
            });
            myModal.present();
            
          }
          if (data.mode === 'myqna') {  //????????????
            let myModal = this.modalCtrl.create(QnaReadPage, { id: data.id });
            myModal.onDidDismiss(data => {
            });
            myModal.present();
          }
        } else { // ??? ????????? ???????????????
          if (data.mode === 'qna' || data.mode === 'note') {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: 'OK',
              message: "????????? ???????????? ????????? ?????????????????????. \n" + data.aps.alert.title + '\n' + data.aps.alert.body,
              duration: 10000
            });
            toast.present();
            console.log("Received in foreground - iOS");
          };

          if (data.mode === 'myqna') {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: 'OK',
              message: "???????????? ???????????? ????????? ?????????????????????. \n" + data.aps.alert.title + '\n' + data.aps.alert.body,
              duration: 10000
            });
            toast.present();
            console.log("Received in foreground - iOS");
          }
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        if(this.userData) {
          this.auth.updatePushToken(this.userData.email, token).subscribe(data => {
          }, error =>{
            console.log("???????????? ???????????? ?????? : " + JSON.stringify(error));
          });
        }
        console.log("FCM iOS Refresh Token :::::::::::::" + token);
      });
    }
    if (this.platform.is('android')) {
      this.fcm.subscribeToTopic('all');

      this.fcm.getToken().then(token => {
        console.log("FCM Token :::::::::::::" + token);
        if(this.userData) {
          this.auth.updatePushToken(this.userData.email, token).subscribe(data => {
          }, error =>{
            console.log("???????????? ???????????? ?????? : " + JSON.stringify(error));
          });
        }
      })

      this.fcm.onNotification().subscribe(data => {
        console.log("FCM data ::::::::::::::" + JSON.stringify(data));
        if (data.wasTapped) { //??? ????????? ?????? ?????? ?????? ??????
          if (data.mode === 'qna' || data.mode === 'note') {
            let myModal = this.modalCtrl.create(CommunityModifyPage, { id: data.id, mode: data.mode });
            myModal.onDidDismiss(data => {
              this.nav.parent.select(3)
            });
            myModal.present();
            // });
          }
          if (data.mode === 'myqna') {
            let myModal = this.modalCtrl.create(QnaReadPage, { id: data.id });
            myModal.onDidDismiss(data => {
            });
            myModal.present();
            // });
          }
        } else { //??? ????????? ?????? ?????? ?????? ??????
          if (data.mode === 'qna' || data.mode === 'note') {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: 'OK',
              message: "????????? ???????????? ????????? ?????????????????????. \n" + data.title + '\n' + data.body,
              duration: 10000
            });
            toast.present();
          }
          if (data.mode === 'myqna') {
            const toast = this.toastCtrl.create({
              showCloseButton: true,
              closeButtonText: 'OK',
              message: "???????????? ???????????? ????????? ?????????????????????. \n" + data.title + '\n' + data.body,
              duration: 10000
            });
            toast.present();
            console.log("Received in foreground - android");
          }
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("FCM Refresh Token :::::::::::::" + token);
        if(this.userData) {
          this.auth.updatePushToken(this.userData.email, token).subscribe(data => {
          }, error =>{
            console.log("???????????? ???????????? ?????? : " + JSON.stringify(error));
          });
        }
      });
    }
  }

  public compareAppVersion() {
    this.appCheck = true;
    this.auth.compareAppVersion().subscribe(data => {
      if(this.currentAppVer === data.appVersion) {
        console.log("??? ????????? ??????");
      } else {
        console.log("??? ????????? ??????");
        this.showAlertUpdate('????????????', '????????? ????????? <br> ???????????? ???????????????.');
      }
    }, error => {
      console.log("??? ?????? ?????? ?????? ??????" + JSON.stringify(error));
    })
  }

  showAlertUpdate(title, message) {
    let alertUpdate = this.alertCtrl.create({
      cssClass: 'push_alert_cancel2',
      message: message,
      buttons: [{
        text: '???????????????',
        handler: () => {
          console.log('???????????? ????????? ??????');
          }
        },
        {
          text: '????????????',
          handler: () => {
            if(this.platform.is('ios')) {
              window.open("https://itunes.apple.com/app/id1470360506","_system");
            } else if(this.platform.is('android')) {
              window.open("https://play.google.com/store/apps/details?id=com.g1p.plinic&hl=ko","_system");
            }
          }
        }]
    });
    alertUpdate.present();
  }

  showAlertProduct_android(title, message) {
    let alertUpdate = this.alertCtrl.create({
      cssClass: 'push_alert_product2_android',
      
      message: '<img class="product_android" src="assets/img/home/plinic_product2.png" />',
      
      inputs: [
        {
          type:'checkbox',
          label:'3?????? ?????? ??????',
          // value:'check',
          handler: (data) => {
            if(data.checked) {
              var userPopup = {
                checked : data.checked,
                date : new Date().toISOString()
              }
              this.auth.setHomePopUpCheck(userPopup);
            } else {
              this.auth.setHomePopUpCheck(null);
            }
          }
        },
        {
          type:'text',
          label:'??????',
          handler: () => {
            console.log("???????????? ??????");
            alertUpdate.dismiss();
          }
        },
      ],
      buttons: [
        {
          text: '???????????? ????????????',
          handler: () => {
            this.openBrowser_android('https://www.plinicshop.com/Products/Details/1834','?????????');
          }
        },
      ],
    });
    alertUpdate.present();
  }

  async showAlertProduct_ios(title, message) {
    let alertUpdate = this.alertCtrl.create({
      cssClass: 'push_alert_product2_ios',
      
      message: '<img class="product_ios" src="assets/img/home/plinic_product2.png" />',
      
      inputs: [
        {
          type:'checkbox',
          label:'3?????? ?????? ??????',
          handler: (data)  => {
            if(data.checked) {
              var userPopup = {
                checked : data.checked,
                date : new Date().toISOString()
              }
              this.auth.setHomePopUpCheck(userPopup);
            } else {
              this.auth.setHomePopUpCheck(null);
            }
          }
        },
        { 
          type:'text',
          label:'??????',
          handler: () => {
            console.log("???????????? ??????");
            alertUpdate.dismiss();
          }
        },
      ],
      buttons: [
        {
          text: '???????????? ????????????',
          handler: () => {
            this.openBrowser_android('https://www.plinicshop.com/Products/Details/1834','?????????');
          }
        },
      ],
    });
    alertUpdate.present();
  }
  
  getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset()*60000).toISOString()
  }

}
