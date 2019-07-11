import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import ko from 'date-fns/locale/ko';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';


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

  // @ViewChild('doughnutCanvas') doughnutCanvas;
  // @ViewChild('doughnutCanvas2') doughnutCanvas2;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;

  lineChart: any;
  //chart

  valueday = { "day": "1" }


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
  chartDateData2: Array<any>;





  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, @Inject(DOCUMENT) document, public auth: AuthService, public alertCtrl: AlertController) {
    this.segment_moisture = "수분"

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
    console.log("데이터 길이 : " + this.chartDateData.length)
    if (this.chartDateData.length > 0) {
      this.lineCanvas.data.labels = this.chartDateData;
      this.lineCanvas2.data.labels = this.chartDateData;
      this.lineCanvas.data.datasets[0].data = this.chartMoistureData;
      this.lineCanvas2.data.datasets[0].data = this.chartOilData;
      this.lineCanvas.update();
      this.lineCanvas2.update();

      console.log(this.chartDateData);
      console.log(this.chartMoistureData);
      console.log(this.chartOilData);
    } else {
      this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
    }

    // console.log("yearmonthselect===============" + e);
  }

  segmentChanged(ev: any) {
    if (ev.value === '수분') {
      // console.log('Segment changed111111111==============', ev.value);
      this.segment_status == true;
      document.getElementById("moisture").style.display = "block";
      document.getElementById("oil").style.display = "none";
    }
    else {
      // console.log('Segment changed2222222222==============', ev.value);
      this.segment_status == false;
      document.getElementById("oil").style.display = "block";
      document.getElementById("moisture").style.display = "none";
    }
  }


  ionViewDidLoad() {
    this.loadItems();

    this.skin_first_check();
    this.skin_first_moisture_score();
    this.skin_first_oil_score();
    this.skin_oil_score();
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
          birthday: items.birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: items.gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: 'plinic',
        };
      }
      this.auth.getSkinScore(this.userData.email).subscribe(items => {
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

  ionViewDidEnter() {
    this.skin_moisture_score();
    // console.log('ionViewDidLoad SkinChartPage');
    // console.log('all_moisture_score=====================' + this.all_moisture_score);
    document.getElementById("moisture").style.display = "block";
    document.getElementById("oil").style.display = "none";


    this.today = format(this.today, 'DD');

    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {


      type: 'line',
      data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: this.chartDateData,
        datasets: [{
          // label: format(this.today, 'MM/DD', '유분'),
          label: '내 수분 점수',
          fill: false,
          lineTension: 0,
          backgroundColor: "#368AFF",
          borderColor: "#368AFF",
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
          // data: [this.data1, this.data2, this.data3, this.data4],
          data: this.chartMoistureData,
          spanGaps: false,
        },
        {
          // label: format(this.today, 'MM/DD', '유분'),
          label: '20대 평균 수분 점수',
          fill: false,
          lineTension: 0,
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
          data: [
            // this.all_moisture_score='' ?  this.all_moisture_score+10 : this.all_first_moisture_score+10,
            // this.all_moisture_score='' ?  this.all_moisture_score+10 : this.all_first_moisture_score+10,
            //DB데이터 출력

          ],
          spanGaps: false,
          // 수분은 하늘이랑 파랑
          // 유분은 노랑이랑 주황!!
          // label: format(this.today, 'MM/DD', '유분'),
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

    ////처음 진입시 현재 월로 조회 되도록
    this.skinbtnYear = format(new Date(), 'YYYY');
    this.skinbtnMonth = format(new Date(), 'MM');
    var e = this.skinbtnYear + "년" + this.skinbtnMonth;
    this.yearmonthselect(e);
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



  // this.OilChart = new Chart(this.doughnutCanvas2.nativeElement, {
  //
  //         type: 'doughnut',
  //         data: {
  //             labels: ["수분", "유분"],
  //             datasets: [{
  //                 label: '# of Votes',
  //                 data: [30, 60],
  //                 backgroundColor: [
  //                     '#00D8FF',
  //                     '#FFE400'
  //
  //                 ],
  //                 hoverBackgroundColor: [
  //                     "#00D8FF",
  //                     "#FFE400"
  //                 ],
  //
  //             }]
  //         },
  //       options: {
  //         plugins: {
  //             labels: {
  //                   render: this.percentage,
  //                   precision: 0,
  //                   fontSize: 15,
  //                   fontColor: '#000',
  //                   fontStyle: 'normal',
  //                   textShadow: true,
  //                   showActualPercentages: true
  //               }
  //           }
  //         }
  //     });
  //
  //
  //   this.MoistureChart = new Chart(this.doughnutCanvas.nativeElement, {
  //
  //             type: 'doughnut',
  //             data: {
  //                 labels: ["주름","탄력"],
  //                 datasets: [{
  //                     label: '# of Votes',
  //                     data: [70,30],
  //                     backgroundColor: [
  //                         '#FF3636',
  //                         "#FFD9EC"
  //                     ],
  //                     hoverBackgroundColor: [
  //                         '#FFBB00',
  //                         "#FFD9EC"
  //                     ],
  //                 }]
  //             },
  //             options: {
  //               plugins: {
  //                   labels: {
  //                     render: this.percentage,
  //                     precision: 0,
  //                     fontSize: 15,
  //                     fontColor: '#000',
  //                     fontStyle: 'normal',
  //                     textShadow: true,
  //                     showActualPercentages: true
  //                   }
  //             }
  //           }
  //     });
  //   }
}
