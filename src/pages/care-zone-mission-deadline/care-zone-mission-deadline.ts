import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end';
/**
 * Generated class for the CareZoneMissionDeadlinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-mission-deadline',
  templateUrl: 'care-zone-mission-deadline.html',
})
export class CareZoneMissionDeadlinePage {

    public loadProgress : number = 0;

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneMissionDeadlinePage');
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


  public mission_deadline_end(){

    this.nav.push(CareZoneMissionDeadlineEndPage);
  }








}
