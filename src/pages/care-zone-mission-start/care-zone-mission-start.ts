import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Platform } from 'ionic-angular';
import { CareZoneMissionCompletePage } from '../care-zone-mission-complete/care-zone-mission-complete';
import { ImagesProvider } from '../../providers/images/images';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';

/**
 * Generated class for the CareZoneMissionStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-mission-start',
  templateUrl: 'care-zone-mission-start.html',
})
export class CareZoneMissionStartPage {
  _id: any;
  loading: Loading;
  carezoneData: any;
  endDate: any;
  startDate: any;
  currentDate: Date = new Date();
  dday: any;
  getday: any;
  userData: any;
  nickname: string;
  jwtHelper: JwtHelper = new JwtHelper();
  thumb_image: any;
  chkBtn: any = false;
  chkBtn2: any = false;
  chkDay: any;
  missionCounter: any;
  maxBtn: any = false;


  constructor(public nav: NavController, public navParams: NavParams, private images: ImagesProvider,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, public platform: Platform, private auth: AuthService,
  ) {
    this.platform.ready().then((readySource) => {
      // this.loadItems();
      // this._id = this.navParams.get('_id');
      // this.roadmission(this._id);
      // this.getDday();
    });


    //this._id = this.navParams.get('_id');
    //this.carezoneData = this.roadmission(this._id);
  }


  ionViewWillEnter() {
    // console.log("Enter Mission Start");
    // this.showLoading();
    this.loadItems();
    this._id = this.navParams.get('_id');
    this.roadmission(this._id);
    this.missionCount(this._id);
    this.getDday();
    //this.loading.dismiss();
    // console.log("End Mission Start");
  }
  ionViewDidLoad() {
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
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
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
        // console.log(this.userData);
        this.chkmission(this.userData.email);
      }
    });
  }


  public mission_complete() {
    this.nav.push(CareZoneMissionCompletePage);
  }

  //20190617 미션 참여중인지 체크 하기
  public chkmission(email) {
    // this.showLoading();
    console.log("chkBtn" + this.chkBtn);
    this.images.chkMission(email).subscribe(data => {
      if (data === '' || data === null || data === undefined) {
        this.chkBtn = true;
        //this.carezoneData = data;
        //this.endDate = data.endmission.substr(0, 10);
        //console.log(JSON.stringify(data));
        // this.loading.dismiss();
      } else if (data !== '' || data !== null || data !== undefined) {
        this.chkBtn = false;
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }
    });
  }

  //20190617 미션 참여자 인원 count
  public missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
      this.missionCounter = data;
      if (parseInt(this.missionCounter) === parseInt(this.carezoneData.maxmember)) {
        this.maxBtn = true;
      } else {
        this.maxBtn = false;
      }
    });
  }

  public roadmission(id) {
    this.showLoading();
    this.images.missionRoad(id).subscribe(data => {
      if (data !== '') {
        this.carezoneData = data;
        this.startDate = data.startmission.substr(0, 10);
        this.endDate = data.endmission.substr(0, 10);
        //console.log(JSON.stringify(data));
        this.loading.dismiss();
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }

      this.getday = new Date(this.carezoneData.startmission);
      this.dday = this.diffdate(this.getday, this.currentDate);
      this.chkDay = this.dday
      this.dday = parseInt(this.dday)
      if (this.chkDay < 0) {
        //this.chkBtn = null;
        this.chkBtn2 = true;
      } else {
        this.chkBtn2 = false;
      }
    });

  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showMissionError() {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: '플리닉은 1개 미션만 참가 할 수 있습니다. <br /> 다른 미션에 참가 하려면 <br /> 등록한 미션을 포기 해주세요.',
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }

  showMissionEndError() {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: '해당 이벤트가 시작되었습니다. <br /> 이벤트가 시작하면 참여 할 수 없습니다. <br/> 미션 시작일 : ' + this.startDate,
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }

  showMissionMaxEndError() {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: '해당 이벤트의 모집인원이 초과 되었습니다. <br /> 다음 기회에 참여해 주세요.',
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }

  //20190614 미션 시작 질의 후 Mission 테이블에 데이터 저장
  satrtMission(id) {
    //console.log(id);
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "미션 참여",
      message: "미션을 정말 참여하시겠습니까? <br> 미션은 1개만 참여가 가능합니다.",
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '확인',
          handler: () => {
            this.auth.missionSave(id, this.userData.email, this.userData.thumbnail_image, this.carezoneData.startmission, this.carezoneData.endmission, ).subscribe(data => {
              this.nav.push(CareZoneMissionIngPage, { _id: id });
            }, error => {
              this.showError(JSON.parse(error._body).msg);
            });

          }
        }]
    });
    alert.present();

  }





  public diffdate(date1: Date = new Date(), date2: Date = new Date()) {
    return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
  }

  public getDday() {
    console.log(this.carezoneData);
    //this.getday = new Date(this.carezoneData.startmission)
    //this.dday = this.diffdate(this.getday, this.currentDate)
    //console.log("D-Day :" + this.dday);
  }

}
