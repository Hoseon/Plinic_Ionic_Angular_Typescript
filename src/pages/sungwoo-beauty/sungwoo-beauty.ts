import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the SungwooBeautyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-beauty',
  templateUrl: 'sungwoo-beauty.html',
})
export class SungwooBeautyPage {


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform
    ) {

      this.platform.ready().then(() => {});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooBeautyPage');
  }

}
