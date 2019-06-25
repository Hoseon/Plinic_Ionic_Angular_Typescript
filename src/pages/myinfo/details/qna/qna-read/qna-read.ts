import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { QnaWritePage } from '../qna-write/qna-write';


/**
 * Generated class for the QnaReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qna-read',
  templateUrl: 'qna-read.html',
})
export class QnaReadPage {

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QnaReadPage');
  }


  public qna_write(){
    this.nav.push(QnaWritePage);
  }

}
