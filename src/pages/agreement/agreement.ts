import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import {RegisterPage} from '../register/register';
import { TermsPage } from '../myinfo/details/terms/terms';
import { PersonalinfoPage } from '../myinfo/details/personalinfo/personalinfo';
import { MarketingPage } from '../myinfo/details/marketing/marketing';
/**
 * Generated class for the AgreementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agreement',
  templateUrl: 'agreement.html',
})
export class AgreementPage {


createSuccess = false;
agree: boolean;
agree1: boolean;
agree2: boolean;

  constructor(public nav: NavController, public navParams: NavParams, private alertCtrl: AlertController
  , public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AgreementPage');
  }


  updateagree() {
  console.log('agree new state:' + this.agree);
  console.log('agree new state:' + this.agree1);
  console.log('agree new state:' + this.agree2);

}
public dissmiss(){
  this.viewCtrl.dismiss();
}


 public service(){
     this.nav.push(TermsPage);
 }

 public information(){
     this.nav.push(PersonalinfoPage);
 }

 public marketing(){
      this.nav.push(MarketingPage);
 }

 public registerpage() {

  if(this.agree===true && this.agree1===true){
      // this.viewCtrl.dismiss();
       this.nav.push(RegisterPage);
  }
  else{
    let alert = this.alertCtrl.create({
      cssClass:'push_alert',
         title: "이용약관",
         message: "필수조건에 만족하지 못합니다.",
         buttons: [{
          text:'확인'
         }]
    });
    alert.present();
  }
}




showPopup(title, text) {
  let alert = this.alertCtrl.create({
    title: title,
    message: text,
    buttons: [
     {
       text: 'OK',
       handler: data => {
         if (this.createSuccess) {
           this.nav.popToRoot();
         }
       }
     }
   ]
  });
  alert.present();
}



}
