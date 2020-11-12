import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides  } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';

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
  beautyData: any;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private images: ImagesProvider) {

    this.platform.ready().then((readySource) => {
    this.roadbeauty();
  });
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

}
