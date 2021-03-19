import {
  Component,
  ViewChild,
  Inject
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  AlertController,
  ModalController,
  Slides
} from 'ionic-angular';
import {
  Chart
} from 'chart.js';
import {
  format
} from 'date-fns';
import 'chartjs-plugin-labels';
import ko from 'date-fns/locale/ko';
import {
  DOCUMENT
} from '@angular/common';
import {
  AuthService
} from '../../providers/auth-service';
import {
  SkinGuidePage
} from '../skin-guide/skin-guide';
import {
  AuthHttp,
  AuthModule,
  JwtHelper,
  tokenNotExpired
} from 'angular2-jwt';
import {
  DeviceConnectSkinIngPage
} from '../device-connect-skin-ing/device-connect-skin-ing'
import { MyinfoPage } from '../myinfo/myinfo';


/**
 * Generated class for the SkinChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-chart',
  templateUrl: 'skin-chart.html',
})
export class SkinChartPage {

  page = "0";


  // @ViewChild('doughnutCanvas') doughnutCanvas;
  // @ViewChild('doughnutCanvas2') doughnutCanvas2;
  @ViewChild(Slides) slides: Slides;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;

  lineChart: any;
  //chart

  valueday = {
    "day": "1"
  }


  today: any = new Date();


  skinbtnYear = format(this.today, 'YYYY');
  skinbtnMonth = format(this.today, 'MM');

  segment_status: any;
  segment_moisture: any;


  //문진표
  all_moisture_score: number = 0;
  all_oil_score: number = 0;
  all_first_moisture_score: number = 0;
  all_first_oil_score: number = 0;
  skin_diagnose_first_check: boolean;

  userData: any;
  skinScoreData: any;
  circle_moisture: any;
  circle_oil: any;

  pre_circle_moisture: any;
  pre_circle_oil: any;
  jwtHelper: JwtHelper = new JwtHelper();

  chartDateData = [];
  chartOilData = [];
  chartMoistureData = [];
  array1 = [];
  chartDateData2: Array < any > ;
  totaluserPoint: any = 0;




  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public platform: Platform, @Inject(DOCUMENT) document, public auth: AuthService, public alertCtrl: AlertController) {
    this.segment_moisture = "수분"

  }

  async ionViewDidLoad() {
    await this.loadItems();
    

    setTimeout(() => {
      // this.selectedTab(-1);
      this.getchartScore();
      this.getskinScore();
      this.initChart();
    }, 500);
    setTimeout(() => {
      // this.selectedTab(0);
    }, 500);


    // this.skin_first_check();
    // this.skin_first_moisture_score();
    // this.skin_first_oil_score();
    // this.skin_oil_score();
    
  }

  ionViewDidEnter() {
    //this.skin_moisture_score();
    // console.log('ionViewDidLoad SkinChartPage');
    // console.log('all_moisture_score=====================' + this.all_moisture_score);
    if (this.skinScoreData) {

    }

  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        // tabs[ key ].style.transform = 'translateY(0)';
        tabs[key].style.display = 'block';
        tabs[key].style.display = '';
      });
    }
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
            label: '20대 평균 수분 점수',
            fill: false,
            // lineTension: 0,
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
            pointHitRadius: 20,
            data: this.chartMoistureData,
            spanGaps: false,
            // 수분은 하늘이랑 파랑
            // 유분은 노랑이랑 주황!!
            // label: format(this.today, 'MM/DD', '유분'),
          },
          {
            // label: format(this.today, 'MM/DD', '유분'),
            type: 'bar',
            label: '내 수분 점수',
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFA0D0",
            borderColor: "#FFA0D0",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#368AFF",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5, //클릭시 원크기
            pointHoverBackgroundColor: "#368AFF",
            pointHoverBorderColor: "#368AFF",
            pointHoverBorderWidth: 2, //데이터 호버크기
            pointRadius: 3,  //데이터 포인트크기
            pointHitRadius: 100,
            // data: this.chartMoistureData,
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


      type: 'bar',
      data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: this.chartDateData,
        datasets: [
          {
            type: 'line',
            // label: format(this.today, 'MM/DD', '유분'),
            label: '20대 평균 수분 점수',
            fill: false,
            // lineTension: 0,
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
            pointHitRadius: 20,
            data: this.chartOilData,
            spanGaps: false,
            // 수분은 하늘이랑 파랑
            // 유분은 노랑이랑 주황!!
            // label: format(this.today, 'MM/DD', '유분'),
          },
          {
            // label: format(this.today, 'MM/DD', '유분'),
            type: 'bar',
            label: '내 수분 점수',
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFA0D0",
            borderColor: "#FFA0D0",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#368AFF",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5, //클릭시 원크기
            pointHoverBackgroundColor: "#368AFF",
            pointHoverBorderColor: "#368AFF",
            pointHoverBorderWidth: 2, //데이터 호버크기
            pointRadius: 3,  //데이터 포인트크기
            pointHitRadius: 100,
            // data: this.chartMoistureData,
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


  }

  public skin_first_check() {
    this.auth.getUserStoragediagnose_first_check().then(items => {
      this.skin_diagnose_first_check = items;
      console.log("skin_diagnose_first_check" + this.skin_diagnose_first_check);
      //console.log("items" + items);
    });
  }

  public skin_moisture_score() {
    this.auth.getUserStoragediagnose_moisture().then(items => {
      // this.all_moisture_score = items;
      // console.log("all_moisture_score" + this.all_moisture_score);
      //console.log("items" + items);
    });
  }

  public skin_oil_score() {
    this.auth.getUserStoragediagnose_oil().then(items => {
      // this.all_oil_score = items;
      // console.log("all_oil_score" + this.all_oil_score);
      //console.log("items" + items);
    });
  }

  public skin_first_moisture_score() {
    this.auth.getUserStoragediagnose_first_moisture().then(items => {
      // this.all_first_moisture_score = items;
      // console.log("all_first_moisture_score" + this.all_first_moisture_score);
      //console.log("items" + items);
    });
  }

  public skin_first_oil_score() {
    this.auth.getUserStoragediagnose_first_oil().then(items => {
      // this.all_first_oil_score = items;
      // console.log("all_first_oil_score" + this.all_first_oil_score);
      //console.log("items" + items);
    });
  }

  yearmonthselect(e) {
    var year = e.substr(0, 4);
    var month = e.substr(5, 2);
    var date = year + "-" + month;
    console.log(this.skinScoreData);
    this.chartDateData = [];
    this.chartOilData = [];
    this.chartMoistureData = [];
    for (let i = 0; i < this.skinScoreData.score.length; i++) {
      if (this.skinScoreData.score[i].saveDate.indexOf(date) !== -1) {
        this.chartDateData.push(this.skinScoreData.score[i].saveDate.substr(5, 5));
        this.chartOilData.push(this.skinScoreData.score[i].oil);
        this.chartMoistureData.push(this.skinScoreData.score[i].moisture);
      }
    }
    if (this.chartDateData.length > 0) {
      this.lineCanvas.data.labels = this.chartDateData;
      this.lineCanvas2.data.labels = this.chartDateData;
      this.lineCanvas.data.datasets[0].data = this.chartMoistureData;
      this.lineCanvas2.data.datasets[0].data = this.chartOilData;
      this.lineCanvas.update();
      this.lineCanvas2.update();
    } else {
      this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
    }
  }

  yearmonthselect2(e) {
    var year = format(new Date(), 'YYYY');
    var month = e.substr(0, 2);
    var date = year + "-" + month;
    // this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
    this.auth.getChartScore(this.userData.email, date).subscribe(items => {
      // if (items.length > 0) {
        // this.update();
        // this.totalusetime = this.getSecondsAsDigitalClock(items[0].sum);
        // this.loadProgress = (Number(items[0].sum) / 16200) * 100;
      // }
      // else {
        // this.totalusetime = false;
        // this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
      // }
    });

    this.auth.getRankTotalUseTime(date).subscribe(items => {
      // if (items.length > 0) {
      //   // this.update();
      //   // this.memberRanking = new Array<any>();
      //   // console.log(JSON.stringify(items));
      //   for (let i = 0; i < items.length; i++) {
      //     this.memberRanking[i] = {
      //       email: items[i]._id,
      //       sum: items[i].sum,
      //       rank: i + 1
      //     }
      //   }
      //   // console.log(this.memberRanking);
      // }
      // else {
      //   // this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
      // }
    });


  }

  segmentChanged(ev: any) {
    if (ev.value === '수분') {
      // console.log('Segment changed111111111==============', ev.value);
      this.segment_status == true;
      document.getElementById("moisture").style.display = "block";
      document.getElementById("oil").style.display = "none";
    } else {
      // console.log('Segment changed2222222222==============', ev.value);
      this.segment_status == false;
      document.getElementById("oil").style.display = "block";
      document.getElementById("moisture").style.display = "none";
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
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          //this.thumb_image = false;
        } else {
          //this.thumb_image = true;
        }
        this.reloadUserPoint(this.userData.email);
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
          from: 'plinic',
        };
        this.reloadUserPoint(this.userData.email);
      }
      this.auth.getSkinScore(this.userData.email).subscribe(items => {
        if (items) {
          this.skinScoreData = items;
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
            console.log("abcsdasd");
            var i = (parseInt(this.skinScoreData.score.length) - 1); //오늘
            // console.log("ii" + i);
            var k = (parseInt(this.skinScoreData.score.length) - 2); //어제
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
        } else {
          this.skinScoreData = items;
        }
      });
      // this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      // this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }


  public selectclick() {
    console.log('ionViewDidLoad selectclick');
    this.lineChart.update();
  }

  showAlert(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }





  monthdate: any[] = [{
      "day": "2020년01월"
    },
    {
      "day": "2020년02월"
    },
    {
      "day": "2020년03월"
    },
    {
      "day": "2020년04월"
    },
    {
      "day": "2020년05월"
    },
    {
      "day": "2020년06월"
    },
    {
      "day": "2020년07월"
    },
    {
      "day": "2020년08월"
    },
    {
      "day": "2020년09월"
    },
    {
      "day": "2020년10월"
    },
    {
      "day": "2020년11월"
    },
    {
      "day": "2020년12월"
    }
  ];

  openguide() {
    let modal = this.modalCtrl.create(SkinGuidePage);
    modal.onDidDismiss(data => {
      this.ionViewDidEnter();
    });
    modal.present();
  }

  start() {
    let modal = this.modalCtrl.create(DeviceConnectSkinIngPage);
    modal.onDidDismiss(data => {
      let tabs = document.querySelectorAll('.tabbar');
      if (tabs !== null) {
        Object.keys(tabs).map((key) => {
          // tabs[ key ].style.transform = 'translateY(0)';
          tabs[key].style.display = 'block';
          tabs[key].style.display = '';
        });
      }
      this.ionViewDidLoad();
    });
    modal.present();
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

  private reloadUserPoint(email) {
    // this.auth.reloadUserPoint(email).subscribe(data =>{
    //   // console.log("커뮤니티 사용자 포인트 : " + data)
    //   this.totaluserPoint = data;
    //   this.totaluserPoint = this.addComma(this.totaluserPoint);
    // });

    this.auth.reloadUserPointfromPlinc(email).subscribe(
      data => {
        this.totaluserPoint = JSON.stringify(data.totalPoint);
        this.totaluserPoint = this.addComma(this.userData.totaluserpoint);
      },
      error => {
        console.log(
          "사용자 개인포인트 불러오기 에러발생 : " + JSON.stringify(error)
        );
      }
    );

  }

  addComma(data_value) { //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString('en');
  }

  public myinfo() {
    //2020-05-28 마이페이지 하단탭 제거
    // this.nav.push(MyinfoPage); 

    let myModal = this.modalCtrl.create(MyinfoPage);
    myModal.onDidDismiss(data => {
      if(this.userData) {
        if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
          this.reloadUserPoint(this.userData.email);
        }
        else {
          this.reloadUserPoint(this.userData.email);
        }
      }
      console.log("출석체크 페이지 닫음");
    });
    myModal.present();
  }

}
