import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CareZoneMissionDeadlinePage } from '../care-zone-mission-deadline/care-zone-mission-deadline';


/**
 * Generated class for the CareZoneMissionIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-mission-ing',
  templateUrl: 'care-zone-mission-ing.html',
})
export class CareZoneMissionIngPage {

  public loadProgress : number = 0;


  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneMissionIngPage');
  }

  ngOnInit() {
    // 프로그레스바 로직
    setInterval(() => {
      if (this.loadProgress < 100)
        this.loadProgress += 1;
      else
        clearInterval(this.loadProgress);
    }, 50);
  }











 public mission_deadline(){

   this.nav.push(CareZoneMissionDeadlinePage);
 }




}
