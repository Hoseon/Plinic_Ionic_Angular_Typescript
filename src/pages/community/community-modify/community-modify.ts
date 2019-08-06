import { Component, ViewChild, Directive, HostListener, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, PopoverController, LoadingController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { PopoverPage } from './popover/popover';
import { ImagesProvider } from '../../../providers/images/images';
import { CommunityWritePage } from '../community-write/community-write';
import { AuthService } from '../../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { KakaoCordovaSDK, KLCustomTemplate, KLLinkObject, KLSocialObject, KLButtonObject, KLContentObject, KLFeedTemplate, AuthTypes } from 'kakao-sdk';
import { Instagram } from '@ionic-native/instagram';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';





@IonicPage()
@Component({
  selector: 'page-community-modify',
  templateUrl: 'community-modify.html',
})
// @Directive({
//   selector: "ion-textarea[autoresize]" // Attribute selector
// })

export class CommunityModifyPage {


  id: any;
  mode: any;
  beautyNoteOneLoadData: any = {};
  skinQnaOneLoadData: any = {};
  tags = [];
  comment_popover_option: any = "보기";
  comment_popover_option_textarea: any;
  select_popover_option: any = "보기";
  userData: any = {};
  profileimg_url: any;
  jwtHelper: JwtHelper = new JwtHelper();

  registerReply = { comment: '', id: '' };
  reply = { comment: '', id: '', email: '' };

  islike: boolean = false;

  focusvalue: any;
  updatevalue: any;

  page_write = "2";
  page_modify = "3";


  @ViewChild('myInput') myInput: ElementRef;

  @ViewChild('textarea') mytextarea;

  browserRef: any;


  constructor(private fb : Facebook,
    private iab: InAppBrowser, private socialSharing: SocialSharing, private instagram: Instagram, public _kakaoCordovaSDK: KakaoCordovaSDK, private toastctrl: ToastController, private alertCtrl: AlertController, private auth: AuthService, public nav: NavController,
    public navParams: NavParams, public platform: Platform, private images: ImagesProvider,
    public viewCtrl: ViewController, public popoverCtrl: PopoverController, public element: ElementRef, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.platform.ready().then((readySource) => {

      //this.presentLoading();

    })
  }

  ionViewCanEnter() {
    //this.loadItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityModifyPage');
    this.loadItems();
    this.id = this.navParams.get('id');
    this.mode = this.navParams.get('mode');
    console.log("mode : " + this.mode);
    if (this.navParams.get('mode') === 'qna') {
      this.skinQnaOneLoad(this.id);
    } else {
      this.beautyNoteOneLoad(this.id);
    }
  }

  ionViewDidEnter() {

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






  // 글쓰기 수정 popover
  public select_popover(event) {
    if (this.platform.is('ios')) {
      let popover = this.popoverCtrl.create(PopoverPage, {},
        {
          cssClass: "ios_popover"
        });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(popoverData => {
        console.log(popoverData);
        this.select_popover_option = popoverData;
        if (this.select_popover_option === "수정") {
          setTimeout(() => {
            console.log('수정');
            console.log(JSON.stringify(this.beautyNoteOneLoadData));
            if (this.mode === 'note') {
              let myModal = this.modalCtrl.create(CommunityWritePage, {
                _id: this.beautyNoteOneLoadData._id,
                beautyNoteOneLoadData: this.beautyNoteOneLoadData,
                // select : this.beautyNoteOneLoadData.select,
                // title : this.beautyNoteOneLoadData.title,
                // contents : this.beautyNoteOneLoadData.contents,
                // tags : this.beautyNoteOneLoadData.tags,
                // filename : this.beautyNoteOneLoadData.filename,
                // originalName : this.beautyNoteOneLoadData.originalName,
                // views : this.beautyNoteOneLoadData.views,
                // createdAt : this.beautyNoteOneLoadData.createdAt,
                // email : this.beautyNoteOneLoadData.email,
                mode: 'note'
              });
              myModal.present();
            }
            if (this.mode === 'qna') {
              let myModal = this.modalCtrl.create(CommunityWritePage, {
                _id: this.skinQnaOneLoadData._id,
                skinQnaOneLoadData: this.skinQnaOneLoadData,
                // _id : this.skinQnaOneLoadData._id,
                // select : this.skinQnaOneLoadData.select,
                // title : this.skinQnaOneLoadData.title,
                // contents : this.skinQnaOneLoadData.contents,
                // tags : this.skinQnaOneLoadData.tags,
                // filename : this.skinQnaOneLoadData.filename,
                // originalName : this.skinQnaOneLoadData.originalName,
                // views : this.skinQnaOneLoadData.views,
                // createdAt : this.skinQnaOneLoadData.createdAt,
                // email : this.skinQnaOneLoadData.email,
                mode: 'qna'
              });
              myModal.present();
            }


          }, 100)
        }
        else if (this.select_popover_option === "삭제") {
          let alert = this.alertCtrl.create({
            cssClass: 'push_alert_cancel',
            title: "plinic",
            message: "게시글을 정말로 삭제하시겠습니까?",
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
                    this.auth.noteDelete(this.beautyNoteOneLoadData._id).subscribe(data => {
                      if (data) {
                        let alert2 = this.alertCtrl.create({
                          cssClass: 'push_alert',
                          title: '게시글 삭제',
                          message: "게시글이 정상적으로 삭제 되었습니다.",
                          buttons: [
                            {
                              text: '확인',
                              handler: () => {
                                // this.registerReply.comment = '';
                                // this.comment_popover_option_textarea = -1;
                                // this.textareaResize();
                                // this.update();
                                console.log("피부 노트 삭제");
                                this.viewCtrl.dismiss({
                                  page_modify: this.page_modify
                                });
                              }
                            }
                          ]
                        });
                        alert2.present();
                      }
                    });
                  }

                  if (this.mode === 'qna') {
                    console.log("피부 고민 삭제");
                    this.auth.skinQnaDelete(this.skinQnaOneLoadData._id).subscribe(data => {
                      if (data) {
                        let alert2 = this.alertCtrl.create({
                          cssClass: 'push_alert',
                          title: '게시글 삭제',
                          message: "게시글이 정상적으로 삭제 되었습니다.",
                          buttons: [
                            {
                              text: '확인',
                              handler: () => {
                                // this.registerReply.comment = '';
                                // this.comment_popover_option_textarea = -1;
                                // this.textareaResize();
                                // this.update();
                                console.log("피부 고민 삭제");
                                this.viewCtrl.dismiss({
                                  page_modify: this.page_modify
                                });
                              }
                            }
                          ]
                        });
                        alert2.present();
                      }
                    });
                  }
                }
              }]
          });
          alert.present();
          console.log('select_popover_option=1=========' + this.select_popover_option);
        }
      });
    }
    else {
      let popover = this.popoverCtrl.create(PopoverPage, {},
        {
          cssClass: "android_popover"
        });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(popoverData => {
        console.log(popoverData);
        this.select_popover_option = popoverData;
        if (this.select_popover_option === "수정") {
          setTimeout(() => {
            console.log('수정');
            let myModal = this.modalCtrl.create(CommunityWritePage);
            myModal.present();
          }, 100)
        }
        else if (this.select_popover_option === "삭제") {
          let alert = this.alertCtrl.create({
            cssClass: 'push_alert_cancel',
            title: "plinic",
            message: "게시글을 정말로 삭제하시겠습니까?",
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
                    this.auth.noteDelete(this.beautyNoteOneLoadData._id).subscribe(data => {
                      if (data) {
                        console.log("안드로이드 피부 노트 삭제");
                        let alert2 = this.alertCtrl.create({
                          cssClass: 'push_alert',
                          title: '게시글 삭제',
                          message: "게시글이 정상적으로 삭제 되었습니다.",
                          buttons: [
                            {
                              text: '확인',
                              handler: () => {
                                // this.registerReply.comment = '';
                                // this.comment_popover_option_textarea = -1;
                                // this.textareaResize();
                                // this.update();
                                this.viewCtrl.dismiss();
                              }
                            }
                          ]
                        });
                        alert2.present();
                      }
                    });
                  }

                  if (this.mode === 'qna') {
                    console.log("안드로이드 피부 고민 삭제");
                  }
                }
              }]
          });
          alert.present();
          console.log('select_popover_option2==========' + this.select_popover_option);

        }
      });
    }
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




  presentLoading() {
    const loader = this.loadingCtrl.create({
      cssClass: 'sk-rotating-plane',
      showBackdrop: true,
      duration: 50,
    });
    loader.present();
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


  updateComment(event) {
    // this.registerReply.comment = event.target.value;
    console.log("-------------------updatecomment");
    console.log(event.target.value);
    this.updatevalue = event.target.value;
    // console.log(document.getElementById('updatereply').getAttribute('value'));
    // console.log(this.registerReply.comment);

  }

  focus(event) {
    console.log(event.target.value)
    // this.focusvalue = event.target.value
    this.updatevalue = event.target.value
    console.log(event)
    console.log("focus focus")
  }



  public dissmiss() {
    this.viewCtrl.dismiss();
  }

  public beautyNoteOneLoad(id) {
    this.images.beautyNoteOneLoad(id).subscribe(data => {
      this.beautyNoteOneLoadData = data;
      this.tags = data.tags.split(",");
      for (var i = 0; i < data.likeuser.length; i++) {
        if (this.userData.email === data.likeuser[i]) {
          this.islike = true;
        }
      }
    });
  }

  public skinQnaOneLoad(id) {
    this.images.skinQnaOneLoad(id).subscribe(data => {
      this.skinQnaOneLoadData = data;
      this.tags = data.tags.split(",");
      for (var i = 0; i < data.likeuser.length; i++) {
        if (this.userData.email === data.likeuser[i]) {
          this.islike = true;
        }
      }
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
          from: items.from
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
        console.log(this.userData.from);
      }

      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }

  saveReply() {
    console.log(this.id);
    console.log(this.registerReply.comment);
    this.registerReply.id = this.id;

    if(this.userData.from === 'kakao' || this.userData.from === 'naver' || this.userData.from === 'google'){
      this.auth.replySnsSave(this.userData, this.registerReply).subscribe(data => {
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
      this.auth.replySave(this.userData, this.registerReply).subscribe(data => {
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

    // this.auth.replySave(this.userData, this.registerReply).subscribe(data => {
    //   if (data !== "") {
    //     let alert2 = this.alertCtrl.create({
    //       cssClass: 'push_alert',
    //       title: '댓글달기',
    //       message: "댓글이 정상적으로 등록되었습니다.",
    //       buttons: [
    //         {
    //           text: '확인',
    //           handler: () => {
    //             this.registerReply.comment = '';
    //             this.textareaResize();
    //             this.update();
    //           }
    //         }
    //       ]
    //     });
    //     alert2.present();
    //   }
    //   // this.nav.push(CareZoneMissionIngPage, { _id: id });
    // }, error => {
    //   this.showError(JSON.parse(error._body).msg);
    // });
  }


  replyUpdate(email, id) {
    this.reply.email = email;
    this.reply.id = id;
    // this.reply.comment = document.getElementById('updatereply').getAttribute('ng-reflect-model');
    this.reply.comment = this.updatevalue;
    console.log(this.registerReply.comment);

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "plinic",
      message: "댓글을 수정 하시겠습니까?",
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
            this.auth.replyUpdate(this.reply).subscribe(data => {
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


  saveSkinQnaReply() {
    console.log(this.id);
    console.log(this.registerReply.comment);
    this.registerReply.id = this.id;
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


  replySkinQnaUpdate(email, id) {
    this.reply.email = email;
    this.reply.id = id;
    // this.reply.comment = document.getElementById('updatereply').getAttribute('ng-reflect-model');
    this.reply.comment = this.updatevalue;
    console.log(this.registerReply.comment);
    console.log("comment_popover_option=================" + this.comment_popover_option);

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "plinic",
      message: "댓글을 수정 하시겠습니까?",
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
            this.auth.replySkinQnaUpdate(this.reply).subscribe(data => {
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
                console.log("comment_popover_option=================" + this.comment_popover_option);
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


  like(id, user) {
    if (this.mode === 'note') {
      this.images.noteLike(id, user).subscribe(data => {
        if (data !== '') {
          this.islike = true;
          this.toast();
          console.log("-----------------------------------------" + data);
        }
      });
    }
    if (this.mode === 'qna') {
      this.images.skinQnaLike(id, user).subscribe(data => {
        if (data !== '') {
          this.islike = true;
          this.toast();
          console.log("-----------------------------------------" + data);
        }
      });
    }
  }

  dislike(id, user) {
    if (this.mode === 'note') {
      this.images.noteDisLike(id, user).subscribe(data => {
        if (data !== '') {
          this.islike = false;
          this.distoast();
          console.log("-----------------------------------------" + data);
        }
      });
    }

    if (this.mode === 'qna') {
      this.images.skinQnaDisLike(id, user).subscribe(data => {
        if (data !== '') {
          this.islike = false;
          this.distoast();
          console.log("-----------------------------------------" + data);
        }
      });
    }

  }

  toast() {
    let toastctrl = this.toastctrl.create({
      message: '좋아요!',
      duration: 1000,
      position: 'middle'
    });

    toastctrl.onDidDismiss(() => {
    });

    toastctrl.present();
  }

  distoast() {
    let toastctrl = this.toastctrl.create({
      message: '좋아요를 취소하셨습니다',
      duration: 1000,
      position: 'middle'
    });

    toastctrl.onDidDismiss(() => {
    });

    toastctrl.present();
  }



  kakaolink(beautyNoteOneLoadData) {
    let feedLink: KLLinkObject = {
      webURL: 'http://www.naver.com/',
    };

    let feedSocial: KLSocialObject = {
      likeCount: parseInt(beautyNoteOneLoadData.like),
    };

    let feedButtons1: KLButtonObject = {
      title: '플리닉 바로가기',
      link: {
        mobileWebURL: 'http://plinic.co.kr',
      },
    };

    let feedButtons2: KLButtonObject = {
      title: '앱에서 확인',
      link: {
        iosExecutionParams: 'param1=value1&param2=value2',
        androidExecutionParams: 'param1=value1&param2=value2',
      },
    };

    let feedContent: KLContentObject = {
      title: beautyNoteOneLoadData.title,
      link: feedLink,
      imageURL: 'http://plinic.cafe24app.com/beautynoteimage/' + beautyNoteOneLoadData._id
    };


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


  share_instagram() {
    this.instagram.share('http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png', '플리닉 공유하기')
      // this.instagram.share('data:image/png;uhduhf3hfif33', '플리닉 공유하기')
      .then(() => { console.log('Shared!') })
      .catch((error: any) => console.error(error));

  }

  share_facebook(loaddata) {
    // this.socialSharing.shareViaFacebook("Plinic", "http://plinic.cafe24app.com/beautynoteimage/" + loaddata._id, "http://g1p.co.kr").then(() => {
    //   console.log("페이스북 쉐어링 통광 ");
    // }).catch(() => {
    //   console.log("페이스북 쉐어링 실패 ");
    // })

    this.fb.showDialog({
      // method: 'share',
      // href: 'http://g1p.co.kr',
      // caption: '플리닉 페이스북 공유하기',
      // description: '플리닉 페이스북 공유하기 설명',
      // message: "Come on man, check out my application.",
      // title: "플리닉 제목 테스트",
      // picture: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png'
      // method: "share",
      // href: 'http://g1p.co.kr',
      // picture: 'https://www.google.co.jp/logos/doodles/2014/doodle-4-google-2014-japan-winner-5109465267306496.2-hp.png',
      // name: 'Test Post',
      // message: 'First photo post',
      // caption: 'Testing using phonegap plugin',
      // description: 'Posting photo using phonegap facebook plugin'
      method: "share",
      href: "http://g1p.co.kr",
      caption: "Such caption, very feed.",
      description: "Much description",
      picture: "http://plinic.cafe24app.com/beautynoteimage/" + loaddata._id,
      hashtag: '#플리닉',
      share_feedWeb: true, // iOS only
    }).then(res => {
      console.log("페이스북 공유 성공 : " + res);
    }, err => {
      console.log("페이스북 공유 실패 : " + err)
    }
    )
  }

  share() {
    var url = encodeURI(encodeURIComponent("https://g1p.co.kr/company/plinicstory.html"));
    var title = encodeURI("플라즈마 미용기기 플리닉");
    // var shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
    var shareURL = "https://band.us/plugin/share?body='플리닉'&route='Plinic'";
    let successComes: boolean = false;
    this.browserRef = this.iab.create(shareURL, "_blank");
    this.browserRef.on("exit").subscribe((event: InAppBrowserEvent) => {
      // let successComes: boolean = false;
      console.log("exit comes: " + JSON.stringify(event));
      //사용자가 done을 눌러야지만 추적이 가능함
      // setTimeout(() => {
        // if (!successComes) {
          // let reason = { stage: "login_err", msg: "no input" };
        // }
      // }, 1000); //  1 second. Is it enough?

    });
    this.browserRef.on("loadstart").subscribe((event:InAppBrowserEvent)=>{
      console.log("loadstart --------------------------------------- : " + JSON.stringify(event));
    })
    // document.location.href = shareURL;
  }



  doKakaoLogin() {
    var url = encodeURI(encodeURIComponent("https://g1p.co.kr/company/plinicstory.html"));
    var title = encodeURI("플라즈마 미용기기 플리닉");
    var shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
    let successComes: boolean = false;
    this.browserRef = this.iab.create(shareURL, "_blank");
    this.browserRef.on("exit").subscribe((event: InAppBrowserEvent) => {
      let successComes: boolean = false;
      console.log("exit comes: " + JSON.stringify(event));
      setTimeout(() => {
        if (!successComes) {
          let reason = { stage: "login_err", msg: "no input" };
        }
      }, 1000); //  1 second. Is it enough?

    });
    this.browserRef.on("loadstart").subscribe((event:InAppBrowserEvent)=>{
      console.log("loadstart --------------------------------------- : " + event);
    })
  }



}
