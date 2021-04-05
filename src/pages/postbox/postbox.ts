import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-postbox',
  templateUrl: 'postbox.html',
})
export class PostBoxPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform : Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreentemplatePage');
  }

}
