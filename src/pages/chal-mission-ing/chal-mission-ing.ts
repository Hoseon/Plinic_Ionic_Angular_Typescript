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
  comment_popover_option: any = "보기";
  comment_popover_option_textarea: any;
  skinQnaOneLoadData: any = {};
  registerReply = { comment: '', id: '', date: new Date()};
  reply = { comment: '', id: '', email: '' };
  recomment = { body: '', email: '' };
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('myInput2') myInput2: ElementRef;
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
  isReward: boolean;
  challengeReward: boolean = false;
  isFail: boolean = false; //챌린지 실패 여부
  isFirstDate : boolean = false; //첫날 미션 진행했는지 확인하는 로직
  // rewardEmail: boolean; // ...
  dayString : any;
  adUrl: any;
  productTitle: any;
  productURL: any;
  memberMaxDate: Array<any> = new Array<any>();
  maxDate: any;
  isShowReComments: Array<boolean> = new Array<boolean>(); //댓글
  isShowReComments2: Array<boolean> = new Array<boolean>(); //대댓글
  isShowReply: boolean = false;
  bannersData: any;
  rewardData: any;

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
        this.dayString = "화요일";
      } else if (Number(this.carezoneData.day) === 4) {
        this.dayString = "목요일";
      } else if (Number(this.carezoneData.day) === 0) {
        this.dayString = "일요일";
      }

    }
    // this.getCommentTimeZone();
    this.getBannersList();
    this.getUserimage();

    // this.showMissionfail();
    // this.showMissionsuccess();
  }

  async ionViewDidEnter() {
    //20191024 참여자의 사용시간, 보상여부(Reward)의 값을 가져 온다.
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
    // this.randomUrl();
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        // tabs[ key ].style.transform = 'translateY(56px)';
        tabs[key].style.display = '';
      });
    } // end if
    this.rewardLoad();
  }

  ionViewWillLeave() {
    // this.subscriptionFourth.complete();
    // console.log("Timer Clear!");
  }

  ionViewDidLeave() {
    // this.subscriptionFourth.complete();
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
      // title: '최종 순위 ' + this.rank + '위',
      subTitle: '챌린지 도전에 실패하였습니다. <br /> 다음 챌린지에 도전하세요!',
      message: '피부가 좋아지는 그날까지 <br />챌린지에 참여하세요.',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
          },
          cssClass: 'cancle_btn'
        },
        {
          text: '확인',
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
      // title: '최종 순위 ' + this.rank + '위',
      subTitle: '챌린지 도전에 실패하였습니다. <br /> 다음 챌린지에 도전하세요!',
      message: '피부가 좋아지는 그날까지 <br />챌린지에 참여하세요.',
      enableBackdropDismiss: true,
      buttons: [
        // {
        //   text: 'X',
        //   role: 'cancel',
        //   handler: () => {
        //     this.images.giveupChallenge(this.userData.email).subscribe(data => {
        //       this.viewCtrl.dismiss({ reload: true });
        //     }, error => {
        //       this.showError(JSON.parse(error._body).msg);
        //     });
        //   },
        //   cssClass: 'cancle_btn' 
        // },
        {
          text: '챌린지 종료',
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
    alert.onDidDismiss(()=>{
      this.images.giveupChallenge(this.userData.email).subscribe(data => {
        this.viewCtrl.dismiss({ reload: true });
      }, error => {
        this.showError(JSON.parse(error._body).msg);
      });
    });
    alert.present();
  }

  showChallengeExit() {
    // this.loading.dismiss();
    let alert = this.alertCtrl.create({
      cssClass: 'mission_alert_fail',
      // title: '최종 순위 ' + this.rank + '위',
      subTitle: '이미 보상신청을 하셨습니다. <br /> 다음 챌린지에 도전하세요!',
      message: '피부가 좋아지는 그날까지 <br />챌린지에 참여하세요.',
      enableBackdropDismiss: true,
      buttons: [
        // {
        //   text: 'X',
        //   role: 'cancel',
        //   handler: () => {
        //     this.images.giveupChallenge(this.userData.email).subscribe(data => {
        //       this.viewCtrl.dismiss({ reload: true });
        //     }, error => {
        //       this.showError(JSON.parse(error._body).msg);
        //     });
        //   },
        //   cssClass: 'cancle_btn' 
        // },
        {
          text: '챌린지 종료',
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
    alert.onDidDismiss(()=>{
      this.images.giveupChallenge(this.userData.email).subscribe(data => {
        this.viewCtrl.dismiss({ reload: true });
      }, error => {
        this.showError(JSON.parse(error._body).msg);
      });
    });
    alert.present();
    // let alert = this.alertCtrl.create({
    //   cssClass: 'mission_alert_fail',
    //   // title: '최종 순위 ' + this.rank + '위',
    //   subTitle: '이미 보상신청을 하셨습니다. <br /> 다음 챌린지에 도전하세요!',
    //   message: '피부가 좋아지는 그날까지 <br />챌린지에 참여하세요.',
    //   buttons: [
    //     {
    //       text: 'X',
    //       role: 'cancel',
    //       handler: () => {
    //       },
    //       cssClass: 'cancle_btn'
    //     },
    //     {
    //       text: '확인',
    //       handler: () => {
    //         //do
    //         this.challenge_giveup();
    //       }
    //     }]
    // });
    // alert.present();
  }
  

  showMissionsuccess() {
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      cssClass: 'mission_alert_success',
      // title: '최종 순위 ' + this.rank + '위',
      subTitle: '축하합니다.',
      message: '보상상품 받으시고 <br /> 피부관리에 더욱 매진하세요.',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
          },
          cssClass: 'cancle_btn'
        },
        {
          text: '상품 받으러 가기',
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

    //20190813 미션 시작이 블루투스 사용하는 기기 사용시간 만큼 축적 시킨다.
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
        // this.startDate = data.startmission.substr(0, 10);
        // this.endDate = data.endmission.substr(0, 10);
        // this.imgUrl = "http://plinic.cafe24app.com/carezone_prodimages/".concat(data._id);
        //this.imgUrl.includes(data._id);
        //console.log(JSON.stringify(this.carezoneData));
        // this.loading.dismiss();
        this.getCommentTimeZone();
        this.getUserimage();
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }

      this.getday = new Date(this.carezoneData.startmission);
      this.dday = this.diffdate(this.getday, this.currentDate);
      this.dday = parseInt(this.dday);

      if (Number(this.carezoneData.day) === 2) {
        this.dayString = "화요일";
      } else if (Number(this.carezoneData.day) === 4) {
        this.dayString = "목요일";
      } else if (Number(this.carezoneData.day) === 0) {
        this.dayString = "일요일";
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




  //20190812 미션 참여자 플리닉 사용시간 Get
  public missionUseTime(carezoneData, email) {
    // this.showLoading();
    this.images.missionUseTime(carezoneData._id, email).subscribe(data => {
      this.missionuseTime = data;
      this.reward = this.missionuseTime.reward;
      this.loadProgress = (Number(data.usetime) / 7560) * 100;
      // this.loadProgress = (Number(data.usetime) / 10800) * 100; //20191129 전시회 용으로 프로그레스바 15분 로직으로 변경
      if(this.loadProgress > 100){
        this.loadProgress = 100;
      }
      this.displayUseTime = this.getSecondsAsDigitalClock2(data.usetime);
    });
  }

  //2020-02-10 미션 참여자 플리닉 사용횟수 Get //2020-02-21 매일 사용했는지 체크 하는 로직 구하기 //2020-04-13 첫날 등록한 미션인 날에 미션을 수행했는지 체크
  public challengeUseTime(carezoneData, email) {
    // this.showLoading();
    this.images.challengeUseTime2(carezoneData._id, email).subscribe(data => {
      this.challengeuseTime = data;
      this.challengeReward = this.challengeuseTime.reward;
      this.useCount = this.challengeuseTime.dailycheck.length;
      if(this.useCount >= 7) { //사용자가 7일 사용하면 보상 받기 페이지로 간다
        this.isReward = true; 
      } else {
        this.isReward = false;
      }
      

      // for(let i =0; i < this.challengeuseTime.dailycheck.length; i++) {
        // console.log("사용자 데일리 체크 날짜 구하기 :" + i + "번째 : " + this.challengeuseTime.dailycheck[i].updatedAt )
        // console.log(this.getCovertKoreaTime(new Date()).substr(0,10));
        // console.log(this.getCovertKoreaTime(this.challengeuseTime.dailycheck[this.challengeuseTime.dailycheck.length-1].updatedAt).substr(0,10))
        if(this.challengeuseTime.dailycheck !='') {
          let afterTomorrow = new Date(this.challengeuseTime.dailycheck[this.challengeuseTime.dailycheck.length-1].updatedAt)
          afterTomorrow.setDate( afterTomorrow.getDate() + 2 );
          // console.log(this.getCovertKoreaTime(afterTomorrow));
          // console.log(this.getCovertKoreaTime(new Date()).substr(0,10));
          //사용자가 제일 마지막의 챌린지 한 날짜를구해서 2일을 더한다.
          //그리고 현재 날짜와 비교해서 작다면 아직 챌린지 진행중 혹은 현재 날짜와 비교해서 크면 챌린지 실패로 적용한다.
          if(this.getCovertKoreaTime(afterTomorrow).substr(0,10) > this.getCovertKoreaTime(new Date()).substr(0,10)) {
            // console.log("챌린시 성공");
            this.isFail = false;
          } else if (this.getCovertKoreaTime(afterTomorrow).substr(0, 10) <= this.getCovertKoreaTime(new Date()).substr(0, 10)) {
            console.log(this.getCovertKoreaTime(afterTomorrow).substr(0, 10));
            console.log(this.getCovertKoreaTime(new Date()).substr(0, 10));
            // console.log("챌린지 실패");
            this.isFail = true;
            this.showChallengefail(); //챌린지 실패 알림 팝업 보여줌
          } else {
            // console.log("챌린지 실패");
            this.isFail = true;
            this.showChallengefail(); //챌린지 실패 알림 팝업 보여줌
          }
        }
        else {

          let afterTomorrow = new Date(this.challengeuseTime.createdAt)
          afterTomorrow.setDate( afterTomorrow.getDate() + 1 );
          console.log(this.getCovertKoreaTime(afterTomorrow));
          console.log(this.getCovertKoreaTime(new Date()).substr(0,10));
          //사용자가 제일 마지막의 챌린지 한 날짜를구해서 2일을 더한다.
          //그리고 현재 날짜와 비교해서 작다면 아직 챌린지 진행중 혹은 현재 날짜와 비교해서 크면 챌린지 실패로 적용한다.
          console.log(this.getCovertKoreaTime(afterTomorrow).substr(0,10));
          console.log(this.getCovertKoreaTime(new Date()).substr(0,10));
          if(this.getCovertKoreaTime(afterTomorrow).substr(0,10) > this.getCovertKoreaTime(new Date()).substr(0,10)) {
            // console.log("챌린시 성공");
            this.isFail = false;
          } else if(this.getCovertKoreaTime(afterTomorrow).substr(0,10) <= this.getCovertKoreaTime(new Date()).substr(0,10) ) {
            // console.log("챌린지 실패");
            this.isFail = true;
            this.showChallengefail(); //챌린지 실패 알림 팝업 보여줌
          } else {
            // console.log("챌린지 실패");
            // this.isFail = true;
            // this.showChallengefail(); //챌린지 실패 알림 팝업 보여줌
          }

        }
        var todayDate = new Date(); //오늘 날짜 구하고
          var todayDate2 = this.getCovertKoreaTime(todayDate).substr(0,10); //오늘 날짜 정형화
          var compareDate = new Date(this.challengeuseTime.createdAt); //챌린지 최초 등록 날짜를 구하고
          var compareDate2 = this.getCovertKoreaTime(compareDate).substr(0,10) //정형화
          if(todayDate2 != compareDate2) { //챌린지 등록 날짜가 오늘 날짜가 아니면
            //미션 시작한 날 케어하기를 했는지 체크 하기 위해서 날짜 부터 비교 한다
            for(let i= 0; i < this.challengeuseTime.dailycheck.length; i++){
              var comDate = new Date(this.challengeuseTime.dailycheck[i].updatedAt);
              var comDate2 = this.getCovertKoreaTime(comDate).substr(0,10);
              if(compareDate2 === comDate2) {
                //챌린지 시작 날짜에 등록한 날짜가 있는지 확인
                this.isFirstDate = true;
                break;
              } else {
                this.isFail = true;
                // this.showChallengefail(); //챌린지 실패 알림 팝업 보여줌
              }
            }
          }
      // }
      

      // this.rewardData;
      // // 오늘 날짜부터 일주일 사이에 해당 아이디가 보상으로 넘어간 적 있는지? 있으면 isReward false
      // var preToday = new Date();
      // preToday.setDate(preToday.getDate() - 6); // 일주일전
      // var preToday2 = this.getCovertKoreaTime(preToday).substr(0,10)
      // if(preToday2 <= todayDate2) { // 일주일 동안
      //   //rewardData로 reward 데이터 가져와서 email
      //   // if(this.userData.email === this.rewardData.email) { //현재 이메일이 reward의 이메일과 같으면
      //   //   this.isReward = false;
      //   // } else {
      //   //   this.isReward = true;
      //   // }
      //   for(let i= 0; i < this.rewardData.email; i++) {
      //     if(this.userData.email === this.rewardData.email[i]) {
      //       this.isReward = false;
      //     } else {
      //       this.isReward = true;
      //     }
      //   }
      // }

      // console.log(this.challengeuseTime.missionID);
      // console.log(this.rewardData.missionID);

      // this.images.compareMissionID(email).subscribe(data => {
        
        // 오늘 날짜부터 일주일 사이에 해당 아이디가 보상으로 넘어간 적 있는지? 있으면 rewardEmail false
        // var todayDate = new Date(); //오늘 날짜 구하고
        // var todayDate2 = this.getCovertKoreaTime(todayDate).substr(0,10); //오늘 날짜 정형화
        // var preToday = new Date();
        // preToday.setDate(preToday.getDate() - 6); // 일주일전
        // var preToday2 = this.getCovertKoreaTime(preToday).substr(0,10)
        // if(preToday2 <= todayDate2) { // 일주일 동안
        // if(preToday <= todayDate) { // 일주일 동안
          //rewardData로 reward 데이터 가져와서 email
          // if(this.userData.email === this.rewardData.email) { //현재 이메일이 reward의 이메일과 같으면
          //   this.rewardEmail = false;
          // } else {
          //   this.rewardEmail = true;
          // }
          //rewardData는 7일간의 보상 데이터
          for(let i= 0; i < this.rewardData.length; i++) { //현재 이메일이 reward의 이메일과 같으면
            console.log(this.rewardData[i].email);
            if(this.challengeuseTime.email == this.rewardData[i].email) {
              // this.rewardEmail = true;
              this.challengeReward = true;
              break;
            } else {
              // this.rewardEmail = false;
              this.challengeReward = false;
            }
          }
        // }
      // });
      
      this.loadProgress = (Number(data.usetime) / 7560) * 100;
      // this.loadProgress = (Number(data.usetime) / 10800) * 100; //20191129 전시회 용으로 프로그레스바 15분 로직으로 변경
      if(this.loadProgress > 100){
        this.loadProgress = 100;
      }
      this.displayUseTime = this.getSecondsAsDigitalClock2(data.usetime);
    });
  }

  // 7일간의 보상 데이터 불러오기
  public rewardLoad() {
    this.images.rewardLoad().subscribe(data => {
      this.rewardData = data;
      console.log(this.rewardData);
    });
  }


  //20190617 미션 참여자 인원 count
  public missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
      this.missionCounter = data;
    });
  }

  //20190617 미션 참여자 인원 count
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
            // if (data[i].email === this.userData.email) {  // 미션 성공, 실패시 랭킹 정보 가져오기
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
        // console.log(this.memberRanking);
      }
    });
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '데이터를 불러오는중입니다'
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
      // title: "미션 포기",
      message: "챌린지를 정말 포기 하시겠습니까? <br> 플리닉 사용시간이 초기화 되며, <br> 기간내에 재참여는 가능합니다.",
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
      // title: "미션 포기",
      message: "챌린지를 정말 포기 하시겠습니까? <br> 플리닉 사용시간이 초기화 되며, <br> 기간내에 재참여는 가능합니다.",
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
    return minutesString2 + '분 ' + secondsString + '초';
    // console.log("displaytime : " + index + " : " + this.displayTime[index]);
  }


  getSecondsAsDigitalClock3(inputSeconds: number) {  // 분까지만 표시 하기 위한 함수
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
    return minutesString2 + '분 ' + secondsString + '초';
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
        staticText: this.productTitle
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

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.productURL, '_blank', options);
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
          console.log("카카오 링크 공유 성공----------------------------------------");
          this.auth.snsPointUpdate(this.carezoneData2._id, this.userData.email, this.carezoneData2.bonuskakao).subscribe(data => {
            if (data) {
              this.showAlert("플리닉 SNS누적", JSON.stringify(data.msg).replace('"', ''))
            } else {
              this.showAlert("플리닉 누적 오류", "[오류]SNS 누적이 정상적으로 되지 않았습니다.")
            }
          });
          console.log("점수는 ? : " + this.carezoneData2.bonuskakao);
          console.log("이메일은 ? : " + this.userData.email);

        },
        err => {
          console.log(JSON.stringify(err));
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
    this.socialSharing.shareViaFacebook("Plinic", 'https://plinic.s3.ap-northeast-2.amazonaws.com/' + loaddata.filename, "http://g1p.co.kr").then(res => {
      console.log("페이스북 공유 성공 : " + res);
      this.auth.snsPointUpdate(this.carezoneData2._id, this.userData.email, this.carezoneData2.bonusface).subscribe(data => {
        if (data) {
          this.showAlert("플리닉 SNS누적", JSON.stringify(data.msg).replace('"', ''))
        } else {
          this.ios_showAlert("플리닉 누적 오류", "[오류]SNS 누적이 정상적으로 되지 않았습니다.")
        }
      });
    }, err => {
      console.log("페이스북 공유 실패 : " + JSON.stringify(err))
      if (err === 'cancelled') {
        console.log("페이스북 공유 하려다가 취소 됨 : " + err);
      }
      if (err === 'not available') {
        console.log("페이스북 공유 성공적으로 됨");
        this.auth.snsPointUpdate(this.carezoneData2._id, this.userData.email, this.carezoneData2.bonusface).subscribe(data => {
          if (data) {
            this.ios_showAlert("플리닉 SNS누적", JSON.stringify(data.msg).replace('"', ''))
          } else {
            this.ios_showAlert("플리닉 누적 오류", "[오류]SNS 누적이 정상적으로 되지 않았습니다.")
          }
        });
      }
    });
  }

  share() {
    this.showAlert("준비중", "밴드 공유 기능 준비중입니다.")
    // var url = encodeURI(encodeURIComponent("https://g1p.co.kr/company/plinicstory.html"));
    // var title = encodeURI("플라즈마 미용기기 플리닉");
    // // var shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
    // var shareURL = "https://band.us/plugin/share?body='플리닉'&route='Plinic'";
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
        text: '확인',
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
        text: '확인',
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

  getCovertKoreaTime2(time) {
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

  // randomUrl() {
  //   var urlNo;
  //   urlNo = this.makeRandom(1,3);
    
  //   switch(urlNo) {
  //     case 1 : this.adUrl = 'assets/img/beauty/beauty_ad_1.png';
  //              this.productTitle = '플리닉 크림';
  //              this.productURL = 'https://www.plinicshop.com/Products/Details/1863';
  //               break;
  //     case 2 : this.adUrl = 'assets/img/beauty/beauty_ad_2.png';
  //              this.productTitle = '뷰셀리온';
  //              this.productURL = 'https://www.plinicshop.com/Products/Details/1968';
  //               break;
  //     case 3 : this.adUrl = 'assets/img/beauty/beauty_ad_3.png';
  //              this.productTitle = '레스테틱';
  //              this.productURL = 'https://www.plinicshop.com/Products/Details/1832';
  //               break;   
  //     default : this.adUrl = 'assets/img/beauty/beauty_ad_1.png';
  //               this.productTitle = '플리닉 크림';
  //               this.productURL = 'https://www.plinicshop.com/Products/Details/1863';
  //   }
  // }

  private makeRandom(min, max) {
        var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandVal;
  }

  goToChall() {
    this.nav.parent.select(1);
    this.nav.pop();
  }

  randomUrl() {
    var urlNo;
    urlNo = this.makeRandom(1,3);
    
    switch(urlNo) {
      case 1:  this.adUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/' + "" + this.bannersData.filename;
               this.productTitle = '포인트샵 뷰셀리온 배너';
               this.productURL = 'https://smartstore.naver.com/beaucellion';
                break;
      case 2 : this.adUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/' + "" + this.bannersData.twoFileName;
               this.productTitle = '포인트샵 화장품 배너';
               this.productURL = 'https://smartstore.naver.com/plinic';
                break;
      case 3 : this.adUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/' + "" + this.bannersData.threeFileName;
               this.productTitle = '포인트샵 기기배너';
               this.productURL = 'https://smartstore.naver.com/plinic/products/4714726098';
                break;   
      // default : this.adUrl = 'assets/img/beauty/beauty_ad_4.jpg';
      //           this.productTitle = '포인트샵 뷰셀리온 배너';
      //           this.productURL = 'https://smartstore.naver.com/beaucellion';
    }
  }

  showReComments(index) {
    this.isShowReComments[index] = true;
  }

  noShowReComments(index) {
    this.isShowReComments[index] = false;
    this.resize2();
    this.recomment.body="";
  }

  resize2() {
    setTimeout(() => {
      this.myInput2.nativeElement.style.height = 'auto'
      this.myInput2.nativeElement.style.height = this.myInput2.nativeElement.scrollHeight + 'px';
    }, 100)
  }

  showReComments2(index) {
    this.isShowReComments2[index] = true;
  }

  noShowReComments2(index) {
    this.isShowReComments2[index] = false;
    this.resize2();
    this.recomment.body="";
  }

  saveReCommentsChallenge(id, index) {
    // console.log(this.comment.body);
    console.log("================" + id);
    this.auth.replyChallengeReCommentSave(this.userData, id, this.recomment).subscribe(data => {
      // this.isShowReComments[index] = false;
      // this.isShowReComments2[index] = false;
      if (data !== "") {
        let alert2 = this.alertCtrl.create({
          cssClass: 'push_alert',
          title: '답글달기',
          message: "답글이 정상적으로 등록되었습니다.",
          enableBackdropDismiss: true,
          buttons: [
            {
              text: '확인',
              handler: () => {
                
              }
            }
          ]
        });
        alert2.onDidDismiss(()=>{
          this.registerReply.comment = '';
          this.recomment.body = '';
          this.resize();
          this.resize2();
          this.update();
          this.isShowReply = true;
          this.isShowReComments[index] = false;
          this.isShowReComments2[index] = false;
        })
        alert2.present();
      }
    }, error => {
      this.showError(JSON.parse(error._body).msg);
    });
  }

  protected adjustTextarea2(index): void {
    let textArea2 = this.element.nativeElement.getElementsByTagName('textarea')[1];
    textArea2.style.overflow = 'hidden';
    textArea2.style.height = 'auto';
    textArea2.style.height = textArea2.scrollHeight + 'px';
    textArea2.style.cursor = 'pointer';
    return;
  }

  getBannersList() {
    this.images.getBannerList().subscribe((data) => {
      this.bannersData = data;
      setTimeout(() => {
        this.randomUrl();
      }, 500);
    })
  }



}
