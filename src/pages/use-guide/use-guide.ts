import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the UseGuidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-use-guide',
  templateUrl: 'use-guide.html',
})
export class UseGuidePage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public viewCtrl: ViewController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChalGuidePage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
