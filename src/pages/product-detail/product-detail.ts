import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { ProductSungbunPage } from '../product-sungbun/product-sungbun';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';


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
  preIngredient: any;
  orderStyle: any = "최신순 ∨"; 

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

        console.log(this.productData);
      }
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


}
