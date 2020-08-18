import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ModalController, Loading, LoadingController } from 'ionic-angular';
import { ItemSearchPage } from '../item-search/item-search'
import { SkinChekMunjinPage } from '../skin-chek-munjin/skin-chek-munjin'
import { SkinChekCamera1Page } from '../skin-chek-camera1/skin-chek-camera1'
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture'
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import { SkincheckGuidePage } from '../skincheck-guide/skincheck-guide'
import { CameraGuidePage } from '../camera-guide/camera-guide'

/**
 * Generated class for the SkinChekChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-chek-chart',
  templateUrl: 'skin-chek-chart.html',
})
export class SkinChekChartPage {

  userData: any; 
  jwtHelper: JwtHelper = new JwtHelper();
  isLoadMain : boolean = false;
  isLoadSub : boolean = false;
  loadMainData : any;
  loadSubData : any;
  skinScoreData: any;
  chartDateData = [];
  chartOilData = [];
  chartMoistureData = [];
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  valueday = { "day": "1" }
  today: any = new Date().toISOString();
  skinbtnYear = format(this.today, 'YYYY');
  skinbtnMonth = format(this.today, 'MM');
  productData: any;
  jsonData: any;
  items: any;
  btnCheek: boolean = true;
  btnEye: boolean = false;
  btnForeHead: boolean = false;
  currentDate: Date = new Date();
  left1 : any = this.makeRandom(0,100) + '%';
  left2 : any = this.makeRandom(0,100) + '%';
  left3 : any = this.makeRandom(0,100) + '%';
  left4 : any = this.makeRandom(0,100) + '%';
  left5 : any = this.makeRandom(0,100) + '%';
  left6 : any = this.makeRandom(0,100) + '%';
  sky: Array<any> = new Array<any>();
  t1h: Array<any> = new Array<any>();
  reh: Array<any> = new Array<any>();
  skyResult: any;
  t1hResult: any;
  rehResult: any;
  pm10: any;
  pm10Result: any;
  uv: any;
  uvResult: any;
  loading: any;

  skinTone: any = "#eecac3";


  // left1 : any = '0%';
  // left2 : any = '0%';
  // left3 : any = '0%';
  // left4 : any = '0%';
  // left5 : any = '0%';
  // left6 : any = '0%';

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public auth: AuthService,
    public images: ImagesProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
  ) {
  }

  async ionViewDidLoad() {
    this.showLoading();
    console.log('ionViewDidLoad SkinChekChartPage');
    await this.loadItems();
    // await this.loadProduct('date');
    await this.getWeather();
    await this.getMise();
    await this.getUv();
    this.loading.dismiss();
  }

  async ionViewDidEnter(){
      ////처음 진입시 현재 월로 조회 되도록
    this.skinbtnYear = format(new Date(), 'YYYY');
    this.skinbtnMonth = format(new Date(), 'MM');
    var e = this.skinbtnYear + "년" + this.skinbtnMonth;
    
    await this.yearmonthselect(e);

    await this.initChart();
    await this.initChart2();
    console.log('ionViewDidEnter SkinChekChartPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
      }
    });
  }

  public next() {
    this.navCtrl.push(CameraGuidePage).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("설문 페이지 닫힘");
      });
    });
  }

  private makeRandom(min, max) {
        var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandVal;
  }

  yearmonthselect(e) {
    var year = e.substr(0, 4);
    var month = e.substr(5, 2);
    var date = year + "-" + month;
    console.log(this.skinScoreData);
    this.chartDateData = [];
    this.chartOilData = [];
    this.chartMoistureData = [];
    // for (let i = 0; i < this.skinScoreData.score.length; i++) {
    //   if (this.skinScoreData.score[i].saveDate.indexOf(date) !== -1) {
    //     this.chartDateData.push(this.skinScoreData.score[i].saveDate.substr(5, 5));
    //     this.chartOilData.push(this.skinScoreData.score[i].oil);
    //     this.chartMoistureData.push(this.skinScoreData.score[i].moisture);
    //   }
    // }
    console.log("데이터 길이 : " + this.chartDateData.length)
    // if (this.chartDateData.length > 0) {
    //   this.lineCanvas.data.labels = this.chartDateData;
    //   this.lineCanvas2.data.labels = this.chartDateData;
    //   this.lineCanvas.data.datasets[0].data = this.chartMoistureData;
    //   this.lineCanvas2.data.datasets[0].data = this.chartOilData;
    //   this.lineCanvas.update();
    //   this.lineCanvas2.update();
  
    //   console.log(this.chartDateData);
    //   console.log(this.chartMoistureData);
    //   console.log(this.chartOilData);
    // } else {
    //   setTimeout(() => {
    //   // this.showAlert("조회된 데이터가 없습니다. <br /> 데이터를 측정해 주세요.");
    //   }, 3000)
    // }
    // console.log("yearmonthselect===============" + e);
  }

  
  monthdate: any[] = [
    {
      "day": this.skinbtnYear + "년1월"
    },
    {
      "day": this.skinbtnYear + "년2월"
    },
    {
      "day": this.skinbtnYear + "년3월"
    },
    {
      "day": this.skinbtnYear + "년4월"
    },
    {
      "day": this.skinbtnYear + "년5월"
    },
    {
      "day": this.skinbtnYear + "년6월"
    },
    {
      "day": this.skinbtnYear + "년7월"
    },
    {
      "day": this.skinbtnYear + "년8월"
    },
    {
      "day": this.skinbtnYear + "년9월"
    },
    {
      "day": this.skinbtnYear + "년10월"
    },
    {
      "day": this.skinbtnYear + "년11월"
    },
    {
      "day": this.skinbtnYear + "년12월"
    }
  ];

  initChart() {
    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: ['3일', '16일', '17일', '20일', '22일', '24일', '25일', '26일', '28일', '30일'],
        datasets: [{
          // label: format(this.today, 'MM/DD', '유분'),
          label: '내 수분 점수',
          fill: false,
          lineTension: 0,
          backgroundColor: "#dddddd",
          borderColor: "#dddddd",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#dddddd",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5, //클릭시 원크기
          pointHoverBackgroundColor: "#dddddd",
          pointHoverBorderColor: "#dddddd",
          pointHoverBorderWidth: 2, //데이터 호버크기
          pointRadius: 3,  //데이터 포인트크기
          pointHitRadius: 100,
          // data: [this.data1, this.data2, this.data3, this.data4],
          data: [-20, 0, -20, 0, 10, 20, 30, 40, 30, 20],
          spanGaps: false,
        },
        {
          // label: format(this.today, 'MM/DD', '유분'),
          label: '20대 평균 수분 점수',
          fill: false,
          lineTension: 0,
          backgroundColor: "#ff597c",
          borderColor: "#ff597c",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#ff597c",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#ff597c",
          pointHoverBorderColor: "#ff597c",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 20,
          data: [50, 80, -20, 40, 50 ,10 ,60, 30, -20, 50
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
          xAxes: [{               //아래측 가로 범위
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0
            }
          }],
          yAxes: [{              //좌측 세로 범위
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              min: -80
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

  initChart2() {
    this.lineCanvas2 = new Chart(this.lineCanvas2.nativeElement, {
      type: 'bar',
      data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: ['3일', '16일', '17일', '20일', '22일', '24일', '25일', '26일', '28일', '30일'],
        datasets: [{
            label: '수면량',
            fill: true,
            backgroundColor: "#9ad0f5",
            borderColor: "#9ad0f5",
            data: [-20, 0, -20, 0, 10, 20, 30, 40, 30, 20],
          },
          {
            // label: format(this.today, 'MM/DD', '유분'),
            label: '음주량',
            backgroundColor: "#ffb1c1",
            borderColor: "#ffb1c1",
            data: [50, 80, -20, 40, 50 ,10 ,60, 30, -20, 50
              // this.all_moisture_score='' ?  this.all_moisture_score+10 : this.all_first_moisture_score+10,
              // this.all_moisture_score='' ?  this.all_moisture_score+10 : this.all_first_moisture_score+10,
              //DB데이터 출력
    
            ],
            spanGaps: false,
            // 수분은 하늘이랑 파랑
            // 유분은 노랑이랑 주황!!
            // label: format(this.today, 'MM/DD', '유분'),
          },
          {
            // label: format(this.today, 'MM/DD', '유분'),
            label: '운동량',
            backgroundColor: "#ffc62c",
            borderColor: "#ffc62c",
            data: [50, 80, -20, 40, 50 ,10 ,60, 30, -20, 50
              // this.all_moisture_score='' ?  this.all_moisture_score+10 : this.all_first_moisture_score+10,
              // this.all_moisture_score='' ?  this.all_moisture_score+10 : this.all_first_moisture_score+10,
              //DB데이터 출력
    
            ],
            spanGaps: false,
            // 수분은 하늘이랑 파랑
            // 유분은 노랑이랑 주황!!
            // label: format(this.today, 'MM/DD', '유분'),
          }
        ],
      },
      options: {
        plugins: {
          labels: false  //바위에 퍼센트로 표시 된 부분 가리기
        },
        animation: {
          duration: 3000 // general animation time
        },
        responsive: false,
        legend: {
          display: false,     //라벨표시
        },
        scales: {
          xAxes: [{               //아래측 가로 범위
            display: true,
            ticks: {
              beginAtZero: false,
              max: 100,
              min: 0
            }
          }],
          yAxes: [{              //좌측 세로 범위
            display: true,
            ticks: {
              beginAtZero: false,
              max: 100,
              min: -80
            },
            scaleLabel:{

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


  // public loadProduct(mode) {
  //   this.images.productLoad().subscribe(data => {

  //     this.productData = data;
  //   });
  //  }

  
   cheek() {
    this.btnCheek=true;
    this.btnEye=false;
    this.btnForeHead=false;
   }

   eye() {
     this.btnCheek=false;
     this.btnEye=true;
     this.btnForeHead=false;
   }

   forehead(){
     this.btnCheek=false;
     this.btnEye=false;
     this.btnForeHead=true;

   }

   getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset()*60000).toISOString()
   }

   getWeather() {
     var today = this.getCovertKoreaTime(this.currentDate);
     today = today.substr(0,10);
     today = today.replace('-', '').replace('-', '');

     var time = this.getCovertKoreaTime(this.currentDate);
     time = time.substr(11,2);
     var timeN = Number(time) - 1;
     (String(timeN).length === 1) ? time = '0'+String(timeN)+'00': time = String(timeN)+'00';

     this.images.getWeather(today, time).subscribe(data => {
       for(var i = 0; i<data.response.body.items.item.length; i++){
        if(data.response.body.items.item[i].category === 'SKY') { //하늘
           this.sky.push(data.response.body.items.item[i].fcstValue);
        }
        if(data.response.body.items.item[i].category === 'T1H') { //하늘
          this.t1h.push(data.response.body.items.item[i].fcstValue);
        }
        if(data.response.body.items.item[i].category === 'REH') { //하늘
          this.reh.push(data.response.body.items.item[i].fcstValue);
        }

       }

      if(this.sky[0] ==="1"){ this.skyResult="맑음"} else if(this.sky[0] ==="3") {this.skyResult="구름많음"} else {this.skyResult="흐림"}
      this.t1hResult = this.t1h[0];
      this.rehResult = this.reh[0];

      
    });
   }

   getMise() {
    this.images.getMise().subscribe(data => {
      var PM10 = Number(data.response.body.items.item[0].seoul._text);
      this.pm10 = Number(data.response.body.items.item[0].seoul._text);
      if((Number(PM10) >= 0) && (Number(PM10) <= 30)) {
        this.pm10Result = '좋음';
      } else if((Number(PM10) >= 31) && (Number(PM10) <= 80)) {
        this.pm10Result = '보통';
      } else if((Number(PM10) >= 81) && (Number(PM10) <= 150)) {
        this.pm10Result = '나쁨';
      } else if(Number(PM10) >= 151) {
        this.pm10Result = '매우나쁨';
      }
    });
   }


   getUv() {
    this.images.getUv().subscribe(data => {
      var UV = Number(data.response.body.items.item[0].today);
      this.uv = Number(data.response.body.items.item[0].today);
      if((Number(UV) >= 0) && (Number(UV) <= 2)) {
        this.uvResult = '낮음';
      } else if((Number(UV) >= 3) && (Number(UV) <= 5)) {
        this.uvResult = '보통';
      } else if((Number(UV) >= 6) && (Number(UV) <= 7)) {
        this.uvResult = '높음';
      } else if((Number(UV) >= 8) && (Number(UV) <= 10)) {
        this.uvResult = '매우높음';
      } else if(Number(UV) >= 11) {
        this.uvResult = '위험';
      }

    })
   }


   //20200521 이용안내 페이지로 이동
  chartguide() {
    let modal = this.modalCtrl.create(SkincheckGuidePage);
    modal.onDidDismiss(data => {
      console.log("이용안내 페이지 닫힘");
    });
    modal.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content : "데이터를 불러오는중입니다"
    })
    this.loading.present();
  }

}
