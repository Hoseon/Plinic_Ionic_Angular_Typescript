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
  comment_popover_option: any = "보기";
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
        if(this.platform.is('android')) {
          this.platform.registerBackButtonAction(()=>{
            this.nav.pop();
            // this.auth.setUserStoragetab(0);
        })
      }
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
        // this.chkmission(this.userData.email); 2020-02-10 챌린지 체크로 변경되어 주석 처리
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
        // this.chkmission(this.userData.email); 2020-02-10 챌린지 체크로 변경되어 주석 처리
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
            title: '댓글달기',
            message: "댓글이 정상적으로 등록되었습니다.",
            buttons: [
              {
                text: '확인',
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
            title: '댓글달기',
            message: "댓글이 정상적으로 등록되었습니다.",
            buttons: [
              {
                text: '확인',
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
      message: "댓글을 수정 하시겠습니까?",
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
            this.auth.replyCareZoneUpdate(this.reply).subscribe(data => {
              if (data !== "") {
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert',
                  title: '댓글삭제',
                  message: "댓글이 정상적으로 수정 되었습니다.",
                  buttons: [
                    {
                      text: '확인',
                      handler: () => {
                        // this.registerReply.comment = '';
                        this.comment_popover_option_textarea = -1;
                        this.textareaResize();
                        this.update();
                      }
                    }
                  ]
                });
                this.comment_popover_option = "보기";
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

  //20190617 미션 참여중인지 체크 하기
  public chkmission(email) {
    // this.showLoading();
    // console.log("chkBtn" + this.chkBtn);
    this.images.chkMission(email).subscribe(data => {
      console.log(data.length);
      if (data.length <= 0) {
        // console.log("챌린지를 완료 했거나 참여중인게 없을때");
        this.chkBtn = true; //챌린지 미 참여 중일때
      } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].missioncomplete) { //완료하지 못한 미션이 있는 체크
            if (this.carezoneData2._id === data[i].missionID) { //완료하지 못한 미션이 현재 미션과 동일한지 체크
              this.chkBtn = true; //동일 하면 미션 시작할수 있도록 하고
            } else {
              this.chkBtn = false; //동일하지 않으면 다른 챌림치 참여중이라고 한다.
            }
          }
        }
      } else {
        console.log("이상한 값이 들어 왔을때 챌린지 참여 안한걸로");
        this.chkBtn = false;
      }

      // if (data === '' || data === null || data === undefined) {
      //   this.chkBtn = true; //챌린지 미 참여 중일때
      //   //this.carezoneData = data;
      //   //this.endDate = data.endmission.substr(0, 10);
      //   //console.log(JSON.stringify(data));
      //   // this.loading.dismiss();
      // } else if (data !== '' || data !== null || data !== undefined) {
      //   this.chkBtn = false; //챌린지 참여 중일 때
      // } else {
      //   this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      // }
    });
  }


  //2020-02-10 챌린지 참여 중인지 체크 하기
  public challengeChkMission(email) {
    // this.showLoading();
    // console.log("chkBtn" + this.chkBtn);
    this.images.ChallengeChkMission(email).subscribe(data => {
      if (data.length <= 0) {
        this.challengeChkBtn = true; //챌린지 미 참여 중일때
      } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].missioncomplete) { //완료하지 못한 미션이 있는 체크
            if (this.carezoneData2._id === data[i].missionID) { //완료하지 못한 미션이 현재 미션과 동일한지 체크
              this.challengeChkBtn = true; //동일 하면 미션 시작할수 있도록 하고
            } else {
              this.challengeChkBtn = false; //동일하지 않으면 다른 챌림치 참여중이라고 한다.
            }
          }
        }
      } else {
        console.log("이상한 값이 들어 왔을때 챌린지 참여 안한걸로");
        this.chkBtn = false;
      }
    });
  }

  //2020-04-14 제일 마지막에 참여 했던 챌린지의 시작날짜 + 14일이 지났는지 체크 // 14일 이전에는 다른 미션에 참가 할수 없도록 하기 위함
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

            if(today2 >= compareDay){ //사용자의 챌린지 등록 날짜가 14일
              //오늘 날짜가 최초 등록일 보다 2주 지났을대
              this.isChkStartDate = true;
            } else {
              //2주 안지났을때.
              this.isChkStartDate = false;
            }
          }
        }
      } else {
        this.chkBtn = false;
      }
    });
  }

  //20190617 미션 참여자 인원 count
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

  //20190617 미션 참여자 인원 count //20200615 참여가 가능한날 인원이 5명이 넘을 경우 미션에 참여 하지 못하도록 한다
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
          this.dayString = "화요일";
        } else if (Number(this.carezoneData.day) === 4) {
          this.dayString = "목요일";
        } else if (Number(this.carezoneData.day) === 0) {
          this.dayString = "일요일";
        }
        if (this.chkDate >= this.currentDate) {  // 챌린지 기간이 남아 있을때
          console.log("챌린지 기간이 남아 있음");
          this.joinchk = true;
        } else {
          console.log("챌린지 기간이 종료 됨");
          this.joinchk = false;
        }
        // this.loading.dismiss();
        this.getCommentTimeZone();
        this.getUserimage();
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
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
      //   // console.log("참여불가" + this.chkDay);
      //   this.readybtn = false;
      // } else {
      //   // console.log("참여안불가" + this.chkDay);
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
      //   // console.log("미션 날짜 지남");
      //   this.endchkBtn = true;
      //   // this.chkBtn2 = true;
      // } else {
      //   // console.log("미션 날짜 안지남");
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
      //   this.showError("미션 더 보기 데이터를 불러 오지 못했습니다. 관리자에게 문의하세요.");
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
      //   this.showError("미션 더 보기 데이터를 불러 오지 못했습니다. 관리자에게 문의하세요.");
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
      message: '플리닉은 1개 미션만 참가 할 수 있습니다. <br /> 다른 미션에 참가 하려면 <br /> 등록한 미션을 포기 해주세요.',
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }

  showMissionEndError() {
    //this.loading.dismiss();

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
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: '해당 이벤트의 모집인원이 초과 되었습니다. <br /> 다음 기회에 참여해 주세요.',
      buttons: [{
        text: '확인',
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
        message: '회원님의 다음 미션 참여가능일은 <br />' + this.startChallDate + ' 입니다.',
        buttons: [{
          text: '확인',
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
        message: '회원님의 다음 미션 참여가능일은 <br />' + this.startChallDate + ' 입니다.',
        buttons: [{
          text: '확인',
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
        text: '확인'
      }]
    });
    alert.present();
  }

  //20190614 미션 시작 질의 후 Mission 테이블에 데이터 저장
  satrtMission(carezoneData) {
    //console.log(id);
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      // title: "미션 참여",
      message: "꾸준한 스킨케어 습관 만들기! <br> 일주일간 연속사용 챌린지에 <br> 도전 하시겠습니까?",
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
            //this.nav.push(CareZoneMissionIngPage);
            // console.log("맥스멤버: "+ this.carezoneData.maxmember)
            

            this.auth.challengeSave(carezoneData._id, this.userData.email, this.userData.thumbnail_image,
              carezoneData.startmission, carezoneData.endmission, carezoneData.title,
              carezoneData.body, carezoneData.productcount, this.UserImageFileName, carezoneData.filename).subscribe(data => {
                // console.log("처리 성공 : " + JSON.stringify(carezoneData));
                this.nav.push(ChalMissionIngPage, { carezoneData: carezoneData });
              }, error => {
                // console.log("처리 실패 : " + JSON.stringify(carezoneData));
                this.showError(JSON.parse(error._body).msg);
                // this.nav.push(CareZoneMissionIngPage, { carezoneData: carezoneData });
              });
            
            
            
            // 2020-02-10 mission table이 아닌 challenge table에 저장하게 하였다.
            // this.auth.missionSave(carezoneData._id, this.userData.email, this.userData.thumbnail_image,
            //   carezoneData.startmission, carezoneData.endmission, carezoneData.title,
            //   carezoneData.body, carezoneData.productcount, this.UserImageFileName, carezoneData.filename).subscribe(data => {
            //     // console.log("처리 성공 : " + JSON.stringify(carezoneData));
            //     this.nav.push(ChalMissionIngPage, { carezoneData: carezoneData });
            //   }, error => {
            //     // console.log("처리 실패 : " + JSON.stringify(carezoneData));
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
      title: '플리닉 바로가기',
      link: {
        mobileWebURL: 'http://g1p.co.kr',
      },
    };

    let feedButtons2: KLButtonObject = {
      title: '앱에서 확인',
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
    } else { //안드로이드 카카오톡 공유는 파라메터가 3개만 허용
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
          console.log("카카오 링크 공유 성공----------------------------------------");
        },
        err => {
          console.log(err);
          console.log("카카오 링크 공유 실패----------------------------------------");
        }
      )
      .catch(err => {
        console.log(err);
        console.log("카카오 링크 공유 캐치ㅣㅣㅣㅣㅣ----------------------------------------");
      });
  }

  share_facebook(loaddata) {
    // this.socialSharing.shareVia("com.apple.social.facebook", "Hello Plinic", "플리닉을 사용하자", "http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png", "http://g1p.co.kr")
    // .then(()=>{console.log("페이스북 공유 성공")})
    // .catch(()=>{console.log("페이스북 공유 실패")});
    this.socialSharing.shareViaFacebook("Plinic", 'http://plinic.cafe24app.com/challenge_image1/' + loaddata._id, "http://g1p.co.kr").then(res => {
      console.log("페이스북 공유 성공 : " + res);
    }, err => {
      console.log("페이스북 공유 실패 : " + err)
      if (err === 'cancelled') {
        console.log("페이스북 공유 하려다가 취소 됨 : " + err);
      }
      if (err === 'not available') {
        console.log("페이스북 공유 성공적으로 됨");
      }
    });
  }

  share() {
    this.showAlert("준비중", "밴드 공유 기능 준비중입니다.")
    //
    // var url = encodeURI(encodeURIComponent("https://g1p.co.kr/company/plinicstory.html"));
    // var title = encodeURI("플라즈마 미용기기 플리닉");
    // // var shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
    // var shareURL = "https://band.us/plugin/share?body='플리닉'&route='Plinic'";
    // let successComes: boolean = false;
    //
    // document.location.href = shareURL;

    // this.browserRef = this.iab.create(shareURL, "_blank");
    // this.browserRef.on("exit").subscribe((event: InAppBrowserEvent) => {
    // let successComes: boolean = false;
    // console.log("exit comes: " + JSON.stringify(event));
    //사용자가 done을 눌러야지만 추적이 가능함
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
    var title = encodeURI("플라즈마 미용기기 플리닉");
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


  //20191025 미션 참여 할때 Userimages에서 사용자 파일명을 가져 온다 (아마존 s3에서 이미지를 가져 오기 위해서)
  public chkUserImage(email) {
    // this.showLoading();
    // console.log("chkBtn" + this.chkBtn);
    this.images.chkUserImage(email).subscribe(data => {
      if (data) {
        this.UserImageFileName = data;
        console.log("사용자 이미지 파일명을 잘 가져 왔는가?" + data);
      }
      // if (data === '' || data === null || data === undefined) {
      //   this.chkBtn = true; //챌린지 미 참여 중일때
      // } else if (data !== '' || data !== null || data !== undefined) {
      //   this.chkBtn = false; //챌린지 참여 중일 때
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
        text: '확인',
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

  //20200521 이용안내 페이지로 이동
  chalguide() {
    let modal = this.modalCtrl.create(ChalGuidePage);
    modal.onDidDismiss(data => {
      console.log("이용안내 페이지 닫힘");
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
      console.log("이번주는 :  " + this.formatDate(weekStartDate) + " - " + this.formatDate(weekEndDate));
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

  // 이메일 마스킹 처리 2020-06-02
  emailSecurity(userEmail){
    var id = userEmail.split('@')[0]; 
    var mail = userEmail.split('@')[1]; 
    var maskingId = function(id){ 
      var splitId = id.substring(0,2); 
      for(var i = 1; i < id.length; i++){ 
        splitId += '*'; 
      } 
      return splitId; 
    }; 
    var maskingMail = function(mail){ 
      var splitMail = ''; 
      for(var i = 1; i < mail.length; i++){ 
        splitMail += '*'; 
      } splitMail += mail.substring(mail.length-1,mail.length); 
      return splitMail; 
    }; 
    userEmail = maskingId(id) + '@' + (mail); 
    return userEmail; 
  }

  // 댓글 수정
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
        if (popoverData === "수정") {
          this.comment_popover_option_textarea = i;
          setTimeout(() => {
            // this.mytextarea.setFocus();
            this.myInput.nativeElement.focus();
            // this.presentLoading();
            this.resize();
          }, 100)
        }
        else if (popoverData === "삭제") {
          // console.log('comment_popover_option==========' + this.comment_popover_option);
          this.reply.email = email;
          this.reply.id = id;

          // this.reply.comment = document.getElementById('updatereply').getAttribute('ng-reflect-model');

          let alert = this.alertCtrl.create({
            cssClass: 'push_alert_cancel',
            title: "plinic",
            message: "댓글을 정말로 삭제하시겠습니까?",
            buttons: [
              {
                text: '취소',
                role: 'cancel',
                handler: () => {
                  console.log('취소');
                }
              },
              {
                text: '확인',
                handler: () => {
                  this.auth.replyCareZoneDelete(this.reply).subscribe(data => {
                    if (data !== "") {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '댓글삭제',
                        message: "댓글이 정상적으로 삭제 되었습니다.",
                        buttons: [
                          {
                            text: '확인',
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
        if (popoverData === "수정") {
          this.comment_popover_option_textarea = i;
          setTimeout(() => {
            // this.mytextarea.setFocus();
            this.myInput.nativeElement.focus();
            // this.presentLoading();
            this.resize();
          }, 100)
        }
        else if (popoverData === "삭제") {
          // console.log('comment_popover_option==========' + this.comment_popover_option);
          this.reply.email = email;
          this.reply.id = id;
          // this.reply.comment = document.getElementById('updatereply').getAttribute('ng-reflect-model');

          let alert = this.alertCtrl.create({
            cssClass: 'push_alert_cancel',
            title: "plinic",
            message: "댓글을 정말로 삭제하시겠습니까?",
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
                  this.auth.replyCareZoneDelete(this.reply).subscribe(data => {
                    if (data !== "") {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '댓글삭제',
                        message: "댓글이 정상적으로 삭제 되었습니다.",
                        buttons: [
                          {
                            text: '확인',
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
