import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { SkinChartPage } from '../skin-chart/skin-chart'
import { CareZonePage } from '../care-zone/care-zone'


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    userData: any;
  constructor(public platform: Platform, public nav: NavController, public auth: AuthService, public _kakaoCordovaSDK: KakaoCordovaSDK, private alertCtrl: AlertController) {
    // this.platform.ready().then(() => {
    //   this.roadstorage();
    // });

  }

  public kakao_request() {
    this._kakaoCordovaSDK
      .requestMe().then((res) =>{
        this.showAlert("리퀘스트미 :" + JSON.stringify(res));
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
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }


  public skin_chart(){
        this.nav.push(SkinChartPage);
  }

  public care_zone(){
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
