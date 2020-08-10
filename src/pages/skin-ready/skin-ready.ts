import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the SkinReadyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-ready',
  templateUrl: 'skin-ready.html',
})
export class SkinReadyPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public viewCtrl: ViewController,
      public platform: Platform,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChalGuidePage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
