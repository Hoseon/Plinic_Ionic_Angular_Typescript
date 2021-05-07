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
  randomTip: any = [
    { "_id": { "$oid": "605c593127b9d5cbec9deff0" }, "views": 25, "editor": false, "like": 0, "likeuser": [""], "visible": true, "seq": 3, "body": "[뷰티노트] 치아를 변색시키는 음식 TOP5", "midtext": "누런 치아... 피해야 할 다섯 가지 음식!", "posturl": "http://naver.me/x7vnjOtd", "filename": "image-1616664955456", "originalName": "썸네일_210325.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 59, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "605c597b27b9d5cbec9deff3" } }], "tabLocation": [{ "tip": true, "hit": false, "new": true, "_id": { "$oid": "605c597b27b9d5cbec9deff4" } }], "comments": [], "createdAt": { "$date": "2021-03-25T09:34:41.846Z" }, "created": { "$date": "2021-03-25T09:34:41.846Z" }, "__v": 0, "updatedAt": { "$date": "2021-03-31T08:31:01.087Z" } },
    { "_id": { "$oid": "6041c0567f7ac9c2d624f9d6" }, "views": 25, "editor": false, "like": 0, "likeuser": [""], "visible": true, "seq": 6, "body": "[스킨노트] 쥐젖 원인과 제거 방법", "midtext": "오돌토돌 쥐젖... 원인과 제거 방법까지 알아보자!", "posturl": "https://blog.naver.com/plinic/222265280648", "filename": "image-1614921814424", "originalName": "쥐젖.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 55, "showLocation": [{ "home": true, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "6041c0567f7ac9c2d624f9d7" } }], "tabLocation": [{ "tip": true, "hit": false, "new": true, "_id": { "$oid": "6041c0567f7ac9c2d624f9d8" } }], "comments": [], "createdAt": { "$date": "2021-03-05T05:23:34.787Z" }, "created": { "$date": "2021-03-05T05:23:34.787Z" }, "__v": 0, "updatedAt": { "$date": "2021-03-31T08:31:19.268Z" } },
    { "_id": { "$oid": "6020ce48924c3cafc607cfc7" }, "views": 5, "editor": false, "like": 0, "likeuser": [""], "visible": true, "seq": 99, "body": "[스킨노트] 건성 피부에 나쁜 음식 TOP5", "midtext": "건성 피부인들 주목! 피해야할 음식을 알아보자", "posturl": "http://naver.me/5MU8bVnr", "filename": "image-1612762809769", "originalName": "210208_2.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 51, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "6020ceb9924c3cafc607cfca" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "6020ceb9924c3cafc607cfcb" } }], "comments": [], "createdAt": { "$date": "2021-02-08T05:38:16.737Z" }, "created": { "$date": "2021-02-08T05:38:16.737Z" }, "__v": 0, "updatedAt": { "$date": "2021-02-08T05:40:09.903Z" } },
    { "_id": { "$oid": "601bb12e6264ceaf4ddafa6e" }, "views": 2, "editor": false, "like": 0, "likeuser": [""], "visible": true, "seq": 99, "body": "[스킨노트] 다크서클에 좋은 음식 TOP5", "midtext": "칙칙한 눈 밑을 밝혀주는 음식 다섯 가지!", "posturl": "http://naver.me/5TXkq5jC", "filename": "image-1612427566412", "originalName": "210204_5.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 48, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "601bb12e6264ceaf4ddafa6f" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "601bb12e6264ceaf4ddafa70" } }], "comments": [], "createdAt": { "$date": "2021-02-04T08:32:46.576Z" }, "created": { "$date": "2021-02-04T08:32:46.576Z" }, "__v": 0 },
    { "_id": { "$oid": "601ba38c6264ceaf4ddafa68" }, "views": 6, "editor": false, "like": 0, "likeuser": [""], "visible": true, "seq": 99, "body": "[스킨노트] 안면 홍조에 좋은 음식 TOP5", "midtext": "붉게 달아오르는 홍조를 잠재워 줄 다섯 가지 음식!", "posturl": "http://naver.me/xxxPRDYO", "filename": "image-1612424076635", "originalName": "210204_3.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 46, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "601ba38c6264ceaf4ddafa69" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "601ba38c6264ceaf4ddafa6a" } }], "comments": [], "createdAt": { "$date": "2021-02-04T07:34:36.780Z" }, "created": { "$date": "2021-02-04T07:34:36.780Z" }, "__v": 0 },
    { "_id": { "$oid": "601394b1d92b95ae2db21e59" }, "views": 11, "editor": false, "like": 0, "likeuser": [""], "visible": true, "seq": 40, "body": "[스킨노트]튼살 예방과 치료에 좋은 음식 TOP5", "midtext": "미운 튼살... 예방과 치료에 도움되는 음식 다섯 가지!", "posturl": "http://naver.me/GMFc86VO", "filename": "image-1611896882760", "originalName": "300.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 38, "showLocation": [{ "home": false, "poreSize": true, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "60139832d92b95ae2db21e68" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "60139832d92b95ae2db21e69" } }], "comments": [], "createdAt": { "$date": "2021-01-29T04:53:05.533Z" }, "created": { "$date": "2021-01-29T04:53:05.534Z" }, "__v": 0, "updatedAt": { "$date": "2021-01-29T05:39:38.613Z" } },
    { "_id": { "$oid": "600fb00e575093ac05748fc5" }, "views": 21, "editor": false, "like": 0, "likeuser": [""], "visible": true, "seq": 40, "body": "[뷰티노트]탈모를 부르는 나쁜 습관 TOP5", "midtext": "쑥쑥 빠지는 머리카락... 원인이 되는 나쁜 습관을 고쳐보자!", "posturl": "http://naver.me/xFpJN3ah", "filename": "image-1612271913417", "originalName": "210118_17.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 35, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": false, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "60195129f772e7aef6eacc1f" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "60195129f772e7aef6eacc20" } }], "comments": [], "createdAt": { "$date": "2021-01-26T06:00:46.793Z" }, "created": { "$date": "2021-01-26T06:00:46.793Z" }, "__v": 0, "updatedAt": { "$date": "2021-02-02T13:18:33.549Z" } },
    { "_id": { "$oid": "6009438f33ac8cab3f5b10a5" }, "views": 18, "editor": false, "like": 0, "likeuser": [""], "visible": true, "seq": 40, "body": "[스킨노트] 주름에 좋은 천역팩 TOP5", "midtext": "주름 케어에 효과적인 천연팩 다섯가지를 알아보자", "posturl": "http://naver.me/FbBGFE5O", "filename": "image-1611895290096", "originalName": "15.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 33, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "601391fad92b95ae2db21e3f" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "601391fad92b95ae2db21e40" } }], "comments": [], "createdAt": { "$date": "2021-01-21T09:04:15.151Z" }, "created": { "$date": "2021-01-21T09:04:15.152Z" }, "__v": 0, "updatedAt": { "$date": "2021-01-29T05:39:52.555Z" } },
    { "_id": { "$oid": "6005221de17bdaa9c5df835f" }, "views": 12, "editor": false, "like": 0, "likeuser": [""], "visible": true, "body": "[스킨노트] 피부 속건조 해결책!", "midtext": "피부 속이 당기고 건조할 때 따라하는 스킨 케어 방법!", "posturl": "http://naver.me/5mYs7VAR", "filename": "image-1611640651911", "originalName": "210118_8.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 24, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "600faf4c575093ac05748fc3" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "600faf4c575093ac05748fc4" } }], "comments": [], "createdAt": { "$date": "2021-01-18T05:52:29.805Z" }, "created": { "$date": "2021-01-18T05:52:29.805Z" }, "__v": 0, "seq": 40, "updatedAt": { "$date": "2021-01-29T05:35:50.308Z" } },
    { "_id": { "$oid": "60051f92e17bdaa9c5df834b" }, "views": 12, "editor": false, "like": 0, "likeuser": [""], "visible": true, "body": "[화잘알사] 선블록 똑똑하게 고르기", "midtext": "다양한 자외선 차단제 중에서 나는 어떤 걸 써야할까? ", "posturl": "http://naver.me/FJBaeduc", "filename": "image-1611640340621", "originalName": "210118_7.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 23, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "600fae14575093ac05748fad" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "600fae14575093ac05748fae" } }], "comments": [], "createdAt": { "$date": "2021-01-18T05:41:38.227Z" }, "created": { "$date": "2021-01-18T05:41:38.227Z" }, "__v": 0, "seq": 70, "updatedAt": { "$date": "2021-01-29T05:37:23.082Z" } },
    { "_id": { "$oid": "6004f176c3ae02a956f129ff" }, "views": 23, "editor": false, "like": 0, "likeuser": [""], "visible": true, "body": "[스킨노트] 에디터 홈케어 일기 1", "midtext": "플리닉 에디터 '도도'의 4주 플리닉 프로젝트 시작!", "posturl": "http://naver.me/5bXWSFKm", "filename": "image-1611896246397", "originalName": "01.jpg", "author": { "$oid": "6004e920c3ae02a956f129ee" }, "numId": 16, "showLocation": [{ "home": true, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "601395b6d92b95ae2db21e66" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "601395b6d92b95ae2db21e67" } }], "comments": [], "createdAt": { "$date": "2021-01-18T02:24:54.909Z" }, "created": { "$date": "2021-01-18T02:24:54.909Z" }, "__v": 0, "seq": 70, "updatedAt": { "$date": "2021-01-29T05:38:35.945Z" } },
    { "_id": { "$oid": "5f292cad3425774b4fa86795" }, "views": 70, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트] 여드름 피부관리법 TOP5", "midtext": "여드름과 뾰루지를 해결해주는 피부관리법 다섯가지", "posturl": "http://naver.me/GpP8P4BY", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 86, "filename": "image-1611640493166", "originalName": "210118_12.jpg", "comments": [], "createdAt": { "$date": "2020-08-04T09:38:53.236Z" }, "created": { "$date": "2020-08-04T09:38:53.236Z" }, "__v": 2, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "600faead575093ac05748fb9" } }], "visible": true, "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "600faead575093ac05748fba" } }], "updatedAt": { "$date": "2021-01-29T05:36:33.918Z" }, "seq": 40 },
    { "_id": { "$oid": "5f1fe383001c2849fd2f637f" }, "views": 60, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]장마철 피부관리법 TOP5", "midtext": "장마철에 특별히 신경써야 하는 피부관리법 다섯가지!", "posturl": "http://naver.me/535RPHKd", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 85, "filename": "image-1611640510674", "originalName": "210118_14.jpg", "comments": [], "createdAt": { "$date": "2020-07-28T08:36:19.147Z" }, "created": { "$date": "2020-07-28T08:36:19.147Z" }, "__v": 3, "visible": true, "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "600faebf575093ac05748fbc" } }], "updatedAt": { "$date": "2021-01-29T05:36:24.679Z" }, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "600faebf575093ac05748fbb" } }], "seq": 40 },
    { "_id": { "$oid": "5f0d7ab109b9374671f16e19" }, "views": 37, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]지성피부에 좋은 음식 TOP5", "midtext": "지성피부인들 모여라! 지성피부에 좋은 음식 다섯가지 ", "posturl": "http://naver.me/G3t2tdVJ", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 83, "filename": "image-1611640572044", "originalName": "210118_15.jpg", "comments": [], "createdAt": { "$date": "2020-07-14T09:28:17.746Z" }, "created": { "$date": "2020-07-14T09:28:17.746Z" }, "__v": 1, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "600faefc575093ac05748fbf" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "600faefc575093ac05748fc0" } }], "visible": true, "updatedAt": { "$date": "2021-01-29T05:36:08.052Z" }, "seq": 40 },
    { "_id": { "$oid": "5f02ec4156553a4464ad4c84" }, "views": 111, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]건성피부에 좋은 음식 TOP5", "midtext": "건성피부인들 모여라! 건성피부에 좋은 음식 다섯가지", "posturl": "http://naver.me/FwwfZe6p", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 82, "filename": "image-1611640599596", "originalName": "210118_16.jpg", "comments": [], "createdAt": { "$date": "2020-07-06T09:17:53.838Z" }, "created": { "$date": "2020-07-06T09:17:53.838Z" }, "__v": 2, "editorUpdateAt": { "$date": "2020-07-14T09:28:36.655Z" }, "updatedAt": { "$date": "2021-01-29T05:35:59.401Z" }, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "600faf17575093ac05748fc1" } }], "visible": true, "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "600faf17575093ac05748fc2" } }], "seq": 40 },
    { "_id": { "$oid": "5efafaa0d24bad43fc440b5a" }, "views": 39, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[뷰티노트]치아미백에 좋은 음식 Top5!", "midtext": "피부 미백만큼 신경쓰이는 치아 미백에 좋은 음식 다섯가지", "posturl": "http://naver.me/FR7SieLY", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 80, "filename": "image-1612271973138", "originalName": "210118_19.jpg", "comments": [], "createdAt": { "$date": "2020-06-30T08:41:04.680Z" }, "created": { "$date": "2020-06-30T08:41:04.680Z" }, "__v": 1, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": false, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "60195165f772e7aef6eacc21" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "60195165f772e7aef6eacc22" } }], "visible": true, "updatedAt": { "$date": "2021-02-02T13:19:33.265Z" }, "seq": 40 },
    { "_id": { "$oid": "5ee89543b8c0c9412620823d" }, "views": 64, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]흡연이 피부에 미치는 영향 TOP5", "midtext": "흡연이 피부에 안 좋은 이유 다섯 가지를 알아보자", "posturl": "http://naver.me/xRQN3yQy", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 77, "filename": "image-1611640927098", "originalName": "210118_22.jpg", "comments": [], "createdAt": { "$date": "2020-06-16T09:47:47.901Z" }, "created": { "$date": "2020-06-16T09:47:47.901Z" }, "__v": 2, "editorUpdateAt": { "$date": "2020-06-24T02:36:08.840Z" }, "updatedAt": { "$date": "2021-01-29T05:35:23.553Z" }, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "600fb05f575093ac05748fce" } }], "visible": true, "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "600fb05f575093ac05748fcf" } }], "seq": 40 },
    { "_id": { "$oid": "5ede091227251938d50424a4" }, "views": 137, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]수면이 피부에 미치는영향 TOP5", "midtext": "피부관리의 기본! 수면이 피부에 미치는 영향 다섯가지", "posturl": "http://naver.me/xGnTnHdU", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 76, "filename": "image-1611640944371", "originalName": "210118_23.jpg", "comments": [], "createdAt": { "$date": "2020-06-08T09:46:58.796Z" }, "created": { "$date": "2020-06-08T09:46:58.796Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:35:55.683Z" }, "updatedAt": { "$date": "2021-01-29T05:38:53.655Z" }, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "600fb070575093ac05748fd0" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "600fb070575093ac05748fd1" } }], "visible": true, "seq": 40 },
    { "_id": { "$oid": "5ed4b58c7fe72535014d7021" }, "views": 127, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]음주가 피부에 미치는 영향 TOP5", "midtext": "푸석해진 내피부... 과음이 피부에 미치는 영향 다섯가지", "posturl": "http://naver.me/xSjljrTa", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 75, "filename": "image-1611640961348", "originalName": "210118_24.jpg", "comments": [], "createdAt": { "$date": "2020-06-01T08:00:12.600Z" }, "created": { "$date": "2020-06-01T08:00:12.600Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:35:41.670Z" }, "updatedAt": { "$date": "2021-01-29T05:35:15.269Z" }, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "600fb081575093ac05748fd2" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "600fb081575093ac05748fd3" } }], "visible": true, "seq": 40 },
    { "_id": { "$oid": "5ecb7515d1add43003b7709e" }, "views": 122, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]스트레스가 피부에 미치는 영향 TOP5", "posturl": "http://naver.me/FEtTtwxo", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 74, "filename": "image-1611895567555", "originalName": "06.jpg", "comments": [], "createdAt": { "$date": "2020-05-25T07:34:45.610Z" }, "created": { "$date": "2020-05-25T07:34:45.610Z" }, "midtext": "스트레스가 피부에 미치는 영향 다섯가지를 알아보자", "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:35:27.060Z" }, "updatedAt": { "$date": "2021-01-29T05:32:35.346Z" }, "seq": 40, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "6013930fd92b95ae2db21e53" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "6013930fd92b95ae2db21e54" } }], "visible": true },
    { "_id": { "$oid": "5ec4cd274f693c262a959c5e" }, "views": 99, "editor": false, "like": 0, "likeuser": [""], "title": "[성분분석]", "body": "[스킨노트] 플라즈마가 피부에 좋은 이유!", "posturl": "http://naver.me/54VZeW6t", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 72, "filename": "image-1611895486297", "originalName": "08.jpg", "comments": [], "createdAt": { "$date": "2020-05-20T06:24:39.963Z" }, "created": { "$date": "2020-05-20T06:24:39.963Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-02T02:58:38.812Z" }, "updatedAt": { "$date": "2021-01-29T05:33:00.635Z" }, "midtext": "플라스마가 피부에 미치는 영향을 알아보자", "showLocation": [{ "home": true, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "601392bed92b95ae2db21e4f" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "601392bed92b95ae2db21e50" } }], "visible": true, "seq": 40 },
    { "_id": { "$oid": "5ec4c9c94f693c262a959c59" }, "views": 99, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트] 피부에 좋은 습관 TOP5", "posturl": "http://naver.me/xfcvka16", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 67, "filename": "image-1612273718412", "originalName": "10.jpg", "comments": [], "createdAt": { "$date": "2020-05-20T06:10:17.530Z" }, "created": { "$date": "2020-05-20T06:10:17.530Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:33:57.822Z" }, "midtext": "피부가 저절로 좋아지는 습관 다섯가지", "updatedAt": { "$date": "2021-02-02T13:48:38.471Z" }, "seq": 40, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "60195836f772e7aef6eacc27" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "60195836f772e7aef6eacc28" } }], "visible": true },
    { "_id": { "$oid": "5ec4c96f4f693c262a959c58" }, "views": 101, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]피부트러블에 안 좋은 음식 TOP5", "posturl": "http://naver.me/Fmgx60cv", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 66, "filename": "image-1611895389808", "originalName": "11.jpg", "comments": [], "createdAt": { "$date": "2020-05-20T06:08:47.039Z" }, "created": { "$date": "2020-05-20T06:08:47.039Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:33:13.900Z" }, "midtext": "피부트러블을 유발하는 다섯가지 음식은?", "updatedAt": { "$date": "2021-01-29T05:33:25.768Z" }, "seq": 40, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "6013925dd92b95ae2db21e47" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "6013925dd92b95ae2db21e48" } }], "visible": true },
    { "_id": { "$oid": "5ec4c8df4f693c262a959c57" }, "views": 107, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]피부트러블에 좋은 음식 TOP5", "posturl": "http://naver.me/Fmgx60cv", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 65, "filename": "image-1611895371958", "originalName": "12.jpg", "comments": [], "createdAt": { "$date": "2020-05-20T06:06:23.385Z" }, "created": { "$date": "2020-05-20T06:06:23.385Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:33:00.492Z" }, "midtext": "피부트러블 개선에 효과적인 음식 다섯가지!", "updatedAt": { "$date": "2021-01-29T05:33:34.405Z" }, "seq": 40, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "6013924cd92b95ae2db21e45" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "6013924cd92b95ae2db21e46" } }], "visible": true },
    { "_id": { "$oid": "5ec4c86d4f693c262a959c56" }, "views": 106, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]기미와 주끈깨에 좋은 음식 TOP5", "posturl": "http://naver.me/xsvfvEil", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 64, "filename": "image-1611895328321", "originalName": "13.jpg", "comments": [], "createdAt": { "$date": "2020-05-20T06:04:29.168Z" }, "created": { "$date": "2020-05-20T06:04:29.168Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:31:51.997Z" }, "midtext": "기미와 주끈깨 관리에 도움을 주는 음식 다섯가지", "updatedAt": { "$date": "2021-01-29T05:33:44.389Z" }, "seq": 40, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "60139220d92b95ae2db21e43" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "60139220d92b95ae2db21e44" } }], "visible": true },
    { "_id": { "$oid": "5ec4c81f4f693c262a959c55" }, "views": 101, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀템]", "body": "[스킨노트]피부진정에 좋은 음식 TOP5", "posturl": "http://naver.me/GvFsFoI5", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 63, "filename": "image-1612423845508", "originalName": "14.jpg", "comments": [], "createdAt": { "$date": "2020-05-20T06:03:11.148Z" }, "created": { "$date": "2020-05-20T06:03:11.148Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:31:15.223Z" }, "midtext": "예민해진 피부를 진정시키는 다섯가지 음식", "updatedAt": { "$date": "2021-02-04T07:30:45.572Z" }, "seq": 40, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "601ba2a56264ceaf4ddafa66" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "601ba2a56264ceaf4ddafa67" } }], "visible": true },
    { "_id": { "$oid": "5ec4c71b4f693c262a959c53" }, "views": 96, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]피부 탄력에 좋은 음식 TOP5", "posturl": "http://naver.me/xaspswkS", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 61, "filename": "image-1611895262574", "originalName": "16.jpg", "comments": [], "createdAt": { "$date": "2020-05-20T05:58:51.726Z" }, "created": { "$date": "2020-05-20T05:58:51.726Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:29:45.153Z" }, "midtext": "내 피부의 탄력을 높여주는 음식 다섯가지", "updatedAt": { "$date": "2021-01-29T05:34:03.750Z" }, "seq": 40, "showLocation": [{ "home": false, "poreSize": true, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "601391ded92b95ae2db21e3d" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "601391ded92b95ae2db21e3e" } }], "visible": true },
    { "_id": { "$oid": "5e8ed483fcc124203fe306e9" }, "views": 97, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트] 아토피에 좋은 음식 TOP5 ", "posturl": "http://naver.me/Gi9uE1Lg", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 56, "filename": "image-1611895101544", "originalName": "21.jpg", "comments": [], "createdAt": { "$date": "2020-04-09T07:53:39.305Z" }, "created": { "$date": "2020-04-09T07:53:39.305Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:27:51.025Z" }, "updatedAt": { "$date": "2021-01-29T05:35:01.280Z" }, "midtext": "골칫덩어리 아토피... 도움 되는 음식 다섯 가지를 알아보자!", "seq": 40, "showLocation": [{ "home": false, "poreSize": false, "poreCount": true, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "6013913ed92b95ae2db21e33" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "6013913ed92b95ae2db21e34" } }], "visible": true },
    { "_id": { "$oid": "5e8ed42bfcc124203fe306e8" }, "views": 98, "editor": false, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[스킨노트]피부와 불면증에 좋은 음식 Top5 ", "posturl": "http://naver.me/I5SAPa3x", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 55, "filename": "image-1612256536723", "originalName": "210202_1.jpg", "comments": [], "createdAt": { "$date": "2020-04-09T07:52:11.671Z" }, "created": { "$date": "2020-04-09T07:52:11.671Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:27:34.819Z" }, "updatedAt": { "$date": "2021-02-02T09:02:16.805Z" }, "midtext": "불면증을 해결하고 피부를 좋아지게 하는 음식 다섯 가지", "seq": 40, "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "60191518f772e7aef6eacc18" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "60191518f772e7aef6eacc19" } }], "visible": true },
    { "_id": { "$oid": "5e8ed397fcc124203fe306e6" }, "views": 132, "editor": true, "like": 0, "likeuser": [""], "title": "[뷰티꿀팁]", "body": "[뷰티노트]얼굴이 작아지는 마사지", "posturl": "http://naver.me/58hwhZ43", "author": { "$oid": "5dca243975198204f8f5a2f4" }, "numId": 53, "filename": "image-1612275667550", "originalName": "210202_4.jpg", "comments": [], "createdAt": { "$date": "2020-04-09T07:49:43.155Z" }, "created": { "$date": "2020-04-09T07:49:43.155Z" }, "__v": 1, "editorUpdateAt": { "$date": "2020-06-24T02:26:57.906Z" }, "updatedAt": { "$date": "2021-02-02T14:21:07.652Z" }, "midtext": "따라하면 얼굴이 작아지는 마사지 방법을 알아봐요!", "showLocation": [{ "home": false, "poreSize": false, "poreCount": false, "skinTone": true, "clean": true, "munjin": true, "editor": false, "_id": { "$oid": "60195fd3f772e7aef6eacc2b" } }], "tabLocation": [{ "tip": true, "hit": false, "new": false, "_id": { "$oid": "60195fd3f772e7aef6eacc2c" } }], "visible": true, "seq": 16 },
    
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
