import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture'
import { SkinChekCamera1Page } from '../skin-chek-camera1/skin-chek-camera1'
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';

/**
 * Generated class for the SkinChekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-chek-connect',
  templateUrl: 'skin-chek-connect.html',
})
export class SkinChekConnectPage {

  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  isLoadMain : boolean = false;
  isLoadSub : boolean = false;
  loadMainData : any;
  loadSubData : any;
  diagnose_score: number = 2;
  diagnose_score2: number = 2;
  diagnose_score3: number = 2;
  diagnose_score4: number = 2;
  all_score: number = 0;
  isDisabledRange1 : boolean = true;
  isDisabledRange2 : boolean = true;
  isDisabledRange3 : boolean = true;
  isNext: boolean = false;
  videoUrl: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public auth: AuthService,
    public images: ImagesProvider,
  ) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad SkinChekMunJinPage');
    await this.loadItems();
  }

  async ionViewDidEnter(){
    console.log('ionViewDidLoad SkinChekMunJinPage');
  }

  ionViewWillEnter(){
    this.randomUrl();
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
    this.navCtrl.push(SkinChekCamera1Page).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("페이지 닫힘");
      });
    });
  }

  public range_change(range) {
    if (this.diagnose_score === 1) {
      this.all_score = this.all_score - 1;
    }
    if (this.diagnose_score === 2) {
      this.all_score = this.all_score + 0;
    }
    if (this.diagnose_score === 3) {
      this.all_score = this.all_score + 1;
    }
    // console.log("first_range" + range.value);
    // console.log("this.first_all_score=============" + this.all_score);
    // console.log("this.first_diagnose_score=============" + this.diagnose_score);
  }

  public enable_Range(num) {
    if(num === '1') {
    this.isDisabledRange1 = false
    } else if(num === '2') { 
      this.isDisabledRange2 = false;
    }  else if(num === '3') {
      this.isDisabledRange3 = false;
    }

    if(!this.isDisabledRange1 && !this.isDisabledRange2 && !this.isDisabledRange3) {
      console.log("모두 오케이");
      this.isNext = true;

    }
  }


  private makeRandom(min, max) {
        var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandVal;
  }

  randomUrl() {
    var urlNo;
    urlNo = this.makeRandom(1,5);
    
    switch(urlNo) {
      case 1 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_use_v1_720.mp4';
               break;
      case 2 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/Plinic_SNS_Mini_Clipse_Ver02.mp4';
               break;
      case 3 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_guide_20200525.mp4';
               break;   
      case 4 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_eng.mp4';
               break;   
      case 5 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_clinic.mp4';
               break;   
      default : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_use_v1_720.mp4';
    }
    console.log("현재 비디오 주소 : " + this.videoUrl);
  }


}
