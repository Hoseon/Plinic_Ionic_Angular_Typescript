import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController , NavParams, Platform } from 'ionic-angular';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import ko from 'date-fns/locale/ko';


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


lineChart: any;
//chart

valueday = { "day": "1"}


today: any = new Date();
yesterday: any = new Date((new Date()).valueOf() - 1000*60*60*24);
twoDaysAgo:any = new Date((new Date()).valueOf() - 1000*60*60*24*2);
threeDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*3);
//date count


skinbtnYear = format(this.today, 'YYYY');
skinbtnMonth = format(this.today, 'MM');
extoday = format(this.today, 'YYYY/MM/DD');
exthreeDaysAgo = format(this.threeDaysAgo, 'YYYY/MM/DD');

  constructor(public navCtrl: NavController , public navParams: NavParams, public platform: Platform  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SkinChartPage');

    this.today = format(this.today, 'MM/DD');
    this.yesterday = format(this.yesterday, 'MM/DD');
    this.twoDaysAgo = format(this.twoDaysAgo, 'MM/DD');
    this.threeDaysAgo = format(this.threeDaysAgo, 'MM/DD');


    this.lineChart = new Chart(this.lineCanvas.nativeElement, {


        type: 'line',
        data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: [ this.threeDaysAgo , this.twoDaysAgo, this.yesterday, this.today],
        datasets: [{
                      // label: format(this.today, 'MM/DD', '유분'),
                      label: '내 수분 점수',
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
                       pointHoverRadius: 5, //클릭시 원크기
                       pointHoverBackgroundColor: "#368AFF",
                       pointHoverBorderColor: "#368AFF",
                       pointHoverBorderWidth: 2, //데이터 호버크기
                       pointRadius: 3,  //데이터 포인트크기
                       pointHitRadius: 100,
                       data: [30, 35, 50, 60],
                       spanGaps: false,
                     },
                     {
                     // label: format(this.today, 'MM/DD', '유분'),
                     label: '20대 평균 수분 점수',
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
                      data: [30, 30, 35, 50],
                      spanGaps: false,
                    },
                    {
                      // 수분은 하늘이랑 파랑
                      // 유분은 노랑이랑 주황!!
                    // label: format(this.today, 'MM/DD', '유분'),
                    label: '내 유분 점수',
                    fill: false,
                     lineTension: 0.1,
                     backgroundColor: "#EDA900",
                     borderColor: "#EDA900",
                     borderCapStyle: 'butt',
                     borderDash: [],
                     borderDashOffset: 0.0,
                     borderJoinStyle: 'miter',
                     pointBorderColor: "#EDA900",
                     pointBackgroundColor: "#fff",
                     pointBorderWidth: 1,
                     pointHoverRadius: 5,
                     pointHoverBackgroundColor: "#EDA900",
                     pointHoverBorderColor: "#EDA900",
                     pointHoverBorderWidth: 2,
                     pointRadius: 3,
                     pointHitRadius: 10,
                     data: [10, 15, 10, 15],
                     spanGaps: false,
                   },
                   {
                   // label: format(this.today, 'MM/DD', '유분'),
                   label: '20대 평균 유분 점수',
                   fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#FFF136",
                    borderColor: "#FFF136",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#FFF136",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#FFF136",
                    pointHoverBorderColor: "#FFF136",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: [15, 20, 20, 15],
                    spanGaps: false,
                  }],
                },
                options: {
                  animation: {
                      duration: 5000 // general animation time
                  },
                  legend: {
                    display: false     //라벨표시
                  },
                    scales: {
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



  public selectclick(){
       console.log('ionViewDidLoad selectclick');
       this.lineChart.update();
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
