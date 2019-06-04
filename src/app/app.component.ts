import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private auth: AuthService,
    private screenOrientation: ScreenOrientation, public translateService: TranslateService, private imageLoaderConfig: ImageLoaderConfig,
    private fcm: FCM, private alertCtrl: AlertController) {

    this.initializeApp();

  }

  initializeApp() {
    let browserLanguage = this.translateService.getBrowserLang();
    let defaultlanguage = browserLanguage.substring(0, 2).toLowerCase();
    //console.log("defaultlanguage:"+defaultlanguage)


    this.translateService.use(defaultlanguage);
    this.platform.ready().then(() => {

      if (this.platform.is('ios')) {
        this.fcm.subscribeToTopic('all');

        this.fcm.getToken().then(token => {
          console.log("FCM Token :::::::::::::" + token);
        })

        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background - iOS");
          } else {
            this.showAlert(JSON.stringify(data.aps.alert));
            console.log("Received in foreground - iOS");
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          console.log("FCM Refresh Token :::::::::::::" + token);
        });
      }

      if (this.platform.is('cordova'))  {
        this.fcm.subscribeToTopic('all');

        this.fcm.getToken().then(token => {
          console.log("FCM Token :::::::::::::" + token);
        })

        this.fcm.onNotification().subscribe(data => {
          console.log("FCM data ::::::::::::::" + JSON.stringify(data));
          let alert = this.alertCtrl.create({
            cssClass: 'push_alert',
            title: data.title,
            subTitle: data.message_name,
            message: data.body,
            buttons: [{
              text: '확인'
            }]
          });
          alert.present();
          if (data.wasTapped) {
          }
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          console.log("FCM Refresh Token :::::::::::::" + token);
        });
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.auth.authenticationState.subscribe(state => {
        if (state) {
          this.rootPage = 'TabsPage';
        } else {
          this.rootPage = LoginPage;
        }
      });

      if (this.platform.is('cordova')) {  //화면 가로모드 방지 하기 위하여 추가 20190508 추호선
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
      this.splashScreen.hide();

      this.imageLoaderConfig.enableDebugMode();
      this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
      this.imageLoaderConfig.setFallbackUrl('assets/img/logo.png');
      this.imageLoaderConfig.setMaximumCacheAge(24 * 60 * 60 * 1000);
    });
  }


  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: '알림',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }


}
