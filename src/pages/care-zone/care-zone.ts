import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CareZoneIngPage } from '../care-zone-ing/care-zone-ing';
import { ImagesProvider } from '../../providers/images/images';


/**
 * Generated class for the CareZonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone',
  templateUrl: 'care-zone.html',
})
export class CareZonePage {
  carezoneData : any;

  constructor(public platform: Platform, public nav: NavController,
    public navParams: NavParams, private images: ImagesProvider) {
    this.platform.ready().then((readySource) =>{
      this.carezoneData = this.roadcareZone();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZonePage');
}



  public carezone_ing(){
        this.nav.push(CareZoneIngPage);
  }




  public roadcareZone() {
    this.images.carezoneRoad().subscribe(data => {
      this.carezoneData = data;
      //console.log(JSON.stringify(data));
    });

  }

}
