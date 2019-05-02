import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';


//탭페이지 구성
import { LoginPage } from '../pages/login/login';
//import { LoginplinicPage } from '../pages/loginplinic/loginplinic';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { MyinfoPage } from '../pages/myinfo/myinfo';
import { TabsPage } from '../pages/tabs/tabs';

import { PlinicManualPage } from '../pages/myinfo/details/plinic-manual/plinic-manual';
import { QnaPage } from '../pages/myinfo/details/qna/qna';
import { TermsPage } from '../pages/myinfo/details/terms/terms';
import { ReRegisterPage } from '../pages/re-register/re-register';
import { SkinChartPage } from '../pages/skin-chart/skin-chart';

//케어존
import {CareZonePage} from '../pages/care-zone/care-zone';
import { CareZoneIngPage } from '../pages/care-zone-ing/care-zone-ing';
import { CareZoneMissionIngPage } from '../pages/care-zone-mission-ing/care-zone-mission-ing';
import {ProgressBarModule} from "angular-progress-bar";
import { CareZoneMissionDeadlinePage } from '../pages/care-zone-mission-deadline/care-zone-mission-deadline';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { Storage } from '@ionic/storage';

import { KakaoCordovaSDK } from 'kakao-sdk';
import { AuthService } from '../providers/auth-service';

import { Http, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
//import { PlinicErrorHandlerProvider } from '../providers/plinic-error-handler/plinic-error-handler';

import { ImagesProvider } from '../providers/images/images';
import { Transfer } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';



export function getAuthHttp(http, storage) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: '',
    noJwtError: true,
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    //    LoginplinicPage,
    AboutPage,
    ContactPage,
    MyinfoPage,
    // TabsPage,
    HomePage,
    SkinChartPage,
    CareZonePage,
    CareZoneIngPage,
    CareZoneMissionIngPage,
    CareZoneMissionDeadlinePage,
    PlinicManualPage,
    QnaPage,
    TermsPage,
    ReRegisterPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ProgressBarModule,
    IonicStorageModule.forRoot()

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    MyinfoPage,
    //    TabsPage,
    HomePage,
    SkinChartPage,
    CareZonePage,
    CareZoneIngPage,
    CareZoneMissionIngPage,
    CareZoneMissionDeadlinePage,
    PlinicManualPage,
    QnaPage,
    TermsPage,
    ReRegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    KakaoCordovaSDK,
    AuthService,
    IonicErrorHandler,
    Facebook,
    GooglePlus,
    ImagesProvider,
    Transfer,
    Camera,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, Storage]
    }

  ]
})
export class AppModule { }
