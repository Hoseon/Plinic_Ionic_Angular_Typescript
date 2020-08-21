import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, ModalController, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import { ImagesProvider } from '../../providers/images/images'
import { CommunityModifyPage } from '../community/community-modify/community-modify'
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ProductDetailPage } from '../product-detail/product-detail';

 /**
 * Generated class for the PoreSizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pore-count',
  templateUrl: 'pore-count.html',
})
export class PoreCountPage {

  left1 : any = this.makeRandom(0,100) + '%';
  left2 : any = this.makeRandom(0,100) + '%';
  left3 : any = this.makeRandom(0,100) + '%';
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  valueday = { "day": "1" };
  today: any = new Date().toISOString();
  skinbtnYear = format(this.today, 'YYYY');
  skinbtnMonth = format(this.today, 'MM');
  chartDateData = [];
  chartOilData = [];
  chartMoistureData = [];
  skinQnaData: any;
  skinQnaMainData: any;
  @ViewChild(Slides) slides: Slides;
  communityEditorBeautyLoadData: any;

  button1 : boolean = true;
  button2 : boolean = false;

  randomProduct1: any = [];
  randomProduct2: any = [];
  randomProduct: any = [
    {
      _id : '5f10208bb9769796a1efdd3a',
      brand_name : '라운드랩 (ROUND LAB)',
      big_category : '메이크업클렌저',
      small_category : '클렌징오일',
      product_name : '1025 독도 클렌징 오일',
      seller : '랄라블라',
      color_type : '',
      function : '보습, 피부진정',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20191101/1572571627647.jpg',
      product_num : 'MA100127287',
      weight : '200ml',
      price : '23,000원',
    },

    {
      _id : '5f101fc1b9769796a1ef2a79',
      brand_name : '마녀공장 (manyo)',
      big_category : '메이크업클렌저',
      small_category : '클렌징오일',
      product_name : '허브 클렌징 오일',
      seller : '올리브영',
      color_type : '',
      function : '수분공급, 저자극, 피부결정돈',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/product/20200529/1590729560351.jpg',
      product_num : 'MA100078335',
      weight : '200ml',
      price : '29,000원',
    },

    {
      _id : '5f101fb7b9769796a1ef24a3',
      brand_name : '에뛰드 (ETUDE)',
      big_category : '메이크업클렌저',
      small_category : '클렌징오일',
      product_name : '리얼아트 클렌징 오일 모이스처',
      seller : '',
      color_type : '리필(10,800원 / 185ml / 온라인전용)',
      function : '수분공급',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20191101/1572571627647.jpg',
      product_num : 'MA100076763',
      weight : '185ml',
      price : '13,800원',
    },

    {
      _id : '5f10201eb9769796a1ef663f',
      brand_name : '스킨천사 (SKIN1004)',
      big_category : '페이스마스크',
      small_category : '워시오프팩',
      product_name : '좀비팩 & 페이스리프팅 엑티베이터 키트',
      seller : '랄라블라',
      color_type : '',
      function : '각질관리, 모공관리, 보습, 유수분조절, 저자극, 주름개선, 피부결정돈, 피부탄력, 피부투명',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20170721/1500620716913.png',
      product_num : 'PA100094403',
      weight : '2g*8 + 3.5ml*8',
      price : '35,000원',
    },

    {
      _id : '5f102089b9769796a1efd78b',
      brand_name : '유리피부 (YURIPIBU)',
      big_category : '메이크업클렌저',
      small_category : '클렌징오일',
      product_name : '그란떼 클렌징 오일',
      seller : '',
      color_type : '',
      function : '딥클렌징, 수분공급, 저자극, 피부진정',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20191002/1569976815403.jpg',
      product_num : 'MA100125769',
      weight : '300ml',
      price : '36,000원',
    },

    {
      _id : '5f10204fb9769796a1ef9c90',
      brand_name : '셀퓨전씨 (Cell Fusion C)',
      big_category : '페이셜클렌저',
      small_category : '버블클렌저',
      product_name : '트리악 포어 딜리트 버블 팩',
      seller : '올리브영',
      color_type : '',
      function : '딥클렌징, 저자극',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20180720/1532064724723.png',
      product_num : 'PA100109414',
      weight : '5g*12',
      price : '13,000원',
    },

    {
      _id : '5f101f87b9769796a1eef1f9',
      brand_name : '시드물 (SIDMOOL)',
      big_category : '페이셜클렌저',
      small_category : '클렌징폼',
      product_name : '닥터갈라톡 갈라톡사이드 진정 모공 폼클렌징',
      seller : '',
      color_type : '',
      function : '보습, 수분공급, 저자극, 피부진정',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20170817/1502961749672.png',
      product_num : 'PA100038365',
      weight : '150ml',
      price : '17,900원',
    },
  ]
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public images: ImagesProvider,
    public modalCtrl : ModalController,
    private themeableBrowser: ThemeableBrowser,
    public toastCtrl : ToastController,
    ) {
  }

  async ionViewDidLoad() {
    await this.lottoNum();
    this.skinQnaMainLoad();
    this.communityEditorBeautyLoad();
    console.log('ionViewDidLoad PoreSizePage');
  }

  async ionViewDidEnter(){
     ////처음 진입시 현재 월로 조회 되도록
     this.skinbtnYear = format(new Date(), 'YYYY');
     this.skinbtnMonth = format(new Date(), 'MM');
     var e = this.skinbtnYear + "년" + this.skinbtnMonth;
     
     await this.yearmonthselect(e);
 
     await this.initChart();
    //  await this.initChart2();
     console.log('ionViewDidEnter SkinChekChartPage');
  }

  private makeRandom(min, max) {
        var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandVal;
  }

  yearmonthselect(e) {
    var year = e.substr(0, 4);
    var month = e.substr(5, 2);
    var date = year + "-" + month;
    // console.log(this.skinScoreData);
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
        },{
          // label: format(this.today, 'MM/DD', '유분'),
          label: '30대 평균 수분 점수',
          fill: false,
          lineTension: 0,
          backgroundColor: "#5c59b6",
          borderColor: "#5c59b6",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#5c59b6",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#5c59b6",
          pointHoverBorderColor: "#5c59b6",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 20,
          data: [75, 60, -60, 30, 20 ,60 ,80, 45, -11, 18
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

  public skinQnaLoad() {
    this.images.skinQnaLoad().subscribe(data => {
      this.skinQnaData = data;
    });
  }

  public skinQnaMainLoad() {
    this.images.skinQnaMainLoad().subscribe(data => {
      this.skinQnaMainData = data;
    });
  }

  public community_qna_modify(id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, { id: id, mode: 'qna' });
    myModal.onDidDismiss(data => {
      // this.authService.setUserStoragetab(1);
      // this.ionViewWillEnter();
    });
    myModal.present();
  }

  public communityEditorBeautyLoad() {
    this.images.communityEditorBeautyLoad().subscribe(data => {
      this.communityEditorBeautyLoadData = data;
    });
  }

  openBrowser_android(url, title, id) {

    this.images.communityBeautyViewsUpdate(id).subscribe(data => {
      // this.communityBeautyLoadData = data;
    });

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#FFFFFF',
        showPageTitle: true,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'right',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'right',
        event: 'forwardPressed'
      },
      // customButtons: [
      //   {
      //     wwwImage: 'assets/img/like/like.png',
      //     imagePressed: 'assets/img/like/dislike.png',
      //     align: 'right',
      //     event: 'sharePressed'
      //   }
      // ],
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
      console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    })

  }

  toast() {
    let toast = this.toastCtrl.create({
      message: '좋아요!',
      duration: 5000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  toggle_Btn(btn) {
    if(btn === 'btn1') {
      this.button1 = true;
      this.button2 = false;
    } else if (btn === 'btn2') {
      this.button1 = false;
      this.button2 = true;
    }
  }

  lottoNum () {
    let n = Math.floor(Math.random() * 6) + 1;

    if (this.randomProduct2.length < 4 ) {
      if(this.randomProduct1.indexOf(n) < 0) {
        this.randomProduct1.push(n);
        this.randomProduct2.push(this.randomProduct[n]);
      }
      return this.lottoNum();
    } else {
      return this.randomProduct2;
    }
  }

  product_detail(id) {
    let modal = this.modalCtrl.create(ProductDetailPage, { Product_Num: id });
    modal.onDidDismiss(data => {
      // this.ionViewDidEnter();
      console.log("화장품 상세정보 페이지 닫힘");
    });
    modal.present();
  }

}
