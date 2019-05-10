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


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData: any;
  bannerData: any;
  imageUrl: any;
  constructor(public platform: Platform, public nav: NavController, public auth: AuthService, public _kakaoCordovaSDK: KakaoCordovaSDK,
    private alertCtrl: AlertController, private images: ImagesProvider, private modalCtrl: ModalController,
    //public bluetoothle: BluetoothLE
  ) {
    this.platform.ready().then((readySource) => {
      this.bannerData = this.roadbanner();
      //console.log('Platform ready from', readySource);
      //this.showAlert(readySource);

      // this.bluetoothle.initialize().then(ble => {
      //   //console.log('ble', ble.status) // logs 'enabled'
      //   this.showAlert(ble.status);
      // });
    });

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
    //this.bannerData = this.auth.bannerRoad();

    this.images.bannerRoad().subscribe(data => {
      this.bannerData = data;
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

  // public logout(){
  //   this.auth.logout();
  // }

  // public roadstorage(){
  //   this.userData = this.auth.getUserInfo();
  //
  // }

}
