import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CareZoneMissionCompletePage } from '../care-zone-mission-complete/care-zone-mission-complete';
/**
 * Generated class for the CareZoneMissionStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-mission-start',
  templateUrl: 'care-zone-mission-start.html',
})
export class CareZoneMissionStartPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneMissionStartPage');
  }


  public mission_complete(){
    this.nav.push(CareZoneMissionCompletePage);
  }
}
