import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SuccessHomePage } from '../success-home/success-home'
import { MyinfoPage } from '../myinfo/myinfo';
import { CareZonePage } from '../care-zone/care-zone';
import { NavController, NavParams } from 'ionic-angular';


@IonicPage() @Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root;
  tab2Root = CareZonePage;
  tab3Root = AboutPage;
  // tab4Root = ContactPage;
  tab5Root = MyinfoPage;

  constructor(public navParams: NavParams) {
  if(this.navParams.get('home') === 'successHome'){
    this.tab1Root = SuccessHomePage;
  } else {
    this.tab1Root = HomePage;
  }

  }
}
