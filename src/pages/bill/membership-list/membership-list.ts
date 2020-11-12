import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the MembershipListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membership-list',
  templateUrl: 'membership-list.html',
})
export class MembershipListPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform : Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipListPage');
  }

}
