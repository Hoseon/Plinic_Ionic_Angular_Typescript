import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";

import { AboutPage } from "../about/about";
import { CommunityPage } from "../community/community";
import { HomePage } from "../home/home";
import { SuccessHomePage } from "../success-home/success-home";
import { MyinfoPage } from "../myinfo/myinfo";
import { SkinChartPage } from "../skin-chart/skin-chart";
import { SkinChekChartPage } from "../skin-chek-chart/skin-chek-chart";
import { SkinReadyPage } from "../skin-ready/skin-ready";
import { CareZonePage } from "../care-zone/care-zone";
import { ProductMainPage } from "../product-main/product-main";
import { SungwooCosmeticsMainPage } from "../sungwoo-cosmetics-main/sungwoo-cosmetics-main";
import { SungwooPointShopPage } from "../sungwoo-point-shop/sungwoo-point-shop";
import { NavController, NavParams, Platform } from "ionic-angular";

import {
  ThemeableBrowser,
  ThemeableBrowserOptions,
  ThemeableBrowserObject
} from "@ionic-native/themeable-browser";
import { ImageLoader } from "ionic-image-loader";
import { AuthService } from "../../providers/auth-service";

@IonicPage()
@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = CareZonePage;
  // tab3Root = ProductMainPage;
  tab3Root = SungwooPointShopPage;
  tab4Root = CommunityPage;
  // tab5Root = MyinfoPage; 2020-03-23 스킨차트 페이지로 변경
  tab5Root = SkinChekChartPage; //2020-06-10 스킨차트 준비중으로 변경하기 위해 잠시 막아둠
  // tab5Root = SkinReadyPage; //2020-06-15 스킨차트 준비중 페이지로 보여준다

  constructor(
    public navParams: NavParams,
    private themeableBrowser: ThemeableBrowser,
    private imageLoader: ImageLoader,
    public platform: Platform,
    public navCtrl: NavController,
    public auth: AuthService
  ) {
    // if (this.navParams.get('home') === 'successHome') {
    //   this.tab1Root = SuccessHomePage;
    // } else {
    //   this.tab1Root = HomePage;
    // }
  }

  ionViewDidLoad() {
    // this.platform.registerBackButtonAction(()=>{
    //   console.log("안드로이드 백 버튼 액션?");
    //   // if(this.nav.canGoBack()) {
    //     // this.app.getActiveNav().setRoot('TabsPage');
    //   // } else {
    //     // console.log("앱종료");
    //     // this.platform.exitApp();
    //   // }
    // })
    console.log("tabs ionViewDidLoad");
  }

  ionViewDidEnter() {
    console.log("tabs ionViewDidEnter");
  }

  openBrowser_ios(url, title) {
    console.log("11111111111111111" + title);
    // https://ionicframework.com/docs/native/themeable-browser/

    const options: ThemeableBrowserOptions = {
      clearcache: false,
      clearsessioncache: false,
      fullscreen: "true",
      toolbar: {
        height: 15,
        color: "transparent"
      },
      title: {
        color: "#FFFFFF",
        showPageTitle: false,
        staticText: title
      },
      closeButton: {
        wwwImage: "assets/img/close.png",
        align: "left",
        event: "closePressed"
      },
      backButton: {
        wwwImage: "assets/img/back.png",
        align: "right",
        event: "backPressed"
      },
      forwardButton: {
        wwwImage: "assets/img/forward.png",
        align: "right",
        event: "forwardPressed"
      }
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(
      url,
      "_blank",
      options
    );
    // browser.insertCss({
    //   file: 'assets/img/close.png',
    //   code: '.navbar-fixed-top {display: block !important;}'
    // });
    // browser.reload();
    browser.on("closePressed").subscribe(data => {
      browser.close();
    });
  }

  // openBrowser_android(url, title) {
  //   console.log("22222222222222222" +title);
  //   // https://ionicframework.com/docs/native/themeable-browser/

  //   const options: ThemeableBrowserOptions = {
  //     toolbar: {
  //       height: 55,
  //       color: '#6562b9'
  //     },
  //     title: {
  //       color: '#FFFFFF',
  //       showPageTitle: true,
  //       staticText: title
  //     },
  //     closeButton: {
  //       wwwImage: 'assets/img/close.png',
  //       align: 'left',
  //       event: 'closePressed'
  //     },
  //     backButton: {
  //       wwwImage: 'assets/img/back.png',
  //       align: 'right',
  //       event: 'backPressed'
  //     },
  //     forwardButton: {
  //       wwwImage: 'assets/img/forward.png',
  //       align: 'right',
  //       event: 'forwardPressed'
  //     },
  //     fullscreen: 'true'
  //   };

  //   const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
  //   browser.insertCss({
  //     file: 'assets/img/close.png',
  //     code: '.navbar-fixed-top {display: block !important;}'
  //   });
  //   // browser.reload();
  //   browser.on('closePressed').subscribe(data => {
  //     browser.close();
  //   })
  // }

  openBrowser_android(url, title) {
    const options: ThemeableBrowserOptions = {
      clearcache: false,
      clearsessioncache: false,
      toolbar: {
        height: 55,
        color: "#6562b9"
      },
      title: {
        color: "#FFFFFF",
        showPageTitle: true,
        staticText: title
      },
      closeButton: {
        wwwImage: "assets/img/close.png",
        align: "left",
        event: "closePressed"
      },
      backButton: {
        wwwImage: "assets/img/back.png",
        align: "right",
        event: "backPressed"
      },
      forwardButton: {
        wwwImage: "assets/img/forward.png",
        align: "right",
        event: "forwardPressed"
      }
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(
      url,
      "_blank",
      options
    );
    browser.insertCss({
      file: "assets/img/close.png",
      code: ".navbar-fixed-top {display: block !important;}"
    });
    browser.reload();
    browser.on("closePressed").subscribe(data => {
      browser.close();
    });

    browser.on("sharePressed").subscribe(data => {
      // console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    });
  }

  openBrowser_core(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/

    const options: ThemeableBrowserOptions = {
      clearcache: false,
      clearsessioncache: false,
      toolbar: {
        height: 55,
        color: "#6562b9"
      },
      title: {
        color: "#FFFFFF",
        showPageTitle: true,
        staticText: title
      },
      closeButton: {
        wwwImage: "assets/img/close.png",
        align: "left",
        event: "closePressed"
      },
      backButton: {
        wwwImage: "assets/img/back.png",
        align: "right",
        event: "backPressed"
      },
      forwardButton: {
        wwwImage: "assets/img/forward.png",
        align: "right",
        event: "forwardPressed"
      }
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(
      url,
      "_blank",
      options
    );
    browser.insertCss({
      file: "assets/img/close.png",
      code: ".navbar-fixed-top {display: block !important;}"
    });
    // browser.reload();
    browser.on("closePressed").subscribe(data => {
      browser.close();
    });
  }
}
