import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform ,ModalController } from 'ionic-angular';
// import { SearchPage } from './search/search';

/**
 * Generated class for the SungwooCosmeticsMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-cosmetics-main',
  templateUrl: 'sungwoo-cosmetics-main.html',
})
export class SungwooCosmeticsMainPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,

    public modalCtrl: ModalController
    ) {

    this.platform.ready().then(() => {});

  }

  // public community_search() {
  //   let myModal = this.modalCtrl.create(SearchPage);
  //   myModal.onDidDismiss(data => {

  //   });
  //   myModal.present();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooCosmeticsMainPage');
  }

}
