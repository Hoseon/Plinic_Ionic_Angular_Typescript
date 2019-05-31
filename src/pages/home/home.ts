import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, Platform, AlertController, ModalController, Loading, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { SkinChartPage } from '../skin-chart/skin-chart';
import { CareZonePage } from '../care-zone/care-zone';
import { SkinMeasureStartPage } from '../skin-measure-start/skin-measure-start';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TabsPage } from '../tabs/tabs';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing';
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start';
import { CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end';
import { ImageLoader } from 'ionic-image-loader';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData: any;
  bannerData: any;
  jsonData = null;
  imageUrl: any = [];
  connectedCspList: Array<string> = [null];
  carezoneData: any;
  careDataOBJ: any;
  first_carezone_title: any;
  first_carezone_body: any;
  first_carezone__id: any;
  second_carezone_title: any;
  second_carezone_body: any;
  second_carezone__id: any;
  third_carezone_title: any;
  third_carezone_body: any;
  third_carezone__id: any;

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


  loading: Loading;

  imgUrl: any;


  constructor(public platform: Platform, public nav: NavController, public auth: AuthService, public _kakaoCordovaSDK: KakaoCordovaSDK,
    private alertCtrl: AlertController, private images: ImagesProvider, private modalCtrl: ModalController, public translateService: TranslateService,
    private loadingCtrl: LoadingController, private imageLoader: ImageLoader,
    //private fcm: FCM,
    private iab: InAppBrowser, private themeableBrowser: ThemeableBrowser
    //public bluetoothle: BluetoothLE
  ) {
    this.platform.ready().then((readySource) => {

      this.showLoading();
      this.bannerData = this.roadbanner();
      this.roadcareZone();
      this.roadbeauty();
      this.loading.dismiss();
      //this.first_carezone = this.careDataOBJ[0];
      //this.second_carezone = this.careDataOBJ[1];
      //this.third_carezone = this.careDataOBJ[2];
      //console.log('Platform ready from', readySource);
      //this.showAlert(readySource);

      // this.bluetoothle.initialize().then(ble => {
      //   //console.log('ble', ble.status) // logs 'enabled'
      //   this.showAlert(ble.status);
      // });
    });

  }

  openBrowser(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 44,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      // backButtonCanClose: true
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

  openBasicModal() {
    let myModal = this.modalCtrl.create(SkinMeasureStartPage);
    myModal.present();
  }
  openModalWithParams() {
    let myModal = this.modalCtrl.create(SkinMeasureStartPage, { 'myParam': "test" });
    myModal.present();
  }





  push_noti() {
    // this.fcm.subscribeToTopic('all');
    // this.fcm.getToken().then(token => {
    //   console.log("FCM Token :::::::::::::" + token);
    // })
    //
    // this.fcm.onNotification().subscribe(data => {
    //   this.showAlert(data.wasTapped);
    //   if (data.wasTapped) {
    //     console.log("Received in background");
    //   } else {
    //     console.log("Received in foreground");
    //   };
    // });
    //
    //
    // this.fcm.onTokenRefresh().subscribe(token => {
    //   console.log("FCM Refresh Token :::::::::::::" + token);
    //
    // });


  }

  // ionViewDidEnter(){
  //   this.translateService.get('helloWorld').subscribe(
  //     hi => {
  //       let alert = this.alertCtrl.create({
  //         title: hi,
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     }
  //   )
  // }




  public roadbanner() {
    if (!this.jsonData) {
      this.images.bannerRoad().subscribe(data => {
        this.bannerData = data;
        this.jsonData = data;

        for (let i = 0; i < Object.keys(this.jsonData).length; i++) {
          //this.imgUrl[i] = this.jsonData[i]._id;
          this.imgUrl = 'http://plinic.cafe24app.com/images/'
          this.connectedCspList.push('http://plinic.cafe24app.com/images/'.concat(this.jsonData[i]._id));
          console.log(this.connectedCspList[i]);
        }
      });
    } else {
      this.bannerData = [];
      setTimeout(() => {
        this.bannerData = this.jsonData;
      }, 1000);
    }
  }

  doRefresh(event) {
    // this.imageLoader.clearCache();
    // refresher.complete();

    console.log('Begin async operation');



    setTimeout(() => {
      console.log('Async operation has ended');
      this.imageLoader.clearCache();
      event.complete();
    }, 2000);

  }

  onImageLoad(event) {
    console.log('image ready: ', event);
  }

  public roadcareZone() {
    this.images.maincarezoneRoad().subscribe(data => {
      this.first_carezone_title = data[0].title;
      this.first_carezone_body = data[0].body;
      this.first_carezone__id = data[0]._id;
      this.second_carezone_title = data[1].title;
      this.second_carezone_body = data[1].body;
      this.second_carezone__id = data[1]._id;
      this.third_carezone_title = data[2].title;
      this.third_carezone_body = data[2].body;
      this.third_carezone__id = data[2]._id;
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
    this.nav.push(CareZoneMissionStartPage, { _id: _id });
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
