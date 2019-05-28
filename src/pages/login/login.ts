//import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { Naver } from 'ionic-plugin-naver';
import { AgreementPage } from '../agreement/agreement';
import { LoginpagePage } from '../login/loginpage/loginpage';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  restInfo = {};
  userData: any;
  constructor(private nav: NavController, private auth: AuthService,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    public _kakaoCordovaSDK: KakaoCordovaSDK, public naver: Naver, public modalCtrl: ModalController
  ) {

  }



  ionViewDidLoad() {
    //console.log('ionViewDidLoad Loginpage');
  }



  public loginpage() {
    const modal = this.modalCtrl.create(LoginpagePage);
    modal.present();
  }



  public agreement() {
    const modal = this.modalCtrl.create(AgreementPage);
    modal.present();
  }


  public naver_login() {
    //this.showLoading();
    this.userData = this.auth.naver_login();
    //this.loading.dismiss();
  }

  public google_login() {
    this.showLoading()
    this.auth.google_login();
    this.loading.dismiss();
  }

  public facebook_login() {
    this.showLoading()
    this.auth.facebook_login();
    this.loading.dismiss();
  }

  public kakao_login() {
    this.showLoading()
    this.userData = this.auth.kakao_login();
    this.loading.dismiss();
  }

  public kakao_logout() {
    this._kakaoCordovaSDK.logout().then(() => {

    });

    //this.auth.kakao_authlogout();
  }

  // Push the registerPage
  // public createAccount() {
  //   this.nav.push('RegisterPage');
  // }



  // Submit the login form, login the user with our provider and push Home page if successful
  public onSubmit() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(data => {
      if (data !== '') {
        this.loading.dismiss();
        this.nav.setRoot('TabsPage')
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

  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
