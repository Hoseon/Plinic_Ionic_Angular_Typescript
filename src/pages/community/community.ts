import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content, ModalController } from 'ionic-angular';
import { CommunityModifyPage } from './community-modify/community-modify';
import { CommunityWritePage } from './community-write/community-write';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

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

  constructor(public nav: NavController, public navParams: NavParams, private alertCtrl: AlertController, public modalCtrl: ModalController, private admobFree: AdMobFree) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityPage');
    this.admobFree.banner.hide();
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
