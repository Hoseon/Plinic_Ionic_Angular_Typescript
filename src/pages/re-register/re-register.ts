import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';


/**
 * Generated class for the ReRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-re-register',
  templateUrl: 're-register.html',
})
export class ReRegisterPage {

  createSuccess = false;
  birthday : any = this.navParams.get('birthday');
  email : any = this.navParams.get('email');
  gender: any = this.navParams.get('gender');
  nickname: any = this.navParams.get('nickname');
  profile_image: string;
  thumbnail_image: string;
  userData : any;



  registerCredentials = {email: '' , password: '', name: '', gender: '', country: '' , birthday: '', skincomplaint: '', interest: '', user_jwt: 'true' };


  constructor(public nav: NavController, public navParams: NavParams, public auth: AuthService, private alertCtrl: AlertController, private plt: Platform) {
  this.plt.ready().then(() => {
     this.loadItems();
   });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReRegisterPage');
    this.showPopup("myinfo userData", this.userData.birthday + this.birthday);
    this.showPopup("myinfo userData", this.userData.email + this.email);
    this.showPopup("myinfo userData", this.userData.gender + this.gender);
    this.showPopup("myinfo userData", this.userData.nickname + this.nickname);

  }



  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success !== '') {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
    error => {
      this.showPopup("Error", error._body);
    });
  }



  public isReadonly() {
    return this.isReadonly;   //return true/false
  }


  public loadItems(){
    this.auth.getUserStorage().then(data => {
      this.userData = data;
  });
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
