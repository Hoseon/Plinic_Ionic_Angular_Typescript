import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content, ModalController, Slides, Platform  } from 'ionic-angular';
import { CommunityModifyPage } from './community-modify/community-modify';
import { CommunityWritePage } from './community-write/community-write';
import { ImagesProvider } from '../../providers/images/images';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

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

  @ViewChild(Content) content: Content;

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
  @ViewChild(Slides) slides: Slides;

  constructor(public nav: NavController, public navParams: NavParams, private alertCtrl: AlertController, public modalCtrl: ModalController, private images: ImagesProvider, public platform: Platform
  , private themeableBrowser: ThemeableBrowser) {


    this.platform.ready().then((readySource) => {
    this.roadbeauty();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityPage');

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


  ionViewDidEnter(){
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



  public community_write(){
    let myModal = this.modalCtrl.create(CommunityWritePage);
    myModal.present();
  }


  public community_modify(){
    let myModal = this.modalCtrl.create(CommunityModifyPage);
    myModal.present();
  }










}
