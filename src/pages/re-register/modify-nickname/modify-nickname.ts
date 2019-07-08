import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, ViewController   } from 'ionic-angular';
import { ReRegisterPage} from '../../re-register/re-register';

/**
 * Generated class for the ModifyNicknamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-nickname',
  templateUrl: 'modify-nickname.html',
})
export class ModifyNicknamePage {

    nickname: string;

    constructor(public nav: NavController, public navParams: NavParams, public platform: Platform,  private events: Events, public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ModifyNicknamePage');
    }


    public navpop(){
      this.nav.popTo(ReRegisterPage);
    }

    public nickname_valid(){
      this.nav.pop().then(() => {
      // Trigger custom event and pass data to be send back
      //  this.viewCtrl.dismiss();
      this.events.publish('custom-user-events', this.nickname);
      });
    }
}
