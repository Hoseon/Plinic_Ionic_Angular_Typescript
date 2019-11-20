import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, ModalController, AlertController, Loading, LoadingController, Content, ViewController } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';
import { MyCommunityModifyPage } from '../community/my/my-community-modify/my-community-modify';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import ko from 'date-fns/locale/ko';
import { DOCUMENT } from '@angular/common';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing';
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start';
import { SkinDiagnoseMoisturePage } from '../skin-diagnose-moisture/skin-diagnose-moisture';
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture';
import { SettingPage } from './setting/setting';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing'
import { DeviceConnectSkinIngPage } from '../device-connect-skin-ing/device-connect-skin-ing'
// import { FCM } from '@ionic-native/fcm';





/**
 * Generated class for the MyinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myinfo',
  templateUrl: 'myinfo.html',
})

export class MyinfoPage {


  page = "0";
  skinQnaData: any;
  beautyNoteData: any;
  @ViewChild(Slides) slides: Slides;
  jwtHelper: JwtHelper = new JwtHelper();
  id: any;
  mode: any;
  valueday = { "day": "1" }
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  //문진표
  all_moisture_score: number = 0;
  all_oil_score: number = 0;
  all_first_moisture_score: number = 0;
  all_first_oil_score: number = 0;

  skinScoreData: any;
  circle_moisture: any;
  circle_oil: any;

  pre_circle_moisture: any;
  pre_circle_oil: any;

  chartDateData = [];
  chartOilData = [];
  chartMoistureData = [];
  array1 = [];
  chartDateData2: Array<any>;
  lineChart: any;
  segment_status: boolean;
  segment_moisture: any;

  carezoneData: any;
  missionData: any;
  userData: any;
  nickname: string;
  currentDate: Date = new Date();
  today: any = new Date();
  new: Array<boolean> = new Array<boolean>();
  recruiting: Array<boolean> = new Array<boolean>();
  mdchuchun: Array<boolean> = new Array<boolean>();
  ingmdchuchun: Array<boolean> = new Array<boolean>();
  ingapproaching: Array<boolean> = new Array<boolean>();
  approaching: Array<boolean> = new Array<boolean>();
  endrecruit: Array<boolean> = new Array<boolean>();
  missionCounter: Array<any> = new Array<any>();
  missionCounter2: Array<any> = new Array<any>();
  endcarezoneData: Array<any> = new Array<any>();
  d5: Array<any> = new Array<any>();
  d4: Array<any> = new Array<any>();
  d3: Array<any> = new Array<any>();
  d2: Array<any> = new Array<any>();
  d1: Array<any> = new Array<any>();
  endmission: Array<any> = new Array<any>();
  ingmissionCounter: any;

  thumb_image: any;
  ingBtn: any = false;
  profileimg_url: any;
  imagePath: any;
  from: any;
  origindday: any;
  dday: Array<any> = new Array<any>();


  percent: Array<any> = new Array<any>();


  //mission 정보
  carezone_id: Array<any> = new Array<any>();
  title: Array<any> = new Array<any>();
  maxmember: Array<any> = new Array<any>();
  body: Array<any> = new Array<any>();

  endcarezone_id: Array<any> = new Array<any>();
  endtitle: Array<any> = new Array<any>();
  endmaxmember: Array<any> = new Array<any>();
  endbody: Array<any> = new Array<any>();

  skinbtnYear = format(this.today, 'YYYY');
  skinbtnMonth = format(this.today, 'MM');
  @ViewChild(Content) content: Content;
  communityEditorBeautyLoadData: any;
  skin_diagnose_first_check: boolean;
  loadProgress: number = 0;

  totalusetime: any; //월 사용시간
  allusetime: any; //총 누적 사용시간

  memberRanking: Array<any> = new Array<any>();

  chkUserImage: boolean = false;

  missionHistory: any; //참여자 미션 이력 값
  userUseTime: any; //참여자 미션 이력 값



  // pushToken: any;


  constructor(
    private http: Http,
    // private fcm: FCM,
    public noti: LocalNotifications,
    public nav: NavController, public navParams: NavParams, public platform: Platform, private images: ImagesProvider, public modalCtrl: ModalController, public alertCtrl: AlertController,
    public auth: AuthService, @Inject(DOCUMENT) document, private loadingCtrl: LoadingController, private themeableBrowser: ThemeableBrowser, public viewCtrl: ViewController) {

    this.platform.ready().then((readySource) => {
      this.segment_moisture = "수분";

    });

  }

  test_noti() {

    // this.nav.push(MissionStartPage);

    //20190813 미션 시작이 블루투스 사용하는 기기 사용시간 만큼 축적 시킨다.
    let myModal = this.modalCtrl.create(DeviceConnectIngPage);
    myModal.onDidDismiss(data => {
      let tabs = document.querySelectorAll('.tabbar');
      if (tabs !== null) {
        Object.keys(tabs).map((key) => {
          // tabs[ key ].style.transform = 'translateY(0)';
          tabs[key].style.display = 'block';
          tabs[key].style.display = '';
        });
      } // end if
    })
    myModal.present();
    // this.nav.push(DeviceConnectIngPage);
  }

  // let headers = new Headers();
  // headers.append('Content-Type', 'application/json');
  // headers.append('Authorization',
  //   'key=' + "AIzaSyCAcTA318i_SVCMl94e8SFuXHhI5VtXdhU");   //서버키
  // let option = new RequestOptions({ headers: headers });
  // let payload = {
  //   // "to": this.pushToken,
  //   "to": this.userData.pushtoken,
  //   "priority": "high",
  //   "notification": {
  //     "body": "Plinic Background Message",
  //     "title": "Plinic Title",
  //     // "badge": 1,
  //     "sound": "default",
  //     "click_action": "FCM_PLUGIN_ACTIVITY"
  //   },
  //   //토큰
  // }
  // this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(payload), option)
  //   .map(res => res.json())
  //   .subscribe(data => {
  //     // console.log("dddddddddddddddddddddd=================" + JSON.stringify(data));
  //   });
  // }

  ionViewCanEnter() {

  }

  ionViewDidLoad() {
    this.userData = this.loadItems();
    this.id = this.navParams.get('id');
    this.mode = this.navParams.get('mode');
    setTimeout(() => {
      this.selectedTab(-1);
      this.getchartScore();
      this.getskinScore();
      this.initChart();
    }, 500);
    setTimeout(() => {
      this.selectedTab(0);
    }, 500)
  }

  ionViewWillEnter() {
    if (this.userData) {
      this.auth.getUserImage(this.userData.email).subscribe(items => {
        if (items) {
          this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
          this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
          this.chkUserImage = true;
          this.thumb_image = true;
        }
      });
    }

    //this.showLoading();

    // this.getUserImage(this.userData.email);
    // let tabs = document.querySelectorAll('.tabbar');
    // if (tabs !== null) {
    //   Object.keys(tabs).map((key) => {
    //     //tabs[ key ].style.transform = 'translateY(0)';
    //     tabs[key].style.display = 'none';
    //   });
    // }
  }


  ionViewDidEnter() {
    this.skinQnaLoad();
    this.beautyNoteLoad();
    this.communityEditorBeautyLoad();
    // this.getHistoryMission();
    this.carezoneData = this.roadcareZone();

  }

  public initChart() {

    ////처음 진입시 현재 월로 조회 되도록
    this.skinbtnYear = format(new Date(), 'YYYY');
    this.skinbtnMonth = format(new Date(), 'MM');
    var e = this.skinbtnYear + "년" + this.skinbtnMonth;
    var e2 = this.skinbtnMonth;

    setTimeout(() => {
      this.yearmonthselect(e);
      this.yearmonthselect2(e2);
      this.getAllUseTime();
    }, 500)


    // console.log('ionViewDidLoad SkinChartPage');
    // console.log('all_moisture_score=====================' + this.all_moisture_score);
    document.getElementById("moisture").style.display = "block";
    document.getElementById("oil").style.display = "none";


    this.today = format(this.today, 'DD');

    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {


      type: 'bar',
      data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: this.chartDateData,
        datasets: [
          {
            type: 'line',
            // label: format(this.today, 'MM/DD', '유분'),
            label: '나의 수분 점수',
            fill: false,
            // lineTension: 0,
            backgroundColor: "#808080",
            borderColor: "#808080",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#00C6ED",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#00C6ED",
            pointHoverBorderColor: "#00C6ED",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 20,
            borderWidth: 1,
            data: this.chartMoistureData,
            spanGaps: false,
            // 수분은 하늘이랑 파랑
            // 유분은 노랑이랑 주황!!
            // label: format(this.today, 'MM/DD', '유분'),
          },
          {
            // label: format(this.today, 'MM/DD', '유분'),
            type: 'bar',
            label: '20~30대 평균 수분 점수',
            fill: false,
            lineTension: 0,
            borderWidth: 1,
            backgroundColor: "#726FBD",
            borderColor: "#726FBD",
            // borderCapStyle: 'butt',
            // borderDash: [],
            // borderDashOffset: 0.0,
            // borderJoinStyle: 'miter',
            // pointBorderColor: "#368AFF",
            // pointBackgroundColor: "#fff",
            // pointBorderWidth: 1,
            // pointHoverRadius: 5, //클릭시 원크기
            // pointHoverBackgroundColor: "#368AFF",
            // pointHoverBorderColor: "#368AFF",
            // pointHoverBorderWidth: 2, //데이터 호버크기
            // pointRadius: 3,  //데이터 포인트크기
            // pointHitRadius: 50,
            // data: [this.data1, this.data2, this.data3, this.data4],
            data: [50, 60, 70, 80, 90, 70, 50, 40, 60, 70, 90, 90, 70, 70],
            spanGaps: false,
          },
        ],
      },
      options: {
        animation: {
          duration: 3000 // general animation time
        },
        responsive: true,
        legend: {
          display: false,     //라벨표시
        },
        scales: {
          xAxes: [{
            gridLines: {
              offsetGridLines: false
            },
            barPercentage: 0.4,
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0
            }
          }]
        },
        plugins: {
          labels: {
            render: 'text',
            precision: 0,
            fontSize: 0,
            fontStyle: 'normal',
            textShadow: true,
            showActualPercentages: true
          }
        }
      }
    });

    this.lineCanvas2 = new Chart(this.lineCanvas2.nativeElement, {


      type: 'line',
      data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: this.chartDateData,
        datasets: [{
          // 수분은 하늘이랑 파랑
          // 유분은 노랑이랑 주황!!
          // label: format(this.today, 'MM/DD', '유분'),
          label: '내 유분 점수',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#368AFF",
          borderColor: "#368AFF",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#368AFF",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#368AFF",
          pointHoverBorderColor: "#368AFF",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: this.chartOilData,
          spanGaps: false,
        },
        {
          // label: format(this.today, 'MM/DD', '유분'),
          label: '20대 평균 유분 점수',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#00C6ED",
          borderColor: "#00C6ED",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#00C6ED",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#00C6ED",
          pointHoverBorderColor: "#00C6ED",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: [
            // this.all_moisture_score='' ?  this.all_oil_score+10 : this.all_first_oil_score+10,
            // this.all_moisture_score='' ?  this.all_oil_score+10 : this.all_first_oil_score+10,
          ],
          spanGaps: false,
        }],
      },
      options: {
        animation: {
          duration: 3000 // general animation time
        },
        responsive: true,
        legend: {
          display: false,     //라벨표시
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0
            }
          }]
        },
        // plugins: {
        //     labels: {
        //           render: this.percentage,
        //           precision: 0,
        //           fontSize: 15,
        //           fontStyle: 'normal',
        //           textShadow: true,
        //           showActualPercentages: true
        //       }
        //   }
      }
    });


  }

  public selectclick() {
    // console.log('ionViewDidLoad selectclick');
    this.lineChart.update();
  }




  public setting_page() {
    this.nav.push(SettingPage);
  }

  ngOnInit() {
    // this.slides.autoHeight = true;
    //
    // setInterval(() => {
    //   if (this.loadProgress < 50)
    //     this.loadProgress += 1;
    //   else
    //     clearInterval(this.loadProgress);
    // }, 30);

  }

  ngAfterViewInit() {
    this.slides.autoHeight = true;
  }

  public skin_first_check() {
    this.auth.getUserStoragediagnose_first_check().then(items => {
      this.skin_diagnose_first_check = items;
      // console.log("skin_diagnose_first_check" + this.skin_diagnose_first_check);
      //console.log("items" + items);
    });
  }

  // public skin_measure() {
  //   // let alert = this.alertCtrl.create({
  //   //   cssClass: 'push_alert',
  //   //   title: "plinic",
  //   //   message: "준비중입니다.",
  //   //   buttons: [{
  //   //     text: '확인'
  //   //   }]
  //   // });
  //   // alert.present();
  //   if (this.skin_diagnose_first_check) {
  //     let myModal = this.modalCtrl.create(SkinDiagnoseMoisturePage, { "parentPage": this });
  //     myModal.present();
  //   }
  //   else {
  //     let myModal = this.modalCtrl.create(SkinDiagnoseFirstMoisturePage, { "parentPage": this });
  //     myModal.present();
  //   }
  // }

  public skin_measure() {
    // let alert = this.alertCtrl.create({
    //   cssClass: 'push_alert',
    //   title: "plinic",
    //   message: "준비중입니다.",
    //   buttons: [{
    //     text: '확인'
    //   }]
    // });
    // alert.present();
    // if (this.skin_diagnose_first_check) {
    //   let myModal = this.modalCtrl.create(SkinDiagnoseMoisturePage);
    //   myModal.onDidDismiss(data => {
    //
    //     this.update();
    //   });
    //   myModal.present();
    // }
    // else {
    //   let myModal = this.modalCtrl.create(SkinDiagnoseFirstMoisturePage);
    //   myModal.onDidDismiss(data => {
    //
    //     this.update();
    //   });
    //   myModal.present();
    // }

    let myModal = this.modalCtrl.create(DeviceConnectSkinIngPage);
    myModal.onDidDismiss(data => {
      let tabs = document.querySelectorAll('.tabbar');
      if (tabs !== null) {
        Object.keys(tabs).map((key) => {
          // tabs[ key ].style.transform = 'translateY(0)';
          tabs[key].style.display = 'block';
          tabs[key].style.display = '';
        });
      } // end if
      this.update();
    });
    myModal.present();
  }


  public update() {
    this.nav.setRoot(this.nav.getActive().component).then(() => {
      setTimeout(() => {
        this.segment_moisture = "유분";
        // console.log("유분================" + this.segment_moisture);
      }, 500)
      setTimeout(() => {
        this.segment_moisture = "수분";
        // console.log("수분================" + this.segment_moisture);
      }, 500)
    });
  }

  public reload() {
    window.location.reload(true);
  }

  public communityEditorBeautyLoad() {
    this.images.communityEditorBeautyLoad().subscribe(data => {
      this.communityEditorBeautyLoadData = data;
    });
  }

  public mission_start(carezoneData) {
    //console.log(id);
    //console.log("missiondata" + this.missionData.missionID);

    console.log(this.missionHistory);

    if (this.missionData === null || this.missionData === undefined) {
      //this.nav.push(CareZoneMissionIngPage);
      this.nav.push(CareZoneMissionStartPage, { carezoeId: carezoneData });
    } else if (carezoneData === this.missionData[0].missionID) {
      this.nav.push(CareZoneMissionIngPage, { carezoeId: carezoneData });

    } else {
      this.nav.push(CareZoneMissionStartPage, { carezoeId: carezoneData });
    }
  }

  public diffdate(date1: Date = new Date(), date2: Date = new Date()) {
    return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
  }

  public roadcareZone() {
    //this.showLoading();
    this.images.carezoneRoad().subscribe(data => {

      if (data !== '') {
        for (let i = 0; i < data.length; i++) {

          // if (new Date(data[i].endmission) > this.currentDate) {
          // console.log("날짜 계산 하자");

          this.endcarezone_id[i] = data[i]._id;
          this.title[i] = data[i].title;
          this.maxmember[i] = data[i].maxmember;
          this.body[i] = data[i].body;



          this.images.missionCount(data[i]._id).subscribe(data2 => {
            this.missionCounter[i] = data2;
          });
          data[i].startmission = new Date(data[i].startmission);
          this.endmission[i] = new Date(data[i].endmission);
          // console.log("end Date : " + data[i].endmission);
          this.new[i] = false;
          this.recruiting[i] = false;
          this.mdchuchun[i] = false;
          this.approaching[i] = false;
          this.endrecruit[i] = false;
          this.d5[i] = false;
          this.d4[i] = false;
          this.d3[i] = false;
          this.d2[i] = false;
          this.d1[i] = false;

          // this.endmission[i] = false;
          // this.dday = this.diffdate(this.currentDate, data[i].startmission);
          // this.dday = parseFloat(this.dday);
          //console.log(this.dday);
          if (this.diffdate(this.currentDate, data[i].startmission) < -10) {
            this.origindday = this.diffdate(this.currentDate, data[i].startmission);
            this.dday[i] = (parseInt(this.origindday) + 2);
            this.new[i] = true;
            this.recruiting[i] = true;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
            this.d5[i] = true;
          } else if (this.diffdate(this.currentDate, data[i].startmission) < -7) {
            this.origindday = this.diffdate(this.currentDate, data[i].startmission);
            this.dday[i] = (parseInt(this.origindday) + 2);
            this.new[i] = false;
            this.recruiting[i] = true;
            this.mdchuchun[i] = true;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
            this.d5[i] = true;
          } else if (this.diffdate(this.currentDate, data[i].startmission) > -6 && this.diffdate(this.currentDate, data[i].startmission) < -5) {
            this.origindday = this.diffdate(this.currentDate, data[i].startmission);
            this.dday[i] = (parseInt(this.origindday) + 2);
            this.new[i] = false;
            this.recruiting[i] = false;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
            this.d5[i] = true;
          } else if (this.diffdate(this.currentDate, data[i].startmission) > -5 && this.diffdate(this.currentDate, data[i].startmission) < -4) {
            this.origindday = this.diffdate(this.currentDate, data[i].startmission);
            this.dday[i] = (parseInt(this.origindday) + 2);
            this.new[i] = false;
            this.recruiting[i] = false;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
            this.d4[i] = true;
            this.d3[i] = false;
            this.d2[i] = false;
            this.d1[i] = false;
          } else if (this.diffdate(this.currentDate, data[i].startmission) > -4 && this.diffdate(this.currentDate, data[i].startmission) < -3) {
            this.origindday = this.diffdate(this.currentDate, data[i].startmission);
            this.dday[i] = (parseInt(this.origindday) + 2);
            this.new[i] = false;
            this.recruiting[i] = false;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
            this.d3[i] = true;
            this.d2[i] = false;
            this.d1[i] = false;
          } else if (this.diffdate(this.currentDate, data[i].startmission) > -3 && this.diffdate(this.currentDate, data[i].startmission) < -2) {
            // this.origindday = this.diffdate(this.currentDate, data[i].startmission);
            // this.dday[i] = parseFloat(this.origindday);
            this.new[i] = false;
            this.recruiting[i] = false;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
            this.d3[i] = false;
            this.d2[i] = true;
            this.d1[i] = false;
            this.images.missionCount(data[i]._id).subscribe(data2 => {
              this.missionCounter2[i] = data2;
              this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
              //console.log(this.percent[i])

              if (this.percent[i] <= 50) {
                this.ingmdchuchun[i] = true;
                this.ingapproaching[i] = false;
              }
              if (this.percent[i] > 50) {
                this.ingmdchuchun[i] = false;
                this.ingapproaching[i] = true;
              }
            });
          } else if (this.diffdate(this.currentDate, data[i].startmission) > -2 && this.diffdate(this.currentDate, data[i].startmission) < -1) {
            //console.log("D-111111111");
            this.new[i] = false;
            this.recruiting[i] = false;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
            this.d3[i] = false;
            this.d2[i] = false;
            this.d1[i] = true;
            this.images.missionCount(data[i]._id).subscribe(data2 => {
              this.missionCounter2[i] = data2;
              //console.log("최대인원 백분율 구하기 : " + parseInt(data[i].maxmember));
              //console.log("참여인원 백분율 구하기 : " + parseInt(this.missionCounter[i]));
              this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
              //console.log(this.percent[i])

              if (this.percent[i] <= 50) {
                //console.log("MD추천");
                this.ingmdchuchun[i] = true;
                this.ingapproaching[i] = false;
              }
              if (this.percent[i] > 50) {
                //console.log("마감임박");
                this.ingmdchuchun[i] = false;
                this.ingapproaching[i] = true;
              }
            });
          } else if (this.diffdate(this.currentDate, data[i].startmission) > -3 && this.diffdate(this.currentDate, data[i].startmission) <= 0) {
            // console.log("모집중 ");
            this.d1[i] = true;
            this.images.missionCount(data[i]._id).subscribe(data2 => {
              this.missionCounter2[i] = data2;
              // console.log("최대인원 백분율 구하기 : " + parseInt(data[i].maxmember));
              // console.log("참여인원 백분율 구하기 : " + parseInt(this.missionCounter[i]));
              this.percent[i] = (parseInt(this.missionCounter2[i]) / parseInt(data[i].maxmember) * 100)
              // console.log(this.percent[i])

              if (this.percent[i] <= 50) {
                // console.log("MD추천");
                this.ingmdchuchun[i] = true;
                this.ingapproaching[i] = false;
              }
              if (this.percent[i] > 50) {
                // console.log("마감임박");
                this.ingmdchuchun[i] = false;
                this.ingapproaching[i] = true;
              }
            });

          } else if (this.diffdate(this.currentDate, data[i].startmission) >= 0) {
            // console.log("진행중 + 모집마감 ");
            this.new[i] = false;
            this.recruiting[i] = false;
            this.mdchuchun[i] = false;
            this.approaching[i] = true;
            this.endrecruit[i] = true;
          } else {
            this.new[i] = false;
            this.recruiting[i] = true;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
          }

          this.endcarezoneData = data[i];
        }
        this.carezoneData = data;
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }
    });

  }

  //20190617 미션 참여중인지 체크 하기
  public chkmission(email) {
    // this.showLoading();
    //console.log("chkBtn" + this.chkBtn);
    this.images.chkMission(email).subscribe(data => {

      if (data !== '' || data !== null) {
        //this.chkBtn = true;
        this.missionData = data;
        console.log(this.missionData);
        //this.endDate = data.endmission.substr(0, 10);
        //console.log(JSON.stringify(data));
        // this.loading.dismiss();
      } else if (data === '' || data === null || data === undefined) {
        //this.chkBtn = false;
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }
    });

  }

  //20190618 진행 중인 미션 체크 하기
  public chkIngmission(email) {
    // this.showLoading();
    //console.log("chkBtn" + this.chkBtn);




    this.images.chkMission(email).subscribe(data => {

      if (data !== null) {
        //this.chkBtn = true;
        this.missionData = data;
        // console.log("미션데이터 : " + JSON.stringify(this.missionData));
        // console.log("미션데이터 : " + this.missionData.missionID);
        // this.images.missionCount(this.missionData.missionID).subscribe(data2 => {
        //   this.ingmissionCounter = data2;
        // });
        this.ingBtn = true;
        //this.endDate = data.endmission.substr(0, 10);
        //console.log(JSON.stringify(data));
        // this.loading.dismiss();
      } else if (data === '' || data === null || data === undefined) {
        this.ingBtn = false;
        //this.chkBtn = false;
      } else {
        this.ingBtn = false;
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }
    });
  }

  public community_qna_modify(id) {
    this.nav.push(MyCommunityModifyPage, { id: id, mode: 'qna' });
  }
  public community_modify(id) {
    this.nav.push(MyCommunityModifyPage, { id: id, mode: 'qna' });

  }


  selectedTab(tab) {
    this.slides.slideTo(tab);

    // console.log('  this.slides.slideTo(tab)===================' + this.slides.slideTo(tab));
  }


  slideChanged($event) {
    //this.showLoading();
    //this.content.scrollToTop();
    this.page = $event._snapIndex.toString();
    // console.log(this.page);

    if (this.page !== '0' && this.page !== '1' && this.page !== '2') {
      setTimeout(() => {
        this.slides.slideTo(0, 0);
      }, 100)
    }
  }


  public beautyNoteLoad() {
    this.images.beautyNoteLoad().subscribe(data => {
      this.beautyNoteData = data;
    });
  }

  public skinQnaLoad() {
    this.images.skinQnaLoad().subscribe(data => {
      this.skinQnaData = data;
    });
  }

  onChange(e) {
    // console.log("e=============" + e);
  }
  segmentChanged(ev: any) {
    // console.log("ev==============" + ev);
    if (ev.value === '수분') {
      this.segment_status = true;
      this.segment_moisture = ev.value;
      document.getElementById("moisture").style.display = "block";
      document.getElementById("moisture").style.display = "";
      document.getElementById("oil").style.display = "none";
    }
    else {
      this.segment_status = false;
      this.segment_moisture = ev.value;
      document.getElementById("oil").style.display = "block";
      document.getElementById("oil").style.display = "";
      document.getElementById("moisture").style.display = "none";
    }
  }
  yearmonthselect(e) {
    var year = e.substr(0, 4);
    var month = e.substr(5, 2);
    // month = (month < 10) ? "0" + month : month.toString();
    var date = year + "-" + month;
    this.chartDateData = [];
    this.chartOilData = [];
    this.chartMoistureData = [];
    if (this.skinScoreData) {
      for (let i = 0; i < this.skinScoreData.score.length; i++) {
        if (this.skinScoreData.score[i].saveDate.indexOf(date) !== -1) {
          this.chartDateData.push(this.skinScoreData.score[i].saveDate.substr(5, 5));
          this.chartOilData.push(this.skinScoreData.score[i].oil);
          this.chartMoistureData.push(this.skinScoreData.score[i].moisture);
        }
      }
    }
    if (this.chartDateData.length > 0) {
      this.lineCanvas.data.labels = this.chartDateData;
      this.lineCanvas2.data.labels = this.chartDateData;
      this.lineCanvas.data.datasets[0].data = this.chartMoistureData;
      this.lineCanvas2.data.datasets[0].data = this.chartOilData;
      this.lineCanvas.update();
      this.lineCanvas2.update();

      // console.log(this.chartDateData);
      // console.log(this.chartMoistureData);
      // console.log(this.chartOilData);
    } else {
      // this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
    }
  }

  yearmonthselect2(e) {
    var year = format(new Date(), 'YYYY');
    var month = e.substr(0, 2);
    var date = year + "-" + month;
    // this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
    this.auth.getChartScore(this.userData.email, date).subscribe(items => {
      if (items.length > 0) {
        // this.update();
        this.totalusetime = this.getSecondsAsDigitalClock(items[0].sum);
        this.loadProgress = (Number(items[0].sum) / 16200) * 100;
      }
      else {
        this.totalusetime = false;
        // this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
      }
    });

    this.auth.getRankTotalUseTime(date).subscribe(items => {
      if (items.length > 0) {
        // this.update();
        this.memberRanking = new Array<any>();
        // console.log(JSON.stringify(items));
        for (let i = 0; i < items.length; i++) {
          this.memberRanking[i] = {
            email: items[i]._id,
            sum: items[i].sum,
            rank: i + 1
          }
        }
        // console.log(this.memberRanking);
      }
      else {
        // this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
      }
    });


  }




  public loadItems() {
    this.auth.getUserStorage().then(items => {
      // console.log("토큰 값을 가져 왔는가?" + JSON.stringify(items));
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
          pushtoken: items.pushtoken,
          from: items.from,
          totaluseitme: items.totalusetime
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
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          pushtoken: this.jwtHelper.decodeToken(items).pushtoken,
          from: 'plinic',
          totaluseitme: items.totalusetime
        };
        // console.log("그냥 유저 데이터는?? ??? ???  " + JSON.stringify(this.userData));
        // console.log("프로필 이미지를 가져 오는 시점은?");
        if (this.userData) {
          this.auth.getUserImage(this.userData.email).subscribe(items => {
            if (items) {
              this.thumb_image = items
              this.chkUserImage = true;
              this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
              this.profileimg_url = this.profileimg_url.concat(items.filename + "?random+\=" + Math.random());
            }
          });
        }

        if (this.userData) {
          this.auth.getHistoryMission(this.userData.email).subscribe(data => {
            this.missionHistory = data;
          });
        }

        if (this.userData) {
          this.chkmission(this.userData.email);
        }
      }

      //20191029 사용자의 플리닉 총 사용 시간을 가져 온다 (챌린지 사용시간만 가져 오는게 아니라 챌린지를 안했을때도 수집해오는 총 시간을 말함)
      this.auth.getUseTotalTime(this.userData.email).subscribe(usetime => {
        if (usetime) {
          this.userUseTime = this.getSecondsAsDigitalClock(usetime);
        }
      })

      // this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      // this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });



  }

  getchartScore() {
    if (this.userData !== '') {
      this.auth.getChartScore(this.userData.email, format(new Date(), 'YYYY') + '-' + format(new Date(), 'MM')).subscribe(items => {
      })
    }
  }

  getskinScore() {
    if (this.userData !== '') {
      this.auth.getSkinScore(this.userData.email).subscribe(items => {
        this.skinScoreData = items;
        // console.log("this.skinScoreData " + JSON.stringify(this.skinScoreData));
        // let array1 = [];
        for (let i = 0; i < items.score.length; i++) {
          // this.chartDateData.push({date : items.score[i].saveDate.substr(0,10) });
          // this.chartOilData.push({oil : items.score[i].oil});
          // this.chartMoistureData.push({moisture : items.score[i].moisture});

          // this.chartDateData2.push({date : items.score[i].saveDate.substr(0,10) });
          this.chartDateData.push(items.score[i].saveDate.substr(0, 10));
          this.chartOilData.push(items.score[i].oil);
          this.chartMoistureData.push(items.score[i].moisture);
          // console.log(this.chartDateData);
          // console.log(this.chartOilData);
          // console.log(this.chartMoistureData);
        }

        // console.log(this.array1);

        if (items !== '') {
          var i = (parseInt(this.skinScoreData.score.length) - 1);
          // console.log("ii" + i);
          var k = (parseInt(this.skinScoreData.score.length) - 2);
          // console.log("kk" + i);

          if (i >= 0) {
            this.circle_moisture = this.skinScoreData.score[i].moisture;
            this.circle_oil = this.skinScoreData.score[i].oil;
          }
          if (k >= 0) {
            this.pre_circle_moisture = this.skinScoreData.score[k].moisture;
            this.pre_circle_oil = this.skinScoreData.score[k].oil;
          }
          // console.log("this.circle_moisture" + this.circle_moisture);

          // console.log("moisture:::::::" + this.skinScoreData.score[i].moisture);
          // console.log("oil:::::::" + this.skinScoreData.score[i].oil);
          // console.log("oil:::::::" + (parseInt(this.skinScoreData.score.length) - 1));
        }
      });
    }
  }

  openBrowser_ios(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/

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
      customButtons: [
        {
          wwwImage: 'assets/img/like/like.png',
          imagePressed: 'assets/img/like/dislike.png',
          align: 'right',
          event: 'sharePressed'
        }
      ],
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
      // console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    })


  }


  openBrowser_android(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/

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
      customButtons: [
        {
          wwwImage: 'assets/img/like/like.png',
          imagePressed: 'assets/img/like/dislike.png',
          align: 'right',
          event: 'sharePressed'
        }
      ],
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
      // console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    })

  }



  showLoading() {
    if (this.platform.is("ios")) {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        duration: 500,
        cssClass: 'sk-rotating-plane_ios'
      });
      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 3000);
    } else {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        duration: 500,
        cssClass: 'sk-rotating-plane'
      });
      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 3000);
    }
  }

  testFunction() {
    // console.log("호출되었음");
    this.skinQnaLoad();
    this.beautyNoteLoad();
    this.communityEditorBeautyLoad();
    this.carezoneData = this.roadcareZone();
    this.lineCanvas.update();
    this.lineCanvas2.update();
    // this.lineChart.update();
    // console.log("호출끝났음");

  }

  monthdate: any[] = [
    {
      "day": "2019년01월"
    },
    {
      "day": "2019년02월"
    },
    {
      "day": "2019년03월"
    },
    {
      "day": "2019년04월"
    },
    {
      "day": "2019년05월"
    },
    {
      "day": "2019년06월"
    },
    {
      "day": "2019년07월"
    },
    {
      "day": "2019년08월"
    },
    {
      "day": "2019년09월"
    },
    {
      "day": "2019년10월"
    },
    {
      "day": "2019년11월"
    },
    {
      "day": "2019년12월"
    }
  ];

  monthdate2: any[] = [
    {
      "day": "01월"
    },
    {
      "day": "02월"
    },
    {
      "day": "03월"
    },
    {
      "day": "04월"
    },
    {
      "day": "05월"
    },
    {
      "day": "06월"
    },
    {
      "day": "07월"
    },
    {
      "day": "08월"
    },
    {
      "day": "09월"
    },
    {
      "day": "10월"
    },
    {
      "day": "11월"
    },
    {
      "day": "12월"
    }]


  showAlert(text) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
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

  getSecondsAsDigitalClock(inputSeconds: number) {  // 분까지만 표시 하기 위한 함수
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
  }



  //20190905 사용자의 플리닉 블루투스 총 사용 시간
  getAllUseTime() {
    this.auth.getChartAllScore(this.userData.email).subscribe(items => {
      if (items.length > 0) {
        this.allusetime = this.getSecondsAsDigitalClock(items[0].sum)
      }
    });
  }

  //20190919 추호선 사용자 이미지 정보가 있는지 없는지 체크 한다.
  public getUserImage(email) {
    this.auth.getUserImage(email).subscribe(items => {
      if (items) {
        this.chkUserImage = true;
      }
    });
  }

  public getHistoryMission() {
    if (this.userData.email !== '') {
      this.auth.getHistoryMission(this.userData.email).subscribe(data => {
        // console.log("미션 이력은 잘 가져 왔는가?" + JSON.stringify(data));
      });
    }
  }

}
