import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service';
import { MyinfoPage } from '../myinfo/myinfo'

/**
 * Generated class for the ChulsukCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chulsuk-check',
  templateUrl: 'chulsuk-check.html',
})
export class ChulsukCheckPage {
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  // loadCalendar : Array<any> = new Array<any>();
  loadCalendar : any;
  eventSource;
  viewTitle;
  chkbtn: boolean = false;
  totaluserpoint: any = 0;
  isnullData: boolean = false;
  loading: Loading;


  calendar = {
    mode: 'month',
    currendDate: new Date(),
    dateFormatter: {
        formatMonthViewDay: function(date:Date) {
            return date.getDate().toString();
        },
        formatMonthViewDayHeader: function(date:Date) {
            return 'MonMH';
        },
        formatMonthViewTitle: function(date:Date) {
            return 'testMT';
        },
        formatWeekViewDayHeader: function(date:Date) {
            return 'MonWH';
        },
        formatWeekViewTitle: function(date:Date) {
            return 'testWT';
        },
        formatWeekViewHourColumn: function(date:Date) {
            return 'testWH';
        },
        formatDayViewHourColumn: function(date:Date) {
            return 'testDH';
        },
        formatDayViewTitle: function(date:Date) {
            return 'testDT';
        }
      }
  };



  constructor(private loadingCtrl: LoadingController, private nav: NavController, private alertCtrl: AlertController, private auth: AuthService, public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    // this.loadEvents();
  }

  ionViewCanEnter(){
    console.log('ionViewCanEnter ChulsukCheckPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChulsukCheckPage');
    this.loadItems();
  }

  ionViewDidEnter() { 
    console.log('ionViewDidEnter ChulsukCheckPage');
    this.loadEvents();
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave ChulsukCheckPage');
  }

  onEventSelected(event) {
    // console.log("Event selected:" + event.startTime + '-' + event.endTime + '-' + event.title);
  }

  onTimeSelected(ev) {
    // console.log('Selected Time:' + ev.selectedTime + ', hasEvents: ' + 
    //   (ev.events !== undefined && ev.events.length !==0) + ', disabled :' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
    // console.log('current date chage: ' + event);
  }

  onRangeChaged(ev) {
    // console.log('range chaged: startTime: ' + ev.startTime + ', endTime : ' + ev.endTime);
  }

  onViewTitleChanged(ev) {
    console.log('onViewTitleChanged :' + ev);
    this.viewTitle = ev;
  }

  loadEvents() {
    this.eventSource = this.loadChulSuk();
  }


  loadChulSuk() { //???????????? ?????? ?????? ????????? ?????? ??????.
    var events = [];
    if(!this.isnullData){
      for (var i = 0; i < this.loadCalendar.length; i++) {
          // var date = new Date();
          // var eventType = Math.floor(Math.random() * 2);
          // var startDay = Math.floor(Math.random() * 90) - 45;
          // var endDay = Math.floor(Math.random() * 2) + startDay;
          var startTime;
          var endTime;
          // if (eventType === 0) {
          //     startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
          //     if (endDay === startDay) {
          //         endDay += 1;
          //     }
          //     endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
          //     events.push({
          //         title: 'All Day - ' + i,
          //         startTime: startTime,
          //         endTime: endTime,
          //         allDay: true
          //     });
          // } else {
              // var startMinute = Math.floor(Math.random() * 24 * 60);
              // console.log("startMinute : " + startMinute);
              // var endMinute = Math.floor(Math.random() * 180) + startMinute;
              // console.log("endMinute : " + endMinute);
              var currentDate = new Date(this.loadCalendar[i].updatedAt); //---------DB?????? ????????? ???????????? ??????
              currentDate.setDate( currentDate.getDate());

              startTime = currentDate;
              endTime = currentDate;
              events.push({  //????????? ???????????? ???????????? event????????? ?????? ????????? ?????? ??????.
                  title: '???????????? ' + new Date().toISOString().substr(0, 10),
                  startTime: startTime,
                  endTime: endTime,
                  allDay: false
              });
          // }
      }
    }
    return events;
  }

  loadChulSukCalendar (email) {
    //???????????? ?????? ?????? ???????????? ?????? ??????.
    this.auth.loadChulSuk(email).subscribe(data=> {
      if(!data) {
        this.isnullData = true;
      }
      if(data) {
        this.isnullData = false;
        this.loadCalendar = data;
        console.log("?????? ????????? ????????? : " + JSON.stringify(this.loadCalendar));
        this.eventSource = this.loadChulSuk();
        console.log(this.eventSource);
        this.chkChulSukButton();
      }
    })
  }

    // public chulsukSave() {
    //   var chulcheck = {
    //     ischulsuk : true,
    //     updatedAt : new Date()
    //   }
    //   return new Promise((resolve, reject)=>{
    //     resolve(
    //       this.auth.chulSukUpdate(this.userData.email, chulcheck).subscribe(data => {
    //         this.showAlert(JSON.stringify(data.msg).replace('"', ''));
    //         this.loadChulSukCalendar(this.userData.email);
    //       }, error => {
    //         this.showAlert(JSON.parse(error._body).msg);
    //       }));
    //   })
    // }

    //?????? ?????? ?????? ??????
    public async saveToday() {
      this.showLoading();
      var chulcheck = {
        ischulsuk : true,
        updatedAt : new Date()
      }

      if(this.userData.from === 'naver' || this.userData.from === 'kakao' || this.userData.from === 'google') { //sns???????????? ??????
        await this.auth.plinicShopAddPoint(this.userData.snsid, 10, '????????????').subscribe(data2 => {
          console.log("???????????? ????????? ?????? : " + data2);
          this.loading.dismiss();
        }, error => {
          this.loading.dismiss();
          console.log("???????????? ????????? ?????? ?????? ?????? : " + error);
        });
        await this.auth.chulSukUpdate(this.userData.email, chulcheck).subscribe(data => {
          this.loading.dismiss();
          this.showAlert(JSON.stringify(data.msg).replace('"', '').replace('"', ''));
          this.loadChulSukCalendar(this.userData.email);
        }, error => {
          this.loading.dismiss();
          this.showAlert(JSON.parse(error._body).msg);

        });
      } else {
        await this.auth.plinicShopAddPoint(this.userData.email, 10, '????????????').subscribe(data2 => {
          console.log("???????????? ????????? ?????? : " + data2);
          this.loading.dismiss();
        }, error => {
          this.loading.dismiss();
          console.log("???????????? ????????? ?????? ?????? ?????? : " + error);
        });
        await this.auth.chulSukUpdate(this.userData.email, chulcheck).subscribe(data => {
          this.loading.dismiss();
          this.showAlert(JSON.stringify(data.msg).replace('"', '').replace('"', ''));
          this.loadChulSukCalendar(this.userData.email);
        }, error => {
          this.loading.dismiss();
          this.showAlert(JSON.parse(error._body).msg);
        });
      }
      
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
          this.loadChulSukCalendar(this.userData.email);
          this.reloadUserPoint(this.userData.snsid);
          // this.chkmission(this.userData.email); 2020-02-10 ????????? ????????? ???????????? ?????? ??????
          // this.challengeChkMission(this.userData.email);
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
          this.loadChulSukCalendar(this.userData.email);
          this.reloadUserPoint(this.userData.email);
          // this.chkmission(this.userData.email); 2020-02-10 ????????? ????????? ???????????? ?????? ??????
          // this.chkUserImage(this.userData.email);
        }
      });
    }

    showAlert(message) {
      // this.runTimer = false;
      let alert = this.alertCtrl.create({
        cssClass: 'push_alert',
        // title: title,
        message: message,
        buttons: [{
          text: '??????',
          handler: () => {
            if(this.userData) {
              if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
                this.reloadUserPoint(this.userData.snsid);
              }
              else {
                this.reloadUserPoint(this.userData.email);
              }
            }
          }
        }]
      });
        alert.present();
    }

    chkChulSukButton() { //?????? ?????? ?????? ???????????? ?????? 2020-02-17
      for(let i = 0; i < this.loadCalendar.length; i++) {
        if(this.getCovertKoreaTime(this.loadCalendar[i].updatedAt).substr(0,10) == this.getCovertKoreaTime(new Date()).substr(0,10)){
          this.chkbtn = true;
        }
      }
    }

    addComma(data_value) { //?????? ????????? ?????? ?????? ?????????
      return Number(data_value).toLocaleString('en');
    }

    private reloadUserPoint(email) {
      this.auth.reloadUserPointfromPlincShop(email).subscribe(data =>{
        this.totaluserpoint = data.point;
        this.totaluserpoint = this.addComma(this.totaluserpoint);
      });
    }
    public myinfo() {
      this.nav.push(MyinfoPage);
    }

    showLoading() {
      this.loading = this.loadingCtrl.create({
        content: '??????????????????'
      });
      this.loading.present();
    }

    getCovertKoreaTime(time) {
      return new Date(new Date(time).getTime() - new Date().getTimezoneOffset()*60000).toISOString()
    }

    close() {
      this.navCtrl.pop();
    }

}
