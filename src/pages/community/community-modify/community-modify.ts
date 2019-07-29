import { Component, ViewChild, Directive, HostListener, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, PopoverController, LoadingController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { PopoverPage } from './popover/popover';
import { ImagesProvider } from '../../../providers/images/images';
import { CommunityWritePage } from '../community-write/community-write';
import { AuthService } from '../../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';



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
  beautyNoteOneLoadData: any;
  skinQnaOneLoadData: any;
  tags = [];
  comment_popover_option: any = "보기";
  comment_popover_option_textarea: any;
  select_popover_option: any = "보기";
  userData: any;
  profileimg_url: any;
  jwtHelper: JwtHelper = new JwtHelper();

  registerReply = { comment: '', id: '' };
  reply = { comment: '', id: '', email: '' };

  islike: boolean = false;

  focusvalue : any;
  updatevalue : any;


  @ViewChild('myInput') myInput: ElementRef;

  @ViewChild('textarea') mytextarea ;


  constructor(private toastctrl: ToastController, private alertCtrl: AlertController, private auth: AuthService, public nav: NavController,
     public navParams: NavParams, public platform: Platform, private images: ImagesProvider,
    public viewCtrl: ViewController, public popoverCtrl: PopoverController, public element: ElementRef, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.platform.ready().then((readySource) => {

      //this.presentLoading();
    })
  }

  ionViewCanEnter() {

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
    // console.log("refresh");
  }

  update() {
    this.viewCtrl._didLoad();
    // this.nav.setRoot(this.nav.getActive().component);
  }

  resize() {
    this.myInput.nativeElement.style.height = 'auto'
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  textareaResize() {
    this.myInput.nativeElement.style.height = '40px'
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
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
            let myModal = this.modalCtrl.create(CommunityWritePage);
            myModal.present();
          }, 100)
        }
        else if (this.select_popover_option === "삭제") {
          console.log('select_popover_option==========' + this.select_popover_option);
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
          console.log('select_popover_option==========' + this.select_popover_option);
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

  focus(event){
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
        // console.log(this.userData);
      }
      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }

  saveReply() {
    console.log(this.id);
    console.log(this.registerReply.comment);
    this.registerReply.id = this.id;
    this.auth.replySave(this.userData.email, this.registerReply).subscribe(data => {
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
    this.auth.replySkinQnaSave(this.userData.email, this.registerReply).subscribe(data => {
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
                this.comment_popover_option="보기";
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

    if(this.mode === 'qna'){
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



}
