import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the SungwooOrderFieldPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-order-field',
  templateUrl: 'sungwoo-order-field.html',
})
export class SungwooOrderFieldPage {

  // cucumber: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform
    
    ) {

      this.platform.ready().then(() => {});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooOrderFieldPage');
  }

  // updateCucumber() {
  //   console.log('Cucumbers new state:' + this.cucumber);
  // }

}
