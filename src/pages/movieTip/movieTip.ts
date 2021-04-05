import { Component, ViewChild, Inject } from '@angular/core';
import { PopoverController, IonicPage, NavController, NavParams, AlertController, Content, ModalController, Slides, Platform, Loading, LoadingController, ToastController, ViewController, Events } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { DOCUMENT } from '@angular/common';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service';
import { Device } from '@ionic-native/device';
import { MyinfoPage } from '../myinfo/myinfo'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SungwooBeautyPage } from '../sungwoo-beauty/sungwoo-beauty';
import { AlignPopoverPage } from '../community/search/align-popover/align-popover';
import { SearchPage } from '../community/search/search';


/**
 * Generated class for the MovieTipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-tip',
  templateUrl: 'movieTip.html',
})
export class MovieTipPage {
  jwtHelper: JwtHelper = new JwtHelper();
  userData: any;
  profileimg_url: any;
  from: any;
  thumb_image: any;
  @ViewChild(Content) content: Content;
  jsonData: any;
  jsonData2: any;
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
  isGetTube: boolean = false;
  @ViewChild(Slides) slides: Slides;
  videoDetailData: Array<any> = new Array<any>();
  newSlideData : any;
  tipSlideData: any;
  select_popover_option: any = "최신순";
  items: any;
  items2: any;
  sortButton: boolean = true;
  mode: any;

  constructor(
    public device: Device,
    public popoverCtrl: PopoverController,
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
      if (this.navParams.get('mode')) {
        this.mode = this.navParams.get('mode');
      }
      // console.log("루트페어런트 데이터 테스트 ::::::;" + JSON.stringify(navParams.data));
      // console.log(this.navParams.get('back'));
    });
  }

  async ionViewDidLoad() {
    if(this.mode === 'hot')
      // await this.getMovieListSortView();
      await this.getMovieListSortCreate();
    
    if (this.mode === 'plinic')
      // await this.getMoviePlinicListSortView();
      await this.getMoviePlinicListSortCreate();
      
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
    // this.communityBeautyLoad();
    if(this.userData) {
      if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
        // this.reloadUserPoint(this.userData.snsid);
      }
      else {
        // this.reloadUserPoint(this.userData.email);
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

  // public community_my() {
  //   this.nav.push(MyPage);
  // }

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
        // this.reloadUserPoint(this.userData.snsid);
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
        // this.reloadUserPoint(this.userData.email);
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


  public myinfo() {
    //2020-05-28 마이페이지 하단탭 제거
    // this.nav.push(MyinfoPage); 

    let myModal = this.modalCtrl.create(MyinfoPage);
    myModal.onDidDismiss(data => {
      if(this.userData) {
        if (this.userData.from === 'kakao' || this.userData.from === 'google' || this.userData.from === 'naver') {
          // this.reloadUserPoint(this.userData.snsid);
        }
        else {
          // this.reloadUserPoint(this.userData.email);
        }
      }
      console.log("내정보 페이지 닫음");
      this.androidBackButton();

    });
    myModal.present();
  }


  //20201125 안드로이드 백 버튼 처리
  androidBackButton() {
    if(this.platform.is('android')) {
      this.platform.registerBackButtonAction(()=>{
        this.nav.parent.select(0);
      });
    }
  }


  // 인기순/최신순 정렬 popover
  public select_popover(event) {
    if (this.mode === 'hot') {
      if (this.platform.is('ios')) {
        let popover = this.popoverCtrl.create(AlignPopoverPage, {},
          {
            cssClass: "ios_align_popover",
            showBackdrop: true,
            enableBackdropDismiss: true,
          });
        popover.present();
        popover.onDidDismiss(popoverData => {
          if (popoverData === "조회순") {
            setTimeout(() => {
              this.sortButton = true;
              this.getMovieListSortView();
            }, 100)
          }
          else if (popoverData === "최신순") {
            setTimeout(() => {
              this.sortButton = false;
              this.getMovieListSortCreate();
            }, 100)
          } else {
            setTimeout(() => {
              this.sortButton = true;
              this.select_popover_option = "최신순";
              this.getMovieListSortCreate();
            }, 100)
              
          }
        });
      }
      else {
        let popover = this.popoverCtrl.create(AlignPopoverPage, {},
          {
            cssClass: "android_align_popover",
            showBackdrop: true,
            enableBackdropDismiss: true,
          });
        popover.present();
        popover.onDidDismiss(popoverData => {
          if (popoverData === "조회순") {
            setTimeout(() => {
              this.sortButton = true;
              this.getMovieListSortView();
            }, 100);
          }
          else if (popoverData === "최신순") {
            setTimeout(() => {
              this.sortButton = false;
              this.getMovieListSortCreate();
            }, 100);
          } else {
            setTimeout(() => {
              this.select_popover_option = "최신순";
              this.sortButton = false;
              this.getMovieListSortCreate();
            }, 100);
          }
        });
      }  
    }

    if (this.mode === 'plinic') {
      if (this.platform.is('ios')) {
        let popover = this.popoverCtrl.create(AlignPopoverPage, {},
          {
            cssClass: "ios_align_popover",
            showBackdrop: true,
            enableBackdropDismiss: true,
          });
        popover.present();
        popover.onDidDismiss(popoverData => {
          if (popoverData === "조회순") {
            setTimeout(() => {
              this.sortButton = true;
              this.getMoviePlinicListSortView();
            }, 100)
          }
          else if (popoverData === "최신순") {
            setTimeout(() => {
              this.sortButton = false;
              this.getMoviePlinicListSortCreate();
            }, 100)
          } else {
            setTimeout(() => {
              this.sortButton = true;
              this.select_popover_option = "최신순";
              this.getMoviePlinicListSortCreate();
            }, 100)
              
          }
        });
      }
      else {
        let popover = this.popoverCtrl.create(AlignPopoverPage, {},
          {
            cssClass: "android_align_popover",
            showBackdrop: true,
            enableBackdropDismiss: true,
          });
        popover.present();
        popover.onDidDismiss(popoverData => {
          if (popoverData === "조회순") {
            setTimeout(() => {
              this.sortButton = true;
              this.getMoviePlinicListSortView();
            }, 100);
          }
          else if (popoverData === "최신순") {
            setTimeout(() => {
              this.sortButton = false;
              this.getMoviePlinicListSortCreate();
            }, 100);
          } else {
            setTimeout(() => {
              this.select_popover_option = "최신순";
              this.sortButton = false;
              this.getMoviePlinicListSortCreate();
            }, 100);
          }
        });
      }  
    }
    
  }

  public sortData(mode) {
    if (mode === 'date') {
      this.jsonData = this.jsonData.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      });
    }

    if (mode === 'views') {
      this.jsonData = this.jsonData.sort((a, b) => {
        if (a.views > b.views) {
          return -1;
        }
        if (a.views < b.views) {
          return 1;
        }
        return 0;
      });
    }
    // console.log("this JSON Data : " + JSON.stringify(this.jsonData));
  }

  public communityBeautyLoadSort(mode) {
    this.images.communityBeautyLoad().subscribe(data => {

      if(mode === "date"){
        // this.beautyNoteData = data;
        this.communityBeautyLoadData = data.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        });
      }

      if(mode === "views"){
        this.communityBeautyLoadData = data.sort((a, b) => {
          if (a.views > b.views) {
            return -1;
          }
          if (a.views < b.views) {
            return 1;
          }
          return 0;
        });
      }

      // this.communityBeautyLoadData = data;
      if (data !== '') {
        for (var i = 0; i < data.length; i++) {
          this.jsonData.push({
            "id": data[i]._id,
            "name": data[i].title,
            "views": data[i].views,
            "like": data[i].like,
            "body": data[i].body,
            "posturl": data[i].posturl,
            "createdAt": data[i].createdAt,
            "type": 'beauty',
          })
        }
        // console.log("this.communityBeautyLoadData : " + JSON.stringify(this.jsonData));
        this.items = this.jsonData;
      }
    });
  }

  getMovieListSortView() {
    this.images.getMovieListSortView().subscribe(data => {
      this.communityBeautyLoadData = data;
      if (data) {
        var k = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].items.length > 0) {
            this.youTubeArrayData[k] = data[i].items[0];
            k++;
            this.getOneHotMovieData(data[i].items[0].id, i);
          }
        }  
      }

    }, error => {
    });
  }

  getMovieListSortCreate() {
    this.images.getMovieListSortCreate().subscribe(data => {
      this.communityBeautyLoadData = data;
      if (data) {
        var k = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].items.length > 0) {
            this.youTubeArrayData[k] = data[i].items[0];
            k++;
            this.getOneHotMovieData(data[i].items[0].id, i);
          }
        }  
      }

    }, error => {
    });
  }

  getMoviePlinicListSortView() {
    this.images.getMoviePlinicListSortView().subscribe(data => {
      this.communityBeautyLoadData = data;
      if (data) {
        var k = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].items.length > 0) {
            this.youTubeArrayData[k] = data[i].items[0];
            k++;
            this.getOneHotMovieData(data[i].items[0].id, i);
          }
        }  
      }

    }, error => {
    });
  }

  getMoviePlinicListSortCreate() {
    this.images.getMoviePlinicListSortCreate().subscribe(data => {
      this.communityBeautyLoadData = data;
      if (data) {
        var k = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].items.length > 0) {
            this.youTubeArrayData[k] = data[i].items[0];
            k++;
            this.getOneHotMovieData(data[i].items[0].id, i);
          }
        }  
      }

    }, error => {
    });
  }

  public community_search() {
    let myModal = this.modalCtrl.create(SearchPage);
    myModal.onDidDismiss(data => {

    });
    myModal.present();
  }

  getOneHotMovieData(movieId, index) {
    this.images.getOneBeautyMovie(movieId).subscribe(data=> {
      this.videoDetailData[index] = data;
    });  
  }

  public openMoviePage(youTubeData) {
    let myModal = this.modalCtrl.create(SungwooBeautyPage, { youTubeData: youTubeData});
    myModal.onDidDismiss(data => {
      this.authService.setUserStoragetab(2);
      this.ionViewWillEnter();
    });
    myModal.present();
    
  }

}
