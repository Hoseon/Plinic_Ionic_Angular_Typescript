import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, Events, ViewController } from 'ionic-angular';
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

  base_password:any;
  new_password:any;
  new_passwordconfirm:any;

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, private alertCtrl: AlertController, private events: Events, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPasswordPage');
  }


  public navpop(){
    this.nav.popTo(ReRegisterPage);
  }


    public password_valid(){
    if(this.new_password===this.new_passwordconfirm){
      this.nav.pop().then(() => {
      // Trigger custom event and pass data to be send back
    //  this.viewCtrl.dismiss();
      this.events.publish('custom-user-events', this.new_passwordconfirm);
    });
  }
  else{
    let alert = this.alertCtrl.create({
      cssClass:'push_alert',
         title: "plinic",
         message: "신규 패스워드 불일치입니다.",
         buttons: [{
          text:'확인'
         }]
    });
    alert.present();
  }
}


}
