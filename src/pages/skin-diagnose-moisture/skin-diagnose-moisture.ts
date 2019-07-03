import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the SkinDiagnoseMoisturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-diagnose-moisture',
  templateUrl: 'skin-diagnose-moisture.html',
})
export class SkinDiagnoseMoisturePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SkinDiagnoseMoisturePage');
  }

  public range_change(range){
    console.log("range" + range.value);
  }

  public next_page(){

  }

  public dissmiss() {
    this.viewCtrl.dismiss();
  }
  
}
