import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content, ModalController, Slides, Platform, Loading, LoadingController, ToastController, ViewController, Events } from 'ionic-angular';
import { CommunityModifyPage } from './community-modify/community-modify';
import { CommunityWritePage } from './community-write/community-write';
import { MyPage } from './my/my';
import { SearchPage } from './search/search';
import { ImagesProvider } from '../../providers/images/images';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { DOCUMENT } from '@angular/common';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service';
import { Device } from '@ionic-native/device';
import { MyinfoPage } from '../myinfo/myinfo'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SungwooBeautyPage } from '../sungwoo-beauty/sungwoo-beauty';
import { CommunityTipPage } from '../communityTip/communityTip';
import { MovieTipPage } from '../movieTip/movieTip';

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
  tab3: any;
  tab1: any;
  tabs_boolean: any;
  movieData: any;
  // youTubeData: any;
  youTubeArrayData: Array<any> = new Array<any>();
  youTubeHotArrayData: Array<any> = new Array<any>();
  youTubePlinicArrayData: Array<any> = new Array<any>();
  isGetTube: boolean = false;
  @ViewChild(Slides) slides: Slides;
  videoDetailData: Array<any> = new Array<any>();
  videoHotDetailData: Array<any> = new Array<any>();
  newSlideData : any;
  tipSlideData: any;
  hit3Data: any;
  movieHit3Data: any;

  constructor(
    public device: Device,
    private view: ViewController, private toastCtrl: ToastController, private authService: AuthService, public loadingCtrl: LoadingController, public nav: NavController,
    public navParams: NavParams, private alertCtrl: AlertController, public modalCtrl: ModalController, private images: ImagesProvider, public platform: Platform
    , private themeableBrowser: ThemeableBrowser, @Inject(DOCUMENT) document, public events: Events) {


    this.platform.ready().then((readySource) => {
      if(this.platform.is('android')) {
        this.platform.registerBackButtonAction(()=>{
          this.nav.parent.select(0);
          this.authService.setUserStoragetab(0);
        })
      }

      console.log("루트페어런트 데이터 테스트 ::::::;" + JSON.stringify(navParams.data));

      console.log('parent_test :::::: ' + this.navParams.get('test'));
      console.log(this.navParams.get('back'));
      this.events1();
      this.events2();
      this.events3();
      
      this.images.getBeautyMovie().subscribe(data=> {
        this.movieData = data
        if (data) {
          var k = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].items.length > 0) {
              this.youTubeArrayData[k] = data[i].items[0];
              k++;
              this.getOneMovieData(data[i].items[0].id, i);  
            }
          }
        }
        console.log(this.youTubeArrayData);
      })
    });
  }

  async ionViewDidLoad() {
    await this.getNewSlideData();
    await this.getpostTipList3ea();
    await this.getMovieList3ea();
    await this.getMoviePlinicList3ea();
    // await this.communityBeautyLoad();
    await this.getpostHitList3ea();
    console.log('ionViewDidLoad CommunityPage');
  }

  ionViewDidEnter() {
    this.content.resize();
  }

  ionViewCanEnter() {
    this.loadItems();

  }
  

  ionViewDidLeave(){
   console.log("ionViewDidLeave Community");
   this.authService.setUserStoragetab(0);
  }


  update() {
    this.view._willEnter();

  }


  async ionViewWillEnter() {
    await this.tabs_check();
    // this.selectedTab(0);
    // this.showLoading();
    this.roadbeauty();
    // this.communityEditorBeautyLoad();
    // this.communityBeautyLoad();
    this.beautyNoteLoad();
    this.beautyNoteMainLoad();
    this.skinQnaLoad();
    this.skinQnaMainLoad();
    this.exhibitionLoad();
    //this.loading.dismiss();
    if(this.userData) {
      if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
        this.reloadUserPoint(this.userData.snsid);
      }
      else {
        this.reloadUserPoint(this.userData.email);
      }
    }
    if (this.page === '2' || this.page === '3') {
      let tabs = document.querySelectorAll('.tabbar');
      if (tabs !== null) {
        Object.keys(tabs).map((key) => {
          //tabs[ key ].style.transform = 'translateY(0)';
          tabs[key].style.display = '';
        });
      }
      setTimeout(() => {
        this.loading.dismiss();
      }, 5000);
    }
  }


  public tabs_check() {
    this.authService.getUserStoragetab().then(items => {
      this.tabs_boolean = items;
      console.log("tabs_boolean=======" + this.tabs_boolean);
      if (this.tabs_boolean === 1) {
        setTimeout(() => {
          this.selectedTab(1);
          this.page = "1";
        }, 100);
      } else if (this.tabs_boolean === 0) {  //최초 슬라이드 되는 페이지
        setTimeout(() => {
          this.selectedTab(0);
          this.page = "0";
        }, 100);
      } else if (this.tabs_boolean === 2) {
        setTimeout(() => {
          this.selectedTab(2);
          this.page = "2";
        }, 100);
      } 
      // else if (this.tabs_boolean === 3) {
      //   setTimeout(() => {
      //     this.selectedTab(3);
      //     this.page = "3";
      //   }, 100);
      // }
      // this.authService.setUserStoragetab(0); //2020-06-22 피부고민 작성시 슬라이드가 2번째로 가 있도록 창이 닫히는(ondiddismiss에 처리 하였다)
    });
  }


  events1() {
    this.events.subscribe('tabs1', (data) => {
      console.log("이벤트111")
      this.tab1 = data;
      this.selectedTab(0);
      if (this.tab1 == "tabs1") {
      console.log("이벤트111_2222")
        setTimeout(() => {
          this.selectedTab(1);
          this.page = "2";
        }, 100);
      }
      this.events.unsubscribe('tabs1', this.tab1)
      this.tab1 = undefined;
      console.log("tabs1 subscribe===============" + data);
    });
  }

  events2() {
    this.events.subscribe('tabs2', (data) => {
      console.log("이벤트2222");
      this.tab1 = data;
      this.selectedTab(0);
      if (this.tab1 == "tabs2") {
      console.log("이벤트2222_2222");
        setTimeout(() => {
          this.selectedTab(2);
          this.page = "2";
        }, 100);
      }
      this.events.unsubscribe('tabs2', this.tab1)
      this.tab1 = undefined;
      console.log("tabs1 subscribe===============" + data);
    });
  }

  events3() {
    this.events.subscribe('tabs3', (data) => {
      this.tab3 = data;
      this.selectedTab(0);
      if (this.tab3 == "tabs3") {
        setTimeout(() => {
          this.selectedTab(3);
          this.page = "3";
        }, 100);
      }
      this.events.unsubscribe('tabs3', this.tab3)
      this.tab3 = undefined;
      console.log("tabs3 subscribe===============" + data);
    });
  }


  

  selectedTab(tab) {
    this.slides.slideTo(tab);
    this.authService.setUserStoragetab(tab);
    // console.log('this.slides.slideTo(tab)===================' + tab);
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
      //
      //     wwwImage: 'assets/img/like/like.png',
      //     // wwwImagePressed: 'assets/img/like/dislike.png',
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
      browser.executeScript({
        code: ""
      });
      if (mode === 'tip') {
        this.toast();
        // this.images.like(id, user).subscribe(data => {
        //   console.log("-----------------------------------------" + data);
        //
        // });

      } else if (mode === 'exhi') {

      } else {
      }
    })


  }

  openBrowser_ios(url, title, id) {
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


  openBrowser_androidlike(url, title, id, user, mode) {
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
      //
      //     wwwImage: 'assets/img/like/like.png',
      //     // wwwImagePressed: 'assets/img/like/dislike.png',
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




  public community_my() {
    this.nav.push(MyPage);
  }

  public community_search() {
    let myModal = this.modalCtrl.create(SearchPage);
    myModal.onDidDismiss(data => {

    });
    myModal.present();
  }

  public community_write() {
    let myModal = this.modalCtrl.create(CommunityWritePage);
    myModal.onDidDismiss(data => {
      this.authService.setUserStoragetab(1);
      this.ionViewWillEnter();
    });
    myModal.present();
  }

  public community_modify(id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, { id: id, mode: 'note' });
    myModal.onDidDismiss(data => {
      this.authService.setUserStoragetab(1);
      this.ionViewWillEnter();
    });
    myModal.present();
  }

  public community_qna_modify(id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, { id: id, mode: 'qna' });
    myModal.onDidDismiss(data => {
      this.authService.setUserStoragetab(1);
      this.ionViewWillEnter();
    });
    myModal.present();
  }

  public community_qna_write() {
    let myModal = this.modalCtrl.create(CommunityWritePage, { qna: 'qna' });
    myModal.onDidDismiss(data => {
      this.authService.setUserStoragetab(1);
      this.ionViewWillEnter();
    });
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
          snsid: items.snsid
        };
        this.reloadUserPoint(this.userData.snsid);
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
          // totaluserpoint: this.jwtHelper.decodeToken(items).totaluserpoint,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: 'plinic',
        };
        this.reloadUserPoint(this.userData.email);
        // this.chkmission(this.userData.email);
        // this.chkIngmission(this.userData.email);
        this.from = 'plinic';
      }
      // console.log("사용자 포인트는? : " + this.userData.totaluserpoint);
      
      // console.log("사용자 포인트는? : " + this.userData.totaluserpoint);
      // console.log("사용자 이메일은? : " + this.userData.email);
      

      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }


  // public community_qna_modify() {
  //   let myModal = this.modalCtrl.create(CommunityModifyPage, {qna : 'qna'});
  //   myModal.present();
  // }


  showLoading() {
    if (this.platform.is("ios") && this.device.model === 'iPhone7,2' || this.device.model === 'iPhone8,1' || this.device.model === 'iPhone9,1' || this.device.model === 'iPhone9,3' || this.device.model === 'iPhone10,1' || this.device.model === 'iPhone10,4') {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        // duration: 100,
        cssClass: 'sk-rotating-plane_ios'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    } else if (this.platform.is("ios") && this.device.model === 'iPhone7,1' || this.device.model === 'iPhone8,2' || this.device.model === 'iPhone9,2' || this.device.model === 'iPhone9,4' || this.device.model === 'iPhone10,2' || this.device.model === 'iPhone10,5') {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        // duration: 100,
        cssClass: 'sk-rotating-plane_ios_plus'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    } else if (this.platform.is("ios") && this.device.model === 'iPhone10,3' || this.device.model === 'iPhone10,6' || this.device.model === 'iPhone11,2' || this.device.model === 'iPhone11,8' || this.device.model === 'iPhone12,1' || this.device.model === 'iPhone12,3') {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        // duration: 100,
        cssClass: 'sk-rotating-plane_ios_x'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    } else if (this.platform.is("ios") && this.device.model === 'iPhone11,4' || this.device.model === 'iPhone11,6' || this.device.model === 'iPhone12,5') {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        // duration: 100,
        cssClass: 'sk-rotating-plane_ios_x_max'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    } else {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        // duration: 100,
        cssClass: 'sk-rotating-plane'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    }
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


  test() {
    console.log(" ljasd;lfkjasd;lkfjas;dklfja;sdklfja;sdklfj------------------------------------------------------------");
  }

  public myinfo() {
    //2020-05-28 마이페이지 하단탭 제거
    // this.nav.push(MyinfoPage); 

    let myModal = this.modalCtrl.create(MyinfoPage);
    myModal.onDidDismiss(data => {
      if(this.userData) {
        if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
          this.reloadUserPoint(this.userData.snsid);
        }
        else {
          this.reloadUserPoint(this.userData.email);
        }
      }
      console.log("내정보 페이지 닫음");
      this.androidBackButton();

    });
    myModal.present();
  }


  addComma(data_value) { //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString('en');
  }

  private reloadUserPoint(email) {
    this.authService.reloadUserPointfromPlincShop(email).subscribe(data =>{
      // console.log("커뮤니티 사용자 포인트 : " + data)
      this.userData.totaluserpoint = data.point;
      this.userData.totaluserpoint = this.addComma(this.userData.totaluserpoint);
    });
  }

  async getMovieData() {
    // this.images
  }

  public openMoviePage(youTubeData) {
    let myModal = this.modalCtrl.create(SungwooBeautyPage, { youTubeData: youTubeData});
    myModal.onDidDismiss(data => {
      this.authService.setUserStoragetab(2);
      this.ionViewWillEnter();
    });
    myModal.present();
    
  }

  getOneMovieData(movieId, index) {
    this.images.getOneBeautyMovie(movieId).subscribe(data=> {
      this.videoDetailData[index] = data;
    });  
  }

  getOneHotMovieData(movieId, index) {
    this.images.getOneBeautyMovie(movieId).subscribe(data=> {
      this.videoHotDetailData[index] = data;
    });  
  }

  //20201125 안드로이드 백 버튼 처리
  androidBackButton() {
    if(this.platform.is('android')) {
      this.platform.registerBackButtonAction(()=>{
        this.nav.parent.select(0);
      });
    }
  }

  getNewSlideData() {
    this.images.getNewSlideData().subscribe(data => {
      this.newSlideData = data;
    })
  }

  getpostTipList3ea() {
    this.images.getpostTipList3ea().subscribe(data => {
      this.tipSlideData = data;
    })
  }

  getpostHitList3ea() {
    this.images.getpostHitList3ea().subscribe(data => {
      this.hit3Data = data;
    })
  }

  getMovieList3ea() {
    this.images.getMovieList3ea().subscribe(data => {
      this.movieHit3Data = data;
      if (data) {
        var k = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].items.length > 0) {
            this.youTubeHotArrayData[k] = data[i].items[0];
            k++;
            this.getOneHotMovieData(data[i].items[0].id, i);
          }
        }  
      }
    });
  }

  getMoviePlinicList3ea() {
    this.images.getMoviePlinicList3ea().subscribe(data => {
      this.movieHit3Data = data;
      if (data) {
        var k = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].items.length > 0) {
            this.youTubePlinicArrayData[k] = data[i].items[0];
            k++;
            this.getOneHotMovieData(data[i].items[0].id, i);
          }
        }  
      }
    });
  }

  public communityTip(mode) {
    this.nav.push(CommunityTipPage,{mode : mode});
  }

  public movieTip(mode) {
    this.nav.push(MovieTipPage,{mode : mode});
  }


 }
