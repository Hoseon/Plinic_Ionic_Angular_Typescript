import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, ModalController, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import { ImagesProvider } from '../../providers/images/images'
import { AuthService } from '../../providers/auth-service';
import { CommunityModifyPage } from '../community/community-modify/community-modify'
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ProductDetailPage } from '../product-detail/product-detail';
import { SungwooBeautyPage } from '../sungwoo-beauty/sungwoo-beauty';

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
  movieData: any;
  youTubeArrayData: Array<any>  = new Array<any>();
  videoDetailData: Array<any>  = new Array<any>();
  skinAnalyAvgComparePoreCount: any;
  skinAnalyAvgComparePoreCount2: any;
  skinAnalyPoreSizeAvg: any;
  skinAnalyPoreSizeAvg2: any;
  skinAnalyPoreBeforeSizeAvg: any;
  skinAnalyPoreBeforeSizeAvg2: any;
  skinAnalyPoreCompareSize: any;
  skinAnalyPoreCompareSize2: any;
  skinAnalyPoreCount: any;
  skinAnalyPoreCount2: any;
  skinAnalyPoreCurrentCount: any;
  skinAnalyPoreCurrentCount2: any;
  skinAnalyPoreBeforeCount: any;
  skinAnalyPoreBeforeCount2: any;
  skinAnalyPoreCompareCount: any;
  skinAnalyPoreCompareCount2: any;
  skinAnalyAvgCompare: any; //00대 성별 평균 대비
  skinAnalyAvgCompare2: any; //00대 성별 평균 대비
  skinTone: any;
  skinForeheadTone: any;

  cheekImages: Array<any> = new Array<any>();
  foreheadImages: Array<any> = new Array<any>();

  userData: any;
  skinAnalyData: any;
  ageRange: any;

  avgCheekPoreSize: any;
  avgCheekPoreCount: any;
  avgForeHeadPoreSize: any;
  avgForeHeadPoreCount: any;
  mogongSize: any;
  mogongForeheadSize: any;

  left1 : any;
  left2 : any;
  left3 : any;
  leftForehead1 : any;
  leftForehead2 : any;
  leftForehead3 : any;
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

  randomTip1 : any =[];
  randomTip2 : any =[];
  randomTip : any = [
    {"_id":{"$oid":"600531eefacefaaa1c4a5c0d"},"views":12,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[스킨노트] 넓어진 모공관리법 TOP 5","midtext":"거친 피부결, 넓어진 모공... 관리하는 방법 다섯가지!","posturl":"http://naver.me/G2h1hCgG","filename":"image-1611640283602","originalName":"210118_13.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":28,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600faddb575093ac05748fab"}}],"tabLocation":[{"tip":true,"hit":false,"new":false,"_id":{"$oid":"600faddb575093ac05748fac"}}],"comments":[],"createdAt":{"$date":"2021-01-18T06:59:58.771Z"},"created":{"$date":"2021-01-18T06:59:58.771Z"},"__v":0,"seq":1,"updatedAt":{"$date":"2021-01-26T05:51:23.709Z"}},
    {"_id":{"$oid":"600526d3e17bdaa9c5df8364"},"views":17,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[스킨노트] 미세먼지 단계별 클렌징","midtext":"피부에 해로운 미세먼지! 올바른 클렌징과 생활습관 알기","posturl":"http://naver.me/FdscWH4k","filename":"image-1611640370097","originalName":"210118_10.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":26,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":false,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600fae32575093ac05748faf"}}],"tabLocation":[{"tip":true,"hit":false,"new":false,"_id":{"$oid":"600fae32575093ac05748fb0"}}],"comments":[],"createdAt":{"$date":"2021-01-18T06:12:35.723Z"},"created":{"$date":"2021-01-18T06:12:35.723Z"},"__v":0,"updatedAt":{"$date":"2021-01-26T05:52:50.334Z"},"seq":1},
    {"_id":{"$oid":"600519dae17bdaa9c5df8346"},"views":9,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[스킨노트] 블랙헤드 제거_최종본!","midtext":"블랙헤드 잘 제거하고 모공 줄이는 법, 팩트를 말하다!","posturl":"http://naver.me/FJBaeduc","filename":"image-1610947311788","originalName":"210118_6.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":22,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60051aefe17bdaa9c5df8349"}}],"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"60051aefe17bdaa9c5df834a"}}],"comments":[],"createdAt":{"$date":"2021-01-18T05:17:14.702Z"},"created":{"$date":"2021-01-18T05:17:14.702Z"},"__v":0,"updatedAt":{"$date":"2021-01-18T05:21:51.883Z"},"seq":1},
    {"_id":{"$oid":"6004f176c3ae02a956f129ff"},"views":20,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[스킨노트] 에디터 홈케어 일기 1","midtext":"플리닉 에디터 '도도'의 4주 플리닉 프로젝트 시작!","posturl":"http://naver.me/5bXWSFKm","filename":"image-1611640476218","originalName":"210118_1.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":16,"showLocation":[{"home":true,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600fae9c575093ac05748fb7"}}],"tabLocation":[{"tip":true,"hit":false,"new":false,"_id":{"$oid":"600fae9c575093ac05748fb8"}}],"comments":[],"createdAt":{"$date":"2021-01-18T02:24:54.909Z"},"created":{"$date":"2021-01-18T02:24:54.909Z"},"__v":0,"seq":2,"updatedAt":{"$date":"2021-01-26T05:54:36.320Z"}},
    {"_id":{"$oid":"5f292cad3425774b4fa86795"},"views":69,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트] 여드름 피부관리법 TOP5","midtext":"여드름과 뾰루지를 해결해주는 피부관리법 다섯가지","posturl":"http://naver.me/GpP8P4BY","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":86,"filename":"image-1611640493166","originalName":"210118_12.jpg","comments":[],"createdAt":{"$date":"2020-08-04T09:38:53.236Z"},"created":{"$date":"2020-08-04T09:38:53.236Z"},"__v":2,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600faead575093ac05748fb9"}}],"visible":true,"tabLocation":[{"tip":true,"hit":false,"new":false,"_id":{"$oid":"600faead575093ac05748fba"}}],"updatedAt":{"$date":"2021-01-26T05:54:53.311Z"},"seq":1},
    {"_id":{"$oid":"60052a19e17bdaa9c5df8366"},"views":12,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 연예인 건성피부관리법","midtext":"걸그룹 시크릿 '전효성'님의 건성피부 스킨 케어 루틴은?","posturl":"http://naver.me/xor75HKs","filename":"image-1610951233778","originalName":"210118_11.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":27,"showLocation":null,"tabLocation":[{"tip":false,"hit":true,"new":true,"_id":{"$oid":"60052a41e17bdaa9c5df8368"}}],"comments":[],"createdAt":{"$date":"2021-01-18T06:26:33.674Z"},"created":{"$date":"2021-01-18T06:26:33.674Z"},"__v":0,"updatedAt":{"$date":"2021-01-20T02:44:08.463Z"},"seq":1},
    {"_id":{"$oid":"6005241ce17bdaa9c5df8362"},"views":9,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 연예인 스킨케어 비법!","midtext":"연예인 '한예슬' 님의 아침 운동 전 스킨케어 루틴 공개! ","posturl":"http://naver.me/x35JsAp2","filename":"image-1610949659971","originalName":"210118_9.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":25,"showLocation":[],"tabLocation":[{"tip":false,"hit":true,"new":true,"_id":{"$oid":"6005241ce17bdaa9c5df8363"}}],"comments":[],"createdAt":{"$date":"2021-01-18T06:01:00.152Z"},"created":{"$date":"2021-01-18T06:01:00.152Z"},"__v":0,"seq":1},
    {"_id":{"$oid":"600514efe17bdaa9c5df8344"},"views":8,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 아이돌 스킨케어 루틴","midtext":"걸그룹 에이핑크 '보미'님의 스킨케어 루틴이 궁금해!","posturl":"http://naver.me/IGAOzZON","filename":"image-1611640394654","originalName":"210118_5.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":21,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":false,"munjin":true,"editor":false,"_id":{"$oid":"600fae4a575093ac05748fb1"}}],"tabLocation":[{"tip":false,"hit":true,"new":false,"_id":{"$oid":"600fae4a575093ac05748fb2"}}],"comments":[],"createdAt":{"$date":"2021-01-18T04:56:15.534Z"},"created":{"$date":"2021-01-18T04:56:15.534Z"},"__v":0,"seq":1,"updatedAt":{"$date":"2021-01-26T05:53:14.749Z"}},
    {"_id":{"$oid":"60050f06cd7599a9641352c0"},"views":21,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 아이돌 나이트 스킨케어","midtext":"걸그룹 씨스타 '소유'님의 잠들기 전 피부관리법이 궁금해!","posturl":"http://naver.me/G2hihzyk","filename":"image-1611896216608","originalName":"02.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":20,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60139598d92b95ae2db21e64"}}],"tabLocation":[{"tip":false,"hit":true,"new":false,"_id":{"$oid":"60139598d92b95ae2db21e65"}}],"comments":[],"createdAt":{"$date":"2021-01-18T04:31:02.030Z"},"created":{"$date":"2021-01-18T04:31:02.030Z"},"__v":0,"updatedAt":{"$date":"2021-01-29T04:56:56.703Z"},"seq":1},
    {"_id":{"$oid":"60050abbcd7599a9641352bd"},"views":22,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 아이돌 메이크업 클렌징","midtext":"걸그룹 오마이걸 효정 님의 피부관리법이 궁금해! ","posturl":"http://naver.me/GMRbf16r","filename":"image-1611640448002","originalName":"210118_3.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":19,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600fae80575093ac05748fb5"}}],"tabLocation":[{"tip":false,"hit":true,"new":false,"_id":{"$oid":"600fae80575093ac05748fb6"}}],"comments":[],"createdAt":{"$date":"2021-01-18T04:12:43.048Z"},"created":{"$date":"2021-01-18T04:12:43.048Z"},"__v":0,"seq":1,"updatedAt":{"$date":"2021-01-26T05:54:08.096Z"}},
  ]

  chartAvgCheekPoreCount: any = []; //차트에 보여지는 나이대 평균
  chartAvgCheekPoreUserCount: any = []; //차트에 보여지는 나의 결과
  chartAvgCheekPoreUserCountDate: any = []; //차트에 보여지는 나의 결과 날짜

  chartAvgForeheadPoreCount: any = []; //차트에 보여지는 나이대 평균
  chartAvgForeheadPoreUserCount: any = []; //차트에 보여지는 나의 결과
  chartAvgForeheadPoreUserCountDate: any = []; //차트에 보여지는 나의 결과 날짜

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
    
    this.navParams.get('userData') ? this.userData = this.navParams.get('userData') : this.userData = "";
    this.navParams.get('skinAnalyData') ? this.skinAnalyData = this.navParams.get('skinAnalyData') : this.skinAnalyData = "";

    this.lottoNum();
    this.lottoTip();
    await this.getSkinAnaly();
    await this.getSkinAnalyForehead();
    await this.getAgeRange();
    this.getAvgSkinPore(this.ageRange);
    this.skinQnaMainLoad();
    this.communityEditorBeautyLoad();
    this.getAllBeautyMovie();
  }

  async ionViewDidEnter(){
     ////처음 진입시 현재 월로 조회 되도록
     this.skinbtnYear = format(new Date(), 'YYYY');
     this.skinbtnMonth = format(new Date(), 'MM');
     var e = this.skinbtnYear + "년" + this.skinbtnMonth;
     
    //  await this.yearmonthselect(e);
 
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
    this.chartAvgCheekPoreUserCount = [];
    this.chartAvgCheekPoreUserCountDate = [];

    for(let i= 0; i < this.skinAnalyData.cheek.length; i++) {
      //차트에 그려질 전체 모공 평균
      //현재 달을 확인해서 가져 온다
      if(month ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
        this.chartAvgCheekPoreUserCount.push(this.skinAnalyData.cheek[i].pore[0].pore_count);
        this.chartAvgCheekPoreUserCountDate.push(this.skinAnalyData.cheek[i].input[0].upload_date.substr(8,2)+"일"); //업로드한 날짜 기준 현재 달의 데이터만 가져 온다
       }
    }

    for(let i= 0; i < this.skinAnalyData.cheek.length; i++) {
      //차트에 그려질 전체 모공 평균
      //현재 달을 확인해서 가져 온다
      if(month ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
        this.chartAvgForeheadPoreUserCount.push(this.skinAnalyData.forehead[i].pore[0].pore_count);
        this.chartAvgForeheadPoreUserCountDate.push(this.skinAnalyData.forehead[i].input[0].upload_date.substr(8,2)+"일"); //업로드한 날짜 기준 현재 달의 데이터만 가져 온다
       }
    }

      if(this.button1) {
        this.lineCanvas.data.labels = this.chartAvgCheekPoreUserCountDate;
        this.lineCanvas.data.datasets[0].data = this.chartAvgCheekPoreUserCount;
        this.lineCanvas.update();
      } else if (this.button2) {
        this.lineCanvas2.data.labels = this.chartAvgForeheadPoreUserCountDate;
        this.lineCanvas2.data.datasets[0].data = this.chartAvgForeheadPoreUserCount;
        this.lineCanvas2.update();
      }
      
  }


  initChart() {
    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: this.chartAvgCheekPoreUserCountDate,
        datasets: [
        {
          // label: format(this.today, 'MM/DD', '유분'),
          label: '내 평균',
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
          data: this.chartAvgCheekPoreUserCount,
          spanGaps: false,
          // 수분은 하늘이랑 파랑
          // 유분은 노랑이랑 주황!!
          // label: format(this.today, 'MM/DD', '유분'),
        },
        {
          // label: format(this.today, 'MM/DD', '유분'),
          label: this.ageRange +'대' + this.userData.gender + '평균',
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
          pointRadius: 0.1,  //데이터 포인트크기
          pointHitRadius: 100,
          // data: [this.data1, this.data2, this.data3, this.data4],
          data: this.chartAvgCheekPoreCount,
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

  initChart2() {
    this.lineCanvas2 = new Chart(this.lineCanvas2.nativeElement, {
      type: 'line',
      data: {        //this.skinbtnMonth+"월"+this.valueday.day+"일"
        labels: this.chartAvgForeheadPoreUserCountDate,
        datasets: [
        {
          // label: format(this.today, 'MM/DD', '유분'),
          label: '내 평균',
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
          data: this.chartAvgForeheadPoreUserCount,
          spanGaps: false,
          // 수분은 하늘이랑 파랑
          // 유분은 노랑이랑 주황!!
          // label: format(this.today, 'MM/DD', '유분'),
        },
        {
          // label: format(this.today, 'MM/DD', '유분'),
          label: this.ageRange +'대' + this.userData.gender + '평균',
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
          pointRadius: 0.1,  //데이터 포인트크기
          pointHitRadius: 100,
          // data: [this.data1, this.data2, this.data3, this.data4],
          data: this.chartAvgForeheadPoreCount,
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
      setTimeout(() => {
        this.initChart();  
      }, 500);
    } else if (btn === 'btn2') {
      this.button1 = false;
      this.button2 = true;
      setTimeout(() => {
        this.initChart2();  
      }, 500);
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
    let z = Math.floor(Math.random() * 10) + 0;

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

  product_detail(id) {
    let modal = this.modalCtrl.create(ProductDetailPage, { Product_Num: id });
    modal.onDidDismiss(data => {
      // this.ionViewDidEnter();
      console.log("화장품 상세정보 페이지 닫힘");
    });
    modal.present();
  }

  getSkinAnalyForehead() {
    // if(this.userData) {
      var sizeSum = 0;
      var beforeSum = 0;
      var poreCountSum = 0;
      var poreBeforCountSum = 0;
      // this.auth.getSkinAnaly(this.userData.email).subscribe(data=>{
        // console.log(this.skinAnalyData.forehead[(this.skinAnalyData.forehead.length-1)].input[0].filename);
        // console.log(this.skinAnalyData.forehead[(this.skinAnalyData.forehead.length-1)].pore[0].average_pore);

        this.skinAnalyPoreCurrentCount2 = this.skinAnalyData.forehead[this.skinAnalyData.forehead.length-1].pore[0].pore_count
        //현재 모공 사이즈 총 합
        for(let i= 0; i < this.skinAnalyData.forehead.length; i++) {
           sizeSum += this.skinAnalyData.forehead[i].pore[0].average_pore;
        }
        this.skinAnalyPoreSizeAvg2 = Math.floor(Number(sizeSum / this.skinAnalyData.forehead.length)); //전체 모공사이즈 평균
        
        //이전 모공 사이즈 총 합
        for(let i= 0; i < (this.skinAnalyData.forehead.length-1); i++) {
          beforeSum += this.skinAnalyData.forehead[i].pore[0].average_pore;
        }
        this.skinAnalyPoreBeforeSizeAvg2 = Math.floor(Number(beforeSum / (this.skinAnalyData.forehead.length-1))); //전체 모공사이즈 평균
        
        this.skinAnalyPoreCompareSize2 = this.skinAnalyPoreBeforeSizeAvg2 - this.skinAnalyPoreSizeAvg2;
        this.skinAnalyPoreCompareSize2 > 0 ? this.skinAnalyPoreCompareSize2 = "+" + String(this.skinAnalyPoreCompareSize2) : this.skinAnalyPoreCompareSize2;

        //현재 모공 갯수 총합
        for(let i= 0; i < this.skinAnalyData.forehead.length; i++) {
          poreCountSum += this.skinAnalyData.forehead[i].pore[0].pore_count;

          //차트에 그려질 전체 모공 평균
          //현재 달을 확인해서 가져 온다
          if(this.skinbtnMonth ===  this.skinAnalyData.forehead[i].input[0].upload_date.substr(5,2)) {
            this.chartAvgForeheadPoreUserCount.push(this.skinAnalyData.forehead[i].pore[0].pore_count);
            this.chartAvgForeheadPoreUserCountDate.push(this.skinAnalyData.forehead[i].input[0].upload_date.substr(8,2)+"일"); //업로드한 날짜 기준 현재 달의 데이터만 가져 온다
           }
        }
        this.skinAnalyPoreCount2 = Math.floor(Number(poreCountSum / this.skinAnalyData.forehead.length)); //전체 모공사이즈 평균
        
        
          

        //이전 모공 갯수 총 합
        for(let i= 0; i < (this.skinAnalyData.forehead.length-1); i++) {
          poreBeforCountSum += this.skinAnalyData.forehead[i].pore[0].pore_count;
        }
        this.skinAnalyPoreBeforeCount2 = Math.floor(Number(poreBeforCountSum / (this.skinAnalyData.forehead.length-1))); //전체 모공사이즈 평균
        
        this.skinAnalyPoreCompareCount2 = this.skinAnalyPoreCount2 - this.skinAnalyPoreBeforeCount2;
        this.skinAnalyPoreCompareCount2 > 0 ? this.skinAnalyPoreCompareCount2 = "+" + String(this.skinAnalyPoreCompareCount2) : this.skinAnalyPoreCompareCount2;

        this.skinForeheadTone = this.skinAnalyData.forehead[(this.skinAnalyData.forehead.length-1)].tone[0].avgrage_color_hex;

        // this.cheekImages.push('http://ec2-3-34-189-215.ap-northeast-2.compute.amazonaws.com/media/images/'+this.skinAnalyData.forehead[(this.skinAnalyData.forehead.length-1)].input[0].filename);
        // this.cheekImages.push(this.skinAnalyData.forehead[(this.skinAnalyData.forehead.length-1)].pore[0].output_image);

        this.foreheadImages.push('http://ec2-52-79-142-125.ap-northeast-2.compute.amazonaws.com/media/images/'+this.skinAnalyData.forehead[(this.skinAnalyData.forehead.length-1)].input[0].filename);
        this.foreheadImages.push(this.skinAnalyData.forehead[(this.skinAnalyData.forehead.length-1)].pore[0].output_image);

        console.log("cheekimages : " + this.cheekImages);
        // this.skinAnalyPoreCount = this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].pore[0].pore_count

        // this.skinAnalyPoreSizeAvg = Math.floor(this.skinAnalyPoreSizeAvg);

        // console.log("총 합계는? : " + sizeSum);
        // console.log("평균은? : " + Math.floor(this.skinAnalyPoreSizeAvg));
        // this.skinAnalyPoreSizeAvg = (Number(this.skinAnalyPoreSize) / (this.skinAnalyData.cheek.length))
        
        // console.log(this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].pore[0].pore_count);
        // console.log(this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].tone[0].avgrage_color_hex);
        // console.log(this.skinAnalyData);
      // },error => {
      //   console.log(error);
      // })
    // }
    
  }

  getSkinAnaly() {
    // if(this.userData) {
      var sizeSum = 0;
      var beforeSum = 0;
      var poreCountSum = 0;
      var poreBeforCountSum = 0;
      // this.auth.getSkinAnaly(this.userData.email).subscribe(data=>{
        // console.log(this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].input[0].filename);
        // console.log(this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].pore[0].average_pore);

        this.skinAnalyPoreCurrentCount = this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].pore[0].pore_count
        //현재 모공 사이즈 총 합
        for(let i= 0; i < this.skinAnalyData.cheek.length; i++) {
           sizeSum += this.skinAnalyData.cheek[i].pore[0].average_pore;
        }
        this.skinAnalyPoreSizeAvg = Math.floor(Number(sizeSum / this.skinAnalyData.cheek.length)); //전체 모공사이즈 평균
        
        //이전 모공 사이즈 총 합
        for(let i= 0; i < (this.skinAnalyData.cheek.length-1); i++) {
          beforeSum += this.skinAnalyData.cheek[i].pore[0].average_pore;
        }
        this.skinAnalyPoreBeforeSizeAvg = Math.floor(Number(beforeSum / (this.skinAnalyData.cheek.length-1))); //전체 모공사이즈 평균
        
        this.skinAnalyPoreCompareSize = this.skinAnalyPoreBeforeSizeAvg - this.skinAnalyPoreSizeAvg;
        this.skinAnalyPoreCompareSize > 0 ? this.skinAnalyPoreCompareSize = "+" + String(this.skinAnalyPoreCompareSize) : this.skinAnalyPoreCompareSize;

        //현재 모공 갯수 총합
        for(let i= 0; i < this.skinAnalyData.cheek.length; i++) {
          poreCountSum += this.skinAnalyData.cheek[i].pore[0].pore_count;

          //차트에 그려질 전체 모공 평균
          //현재 달을 확인해서 가져 온다
          if(this.skinbtnMonth ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
            this.chartAvgCheekPoreUserCount.push(this.skinAnalyData.cheek[i].pore[0].pore_count);
            this.chartAvgCheekPoreUserCountDate.push(this.skinAnalyData.cheek[i].input[0].upload_date.substr(8,2)+"일"); //업로드한 날짜 기준 현재 달의 데이터만 가져 온다
           }
        }
        this.skinAnalyPoreCount = Math.floor(Number(poreCountSum / this.skinAnalyData.cheek.length)); //전체 모공사이즈 평균
        
        
          

        //이전 모공 갯수 총 합
        for(let i= 0; i < (this.skinAnalyData.cheek.length-1); i++) {
          poreBeforCountSum += this.skinAnalyData.cheek[i].pore[0].pore_count;
        }
        this.skinAnalyPoreBeforeCount = Math.floor(Number(poreBeforCountSum / (this.skinAnalyData.cheek.length-1))); //전체 모공사이즈 평균
        
        this.skinAnalyPoreCompareCount = this.skinAnalyPoreCount - this.skinAnalyPoreBeforeCount;
        this.skinAnalyPoreCompareCount > 0 ? this.skinAnalyPoreCompareCount = "+" + String(this.skinAnalyPoreCompareCount) : this.skinAnalyPoreCompareCount;

        this.skinTone = this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].tone[0].avgrage_color_hex;

        this.cheekImages.push('http://ec2-52-79-142-125.ap-northeast-2.compute.amazonaws.com/media/images/'+this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].input[0].filename);
        this.cheekImages.push(this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].pore[0].output_image);

        // this.foreheadImages.push('http://ec2-3-34-189-215.ap-northeast-2.compute.amazonaws.com/media/images/'+this.skinAnalyData.forehead[(this.skinAnalyData.forehead.length-1)].input[0].filename);
        // this.foreheadImages.push(this.skinAnalyData.forehead[(this.skinAnalyData.forehead.length-1)].pore[0].output_image);

        console.log("cheekimages : " + this.cheekImages);
        // this.skinAnalyPoreCount = this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].pore[0].pore_count

        // this.skinAnalyPoreSizeAvg = Math.floor(this.skinAnalyPoreSizeAvg);

        // console.log("총 합계는? : " + sizeSum);
        // console.log("평균은? : " + Math.floor(this.skinAnalyPoreSizeAvg));
        // this.skinAnalyPoreSizeAvg = (Number(this.skinAnalyPoreSize) / (this.skinAnalyData.cheek.length))
        
        // console.log(this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].pore[0].pore_count);
        // console.log(this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].tone[0].avgrage_color_hex);
        // console.log(this.skinAnalyData);
      // },error => {
      //   console.log(error);
      // })
    // }
    
  }

  getAgeRange() {
    console.log(this.userData.birthday);
    var age = 0;
    var age_range = '';
    age = Number(new Date().getFullYear()) - Number(this.userData.birthday.substr(0,4)) + 1 ;
    this.ageRange = String(age).substr(0,1) + '0';
    console.log(this.ageRange);
  }

  getAvgSkinPore(ageRange) {
    this.images.getAvgPore(this.ageRange, this.userData.gender).subscribe(data => {
      this.avgCheekPoreSize = Math.floor(data.avgCheekPoreSize);
      this.avgCheekPoreCount = Math.floor(data.avgCheekPoreCount);
      this.avgForeHeadPoreSize = Math.floor(data.avgForeHeadPoreSize);
      this.avgForeHeadPoreCount = Math.floor(data.avgForeHeadPoreCount);

      for(let k = 0; this.chartAvgCheekPoreCount.length < 31; k++) {
        this.chartAvgCheekPoreCount.push(this.avgCheekPoreCount);
      }

      for(let k = 0; this.chartAvgForeheadPoreCount.length < 31; k++) {
        this.chartAvgForeheadPoreCount.push(this.avgForeHeadPoreCount);
      }

      this.skinAnalyAvgCompare = Math.floor(Number(this.skinAnalyPoreSizeAvg) - Number(this.avgCheekPoreSize));
      this.skinAnalyAvgComparePoreCount = Math.floor(Number(this.skinAnalyPoreCount) - Number(this.avgCheekPoreCount));
      this.skinAnalyAvgComparePoreCount > 0 ? this.skinAnalyAvgComparePoreCount = "+" + String(this.skinAnalyAvgComparePoreCount) : this.skinAnalyAvgComparePoreCount;


      this.skinAnalyAvgCompare2 = Math.floor(Number(this.skinAnalyPoreSizeAvg2) - Number(this.avgForeHeadPoreSize));
      this.skinAnalyAvgComparePoreCount2 = Math.floor(Number(this.skinAnalyPoreCount2) - Number(this.avgForeHeadPoreCount));
      this.skinAnalyAvgComparePoreCount2 > 0 ? this.skinAnalyAvgComparePoreCount2 = "+" + String(this.skinAnalyAvgComparePoreCount2) : this.skinAnalyAvgComparePoreCount2;



      this.left1 = this.barPercent(this.skinAnalyPoreCount, this.avgCheekPoreCount);
      this.left2 = this.barPercent(this.skinAnalyPoreBeforeCount, this.avgCheekPoreCount);
      // this.left1 = (Number(this.skinAnalyPoreSizeAvg) / Number(this.avgCheekPoreSize));
      // this.left2 = this.skinAnalyPoreBeforeSizeAvg;

      this.leftForehead1 = this.barPercent(this.skinAnalyPoreCount2, this.avgForeHeadPoreCount);
      this.leftForehead2 = this.barPercent(this.skinAnalyPoreBeforeCount2, this.avgForeHeadPoreCount);

      

      if(this.skinAnalyPoreCount > this.avgCheekPoreCount) {
        this.mogongSize = "많은 편";
      } else if (this.skinAnalyPoreCount === this.avgCheekPoreCount) {
        this.mogongSize = "보통인 편";
      } else {
        this.mogongSize = "적은 편";
      }

      if(this.skinAnalyPoreCount2 > this.avgForeHeadPoreCount) {
        this.mogongForeheadSize = "많은 편";
      } else if (this.skinAnalyPoreCount2 === this.avgForeHeadPoreCount) {
        this.mogongForeheadSize = "보통인 편";
      } else {
        this.mogongForeheadSize = "적은 편";
      }


    },error => {
      console.log(error);
    })
  }

  barPercent(int1, int2) {
    var result = 0;
    var strResult = '';
    result = Math.floor((int1 - int2) / int2 * 100 + 50);
    strResult = String(result) + '%';
    return strResult;
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
