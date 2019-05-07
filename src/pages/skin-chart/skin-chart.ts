import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController , NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { format } from 'date-fns'
//import ko from 'date-fns/locale/ko'
import 'chartjs-plugin-labels';

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

@ViewChild('doughnutCanvas') doughnutCanvas;
@ViewChild('doughnutCanvas2') doughnutCanvas2;
@ViewChild('barCanvas') barCanvas;



OilChart: any;
MoistureChart: any;
barChart: any;
percentage: any;
//chart

today: any = new Date();
yesterday: any = new Date((new Date()).valueOf() - 1000*60*60*24);
twoDaysAgo:any = new Date((new Date()).valueOf() - 1000*60*60*24*2);
threeDaysAgo: any = new Date((new Date()).valueOf() - 1000*60*60*24*3);
//date count


extoday = format(this.today, 'YYYY/MM/DD')
exthreeDaysAgo = format(this.threeDaysAgo, 'YYYY/MM/DD')

  constructor(public navCtrl: NavController , public navParams: NavParams  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SkinChartPage');

    this.today = format(this.today, 'MM/DD')
    this.yesterday = format(this.yesterday, 'MM/DD')
    this.twoDaysAgo = format(this.twoDaysAgo, 'MM/DD')
    this.threeDaysAgo = format(this.threeDaysAgo, 'MM/DD')

    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
        labels: [ this.threeDaysAgo, this.twoDaysAgo, this.yesterday, this.today ],
                    datasets: [{
                        label: format(this.today, 'MM/DD'),
                        data: [90, 10, 30, 50],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
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


    this.OilChart = new Chart(this.doughnutCanvas2.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["수분", "유분"],
                datasets: [{
                    label: '# of Votes',
                    data: [30, 60],
                    backgroundColor: [
                        '#00D8FF',
                        '#FFE400'

                    ],
                    hoverBackgroundColor: [
                        "#00D8FF",
                        "#FFE400"
                    ],

                }]
            },
          options: {
            plugins: {
                labels: {
                      render: this.percentage,
                      precision: 0,
                      fontSize: 15,
                      fontColor: '#000',
                      fontStyle: 'normal',
                      textShadow: true,
                      showActualPercentages: true
                  }
              }
            }
        });


      this.MoistureChart = new Chart(this.doughnutCanvas.nativeElement, {

                type: 'doughnut',
                data: {
                    labels: ["주름","탄력"],
                    datasets: [{
                        label: '# of Votes',
                        data: [70,30],
                        backgroundColor: [
                            '#FF3636',
                            "#FFD9EC"
                        ],
                        hoverBackgroundColor: [
                            '#FFBB00',
                            "#FFD9EC"
                        ],
                    }]
                },
                options: {
                  plugins: {
                      labels: {
                        render: this.percentage,
                        precision: 0,
                        fontSize: 15,
                        fontColor: '#000',
                        fontStyle: 'normal',
                        textShadow: true,
                        showActualPercentages: true
                      }
                }
              }
        });
      }
}
