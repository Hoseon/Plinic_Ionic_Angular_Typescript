import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, Loading, LoadingController, ModalController } from 'ionic-angular';
import { ItemSearchPage } from '../item-search/item-search'
import { SkinChekMunjinPage } from '../skin-chek-munjin/skin-chek-munjin'
import { SkinChekCamera1Page } from '../skin-chek-camera1/skin-chek-camera1'
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture'
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { ProductDetailPage } from '../product-detail/product-detail';
/**
 * Generated class for the SkinChekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-chek',
  templateUrl: 'skin-chek.html',
})
export class SkinChekPage {

  userData: any; 
  jwtHelper: JwtHelper = new JwtHelper();
  isLoadMain : boolean = false;
  isLoadSub : boolean = false;
  loadMainData : any;
  loadSubData : any;
  loading: Loading;
  


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public auth: AuthService,
    public images: ImagesProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad SkinChekPage');
    await this.loadItems();
    
  }

  async ionViewDidEnter(){
    this.showLoading();
    console.log('ionViewDidEnter SkinChekPage');
    await this.loadMyMainProduct();
    await this.loadMySubProduct();
    await this.loading.dismiss();
  }
    
 

  search_mainitem(isNew) {
    if(isNew==='new') {
      var isNewMode = 'new';
    } else {
      var isNewMode = 'edit';
    }
    this.navCtrl.push(ItemSearchPage,{mode:'main', isNew: isNewMode}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      this.loadMyMainProduct();
      });
    });
  }

  search_subitem(isNew) {
    if(isNew==='new') {
      var isNewMode = 'new';
    } else {
      var isNewMode = 'edit';
    }
    this.navCtrl.push(ItemSearchPage,{mode:'sub', isNew: isNewMode}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      this.loadMySubProduct();
      });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  public loadMyMainProduct() {
    this.images.myMainProductLoad(this.userData.email).subscribe(data => {
      if(data != '') {
        console.log("loadmaindata" + JSON.stringify(data));
        this.isLoadMain = true;
        this.loadMainData = data;
      }
    }, error => {
      this.loading.dismiss();
      console.log("메인 화장품 불러 오기 에러 : " + error);
    })
  }

  public loadMySubProduct() {
    this.images.mySubProductLoad(this.userData.email).subscribe(data => {
      if(data != '') {
        console.log("loadsubdata" + JSON.stringify(data));
        this.isLoadSub = true;
        this.loadSubData = data;
      }
    }, error => {
      this.loading.dismiss();
      console.log("서브 화장품 불러오기 에러 : " + error);
    })
  }


  public loadItems() {
    this.auth.getUserStorage().then(items => {

      if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver') {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: items.birthday,
          email: items.email,
          gender: items.gender,
          nickname: items.nickname,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: items.from,
          snsid: items.snsid
        };
      } else {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: items.birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: items.gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
        };
      }
    }, error =>{
      console.log("사용자 정보 불러 오기 에러 : " + error);
    });
  }

  public next() {
    this.navCtrl.push(SkinChekMunjinPage).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("설문 페이지 닫힘");
      });
    });
  }

  public showLoading() {
    this.loading = this.loadingCtrl.create({
      content : "데이터를 불러오는중입니다"
    })
    this.loading.present();
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
