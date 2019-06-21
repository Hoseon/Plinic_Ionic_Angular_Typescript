import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the QnaWritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qna-write',
  templateUrl: 'qna-write.html',
})
export class QnaWritePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QnaWritePage');
  }

  ionViewWillEnter() {
      let tabs = document.querySelectorAll('.tabbar');
      if ( tabs !== null ) {
        Object.keys(tabs).map((key) => {
          // tabs[ key ].style.transform = 'translateY(56px)';
          tabs[ key ].style.display = 'none';
        });
      } // end if
    }

}
