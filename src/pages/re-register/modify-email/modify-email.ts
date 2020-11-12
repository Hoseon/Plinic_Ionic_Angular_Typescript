import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ReRegisterPage} from '../../re-register/re-register';
/**
 * Generated class for the ModifyEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-email',
  templateUrl: 'modify-email.html',
})
export class ModifyEmailPage {

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyEmailPage');
  }



  public navpop(){
    this.nav.popTo(ReRegisterPage);
  }
}
