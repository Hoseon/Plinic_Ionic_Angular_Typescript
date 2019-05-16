import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing';
import { ImagesProvider } from '../../providers/images/images';

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
  carezoneData: any;

  constructor(public platform: Platform, public nav: NavController, public navParams: NavParams, private images: ImagesProvider) {
    this.platform.ready().then((readySource) => {
      this.carezoneData = this.roadcareZone();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneIngPage');
  }




  public mission_ing() {
    this.nav.push(CareZoneMissionIngPage);

  }

  public roadcareZone() {
    this.images.carezoneRoad().subscribe(data => {
      this.carezoneData = data;
      //console.log(JSON.stringify(data));
    });
  }

}
