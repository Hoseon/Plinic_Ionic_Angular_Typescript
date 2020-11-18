import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the SungwooCosmeticsTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-cosmetics-tab',
  templateUrl: 'sungwoo-cosmetics-tab.html',
})
export class SungwooCosmeticsTabPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform
    ) {

      this.platform.ready().then(() => {});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooCosmeticsTabPage');
  }

}
