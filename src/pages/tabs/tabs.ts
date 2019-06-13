import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SuccessHomePage } from '../success-home/success-home'
import { MyinfoPage } from '../myinfo/myinfo';
import { CareZonePage } from '../care-zone/care-zone';
import { NavController, NavParams } from 'ionic-angular';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ImageLoader } from 'ionic-image-loader';


@IonicPage() @Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root;
  tab2Root = CareZonePage;
  tab3Root = AboutPage;
  tab4Root = ContactPage;
  tab5Root = MyinfoPage;

  constructor(public navParams: NavParams, private iab: InAppBrowser, private themeableBrowser: ThemeableBrowser, private imageLoader: ImageLoader) {
    if (this.navParams.get('home') === 'successHome') {
      this.tab1Root = SuccessHomePage;
    } else {
      this.tab1Root = HomePage;
    }

  }

  openBrowser(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 44,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      // backButton: {
      //   wwwImage: 'assets/img/back.png',
      //   align: 'left',
      //   event: 'backPressed'
      // },
      // forwardButton: {
      //   wwwImage: 'assets/img/forward.png',
      //   align: 'left',
      //   event: 'forwardPressed'
      // },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      // backButtonCanClose: true
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
  }

}
