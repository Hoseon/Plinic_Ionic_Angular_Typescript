import { Component, ViewChild, Inject} from '@angular/core';
import { IonicPage, NavController , NavParams, Platform} from 'ionic-angular';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import ko from 'date-fns/locale/ko';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../providers/auth-service';

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

valueday = { "day": "1"}


today: any = new Date();
yesterday: any = new Date((new Date()).valueOf() - 1000*60*60*24);
twoDaysAgo:any = new Date((new Date()).valueOf() - 1000*60*60*24*2);
threeDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*3);
fourDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*4);
fiveDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*5);
sixDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*6);
sevenDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*7);
aightDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*8);
nineDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*9);
lastDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*31);


//date count

skinbtnYear = format(this.today, 'YYYY');
skinbtnMonth = format(this.today, 'MM');

segment_status:any;
segment_moisture : any;

extoday =  format(this.today, 'YYYY.MM.DD');
exthreeDaysAgo = format(this.threeDaysAgo, 'YYYY.MM.DD');


//문진표
all_moisture_score: number = 0;
all_oil_score: number = 0;
all_first_moisture_score: number = 0;
all_first_oil_score: number = 0;
skin_diagnose_first_check: boolean;

  constructor(public navCtrl: NavController , public navParams: NavParams, public platform: Platform, @Inject(DOCUMENT) document, public auth: AuthService) {
    this.segment_moisture="수분"

   console.log ("ddddddddddddddddddddddd", this.threeDaysAgo)
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
        this.all_moisture_score = items;
        console.log("all_moisture_score" + this.all_moisture_score);
        //console.log("items" + items);
  });
}

  public skin_oil_score() {
    this.auth.getUserStoragediagnose_oil().then(items => {
        this.all_oil_score = items;
        console.log("all_oil_score" + this.all_oil_score);
        //console.log("items" + items);
  });
}

public skin_first_moisture_score() {
  this.auth.getUserStoragediagnose_first_moisture().then(items => {
      this.all_first_moisture_score = items;
      console.log("all_first_moisture_score" + this.all_first_moisture_score);
      //console.log("items" + items);
});
}

public skin_first_oil_score() {
  this.auth.getUserStoragediagnose_first_oil().then(items => {
      this.all_first_oil_score = items;
      console.log("all_first_oil_score" + this.all_first_oil_score);
      //console.log("items" + items);
});
}

yearmonthselect(e){
  console.log("yearmonthselect===============" + e);
}

segmentChanged(ev: any) {
  if(ev.value==='수분'){
  console.log('Segment changed111111111==============', ev.value);
  this.segment_status==true;
  document.getElementById("moisture").style.display = "block";
  document.getElementById("oil").style.display = "none";
}
 else{
   console.log('Segment changed2222222222==============', ev.value);
  this.segment_status==false;
  document.getElementById("oil").style.display = "block";
  document.getElementById("moisture").style.display = "none";
 }
}


ionViewDidLoad() {
  this.skin_first_check();
  this.skin_first_moisture_score();
  this.skin_first_oil_score();
  this.skin_oil_score();
}


public selectclick(){
     console.log('ionViewDidLoad selectclick');
     this.lineChart.update();
}

  ionViewDidEnter() {
    this.skin_moisture_score();
    console.log('ionViewDidLoad SkinChartPage');
    console.log('all_moisture_score=====================' + this.all_moisture_score);
    document.getElementById("moisture").style.display = "block";
    document.getElementById("oil").style.display = "none";


    this.today = format(this.today, 'DD');
    this.yesterday = format(this.yesterday, 'DD');
    this.twoDaysAgo = format(this.twoDaysAgo, 'DD');
    this.threeDaysAgo = format(this.threeDaysAgo, 'DD');
    this.lastDaysAgo = format(this.lastDaysAgo, '.DD');

    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {


        type: 'line',
        data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: [
          "01","03","04","05","11","14","15","16","17","18","27","29","30","31"
        ],
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
                       data: [
                         this.all_moisture_score='' ?  this.all_moisture_score : this.all_first_moisture_score,
                         this.all_moisture_score='' ?  this.all_moisture_score : this.all_first_moisture_score,
                              45, 40,
                              40, 45, 40, 40,
                              40, 25, 30, 45,
                              40, 35, 40, 40,
                              40, 25, 30, 35,
                              30, 25, 35, 35,
                              30, 25, 45, 40, 45 ,50, 50


                ],
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
                        30, 35, 20, 30,
                        30, 25, 30, 30,
                        23, 35, 34, 34,
                        34, 22, 31, 33,
                        32, 33, 33, 23,
                        33, 34, 34, 30,
                        25, 35, 40, 45, 40, 40, 40

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
                            beginAtZero:true,
                              max: 100,
                              min: 0
                          }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                              beginAtZero:true,
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
        labels: [
                  "01","03","04","05","11","14","15","16","17","18","27","29","30","31"
 ],
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
                     data: [
                       this.all_moisture_score='' ?  this.all_oil_score : this.all_first_oil_score,
                       this.all_moisture_score='' ?  this.all_oil_score : this.all_first_oil_score,
                      15, 25,
                       15, 23, 34, 33,
                       23, 32, 25, 32,
                       34, 15, 23, 33,
                       14, 24, 24, 22,
                       30, 25, 35, 30,
                       35, 35, 30, 25, 30, 30, 35

                     ],
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
                    25, 30, 20, 25,
                    30, 22, 34, 23,
                    32, 34, 34, 32,
                    21, 32, 23, 22,
                    23, 34, 34, 23,
                    20, 25, 23, 22,
                    20, 25, 23, 25, 27, 25, 23
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
                            beginAtZero:true,
                              max: 100,
                              min: 0
                          }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                              beginAtZero:true,
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



monthdate: any[] = [
  {
    "day": "2019년1월"
  },
  {
    "day": "2019년2월"
  },
  {
    "day": "2019년3월"
  },
  {
    "day": "2019년4월"
  },
  {
    "day": "2019년5월"
  },
  {
    "day": "2019년6월"
  },
  {
    "day": "2019년7월"
  },
  {
    "day": "2019년8월"
  },
  {
    "day": "2019년9월"
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
