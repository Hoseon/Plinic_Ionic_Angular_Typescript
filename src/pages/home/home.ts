import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, Platform, AlertController, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { SkinChartPage } from '../skin-chart/skin-chart'
import { CareZonePage } from '../care-zone/care-zone'
import { SkinMeasureStartPage } from '../skin-measure-start/skin-measure-start'
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { TranslateService } from 'ng2-translate/ng2-translate'
import { TabsPage } from '../tabs/tabs'
import { CareZoneMissionIngPage} from '../care-zone-mission-ing/care-zone-mission-ing'
import { CareZoneMissionStartPage} from '../care-zone-mission-start/care-zone-mission-start'
import { CareZoneMissionDeadlineEndPage} from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end'


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
  constructor(public platform: Platform, public nav: NavController, public auth: AuthService, public _kakaoCordovaSDK: KakaoCordovaSDK,
    private alertCtrl: AlertController, private images: ImagesProvider, private modalCtrl: ModalController, public translateService : TranslateService
    //public bluetoothle: BluetoothLE
  ) {
    this.platform.ready().then((readySource) => {
      this.bannerData = this.roadbanner();
      this.roadcareZone();

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

  public mission_ing(){
        this.nav.push(CareZoneMissionIngPage);
  }
  public mission_start(){
        this.nav.push(CareZoneMissionStartPage);
  }
  public mission_deadline_end(){
        this.nav.push(CareZoneMissionDeadlineEndPage);
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

}
