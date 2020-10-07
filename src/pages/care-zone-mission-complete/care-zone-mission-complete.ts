import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the CareZoneMissionCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-care-zone-mission-complete',
  templateUrl: 'care-zone-mission-complete.html',
})
export class CareZoneMissionCompletePage {


  public loadProgress: number = 100;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneMissionCompletePage');
  }



}
