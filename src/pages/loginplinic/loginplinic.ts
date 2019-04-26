import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the LoginplinicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginplinic',
  templateUrl: 'loginplinic.html',
})
export class LoginplinicPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  restInfo = {};
  userData: any;
  constructor(private nav: NavController, private navparams: NavParams, private auth: AuthService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    //public _kakaoCordovaSDK: KakaoCordovaSDK
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginplinicPage');
  }

  public kakao_login() {
    this.showLoading()
    this.userData = this.auth.kakao_login();
    this.loading.dismiss();
    // if (this.userData.id !== null) {
    //   this.nav.setRoot('TabsPage');
    // } else {
    //   this.showError("Access Denied");
    // }
  }

  public kakao_logout() {
    //this._kakaoCordovaSDK.logout().then(() => {
    //this.authenticationState.next(false);
    // if (this.userData.id !== '') {
    //   this.nav.setRoot('LoginPage')
    // } else {
    //   this.showError("Access Denied");
    // }
    //});

    //this.auth.kakao_authlogout();
  }

  // Push the registerPage
  public createAccount() {
    this.nav.push('RegisterPage');
  }

  // Submit the login form, login the user with our provider and push Home page if successful
  public onSubmit() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(data => {
      if (data !== '') {
        this.loading.dismiss();
        //this.nav.setRoot('TabsPage')
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error._body);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
