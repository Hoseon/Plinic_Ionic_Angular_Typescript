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
import { SkincheckGuidePage } from '../skincheck-guide/skincheck-guide';
import { CameraGuidePage } from '../camera-guide/camera-guide';
import { CameraGuideFirstPage } from '../camera-guide-first/camera-guide-first';
import { PoreSizePage } from '../pore-size/pore-size';
import { PoreCountPage } from '../pore-count/pore-count';
import { SkinCleanPage } from '../skin-clean/skin-clean';
import { ProductDetailPage } from '../product-detail/product-detail';
import { SkinTonePage } from '../skin-tone/skin-tone';
import { SkinMunjinPage } from '../skin-munjin/skin-munjin';
import { SkinChekPage } from '../skin-chek/skin-chek';
import { MyinfoPage } from '../myinfo/myinfo';

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
  faceText: any;
  faceImgUrl: any;
  skinAnalyAvgComparePoreCount: any;
  ageRange: any;
  avgCheekPoreSize: any;
  avgCheekPoreCount: any;
  avgForeHeadPoreSize: any;
  avgForeHeadPoreCount: any;
  skinAnalyAvgCompare
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
  skyColor: any;
  t1hResult: any;
  rehResult: any;
  rehTextResult: any;
  rehColor: any;
  pm10: any;
  pm10Result: any;
  pm10Color: any;
  uv: any;
  uvResult: any;
  uvColor: any;
  loading: any;

  skinTone: any = "#eecac3";


  skinAnalyData: any;

  skinAnalyToneHex: any;
  skinAnalyPoreSize: any; // 측정 후 평균
  skinAnalyPoreSizeAvg: any; //측정 후 평균
  skinAnalyPoreBeforeSizeAvg: any; //측정 이전 평균
  skinAnalyPoreCompareSize: any; //모공 사이즈 전후 차이
  skinAnalyPoreCompareAvg: any; //측정 전체 내 평균 대비

  skinAnalyPoreOneCount: any; // 마지막 측정된 모공 카운트
  skinAnalyPoreCount: any; // 모공 카운트
  skinAnalyPoreBeforeCount: any; // 모공 크기 측정 이전 카운트
  skinAnalyPoreCompareCount: any; //모공 크기 전후 차이

  skinCleanScore: any = 0; //피부 클린 점수

  munjinSleep: any;
  munjinAlcohol: any;
  munjinFitness: any;
  munjinCreateAt: any;
  // left1 : any = '0%';
  // left2 : any = '0%';
  // left3 : any = '0%';
  // left4 : any = '0%';
  // left5 : any = '0%';
  // left6 : any = '0%';

  totaluserPoint: any = 0;

  

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
    this.androidBackButton();
  }

  async ionViewCanEnter(){
   await this.loadItems();
  }

  async ionViewDidLoad() {
    // this.showLoading();
    // this.loading.dismiss();
    if(this.userData) {
      await this.getSkinAnaly();
      // this.ageRange = this.getAgeRange();
      // this.getAvgSkinPore(this.ageRange);
      this.loadMyMainProduct();
    }
    
  }

  async ionViewDidEnter(){
    await this.getWeather();
    // await this.getMise();
    // await this.getUv();
    this.skinbtnYear = format(new Date(), 'YYYY');
    this.skinbtnMonth = format(new Date(), 'MM');
    var e = this.skinbtnYear + "년" + this.skinbtnMonth;
  }

  async ionViewWillEnter(){
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  public loadItems() {
    this.auth.getUserStorage().then(async items => {
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

      } else {
        this.userData = {
          accessToken: items.accessToken,
          id: this.jwtHelper.decodeToken(items).id,
          age_range: items.age_range,
          birthday: this.jwtHelper.decodeToken(items).birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: this.jwtHelper.decodeToken(items).gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: 'plinic',
        };
        this.reloadUserPoint(this.userData.email);
      }
      await this.getSkinAnaly();
      // this.ageRange = this.getAgeRange();
      // this.getAvgSkinPore(this.ageRange);
      this.loadMyMainProduct();
    });
  }

  public next(_step) {
    if(_step === 'first_update') {
      this.navCtrl.push(CameraGuideFirstPage, { step : _step }).then(() => {
        this.navCtrl.getActive().onDidDismiss(data  => {
        });
      });
    } else {
      this.navCtrl.push(CameraGuidePage, { step : _step }).then(() => {
        this.navCtrl.getActive().onDidDismiss(data  => {
        });
      });
    }
    
  }

  private makeRandom(min, max) {
        var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandVal;
  }

  yearmonthselect(e) {
    var year = e.substr(0, 4);
    var month = e.substr(5, 2);
    var date = year + "-" + month;
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

      if(this.sky[0] ==="1"){ this.skyResult="맑음"; this.skyColor="#4c68e0"} else if(this.sky[0] ==="3") {this.skyResult="구름많음"; this.skyColor="#ff3939" } else {this.skyResult="흐림"; this.skyColor="#ac0000"}
      this.t1hResult = this.t1h[0];
      this.rehResult = this.reh[0];
      if(Number(this.rehResult) > 45) {
        this.rehTextResult = "낮음"; 
        this.rehColor = "#4c68e0";
      } 
      else if(Number(this.rehResult) <= 45 || Number(this.rehResult) > 55 ) {
        this.rehTextResult ="보통";
        this.rehColor = "#0ca28f";
      }
      else if(Number(this.rehResult) <= 55 || Number(this.rehResult) >= 100 ) {
        this.rehTextResult = "높음";
        this.rehColor = "#ff3939";
      }
    });
   }

   getMise() {
    this.images.getMise().subscribe(data => {
      var PM10 = Number(data.response.body.items.item[0].seoul._text);
      this.pm10 = Number(data.response.body.items.item[0].seoul._text);
      if((Number(PM10) >= 0) && (Number(PM10) <= 30)) {
        this.pm10Result = '좋음';
        this.pm10Color = '#4c68e0';
      } else if((Number(PM10) >= 31) && (Number(PM10) <= 80)) {
        this.pm10Result = '보통';
        this.pm10Color = '#0ca28f';
      } else if((Number(PM10) >= 81) && (Number(PM10) <= 150)) {
        this.pm10Result = '나쁨';
        this.pm10Color = '#ff3939';
      } else if(Number(PM10) >= 151) {
        this.pm10Result = '매우나쁨';
        this.pm10Color = '#ac0000';
      }
    });
   }


   getUv() {
    this.images.getUv().subscribe(data => {
      console.log(data);
      var UV = Number(data.response.body.items.item[0].today);
      this.uv = Number(data.response.body.items.item[0].today);
      console.log("자외선 지수? " + this.uv);
      if((Number(UV) >= 0) && (Number(UV) <= 2)) {
        this.uvResult = '낮음';
        this.uvColor ='#142fa3';
      } else if((Number(UV) >= 3) && (Number(UV) <= 5)) {
        this.uvResult = '보통';
        this.uvColor ='#4c68e0';
      } else if((Number(UV) >= 6) && (Number(UV) <= 7)) {
        this.uvResult = '높음';
        this.uvColor ='#0ca28f';
      } else if((Number(UV) >= 8) && (Number(UV) <= 10)) {
        this.uvResult = '매우높음';
        this.uvColor ='#ff3939';
      } else if(Number(UV) >= 11) {
        this.uvResult = '위험';
        this.uvColor ='#ac0000';
      }

    })
   }


   //20200521 이용안내 페이지로 이동
  chartguide() {
    let modal = this.modalCtrl.create(SkincheckGuidePage);
    modal.onDidDismiss(data => {
    });
    modal.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content : "피부데이터를 불러오는중입니다"
    })
    this.loading.present();
  }

  poreSize() {
    this.navCtrl.push(PoreSizePage, {skinAnalyData : this.skinAnalyData, userData : this.userData}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  poreCount() {
    this.navCtrl.push(PoreCountPage, {skinAnalyData : this.skinAnalyData, userData : this.userData}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  skinClean() {
    this.navCtrl.push(SkinCleanPage, {skinAnalyData : this.skinAnalyData, userData : this.userData} ).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  skinTonePage() {
    this.navCtrl.push(SkinTonePage, {skinAnalyData : this.skinAnalyData, userData : this.userData} ).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  skinMunjinPage() {
    this.navCtrl.push(SkinMunjinPage, {skinAnalyData : this.skinAnalyData, userData : this.userData} ).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  getSkinAnaly() {
    // if(this.userData) {
      var sizeSum = 0;
      var beforeSum = 0;
      var poreCountSum = 0;
      var poreBeforCountSum = 0;
      this.showLoading();
      this.auth.getSkinAnaly(this.userData.email).subscribe(data=>{
        if(data) {
          this.skinAnalyData = data;

          this.skinAnalyPoreSize = Math.floor(this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].pore[0].average_pore);

          // this.skinTone = this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].tone[0].avgrage_color_hex; //2020-12-07 밝은 컬러로 변경
          this.skinTone = this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].tone[0].lightest_color_hex;
  
          //현재 모공 사이즈 총 합
          for(let i= 0; i < this.skinAnalyData.cheek.length; i++) {
             sizeSum += this.skinAnalyData.cheek[i].pore[0].average_pore;
          }
          this.skinAnalyPoreSizeAvg = Math.floor(Number(sizeSum / this.skinAnalyData.cheek.length)); //전체 모공사이즈 평균

          this.skinAnalyPoreCompareAvg = Math.floor(this.skinAnalyPoreSize - this.skinAnalyPoreSizeAvg);
          this.skinAnalyPoreCompareAvg > 0 ? this.skinAnalyPoreCompareAvg = "+" + String(this.skinAnalyPoreCompareAvg) : this.skinAnalyPoreCompareAvg;
          
          //이전 모공 사이즈 총 합
          for(let i= 0; i < (this.skinAnalyData.cheek.length-1); i++) {
            beforeSum += this.skinAnalyData.cheek[i].pore[0].average_pore;
          }
          this.skinAnalyPoreBeforeSizeAvg = Math.floor(Number(beforeSum / (this.skinAnalyData.cheek.length-1))); //직전까지 모공사이즈 평균
          this.skinAnalyPoreBeforeSizeAvg >= 0 ? this.skinAnalyPoreBeforeSizeAvg : this.skinAnalyPoreBeforeSizeAvg = '--';
          if(this.skinAnalyPoreBeforeSizeAvg >= 0) {
            this.skinAnalyPoreCompareSize = this.skinAnalyPoreSizeAvg - this.skinAnalyPoreBeforeSizeAvg;
            this.skinAnalyPoreCompareSize > 0 ? this.skinAnalyPoreCompareSize = "+" + String(this.skinAnalyPoreCompareSize) : this.skinAnalyPoreCompareSize;
          }



          //현재 모공 갯수 총합

          this.skinAnalyPoreOneCount = this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].pore[0].pore_count

          for(let i= 0; i < this.skinAnalyData.cheek.length; i++) {
            poreCountSum += this.skinAnalyData.cheek[i].pore[0].pore_count;
          }
          this.skinAnalyPoreCount = Math.floor(Number(poreCountSum / this.skinAnalyData.cheek.length)); //전체 모공사이즈 평균
          
          //이전 모공 갯수 총 합
          for(let i= 0; i < (this.skinAnalyData.cheek.length-1); i++) {
            poreBeforCountSum += this.skinAnalyData.cheek[i].pore[0].pore_count;
          }
          this.skinAnalyPoreBeforeCount = Math.floor(Number(poreBeforCountSum / (this.skinAnalyData.cheek.length-1))); //전체 모공사이즈 평균
          this.skinAnalyPoreBeforeCount >= 0 ? this.skinAnalyPoreBeforeCount : this.skinAnalyPoreBeforeCount = '--';
          
          //모공 직전까지 평균
          if(this.skinAnalyPoreBeforeCount >= 0) {
            this.skinAnalyPoreCompareCount = this.skinAnalyPoreOneCount - this.skinAnalyPoreBeforeCount;
            this.skinAnalyPoreCompareCount > 0 ? this.skinAnalyPoreCompareCount = "+" + String(this.skinAnalyPoreCompareCount) : this.skinAnalyPoreCompareCount;
            // this.skinTone = this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].tone[0].avgrage_color_hex;
          }

          if(this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].diff.length > 0) {
            this.skinCleanScore = Math.floor(this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].diff[0].value);
            if(this.skinCleanScore < 15) {
              this.faceText = "좋음";
              this.faceImgUrl = "assets/img/skin-chek-chart/face_good.png";
            } else if (this.skinCleanScore >= 15 && this.skinCleanScore <= 30) {
              this.faceText = "보통";
              this.faceImgUrl = "assets/img/skin-chek-chart/face_normal.png";
            } else if (this.skinCleanScore > 31) {
              this.faceText = "나쁨";
              this.faceImgUrl = "assets/img/skin-chek-chart/face_bad.png";
            } 
            this.skinCleanScore > 0 ? this.skinCleanScore = "+" + String(this.skinCleanScore) : this.skinCleanScore;
          } else {
            this.faceText = "--";
            this.faceImgUrl = "assets/img/skin-chek-chart/face_good.png";
          }

          //문진표 결과
          if(this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].sleep === 11) {
            this.munjinSleep = '5시간 이하'
          } else if(this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].sleep === 22) {
            this.munjinSleep = '6~7 시간'
          } else {
            this.munjinSleep = '8시간 이상'
          }

          if(this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].alcohol === 11) {
            this.munjinAlcohol = '대량'
          } else if(this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].alcohol === 22) {
            this.munjinAlcohol = '소량(반병 이하)'
          } else {
            this.munjinAlcohol = '없음'
          }

          if(this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].fitness === 11) {
            this.munjinFitness = '없음'
          } else if(this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].fitness === 22) {
            this.munjinFitness = '90분 이하'
          } else {
            this.munjinFitness = '90분 이상'
          }
          this.munjinCreateAt =  this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].created_at;

          this.ageRange = this.getAgeRange();
          this.getAvgSkinPore(this.ageRange);
          this.loading.dismiss();
        } else {
          this.loading.dismiss();
        }
      },error => {
        console.log("피부 분석 데이터 가져 오기 에러 : " +error);
      })
    // }
  }

  getAgeRange() {
    var age = 0;
    var age_range = '';
    age = Number(new Date().getFullYear()) - Number(this.userData.birthday.substr(0,4)) + 1 ;
    return String(age).substr(0,1) + '0';
  }


  getAvgSkinPore(ageRange) {

    this.images.getAvgPore(ageRange, this.userData.gender).subscribe(data => {
      this.avgCheekPoreSize = Math.floor(data.avgCheekPoreSize); //연령대 성별 평균
      this.avgCheekPoreCount = Math.floor(data.avgCheekPoreCount);
      this.avgForeHeadPoreSize = Math.floor(data.avgForeHeadPoreSize);
      this.avgForeHeadPoreCount = Math.floor(data.avgForeHeadPoreCount);

      this.skinAnalyAvgCompare = Math.floor(Number(this.skinAnalyPoreSizeAvg) - Number(this.avgCheekPoreSize));
      this.skinAnalyAvgCompare >= 0 ? this.skinAnalyAvgCompare : this.skinAnalyAvgCompare = '--';
      if(this.skinAnalyAvgCompare > 0) {
        this.skinAnalyAvgCompare > 0 ? this.skinAnalyAvgCompare = "+" + String(this.skinAnalyAvgCompare) : this.skinAnalyAvgCompare;
      }
      
      this.skinAnalyAvgComparePoreCount = Math.floor(Number(this.skinAnalyPoreCount) - Number(this.avgCheekPoreCount));
      this.skinAnalyAvgComparePoreCount >= 0 ? this.skinAnalyAvgComparePoreCount : this.skinAnalyAvgComparePoreCount = '--';
      if(this.skinAnalyAvgComparePoreCount > 0) {
        this.skinAnalyAvgComparePoreCount > 0 ? this.skinAnalyAvgComparePoreCount = "+" + String(this.skinAnalyAvgComparePoreCount) : this.skinAnalyAvgComparePoreCount;
      }

      // this.left1 = (Number(this.skinAnalyPoreSizeAvg) / Number(this.avgCheekPoreSize));
      // this.left2 = this.skinAnalyPoreBeforeSizeAvg;
    },error => {
      console.log(error);
    })
  }

  public loadMyMainProduct() {
    this.images.myMainProductLoad(this.userData.email).subscribe(data => {
      if(data != '') {
        this.isLoadMain = true;
        this.loadMainData = data;
      }
    }, error => {
      this.loading.dismiss();
    })
  }

  product_detail(id) {
    let modal = this.modalCtrl.create(ProductDetailPage, { Product_Num: id });
    modal.onDidDismiss(data => {
    });
    modal.present();
  }

  change_Product() {
    let modal = this.modalCtrl.create(SkinChekPage, { changeProduct: true });
    modal.onDidDismiss(data => {
      this.loadMyMainProduct();
    });
    modal.present();
  }

  public myinfo() {
    //2020-05-28 마이페이지 하단탭 제거
    // this.nav.push(MyinfoPage); 

    let myModal = this.modalCtrl.create(MyinfoPage);
    myModal.onDidDismiss(data => {
      if(this.userData) {
        if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
          this.reloadUserPoint(this.userData.snsid);
        }
        else {
          this.reloadUserPoint(this.userData.email);
        }
      }
      console.log("내정보 페이지 닫음");
      this.androidBackButton();
    });
    myModal.present();
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

  //20201125 안드로이드 백 버튼 처리
  androidBackButton() {
    if(this.platform.is('android')) {
      this.platform.registerBackButtonAction(()=>{
        this.navCtrl.parent.select(0);
      });
    }
  }

}
