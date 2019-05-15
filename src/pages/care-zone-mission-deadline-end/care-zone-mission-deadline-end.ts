import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start';

/**
 * Generated class for the CareZoneMissionDeadlineEndPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-mission-deadline-end',
  templateUrl: 'care-zone-mission-deadline-end.html',
})
export class CareZoneMissionDeadlineEndPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneMissionDeadlineEndPage');
  }


  public mission_start(){
     this.nav.push(CareZoneMissionStartPage);
  }
}
