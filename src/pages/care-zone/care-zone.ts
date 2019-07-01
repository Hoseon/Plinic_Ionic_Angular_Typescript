import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CareZoneIngPage } from '../care-zone-ing/care-zone-ing';
import { ImagesProvider } from '../../providers/images/images';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing'
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start'
import { CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end'
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';


/**
 * Generated class for the CareZonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone',
  templateUrl: 'care-zone.html',
})
export class CareZonePage {
  carezoneData: any;
  missionData: any;
  loading: Loading;
  userData: any;
  nickname: string;
  jwtHelper: JwtHelper = new JwtHelper();
  currentDate: Date = new Date();
  today: any = new Date().toISOString();
  new: Array<boolean> = new Array<boolean>();
  recruiting: Array<boolean> = new Array<boolean>();
  mdchuchun: Array<boolean> = new Array<boolean>();
  approaching: Array<boolean> = new Array<boolean>();
  endrecruit: Array<boolean> = new Array<boolean>();
  missionCounter: Array<any> = new Array<any>();

  thumb_image: any;
  ingBtn : any = false;
  profileimg_url: any;
  imagePath: any;
  from: any;
  constructor(public platform: Platform, public nav: NavController,
    public navParams: NavParams, private images: ImagesProvider,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, public authService: AuthService) {
    this.platform.ready().then((readySource) => {
      // this.carezoneData = this.roadcareZone();
      // this.loadItems();
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.carezoneData = this.roadcareZone();
    this.loadItems();
    this.loadimagePath();
  }


  public loadimagePath() {
    this.authService.getUserStorageimagePath().then(items => {
        this.imagePath = items;
});
}



  public loadItems() {
    this.authService.getUserStorage().then(items => {

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
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
        }
        this.chkmission(this.userData.email);
        this.chkIngmission(this.userData.email);
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
          from: 'plinic',
        };
        this.chkmission(this.userData.email);
        this.chkIngmission(this.userData.email);
        this.from= 'plinic';
      }
      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }



  public carezone_ing() {
    this.nav.push(CareZoneIngPage);
  }
  public mission_ing(id) {
    //this.nav.push(CareZoneMissionIngPage);
    this.nav.push(CareZoneMissionIngPage, { _id: id });
  }
  public mission_start(id) {
    //console.log(id);
    //console.log("missiondata" + this.missionData.missionID);

    if (this.missionData === null || this.missionData === undefined) {
      //this.nav.push(CareZoneMissionIngPage);
      this.nav.push(CareZoneMissionStartPage, { _id: id });
    } else if (id === this.missionData.missionID) {
      this.nav.push(CareZoneMissionIngPage, { _id: id });

    } else {
      this.nav.push(CareZoneMissionStartPage, { _id: id });
    }
  }

  public mission_deadline_end() {
    this.nav.push(CareZoneMissionDeadlineEndPage);
  }


  public diffdate(date1: Date = new Date(), date2: Date = new Date()) {
    return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
  }

  //20190617 미션 참여자 인원 count
  public missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
       return data;
    });
  }



  public roadcareZone() {
    this.showLoading();
    this.images.carezoneRoad().subscribe(data => {

      if (data !== '') {
        for (let i = 0; i < data.length; i++) {
          this.images.missionCount(data[i]._id).subscribe(data2 => {
             this.missionCounter[i] = data2;
          });
          data[i].startmission = new Date(data[i].startmission);
          this.new[i] = false;
          this.recruiting[i] = false;
          this.mdchuchun[i] = false;
          this.approaching[i] = false;
          this.endrecruit[i] = false;
          if (this.diffdate(this.currentDate, data[i].startmission) < -10) {
            this.new[i] = true;
            this.recruiting[i] = true;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
            //this.new.splice(i, 0, true);
          } else if (this.diffdate(this.currentDate, data[i].startmission) < -7) {
            this.new[i] = false;
            this.recruiting[i] = true;
            this.mdchuchun[i] = true;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
          } else if (this.diffdate(this.currentDate, data[i].startmission) < -3 || this.diffdate(this.currentDate, data[i].startmission) < 0) {
            this.new[i] = false;
            this.recruiting[i] = true;
            this.mdchuchun[i] = false;
            this.approaching[i] = true;
            this.endrecruit[i] = false;
          } else if (this.diffdate(this.currentDate, data[i].startmission) >= 0) {
            this.new[i] = false;
            this.recruiting[i] = false;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = true;
          } else {
            this.new[i] = false;
            this.recruiting[i] = true;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
          }
        }
        this.carezoneData = data;
        this.loading.dismiss();
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }
    });

  }

  //20190617 미션 참여중인지 체크 하기
  public chkmission(email) {
    // this.showLoading();
    //console.log("chkBtn" + this.chkBtn);
    this.images.chkMission(email).subscribe(data => {

      if (data !== '' || data !== null) {
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

  //20190618 진행 중인 미션 체크 하기
  public chkIngmission(email) {
    // this.showLoading();
    //console.log("chkBtn" + this.chkBtn);
    this.images.chkMission(email).subscribe(data => {

      if (data !== null) {
        //this.chkBtn = true;
        this.missionData = data;
        this.ingBtn = true;
        //this.endDate = data.endmission.substr(0, 10);
        //console.log(JSON.stringify(data));
        // this.loading.dismiss();
      } else if (data === '' || data === null || data === undefined) {
        this.ingBtn = false;
        //this.chkBtn = false;
      } else {
        this.ingBtn = false;
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

  showAlert(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass:'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
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
