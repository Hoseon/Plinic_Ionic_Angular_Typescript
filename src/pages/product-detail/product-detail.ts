import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { ProductSungbunPage } from '../product-sungbun/product-sungbun';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ProductReviewPage } from '../product-review/product-review';


/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  product_Num: any;
  adUrl: any;
  productTitle: any;
  productURL: any;
  productData: any;
  ingredient: Array<any> = new Array<any>();
  preFunction: Array<any> = new Array<any>();
  function: Array<any> = new Array<any>();
  preIngredient: any;
  orderStyle: any = "최신순 ∨"; 

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
    private auth: AuthService,
    private images: ImagesProvider,
    private themeableBrowser: ThemeableBrowser,
    private modalCtrl : ModalController,
  ) {
    if(this.navParams.get('Product_Num')){
      this.product_Num = this.navParams.get('Product_Num');
      console.log(this.product_Num);
    }
  }

  async ionViewDidLoad() {
    await this.loadProductData();
    this.randomUrl();
    console.log('ionViewDidLoad ProductDetailPage');
  }

  ionViewDidEnter(){
   
  }

  loadProductData() {
    this.images.getProductDetail(this.product_Num).subscribe(data => {
      this.productData = data;
      if(data.ingredient != '') {
        for(let i = 0; i < data.ingredient.length; i++) {
          this.ingredient[i] = data.ingredient[i].korean_name 
        }
        // console.log(this.productData.function.length);
        this.preFunction = data.function.split(',');
        if(this.preFunction.length >= 4) {
          this.function[0] = this.preFunction[0];
          this.function[1] = this.preFunction[1];
          this.function[2] = this.preFunction[2];
        } else {
          this.function = this.preFunction;
        }
      }
      console.log(this.function);
    }, error => {
      alert("상품 데이터 가져오기 에러");
    })
  }

  private makeRandom(min, max) {
        var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandVal;
  }

  randomUrl() {
    var urlNo;
    urlNo = this.makeRandom(1,3);
    
    switch(urlNo) {
      case 1 : this.adUrl = 'assets/img/beauty/beauty_ad_1.png';
               this.productTitle = '플리닉 크림';
               this.productURL = 'https://www.plinicshop.com/Products/Details/1863';
                break;
      case 2 : this.adUrl = 'assets/img/beauty/beauty_ad_2.png';
               this.productTitle = '뷰셀리온';
               this.productURL = 'https://www.plinicshop.com/Products/Details/1968';
                break;
      case 3 : this.adUrl = 'assets/img/beauty/beauty_ad_3.png';
               this.productTitle = '레스테틱';
               this.productURL = 'https://www.plinicshop.com/Products/Details/1832';
                break;   
      default : this.adUrl = 'assets/img/beauty/beauty_ad_1.png';
                this.productTitle = '플리닉 크림';
                this.productURL = 'https://www.plinicshop.com/Products/Details/1863';
    }
  }

  openBrowser_android(url, title) {

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

  junsungbun() {
    // this.navCtrl.push(ProductSungbunPage, { productData :this.productData }).then(() => {
    //   this.navCtrl.getActive().onDidDismiss(data => {
    //     console.log("전성분 페이지 닫힘");
    //   });
    // });
    let modal = this.modalCtrl.create(ProductSungbunPage, { productData: this.productData });
      modal.present();
      modal.onDidDismiss(data => {
        console.log("전성분 페이지 닫힘");
    });
  }

  write_Review(product_num) {
    this.navCtrl.push(ProductReviewPage, {productData : this.productData }).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("페이지 닫힘");
      });
    });
  }


}
