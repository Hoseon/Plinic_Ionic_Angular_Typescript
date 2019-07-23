import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content, ModalController, Slides, Platform, Loading, LoadingController, ToastController} from 'ionic-angular';
import { CommunityModifyPage } from './community-modify/community-modify';
import { CommunityWritePage } from './community-write/community-write';
import { MyPage } from './my/my';
import { ImagesProvider } from '../../providers/images/images';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { DOCUMENT } from '@angular/common';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service';



/**
 * Generated class for the CommunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage {
  jwtHelper: JwtHelper = new JwtHelper();
  userData: any;
  profileimg_url: any;
  from: any;
  thumb_image: any;
  @ViewChild(Content) content: Content;

  page = "0";
  beautyData: any;
  communityBeautyLoadData: any;
  beautyNoteData: any;
  beautyNoteMainData: any;
  skinQnaData: any;
  skinQnaMainData: any;
  exhibitionData: any;
  communityEditorBeautyLoadData: any;
  beauty_data_type1: any;
  beauty_data_title1: any;
  beauty_data_id1: any;
  beauty_data_url1: any;
  beauty_data_type2: any;
  beauty_data_title2: any;
  beauty_data_id2: any;
  beauty_data_url2: any;
  beauty_data_type3: any;
  beauty_data_title3: any;
  beauty_data_id3: any;
  beauty_data_url3: any;
  beauty_data_type4: any;
  beauty_data_title4: any;
  beauty_data_id4: any;
  beauty_data_url4: any;
  loading: Loading;


  @ViewChild(Slides) slides: Slides;

  constructor(private toastCtrl: ToastController, private authService: AuthService, public loadingCtrl: LoadingController, public nav: NavController, public navParams: NavParams, private alertCtrl: AlertController, public modalCtrl: ModalController, private images: ImagesProvider, public platform: Platform
    , private themeableBrowser: ThemeableBrowser, @Inject(DOCUMENT) document) {


    this.platform.ready().then((readySource) => {

      console.log(this.navParams.get('back'));
      // this.roadbeauty();
      // this.communityEditorBeautyLoad();
      // this.communityBeautyLoad();
      // this.beautyNoteLoad();
      // this.beautyNoteMainLoad();
      // this.skinQnaLoad();
      // this.skinQnaMainLoad();
    });
  }

  ionViewCanEnter() {
    this.loadItems();
  }

  ionViewWillEnter() {
    this.showLoading();
    this.roadbeauty();
    this.communityEditorBeautyLoad();
    this.communityBeautyLoad();
    this.beautyNoteLoad();
    this.beautyNoteMainLoad();
    this.skinQnaLoad();
    this.skinQnaMainLoad();
    this.exhibitionLoad();
    // this.loading.dismiss();

    if(this.page === '2' || this.page === '3'){
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        //tabs[ key ].style.transform = 'translateY(0)';
        tabs[key].style.display = '';
      });
    }
    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);
  }
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityPage');

  }

  selectedTab(tab) {
    this.slides.slideTo(tab);

    console.log('  this.slides.slideTo(tab)===================' + tab);
  }

  slideChanged($event) {
    this.page = $event._snapIndex.toString();

    //   if(this.page==='0'){
    //   let tabs = document.querySelectorAll('.tabbar');
    //   if (tabs !== null) {
    //     Object.keys(tabs).map((key) => {
    //       tabs[ key ].style.transform = 'translateY(0)';
    //       tabs[key].style.display = 'block';
    //       tabs[key].style.display = '';
    //     });
    //   }
    //   }else{
    //   let tabs = document.querySelectorAll('.tabbar');
    //   if (tabs !== null) {
    //     Object.keys(tabs).map((key) => {
    //       //tabs[ key ].style.transform = 'translateY(0)';
    //       tabs[key].style.display = 'none';
    //     });
    //   }
    // }
    //
    // document.getElementById("view").style.display = "block";
    //     document.getElementById("view").style.display = "none";

    if (this.page !== '0' && this.page !== '1' && this.page !== '2' && this.page !== '3' && this.page !== '4') {
      setTimeout(() => {
        this.slides.slideTo(0, 0);
      }, 100)
    }
  }


  public roadbeauty() {
    this.images.mainbeautyRoad().subscribe(data => {
      this.beauty_data_type1 = data[0].title;
      this.beauty_data_title1 = data[0].body;
      this.beauty_data_id1 = data[0]._id;
      this.beauty_data_url1 = data[0].posturl;
      this.beauty_data_type2 = data[1].title;
      this.beauty_data_title2 = data[1].body;
      this.beauty_data_id2 = data[1]._id;
      this.beauty_data_url2 = data[1].posturl;
      this.beauty_data_type3 = data[2].title;
      this.beauty_data_title3 = data[2].body;
      this.beauty_data_id3 = data[2]._id;
      this.beauty_data_url3 = data[2].posturl;
      this.beauty_data_type4 = data[3].title;
      this.beauty_data_title4 = data[3].body;
      this.beauty_data_id4 = data[3]._id;
      this.beauty_data_url4 = data[3].posturl;
      this.beautyData = data;
    });
  }

  public communityEditorBeautyLoad() {
    this.images.communityEditorBeautyLoad().subscribe(data => {
      this.communityEditorBeautyLoadData = data;
    });
  }

  public communityBeautyLoad() {
    this.images.communityBeautyLoad().subscribe(data => {
      this.communityBeautyLoadData = data;
    });
  }

  public beautyNoteLoad() {
    this.images.beautyNoteLoad().subscribe(data => {
      this.beautyNoteData = data;
    });
  }

  public beautyNoteMainLoad() {
    this.images.beautyNoteMainLoad().subscribe(data => {
      this.beautyNoteMainData = data;
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

  public exhibitionLoad() {
    this.images.exhibitionLoad().subscribe(data => {
      this.exhibitionData = data;
    });
  }

  openBrowser_ioslike(url, title, id, user, mode) {
    // https://ionicframework.com/docs/native/themeable-browser/

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {

          wwwImage: 'assets/img/like/like.png',
          // wwwImagePressed: 'assets/img/like/dislike.png',
          align: 'right',
          event: 'sharePressed'
        }
      ],
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
      browser.executeScript({
        code: ""
      });
      console.log("idididididididid : " + id);
      console.log("modemodemodemodemodemodemodemodmoe : " + mode);
      console.log("useruseruseruseruseruseruseruser" + user);
      console.log(data);
      console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
      if (mode === 'tip') {
        console.log("tiptiptiptiptiptiptiptiptiptiptip");
        this.toast();
        // this.images.like(id, user).subscribe(data => {
        //   console.log("-----------------------------------------" + data);
        //
        // });
        console.log("tip2tip2tip2tip2tip2tip2tiptiptiptiptip");

      } else if (mode === 'exhi') {
        console.log("exhiexhiexhiexhiexhiexhiexhiexhi");

      } else {
        console.log("nothingnothingnothingnothingnothingnothing");
      }
    })


  }

  openBrowser_ios(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {
          wwwImage: 'assets/img/like/like.png',
          imagePressed: 'assets/img/like/dislike.png',
          align: 'right',
          event: 'sharePressed'
        }
      ],
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

  openBrowser_android(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      customButtons: [
        {
          wwwImage: 'assets/img/like/like.png',
          imagePressed: 'assets/img/like/dislike.png',
          align: 'right',
          event: 'sharePressed'
        }
      ],
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


  ionViewDidEnter() {
    console.log("다시다시");
    this.content.resize();
    // console.log('ionViewDidLoad CommunityPage');
    //
    // let alert = this.alertCtrl.create({
    //   cssClass: 'push_alert',
    //   title: '커뮤니티',
    //   message: '추후 업데이트 예정 <br> 감사합니다.',
    //   buttons: [{
    //     text: '확인'
    //   }]
    // });
    // alert.present();
    //  this.admobFree.banner.hide();
  }


  public community_my() {
  this.nav.push(MyPage);
  }

  public community_write() {
    let myModal = this.modalCtrl.create(CommunityWritePage);
    myModal.onDidDismiss(data => {
      this.ionViewWillEnter();
    });
    myModal.present();
  }



  public community_modify(id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, { id: id, mode: 'note' });
    myModal.present();
  }

  public community_qna_modify(id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, { id: id, mode: 'qna' });
    myModal.present();
  }



  public community_qna_write() {
    let myModal = this.modalCtrl.create(CommunityWritePage, { qna: 'qna' });
    myModal.present();
  }

  public loadItems() {
    this.authService.getUserStorage().then(items => {

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
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
        }
        // this.chkmission(this.userData.email);
        // this.chkIngmission(this.userData.email);
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
          from: 'plinic',
        };
        // this.chkmission(this.userData.email);
        // this.chkIngmission(this.userData.email);
        this.from = 'plinic';
      }
      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }


  // public community_qna_modify() {
  //   let myModal = this.modalCtrl.create(CommunityModifyPage, {qna : 'qna'});
  //   myModal.present();
  // }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      // content: 'Please wait...',
      spinner: 'hide',
      duration: 1000,
      cssClass: 'sk-rotating-plane'
    });
    this.loading.present();
  }


  toast(){
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





}
