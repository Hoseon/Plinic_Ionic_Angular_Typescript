import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing';

/**
 * Generated class for the CareZoneIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-ing',
  templateUrl: 'care-zone-ing.html',
})
export class CareZoneIngPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneIngPage');
  }




  public mission_ing()
  {
    this.nav.push(CareZoneMissionIngPage);

  }
}
