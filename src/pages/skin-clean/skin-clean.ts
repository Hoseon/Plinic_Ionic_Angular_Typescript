import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, ModalController, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images'
import { CommunityModifyPage } from '../community/community-modify/community-modify'
import { ProductDetailPage } from '../product-detail/product-detail'
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { SungwooBeautyPage } from '../sungwoo-beauty/sungwoo-beauty'; 

 /**
 * Generated class for the SkinCleanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-clean',
  templateUrl: 'skin-clean.html',
})
export class SkinCleanPage {
  movieData: any;
  youTubeArrayData: Array<any>  = new Array<any>();
  videoDetailData: Array<any>  = new Array<any>();
  faceText: any; //볼 부위 
  faceImgUrl: any;// 볼
  faceText2: any; //이마
  faceImgUrl2: any; //이마

  worstFaceText: any;
  worstFaceImgUrl: any;

  worstFaceText2: any;
  worstFaceImgUrl2: any;

  bestFaceText: any;
  bestFaceImgUrl: any;

  bestFaceText2: any;
  bestFaceImgUrl2: any;

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

  image1 : boolean = true;
  image2 : boolean = false;
  image3 : boolean = false;

  image1CheekUrl : any = 'http://ec2-3-35-11-19.ap-northeast-2.compute.amazonaws.com/media/images/';
  image2CheekUrl : any = 'http://ec2-3-35-11-19.ap-northeast-2.compute.amazonaws.com/media/images/';
  image3CheekUrl : any = 'http://ec2-3-35-11-19.ap-northeast-2.compute.amazonaws.com/media/images/';

  image1ForeHeadUrl : any = 'http://ec2-3-35-11-19.ap-northeast-2.compute.amazonaws.com/media/images/';
  image2ForeHeadUrl : any = 'http://ec2-3-35-11-19.ap-northeast-2.compute.amazonaws.com/media/images/';
  image3ForeHeadUrl : any = 'http://ec2-3-35-11-19.ap-northeast-2.compute.amazonaws.com/media/images/';

  randomProduct1: any = [];
  randomProduct2: any = [];
  randomProduct: any = [
    {
      _id : '5f101ef3b9769796a1ee85ed',
      brand_name : '바이오더마 (BIODERMA)',
      big_category : '메이크업클렌저',
      small_category : '클렌징워터',
      product_name : '센시비오 H2O',
      seller : '시코르, 올리브영, 롭스',
      color_type : '100ml / 250ml / 500ml / 850ml',
      function : '수분공급, 저자극, 피부결정돈, 피부진정',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20180323/1521783853442.png',
      product_num : 'MA100000958',
      weight : '250ml',
      price : '25,000원',
    },

    {
      _id : '5f102085b9769796a1efd2c7',
      brand_name : '비플레인 (BE PLAIN)',
      big_category : '페이셜클렌저',
      small_category : '클렌징폼',
      product_name : '녹두 약산성 클렌징폼',
      seller : '',
      color_type : '',
      function : '보습, 수분공급, 저자극, 피부진정',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20190808/1565234101372.png',
      product_num : 'PA100124510',
      weight : '80ml',
      price : '16,000원',
    },

    {
      _id : '5f102083b9769796a1efce4c',
      brand_name : '배드스킨 (BADSKIN)',
      big_category : '메이크업클렌저',
      small_category : '클렌징오일',
      product_name : '히알루로닉 딥 포어 클렌징오일',
      seller : '',
      color_type : '',
      function : '딥클렌징, 모공관리, 보습, 저자극, 피부진정',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20190627/1561623375120.png',
      product_num : 'MA100123323',
      weight : '144ml',
      price : '23,000원',
    },

    {
      _id : '5f10207eb9769796a1efc2f0',
      brand_name : '셀비엔 (CELLBN)',
      big_category : '에센스/세럼',
      small_category : '수분에센스',
      product_name : '갈락토미세스 나이아신 에센스',
      seller : '',
      color_type : '',
      function : '미백, 보습, 유수분조절, 저자극, 주름개선',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20190415/1555306150452.png',
      product_num : 'NG100120271',
      weight : '150ml',
      price : '17,000원',
    },

    {
      _id : '5f101f37b9769796a1eed606',
      brand_name : '폰즈 (PONDS)',
      big_category : '포인트리무버',
      small_category : '',
      product_name : '클리어 훼이스 스파 립앤아이 메이크업 리무버',
      seller : '올리브영, 랄라블라, 롭스',
      color_type : '120ml / 300ml',
      function : '수분공급',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20150106/1420508873321.jpg',
      product_num : 'PA100023465',
      weight : '120ml',
      price : '9,900원',
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
      _id : '5f101f39b9769796a1eedb40',
      brand_name : '시드물 (SIDMOOL)',
      big_category : '각질케어',
      small_category : '필링젤',
      product_name : '녹차 필링젤',
      seller : '롭스',
      color_type : '',
      function : '수분공급, 영양공급, 피부유연, 피부진정, 피지조절',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20150123/1421987488669.jpg',
      product_num : 'GA100024890',
      weight : '120ml',
      price : '4,800원',
    },

    {
      _id : '5f101f39b9769796a1eedb40',
      brand_name : '앰플엔 (AMPLEN)',
      big_category : '에센스/세럼',
      small_category : '수분에센스',
      product_name : '히알루론샷 앰플',
      seller : '',
      color_type : '30ml / 100ml',
      function : '고보습, 보습, 수분공급, 앰플, 윤기부여, 피부활력',
      ingredient : '',
      image_url : 'https://d9vmi5fxk1gsw.cloudfront.net/home/glowmee/upload/20170425/1493104688736.png',
      product_num : 'NG100090746',
      weight : '30ml',
      price : '29,000원',
    },
  ]

  randomTip1 : any =[];
  randomTip2 : any =[];
  randomTip : any = [
    {
      posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=27605449&memberNo=45335922&searchKeyword=%23%EC%84%B8%EC%95%88&searchRank=2",
      body : "피부에 도움이되는 좋은 습관 TOP5",
      _id : "5ec4c9c94f693c262a959c59",
      filename : "image-1592966037608",
      views : "88"
    },
    {
      posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=27921248&memberNo=45335922",
      body : "얼굴이 작아지는 마사지",
      _id : "5e8ed397fcc124203fe306e6",
      filename : "image-1592965617760",
      views : "98"
    },
    {
      posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=28663331&memberNo=45335922",
      body : "튼 살 예방 및 치료에 좋은 음식 TOP5",
      _id : "5efaddadd24bad43fc440b56",
      filename : "image-1593499053023",
      views : "14"
    },
    {
      posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=28919373&memberNo=45335922",
      body : "장마철 피부 관리 방법 TOP5",
      _id : "5f1fe383001c2849fd2f637f",
      filename : "image-1595925376080",
      views : "15"
    },
    {
      posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=29068090&memberNo=45335922",
      body : "모공 관리 방법 TOP5!",
      _id : "5f33b440df245a516e1a1aac",
      filename : "image-1597224000351",
      views : "8"
    },
  ]

  skinAnalyData: any;
  userData: any;
  skinCleanCheekScore: any;
  skinCleanForeHeadScore: any;

  diffValue: any = [];
  diffValueDate: any = [];

  diffForeheadValue: any = [];
  diffForeheadValueDate: any = [];

  bestValue: any;
  worstValue: any;

  bestForeheadValue: any;
  worstForeheadValue: any;

  isDiff: boolean = false;

  constructor(
    public auth: AuthService,
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
    this.getAllBeautyMovie();
    
    this.navParams.get('userData') ? this.userData = this.navParams.get('userData') : this.userData = "";
    this.navParams.get('skinAnalyData') ? this.skinAnalyData = this.navParams.get('skinAnalyData') : this.skinAnalyData = "";

    if(this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].diff.length > 0) {
      this.isDiff = true;
    } else {
      this.isDiff = false;
    }


    if(this.isDiff) {
        //볼
      for(let i = 1; i < this.skinAnalyData.cheek.length; i++){
        //월별 조건 추가
        if(this.skinbtnMonth ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
          this.diffValue.push({
            value : this.skinAnalyData.cheek[i].diff[0].value,
            date: this.skinAnalyData.cheek[i].input[0].upload_date
          })  
        }
      }
      //볼 베스트, 워스트 값 구하기
      this.worstValue = Math.min.apply(Math, this.diffValue.map(function(o) { return o.value }));
      this.diffValue.forEach(element => {
        if(element.value == this.worstValue) {
          this.worstValue = {
            value : Number(element.value).toFixed(1),
            date : element.date
          }
          //검출 로직
          if(this.worstValue.value < 15) {
            this.worstFaceText = "좋음";
            this.worstFaceImgUrl = "assets/img/skin-chek-chart/face_good.png";
          } else if (this.worstValue.value >= 15 && this.worstValue.value <= 30) {
            this.worstFaceText = "보통";
            this.worstFaceImgUrl = "assets/img/skin-chek-chart/face_normal.png";
          } else if (this.worstValue.value > 31) {
            this.worstFaceText = "나쁨";
            this.worstFaceImgUrl = "assets/img/skin-chek-chart/face_bad.png";
          }
        }
      });
      this.bestValue = Math.max.apply(Math, this.diffValue.map(function(o) { return o.value }));
      this.diffValue.forEach(element => {
        if(element.value == this.bestValue) {
          this.bestValue = {
            value : Number(element.value).toFixed(1),
            date : element.date
          }
          if(this.bestValue.value < 15) {
            this.bestFaceText = "좋음";
            this.bestFaceImgUrl = "assets/img/skin-chek-chart/face_good.png";
          } else if (this.bestValue.value >= 15 && this.bestValue.value <= 30) {
            this.bestFaceText = "보통";
            this.bestFaceImgUrl = "assets/img/skin-chek-chart/face_normal.png";
          } else if (this.bestValue.value > 31) {
            this.bestFaceText = "나쁨";
            this.bestFaceImgUrl = "assets/img/skin-chek-chart/face_bad.png";
          }

        }
      });

      //이마 베스트, 워스트 값 구하기
      for(let i = 1; i < this.skinAnalyData.forehead.length; i++){
        //월별 조건 추가
        if(this.skinbtnMonth ===  this.skinAnalyData.forehead[i].input[0].upload_date.substr(5,2)) {
          this.diffForeheadValue.push({
            value : this.skinAnalyData.forehead[i].diff[0].value,
            date: this.skinAnalyData.forehead[i].input[0].upload_date
          })  
        }
      }


      //이마 베스트, 워스트 값 구하기
      this.worstForeheadValue = Math.min.apply(Math, this.diffForeheadValue.map(function(o) { return o.value }));
      this.diffForeheadValue.forEach(element => {
        if(element.value == this.worstForeheadValue) {
          this.worstForeheadValue = {
            value : Number(element.value).toFixed(1),
            date : element.date
          }
          if(this.worstForeheadValue.value < 15) {
            this.worstFaceText2 = "좋음";
            this.worstFaceImgUrl2 = "assets/img/skin-chek-chart/face_good.png";
          } else if (this.worstForeheadValue.value >= 15 && this.worstForeheadValue.value <= 30) {
            this.worstFaceText2 = "보통";
            this.worstFaceImgUrl2 = "assets/img/skin-chek-chart/face_normal.png";
          } else if (this.worstForeheadValue.value > 31) {
            this.worstFaceText2 = "나쁨";
            this.worstFaceImgUrl2 = "assets/img/skin-chek-chart/face_bad.png";
          }
        }
      });
      this.bestForeheadValue = Math.max.apply(Math, this.diffForeheadValue.map(function(o) { return o.value }));
      this.diffForeheadValue.forEach(element => {
        if(element.value == this.bestForeheadValue) {
          this.bestForeheadValue = {
            value : Number(element.value).toFixed(1),
            date : element.date
          }
          if(this.bestForeheadValue.value < 15) {
            this.bestFaceText2 = "좋음";
            this.bestFaceImgUrl2 = "assets/img/skin-chek-chart/face_good.png";
          } else if (this.bestForeheadValue.value >= 15 && this.bestForeheadValue.value <= 30) {
            this.bestFaceText2 = "보통";
            this.bestFaceImgUrl2 = "assets/img/skin-chek-chart/face_normal.png";
          } else if (this.bestForeheadValue.value > 31) {
            this.bestFaceText2 = "나쁨";
            this.bestFaceImgUrl2 = "assets/img/skin-chek-chart/face_bad.png";
          }
        }
      });

      
    
      this.skinCleanCheekScore = (this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].diff[0].value).toFixed(1);
      if(this.skinCleanCheekScore < 15) {
        this.faceText = "좋음";
        this.faceImgUrl = "assets/img/skin-chek-chart/face_good.png";
      } else if (this.skinCleanCheekScore >= 15 && this.skinCleanCheekScore <= 30) {
        this.faceText = "보통";
        this.faceImgUrl = "assets/img/skin-chek-chart/face_normal.png";
      } else if (this.skinCleanCheekScore > 31) {
        this.faceText = "나쁨";
        this.faceImgUrl = "assets/img/skin-chek-chart/face_bad.png";
      }
      // this.skinCleanCheekScore > 0 ? this.skinCleanCheekScore = "+" + String(this.skinCleanCheekScore) : this.skinCleanCheekScore;
      
      
      this.skinCleanForeHeadScore = (this.skinAnalyData.forehead[this.skinAnalyData.forehead.length-1].diff[0].value).toFixed(1);
      if(this.skinCleanForeHeadScore < 15) {
        this.faceText2 = "좋음";
        this.faceImgUrl2 = "assets/img/skin-chek-chart/face_good.png";
      } else if (this.skinCleanForeHeadScore >= 15 && this.skinCleanForeHeadScore <= 30) {
        this.faceText2 = "보통";
        this.faceImgUrl2 = "assets/img/skin-chek-chart/face_normal.png";
      } else if (this.skinCleanForeHeadScore > 31) {
        this.faceText2 = "나쁨";
        this.faceImgUrl2 = "assets/img/skin-chek-chart/face_bad.png";
      }
      // this.skinCleanForeHeadScore > 0 ? this.skinCleanForeHeadScore = "+" + String(this.skinCleanForeHeadScore) : this.skinCleanForeHeadScore;

      this.image3CheekUrl = this.image3CheekUrl.concat(this.skinAnalyData.firstcheek);
      this.image3ForeHeadUrl = this.image3ForeHeadUrl.concat(this.skinAnalyData.firstforhead);
      this.image2CheekUrl = this.image2CheekUrl.concat(this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].input[0].filename);
      this.image2ForeHeadUrl = this.image2ForeHeadUrl.concat(this.skinAnalyData.forehead[this.skinAnalyData.forehead.length-1].input[0].filename);
      this.image1CheekUrl = this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].diff[0].output_image;
      this.image1ForeHeadUrl = this.skinAnalyData.forehead[this.skinAnalyData.forehead.length-1].diff[0].output_image;
    }
    
    this.lottoNum();
    this.lottoTip();
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
 
    //  await this.initChart();
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
    this.diffValue = [];
    this.diffForeheadValue = [];


    for(let i = 1; i < this.skinAnalyData.cheek.length; i++){
      //월별 조건 추가
      if(month ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
        this.diffValue.push({
          value : this.skinAnalyData.cheek[i].diff[0].value,
          date: this.skinAnalyData.cheek[i].input[0].upload_date
        })  
      }
    }

    this.worstValue = Math.min.apply(Math, this.diffValue.map(function(o) { return o.value }));
    this.diffValue.forEach(element => {
      if(element.value == this.worstValue) {
        this.worstValue = {
          value : Number(element.value).toFixed(1),
          date : element.date
        }
      }
    });
    this.bestValue = Math.max.apply(Math, this.diffValue.map(function(o) { return o.value }));
    this.diffValue.forEach(element => {
      if(element.value == this.bestValue) {
        this.bestValue = {
          value : Number(element.value).toFixed(1),
          date : element.date
        }
      }
    });

    //이마 베스트, 워스트 값 구하기
    for(let i = 1; i < this.skinAnalyData.forehead.length; i++){
      //월별 조건 추가
      if(month ===  this.skinAnalyData.forehead[i].input[0].upload_date.substr(5,2)) {
        this.diffForeheadValue.push({
          value : this.skinAnalyData.forehead[i].diff[0].value,
          date: this.skinAnalyData.forehead[i].input[0].upload_date
        })  
      }
    }


    //이마 베스트, 워스트 값 구하기
    this.worstForeheadValue = Math.min.apply(Math, this.diffForeheadValue.map(function(o) { return o.value }));
    this.diffForeheadValue.forEach(element => {
      if(element.value == this.worstForeheadValue) {
        this.worstForeheadValue = {
          value : Number(element.value).toFixed(1),
          date : element.date
        }
      }
    });
    this.bestForeheadValue = Math.max.apply(Math, this.diffForeheadValue.map(function(o) { return o.value }));
    this.diffForeheadValue.forEach(element => {
      if(element.value == this.bestForeheadValue) {
        this.bestForeheadValue = {
          value : Number(element.value).toFixed(1),
          date : element.date
        }
      }
    });

  }

  monthdate: any[] = [
    {
      "day": this.skinbtnYear + "년01월"
    },
    {
      "day": this.skinbtnYear + "년02월"
    },
    {
      "day": this.skinbtnYear + "년03월"
    },
    {
      "day": this.skinbtnYear + "년04월"
    },
    {
      "day": this.skinbtnYear + "년05월"
    },
    {
      "day": this.skinbtnYear + "년06월"
    },
    {
      "day": this.skinbtnYear + "년07월"
    },
    {
      "day": this.skinbtnYear + "년08월"
    },
    {
      "day": this.skinbtnYear + "년09월"
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

  lottoTip () {
    let z = Math.floor(Math.random() * 5) + 0;

    if (this.randomTip2.length < 5 ) {
      if(this.randomTip1.indexOf(z) < 0) {
        this.randomTip1.push(z);
        this.randomTip2.push(this.randomTip[z]);
      }
      return this.lottoTip();
    } else {
      console.log(this.randomTip2);
      return this.randomTip2;
    }
  }

  image_toggle(toggle) {
    switch(toggle) { 
      case 'image1' : this.image1 = true; this.image2 = false; this.image3 = false; break;
      case 'image2' : this.image1 = false; this.image2 = true; this.image3 = false; break;
      case 'image3' : this.image1 = false; this.image2 = false; this.image3 = true; break;
      default : this.image1 = true; this.image2 = false; this.image3 = false;
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

  getAllBeautyMovie() {
    this.images.getBeautyMovie().subscribe(data=> {
      this.movieData = data
      if(data) {
        for(let i = 0; i < data.length; i++) {
          this.youTubeArrayData[i] = data[i].items[0];
          this.getOneMovieData(data[i].items[0].id, i);
        }
      }
    })
  }

  getOneMovieData(movieId, index) {
    this.images.getOneBeautyMovie(movieId).subscribe(data=> {
      this.videoDetailData[index] = data;
    });  
  }

  openMoviePage(youTubeData) {
    let myModal = this.modalCtrl.create(SungwooBeautyPage, { youTubeData: youTubeData});
    myModal.onDidDismiss(data => {
      // this.authService.setUserStoragetab(2);
      // this.ionViewWillEnter();
    });
    myModal.present();
  }

  goToCommunityMovie() {
    this.auth.setUserStoragetab(2);
    this.navCtrl.parent.select(3)
  }

  goToCommunity() {
    this.auth.setUserStoragetab(0);
    this.navCtrl.parent.select(3)
  }

  goToCommunityGomin() {
    this.auth.setUserStoragetab(1);
    this.navCtrl.parent.select(3)
  }

  goToProduct() {
    this.navCtrl.parent.select(2)
  }
 
  
}
