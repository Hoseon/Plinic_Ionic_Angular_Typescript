import { Component } from '@angular/core';
import { Platform, AlertController, ToastController, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { timer } from 'rxjs/observable/timer';

import { Device } from '@ionic-native/device';


@Component({
  templateUrl: 'app.html',
  // providers: [Keyboard],
})
export class MyApp {
  rootPage: any;

  showSplash = true;
  constructor(
    public app: App,
    public device : Device,
    public toastCtrl: ToastController,
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen, 
    private auth: AuthService,
    private screenOrientation: ScreenOrientation, 
    public translateService: TranslateService, //다국어 처리
    private alertCtrl: AlertController) {

    this.initializeApp();

  }

  initializeApp() {

    //다국어 처리 시작 ----------------------------------
    // let browserLanguage = this.translateService.getBrowserLang();
    // let defaultlanguage = browserLanguage.substring(0, 2).toLowerCase();
    // this.translateService.use(defaultlanguage);
    //다국어 처리 종료 ----------------------------------

    this.rootPage = LoginPage;

    this.platform.ready().then(() => {
      this.auth.authenticationState.subscribe(state => {
        if (state) {
          // this.rootPage = 'TabsPage';
          this.app.getActiveNav().setRoot('TabsPage'); 
        } else {
          // this.rootPage = LoginPage;
          this.app.getActiveNav().setRoot(LoginPage); 
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.platform.is('cordova')) {  //화면 가로모드 방지 하기 위하여 추가 20190508 추호선
        this.statusBar.styleDefault();
      }
      

      if (this.platform.is('cordova')) {  //화면 가로모드 방지 하기 위하여 추가 20190508 추호선
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
      if (this.platform.is('cordova')) {
        this.splashScreen.hide();
        if (this.platform.is('ios)')) {
          timer(3000).subscribe(() => this.showSplash = false)
        }
        else {
          timer(3000).subscribe(() => this.showSplash = false)
        }
      } else {
        this.showSplash = false
      }
    });
  }


  showAlert(text) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: '알림',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
