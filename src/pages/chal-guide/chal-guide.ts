import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ChalGuidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chal-guide',
  templateUrl: 'chal-guide.html',
})
export class ChalGuidePage {

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
