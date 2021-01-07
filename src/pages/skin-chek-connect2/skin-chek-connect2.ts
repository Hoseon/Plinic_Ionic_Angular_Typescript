import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { SkinChekCamera1Page } from '../skin-chek-camera1/skin-chek-camera1'


/**
 * Generated class for the SkinChekConnect2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-chek-connect2',
  templateUrl: 'skin-chek-connect2.html',
})
export class SkinChekConnect2Page {

  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  isLoadMain : boolean = false;
  isLoadSub : boolean = false;
  loadMainData : any;
  loadSubData : any;
  all_score: number = 0;
  isDisabledRange1 : boolean = true;
  isDisabledRange2 : boolean = true;
  isDisabledRange3 : boolean = true;
  isNext: boolean = false;
  videoUrl: any;
  step : any;
  diagnose_score: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    private openNativeSettings: OpenNativeSettings,
    public viewCtrl: ViewController,
    public auth: AuthService,
    public images: ImagesProvider,
  ) {

    if(this.navParams.get('step')) {
      this.step = this.navParams.get('step');
    }

    this.navParams.get('munjin') ? this.diagnose_score = this.navParams.get('munjin') : this.diagnose_score;
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad SkinChekConnect2Page');
    await this.loadItems();

  }

  dismiss() {
    // this.viewCtrl.dismiss();
    this.navCtrl.parent.select(4);
  }

  openSetting() {
    this.openNativeSettings.open('wifi').then(success => {
      console.log("와이파이 셋팅이 정상적으로 열렸음");
    }, error => {
      console.log("휴대폰의 와이파이 셋팅을 불러오지 못함");
    })
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
      }
    });
  }

  public next() {
    this.navCtrl.push(SkinChekCamera1Page, { step : this.step, munjin: this.diagnose_score }).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("페이지 닫힘");
      });
    });
  }


}
