import { Component } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { IonicPage, NavController, NavParams, Platform, AlertController, ModalController, ViewController } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import {CommunityModifyPage} from '../community/community-modify/community-modify';

/**
 * Generated class for the AlarmtestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alarmtest',
  templateUrl: 'alarmtest.html',
})
export class AlarmTestPage {

  cucumber: boolean;
  userData: any = {};
  // alarmData: any;
  detailAlarmData: any;
  alarmList: any;
  thumb_image: any;
  jwtHelper: JwtHelper = new JwtHelper();
  saveAlarmData: any;
  profileimg_url: any;
  yearAgo: Date = new Date();
  skinQnaData: any;


  


  constructor(
    private http: Http, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    private platform: Platform,
    private images: ImagesProvider,
    private auth: AuthService, 
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
  ) 
  {

    this.platform.ready().then(() => {});
    // this.alarmData = this.loadBuy(this.userData.id);
    if (this.navParams.get('alarmList')) {
      this.detailAlarmData = this.navParams.get('alarmList');
      this.yearAgo.setMonth(this.yearAgo.getMonth() - 12);
    }
  }

  async ionViewDidLoad() {
    // console.log('ionViewDidLoad AlarmTestPage');
    // this.getBuy(this.userData.id);
    this.userData = await this.loadItems();
    // if (this.navParams.get('alarmId')) {
    //   this.detailAlarmData = this.getUserAlarms(this.navParams.get('alarmId')); //이거 detailAlarmData 말고 따로 alarmData 선언해서 써보기
    // }
  }

  ionViewDidEnter() {
      // this.getUserAlarms();
      // this.getUserAlarms(this.userData.email);
      if (this.navParams.get('alarmList')) {
        this.detailAlarmData = this.navParams.get('alarmList');
        this.yearAgo.setMonth(this.yearAgo.getMonth() - 12);
      } else {
        this.getUserAlarms(this.userData.email);
      }
  }
  
  updateCucumber() {
      console.log('Cucumbers new state:' + this.cucumber);
  }

  // public loadItems() {
  //   this.auth.getUserStorage().then(items => {
  //     console.log("토큰 값을 가져 왔는가?" + JSON.stringify(items));
  //     if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver') {
  //       this.userData = {
  //         accessToken: items.accessToken,
  //         id: items.id,
  //         age_range: items.age_range,
  //         birthday: items.birthday,
  //         email: items.email,
  //         gender: items.gender,
  //         nickname: items.nickname,
  //         profile_image: items.profile_image,
  //         thumbnail_image: items.thumbnail_image,
  //         from: items.from,
  //         snsid: items.snsid
  //       };
  //       if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
  //         this.thumb_image = false;
  //       } else {
  //         this.thumb_image = true;
  //       }
  //       //this.chkmission(this.userData.email);
  //     } else {
  //       this.userData = {
  //         accessToken: items.accessToken,
  //         id: items.id,
  //         age_range: items.age_range,
  //         birthday: items.birthday,
  //         email: this.jwtHelper.decodeToken(items).email,
  //         gender: items.gender,
  //         nickname: this.jwtHelper.decodeToken(items).name,
  //         profile_image: items.profile_image,
  //         thumbnail_image: items.thumbnail_image,
  //       };
  //       console.log("여기야" + this.userData);
  //       //this.chkmission(this.userData.email);
  //     }
  //   });
  // }

  ionViewWillEnter() {
    this.skinQnaLoad();
  }

  public skinQnaLoad() {
    this.images.skinQnaLoad().subscribe(data => {
      this.skinQnaData = data;
    });
  }

  // public community_qna_modify() {
  //   let myModal = this.modalCtrl.create(CommunityModifyPage, {
  //     // skinId: skinId,
  //     // mode: "qna"
  //   });
  //   myModal.onDidDismiss(data => {
  //     if(this.detailAlarmData.skinId === this.skinQnaData.id) {
  //       let myModal = this.modalCtrl.create(CommunityModifyPage);
  //       myModal.present();
  //     }
  //   });
  //   myModal.present();
  // }

  public community_qna_modify(skinId) {
    if(this.detailAlarmData.skinId === this.skinQnaData.id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, {
      id: skinId,
      mode: "qna"
    });
    
    myModal.onDidDismiss(data => {
    });
    myModal.present();
  }
  }


  public loadItems() {
    this.authService.getUserStorage().then(items => {
      console.log("토큰 값을 가져 왔는가?" + JSON.stringify(items));
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
          snsid: items.snsid,
          ispush: items.ispush,
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          //this.thumb_image = false;
        } else {
          //this.thumb_image = true;
        }
      } else {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: this.jwtHelper.decodeToken(items).birthday,
          gender: this.jwtHelper.decodeToken(items).gender,
          skincomplaint: this.jwtHelper.decodeToken(items).skincomplaint,
          email: this.jwtHelper.decodeToken(items).email,
          nickname: this.jwtHelper.decodeToken(items).name,
          ispush: this.jwtHelper.decodeToken(items).ispush,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: 'plinic',
        };
        this.authService.getUserImage(this.userData.email).subscribe(items => {
          if (items) {
            this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
            this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
          }
          // (this.userData.ispush) ? this.push_check = true : this.push_check = false;
        });
      }


    });
  }







  buyAlarm() {
    // if (this.alarmData) {
      if(this.userData.email) {
      this.saveAlarmData = {
        // name: this.name,
        email: this.userData.email,
        alertType: "buyAlarm",
        alarmName: "구매 알림",
        // alarmCondition: this.alarmData.alarmCondition,
        alarmCondition: "알람 상태1",
        alarmDesc: "알람 내용1",
        mange: true,
        // createdAt: new Date()
        // zonecode: this.zonecode,
      }
    }
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "알람",
      message: "저장?",
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
            this.auth.alarmBuySave(this.userData.email, this.saveAlarmData).subscribe(data => {
              // if (data) {
              //   let alert2 = this.alertCtrl.create({
              //     cssClass: 'push_alert',
              //     title: '글 작성',
              //     message: "ㅡ.",
                  // buttons: [
                  //   {
                  //     text: '확인',
                  //     handler: () => {
                  //       // this.nav.pop();
                  //       // clearInterval(this.setInter);
                  //       this.viewCtrl.dismiss({
                  //         // page_modify: this.page_modify
                  //       });
                  //     }
                  //   }
                  // ]
              //   });
              //   alert2.present();
              // }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            },
              error => {
                this.showError(JSON.parse(error._body).msg);
              }
              );
          }
        }]
    });
    alert.present();
    // if (this.userData.email) {
    //   console.log(this.userData.email)
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   headers.append('Authorization',
    //     'key=' + "AIzaSyCAcTA318i_SVCMl94e8SFuXHhI5VtXdhU");   //서버키
    //   let option = new RequestOptions({ headers: headers });
    //   let payload = {
    //     "to": this.userData.pushtoken,
    //     "priority": "high",
    //     data: { "mode": "note", "id": this.userData._id },
    //     "notification": {
    //       "title": '뷰티노트 댓글이 작성되었습니다.',
    //       // "body": this.userData.title,
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
  marketingAlarm() {
    // if (this.alarmData) {
      if(this.userData.email) {
      this.saveAlarmData = {
        // name: this.name,
        email: this.userData.email,
        alertType: "marketingAlarm",
        alarmName: "마케팅 알림",
        // alarmCondition: this.alarmData.alarmCondition,
        alarmCondition: "알람 상태2",
        alarmDesc: "알람 내용2",
        mange: true,
        // createdAt: new Date()
        // zonecode: this.zonecode,
      }
    }
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "알람",
      message: "저장?",
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
            this.auth.alarmBuySave(this.userData.email, this.saveAlarmData).subscribe(data => {
              // if (data) {
              //   let alert2 = this.alertCtrl.create({
              //     cssClass: 'push_alert',
              //     title: '글 작성',
              //     message: "ㅡ.",
                  // buttons: [
                  //   {
                  //     text: '확인',
                  //     handler: () => {
                  //       // this.nav.pop();
                  //       // clearInterval(this.setInter);
                  //       this.viewCtrl.dismiss({
                  //         // page_modify: this.page_modify
                  //       });
                  //     }
                  //   }
                  // ]
              //   });
              //   alert2.present();
              // }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            },
              error => {
                this.showError(JSON.parse(error._body).msg);
              }
              );
          }
        }]
    });
    alert.present();
  }
  commentAlarm() {
    // if (this.alarmData) {
      if(this.userData.email) {
      this.saveAlarmData = {
        // name: this.name,
        email: this.userData.email,
        alertType: "commentAlarm",
        alarmName: "댓글 알림",
        // alarmCondition: this.alarmData.alarmCondition,
        alarmCondition: "알람 상태3",
        alarmDesc: "알람 내용3",
        mange: true,
        // createdAt: new Date()
        // zonecode: this.zonecode,
      }
    }
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "알람",
      message: "저장?",
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
            this.auth.alarmBuySave(this.userData.email, this.saveAlarmData).subscribe(data => {
              // if (data) {
              //   let alert2 = this.alertCtrl.create({
              //     cssClass: 'push_alert',
              //     title: '글 작성',
              //     message: "ㅡ.",
                  // buttons: [
                  //   {
                  //     text: '확인',
                  //     handler: () => {
                  //       // this.nav.pop();
                  //       // clearInterval(this.setInter);
                  //       this.viewCtrl.dismiss({
                  //         // page_modify: this.page_modify
                  //       });
                  //     }
                  //   }
                  // ]
              //   });
              //   alert2.present();
              // }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            },
              error => {
                this.showError(JSON.parse(error._body).msg);
              }
              );
          }
        }]
    });
    alert.present();
  }
  challAlarm() {
    // if (this.alarmData) {
      if(this.userData.email) {
      this.saveAlarmData = {
        // name: this.name,
        email: this.userData.email,
        alertType: "challAlarm",
        alarmName: "챌린지 알림",
        // alarmCondition: this.alarmData.alarmCondition,
        alarmCondition: "알람 상태4",
        alarmDesc: "알람 내용4",
        mange: true,
        // createdAt: new Date()
        // zonecode: this.zonecode,
      }
    }
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "알람",
      message: "저장?",
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
            this.auth.alarmBuySave(this.userData.email, this.saveAlarmData).subscribe(data => {
              // if (data) {
              //   let alert2 = this.alertCtrl.create({
              //     cssClass: 'push_alert',
              //     title: '글 작성',
              //     message: "ㅡ.",
                  // buttons: [
                  //   {
                  //     text: '확인',
                  //     handler: () => {
                  //       // this.nav.pop();
                  //       // clearInterval(this.setInter);
                  //       this.viewCtrl.dismiss({
                  //         // page_modify: this.page_modify
                  //       });
                  //     }
                  //   }
                  // ]
              //   });
              //   alert2.present();
              // }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            },
              error => {
                this.showError(JSON.parse(error._body).msg);
              }
              );
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




  // loadBuy(id){
  //   this.authService.getBuy(id).subscribe(items =>{
  //     this.alarmData = items;
  //     console.log(items);
  //   })
  // }



  // getBuy() { 
  //   this.images.getBuy().subscribe(data => {
  //     setTimeout(() => {
  //       this.alarmData = data;
  //     }, 300);
  //   },err=>{
  //     alert("데이터 에러 발생");
  //   })
  // }

  // getBuy(id) { 
  //   this.images.getBuy(id).subscribe(data => {
  //     setTimeout(() => {
  //       this.alarmData = data;
  //     }, 300);
  //   },err=>{
  //     alert("데이터 에러 발생");
  //   })
  // }

  // buyAlarm() {
    
    // if (this.userData.from === 'kakao' || this.userData.from === 'naver' || this.userData.from === 'google') {
    //   this.auth.replySnsSave(this.userData, this.registerReply).subscribe(data => {
    //     if (data !== "") {
    //       let alert2 = this.alertCtrl.create({
    //         cssClass: 'push_alert',
    //         title: '댓글달기',
    //         message: "댓글이 정상적으로 등록되었습니다.",
    //         buttons: [
    //           {
    //             text: '확인',
    //             handler: () => {
    //               this.registerReply.comment = '';
    //               this.textareaResize();
    //               this.update();
    //             }
    //           }
    //         ]
    //       });
    //       alert2.present();
    //     }
    //     // this.nav.push(CareZoneMissionIngPage, { _id: id });
    //   }, error => {
    //     this.showError(JSON.parse(error._body).msg);
    //   });
    // } else {
    //   this.auth.replySave(this.userData, this.registerReply).subscribe(data => {
    //     if (data !== "") {
    //       let alert2 = this.alertCtrl.create({
    //         cssClass: 'push_alert',
    //         title: '댓글달기',
    //         message: "댓글이 정상적으로 등록되었습니다.",
    //         buttons: [
    //           {
    //             text: '확인',
    //             handler: () => {
    //               this.registerReply.comment = '';
    //               this.textareaResize();
    //               this.update();
    //             }
    //           }
    //         ]
    //       });
    //       alert2.present();
    //     }
    //     // this.nav.push(CareZoneMissionIngPage, { _id: id });
    //   }, error => {
    //     this.showError(JSON.parse(error._body).msg);
    //   });
    // }

    // if (this.userData.email) {
    //   console.log(this.userData.email)
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   headers.append('Authorization',
    //     'key=' + "AIzaSyCAcTA318i_SVCMl94e8SFuXHhI5VtXdhU");   //서버키
    //   let option = new RequestOptions({ headers: headers });
    //   let payload = {
    //     "to": this.userData.pushtoken,
    //     "priority": "high",
    //     data: { "mode": "note", "id": this.userData._id },
    //     "notification": {
    //       "title": '뷰티노트 댓글이 작성되었습니다.',
    //       // "body": this.userData.title,
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
  // }

  // getUserAlarms(email) {
  //   this.images.getUserAlarms(email).subscribe(data => {
  //     this.detailAlarmData = data;
  //   })
  // }

  // getUserAlarms(id) { 
  //   this.images.getUserAlarms(id).subscribe(data => {
  //     setTimeout(() => {
  //       this.detailAlarmData = data;
  //     }, 300);
  //   },err=>{
  //     alert("데이터 에러 발생");
  //   })
  // }

  // getUserAlarms(email) {
  //   this.images.getUserAlarms(email).subscribe(data => {
  //     if(data !='') {
  //       this.alarmList = data;
  //     } else {
  //       this.alarmList = null;
  //     }
  //   }, error => {
  //     console.error(error);
  //   })
  // }

  // getAlarmList(email) {
  //   this.auth.getAlarmList(email, 'All').subscribe(data => {
  //     if(data !='') {
  //         this.alarmList = data;
  //     } else {
  //       this.alarmList = null;
  //     }
  //   }, error => {
  //     console.error("주문 배송 정보 가져 오기 실패 : " + error);
  //   })
  // }

  getUserAlarms(writerEmail) {
    this.images.getUserAlarms(writerEmail).subscribe(data => {
      // this.alarmList = data;
      this.detailAlarmData = data;
    })
  }

  // dateConvert(date) {
  //   date = this.getCovertKoreaTime(date);
  //   var month = '';
  //   var day = '';

  //   month = date.substr(5, 2);
  //   day = date.substr(8, 2);

  //   return month + '월' + day + '일';
  // }

  getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset() * 60000).toISOString()
  }

}
