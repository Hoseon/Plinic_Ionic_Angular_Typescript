//import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, ModalController, ViewController, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { AgreementPage } from '../agreement/agreement';
import { LoginpagePage } from '../login/loginpage/loginpage';
import { AddinfoPage } from '../register/addinfo/addinfo';
import { IonicPage, App } from 'ionic-angular';
import { Naver } from 'ionic-plugin-naver';
import { isThisSecond } from 'date-fns';



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
  isReview: boolean = false;
  constructor(
    private nav: NavController, 
    private auth: AuthService,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    public _kakaoCordovaSDK: KakaoCordovaSDK,
    public naver: Naver,
    public modalCtrl: ModalController,  
    public app: App, 
    public platform: Platform
  ) {
    this.platform.ready().then((readySource) => {
      // this.platform.registerBackButtonAction(() => {
      //   let nav = app._appRoot._getActivePortal() || app.getActiveNav();
      //   let activeView = nav.getActive();

      //   console.log("activeView.name===================" + activeView.name);

      //   if (activeView != null) {
      //     if (this.nav.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
      //       this.nav.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
      //     }
      //     else if (activeView.isOverlay) {
      //       activeView.dismiss();
      //     }
      //     else {
      //       if(activeView.name === 'AddinfoPage'
      //           || activeView.name === 'PasswordfindPage'
      //           || activeView.name === 'AgreementPage'
      //           || activeView.name === 'LoginpagePage'

      //     ){
      //       console.log("activeView.name===================111111111000000");
      //       activeView.dismiss();
      //       }
      //       else{
      //       let alert = this.alertCtrl.create({
      //         cssClass: 'push_alert_cancel',
      //         title: "plinic",
      //         message: "앱을 종료하시겠습니까?",
      //         buttons: [
      //           {
      //             text: '취소',
      //             role: 'cancel',
      //             handler: () => {
      //               console.log('취소');
      //             }
      //           },
      //           {
      //             text: '확인',
      //             handler: () => {
      //               console.log('확인'),
      //                 this.platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
      //             }
      //           }]
      //       });
      //       alert.present();
      //     }
      //   }
      // }
      // });
  });
} 

   ionViewCanEnter(){
    console.log('ionViewCanEnter Loginpage');
    this.auth.isReview().subscribe(async result =>{
      var data = await result;
      this.isReview = data.isReview;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Loginpage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter Loginpage');
  }

  ionViewWillEnter(){
      console.log('ionViewWillEnter Loginpage');
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
    // this.auth.naver_login();
    this.auth.naver_promise().then(snsUserdata=>{
      console.log("리졸브 결과는? : " +JSON.stringify(snsUserdata));
      if(snsUserdata) {
        const modal = this.modalCtrl.create(AddinfoPage, {snsUserdata : snsUserdata});
        modal.present();
      }
    }).catch(reject => {
      console.log("네이버 로그인 실패" + reject);
    })
  }

  public naver_login_noReview() {
    this.auth.naver_login();
  }

  public google_login() {
    //this.showLoading()
    // this.auth.facebook_login();
    // this.auth.google_login();
    //this.loading.dismiss();
    this.auth.google_login_promise().then(snsUserdata=>{
      console.log("리졸브 결과는? : " +JSON.stringify(snsUserdata));
      if(snsUserdata) {
        const modal = this.modalCtrl.create(AddinfoPage, {snsUserdata : snsUserdata});
        modal.present();
      }
    }).catch(reject => {
      console.log("구글 로그인 실패" + reject);
    })
  }

  public google_login_noReview() {
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

  public apple_login_noReview() {
    this.auth.apple_login();
  }

  public apple_login() {

    this.auth.apple_login_promise().then(snsUserdata=>{
      console.log("애플 리졸브 결과는? : " +JSON.stringify(snsUserdata));
      if(snsUserdata) {
        const modal = this.modalCtrl.create(AddinfoPage, {snsUserdata : snsUserdata});
        modal.present();
      }
    }).catch(reject => {
      console.log("애플 로그인 실패" + reject);
    });
    
    // cordova.plugins.SignInWithApple.signin(
    //   { requestedScopes: [0, 1] },
    //   function(succ){
    //     console.log(succ)
    //     alert(JSON.stringify(succ))
    //   },
    //   function(err){
    //     console.error(err)
    //     console.log(JSON.stringify(err))
    //   }
    // )
  }

  public kakao_login() {

    this.auth.kakao_login_promise().then(snsUserdata=>{
      console.log("리졸브 결과는? : " +JSON.stringify(snsUserdata));
      if(snsUserdata) {
        const modal = this.modalCtrl.create(AddinfoPage, {snsUserdata : snsUserdata});
        modal.present();
      }
    }).catch(reject => {
      console.log("카카오 로그인 실패" + reject);
    })
  }

  public kakao_login_noReview() {
    this.userData = this.auth.kakao_login();
  }

  public kakao_logout() {
    this._kakaoCordovaSDK.logout().then(() => {

    });
  }

  public onSubmit() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(data => {
      if (data !== '') {
        this.loading.dismiss();
        console.log("로그인에서 탭스 페이지 호출");
        this.nav.setRoot('TabsPage')
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(JSON.parse(error._body).msg);

      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '잠시만 기다려주세요'
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
