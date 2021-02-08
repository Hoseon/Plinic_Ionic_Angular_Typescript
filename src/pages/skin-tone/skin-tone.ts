import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, ModalController, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import { ImagesProvider } from '../../providers/images/images'
import { AuthService } from '../../providers/auth-service';
import { CommunityModifyPage } from '../community/community-modify/community-modify'
import { ProductDetailPage } from '../product-detail/product-detail'
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { SungwooBeautyPage } from '../sungwoo-beauty/sungwoo-beauty';

 /**
 * Generated class for the SkinTonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-tone',
  templateUrl: 'skin-tone.html',
})
export class SkinTonePage {
  movieData: any;
  youTubeArrayData: Array<any>  = new Array<any>();
  videoDetailData: Array<any>  = new Array<any>();
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

  image1CheekUrl : any = 'http://ec2-52-79-142-125.ap-northeast-2.compute.amazonaws.com/media/images/';
  image2CheekUrl : any = 'http://ec2-52-79-142-125.ap-northeast-2.compute.amazonaws.com/media/images/';
  image3CheekUrl : any = 'http://ec2-52-79-142-125.ap-northeast-2.compute.amazonaws.com/media/images/';

  image1ForeHeadUrl : any = 'http://ec2-52-79-142-125.ap-northeast-2.compute.amazonaws.com/media/images/';
  image2ForeHeadUrl : any = 'http://ec2-52-79-142-125.ap-northeast-2.compute.amazonaws.com/media/images/';
  image3ForeHeadUrl : any = 'http://ec2-52-79-142-125.ap-northeast-2.compute.amazonaws.com/media/images/';

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
    {"_id":{"$oid":"60052a19e17bdaa9c5df8366"},"views":12,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 연예인 건성피부관리법","midtext":"걸그룹 시크릿 '전효성'님의 건성피부 스킨 케어 루틴은?","posturl":"http://naver.me/xor75HKs","filename":"image-1610951233778","originalName":"210118_11.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":27,"showLocation":null,"tabLocation":[{"tip":false,"hit":true,"new":true,"_id":{"$oid":"60052a41e17bdaa9c5df8368"}}],"comments":[],"createdAt":{"$date":"2021-01-18T06:26:33.674Z"},"created":{"$date":"2021-01-18T06:26:33.674Z"},"__v":0,"updatedAt":{"$date":"2021-01-20T02:44:08.463Z"},"seq":1},
    {"_id":{"$oid":"6005241ce17bdaa9c5df8362"},"views":9,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 연예인 스킨케어 비법!","midtext":"연예인 '한예슬' 님의 아침 운동 전 스킨케어 루틴 공개! ","posturl":"http://naver.me/x35JsAp2","filename":"image-1610949659971","originalName":"210118_9.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":25,"showLocation":[],"tabLocation":[{"tip":false,"hit":true,"new":true,"_id":{"$oid":"6005241ce17bdaa9c5df8363"}}],"comments":[],"createdAt":{"$date":"2021-01-18T06:01:00.152Z"},"created":{"$date":"2021-01-18T06:01:00.152Z"},"__v":0,"seq":1},
    {"_id":{"$oid":"60051f92e17bdaa9c5df834b"},"views":10,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[화잘알사] 선블록 똑똑하게 고르기","midtext":"다양한 자외선 차단제 중에서 나는 어떤 걸 써야할까? ","posturl":"http://naver.me/FJBaeduc","filename":"image-1611640340621","originalName":"210118_7.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":23,"showLocation":[{"home":false,"poreSize":false,"poreCount":false,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600fae14575093ac05748fad"}}],"tabLocation":[{"tip":true,"hit":false,"new":false,"_id":{"$oid":"600fae14575093ac05748fae"}}],"comments":[],"createdAt":{"$date":"2021-01-18T05:41:38.227Z"},"created":{"$date":"2021-01-18T05:41:38.227Z"},"__v":0,"seq":1,"updatedAt":{"$date":"2021-01-26T05:52:20.739Z"}},
    {"_id":{"$oid":"600514efe17bdaa9c5df8344"},"views":8,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 아이돌 스킨케어 루틴","midtext":"걸그룹 에이핑크 '보미'님의 스킨케어 루틴이 궁금해!","posturl":"http://naver.me/IGAOzZON","filename":"image-1611640394654","originalName":"210118_5.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":21,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":false,"munjin":true,"editor":false,"_id":{"$oid":"600fae4a575093ac05748fb1"}}],"tabLocation":[{"tip":false,"hit":true,"new":false,"_id":{"$oid":"600fae4a575093ac05748fb2"}}],"comments":[],"createdAt":{"$date":"2021-01-18T04:56:15.534Z"},"created":{"$date":"2021-01-18T04:56:15.534Z"},"__v":0,"seq":1,"updatedAt":{"$date":"2021-01-26T05:53:14.749Z"}},
    {"_id":{"$oid":"60050f06cd7599a9641352c0"},"views":21,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 아이돌 나이트 스킨케어","midtext":"걸그룹 씨스타 '소유'님의 잠들기 전 피부관리법이 궁금해!","posturl":"http://naver.me/G2hihzyk","filename":"image-1611896216608","originalName":"02.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":20,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60139598d92b95ae2db21e64"}}],"tabLocation":[{"tip":false,"hit":true,"new":false,"_id":{"$oid":"60139598d92b95ae2db21e65"}}],"comments":[],"createdAt":{"$date":"2021-01-18T04:31:02.030Z"},"created":{"$date":"2021-01-18T04:31:02.030Z"},"__v":0,"updatedAt":{"$date":"2021-01-29T04:56:56.703Z"},"seq":1},
    {"_id":{"$oid":"60050abbcd7599a9641352bd"},"views":22,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[셀럽화장대] 아이돌 메이크업 클렌징","midtext":"걸그룹 오마이걸 효정 님의 피부관리법이 궁금해! ","posturl":"http://naver.me/GMRbf16r","filename":"image-1611640448002","originalName":"210118_3.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":19,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600fae80575093ac05748fb5"}}],"tabLocation":[{"tip":false,"hit":true,"new":false,"_id":{"$oid":"600fae80575093ac05748fb6"}}],"comments":[],"createdAt":{"$date":"2021-01-18T04:12:43.048Z"},"created":{"$date":"2021-01-18T04:12:43.048Z"},"__v":0,"seq":1,"updatedAt":{"$date":"2021-01-26T05:54:08.096Z"}},
    {"_id":{"$oid":"6004f176c3ae02a956f129ff"},"views":22,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[스킨노트] 에디터 홈케어 일기 1","midtext":"플리닉 에디터 '도도'의 4주 플리닉 프로젝트 시작!","posturl":"http://naver.me/5bXWSFKm","filename":"image-1611896246397","originalName":"01.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":16,"showLocation":[{"home":true,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"601395b6d92b95ae2db21e66"}}],"tabLocation":[{"tip":true,"hit":false,"new":false,"_id":{"$oid":"601395b6d92b95ae2db21e67"}}],"comments":[],"createdAt":{"$date":"2021-01-18T02:24:54.909Z"},"created":{"$date":"2021-01-18T02:24:54.909Z"},"__v":0,"seq":2,"updatedAt":{"$date":"2021-01-29T04:57:26.761Z"}},
    {"_id":{"$oid":"601394b1d92b95ae2db21e59"},"views":0,"editor":false,"like":0,"likeuser":[""],"visible":true,"seq":99,"body":"[스킨노트]튼살 예방과 치료에 좋은 음식 TOP5","midtext":"미운 튼살... 예방과 치료에 도움되는 음식 다섯 가지!","posturl":"http://naver.me/GMFc86VO","filename":"image-1611895985227","originalName":"04.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":38,"showLocation":[{"home":false,"poreSize":true,"poreCount":false,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"601394b1d92b95ae2db21e5a"}}],"tabLocation":[{"tip":true,"hit":false,"new":false,"_id":{"$oid":"601394b1d92b95ae2db21e5b"}}],"comments":[],"createdAt":{"$date":"2021-01-29T04:53:05.533Z"},"created":{"$date":"2021-01-29T04:53:05.534Z"},"__v":0},
    {"_id":{"$oid":"5efafaa0d24bad43fc440b5a"},"views":36,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트]치아미백에 좋은 음식 Top5!","midtext":"피부 미백만큼 신경쓰이는 치아 미백에 좋은 음식 다섯가지","posturl":"http://naver.me/FR7SieLY","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":80,"filename":"image-1611640862496","originalName":"210118_19.jpg","comments":[],"createdAt":{"$date":"2020-06-30T08:41:04.680Z"},"created":{"$date":"2020-06-30T08:41:04.680Z"},"__v":1,"showLocation":[{"home":false,"poreSize":false,"poreCount":false,"skinTone":false,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600fb01e575093ac05748fc8"}}],"tabLocation":[{"tip":true,"hit":false,"new":false,"_id":{"$oid":"600fb01e575093ac05748fc9"}}],"visible":true,"updatedAt":{"$date":"2021-01-26T06:01:02.724Z"},"seq":1},
    {"_id":{"$oid":"5ee89543b8c0c9412620823d"},"views":63,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트]흡연이 피부에 미치는 영향 TOP5","midtext":"흡연이 피부에 안 좋은 이유 다섯 가지를 알아보자","posturl":"http://naver.me/xRQN3yQy","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":77,"filename":"image-1611640927098","originalName":"210118_22.jpg","comments":[],"createdAt":{"$date":"2020-06-16T09:47:47.901Z"},"created":{"$date":"2020-06-16T09:47:47.901Z"},"__v":2,"editorUpdateAt":{"$date":"2020-06-24T02:36:08.840Z"},"updatedAt":{"$date":"2021-01-26T06:02:07.189Z"},"showLocation":[{"home":false,"poreSize":false,"poreCount":false,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600fb05f575093ac05748fce"}}],"visible":true,"tabLocation":[{"tip":true,"hit":false,"new":false,"_id":{"$oid":"600fb05f575093ac05748fcf"}}],"seq":1}
  ]

  skinAnalyData: any;
  userData: any;
  skinCleanCheekScore: any;
  skinCleanForeHeadScore: any;

  diffValue: any = [];
  diffValueDate: any = [];
  bestValue: any;
  worstValue: any;

  skinColor1: boolean = true;
  skinColor2: boolean = false;
  skinColor3: boolean = false;
  skinColor4: boolean = false;
  skinColor5: boolean = false;

  shape : any = [];
  shapeColor: any = '#dc80b4';
  faceColor: any;
  currentSkinTone: any;

  skinTone: any = [];


  

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
      this.initShape();
  }

  async ionViewDidLoad() {
    this.getAllBeautyMovie();
    this.navParams.get('userData') ? this.userData = this.navParams.get('userData') : this.userData = "";
    this.navParams.get('skinAnalyData') ? this.skinAnalyData = this.navParams.get('skinAnalyData') : this.skinAnalyData = "";

    // this.faceColor = this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].tone[0].avgrage_color_hex;

    //2020-12-07 만일 밝은 피부 코드 값이 존재 하지 않는다면(과거데이터 경우) 평균 피부코드로 대체
    this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].tone[0].lightest_color_hex ? this.faceColor = this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].tone[0].lightest_color_hex : this.faceColor = this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].tone[0].avgrage_color_hex;
    
    // this.currentSkinTone = this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].tone[0].avgrage_color_hex;
    this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].tone[0].lightest_color_hex ? this.currentSkinTone = this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].tone[0].lightest_color_hex : this.currentSkinTone = this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].tone[0].avgrage_color_hex;

    for(let i = 0; i < this.skinAnalyData.cheek.length; i++){
      //월별 조건 추가
      if(this.skinbtnMonth ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
        this.skinTone.push({
          // value : this.skinAnalyData.cheek[i].tone[0].avgrage_color_hex, 2020-12-07 밝은 피부톤으로 변경
          value : this.skinAnalyData.cheek[i].tone[0].lightest_color_hex,
          date: this.skinAnalyData.cheek[i].input[0].upload_date
        })  
      }
    }
  
    // this.skinCleanCheekScore = Math.floor(this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].diff[0].value);
    // this.skinCleanCheekScore > 0 ? this.skinCleanCheekScore = "+" + String(this.skinCleanCheekScore) : this.skinCleanCheekScore;
    // this.skinCleanForeHeadScore = Math.floor(this.skinAnalyData.forehead[this.skinAnalyData.forehead.length-1].diff[0].value);
    // this.skinCleanForeHeadScore > 0 ? this.skinCleanForeHeadScore = "+" + String(this.skinCleanForeHeadScore) : this.skinCleanForeHeadScore;
    this.image3CheekUrl = this.image3CheekUrl.concat(this.skinAnalyData.firstcheek);
    this.image3ForeHeadUrl = this.image3ForeHeadUrl.concat(this.skinAnalyData.firstforhead);
    this.image2CheekUrl = this.image2CheekUrl.concat(this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].input[0].filename);
    this.image2ForeHeadUrl = this.image2ForeHeadUrl.concat(this.skinAnalyData.forehead[this.skinAnalyData.forehead.length-1].input[0].filename);
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
    this.skinTone = [];
    for(let i = 0; i < this.skinAnalyData.cheek.length; i++){
      //월별 조건 추가
      if(month ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
        this.skinTone.push({
          // value : this.skinAnalyData.cheek[i].tone[0].avgrage_color_hex, 2020-12-07 평균컬러 제외 하고 밝은 컬러로 변경
          value : this.skinAnalyData.cheek[i].tone[0].lightest_color_hex,
          date: this.skinAnalyData.cheek[i].input[0].upload_date
        })  
      }
    }
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

  image_toggle(toggle) {
    switch(toggle) { 
      case 'image1' : this.image1 = true; this.image2 = false; this.image3 = false; break;
      case 'image2' : this.image1 = false; this.image2 = true; this.image3 = false; break;
      case 'image3' : this.image1 = false; this.image2 = false; this.image3 = true; break;
      default : this.image1 = true; this.image2 = false; this.image3 = false;
    }
  }

  color_toggle(color) {
    switch(color) {
      case 'color1' : this.skinColor1 = true; this.skinColor2 = false;  this.skinColor3 = false; this.skinColor4 = false; this.skinColor5 = false; this.faceColor = this.currentSkinTone;   break;
      case 'color2' : this.skinColor1 = false; this.skinColor2 = true;  this.skinColor3 = false; this.skinColor4 = false; this.skinColor5 = false; this.faceColor = '#f9e5d9';  break;
      case 'color3' : this.skinColor1 = false; this.skinColor2 = false;  this.skinColor3 = true; this.skinColor4 = false; this.skinColor5 = false; this.faceColor = '#f0d1bf';  break;
      case 'color4' : this.skinColor1 = false; this.skinColor2 = false;  this.skinColor3 = false; this.skinColor4 = true; this.skinColor5 = false; this.faceColor = '#eecac3';   break;
      case 'color5' : this.skinColor1 = false; this.skinColor2 = false;  this.skinColor3 = false; this.skinColor4 = false; this.skinColor5 = true; this.faceColor = '#dfb9a3';  break;
      default : this.skinColor1 = true; this.skinColor2 = false;  this.skinColor3 = false; this.skinColor4 = false; this.skinColor5 = false; this.faceColor = this.currentSkinTone;
    }
  }

  initShape(){
    var colorCode = ['#ffffff','#dc80b4','#da8a88','#84ccc9','#e60012','#7e0043','#450b61','#a84200','#a40000','#e4007f','#88abda','#8c97cb','#8f82bc','#aa89bd','#c490bf','#f19ec2','#100964','#6a005f','#a4005b','#31004a','#8f5a76','#500047','#eb6100','#000000','#b7857c']
    for(let s = 1; this.shape.length <= 23; s++) {
      if(s == 1) {
        this.shape.push({
          value: 'shape'+s,
          border: true,
          color: colorCode[s]
        })
      } else {
        this.shape.push({
          value: 'shape'+s,
          border: false,
          color: colorCode[s]
        })
      }
    }
  }

  toggle_shape(shape) {
    this.shape.forEach(element => {
      element.value === shape ? element.border = true : element.border = false
      element.value === shape ? this.shapeColor = element.color : this.shapeColor
    });
    console.log(this.shape);
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
