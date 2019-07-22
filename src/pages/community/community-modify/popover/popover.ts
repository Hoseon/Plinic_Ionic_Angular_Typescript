import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {


  comment_option: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  edit(comment_option) {
    comment_option = this.comment_option= "수정";
    this.viewCtrl.dismiss(comment_option);
  }

  delete(comment_option) {
    comment_option = this.comment_option= "삭제";
    this.viewCtrl.dismiss(comment_option);
  }

}
