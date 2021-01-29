import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AlignPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-align-popover',
  templateUrl: 'align-popover.html',
})
export class AlignPopoverPage {

  comment_option: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlignPopoverPage');
  }


  latest() {
    this.comment_option = "조회순";
    this.viewCtrl.dismiss(this.comment_option);
  }

  popular() {
    this.comment_option= "최신순";
    this.viewCtrl.dismiss(this.comment_option);
  }



}
