import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { QnaWritePage } from './qna-write/qna-write';

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

  seeTabs;
  qna_select: any ='';
  qna_input: any ='';


  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform ) {
  }

  ionViewDidLoad() {
    this.seeTabs = false;
    console.log('ionViewDidLoad QnaPage');
  }


 public qna_write(){
   this.nav.push(QnaWritePage);
 }
}
