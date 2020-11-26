import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, ToastController, AlertController, ViewController } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ImagesProvider } from '../../providers/images/images';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { PopoverPage } from '../community/community-modify/popover/popover';


/**
 * Generated class for the SungwooBeautyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-beauty',
  templateUrl: 'sungwoo-beauty.html',
})
export class SungwooBeautyPage {
  updatevalue: any;
  jwtHelper: JwtHelper = new JwtHelper();
  youtubeData: any;
  youTubeUrl: any;
  url: SafeResourceUrl;
  isShowReply: boolean = false;
  isShowReReply: boolean = true;
  movieData: any;
  youTubeArrayData: Array<any> = new Array<any>();
  isGetTube: boolean = false;
  userData: any;
  thumb_image: any;
  from : any;
  profileimg_url: any;
  islike: boolean = false;
  mode: any;
  movieId: any;
  comment = { body: '', email: '' };
  recomment = { body: '', email: '' };
  reply = { comment: '', id: '', email: '' };
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('myInput2') myInput2: ElementRef;
  isShowReComments: Array<boolean> = new Array<boolean>(); //댓글
  isShowReComments2: Array<boolean> = new Array<boolean>(); //대댓글
  comment_popover_option: any = "보기";
  comment_popover_option_textarea: any;

  constructor(
    private http: Http, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public _DomSanitizer: DomSanitizer,
    public images: ImagesProvider,
    private auth: AuthService,
    public toastctrl: ToastController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController, 
    public element: ElementRef,
    public popoverCtrl: PopoverController,
    ) {
      this.platform.ready().then(() => {
        this.loadItems();
        //사용자가 클릭한 유튜브 동영상 데이터 가져 오기
        if(this.navParams.get('youTubeData')) {
          this.movieId = this.navParams.get('youTubeData').id;
          this.youtubeData = this.navParams.get('youTubeData');
          this.youTubeUrl = "https://www.youtube.com/embed/" + this.youtubeData.id;
          this.url = _DomSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.youtubeData.id);
          // this.youTubeUrl = this._DomSanitizer.sanitize(this.youTubeUrl, URL);
        }

        //관리자가 등록한 여러개의 유튜브 동영상 데이터 가져 오기
        if(this.movieId) {
          this.images.getOneBeautyMovie(this.movieId).subscribe(data=> {
            this.movieData = data
            console.log(this.movieData);
            if(this.userData) {
              for (var i = 0; i < data.likeuser.length; i++) {
                if (this.userData.email === data.likeuser[i]) {
                  this.islike = true;
                }
              }           
            }
            for (var k = 0; k < data.comments.length; k++) {
              this.isShowReComments[k] = false;
            }
            
            for (var c = 0; c < data.comments.recomments.length; c++) {
              this.isShowReComments2[c] = false;
            }
          });  
        }

        this.images.getBeautyMovie().subscribe(data=> {
          if(data) {
            for(let i = 0; i < data.length; i++) {
              this.youTubeArrayData[i] = data[i].items[0];
            }
          }
        });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooBeautyPage');
  }

  toggleSection() {
    this.isShowReply = !this.isShowReply;
  }

  toggleItem(i, j) {
    this.youtubeData.open = !this.youtubeData.open;
  }

  async loadItems() {
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
        this.reloadUserPoint(this.userData.snsid);
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
        }
        // this.chkmission(this.userData.email);
        // this.chkIngmission(this.userData.email);
      } else {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: items.birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: items.gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          // totaluserpoint: this.jwtHelper.decodeToken(items).totaluserpoint,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: 'plinic',
        };
        this.reloadUserPoint(this.userData.email);
        // this.chkmission(this.userData.email);
        // this.chkIngmission(this.userData.email);
        this.from = 'plinic';
      }
      // console.log("사용자 포인트는? : " + this.userData.totaluserpoint);
      
      // console.log("사용자 포인트는? : " + this.userData.totaluserpoint);
      // console.log("사용자 이메일은? : " + this.userData.email);
      

      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }

  private reloadUserPoint(email) {
    this.auth.reloadUserPointfromPlincShop(email).subscribe(data =>{
      // console.log("커뮤니티 사용자 포인트 : " + data)
      this.userData.totaluserpoint = data.point;
      this.userData.totaluserpoint = this.addComma(this.userData.totaluserpoint);
    });
  }

  addComma(data_value) { //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString('en');
  }

  like(id, user) {
      this.images.movieLike(id, user).subscribe(data => {
        if (data !== '') {
          this.movieData = data;
          this.islike = true;
          this.toast();
          console.log("-----------------------------------------" + data);
        }
      });
  }

  dislike(id, user) {
      this.images.movieDisLike(id, user).subscribe(data => {
        if (data !== '') {
          this.movieData = data;
          this.islike = false;
          this.distoast();
          console.log("-----------------------------------------" + data);
        }
      });
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

  // public skinQnaOneLoad(id) {
  //   this.images.skinQnaOneLoad(id).subscribe(data => {
  //     // this.skinQnaOneLoadData = data;
  //     // this.tags = data.tags.split(",");
  //     for (var i = 0; i < data.likeuser.length; i++) {
  //       if (this.userData.email === data.likeuser[i]) {
  //         this.islike = true;
  //       }
  //     }
  //   });
  // }

  getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset()*60000).toISOString()
  }

  saveMovieReply() {
    console.log(this.comment.body);
    this.auth.replyMovieSave(this.userData, this.movieData._id, this.comment).subscribe(data => {
      if (data !== "") {
        let alert2 = this.alertCtrl.create({
          cssClass: 'push_alert',
          title: '댓글달기',
          message: "댓글이 정상적으로 등록되었습니다.",
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
          this.comment.body = '';
          this.resize();
          this.update();
          this.isShowReply = true;
        })
        alert2.present();
      }
      // this.nav.push(CareZoneMissionIngPage, { _id: id });
    }, error => {
      this.showError(JSON.parse(error._body).msg);
    });


    //2019-09-18 댓글 등록 시 본문 게시자에게 푸쉬 알림 전송
    //자신이 작성한 글에는 댓글 알람이 가지 않도록 한다.
    // if (this.skinQnaOneLoadData.email !== this.userData.email) {
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   headers.append('Authorization',
    //     'key=' + "AIzaSyCAcTA318i_SVCMl94e8SFuXHhI5VtXdhU");   //서버키
    //   let option = new RequestOptions({ headers: headers });
    //   let payload = {
    //     // "to": this.pushToken,
    //     "to": this.skinQnaOneLoadData.pushtoken,
    //     "priority": "high",
    //     data: { "mode": "qna", "id": this.skinQnaOneLoadData._id },
    //     "notification": {
    //       // "title": this.skinQnaOneLoadData.title,
    //       // "body": this.registerReply.comment,
    //       // "subtitle" : '댓글알림 subtitle',
    //       // "badge": 1,
    //       "title": '피부고민 댓글이 작성되었습니다.',
    //       "body": this.skinQnaOneLoadData.title,
    //       "sound": "default",
    //       "click_action": "FCM_PLUGIN_ACTIVITY",
    //     },
    //     //토큰
    //   }
    //   this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(payload), option)
    //     .map(res => res.json())
    //     .subscribe(data => {
    //     });
    // }
  }

  saveReCommentsMovieReply(id, index) {
    console.log(this.comment.body);
    console.log("================" + id);
    this.auth.replyMovieReCommentSave(this.userData, id, this.recomment).subscribe(data => {
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
          this.comment.body = '';
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
      // this.nav.push(CareZoneMissionIngPage, { _id: id });
    }, error => {
      this.showError(JSON.parse(error._body).msg);
    });


    //2019-09-18 댓글 등록 시 본문 게시자에게 푸쉬 알림 전송
    //자신이 작성한 글에는 댓글 알람이 가지 않도록 한다.
    // if (this.skinQnaOneLoadData.email !== this.userData.email) {
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   headers.append('Authorization',
    //     'key=' + "AIzaSyCAcTA318i_SVCMl94e8SFuXHhI5VtXdhU");   //서버키
    //   let option = new RequestOptions({ headers: headers });
    //   let payload = {
    //     // "to": this.pushToken,
    //     "to": this.skinQnaOneLoadData.pushtoken,
    //     "priority": "high",
    //     data: { "mode": "qna", "id": this.skinQnaOneLoadData._id },
    //     "notification": {
    //       // "title": this.skinQnaOneLoadData.title,
    //       // "body": this.registerReply.comment,
    //       // "subtitle" : '댓글알림 subtitle',
    //       // "badge": 1,
    //       "title": '피부고민 댓글이 작성되었습니다.',
    //       "body": this.skinQnaOneLoadData.title,
    //       "sound": "default",
    //       "click_action": "FCM_PLUGIN_ACTIVITY",
    //     },
    //     //토큰
    //   }
    //   this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(payload), option)
    //     .map(res => res.json())
    //     .subscribe(data => {
    //     });
    // }
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }


  update() {
    this.viewCtrl._didLoad();
    
    if(this.movieId) {
      this.images.getOneBeautyMovie(this.movieId).subscribe(data=> {
        this.movieData = data
        console.log(this.movieData);
        if(this.userData) {
          for (var i = 0; i < data.likeuser.length; i++) {
            if (this.userData.email === data.likeuser[i]) {
              this.islike = true;
            }
          }  
        }
      });  
    }
    // this.nav.setRoot(this.nav.getActive().component);
  }

  resize() {
    setTimeout(() => {
      this.myInput.nativeElement.style.height = 'auto'
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    }, 100)
  }

  resize2() {
    setTimeout(() => {
      this.myInput2.nativeElement.style.height = 'auto'
      this.myInput2.nativeElement.style.height = this.myInput2.nativeElement.scrollHeight + 'px';
    }, 100)
  }

  textareaResize() {
    setTimeout(() => {
      this.myInput.nativeElement.style.height = '40px'
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    }, 100)
  }

  protected adjustTextarea(): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    console.log("textArea.style.height : " + textArea.style.height)
    console.log("textArea.scrollHeight : " + textArea.scrollHeight)
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

  focus(event) {
    // console.log(event.target.value)
    // this.focusvalue = event.target.value
    this.updatevalue = event.target.value
    // console.log(event)
    // console.log("focus focus")
  }

  protected adjustTextarea2(index): void {
    console.log(index);
    let textArea2 = this.element.nativeElement.getElementsByTagName('textarea')[1];
    // console.log("textArea2.style.height : " + textArea2.style.height)
    // console.log("textArea2.scrollHeight : " + textArea2.scrollHeight)
    textArea2.style.overflow = 'hidden';
    textArea2.style.height = 'auto';
    textArea2.style.height = textArea2.scrollHeight + 'px';
    textArea2.style.cursor = 'pointer';
    return;
  }

  showReComments(index) {
    this.isShowReComments[index] = true;
  }

  noShowReComments(index) {
    this.isShowReComments[index] = false;
    this.resize2();
    this.recomment.body="";
  }


  showReComments2(index) {
    this.isShowReComments2[index] = true;
  }

  noShowReComments2(index) {
    this.isShowReComments2[index] = false;
    this.resize2();
    this.recomment.body="";
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
                  // this.auth.replyCareZoneDelete(this.reply).subscribe(data => {
                  //   if (data !== "") {
                  //     let alert2 = this.alertCtrl.create({
                  //       cssClass: 'push_alert',
                  //       title: '댓글삭제',
                  //       message: "댓글이 정상적으로 삭제 되었습니다.",
                  //       buttons: [
                  //         {
                  //           text: '확인',
                  //           handler: () => {
                  //             // this.registerReply.comment = '';
                  //             this.comment_popover_option_textarea = -1;
                  //             // this.textareaResize();
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
                  // this.auth.replyCareZoneDelete(this.reply).subscribe(data => {
                  //   if (data !== "") {
                  //     let alert2 = this.alertCtrl.create({
                  //       cssClass: 'push_alert',
                  //       title: '댓글삭제',
                  //       message: "댓글이 정상적으로 삭제 되었습니다.",
                  //       buttons: [
                  //         {
                  //           text: '확인',
                  //           handler: () => {
                  //             // this.registerReply.comment = '';
                  //             this.comment_popover_option_textarea = -1;
                  //             // this.textareaResize();
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
              }]
          });
          alert.present();
        }
      });
    }
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


  focuseTextarea() {
    this.myInput.nativeElement.focus();   
    this.toggleSection(); 
  }




}
