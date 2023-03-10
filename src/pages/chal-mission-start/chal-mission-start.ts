import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Platform, ModalController, PopoverController } from 'ionic-angular';
import { CareZoneMissionCompletePage } from '../care-zone-mission-complete/care-zone-mission-complete';
import { ImagesProvider } from '../../providers/images/images';
import { ChalMissionIngPage } from '../chal-mission-ing/chal-mission-ing';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { KakaoCordovaSDK, KLCustomTemplate, KLLinkObject, KLSocialObject, KLButtonObject, KLContentObject, KLFeedTemplate, AuthTypes } from 'kakao-sdk';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ChalGuidePage } from '../chal-guide/chal-guide';
import { PopoverPage } from '../community/community-modify/popover/popover';



/**
 * Generated class for the CareZoneMissionStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chal-mission-start',
  templateUrl: 'chal-mission-start.html',
})
export class ChalMissionStartPage {
  _id: any;
  loading: Loading;
  carezoneData: any;
  carezoneData2: any;
  moreIngData: any;
  moreDDayData: any;
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
  missionCounter2: any;
  maxBtn: any = false;
  endchkBtn: any = false;
  getendday: any;
  endday: any;
  chkendDay: any;
  readybtn: any = false;
  dday_title: any;
  dday_body: any;
  dday_id: any;
  dday_startmission: any;
  dday_endmission: any;
  dday_maxmember: any;
  dday_title2: any;
  dday_body2: any;
  dday_id2: any;
  dday_startmission2: any;
  dday_endmission2: any;
  dday_maxmember2: any;
  getday2: any;
  dday2: any;
  chkDay2: any;
  getday3: any;
  dday3: any;
  chkDay3: any;
  bannerData: any;
  subscriptionFourth: any;
  timeremaining: any;
  starttimeremaining: Date = new Date();
  displayTime: any;
  chkDate: Date = new Date();
  joinchk: Boolean = false;
  UserImageFileName: any = '';
  missionmember: any;
  challengeChkBtn: boolean;
  day: any;
  sameDay : boolean;
  maxcount : boolean;
  dayString : any;
  chkStartDate : Date = new Date();
  isChkStartDate : boolean;
  startChallDate: any;
  registerReply = { comment: '', id: '', date: new Date()};
  reply = { comment: '', id: '', email: '' };
  profileimg_url: any;
  @ViewChild('myInput') myInput: ElementRef;
  comment_popover_option: any = "??????";
  comment_popover_option_textarea: any;
  updatevalue: any;
  commentTimeZone: Array<any> = new Array<any>();
  plinicUserImages: Array<any> = new Array<any>();



  constructor(
      private socialSharing: SocialSharing,
      public _kakaoCordovaSDK: KakaoCordovaSDK,
      public nav: NavController, 
      public navParams: NavParams, 
      private images: ImagesProvider,
      private loadingCtrl: LoadingController, 
      private alertCtrl: AlertController, 
      public platform: Platform, 
      private auth: AuthService,
      private themeableBrowser: ThemeableBrowser,
      public modalCtrl: ModalController,
      public element: ElementRef,
      public popoverCtrl: PopoverController,

    ) {
    this.platform.ready().then((readySource) => {

      this.bannerData = this.roadbanner();
    });

  }

  async ionViewDidLoad() {
    console.log("ionViewDidLoad Start");
    await this.loadItems();
    if (this.navParams.get('carezoeId')) {
      this.carezoneData2 = await this.roadmission(this.navParams.get('carezoeId'));
      await this.missionCount(this.carezoneData2);
      await this.missionCount2(this.carezoneData, new Date());
    }

    if (this.navParams.get('carezoneData')) {
      this.carezoneData2 = this.navParams.get('carezoneData');
      this.carezoneData2.comments.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) {
          return -1;
        }
        if (a.updatedAt < b.updatedAt) {
          return 1;
        }
        return 0;
      });
      await this.roadmission(this.carezoneData2._id);
      await this.missionCount(this.carezoneData2._id);
      await this.missionCount2(this.carezoneData2._id, new Date());

      this.images.getMissionMember(this.carezoneData2._id).subscribe(data3 => {
        if (data3 !== '') {
          this.missionmember = data3;
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
    }
    console.log("ionViewDidLoad End");

  }

  async ionViewWillEnter() {
    console.log("ionViewWillEnter Start");
    // console.log("Enter Mission Start");
    // this.showLoading();
    // this.getDday();
    // this.roadingmission();
    // this.roadddaymission();
    //this.loading.dismiss();
    // console.log("End Mission Start");
    console.log("ionViewWillEnter End");

  }
 

  ionViewDidEnter() {
    // this.timerTick();
    this.printWeek();
  }


  public roadbanner() {
    this.images.bannerRoad().subscribe(data => {
      this.bannerData = data;
    });
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
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
        }
        // this.chkmission(this.userData.email); 2020-02-10 ????????? ????????? ???????????? ?????? ??????
        this.challengeChkMission(this.userData.email);
        this.challengeChkStartDate(this.userData.email);
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
        // this.chkmission(this.userData.email); 2020-02-10 ????????? ????????? ???????????? ?????? ??????
        this.challengeChkMission(this.userData.email);
        this.challengeChkStartDate(this.userData.email);
        this.chkUserImage(this.userData.email);
        this.auth.getUserImage(this.userData.email).subscribe(items => {
          if (items) {
            this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
            this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
          }
        });
      }
    });
  }

  saveSkinQnaReply() {
    this.registerReply.id = this.carezoneData2._id;
    if (this.userData.from === 'kakao' || this.userData.from === 'naver' || this.userData.from === 'google') {
      this.auth.replyCareZoneSave(this.userData, this.registerReply).subscribe(data => {
        if (data !== "") {
          let alert2 = this.alertCtrl.create({
            cssClass: 'push_alert',
            title: '????????????',
            message: "????????? ??????????????? ?????????????????????.",
            buttons: [
              {
                text: '??????',
                handler: () => {
                  this.registerReply.comment = '';
                  this.textareaResize();
                  this.update();
                }
              }
            ]
          });
          alert2.present();
        }
        // this.nav.push(CareZoneMissionIngPage, { _id: id });
      }, error => {
        this.showError(JSON.parse(error._body).msg);
      });
    }
    else {
      this.auth.replyCareZoneSave(this.userData, this.registerReply).subscribe(data => {
        if (data !== "") {
          let alert2 = this.alertCtrl.create({
            cssClass: 'push_alert',
            title: '????????????',
            message: "????????? ??????????????? ?????????????????????.",
            buttons: [
              {
                text: '??????',
                handler: () => {
                  this.registerReply.comment = '';
                  this.textareaResize();
                  this.update();
                }
              }
            ]
          });
          alert2.present();
        }
        // this.nav.push(CareZoneMissionIngPage, { _id: id });
      }, error => {
        this.showError(JSON.parse(error._body).msg);
      });
    }
  }

  replySkinQnaUpdate(email, id) {
    this.reply.email = email;
    this.reply.id = id;
    // this.reply.comment = document.getElementById('updatereply').getAttribute('ng-reflect-model');
    this.reply.comment = this.updatevalue;

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "plinic",
      message: "????????? ?????? ???????????????????",
      buttons: [
        {
          text: '??????',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '??????',
          handler: () => {
            this.auth.replyCareZoneUpdate(this.reply).subscribe(data => {
              if (data !== "") {
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert',
                  title: '????????????',
                  message: "????????? ??????????????? ?????? ???????????????.",
                  buttons: [
                    {
                      text: '??????',
                      handler: () => {
                        // this.registerReply.comment = '';
                        this.comment_popover_option_textarea = -1;
                        this.textareaResize();
                        this.update();
                      }
                    }
                  ]
                });
                this.comment_popover_option = "??????";
                alert2.present();
              }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            }, error => {
              this.showError(JSON.parse(error._body).msg);
            });
          }
        }]
    });
    alert.present();
  }

  update() {
    // this.viewCtrl._didLoad();
    // this.viewCtrl._didEnter();
    this.roadmission(this.carezoneData2._id);
    // this.getUserimage();
    // this.missionMember(this.carezoneData2._id);
    // this.nav.setRoot(this.nav.getActive().component);
  }

  resize() {
    setTimeout(() => {
      this.myInput.nativeElement.style.height = 'auto'
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    }, 100)
  }

  textareaResize() {
    setTimeout(() => {
      this.myInput.nativeElement.style.height = '40px'
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    }, 100)
  }


  public mission_complete() {
    this.nav.push(CareZoneMissionCompletePage);
  }

  //20190617 ?????? ??????????????? ?????? ??????
  public chkmission(email) {
    // this.showLoading();
    // console.log("chkBtn" + this.chkBtn);
    this.images.chkMission(email).subscribe(data => {
      console.log(data.length);
      if (data.length <= 0) {
        // console.log("???????????? ?????? ????????? ??????????????? ?????????");
        this.chkBtn = true; //????????? ??? ?????? ?????????
      } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].missioncomplete) { //???????????? ?????? ????????? ?????? ??????
            if (this.carezoneData2._id === data[i].missionID) { //???????????? ?????? ????????? ?????? ????????? ???????????? ??????
              this.chkBtn = true; //?????? ?????? ?????? ???????????? ????????? ??????
            } else {
              this.chkBtn = false; //???????????? ????????? ?????? ????????? ?????????????????? ??????.
            }
          }
        }
      } else {
        console.log("????????? ?????? ?????? ????????? ????????? ?????? ????????????");
        this.chkBtn = false;
      }

      // if (data === '' || data === null || data === undefined) {
      //   this.chkBtn = true; //????????? ??? ?????? ?????????
      //   //this.carezoneData = data;
      //   //this.endDate = data.endmission.substr(0, 10);
      //   //console.log(JSON.stringify(data));
      //   // this.loading.dismiss();
      // } else if (data !== '' || data !== null || data !== undefined) {
      //   this.chkBtn = false; //????????? ?????? ?????? ???
      // } else {
      //   this.showError("???????????? ???????????? ???????????????. ??????????????? ???????????????.");
      // }
    });
  }


  //2020-02-10 ????????? ?????? ????????? ?????? ??????
  public challengeChkMission(email) {
    // this.showLoading();
    // console.log("chkBtn" + this.chkBtn);
    this.images.ChallengeChkMission(email).subscribe(data => {
      if (data.length <= 0) {
        this.challengeChkBtn = true; //????????? ??? ?????? ?????????
      } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].missioncomplete) { //???????????? ?????? ????????? ?????? ??????
            if (this.carezoneData2._id === data[i].missionID) { //???????????? ?????? ????????? ?????? ????????? ???????????? ??????
              this.challengeChkBtn = true; //?????? ?????? ?????? ???????????? ????????? ??????
            } else {
              this.challengeChkBtn = false; //???????????? ????????? ?????? ????????? ?????????????????? ??????.
            }
          }
        }
      } else {
        console.log("????????? ?????? ?????? ????????? ????????? ?????? ????????????");
        this.chkBtn = false;
      }
    });
  }

  //2020-04-14 ?????? ???????????? ?????? ?????? ???????????? ???????????? + 14?????? ???????????? ?????? // 14??? ???????????? ?????? ????????? ?????? ?????? ????????? ?????? ??????
  public challengeChkStartDate(email) {
    this.images.challengeChkStartDate(email).subscribe(data => {
      if (data.length <= 0) {
        this.isChkStartDate = true;
      } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if(data[i].createdAt) {
            var compareDay = this.getCovertKoreaTime(this.chkStartDate.setDate(new Date(this.getCovertKoreaTime(data[i].createdAt)).getDate() + 13))
            var today1 = new Date();
            var today2 = this.getCovertKoreaTime(today1); 
            this.startChallDate = compareDay.substr(0,10);

            if(today2 >= compareDay){ //???????????? ????????? ?????? ????????? 14???
              //?????? ????????? ?????? ????????? ?????? 2??? ????????????
              this.isChkStartDate = true;
            } else {
              //2??? ???????????????.
              this.isChkStartDate = false;
            }
          }
        }
      } else {
        this.chkBtn = false;
      }
    });
  }

  //20190617 ?????? ????????? ?????? count
  public missionCount(id) {
    // this.showLoading();
    this.images.challangeCount(id).subscribe(data => {
      this.missionCounter = data;
      // if (parseInt(this.missionCounter) === parseInt(this.carezoneData.maxmember)) {
      //   this.maxBtn = true;
      // } else {
      //   this.maxBtn = false;
      // }
    });
  }

  //20190617 ?????? ????????? ?????? count //20200615 ????????? ???????????? ????????? 5?????? ?????? ?????? ????????? ?????? ?????? ???????????? ??????
  public missionCount2(id, date) {
    // this.showLoading();
    this.images.challangeCount2(id, date).subscribe(data => {
      this.missionCounter2 = data;
      if(Number(this.missionCounter2) >= 5) {
        this.maxcount = true;
      } else {
        this.maxcount = false
      }
    });
  }



  public roadmission(id) {
    // this.showLoading();
    this.images.missionRoad(id).subscribe(data => {
      var yoil = new Date();
      this.day = yoil.getDay();
      if (data !== '') {
        this.carezoneData = data;
        this.carezoneData2 = data;
        this.carezoneData2.comments.sort((a, b) => {
          if (a.updatedAt > b.updatedAt) {
            return -1;
          }
          if (a.updatedAt < b.updatedAt) {
            return 1;
          }
          return 0;
        });
        this.startDate = data.startmission.substr(0, 10);
        this.endDate = data.endmission.substr(0, 10);
        this.chkDate = new Date(data.endmission);
        
        if (this.day === Number(this.carezoneData.day)){
          this.sameDay = true;
        }
        if (Number(this.carezoneData.day) === 2) {
          this.dayString = "?????????";
        } else if (Number(this.carezoneData.day) === 4) {
          this.dayString = "?????????";
        } else if (Number(this.carezoneData.day) === 0) {
          this.dayString = "?????????";
        }
        if (this.chkDate >= this.currentDate) {  // ????????? ????????? ?????? ?????????
          console.log("????????? ????????? ?????? ??????");
          this.joinchk = true;
        } else {
          console.log("????????? ????????? ?????? ???");
          this.joinchk = false;
        }
        // this.loading.dismiss();
        this.getCommentTimeZone();
        this.getUserimage();
      } else {
        this.showError("???????????? ???????????? ???????????????. ??????????????? ???????????????.");
      }

      // this.missionCount(this._id);

      // this.getday = new Date(this.carezoneData.startmission);
      // this.dday = this.diffdate(this.getday, this.currentDate);
      // this.starttimeremaining =
      this.timeremaining = (new Date(data.endmission).getTime() - new Date().getTime()) / 1000;
      // console.log("this.timeremaining" + this.timeremaining);

      // this.chkDay = this.dday
      // this.dday = parseInt(this.dday)
      // if (this.chkDay < 0) {
      //   //this.chkBtn = null;
      //   this.chkBtn2 = true;
      // } else {
      //   this.chkBtn2 = false;
      // }
      //
      // if (this.chkDay > 2.9) {
      //   // console.log("????????????" + this.chkDay);
      //   this.readybtn = false;
      // } else {
      //   // console.log("???????????????" + this.chkDay);
      //   this.readybtn = true;
      //
      // }
      //
      // this.getendday = new Date(this.carezoneData.endmission);
      // this.endday = this.diffdate(this.currentDate, this.getendday);
      // this.chkendDay = this.endday
      // // console.log("chkendDay" + this.chkendDay);
      // // this.dday = parseInt(this.dday)
      // if (this.chkendDay > 0) {
      //   //this.chkBtn = null;
      //   // console.log("?????? ?????? ??????");
      //   this.endchkBtn = true;
      //   // this.chkBtn2 = true;
      // } else {
      //   // console.log("?????? ?????? ?????????");
      //   this.endchkBtn = false;
      //   // this.chkBtn2 = false;
      // }


    });

    

  }

  public roadingmission() {
    // this.showLoading();
    this.images.moresecond_carezoneRoad().subscribe(data => {
      if (data !== '') {
        this.moreIngData = data;
        // this.startDate = data.startmission.substr(0, 10);
        // this.endDate = data.endmission.substr(0, 10);
        //console.log(JSON.stringify(data));
        // this.loading.dismiss();
      }

      // else {
      //   this.showError("?????? ??? ?????? ???????????? ?????? ?????? ???????????????. ??????????????? ???????????????.");
      // }

      this.missionCount(data[0]._id);


    });

  }

  public roadddaymission() {
    // this.showLoading();
    this.images.morethird_carezoneRoad().subscribe(data => {
      if (data !== '') {
        if (data.length === 2) {
          this.dday_title = data[0].title;
          this.dday_body = data[0].body;
          this.dday_id = data[0]._id;
          this.dday_startmission = data[0].startmission;
          this.dday_endmission = data[0].endmission;
          this.dday_maxmember = data[0].maxmebmer;

          this.getday2 = new Date(this.dday_startmission);
          this.dday2 = this.diffdate(this.getday2, this.currentDate);
          this.chkDay2 = this.dday2
          this.dday2 = (parseInt(this.dday2) - 2)

          this.dday_title2 = data[1].title;
          this.dday_body2 = data[1].body;
          this.dday_id2 = data[1]._id;
          this.dday_startmission2 = data[1].startmission;
          this.dday_endmission2 = data[1].endmission;
          this.dday_maxmember2 = data[1].maxmebmer;

          this.getday3 = new Date(this.dday_startmission2);
          this.dday3 = this.diffdate(this.getday3, this.currentDate);
          this.chkDay3 = this.dday3
          this.dday3 = (parseInt(this.dday3) - 2)

        } else if (data.length === 1) {
          this.dday_title = data[0].title;
          this.dday_body = data[0].body;
          this.dday_id = data[0]._id;
          this.dday_startmission = data[0].startmission;
          this.dday_endmission = data[0].endmission;
          this.dday_maxmember = data[0].maxmebmer;

          this.getday2 = new Date(this.dday_startmission);
          this.dday2 = this.diffdate(this.getday2, this.currentDate);
          this.chkDay2 = this.dday2
          this.dday2 = (parseInt(this.dday2) - 2)
        } else {

        }
        //console.log(JSON.stringify(data));
        // this.loading.dismiss();
      }

      // else {
      //   this.showError("?????? ??? ?????? ???????????? ?????? ?????? ???????????????. ??????????????? ???????????????.");
      // }
      this.missionCount(data[0]._id);



    });

  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showMissionError() {
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: '???????????? 1??? ????????? ?????? ??? ??? ????????????. <br /> ?????? ????????? ?????? ????????? <br /> ????????? ????????? ?????? ????????????.',
      buttons: [{
        text: '??????'
      }]
    });
    alert.present();
  }

  showMissionEndError() {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: '?????? ???????????? ?????????????????????. <br /> ???????????? ???????????? ?????? ??? ??? ????????????. <br/> ?????? ????????? : ' + this.startDate,
      buttons: [{
        text: '??????'
      }]
    });
    alert.present();
  }

  showMissionMaxEndError() {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: '?????? ???????????? ??????????????? ?????? ???????????????. <br /> ?????? ????????? ????????? ?????????.',
      buttons: [{
        text: '??????',
        handler: () => {
          // console.log("aaaaaaaaaa");
        }
      }],

    });
    alert.present();
  }

  showStartDateError() {
    //this.loading.dismiss();

    if(this.platform.is('android')) {
      let alert = this.alertCtrl.create({
        cssClass: 'push_alert_android',
        title: 'Plinic',
        message: '???????????? ?????? ?????? ?????????????????? <br />' + this.startChallDate + ' ?????????.',
        buttons: [{
          text: '??????',
          handler: () => {
            // console.log("aaaaaaaaaa");
          }
        }],
  
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        cssClass: 'push_alert',
        title: 'Plinic',
        message: '???????????? ?????? ?????? ?????????????????? <br />' + this.startChallDate + ' ?????????.',
        buttons: [{
          text: '??????',
          handler: () => {
            // console.log("aaaaaaaaaa");
          }
        }],
  
      });
      alert.present();
    }

    
  }

  showError(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: [{
        text: '??????'
      }]
    });
    alert.present();
  }

  //20190614 ?????? ?????? ?????? ??? Mission ???????????? ????????? ??????
  satrtMission(carezoneData) {
    //console.log(id);
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      // title: "?????? ??????",
      message: "????????? ???????????? ?????? ?????????! <br> ???????????? ???????????? ???????????? <br> ?????? ???????????????????",
      buttons: [
        {
          text: '??????',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '??????',
          handler: () => {
            //this.nav.push(CareZoneMissionIngPage);
            // console.log("????????????: "+ this.carezoneData.maxmember)
            

            this.auth.challengeSave(carezoneData._id, this.userData.email, this.userData.thumbnail_image,
              carezoneData.startmission, carezoneData.endmission, carezoneData.title,
              carezoneData.body, carezoneData.productcount, this.UserImageFileName, carezoneData.filename).subscribe(data => {
                // console.log("?????? ?????? : " + JSON.stringify(carezoneData));
                this.nav.push(ChalMissionIngPage, { carezoneData: carezoneData });
              }, error => {
                // console.log("?????? ?????? : " + JSON.stringify(carezoneData));
                this.showError(JSON.parse(error._body).msg);
                // this.nav.push(CareZoneMissionIngPage, { carezoneData: carezoneData });
              });
            
            
            
            // 2020-02-10 mission table??? ?????? challenge table??? ???????????? ?????????.
            // this.auth.missionSave(carezoneData._id, this.userData.email, this.userData.thumbnail_image,
            //   carezoneData.startmission, carezoneData.endmission, carezoneData.title,
            //   carezoneData.body, carezoneData.productcount, this.UserImageFileName, carezoneData.filename).subscribe(data => {
            //     // console.log("?????? ?????? : " + JSON.stringify(carezoneData));
            //     this.nav.push(ChalMissionIngPage, { carezoneData: carezoneData });
            //   }, error => {
            //     // console.log("?????? ?????? : " + JSON.stringify(carezoneData));
            //     this.showError(JSON.parse(error._body).msg);
            //     // this.nav.push(CareZoneMissionIngPage, { carezoneData: carezoneData });
            //   });

          }
        }]
    });
    alert.present();

  }





  public diffdate(date1: Date = new Date(), date2: Date = new Date()) {
    return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
  }

  public getDday() {
    // console.log(this.carezoneData);
    //this.getday = new Date(this.carezoneData.startmission)
    //this.dday = this.diffdate(this.getday, this.currentDate)
    //console.log("D-Day :" + this.dday);
  }

  public openCareZoneTab(): void {
    // The second tab is the one with the index = 1
    //this.nav.push(TabsPage, { selectedTab: 1 });
    this.nav.parent.select(1);
  }

  public mission_start(id) {
    //console.log(id);
    //console.log("missiondata" + this.missionData.missionID);

    // if (this.missionData === null || this.missionData === undefined) {
    //   //this.nav.push(CareZoneMissionIngPage);
    //   this.nav.push(CareZoneMissionStartPage, { _id: id });
    // } else if (id === this.missionData.missionID) {
    //   this.nav.push(CareZoneMissionIngPage, { _id: id });
    //
    // } else {
    this.nav.push(ChalMissionStartPage, { _id: id });
    // }
  }

  timerTick() {
    this.subscriptionFourth = Observable.interval(1000).subscribe(x => {
      // 1000 implies miliseconds = 1 second
      // Basically run the following code per second
      this.timeremaining--;
      // console.log(this.timeremaining[i]--);
      this.displayTime = this.getSecondsAsDigitalClock(this.timeremaining);
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


  kakaoLink(loadData) {
    let feedLink: KLLinkObject = {
      webURL: 'http://g1p.co.kr',
    };

    let feedSocial: KLSocialObject = {
      viewCount: parseInt(loadData.views),
    };

    let feedButtons1: KLButtonObject = {
      title: '????????? ????????????',
      link: {
        mobileWebURL: 'http://g1p.co.kr',
      },
    };

    let feedButtons2: KLButtonObject = {
      title: '????????? ??????',
      link: {
        iosExecutionParams: 'param1=value1&param2=value2',
        androidExecutionParams: 'param1=value1&param2=value2',
      },
    };

    if (this.platform.is('ios')) {
      var feedContent: KLContentObject = {
        title: loadData.title,
        desc: loadData.body,
        link: feedLink,
        imageWidth: '360px',
        imageHeight: '202px',
        imageURL: 'https://plinic.s3.ap-northeast-2.amazonaws.com/' + loadData.filename
      };
    } else { //??????????????? ???????????? ????????? ??????????????? 3?????? ??????
      var feedContent: KLContentObject = {
        title: loadData.title,
        link: feedLink,
        imageURL: 'https://plinic.s3.ap-northeast-2.amazonaws.com/' + loadData.filename
      };
    }

    // var feedContent: KLContentObject = {
    //   title: loadData.title,
    //   desc: loadData.body,
    //   link: feedLink,
    //   imageWidth: '360px',
    //   imageHeight: '202px',
    //   imageURL: 'https://plinic.s3.ap-northeast-2.amazonaws.com/' + loadData.filename
    // };

    let feedTemplate: KLFeedTemplate = {
      content: feedContent,
      social: feedSocial,
      buttons: [feedButtons1, feedButtons2]
    };

    this._kakaoCordovaSDK
      .sendLinkFeed(feedTemplate)
      .then(
        res => {
          console.log(res);
          console.log("????????? ?????? ?????? ??????----------------------------------------");
        },
        err => {
          console.log(err);
          console.log("????????? ?????? ?????? ??????----------------------------------------");
        }
      )
      .catch(err => {
        console.log(err);
        console.log("????????? ?????? ?????? ?????????????????????----------------------------------------");
      });
  }

  share_facebook(loaddata) {
    // this.socialSharing.shareVia("com.apple.social.facebook", "Hello Plinic", "???????????? ????????????", "http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png", "http://g1p.co.kr")
    // .then(()=>{console.log("???????????? ?????? ??????")})
    // .catch(()=>{console.log("???????????? ?????? ??????")});
    this.socialSharing.shareViaFacebook("Plinic", 'http://plinic.cafe24app.com/challenge_image1/' + loaddata._id, "http://g1p.co.kr").then(res => {
      console.log("???????????? ?????? ?????? : " + res);
    }, err => {
      console.log("???????????? ?????? ?????? : " + err)
      if (err === 'cancelled') {
        console.log("???????????? ?????? ???????????? ?????? ??? : " + err);
      }
      if (err === 'not available') {
        console.log("???????????? ?????? ??????????????? ???");
      }
    });
  }

  share() {
    this.showAlert("?????????", "?????? ?????? ?????? ??????????????????.")
    //
    // var url = encodeURI(encodeURIComponent("https://g1p.co.kr/company/plinicstory.html"));
    // var title = encodeURI("???????????? ???????????? ?????????");
    // // var shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
    // var shareURL = "https://band.us/plugin/share?body='?????????'&route='Plinic'";
    // let successComes: boolean = false;
    //
    // document.location.href = shareURL;

    // this.browserRef = this.iab.create(shareURL, "_blank");
    // this.browserRef.on("exit").subscribe((event: InAppBrowserEvent) => {
    // let successComes: boolean = false;
    // console.log("exit comes: " + JSON.stringify(event));
    //???????????? done??? ??????????????? ????????? ?????????
    // setTimeout(() => {
    // if (!successComes) {
    // let reason = { stage: "login_err", msg: "no input" };
    // }
    // }, 1000); //  1 second. Is it enough?

    // });
    // this.browserRef.on("loadstart").subscribe((event: InAppBrowserEvent) => {
    //   console.log("loadstart --------------------------------------- : " + JSON.stringify(event));
    // })
    // document.location.href = shareURL;
  }



  doKakaoLogin() {
    var url = encodeURI(encodeURIComponent("https://g1p.co.kr/company/plinicstory.html"));
    var title = encodeURI("???????????? ???????????? ?????????");
    var shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;

    document.location.href = shareURL;

    // let successComes: boolean = false;
    // this.browserRef = this.iab.create(shareURL, "_blank");
    // this.browserRef.on("exit").subscribe((event: InAppBrowserEvent) => {
    //   let successComes: boolean = false;
    //   console.log("exit comes: " + JSON.stringify(event));
    //   setTimeout(() => {
    //     if (!successComes) {
    //       let reason = { stage: "login_err", msg: "no input" };
    //     }
    //   }, 1000); //  1 second. Is it enough?
    //
    // });
    // this.browserRef.on("loadstart").subscribe((event: InAppBrowserEvent) => {
    //   console.log("loadstart --------------------------------------- : " + event);
    // })
  }


  //20191025 ?????? ?????? ?????? Userimages?????? ????????? ???????????? ?????? ?????? (????????? s3?????? ???????????? ?????? ?????? ?????????)
  public chkUserImage(email) {
    // this.showLoading();
    // console.log("chkBtn" + this.chkBtn);
    this.images.chkUserImage(email).subscribe(data => {
      if (data) {
        this.UserImageFileName = data;
        console.log("????????? ????????? ???????????? ??? ?????? ??????????" + data);
      }
      // if (data === '' || data === null || data === undefined) {
      //   this.chkBtn = true; //????????? ??? ?????? ?????????
      // } else if (data !== '' || data !== null || data !== undefined) {
      //   this.chkBtn = false; //????????? ?????? ?????? ???
      // } else {
      //
      // }
    });
  }

  openBrowser_ios(url, title) {

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#FFFFFF',
        showPageTitle: false,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'right',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'right',
        event: 'forwardPressed'
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

    browser.on('sharePressed').subscribe(data => {
      console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    })
  }

  openBrowser_android(url, title) {

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#FFFFFF',
        showPageTitle: true,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'right',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'right',
        event: 'forwardPressed'
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

    browser.on('sharePressed').subscribe(data => {
      console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    })
  }

  showAlert(title, message) {
    // this.runTimer = false;
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: message,
      buttons: [{
        text: '??????',
        handler: () => {
        }
      }]
    });
      alert.present();
  }

  getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset()*60000).toISOString()
  }

  getCovertKoreaTimePlus14(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset()*60000).toISOString()
  }

  //20200521 ???????????? ???????????? ??????
  chalguide() {
    let modal = this.modalCtrl.create(ChalGuidePage);
    modal.onDidDismiss(data => {
      console.log("???????????? ????????? ??????");
    });
    modal.present();
  }

  formatDate(date) {
    var mymonth = date.getMonth()+1;
    var myweekday = date.getDate();
    return (mymonth + "/" + myweekday);
  }

  printWeek() {
      var now = new Date();
      var nowDayOfWeek = now.getDay();
      var nowDay = now.getDate();
      var nowMonth = now.getMonth();
      var nowYear = now.getFullYear();
      nowYear += (nowYear < 2000) ? 1900 : 0;
      var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
      var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
      console.log("???????????? :  " + this.formatDate(weekStartDate) + " - " + this.formatDate(weekEndDate));
  }

  protected adjustTextarea(): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    textArea.style.cursor = 'pointer';
    return;
  }

  protected adjustTextareaUpdate(event): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    textArea.style.cursor = 'pointer';
    this.updatevalue = event.target.value;
    return;
  }

  getCommentTimeZone() {
    for (let i = 0; i < this.carezoneData2.comments.length; i++) {
      this.commentTimeZone[i] = new Date(this.carezoneData2.comments[i].createdAt).getFullYear() + "-" + new Date(this.carezoneData2.comments[i].createdAt).getMonth() + "-" + new Date(this.carezoneData2.comments[i].createdAt).getDay() + " " + new Date(this.carezoneData2.comments[i].createdAt).getHours() + ":" + new Date(this.carezoneData2.comments[i].createdAt).getMinutes() + ":" + new Date(this.carezoneData2.comments[i].createdAt).getSeconds()
      // console.log("abcd : " + this.commentTimeZone[i]);
    }
  }

  getUserimage() {
    for (let i = 0; i < this.carezoneData2.comments.length; i++) {
      this.images.chkUserImage(this.carezoneData2.comments[i].email).subscribe(data => {
        if(data !== 'NOTFOUND'){
          this.plinicUserImages[i] = 'https://plinic.s3.ap-northeast-2.amazonaws.com/' + data
        }
      })
    }

    // return 'https://plinic.s3.ap-northeast-2.amazonaws.com/image-1574732479055';
  }

  // ????????? ????????? ????????2020-06-02
  emailSecurity(userEmail){
    var??id = userEmail.split('@')[0];??
    var??mail = userEmail.split('@')[1];??
    var??maskingId =??function(id){??
      var??splitId = id.substring(0,2);??
      for(var??i =??1; i < id.length; i++){ 
        splitId +=??'*'; 
      }??
      return??splitId; 
    };??
    var??maskingMail =??function(mail){??
      var??splitMail =??'';??
      for(var??i =??1; i < mail.length; i++){ 
        splitMail +=??'*'; 
      } splitMail += mail.substring(mail.length-1,mail.length);??
      return??splitMail; 
    }; 
    userEmail = maskingId(id) +??'@'??+ (mail);??
    return??userEmail; 
  }

  // ?????? ??????
  public comment_popover(event, i, email, id) {
    if (this.platform.is('ios') || this.platform.is('core')) {
      let popover = this.popoverCtrl.create(PopoverPage, {},
        {
          cssClass: "ios_comment_popover"
        });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(popoverData => {
        this.comment_popover_option = popoverData;
        if (popoverData === "??????") {
          this.comment_popover_option_textarea = i;
          setTimeout(() => {
            // this.mytextarea.setFocus();
            this.myInput.nativeElement.focus();
            // this.presentLoading();
            this.resize();
          }, 100)
        }
        else if (popoverData === "??????") {
          // console.log('comment_popover_option==========' + this.comment_popover_option);
          this.reply.email = email;
          this.reply.id = id;

          // this.reply.comment = document.getElementById('updatereply').getAttribute('ng-reflect-model');

          let alert = this.alertCtrl.create({
            cssClass: 'push_alert_cancel',
            title: "plinic",
            message: "????????? ????????? ?????????????????????????",
            buttons: [
              {
                text: '??????',
                role: 'cancel',
                handler: () => {
                  console.log('??????');
                }
              },
              {
                text: '??????',
                handler: () => {
                  this.auth.replyCareZoneDelete(this.reply).subscribe(data => {
                    if (data !== "") {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '????????????',
                        message: "????????? ??????????????? ?????? ???????????????.",
                        buttons: [
                          {
                            text: '??????',
                            handler: () => {
                              // this.registerReply.comment = '';
                              this.comment_popover_option_textarea = -1;
                              // this.textareaResize();
                              this.update();
                            }
                          }
                        ]
                      });
                      alert2.present();
                    }
                    // this.nav.push(CareZoneMissionIngPage, { _id: id });
                  }, error => {
                    this.showError(JSON.parse(error._body).msg);
                  });
                }
              }]
          });
          alert.present();
        }
      });
    }
    else {
      let popover = this.popoverCtrl.create(PopoverPage, {},
        {
          cssClass: "android_comment_popover"
        });
      popover.present({
        ev: event
      });

      popover.onDidDismiss(popoverData => {
        this.comment_popover_option = popoverData;
        if (popoverData === "??????") {
          this.comment_popover_option_textarea = i;
          setTimeout(() => {
            // this.mytextarea.setFocus();
            this.myInput.nativeElement.focus();
            // this.presentLoading();
            this.resize();
          }, 100)
        }
        else if (popoverData === "??????") {
          // console.log('comment_popover_option==========' + this.comment_popover_option);
          this.reply.email = email;
          this.reply.id = id;
          // this.reply.comment = document.getElementById('updatereply').getAttribute('ng-reflect-model');

          let alert = this.alertCtrl.create({
            cssClass: 'push_alert_cancel',
            title: "plinic",
            message: "????????? ????????? ?????????????????????????",
            buttons: [
              {
                text: '??????',
                role: 'cancel',
                handler: () => {
                }
              },
              {
                text: '??????',
                handler: () => {
                  this.auth.replyCareZoneDelete(this.reply).subscribe(data => {
                    if (data !== "") {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '????????????',
                        message: "????????? ??????????????? ?????? ???????????????.",
                        buttons: [
                          {
                            text: '??????',
                            handler: () => {
                              // this.registerReply.comment = '';
                              this.comment_popover_option_textarea = -1;
                              // this.textareaResize();
                              this.update();
                            }
                          }
                        ]
                      });
                      alert2.present();
                    }
                    // this.nav.push(CareZoneMissionIngPage, { _id: id });
                  }, error => {
                    this.showError(JSON.parse(error._body).msg);
                  });
                }
              }]
          });
          alert.present();
        }
      });
    }
  }

}
