import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CareZoneIngPage } from '../care-zone-ing/care-zone-ing';
import { ImagesProvider } from '../../providers/images/images';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing'
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start'
import { CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end'
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Observable } from 'rxjs/Rx';
import { Device } from '@ionic-native/device';



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
  missionID: any;
  loading: Loading;
  userData: any;
  nickname: string;
  jwtHelper: JwtHelper = new JwtHelper();
  currentDate: Date = new Date();
  today: any = new Date().toISOString();
  new: Array<boolean> = new Array<boolean>();
  recruiting: Array<boolean> = new Array<boolean>();
  mdchuchun: Array<boolean> = new Array<boolean>();
  ingmdchuchun: Array<boolean> = new Array<boolean>();
  ingapproaching: Array<boolean> = new Array<boolean>();
  approaching: Array<boolean> = new Array<boolean>();
  endrecruit: Array<boolean> = new Array<boolean>();
  missionCounter: Array<any> = new Array<any>();
  missionCounter2: Array<any> = new Array<any>();
  endcarezoneData: Array<any> = new Array<any>();
  d5: Array<any> = new Array<any>();
  d4: Array<any> = new Array<any>();
  d3: Array<any> = new Array<any>();
  d2: Array<any> = new Array<any>();
  d1: Array<any> = new Array<any>();
  endmission: Array<any> = new Array<any>();
  ingmissionCounter: any;

  thumb_image: any;
  ingBtn: any = false;
  profileimg_url: any;
  imagePath: any;
  from: any;
  origindday: any;
  dday: Array<any> = new Array<any>();


  percent: Array<any> = new Array<any>();


  //mission 정보
  carezone_id: Array<any> = new Array<any>();
  title: Array<any> = new Array<any>();
  maxmember: Array<any> = new Array<any>();
  body: Array<any> = new Array<any>();

  endcarezone_id: Array<any> = new Array<any>();
  endtitle: Array<any> = new Array<any>();
  endmaxmember: Array<any> = new Array<any>();
  endbody: Array<any> = new Array<any>();

  timeremaining: Array<any> = new Array<any>();
  displayTime: Array<any> = new Array<any>();


  tickFourth: any;
  tickThree: any;
  subscriptionFourth: any;
  subscriptionThree: any;

  missionmember: Array<any> = new Array<any>();
  memberRanking: Array<any> = new Array<any>();




  constructor(
    public device : Device,
    public platform: Platform, public nav: NavController,
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
    this.roadcareZone();
    this.loadItems();
    // this.loadimagePath();
    this.timerTick();
  }

  ionViewWillLeave() {
    this.subscriptionFourth.complete();
    console.log("Timer Clear!");
  }

  ionViewDidLeave() {
    this.subscriptionFourth.complete();
    console.log("ionViewDidLeave Timer Clear!");

  }


  public loadimagePath() {
    // this.authService.getUserStorageimagePath().then(items => {
    //   this.imagePath = items;
    // });
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
        this.from = 'plinic';
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
  public mission_start(carezone) {
    //console.log(id);
    //console.log("missiondata" + this.missionData.missionID);
    console.log(this.missionData.length);
    if (this.missionData === null || this.missionData === undefined || this.missionData.length <= 0) {
      //this.nav.push(CareZoneMissionIngPage);
      this.nav.push(CareZoneMissionStartPage, { carezoneData: carezone });
    } else if (carezone._id === this.missionID) {
      this.nav.push(CareZoneMissionIngPage, { carezoneData: carezone });

    } else {
      this.nav.push(CareZoneMissionStartPage, { carezoneData: carezone });
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
      // D-3, D-2, D-1, 모집중, 모집마감 로직 변경으로 주석 처리
      // if (data !== '') {
      //   for (let i = 0; i < data.length; i++) {
      //     this.images.missionCount(data[i]._id).subscribe(data2 => {
      //        this.missionCounter[i] = data2;
      //     });
      //     data[i].startmission = new Date(data[i].startmission);
      //     this.new[i] = false;
      //     this.recruiting[i] = false;
      //     this.mdchuchun[i] = false;
      //     this.approaching[i] = false;
      //     this.endrecruit[i] = false;
      //     this.dday = this.diffdate(this.currentDate, data[i].startmission);
      //     this.dday = parseFloat(this.dday);
      //     console.log(this.dday);
      //     if (this.diffdate(this.currentDate, data[i].startmission) < -10) {
      //       this.new[i] = true;
      //       this.recruiting[i] = true;
      //       this.mdchuchun[i] = false;
      //       this.approaching[i] = false;
      //       this.endrecruit[i] = false;
      //       //this.new.splice(i, 0, true);
      //     } else if (this.diffdate(this.currentDate, data[i].startmission) < -7) {
      //       this.new[i] = false;
      //       this.recruiting[i] = true;
      //       this.mdchuchun[i] = true;
      //       this.approaching[i] = false;
      //       this.endrecruit[i] = false;
      //     } else if (this.diffdate(this.currentDate, data[i].startmission) < -3 || this.diffdate(this.currentDate, data[i].startmission) < 0) {
      //       this.new[i] = false;
      //       this.recruiting[i] = true;
      //       this.mdchuchun[i] = false;
      //       this.approaching[i] = true;
      //       this.endrecruit[i] = false;
      //     } else if (this.diffdate(this.currentDate, data[i].startmission) >= 0) {
      //       this.new[i] = false;
      //       this.recruiting[i] = false;
      //       this.mdchuchun[i] = false;
      //       this.approaching[i] = false;
      //       this.endrecruit[i] = true;
      //     } else {
      //       this.new[i] = false;
      //       this.recruiting[i] = true;
      //       this.mdchuchun[i] = false;
      //       this.approaching[i] = false;
      //       this.endrecruit[i] = false;
      //     }
      //   }
      //   this.carezoneData = data;
      //   this.loading.dismiss();
      // } else {
      //   this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      // }
      //
      //
      if (data !== '') {
        for (let i = 0; i < data.length; i++) {

          // if (new Date(data[i].endmission) > this.currentDate) {

          this.endcarezone_id[i] = data[i]._id;
          this.title[i] = data[i].title;
          this.maxmember[i] = data[i].maxmember;
          this.body[i] = data[i].body;
          console.log("1 : " + new Date(data[i].endmission).getTime());
          console.log("2 : " + new Date().getTime());

          this.timeremaining[i] = (new Date(data[i].endmission).getTime() - new Date().getTime()) / 1000;

          this.images.missionCount(data[i]._id).subscribe(data2 => {
            console.log("미션 카운트 :" + i + data2);
            this.missionCounter[i] = data2;
          });



          this.images.getMissionMember(data[i]._id).subscribe(data3 => {
            if (data3 !== '') {
              this.missionmember[i] = data3;
              // for (var k = 0; k < data3.length; k++) {
              //   this.memberRanking[i] = {
              //     email: data3[k].email,
              //     usetime: data3[k].usetime,
              //     rank: i + 1,
              //     image_url: data3[k].image_url
              //   }
              // }
            }
          });

          // data[i].startmission = new Date(data[i].startmission);
          this.endmission[i] = new Date(data[i].endmission);

          // console.log("end Date : " + data[i].endmission);
          this.new[i] = false;
          this.recruiting[i] = false;
          this.mdchuchun[i] = false;
          this.approaching[i] = false;
          this.endrecruit[i] = false;
          this.d5[i] = false;
          this.d4[i] = false;
          this.d3[i] = false;
          this.d2[i] = false;
          this.d1[i] = false;

          // this.endmission[i] = false;
          // this.dday = this.diffdate(this.currentDate, data[i].startmission);
          // this.dday = parseFloat(this.dday);
          //console.log(this.dday);
          // if (this.diffdate(this.currentDate, data[i].startmission) < -10) {
          //   this.origindday = this.diffdate(this.currentDate, data[i].startmission);
          //   this.dday[i] = (parseInt(this.origindday) + 2);
          //   this.new[i] = true;
          //   this.recruiting[i] = true;
          //   this.mdchuchun[i] = false;
          //   this.approaching[i] = false;
          //   this.endrecruit[i] = false;
          //   this.d5[i] = true;
          // } else if (this.diffdate(this.currentDate, data[i].startmission) < -7) {
          //   this.origindday = this.diffdate(this.currentDate, data[i].startmission);
          //   this.dday[i] = (parseInt(this.origindday) + 2);
          //   this.new[i] = false;
          //   this.recruiting[i] = true;
          //   this.mdchuchun[i] = true;
          //   this.approaching[i] = false;
          //   this.endrecruit[i] = false;
          //   this.d5[i] = true;
          // } else if (this.diffdate(this.currentDate, data[i].startmission) > -6 && this.diffdate(this.currentDate, data[i].startmission) < -5) {
          //   this.origindday = this.diffdate(this.currentDate, data[i].startmission);
          //   this.dday[i] = (parseInt(this.origindday) + 2);
          //   this.new[i] = false;
          //   this.recruiting[i] = false;
          //   this.mdchuchun[i] = false;
          //   this.approaching[i] = false;
          //   this.endrecruit[i] = false;
          //   this.d5[i] = true;
          // } else if (this.diffdate(this.currentDate, data[i].startmission) > -5 && this.diffdate(this.currentDate, data[i].startmission) < -4) {
          //   this.origindday = this.diffdate(this.currentDate, data[i].startmission);
          //   this.dday[i] = (parseInt(this.origindday) + 2);
          //   this.new[i] = false;
          //   this.recruiting[i] = false;
          //   this.mdchuchun[i] = false;
          //   this.approaching[i] = false;
          //   this.endrecruit[i] = false;
          //   this.d4[i] = true;
          //   this.d3[i] = false;
          //   this.d2[i] = false;
          //   this.d1[i] = false;
          // } else if (this.diffdate(this.currentDate, data[i].startmission) > -4 && this.diffdate(this.currentDate, data[i].startmission) < -3) {
          //   this.origindday = this.diffdate(this.currentDate, data[i].startmission);
          //   this.dday[i] = (parseInt(this.origindday) + 2);
          //   this.new[i] = false;
          //   this.recruiting[i] = false;
          //   this.mdchuchun[i] = false;
          //   this.approaching[i] = false;
          //   this.endrecruit[i] = false;
          //   this.d3[i] = true;
          //   this.d2[i] = false;
          //   this.d1[i] = false;
          // } else if (this.diffdate(this.currentDate, data[i].startmission) > -3 && this.diffdate(this.currentDate, data[i].startmission) < -2) {
          //   // this.origindday = this.diffdate(this.currentDate, data[i].startmission);
          //   // this.dday[i] = parseFloat(this.origindday);
          //   this.new[i] = false;
          //   this.recruiting[i] = false;
          //   this.mdchuchun[i] = false;
          //   this.approaching[i] = false;
          //   this.endrecruit[i] = false;
          //   this.d3[i] = false;
          //   this.d2[i] = true;
          //   this.d1[i] = false;
          //   this.images.missionCount(data[i]._id).subscribe(data2 => {
          //     this.missionCounter2[i] = data2;
          //     this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
          //     //console.log(this.percent[i])
          //
          //     if (this.percent[i] <= 50) {
          //       this.ingmdchuchun[i] = true;
          //       this.ingapproaching[i] = false;
          //     }
          //     if (this.percent[i] > 50) {
          //       this.ingmdchuchun[i] = false;
          //       this.ingapproaching[i] = true;
          //     }
          //   });
          // } else if (this.diffdate(this.currentDate, data[i].startmission) > -2 && this.diffdate(this.currentDate, data[i].startmission) < -1) {
          //   //console.log("D-111111111");
          //   this.new[i] = false;
          //   this.recruiting[i] = false;
          //   this.mdchuchun[i] = false;
          //   this.approaching[i] = false;
          //   this.endrecruit[i] = false;
          //   this.d3[i] = false;
          //   this.d2[i] = false;
          //   this.d1[i] = true;
          //   this.images.missionCount(data[i]._id).subscribe(data2 => {
          //     this.missionCounter2[i] = data2;
          //     //console.log("최대인원 백분율 구하기 : " + parseInt(data[i].maxmember));
          //     //console.log("참여인원 백분율 구하기 : " + parseInt(this.missionCounter[i]));
          //     this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
          //     //console.log(this.percent[i])
          //
          //     if (this.percent[i] <= 50) {
          //       //console.log("MD추천");
          //       this.ingmdchuchun[i] = true;
          //       this.ingapproaching[i] = false;
          //     }
          //     if (this.percent[i] > 50) {
          //       //console.log("마감임박");
          //       this.ingmdchuchun[i] = false;
          //       this.ingapproaching[i] = true;
          //     }
          //   });
          // } else if (this.diffdate(this.currentDate, data[i].startmission) > -3 && this.diffdate(this.currentDate, data[i].startmission) <= 0) {
          //   // console.log("모집중 ");
          //   this.d1[i] = true;
          //   this.images.missionCount(data[i]._id).subscribe(data2 => {
          //     this.missionCounter2[i] = data2;
          //     // console.log("최대인원 백분율 구하기 : " + parseInt(data[i].maxmember));
          //     // console.log("참여인원 백분율 구하기 : " + parseInt(this.missionCounter[i]));
          //     this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
          //     // console.log(this.percent[i])
          //
          //     if (this.percent[i] <= 50) {
          //       // console.log("MD추천");
          //       this.ingmdchuchun[i] = true;
          //       this.ingapproaching[i] = false;
          //     }
          //     if (this.percent[i] > 50) {
          //       // console.log("마감임박");
          //       this.ingmdchuchun[i] = false;
          //       this.ingapproaching[i] = true;
          //     }
          //   });
          //
          // } else if (this.diffdate(this.currentDate, data[i].startmission) >= 0) {
          //   // console.log("진행중 + 모집마감 ");
          //   this.new[i] = false;
          //   this.recruiting[i] = false;
          //   this.mdchuchun[i] = false;
          //   this.approaching[i] = true;
          //   this.endrecruit[i] = true;
          // } else {
          //   this.new[i] = false;
          //   this.recruiting[i] = true;
          //   this.mdchuchun[i] = false;
          //   this.approaching[i] = false;
          //   this.endrecruit[i] = false;
          // }

          this.endcarezoneData = data[i];
          // }


        }
        this.carezoneData = data;
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
      if (data.length <= 0) {
        console.log("챌린지를 완료 했거나 참여중인게 없을때");
        // this.chkBtn = true; //챌린지 미 참여 중일때
      } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].missioncomplete) { //완료하지 못한 미션이 있는 체크
            this.missionData = data[i];
            this.missionID = data[i].missionID;
            // if (this.carezoneData2._id === data[i].missionID) { //완료하지 못한 미션이 현재 미션과 동일한지 체크
            //   this.chkBtn = true; //동일 하면 미션 시작할수 있도록 하고
            // } else {
            //   this.chkBtn = false; //동일하지 않으면 다른 챌림치 참여중이라고 한다.
            // }
          }
        }
      } else {
        console.log("이상한 값이 들어 왔을때 챌린지 참여 안한걸로");
        // this.chkBtn = false;
      }

      // if (data !== '' || data !== null) {
      //   //this.chkBtn = true;
      //   this.missionData = data;
      //   //this.endDate = data.endmission.substr(0, 10);
      //   //console.log(JSON.stringify(data));
      //   // this.loading.dismiss();
      // } else if (data === '' || data === null || data === undefined) {
      //   //this.chkBtn = false;
      // } else {
      //   this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      // }
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
        // console.log("미션데이터 : " + JSON.stringify(this.missionData));
        console.log("미션데이터 : " + this.missionData.missionID);
        // this.images.missionCount(this.missionData.missionID).subscribe(data2 => {
        //   this.ingmissionCounter = data2;
        // });
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
    if (this.platform.is("ios") && this.device.model === 'iPhone7,2' || this.device.model === 'iPhone8,1' || this.device.model === 'iPhone9,1' || this.device.model === 'iPhone9,3' || this.device.model === 'iPhone10,1' || this.device.model === 'iPhone10,4') {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        duration: 1000,
        cssClass: 'sk-rotating-plane_ios'
      });
      loading.present();
    } else if (this.platform.is("ios") && this.device.model === 'iPhone7,1' || this.device.model === 'iPhone8,2' || this.device.model === 'iPhone9,2' || this.device.model === 'iPhone9,4' || this.device.model === 'iPhone10,2' || this.device.model === 'iPhone10,5') {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        duration: 1000,
        cssClass: 'sk-rotating-plane_ios_plus'
      });
      loading.present();
    } else if (this.platform.is("ios") && this.device.model === 'iPhone10,3' || this.device.model === 'iPhone10,6' || this.device.model === 'iPhone11,2' || this.device.model === 'iPhone11,8' || this.device.model === 'iPhone12,1' || this.device.model === 'iPhone12,3') {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        duration: 1000,
        cssClass: 'sk-rotating-plane_ios_x'
      });
      loading.present();
    } else if (this.platform.is("ios") && this.device.model === 'iPhone11,4' || this.device.model === 'iPhone11,6' || this.device.model === 'iPhone12,5') {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        duration: 1000,
        cssClass: 'sk-rotating-plane_ios_x_max'
      });
      loading.present();
    } else {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        duration: 1000,
        cssClass: 'sk-rotating-plane'
      });
      loading.present();
    }
  }

  showAlert(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }
  showError(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

  timerTick() {
    // setTimeout(() => {
    //   // if (!this.runTimer) {
    //   //   clearTimeout(timer);
    //   //   console.log("Clear Timeout");
    //   //   return;
    //   // }
    //
    //   // this.secondsRemaining--;
    //   for (var i = 0; this.timeremaining.length; i++) {
    //     // console.log(i);
    //     // this.timeremaining[i]--;
    //     this.getSecondsAsDigitalClock(this.timeremaining[i], i);
    //   }
    //
    //   // if(this.secondsRemaining > 0) {
    //   this.timerTick();
    //   // } else {
    //   //   // this.hasFinished = true;
    //   // }
    //
    // }, 1000);
    // // if (!this.runTimer) {
    // //   clearTimeout(timer);
    // //   console.log("Clear Timeout");
    // //   return;
    // // }

    // Set the inital tick to 0
    this.subscriptionFourth = Observable.interval(1000).subscribe(x => {
      // 1000 implies miliseconds = 1 second
      // Basically run the following code per second
      for (var i = 0; i < this.timeremaining.length; i++) {
        this.timeremaining[i]--;
        // console.log(this.timeremaining[i]--);
        this.displayTime[i] = this.getSecondsAsDigitalClock(this.timeremaining[i]);
      }
      this.tickFourth--;
      this.tickThree--;
      let time = this.getSecondsAsDigitalClock(this.tickFourth);
      let time2 = this.getSecondsAsDigitalClock(this.tickThree);
      // console.log(time);
      // console.log(time2);
      // console.log(this.tickFourth);
      // console.log("this" + JSON.stringify(this.subscriptionFourth));

    });


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
    // console.log("displaytime : " + index + " : " + this.displayTime[index]);
  }

}
