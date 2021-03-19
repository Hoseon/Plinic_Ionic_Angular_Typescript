import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PointZoneGuidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point-zone-guide',
  templateUrl: 'point-zone-guide.html',
})
export class PointZoneGuidePage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public viewCtrl: ViewController,
    ) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointZoneGuidePage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
