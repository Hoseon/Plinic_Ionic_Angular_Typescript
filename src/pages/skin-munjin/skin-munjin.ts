import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, ModalController, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-plugin-labels';
import { ImagesProvider } from '../../providers/images/images'
import { CommunityModifyPage } from '../community/community-modify/community-modify'
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ProductDetailPage } from '../product-detail/product-detail';
import { AuthService } from '../../providers/auth-service';
import { SungwooBeautyPage } from '../sungwoo-beauty/sungwoo-beauty';

 /**
 * Generated class for the SkinMunjinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'skin-munjin-size',
  templateUrl: 'skin-munjin.html',
})
export class SkinMunjinPage {
  movieData: any;
  youTubeArrayData: Array<any>  = new Array<any>();
  videoDetailData: Array<any>  = new Array<any>();
  skinAnalyPoreSize: any;
  skinAnalyPoreSizeAvg: any;
  skinAnalyPoreBeforeSizeAvg: any;
  skinAnalyPoreCompareSize: any;
  skinAnalyPoreCount: any;
  skinAnalyPoreBeforeCount: any;
  skinAnalyPoreCompareCount: any;
  skinAnalyAvgCompare: any; //00대 성별 평균 대비
  skinTone: any;

  cheekImages: Array<any> = new Array<any>();
  foreheadImages: Array<any> = new Array<any>();


  left1 : any;
  left2 : any;
  left3 : any;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  valueday = { "day": "1" };
  today: any = new Date().toISOString();
  skinbtnYear = format(this.today, 'YYYY');
  skinbtnMonth = format(this.today, 'MM');
  chartDateData = [];
  chartCheekData = [];
  chartAgeCheekData = [];
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
    // {
    //   posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=28985318&memberNo=45335922",
    //   body : "여드름 피부 관리 방법 TOP5",
    //   _id : "5f292cad3425774b4fa86795",
    //   filename : "image-1596533932986",
    //   views : "6"
    // },
    // {
    //   posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=27805579&memberNo=45335922&searchKeyword=%23%ED%94%BC%EB%B6%80%ED%86%A4&searchRank=2",
    //   body : "기미에 좋은 음식 TOP5",
    //   _id : "5ec4c86d4f693c262a959c56",
    //   filename : "image-1592965911751",
    //   views : "90"
    // },
    // {
    //   posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=27597206&memberNo=45335922&searchKeyword=%EB%AA%A8%EA%B3%B5&searchRank=1",
    //   body : "모공에 안 좋은 습관 TOP5",
    //   _id : "5ec4ba704f693c262a959c52",
    //   filename : "image-1592965768950",
    //   views : "87"
    // },
    // {
    //   posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=29068090&memberNo=45335922",
    //   body : "모공 관리 방법 TOP5!",
    //   _id : "5f33b440df245a516e1a1aac",
    //   filename : "image-1597224000351",
    //   views : "6"
    // },
    // {
    //   posturl : "https://m.post.naver.com/viewer/postView.nhn?volumeNo=27423003&memberNo=45335922&searchKeyword=%EB%AA%A8%EA%B3%B5&searchRank=2",
    //   body : "모공축소에 좋은 음식 TOP5",
    //   _id : "5ec4ba294f693c262a959c51",
    //   filename : "image-1592965730166",
    //   views : "86"
    // },
    {"_id":{"$oid":"5ede091227251938d50424a4"},"views":127,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트]수면이 피부에 미치는영향 TOP5","midtext":"피부관리의 기본! 수면이 피부에 미치는 영향 다섯가지","posturl":"http://naver.me/xGnTnHdU","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":76,"filename":"image-1610961682461","originalName":"210118_23.jpg","comments":[],"createdAt":{"$date":"2020-06-08T09:46:58.796Z"},"created":{"$date":"2020-06-08T09:46:58.796Z"},"__v":1,"editorUpdateAt":{"$date":"2020-06-24T02:35:55.683Z"},"updatedAt":{"$date":"2021-01-18T09:21:22.572Z"},"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60055312facefaaa1c4a5c28"}}],"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"60055312facefaaa1c4a5c29"}}],"visible":true},
    {"_id":{"$oid":"5ef9b813d24bad43fc440b43"},"views":24,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁] ","body":"[스킨노트]임산부가 피해야 할 성분 TOP5","midtext":"임산부와 아이에게 나쁜 영향을 미치는 화장품 성분 다섯가지","posturl":"http://naver.me/FEtsOTcK","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":78,"filename":"image-1610959923838","originalName":"210118_21.jpg","comments":[],"createdAt":{"$date":"2020-06-29T09:44:51.162Z"},"created":{"$date":"2020-06-29T09:44:51.162Z"},"__v":1,"showLocation":[{"home":false,"poreSize":false,"poreCount":false,"skinTone":false,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60054c34facefaaa1c4a5c22"}}],"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"60054c34facefaaa1c4a5c23"}}],"visible":true,"updatedAt":{"$date":"2021-01-18T08:52:03.987Z"}},
    {"_id":{"$oid":"5efafb95d24bad43fc440b5b"},"views":30,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트]탈모를 부르는 나쁜 습관 5가지 ","midtext":"머리카락이 자꾸 빠져서 고민이라면? 나쁜 습관을 체크!","posturl":"http://naver.me/xFpJN3ah","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":81,"filename":"image-1610955830895","originalName":"210118_17.jpg","comments":[],"createdAt":{"$date":"2020-06-30T08:45:09.454Z"},"created":{"$date":"2020-06-30T08:45:09.454Z"},"__v":1,"showLocation":[{"home":false,"poreSize":false,"poreCount":false,"skinTone":false,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60053c37facefaaa1c4a5c18"}}],"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"60053c37facefaaa1c4a5c19"}}],"visible":true,"updatedAt":{"$date":"2021-01-18T07:43:51.170Z"}},
    {"_id":{"$oid":"6004f632cd7599a9641352af"},"views":15,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[스킨노트] 겨울철 단계별 피부관리법!","midtext":"추운 겨울 건조하고 갈라지는 피부... 해결 방법은?","posturl":"http://naver.me/GgxgngvK","filename":"image-1610948568581","originalName":"210118_2.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":17,"showLocation":[{"home":true,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60051fd8e17bdaa9c5df8355"}}],"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"60051fd8e17bdaa9c5df8356"}}],"comments":[],"createdAt":{"$date":"2021-01-18T02:45:06.765Z"},"created":{"$date":"2021-01-18T02:45:06.765Z"},"__v":0,"updatedAt":{"$date":"2021-01-18T05:42:48.864Z"}},
    {"_id":{"$oid":"6004f176c3ae02a956f129ff"},"views":14,"editor":false,"like":0,"likeuser":[""],"visible":true,"body":"[스킨노트] 에디터 홈케어 일기 1","midtext":"플리닉 에디터 '도도'의 4주 플리닉 프로젝트 시작!","posturl":"http://naver.me/5bXWSFKm","filename":"image-1610936694597","originalName":"210118_1.jpg","author":{"$oid":"6004e920c3ae02a956f129ee"},"numId":16,"showLocation":[{"home":true,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"6004f176c3ae02a956f12a00"}}],"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"6004f176c3ae02a956f12a01"}}],"comments":[],"createdAt":{"$date":"2021-01-18T02:24:54.909Z"},"created":{"$date":"2021-01-18T02:24:54.909Z"},"__v":0},
    {"_id":{"$oid":"5f0d7ab109b9374671f16e19"},"views":33,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트]지성피부에 좋은 음식 TOP5","midtext":"지성피부인들 모여라! 지성피부에 좋은 음식 다섯가지 ","posturl":"http://naver.me/G3t2tdVJ","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":83,"filename":"image-1610954785709","originalName":"210118_15.jpg","comments":[],"createdAt":{"$date":"2020-07-14T09:28:17.746Z"},"created":{"$date":"2020-07-14T09:28:17.746Z"},"__v":1,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60053822facefaaa1c4a5c14"}}],"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"60053822facefaaa1c4a5c15"}}],"visible":true,"updatedAt":{"$date":"2021-01-18T07:26:26.021Z"}},
    {"_id":{"$oid":"5f02ec4156553a4464ad4c84"},"views":102,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트]건성피부에 좋은 음식 TOP5","midtext":"건성피부인들 모여라! 건성피부에 좋은 음식 다섯가지","posturl":"http://naver.me/FwwfZe6p","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":82,"filename":"image-1610955228396","originalName":"210118_16.jpg","comments":[],"createdAt":{"$date":"2020-07-06T09:17:53.838Z"},"created":{"$date":"2020-07-06T09:17:53.838Z"},"__v":2,"editorUpdateAt":{"$date":"2020-07-14T09:28:36.655Z"},"updatedAt":{"$date":"2021-01-18T07:33:48.580Z"},"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"600539dcfacefaaa1c4a5c16"}}],"visible":true,"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"600539dcfacefaaa1c4a5c17"}}]},
    {"_id":{"$oid":"5f292cad3425774b4fa86795"},"views":67,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트] 여드름 피부관리법 TOP5","midtext":"여드름과 뾰루지를 해결해주는 피부관리법 다섯가지","posturl":"http://naver.me/GpP8P4BY","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":86,"filename":"image-1610952352545","originalName":"210118_12.jpg","comments":[],"createdAt":{"$date":"2020-08-04T09:38:53.236Z"},"created":{"$date":"2020-08-04T09:38:53.236Z"},"__v":2,"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60052ea0e17bdaa9c5df8373"}}],"visible":true,"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"60052ea0e17bdaa9c5df8374"}}],"updatedAt":{"$date":"2021-01-18T06:45:52.669Z"}},
    {"_id":{"$oid":"5ee89543b8c0c9412620823d"},"views":60,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트]흡연이 피부에 미치는 영향 TOP5","midtext":"흡연이 피부에 안 좋은 이유 다섯 가지를 알아보자","posturl":"http://naver.me/xRQN3yQy","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":77,"filename":"image-1610961033231","originalName":"210118_22.jpg","comments":[],"createdAt":{"$date":"2020-06-16T09:47:47.901Z"},"created":{"$date":"2020-06-16T09:47:47.901Z"},"__v":2,"editorUpdateAt":{"$date":"2020-06-24T02:36:08.840Z"},"updatedAt":{"$date":"2021-01-18T09:10:33.332Z"},"showLocation":[{"home":false,"poreSize":false,"poreCount":false,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60055089facefaaa1c4a5c26"}}],"visible":true,"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"60055089facefaaa1c4a5c27"}}]},
    {"_id":{"$oid":"5ed4b58c7fe72535014d7021"},"views":122,"editor":false,"like":0,"likeuser":[""],"title":"[뷰티꿀팁]","body":"[스킨노트]음주가 피부에 미치는 영향 TOP5","midtext":"푸석해진 내피부... 과음이 피부에 미치는 영향 다섯가지","posturl":"http://naver.me/xSjljrTa","author":{"$oid":"5dca243975198204f8f5a2f4"},"numId":75,"filename":"image-1610962432832","originalName":"210118_24.jpg","comments":[],"createdAt":{"$date":"2020-06-01T08:00:12.600Z"},"created":{"$date":"2020-06-01T08:00:12.600Z"},"__v":1,"editorUpdateAt":{"$date":"2020-06-24T02:35:41.670Z"},"updatedAt":{"$date":"2021-01-18T09:33:52.911Z"},"showLocation":[{"home":false,"poreSize":true,"poreCount":true,"skinTone":true,"clean":true,"munjin":true,"editor":false,"_id":{"$oid":"60055600facefaaa1c4a5c2a"}}],"tabLocation":[{"tip":true,"hit":false,"new":true,"_id":{"$oid":"60055600facefaaa1c4a5c2b"}}],"visible":true},
  ]
  

  userData: any;
  skinAnalyData: any;
  sortMunjinData: any;
  ageRange: any;

  avgCheekPoreSize: any;
  avgCheekPoreCount: any;
  avgForeHeadPoreSize: any;
  avgForeHeadPoreCount: any;
  allAgeAvgData: any;
  mogongSize: any;

  chartAvgCheekPoreSize: any = []; //차트에 보여지는 나이대 평균
  chartAvgCheekPoreUserSize: any = []; //차트에 보여지는 나의 결과
  chartAvgCheekPoreUserSizeDate: any = []; //차트에 보여지는 나의 결과 날짜

  chartAvgCheekPoreCount: any = [];
  chartAvgForeHeadPoreSize: any = [];
  chartAvgForeHeadPoreCount: any = [];
  munjinLastScore: any;
  munjinLastAvgScore: any = [];

  monthTotalSum: any = 0;
  monthTotalAvg: any = 0;

  percentRank : any = -1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public images: ImagesProvider,
    public modalCtrl : ModalController,
    private themeableBrowser: ThemeableBrowser,
    public toastCtrl : ToastController,
    public auth: AuthService,
    ) {
      
      this.navParams.get('userData') ? this.userData = this.navParams.get('userData') : this.userData = "";
      this.navParams.get('skinAnalyData') ? this.skinAnalyData = this.navParams.get('skinAnalyData') : this.skinAnalyData = "";

      
      //문진표 결과
      this.munjinLastScore = Number(this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].sleep)
      this.munjinLastScore = this.munjinLastScore + Number(this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].alcohol)
      this.munjinLastScore = this.munjinLastScore + Number(this.skinAnalyData.munjin[this.skinAnalyData.cheek.length-1].fitness)

      this.sortMunjinData = this.skinAnalyData.munjin;

      this.sortMunjinData.sort(this.custonSort);

      console.log(this.sortMunjinData);
      
    for(let i= 0; i < this.skinAnalyData.munjin.length; i++) {
      //현재 달을 확인해서 가져 온다
      if(this.skinbtnMonth ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
        this.munjinLastAvgScore.push(Number(this.skinAnalyData.munjin[i].sleep) + Number(this.skinAnalyData.munjin[i].alcohol) + Number(this.skinAnalyData.munjin[i].fitness));
        this.monthTotalSum += Number(this.skinAnalyData.munjin[i].sleep) + Number(this.skinAnalyData.munjin[i].alcohol) + Number(this.skinAnalyData.munjin[i].fitness);
      }
        
    }

     this.monthTotalAvg  = Math.floor(this.monthTotalSum / this.munjinLastAvgScore.length);
     if(this.monthTotalAvg) {
      this.images.getAllMunjinData(this.monthTotalAvg).subscribe(data => {
        this.percentRank = Number(data.rank);
        console.log(data);
      },error => {
        console.error(error);
      })
     }

  }

  async ionViewDidLoad() {
    this.lottoNum();
    this.lottoTip();
    this.getSkinAnaly();
    this.getAgeRange();
    this.getAvgSkinPore(this.ageRange);
    this.skinQnaMainLoad();
    this.communityEditorBeautyLoad();
    this.getAllBeautyMovie();

  }

  async ionViewDidEnter(){
     this.skinbtnYear = format(new Date(), 'YYYY');
     this.skinbtnMonth = format(new Date(), 'MM');
     var e = this.skinbtnYear + "년" + this.skinbtnMonth;
  }

  private makeRandom(min, max) {
        var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandVal;
  }

  yearmonthselect(e) {
    var year = e.substr(0, 4);
    var month = e.substr(5, 2);
    var date = year + "-" + month;
    this.chartAvgCheekPoreUserSize = [];
    this.chartAvgCheekPoreUserSizeDate = [];
    this.munjinLastAvgScore = [];
    this.monthTotalSum = 0;
    this.percentRank = -1;
    for(let i= 0; i < this.skinAnalyData.munjin.length; i++) {
      //현재 달을 확인해서 가져 온다
      if(month ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
        this.munjinLastAvgScore.push(Number(this.skinAnalyData.munjin[i].sleep) + Number(this.skinAnalyData.munjin[i].alcohol) + Number(this.skinAnalyData.munjin[i].fitness));
        this.monthTotalSum += Number(this.skinAnalyData.munjin[i].sleep) + Number(this.skinAnalyData.munjin[i].alcohol) + Number(this.skinAnalyData.munjin[i].fitness);
      }
        
    }

    this.monthTotalAvg  = Math.floor(this.monthTotalSum / this.munjinLastAvgScore.length);
     if(this.monthTotalAvg) {
      this.images.getAllMunjinData(this.monthTotalAvg).subscribe(data => {
        this.percentRank = Number(data.rank);
        console.log(data);
      },error => {
        console.error(error);
      })
     }
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

  product_detail(id) {
    let modal = this.modalCtrl.create(ProductDetailPage, { Product_Num: id });
    modal.onDidDismiss(data => {
      // this.ionViewDidEnter();
      console.log("화장품 상세정보 페이지 닫힘");
    });
    modal.present();
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

        //현재 모공 사이즈 총 합
        for(let i= 0; i < this.skinAnalyData.cheek.length; i++) {
           sizeSum += this.skinAnalyData.cheek[i].pore[0].average_pore;
           
           //현재 달을 확인해서 가져 온다
           if(this.skinbtnMonth ===  this.skinAnalyData.cheek[i].input[0].upload_date.substr(5,2)) {
            this.chartAvgCheekPoreUserSize.push(this.skinAnalyData.cheek[i].pore[0].average_pore);
            this.chartAvgCheekPoreUserSizeDate.push(this.skinAnalyData.cheek[i].input[0].upload_date.substr(8,2)+"일"); //업로드한 날짜 기준 현재 달의 데이터만 가져 온다
           }
           
        }
        this.skinAnalyPoreSizeAvg = Math.floor(Number(sizeSum / this.skinAnalyData.cheek.length)); //전체 모공사이즈 평균

        this.skinAnalyPoreSize = Math.floor(this.skinAnalyData.cheek[this.skinAnalyData.cheek.length-1].pore[0].average_pore);//측정일 당일 모공 사이즈
        
        //이전 모공 사이즈 총 합
        for(let i= 0; i < (this.skinAnalyData.cheek.length-1); i++) {
          beforeSum += this.skinAnalyData.cheek[i].pore[0].average_pore;
        }
        this.skinAnalyPoreBeforeSizeAvg = Math.floor(Number(beforeSum / (this.skinAnalyData.cheek.length-1))); //전체 모공사이즈 평균
        
        this.skinAnalyPoreCompareSize =  Number(this.skinAnalyPoreSizeAvg) - Number(this.skinAnalyPoreBeforeSizeAvg);
        this.skinAnalyPoreCompareSize > 0 ? this.skinAnalyPoreCompareSize = "+" + String(this.skinAnalyPoreCompareSize) : this.skinAnalyPoreCompareSize;
        
        //현재 모공 갯수 총합
        for(let i= 0; i < this.skinAnalyData.cheek.length; i++) {
          poreCountSum += this.skinAnalyData.cheek[i].pore[0].pore_count;
        }
        this.skinAnalyPoreCount = Math.floor(Number(poreCountSum / this.skinAnalyData.cheek.length)); //전체 모공사이즈 평균
        
        //이전 모공 갯수 총 합
        for(let i= 0; i < (this.skinAnalyData.cheek.length-1); i++) {
          poreBeforCountSum += this.skinAnalyData.cheek[i].pore[0].pore_count;
        }
        this.skinAnalyPoreBeforeCount = Math.floor(Number(poreBeforCountSum / (this.skinAnalyData.cheek.length-1))); //직전까지 내 평균 모공 갯수
        
        this.skinAnalyPoreCompareCount = this.skinAnalyPoreCount - this.skinAnalyPoreBeforeCount;
        this.skinAnalyPoreCompareCount > 0 ? this.skinAnalyPoreCompareCount = "+" + String(this.skinAnalyPoreCompareCount) : this.skinAnalyPoreCompareCount;

        this.skinTone = this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].tone[0].avgrage_color_hex;

        this.cheekImages.push('http://ec2-52-79-142-125.ap-northeast-2.compute.amazonaws.com/media/images/'+this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].input[0].filename);
        this.cheekImages.push(this.skinAnalyData.cheek[(this.skinAnalyData.cheek.length-1)].pore[0].output_image);

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

  getAgeRange() { //연령대 구하기
    console.log(this.userData.birthday);
    var age = 0;
    var age_range = '';
    age = Number(new Date().getFullYear()) - Number(this.userData.birthday.substr(0,4)) + 1 ;
    this.ageRange = String(age).substr(0,1) + '0';
    console.log(this.ageRange);
  }

  getAvgSkinPore(ageRange) { //연령대 평균 수치 구하기
    this.images.getAvgPore(this.ageRange, this.userData.gender).subscribe(data => {
      this.allAgeAvgData = data.allAvgData;
      this.avgCheekPoreSize = Math.floor(data.avgCheekPoreSize);
      this.avgCheekPoreCount = Math.floor(data.avgCheekPoreCount);
      this.avgForeHeadPoreSize = Math.floor(data.avgForeHeadPoreSize);
      this.avgForeHeadPoreCount = Math.floor(data.avgForeHeadPoreCount);

      for(let k = 0; this.chartAvgCheekPoreSize.length < 31; k++) {
        this.chartAvgCheekPoreSize.push(this.avgCheekPoreSize);
      }

      this.skinAnalyAvgCompare = Math.floor(Number(this.skinAnalyPoreSizeAvg) - Number(this.avgCheekPoreSize));
      // this.left1 = this.skinAnalyPoreSizeAvg - this.avgCheekPoreSize;
      // this.left2 = (this.skinAnalyPoreBeforeSizeAvg - this.avgCheekPoreSize) / this.avgCheekPoreSize * 100 + 50;
      this.left1 = this.barPercent(this.skinAnalyPoreSizeAvg, this.avgCheekPoreSize);
      this.left2 = this.barPercent(this.skinAnalyPoreBeforeSizeAvg, this.avgCheekPoreSize);

      if(this.skinAnalyPoreSizeAvg > this.avgCheekPoreSize) {
        this.mogongSize = "넓은 편";
      } else if (this.skinAnalyPoreSizeAvg === this.avgCheekPoreSize) {
        this.mogongSize = "보통인 편";
      } else {
        this.mogongSize = "좁은 편";
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

  getSleepText(text) {
    switch(text) {
      case 11 : return '5시간 이하';
      case 22 : return '6~7시간';
      case 33 : return '8시간 이상';
      default : return '-';
    } 
  }

  getAlcoholText(text) {
    switch(text) {
      case 11 : return '대량';
      case 22 : return '소량';
      case 33 : return '없음';
      default : return '-';
    } 
  }

  getFitnessText(text) {
    switch(text) {
      case 11 : return '없음';
      case 22 : return '90분 이하';
      case 33 : return '90분 이상';
      default : return '-';
    } 
  }
  
  custonSort(a, b) { if(b.created_at == a.created_at){ return 0} return b.created_at > a.created_at ? 1 : -1; }

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
