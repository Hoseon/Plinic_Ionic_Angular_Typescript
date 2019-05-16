import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing';
import { CareZoneMissionStartPage} from '../care-zone-mission-start/care-zone-mission-start'
import { CareZoneMissionDeadlineEndPage} from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end'


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


  public mission_ing(){
        this.nav.push(CareZoneMissionIngPage);
  }
  public mission_start(){
        this.nav.push(CareZoneMissionStartPage);
  }
  public mission_deadline_end(){
        this.nav.push(CareZoneMissionDeadlineEndPage);
  }

}
