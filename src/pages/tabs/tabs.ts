import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MyinfoPage } from '../myinfo/myinfo';

@IonicPage() @Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = ContactPage;
  tab5Root = MyinfoPage;

  constructor() {

  }
}
