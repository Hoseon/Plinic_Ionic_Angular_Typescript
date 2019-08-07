import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Platform , PopoverController, ViewController} from 'ionic-angular';
import { CareZoneMissionDeadlinePage } from '../care-zone-mission-deadline/care-zone-mission-deadline';
import { CareZonePage } from '../care-zone/care-zone';
import { ImagesProvider } from '../../providers/images/images';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { MissionStartPage } from './mission-start/mission-start';
import { PopoverPage } from '../community/community-modify/popover/popover';

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
  endDate: any;
  startDate: any;
  imgUrl: any;
  userData: any;
  thumb_image: any;
  jwtHelper: JwtHelper = new JwtHelper();
  missionCounter : any;
  missionmember : any;
  dday: any;
  getday: any;
  currentDate: Date = new Date();
  rank: any = "19위";
  bannerData: any;
  comment_popover_option: any = "보기";
  comment_popover_option_textarea: any;
  skinQnaOneLoadData: any = {};
  registerReply = { comment: '', id: '' };
  reply = { comment: '', id: '', email: '' };
  @ViewChild('myInput') myInput: ElementRef;
  mode: any;
  updatevalue: any;

  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private images: ImagesProvider, public element: ElementRef,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, public platform: Platform, private auth: AuthService, public popoverCtrl: PopoverController) {


    this._id = this.navParams.get('_id');
    this.roadmission(this._id);
    this.missionCount(this._id);
    this.missionMember(this._id);
    this.bannerData = this.roadbanner();
    this.skinQnaOneLoad(this._id);
  }

  ionViewDidLoad() {
    this.loadItems();
    this.showMissionfail();
    this.showMissionsuccess();
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
      title: '최종 순위 '+this.rank,
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
      title: '최종 순위 '+this.rank,
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
              //do
          }
        }]
    });
    alert.present();
  }

  update() {
    this.viewCtrl._didLoad();
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
        console.log("popoverData : " + popoverData);
        this.comment_popover_option = popoverData;
        console.log(this.comment_popover_option_textarea)
        if (popoverData === "수정") {
          this.comment_popover_option_textarea = i;
          setTimeout(() => {
            console.log('수정');
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
          console.log("mode : " + this.mode);

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
        console.log("popoverData : " + popoverData);
        this.comment_popover_option = popoverData;
        console.log(this.comment_popover_option_textarea)
        if (popoverData === "수정") {
          this.comment_popover_option_textarea = i;
          setTimeout(() => {
            console.log('수정');
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
    console.log("-------------------updatecomment");
    console.log(event.target.value);
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
          thumbnail_image: items.thumbnail_image,
        };
        // console.log(this.userData);
        //this.chkmission(this.userData.email);
      }
    });
  }

  ngOnInit() {
    // setInterval(() => {
    //   if (this.loadProgress < 10)
    //     this.loadProgress += 1;
    //   else
    //     clearInterval(this.loadProgress);
    // }, 50);
  }

  public mission_start(){
     this.nav.push(MissionStartPage);
  }

  public roadmission(id) {
    this.showLoading();
    this.images.missionRoad(id).subscribe(data => {
      if (data !== '') {
        this.carezoneData = data;
        this.startDate = data.startmission.substr(0, 10);
        this.endDate = data.endmission.substr(0, 10);
        this.imgUrl = "http://plinic.cafe24app.com/carezone_prodimages/".concat(data._id);
        //this.imgUrl.includes(data._id);
        //console.log(JSON.stringify(this.carezoneData));
        this.loading.dismiss();
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }

      this.getday = new Date(this.carezoneData.startmission);
      this.dday = this.diffdate(this.getday, this.currentDate);
      this.dday = parseInt(this.dday);

    });

  }

  saveSkinQnaReply() {
    console.log(this._id);
    console.log(this.registerReply.comment);
    this.registerReply.id = this._id;
    if(this.userData.from === 'kakao' || this.userData.from === 'naver' || this.userData.from === 'google'){
      this.auth.replySkinQnaSnsSave(this.userData, this.registerReply).subscribe(data => {
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
    } else {
      this.auth.replySkinQnaSave(this.userData, this.registerReply).subscribe(data => {
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

  //20190617 미션 참여자 인원 count
  public missionCount(id) {
    // this.showLoading();
    this.images.missionCount(id).subscribe(data => {
       this.missionCounter = data;
    });
  }

  //20190617 미션 참여자 인원 count
  public missionMember(id) {
    // this.showLoading();
    this.images.getMissionMember(id).subscribe(data => {
       this.missionmember = data;
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
      title: "미션 포기",
      message: "미션을 정말 포기 하시겠습니까? <br> 기간내에 재참여는 가능합니다.",
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
                this.nav.parent.select(1);
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















}
