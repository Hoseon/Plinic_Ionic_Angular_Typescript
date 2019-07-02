// import { IonicPage } from 'ionic-angular';
// import { Component } from '@angular/core';
// import { NavController, Platform, AlertController, ModalController, Loading, LoadingController } from 'ionic-angular';
// import { AuthService } from '../../providers/auth-service';
// import { ImagesProvider } from '../../providers/images/images';
// import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
// import { SkinChartPage } from '../skin-chart/skin-chart';
// import { CareZonePage } from '../care-zone/care-zone';
// import { SkinMeasureStartPage } from '../skin-measure-start/skin-measure-start';
// import { BluetoothLE } from '@ionic-native/bluetooth-le';
// import { TranslateService } from 'ng2-translate/ng2-translate';
// import { TabsPage } from '../tabs/tabs';
// import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing';
// import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start';
// import { CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end';
// import { CareZoneMissionDeadlinePage} from '../care-zone-mission-deadline/care-zone-mission-deadline';
// import { CareZoneMissionCompletePage} from '../care-zone-mission-complete/care-zone-mission-complete';
//
// import { ImageLoader } from 'ionic-image-loader';
// import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
// import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';


import { IonicPage, App } from 'ionic-angular';
import { Component, Inject } from '@angular/core';
import { NavController, Platform, AlertController, ModalController, Loading, LoadingController } from 'ionic-angular';
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
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ImageLoader } from 'ionic-image-loader';
import { CallNumber } from '@ionic-native/call-number';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { BeautyTipAddPage } from '../beauty-tip-add/beauty-tip-add';
import { PlinicManualPage } from '../myinfo/details/plinic-manual/plinic-manual';
import { SkinDiagnoseMoisturePage } from '../skin-diagnose-moisture/skin-diagnose-moisture';




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
  second_carezone_missioncount: any;
  second_carezone_maxmember: any;
  second_carezone_startDate: Date;
  third_carezone_title: any;
  third_carezone_body: any;
  third_carezone__id: any;
  third_carezone_missioncount: any;
  third_carezone_maxmember: any;
  third_carezone_startDate: Date;
  loading: Loading;
  missionCounter: any;

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


  constructor(public platform: Platform, public nav: NavController, public auth: AuthService, public _kakaoCordovaSDK: KakaoCordovaSDK,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, private images: ImagesProvider, private modalCtrl: ModalController,
    public translateService: TranslateService, public bluetoothle: BluetoothLE,
    private iab: InAppBrowser, private themeableBrowser: ThemeableBrowser, private imageLoader: ImageLoader, public app: App, private callNumber: CallNumber
    , @Inject(DOCUMENT) document) {
    this.platform.ready().then((readySource) => {
      // this.currentDate = new Date().toISOString();

      this.loadItems();
      this.bannerData = this.roadbanner();
      this.roadcareZone();
      this.roadbeauty();

      if (this.auth.bluetooth_connect() == true) {
        //this.nav.push(SkinChartPage);
      }

      this.platform.registerBackButtonAction(() => {
        let nav = app._appRoot._getActivePortal() || app.getActiveNav();
        let activeView = nav.getActive();

        if (activeView != null) {
          if (this.nav.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
            this.nav.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
          }
          else if (activeView.isOverlay) {
            activeView.dismiss();
          }
          else {
            // backgroundMode.moveToBackground();
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
      });
    });
  }


  public skin_measure(){
    // let alert = this.alertCtrl.create({
    //   cssClass: 'push_alert',
    //   title: "plinic",
    //   message: "준비중입니다.",
    //   buttons: [{
    //     text: '확인'
    //   }]
    // });
    // alert.present();
    let myModal = this.modalCtrl.create(SkinDiagnoseMoisturePage);
    myModal.present();
  }

  public beauty_add(){
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

  public plinic_manual(){
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
          birthday: items.birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: items.gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
        };
        this.chkmission(this.userData.email);

      }
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


  inapp_test() {

    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('http://naver.com/');
  }

  ionViewWillEnter() {
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
    // this.translateService.get('helloWorld').subscribe(
    //   hi => {
    //     let alert = this.alertCtrl.create({
    //       title: hi,
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   }
    // )

  }

  public ionViewDidLoad() {
    //this.nav.push(SkinChartPage);
  }


  public customer_service() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: "고객센터",
      message: "언제나 친절히 모시겠습니다. <br> 오전10시 ~ 오후 5시 <br>( 점심시간 12시~1시 )",
      buttons: [{
        text: '연결하기',
        handler: () => {
          console.log('연결하기'),
            //02.2038.4876
            this.callNumber.callNumber("0220384876", true)
        }
      }]
    });
    alert.present();
  }


  public moisture_help() {
    console.log('view');
    document.getElementById("view").style.display = "block";
  }


  public close() {
    console.log('close');
    document.getElementById("view").style.display = "none";
    // document.getElementById("view2").style.display = "none";
  }

  openBasicModal() {
    let myModal = this.modalCtrl.create(SkinMeasureStartPage);
    myModal.present();
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
      this.first_carezone_missioncount = data;
    });
  }

  //20190617 미션 참여자 인원 count
  public second_missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
      this.second_carezone_missioncount = data;
    });
  }

  //20190617 미션 참여자 인원 count
  public third_missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
      this.third_carezone_missioncount = data;
    });
  }

  public roadcareZone() {
    this.images.maincarezoneRoad().subscribe(data => {
      //console.log(data);
      this.first_carezone_title = data[0].title;
      this.first_carezone_body = data[0].body;
      this.first_carezone__id = data[0]._id;
      this.first_missionCount(data[0]._id);
      this.first_carezone_maxmember = (data[0].maxmember);
      this.first_carezone_startDate = new Date(data[0].startmission);
      this.second_carezone_title = data[1].title;
      this.second_carezone_body = data[1].body;
      this.second_carezone__id = data[1]._id;
      this.second_missionCount(data[1]._id);
      this.second_carezone_maxmember = (data[1].maxmember);
      this.second_carezone_startDate = new Date(data[1].startmission);
      this.third_carezone_title = data[2].title;
      this.third_carezone_body = data[2].body;
      this.third_carezone__id = data[2]._id;
      this.third_missionCount(data[2]._id);
      this.third_carezone_maxmember = (data[1].maxmember);
      this.third_carezone_startDate = new Date(data[2].startmission);
      // this.currentDate = new Date();
      // this.currentDate.setDate( this.currentDate.getDate() + 2 );

      if (this.diffdate(this.currentDate, this.first_carezone_startDate) < -10) {
        this.new = true;
        this.recruiting = true;
        this.mdchuchun = false;
        this.approaching = false;
        this.endrecruit = false;
      } else if (this.diffdate(this.currentDate, this.first_carezone_startDate) < -7) {
        this.new = false;
        this.recruiting = true;
        this.mdchuchun = true;
        this.approaching = false;
        this.endrecruit = false;
      } else if (this.diffdate(this.currentDate, this.first_carezone_startDate) < -3 || this.diffdate(this.currentDate, this.first_carezone_startDate) < 0) {
        this.new = false;
        this.recruiting = true;
        this.mdchuchun = false;
        this.approaching = true;
        this.endrecruit = false;
      } else if (this.diffdate(this.currentDate, this.first_carezone_startDate) >= 0) {
        this.new = false;
        this.recruiting = false;
        this.mdchuchun = false;
        this.approaching = false;
        this.endrecruit = true;
      } else {
        this.new = false;
        this.recruiting = true;
        this.mdchuchun = false;
        this.approaching = false;
        this.endrecruit = false;
      }


      if (this.diffdate(this.currentDate, this.second_carezone_startDate) < -10) {
        this.second_new = true;
        this.second_recruiting = true;
        this.second_mdchuchun = false;
        this.second_approaching = false;
        this.second_endrecruit = false;
      } else if (this.diffdate(this.currentDate, this.second_carezone_startDate) < -7) {
        this.second_new = false;
        this.second_recruiting = true;
        this.second_mdchuchun = true;
        this.second_approaching = false;
        this.second_endrecruit = false;
      } else if (this.diffdate(this.currentDate, this.second_carezone_startDate) < -3 || this.diffdate(this.currentDate, this.second_carezone_startDate) < 0) {
        this.second_new = false;
        this.second_recruiting = true;
        this.second_mdchuchun = false;
        this.second_approaching = true;
        this.second_endrecruit = false;
      } else if (this.diffdate(this.currentDate, this.second_carezone_startDate) >= 0) {
        this.second_new = false;
        this.second_recruiting = false;
        this.second_mdchuchun = false;
        this.second_approaching = false;
        this.second_endrecruit = true;
      } else {
        this.second_new = false;
        this.second_recruiting = true;
        this.second_mdchuchun = false;
        this.second_approaching = false;
        this.second_endrecruit = false;
      }

      if (this.diffdate(this.currentDate, this.third_carezone_startDate) < -10) {
        this.third_new = true;
        this.third_recruiting = true;
        this.third_mdchuchun = false;
        this.third_approaching = false;
        this.third_endrecruit = false;
      } else if (this.diffdate(this.currentDate, this.third_carezone_startDate) < -7) {
        this.third_new = false;
        this.third_recruiting = true;
        this.third_mdchuchun = true;
        this.third_approaching = false;
        this.third_endrecruit = false;
      } else if (this.diffdate(this.currentDate, this.third_carezone_startDate) < -3 || this.diffdate(this.currentDate, this.third_carezone_startDate) < 0) {
        this.third_new = false;
        this.third_recruiting = true;
        this.third_mdchuchun = false;
        this.third_approaching = true;
        this.third_endrecruit = false;
      } else if (this.diffdate(this.currentDate, this.third_carezone_startDate) >= 0) {
        this.third_new = false;
        this.third_recruiting = false;
        this.third_mdchuchun = false;
        this.third_approaching = false;
        this.third_endrecruit = true;
      } else {
        this.third_new = false;
        this.third_recruiting = true;
        this.third_mdchuchun = false;
        this.third_approaching = false;
        this.third_endrecruit = false;
      }



      // if(this.third_carezone_startDate <= this.currentDate){
      // } else{
      // }




      this.carezoneData = data;
    });
  }

  public roadbeauty() {
    this.images.mainbeautyRoad().subscribe(data => {
      this.beauty_data_type1 = data[0].title;
      this.beauty_data_title1 = data[0].body;
      this.beauty_data_id1 = data[0]._id;
      this.beauty_data_url1 = data[0].posturl;
      this.beauty_data_type2 = data[1].title;
      this.beauty_data_title2 = data[1].body;
      this.beauty_data_id2 = data[1]._id;
      this.beauty_data_url2 = data[1].posturl;
      this.beauty_data_type3 = data[2].title;
      this.beauty_data_title3 = data[2].body;
      this.beauty_data_id3 = data[2]._id;
      this.beauty_data_url3 = data[2].posturl;
      this.beauty_data_type4 = data[3].title;
      this.beauty_data_title4 = data[3].body;
      this.beauty_data_id4 = data[3]._id;
      this.beauty_data_url4 = data[3].posturl;
      this.beautyData = data;
    });
  }



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
  public mission_start(_id) {
    //console.log(_id);

    if (this.missionData === null || this.missionData === undefined) {
      this.nav.push(CareZoneMissionStartPage, { _id: _id });
    } else if (_id === this.missionData.missionID) {
      this.nav.push(CareZoneMissionIngPage, { _id: _id });
    } else {
      this.nav.push(CareZoneMissionStartPage, { _id: _id });
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


  //20190617 미션 참여중인지 체크 하기
  public chkmission(email) {
    // this.showLoading();
    //console.log("chkBtn" + this.chkBtn);
    this.images.chkMission(email).subscribe(data => {

      if (data !== '' || data !== null || data !== undefined) {
        //this.chkBtn = true;
        this.missionData = data;
        //this.endDate = data.endmission.substr(0, 10);
        //console.log(JSON.stringify(data));
        // this.loading.dismiss();
      } else if (data === '' || data === null || data === undefined) {
        //this.chkBtn = false;
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }
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

}

//   userData: any;
//   bannerData: any;
//   jsonData = null;
//   imageUrl: any = [];
//   connectedCspList: Array<string> = [null];
//   carezoneData: any;
//   careDataOBJ: any;
//   first_carezone_title: any;
//   first_carezone_body: any;
//   first_carezone__id: any;
//   second_carezone_title: any;
//   second_carezone_body: any;
//   second_carezone__id: any;
//   third_carezone_title: any;
//   third_carezone_body: any;
//   third_carezone__id: any;
//
//   beauty_data_type1: any;
//   beauty_data_title1: any;
//   beauty_data_id1: any;
//   beauty_data_url1: any;
//   beauty_data_type2: any;
//   beauty_data_title2: any;
//   beauty_data_id2: any;
//   beauty_data_url2: any;
//   beauty_data_type3: any;
//   beauty_data_title3: any;
//   beauty_data_id3: any;
//   beauty_data_url3: any;
//   beauty_data_type4: any;
//   beauty_data_title4: any;
//   beauty_data_id4: any;
//   beauty_data_url4: any;
//   beautyData: any;
//
//
//   loading: Loading;
//
//   imgUrl: any;
//
//
//   constructor(public platform: Platform, public nav: NavController, public auth: AuthService, public _kakaoCordovaSDK: KakaoCordovaSDK,
//     private alertCtrl: AlertController, private images: ImagesProvider, private modalCtrl: ModalController, public translateService: TranslateService,
//     private loadingCtrl: LoadingController, private imageLoader: ImageLoader,
//     //private fcm: FCM,
//     private iab: InAppBrowser, private themeableBrowser: ThemeableBrowser
//     //public bluetoothle: BluetoothLE
//   ) {
//     this.platform.ready().then((readySource) => {
//       this.showLoading();
//       this.bannerData = this.roadbanner();
//       this.roadcareZone();
//       this.roadbeauty();
//       this.loading.dismiss();
//       //this.first_carezone = this.careDataOBJ[0];
//       //this.second_carezone = this.careDataOBJ[1];
//       //this.third_carezone = this.careDataOBJ[2];
//       //console.log('Platform ready from', readySource);
//       //this.showAlert(readySource);
//
//       // this.bluetoothle.initialize().then(ble => {
//       //   //console.log('ble', ble.status) // logs 'enabled'
//       //   this.showAlert(ble.status);
//       // });
//     });
//
//   }
//
//   openBrowser(url, title) {
//     // https://ionicframework.com/docs/native/themeable-browser/
//     const options: ThemeableBrowserOptions = {
//       toolbar: {
//         height: 44,
//         color: '#6562b9'
//       },
//       title: {
//         color: '#ffffffff',
//         showPageTitle: false,
//         staticText: title
//       },
//       // backButton: {
//       //   wwwImage: 'assets/img/back.png',
//       //   align: 'left',
//       //   event: 'backPressed'
//       // },
//       // forwardButton: {
//       //   wwwImage: 'assets/img/forward.png',
//       //   align: 'left',
//       //   event: 'forwardPressed'
//       // },
//       closeButton: {
//         wwwImage: 'assets/img/close.png',
//         align: 'left',
//         event: 'closePressed'
//       },
//       // backButtonCanClose: true
//     };
//
//     const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
//     browser.insertCss({
//       file: 'assets/img/close.png',
//       code: '.navbar-fixed-top {display: block !important;}'
//     });
//     browser.reload();
//     browser.on('closePressed').subscribe(data => {
//       browser.close();
//     })
// }
//
//
//   inapp_test() {
//
//     const options: InAppBrowserOptions = {
//       zoom: 'no'
//     }
//     const browser = this.iab.create('http://naver.com/');
//   }
//
//   openBasicModal() {
//     let myModal = this.modalCtrl.create(SkinMeasureStartPage);
//     myModal.present();
//   }
//   openModalWithParams() {
//     let myModal = this.modalCtrl.create(SkinMeasureStartPage, { 'myParam': "test" });
//     myModal.present();
//   }
//
//
//
//
//
//   push_noti() {
//     // this.fcm.subscribeToTopic('all');
//     // this.fcm.getToken().then(token => {
//     //   console.log("FCM Token :::::::::::::" + token);
//     // })
//     //
//     // this.fcm.onNotification().subscribe(data => {
//     //   this.showAlert(data.wasTapped);
//     //   if (data.wasTapped) {
//     //     console.log("Received in background");
//     //   } else {
//     //     console.log("Received in foreground");
//     //   };
//     // });
//     //
//     //
//     // this.fcm.onTokenRefresh().subscribe(token => {
//     //   console.log("FCM Refresh Token :::::::::::::" + token);
//     //
//     // });
//
//
//   }
//
//   // ionViewDidEnter(){
//   //   this.translateService.get('helloWorld').subscribe(
//   //     hi => {
//   //       let alert = this.alertCtrl.create({
//   //         title: hi,
//   //         buttons: ['OK']
//   //       });
//   //       alert.present();
//   //     }
//   //   )
//   // }
//
//
//
//
//   public roadbanner() {
//     if (!this.jsonData) {
//       this.images.bannerRoad().subscribe(data => {
//         this.bannerData = data;
//         this.jsonData = data;
//
//         for (let i = 0; i < Object.keys(this.jsonData).length; i++) {
//           //this.imgUrl[i] = this.jsonData[i]._id;
//           this.imgUrl = 'http://plinic.cafe24app.com/images/'
//           this.connectedCspList.push('http://plinic.cafe24app.com/images/'.concat(this.jsonData[i]._id));
//           console.log(this.connectedCspList[i]);
//         }
//       });
//     } else {
//       this.bannerData = [];
//       setTimeout(() => {
//         this.bannerData = this.jsonData;
//       }, 1000);
//     }
//   }
//
//   doRefresh(event) {
//     // this.imageLoader.clearCache();
//     // refresher.complete();
//
//     console.log('Begin async operation');
//
//
//
//     setTimeout(() => {
//       console.log('Async operation has ended');
//       this.imageLoader.clearCache();
//       event.complete();
//     }, 2000);
//
//   }
//
//   onImageLoad(event) {
//     console.log('image ready: ', event);
//   }
//
//   public roadcareZone() {
//     this.images.maincarezoneRoad().subscribe(data => {
//       this.first_carezone_title = data[0].title;
//       this.first_carezone_body = data[0].body;
//       this.first_carezone__id = data[0]._id;
//       this.second_carezone_title = data[1].title;
//       this.second_carezone_body = data[1].body;
//       this.second_carezone__id = data[1]._id;
//       this.third_carezone_title = data[2].title;
//       this.third_carezone_body = data[2].body;
//       this.third_carezone__id = data[2]._id;
//       this.carezoneData = data;
//     });
//   }
//
//   public roadbeauty() {
//     this.images.mainbeautyRoad().subscribe(data => {
//       this.beauty_data_type1 = data[0].title;
//       this.beauty_data_title1 = data[0].body;
//       this.beauty_data_id1 = data[0]._id;
//       this.beauty_data_url1 = data[0].posturl;
//       this.beauty_data_type2 = data[1].title;
//       this.beauty_data_title2 = data[1].body;
//       this.beauty_data_id2 = data[1]._id;
//       this.beauty_data_url2 = data[1].posturl;
//       this.beauty_data_type3 = data[2].title;
//       this.beauty_data_title3 = data[2].body;
//       this.beauty_data_id3 = data[2]._id;
//       this.beauty_data_url3 = data[2].posturl;
//       this.beauty_data_type4 = data[3].title;
//       this.beauty_data_title4 = data[3].body;
//       this.beauty_data_id4 = data[3]._id;
//       this.beauty_data_url4 = data[3].posturl;
//       this.beautyData = data;
//     });
//   }
//
//
//
//   public kakao_request() {
//     this._kakaoCordovaSDK
//       .requestMe().then((res) => {
//         //this.showAlert("리퀘스트미 :" + JSON.stringify(res));
//       })
//   }
//
//   public kakao_scope() {
//     let values = {
//       targetScopes: ['account_email', 'age_range', 'gender'],
//     };
//
//     let userData: any;
//
//     this._kakaoCordovaSDK
//       .checkScopeStatus(null)
//       .then((res) => {
//         this.showAlert("스코프111" + JSON.stringify(res));
//       })
//
//   }
//
//   showAlert(text) {
//     let alert = this.alertCtrl.create({
//       title: 'Alert',
//       message: text,
//       buttons: ['OK']
//     });
//     alert.present();
//   }
//
//
//   public skin_chart() {
//     this.nav.push(SkinChartPage);
//   }
//
//   public care_zone() {
//     this.nav.push(CareZonePage);
//   }
//
//   public mission_deadline(){
//     this.nav.push(CareZoneMissionDeadlinePage);
//   }
//
//   public mission_complete(){
//     this.nav.push(CareZoneMissionCompletePage);
//   }
//
//   public mission_ing() {
//     this.nav.push(CareZoneMissionIngPage);
//   }
//   public mission_start(_id) {
//     //console.log(_id);
//     this.nav.push(CareZoneMissionStartPage, { _id: _id });
//   }
//   public mission_deadline_end(id) {
//     this.nav.push(CareZoneMissionDeadlineEndPage, { _id: id });
//   }
//
//   // public logout(){
//   //   this.auth.logout();
//   // }
//
//   // public roadstorage(){
//   //   this.userData = this.auth.getUserInfo();
//   //
//   // }
//
//
//   public openCareZoneTab(): void {
//     // The second tab is the one with the index = 1
//     //this.nav.push(TabsPage, { selectedTab: 1 });
//     this.nav.parent.select(1);
//   }
//
//   showLoading() {
//     this.loading = this.loadingCtrl.create({
//       content: 'Please wait...'
//     });
//     this.loading.present();
//   }
//
//   showError(text) {
//     this.loading.dismiss();
//
//     let alert = this.alertCtrl.create({
//       title: 'Fail',
//       message: text,
//       buttons: ['OK']
//     });
//     alert.present();
//   }
