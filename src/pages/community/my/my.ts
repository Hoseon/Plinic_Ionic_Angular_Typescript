import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';

/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

   page = "0";
    @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');

  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        //tabs[ key ].style.transform = 'translateY(0)';
        tabs[key].style.display = 'none';
      });
    }
  }

  selectedTab(tab){
    this.slides.slideTo(tab);

    console.log('  this.slides.slideTo(tab)==================='+   this.slides.slideTo(tab));
  }

  slideChanged($event) {
    this.page = $event._snapIndex.toString();
    console.log(this.page);

    if(this.page!=='0' && this.page!=='1'){
      setTimeout(() => {
      this.slides.slideTo(0, 0);
  }, 100)
  }
}

}
