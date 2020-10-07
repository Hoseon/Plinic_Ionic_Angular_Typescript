import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MissionVideoPage } from '../mission-video/mission-video';


/**
 * Generated class for the MissionStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mission-start',
  templateUrl: 'mission-start.html',
})
export class MissionStartPage {

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionStartPage');
  }


  public mission_video(){
    this.nav.push(MissionVideoPage);
  }
}
