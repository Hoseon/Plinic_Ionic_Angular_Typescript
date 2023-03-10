import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ModalController, AlertController, Platform, PopoverController, ViewController } from 'ionic-angular';
import { CareZoneMissionDeadlinePage } from '../care-zone-mission-deadline/care-zone-mission-deadline';
import { CareZonePage } from '../care-zone/care-zone';
import { ImagesProvider } from '../../providers/images/images';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing'
import { PopoverPage } from '../community/community-modify/popover/popover';
import { RewardPage } from '../reward/reward'
import { Observable } from 'rxjs/Rx';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { KakaoCordovaSDK, KLCustomTemplate, KLLinkObject, KLSocialObject, KLButtonObject, KLContentObject, KLFeedTemplate, AuthTypes } from 'kakao-sdk';
import { SocialSharing } from '@ionic-native/social-sharing';
import { first } from 'rxjs/operators';
import { ChalGuidePage } from '../chal-guide/chal-guide';

/**
 * Generated class for the CareZoneMissionIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-chal-mission-ing',
  templateUrl: 'chal-mission-ing.html',
})
export class ChalMissionIngPage {

  public loadProgress: number = 0;

  _id: any;
  loading: Loading;
  carezoneData: any;
  carezoneData2: any;
  endDate: any;
  startDate: any;
  imgUrl: any;
  plinicUserImages: Array<any> = new Array<any>();
  userData: any;
  thumb_image: any;
  jwtHelper: JwtHelper = new JwtHelper();
  missionCounter: any;
  missionmember: any;
  dday: any;
  getday: any;
  currentDate: Date = new Date();
  rank: any = "";
  bannerData: any;
  comment_popover_option: any = "??????";
  comment_popover_option_textarea: any;
  skinQnaOneLoadData: any = {};
  registerReply = { comment: '', id: '', date: new Date()};
  reply = { comment: '', id: '', email: '' };
  @ViewChild('myInput') myInput: ElementRef;
  mode: any;
  updatevalue: any;
  subscriptionFourth: any;
  timeremaining: any;
  starttimeremaining: Date = new Date();
  displayTime: any;
  displayUseTime: any;
  displayUseTimeList: Array<any> = new Array<any>();
  memberRanking: Array<any> = new Array<any>();
  endCheck: boolean = false;
  missionuseTime: any;
  challengeuseTime: any;
  reward: boolean = false;
  commentTimeZone: Array<any> = new Array<any>();
  profileimg_url: any;
  useCount = 0;
  isReward: boolean = false;
  challengeReward: boolean = false;
  isFail: boolean = false; //????????? ?????? ??????
  isFirstDate : boolean = false; //?????? ?????? ??????????????? ???????????? ??????
  dayString : any;
  adUrl: any;
  productTitle: any;
  productURL: any;
  memberMaxDate: Array<any> = new Array<any>();
  maxDate: any;

  constructor(
    public nav: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private images: ImagesProvider, 
    public element: ElementRef,
    private loadingCtrl: LoadingController, 
    private modalCtrl: ModalController,
    private alertCtrl: AlertController, 
    public platform: Platform,
    private auth: AuthService, 
    public popoverCtrl: PopoverController,
    private themeableBrowser: ThemeableBrowser, 
    public _kakaoCordovaSDK: KakaoCordovaSDK, 
    private socialSharing: SocialSharing
  ) {
    // this.missionUseTime(this.carezoneData2);
    // this.roadmission(this.carezoneData2._id);
    // this.missionCount(this.carezoneData2._id);
    // this.skinQnaOneLoad(this.carezoneData2._id);
    this.bannerData = this.roadbanner();
  }

  ionViewCanEnter() {
    this.loadItems();
  }

  async ionViewDidLoad() {
    this.loadItems();
    if (this.navParams.get('carezoeId')) {
      this.carezoneData2 = this.roadmission(this.navParams.get('carezoeId'));
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
      this.carezoneData = this.navParams.get('carezoneData');
      if (Number(this.carezoneData.day) === 2) {
        this.dayString = "?????????";
      } else if (Number(this.carezoneData.day) === 4) {
        this.dayString = "?????????";
      } else if (Number(this.carezoneData.day) === 0) {
        this.dayString = "?????????";
      }

    }
    this.getCommentTimeZone();
    this.getUserimage();


    // this.showMissionfail();
    // this.showMissionsuccess();
  }

  async ionViewDidEnter() {
    //20191024 ???????????? ????????????, ????????????(Reward)??? ?????? ?????? ??????.
    // await this.missionUseTime(this.carezoneData2, this.userData.email);
    this.showLoading();
    await this.challengeUseTime(this.carezoneData2, this.userData.email);

    await this.missionMember(this.carezoneData2._id);
    this.timeremaining = (new Date(this.carezoneData2.endmission).getTime() - new Date().getTime()) / 1000;
    (new Date(this.carezoneData2.endmission).getTime() < new Date().getTime()) ? this.endCheck = true : this.endCheck = false;
    // console.log("this.endCheck : " + this.endCheck);
    // console.log("Your Ranking : " + this.rank);
    
    // await this.timerTick();
    
    await this.missionCount(this.carezoneData2._id);
    this.loading.dismiss();
  }

  ionViewWillEnter() {
    this.randomUrl();
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        // tabs[ key ].style.transform = 'translateY(56px)';
        tabs[key].style.display = '';
      });
    } // end if
  }

  ionViewWillLeave() {
    // this.subscriptionFourth.complete();
    // console.log("Timer Clear!");
  }

  ionViewDidLeave() {
    this.subscriptionFourth.complete();
    console.log("ionViewDidLeave Timer Clear!");

  }

  public roadbanner() {
    this.images.bannerRoad().subscribe(data => {
      this.bannerData = data;
    });
  }


  public skinQnaOneLoad(id) {
    this.images.skinQnaOneLoad(id).subscribe(data => {
      this.skinQnaOneLoadData = data;
      //this.tags = data.tags.split(",");
      // for (var i = 0; i < data.likeuser.length; i++) {
      //   if (this.userData.email === data.likeuser[i]) {
      //     this.islike = true;
      //   }
      // }
    });
  }

  showMissionfail() {
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      cssClass: 'mission_alert_fail',
      // title: '?????? ?????? ' + this.rank + '???',
      subTitle: '????????? ????????? ?????????????????????. <br /> ?????? ???????????? ???????????????!',
      message: '????????? ???????????? ???????????? <br />???????????? ???????????????.',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
          },
          cssClass: 'cancle_btn'
        },
        {
          text: '??????',
          handler: () => {
            //do
            this.challenge_giveup();
          }
        }]
    });
    alert.present();
  }

  showChallengefail() {
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      cssClass: 'mission_alert_fail',
      // title: '?????? ?????? ' + this.rank + '???',
      subTitle: '????????? ????????? ?????????????????????. <br /> ?????? ???????????? ???????????????!',
      message: '????????? ???????????? ???????????? <br />???????????? ???????????????.',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
            this.images.giveupChallenge(this.userData.email).subscribe(data => {
              this.viewCtrl.dismiss({ reload: true });
            }, error => {
              this.showError(JSON.parse(error._body).msg);
            });
          },
          cssClass: 'cancle_btn'
        },
        {
          text: '????????? ??????',
          handler: () => {
            //do
            this.images.giveupChallenge(this.userData.email).subscribe(data => {
              this.viewCtrl.dismiss({ reload: true });
            }, error => {
              this.showError(JSON.parse(error._body).msg);
            });
          }
        }]
    });
    alert.present();
  }


  

  showMissionsuccess() {
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      cssClass: 'mission_alert_success',
      title: '?????? ?????? ' + this.rank + '???',
      subTitle: '???????????????.',
      message: '???????????? ???????????? <br /> ??????????????? ?????? ???????????????.',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
          },
          cssClass: 'cancle_btn'
        },
        {
          text: '?????? ????????? ??????',
          handler: () => {
            let modal = this.modalCtrl.create(RewardPage, { mission: this.carezoneData2 });
            modal.onDidDismiss(data => {
              this.ionViewDidEnter();
            });
            modal.present();
          }
        }]
    });
    alert.present();
  }

  async update() {
    // this.viewCtrl._didLoad();
    // this.viewCtrl._didEnter();
    this.roadmission(this.carezoneData2._id);
    this.missionMember(this.carezoneData2._id);
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
        //this.chkmission(this.userData.email);
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
          // thumbnail_image: items.thumbnail_image,
        };
        // console.log(this.userData);
        //this.chkmission(this.userData.email);
        this.auth.getUserImage(this.userData.email).subscribe(items => {
          if (items) {
            this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
            this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
          }
        });
      }
    });
  }

  ngOnInit() {
    // setInterval(() => {
    //   if (this.loadProgress < 50)
    //     this.loadProgress += 1;
    //   else
    //     clearInterval(this.loadProgress);
    // }, 50);
  }

  public mission_start() {
    // this.nav.push(MissionStartPage);

    //20190813 ?????? ????????? ???????????? ???????????? ?????? ???????????? ?????? ?????? ?????????.
    this.nav.push(DeviceConnectIngPage, { 'carezoneData': this.carezoneData2 });
  }

  public roadmission(id) {
    // this.showLoading();
    this.images.missionRoad(id).subscribe(data => {
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
        this.imgUrl = "http://plinic.cafe24app.com/carezone_prodimages/".concat(data._id);
        //this.imgUrl.includes(data._id);
        //console.log(JSON.stringify(this.carezoneData));
        // this.loading.dismiss();
        this.getCommentTimeZone();
        this.getUserimage();
      } else {
        this.showError("???????????? ???????????? ???????????????. ??????????????? ???????????????.");
      }

      this.getday = new Date(this.carezoneData.startmission);
      this.dday = this.diffdate(this.getday, this.currentDate);
      this.dday = parseInt(this.dday);

      if (Number(this.carezoneData.day) === 2) {
        this.dayString = "?????????";
      } else if (Number(this.carezoneData.day) === 4) {
        this.dayString = "?????????";
      } else if (Number(this.carezoneData.day) === 0) {
        this.dayString = "?????????";
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




  //20190812 ?????? ????????? ????????? ???????????? Get
  public missionUseTime(carezoneData, email) {
    // this.showLoading();
    this.images.missionUseTime(carezoneData._id, email).subscribe(data => {
      this.missionuseTime = data;
      this.reward = this.missionuseTime.reward;
      this.loadProgress = (Number(data.usetime) / 7560) * 100;
      // this.loadProgress = (Number(data.usetime) / 10800) * 100; //20191129 ????????? ????????? ?????????????????? 15??? ???????????? ??????
      if(this.loadProgress > 100){
        this.loadProgress = 100;
      }
      this.displayUseTime = this.getSecondsAsDigitalClock2(data.usetime);
    });
  }

  //2020-02-10 ?????? ????????? ????????? ???????????? Get //2020-02-21 ?????? ??????????????? ?????? ?????? ?????? ????????? //2020-04-13 ?????? ????????? ????????? ?????? ????????? ??????????????? ??????
  public challengeUseTime(carezoneData, email) {
    // this.showLoading();
    this.images.challengeUseTime2(carezoneData._id, email).subscribe(data => {
      this.challengeuseTime = data;
      this.challengeReward = this.challengeuseTime.reward;
      this.useCount = this.challengeuseTime.dailycheck.length;
      if(this.useCount >= 7) {
        this.isReward = true; 
      } else {
        this.isReward = false;
      }
      

      // for(let i =0; i < this.challengeuseTime.dailycheck.length; i++) {
        // console.log("????????? ????????? ?????? ?????? ????????? :" + i + "?????? : " + this.challengeuseTime.dailycheck[i].updatedAt )
        // console.log(this.getCovertKoreaTime(new Date()).substr(0,10));
        // console.log(this.getCovertKoreaTime(this.challengeuseTime.dailycheck[this.challengeuseTime.dailycheck.length-1].updatedAt).substr(0,10))
        if(this.challengeuseTime.dailycheck !='') {
          let afterTomorrow = new Date(this.challengeuseTime.dailycheck[this.challengeuseTime.dailycheck.length-1].updatedAt)
          afterTomorrow.setDate( afterTomorrow.getDate() + 2 );
          // console.log(this.getCovertKoreaTime(afterTomorrow));
          // console.log(this.getCovertKoreaTime(new Date()).substr(0,10));
          //???????????? ?????? ???????????? ????????? ??? ?????????????????? 2?????? ?????????.
          //????????? ?????? ????????? ???????????? ????????? ?????? ????????? ????????? ?????? ?????? ????????? ???????????? ?????? ????????? ????????? ????????????.
          if(this.getCovertKoreaTime(afterTomorrow).substr(0,10) > this.getCovertKoreaTime(new Date()).substr(0,10)) {
            // console.log("????????? ??????");
            this.isFail = false;
          } else if(this.getCovertKoreaTime(afterTomorrow).substr(0,10) <= this.getCovertKoreaTime(new Date()).substr(0,10) ) {
            // console.log("????????? ??????");
            this.isFail = true;
            this.showChallengefail(); //????????? ?????? ?????? ?????? ?????????
          } else {
            // console.log("????????? ??????");
            this.isFail = true;
            this.showChallengefail(); //????????? ?????? ?????? ?????? ?????????
          }
        }
        else {

          let afterTomorrow = new Date(this.challengeuseTime.createdAt)
          afterTomorrow.setDate( afterTomorrow.getDate() + 1 );
          console.log(this.getCovertKoreaTime(afterTomorrow));
          console.log(this.getCovertKoreaTime(new Date()).substr(0,10));
          //???????????? ?????? ???????????? ????????? ??? ?????????????????? 2?????? ?????????.
          //????????? ?????? ????????? ???????????? ????????? ?????? ????????? ????????? ?????? ?????? ????????? ???????????? ?????? ????????? ????????? ????????????.
          console.log(this.getCovertKoreaTime(afterTomorrow).substr(0,10));
          console.log(this.getCovertKoreaTime(new Date()).substr(0,10));
          if(this.getCovertKoreaTime(afterTomorrow).substr(0,10) > this.getCovertKoreaTime(new Date()).substr(0,10)) {
            // console.log("????????? ??????");
            this.isFail = false;
          } else if(this.getCovertKoreaTime(afterTomorrow).substr(0,10) <= this.getCovertKoreaTime(new Date()).substr(0,10) ) {
            // console.log("????????? ??????");
            this.isFail = true;
            this.showChallengefail(); //????????? ?????? ?????? ?????? ?????????
          } else {
            // console.log("????????? ??????");
            this.isFail = true;
            this.showChallengefail(); //????????? ?????? ?????? ?????? ?????????
          }

        }
        var todayDate = new Date(); //?????? ?????? ?????????
          var todayDate2 = this.getCovertKoreaTime(todayDate).substr(0,10); //?????? ?????? ?????????
          var compareDate = new Date(this.challengeuseTime.createdAt); //????????? ?????? ?????? ????????? ?????????
          var compareDate2 = this.getCovertKoreaTime(compareDate).substr(0,10) //?????????
          if(todayDate2 != compareDate2) { //????????? ?????? ????????? ?????? ????????? ?????????
            //?????? ????????? ??? ??????????????? ????????? ?????? ?????? ????????? ?????? ?????? ?????? ??????
            for(let i= 0; i < this.challengeuseTime.dailycheck.length; i++){
              var comDate = new Date(this.challengeuseTime.dailycheck[i].updatedAt);
              var comDate2 = this.getCovertKoreaTime(comDate).substr(0,10);
              if(compareDate2 === comDate2) {
                //????????? ?????? ????????? ????????? ????????? ????????? ??????
                this.isFirstDate = true;
                break;
              } else {
                this.isFail = true;
                // this.showChallengefail(); //????????? ?????? ?????? ?????? ?????????
              }
            }
          }
      // }

      this.loadProgress = (Number(data.usetime) / 7560) * 100;
      // this.loadProgress = (Number(data.usetime) / 10800) * 100; //20191129 ????????? ????????? ?????????????????? 15??? ???????????? ??????
      if(this.loadProgress > 100){
        this.loadProgress = 100;
      }
      this.displayUseTime = this.getSecondsAsDigitalClock2(data.usetime);
    });
  }


  //20190617 ?????? ????????? ?????? count
  public missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
      this.missionCounter = data;
    });
  }

  //20190617 ?????? ????????? ?????? count
  missionMember(id) {
    // this.showLoading();
    this.images.getChallangeMember(id).subscribe(data => {
      if (data !== '') {
        this.missionmember = data;
        for(var k=0; k < data.length; k++) {
          this.memberMaxDate[k] = new Date(data[k].createdAt)
        };
        var max = Math.max.apply(null, this.memberMaxDate);
        this.maxDate = this.getCovertKoreaTime(new Date(max)).substr(0,10);
        var tempRank = 0;
        for (var i = 0; i < data.length; i++) {
          if(this.maxDate === this.getCovertKoreaTime(data[i].createdAt).substr(0,10)) {
            // if (data[i].email === this.userData.email) {  // ?????? ??????, ????????? ?????? ?????? ????????????
            //   this.rank = i + 1;
            //   // console.log("this ranking :" + this.rank);
            // }
            var imgUrl;
            (!data[i].imgUrl) ? imgUrl = "" : imgUrl = data[i].imageURL;
            this.memberRanking[tempRank] = {
              email: data[i].email,
              usetime: data[i].usetime,
              rank: tempRank + 1,
              image_url: imgUrl,
              userImageFilename: data[i].userImageFilename,
            }
            this.displayUseTimeList[tempRank] = this.getSecondsAsDigitalClock3(Number(data[i].usetime));
            tempRank++;
          }
        }
        console.log(this.memberRanking);
      }
    });
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '???????????? ????????????????????????'
    });
    this.loading.present();
  }

  showError(text) {
    // this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }




  public mission_deadline() {

    this.nav.push(CareZoneMissionDeadlinePage);
  }

  mission_giveup() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      // title: "?????? ??????",
      message: "???????????? ?????? ?????? ??????????????????? <br> ????????? ??????????????? ????????? ??????, <br> ???????????? ???????????? ???????????????.",
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
            this.images.giveupMission(this.userData.email).subscribe(data => {
              this.viewCtrl.dismiss({ reload: true });
              // this.nav.parent.select(1);
              //this.nav.push(CareZonePage);
            }, error => {
              this.showError(JSON.parse(error._body).msg);
            });
          }
        }]
    });
    alert.present();
  }

  challenge_giveup() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      // title: "?????? ??????",
      message: "???????????? ?????? ?????? ??????????????????? <br> ????????? ??????????????? ????????? ??????, <br> ???????????? ???????????? ???????????????.",
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
            this.images.giveupChallenge(this.userData.email).subscribe(data => {
              this.viewCtrl.dismiss({ reload: true });
              // this.nav.parent.select(1);
              //this.nav.push(CareZonePage);
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


  getSecondsAsDigitalClock2(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var minutes2 = Math.floor((sec_num / 3600) * 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var minutesString2 = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    minutesString2 = (minutes < 10) ? "0" + minutes2 : minutes2.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return minutesString2 + '??? ' + secondsString + '???';
    // console.log("displaytime : " + index + " : " + this.displayTime[index]);
  }


  getSecondsAsDigitalClock3(inputSeconds: number) {  // ???????????? ?????? ?????? ?????? ??????
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes2 = Math.floor((sec_num / 3600) * 60);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var minutesString2 = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    minutesString2 = (minutes < 10) ? "0" + minutes2 : minutes2.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return minutesString2 + '??? ' + secondsString + '???';
    // console.log("displaytime : " + index + " : " + this.displayTime[index]);
  }

  focus(event) {
    // console.log(event.target.value)
    // this.focusvalue = event.target.value
    this.updatevalue = event.target.value
    // console.log(event)
    // console.log("focus focus")
  }

  openBrowser_ios(url, title) {

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

  kakaoLink(loadData) {
    let feedLink: KLLinkObject = {
      webURL: 'http://g1p.co.kr/',
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
    //   link: feedLink,
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
          console.log("????????? ?????? ?????? ??????----------------------------------------");
          this.auth.snsPointUpdate(this.carezoneData2._id, this.userData.email, this.carezoneData2.bonuskakao).subscribe(data => {
            if (data) {
              this.showAlert("????????? SNS??????", JSON.stringify(data.msg).replace('"', ''))
            } else {
              this.showAlert("????????? ?????? ??????", "[??????]SNS ????????? ??????????????? ?????? ???????????????.")
            }
          });
          console.log("????????? ? : " + this.carezoneData2.bonuskakao);
          console.log("???????????? ? : " + this.userData.email);

        },
        err => {
          console.log(JSON.stringify(err));
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
    this.socialSharing.shareViaFacebook("Plinic", 'https://plinic.s3.ap-northeast-2.amazonaws.com/' + loaddata.filename, "http://g1p.co.kr").then(res => {
      console.log("???????????? ?????? ?????? : " + res);
      this.auth.snsPointUpdate(this.carezoneData2._id, this.userData.email, this.carezoneData2.bonusface).subscribe(data => {
        if (data) {
          this.showAlert("????????? SNS??????", JSON.stringify(data.msg).replace('"', ''))
        } else {
          this.ios_showAlert("????????? ?????? ??????", "[??????]SNS ????????? ??????????????? ?????? ???????????????.")
        }
      });
    }, err => {
      console.log("???????????? ?????? ?????? : " + JSON.stringify(err))
      if (err === 'cancelled') {
        console.log("???????????? ?????? ???????????? ?????? ??? : " + err);
      }
      if (err === 'not available') {
        console.log("???????????? ?????? ??????????????? ???");
        this.auth.snsPointUpdate(this.carezoneData2._id, this.userData.email, this.carezoneData2.bonusface).subscribe(data => {
          if (data) {
            this.ios_showAlert("????????? SNS??????", JSON.stringify(data.msg).replace('"', ''))
          } else {
            this.ios_showAlert("????????? ?????? ??????", "[??????]SNS ????????? ??????????????? ?????? ???????????????.")
          }
        });
      }
    });
  }

  share() {
    this.showAlert("?????????", "?????? ?????? ?????? ??????????????????.")
    // var url = encodeURI(encodeURIComponent("https://g1p.co.kr/company/plinicstory.html"));
    // var title = encodeURI("???????????? ???????????? ?????????");
    // // var shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
    // var shareURL = "https://band.us/plugin/share?body='?????????'&route='Plinic'";
    // let successComes: boolean = false;
    //
    // document.location.href = shareURL;
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
          // this.registerReply.comment = '';
          this.comment_popover_option_textarea = -1;
          // this.textareaResize();
          this.update();
        }
      }]
    });
    setTimeout(() => {
      alert.present();
    }, 1000)
  }

  ios_showAlert(title, message) {
    // this.runTimer = false;
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: message,
      buttons: [{
        text: '??????',
        handler: () => {
          // this.registerReply.comment = '';
          this.comment_popover_option_textarea = -1;
          // this.textareaResize();
          this.update();
        }
      }]
    });
    alert.present();
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

  getCommentTimeZone() {
    for (let i = 0; i < this.carezoneData2.comments.length; i++) {
      this.commentTimeZone[i] = new Date(this.carezoneData2.comments[i].createdAt).getFullYear() + "-" + new Date(this.carezoneData2.comments[i].createdAt).getMonth() + "-" + new Date(this.carezoneData2.comments[i].createdAt).getDay() + " " + new Date(this.carezoneData2.comments[i].createdAt).getHours() + ":" + new Date(this.carezoneData2.comments[i].createdAt).getMinutes() + ":" + new Date(this.carezoneData2.comments[i].createdAt).getSeconds()
      // console.log("abcd : " + this.commentTimeZone[i]);
    }
  }

  getCovertKoreaTime(time) {
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

  randomUrl() {
    var urlNo;
    urlNo = this.makeRandom(1,3);
    
    switch(urlNo) {
      case 1 : this.adUrl = 'assets/img/beauty/beauty_ad_1.png';
               this.productTitle = '????????? ??????';
               this.productURL = 'https://www.plinicshop.com/Products/Details/1863';
                break;
      case 2 : this.adUrl = 'assets/img/beauty/beauty_ad_2.png';
               this.productTitle = '????????????';
               this.productURL = 'https://www.plinicshop.com/Products/Details/1968';
                break;
      case 3 : this.adUrl = 'assets/img/beauty/beauty_ad_3.png';
               this.productTitle = '????????????';
               this.productURL = 'https://www.plinicshop.com/Products/Details/1832';
                break;   
      default : this.adUrl = 'assets/img/beauty/beauty_ad_1.png';
                this.productTitle = '????????? ??????';
                this.productURL = 'https://www.plinicshop.com/Products/Details/1863';
    }
  }

  private makeRandom(min, max) {
    ????????var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
    ????????return RandVal;
  }



}
