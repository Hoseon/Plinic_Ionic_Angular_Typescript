import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginpagePage} from '../loginpage/loginpage';

/**
 * Generated class for the PasswordfindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordfind',
  templateUrl: 'passwordfind.html',
})
export class PasswordfindPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordfindPage');
  }



  public navpop(){
    this.nav.popTo(LoginpagePage);
  }


}
