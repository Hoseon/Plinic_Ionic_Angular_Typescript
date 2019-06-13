import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the QnaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qna',
  templateUrl: 'qna.html',
})
export class QnaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QnaPage');
  }

}
