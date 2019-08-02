//import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, ModalController, ViewController, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { AgreementPage } from '../agreement/agreement';
import { LoginpagePage } from '../login/loginpage/loginpage';
import { IonicPage, App } from 'ionic-angular';
import { Naver } from 'ionic-plugin-naver';



// @IonicPage()
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
    public _kakaoCordovaSDK: KakaoCordovaSDK,
    public naver: Naver,
    public modalCtrl: ModalController,  public app: App, public platform: Platform
  ) {
    this.platform.ready().then((readySource) => {
      this.platform.registerBackButtonAction(() => {
        let nav = app._appRoot._getActivePortal() || app.getActiveNav();
        let activeView = nav.getActive();

        if (activeView != null) {
          if (this.nav.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
            this.nav.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
          }
          else if (activeView.isOverlay) {
            activeView.dismiss();
          }
          else {
            // backgroundMode.moveToBackground();
            let alert = this.alertCtrl.create({
              cssClass: 'push_alert_cancel',
              title: "plinic",
              message: "앱을 종료하시겠습니까?",
              buttons: [
                {
                  text: '취소',
                  role: 'cancel',
                  handler: () => {
                    console.log('취소');
                  }
                },
                {
                  text: '확인',
                  handler: () => {
                    console.log('확인'),
                      this.platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
                  }
                }]
            });
            alert.present();
          }
        }
      });
  });
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
    this.auth.naver_login();
  }

  public google_login() {
    //this.showLoading()
    // this.auth.facebook_login();
    this.auth.google_login();
    //this.loading.dismiss();
  }

  public facebook_login() {
    //this.showLoading()
    // this.auth.facebook_login();
    //this.loading.dismiss();
  }

  public kakao_login() {
    //스플래시 이미지 변경을 위해서 로딩 컴포넌트 빼 버림
    //this.showLoading()
    this.userData = this.auth.kakao_login();
    //스플래시 이미지 변경을 위해서 로딩 컴포넌트 빼 버림
    //this.loading.dismiss();
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
        // this.showError(error._body);
        this.showError(JSON.parse(error._body).msg);

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
      cssClass: 'push_alert',
      title: 'Plinic',
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
