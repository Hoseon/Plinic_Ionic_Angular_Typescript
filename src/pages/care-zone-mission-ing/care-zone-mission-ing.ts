import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ModalController, AlertController, Platform, PopoverController, ViewController } from 'ionic-angular';
import { CareZoneMissionDeadlinePage } from '../care-zone-mission-deadline/care-zone-mission-deadline';
import { CareZonePage } from '../care-zone/care-zone';
import { ImagesProvider } from '../../providers/images/images';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { MissionStartPage } from './mission-start/mission-start';
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing'
import { PopoverPage } from '../community/community-modify/popover/popover';
import { RewardPage } from '../reward/reward'
import { Observable } from 'rxjs/Rx';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { KakaoCordovaSDK, KLCustomTemplate, KLLinkObject, KLSocialObject, KLButtonObject, KLContentObject, KLFeedTemplate, AuthTypes } from 'kakao-sdk';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the CareZoneMissionIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-care-zone-mission-ing',
  templateUrl: 'care-zone-mission-ing.html',
})
export class CareZoneMissionIngPage {

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
  reward: boolean = false;
  commentTimeZone: Array<any> = new Array<any>();
  profileimg_url: any;


  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private images: ImagesProvider, public element: ElementRef,
    private loadingCtrl: LoadingController, private modalCtrl: ModalController,
    private alertCtrl: AlertController, public platform: Platform,
    private auth: AuthService, public popoverCtrl: PopoverController,
    private themeableBrowser: ThemeableBrowser, public _kakaoCordovaSDK: KakaoCordovaSDK, private socialSharing: SocialSharing) {

    // this.missionUseTime(this.carezoneData2);
    // this.roadmission(this.carezoneData2._id);
    // this.missionCount(this.carezoneData2._id);
    // this.skinQnaOneLoad(this.carezoneData2._id);
    this.bannerData = this.roadbanner();
  }

  ionViewCanEnter() {
    this.loadItems();
  }

  ionViewDidLoad() {
    this.loadItems();
    if (this.navParams.get('carezoeId')) {
      this.carezoneData2 = this.roadmission(this.navParams.get('carezoeId'));
    }

    if (this.navParams.get('carezoneData')) {
      this.carezoneData2 = this.navParams.get('carezoneData');
    }
    this.getCommentTimeZone();
    this.getUserimage();


    // this.showMissionfail();
    // this.showMissionsuccess();
  }

  ionViewDidEnter() {
    //20191024 참여자의 사용시간, 보상여부(Reward)의 값을 가져 온다.
    this.missionUseTime(this.carezoneData2, this.userData.email);

    this.missionMember(this.carezoneData2._id);
    this.timeremaining = (new Date(this.carezoneData2.endmission).getTime() - new Date().getTime()) / 1000;
    (new Date(this.carezoneData2.endmission).getTime() < new Date().getTime()) ? this.endCheck = true : this.endCheck = false;
    // console.log("this.endCheck : " + this.endCheck);
    // console.log("Your Ranking : " + this.rank);
    this.timerTick();
    this.missionCount(this.carezoneData2._id);

  }

  ionViewWillEnter() {


    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        // tabs[ key ].style.transform = 'translateY(56px)';
        tabs[key].style.display = '';
      });
    } // end if
  }

  ionViewWillLeave() {
    this.subscriptionFourth.complete();
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
      title: '최종 순위 ' + this.rank + '위',
      subTitle: '당신의 피부가 <br /> 좋아지는 중입니다.',
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
          }
        }]
    });
    alert.present();
  }

  showMissionsuccess() {
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      cssClass: 'mission_alert_success',
      title: '최종 순위 ' + this.rank + '위',
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

  update() {
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
                  if (this.mode === 'note') {
                    this.auth.replyDelete(this.reply).subscribe(data => {
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

                  if (this.mode === 'qna') {
                    this.auth.replySkinQnaDelete(this.reply).subscribe(data => {
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
    this.showLoading();
    this.images.missionRoad(id).subscribe(data => {
      if (data !== '') {
        this.carezoneData = data;
        this.carezoneData2 = data;
        this.startDate = data.startmission.substr(0, 10);
        this.endDate = data.endmission.substr(0, 10);
        this.imgUrl = "http://plinic.cafe24app.com/carezone_prodimages/".concat(data._id);
        //this.imgUrl.includes(data._id);
        //console.log(JSON.stringify(this.carezoneData));
        this.loading.dismiss();
        this.getCommentTimeZone();
        this.getUserimage();
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }

      this.getday = new Date(this.carezoneData.startmission);
      this.dday = this.diffdate(this.getday, this.currentDate);
      this.dday = parseInt(this.dday);

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
    this.images.getMissionMember(id).subscribe(data => {
      if (data !== '') {
        this.missionmember = data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].email === this.userData.email) {  // 미션 성공, 실패시 랭킹 정보 가져오기
            this.rank = i + 1;
            // console.log("this ranking :" + this.rank);
          }

          this.memberRanking[i] = {
            email: data[i].email,
            usetime: data[i].usetime,
            rank: i + 1,
            image_url: data[i].image_url,
            userImageFilename: data[i].userImageFilename,
          }
          // this.memberRanking[i].rank = i;
          this.displayUseTimeList[i] = this.getSecondsAsDigitalClock3(Number(data[i].usetime));
        }
      }
    });
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
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
      title: "챌린지 포기",
      message: "미션을 정말 포기 하시겠습니까? <br> 플리닉 사용시간이 초기화 되며, <br> 기간내에 재참여는 가능합니다.",
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
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
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
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
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
  
}
