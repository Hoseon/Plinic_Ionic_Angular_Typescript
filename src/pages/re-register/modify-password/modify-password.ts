import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ReRegisterPage} from '../../re-register/re-register';
/**
 * Generated class for the ModifyPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-password',
  templateUrl: 'modify-password.html',
})
export class ModifyPasswordPage {

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPasswordPage');
  }


  public navpop(){
    this.nav.popTo(ReRegisterPage);
  }
}
