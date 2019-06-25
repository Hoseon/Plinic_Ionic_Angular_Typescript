import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides  } from 'ionic-angular';


/**
 * Generated class for the BeautyTipAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beauty-tip-add',
  templateUrl: 'beauty-tip-add.html',
})
export class BeautyTipAddPage {


  @ViewChild(Slides) slides: Slides;

  page = "0";

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BeautyTipAddPage');
  }
  selectedTab(tab){
    this.slides.slideTo(tab);
  }

  slideChanged($event) {
    this.page = $event._snapIndex.toString();
  }
}
