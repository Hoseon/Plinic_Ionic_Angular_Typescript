import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { GenderFilter } from './../pipes/gender-filter';
//import { UserCard } from '../components/user-card/user-card';


//탭페이지 구성
import { LoginPage } from '../pages/login/login';
//import { LoginplinicPage } from '../pages/loginplinic/loginplinic';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
//import {SuccessHomePage} from '../pages/success-home/success-home';
import { MyinfoPage } from '../pages/myinfo/myinfo';
import { TabsPage } from '../pages/tabs/tabs';
import { AgreementPage } from '../pages/agreement/agreement';
import { LoginpagePage} from '../pages/login/loginpage/loginpage';
import {AddinfoPage} from '../pages/register/addinfo/addinfo';
import {PasswordfindPage} from '../pages/login/passwordfind/passwordfind';
import { PlinicManualPage } from '../pages/myinfo/details/plinic-manual/plinic-manual';
import { QnaPage } from '../pages/myinfo/details/qna/qna';
import { TermsPage } from '../pages/myinfo/details/terms/terms';
import { PersonalinfoPage } from '../pages/myinfo/details/personalinfo/personalinfo';
import { MarketingPage } from '../pages/myinfo/details/marketing/marketing';
import { BluetoothConnectIngPage } from '../pages/myinfo/details/bluetooth-connect-ing/bluetooth-connect-ing';
import { BluetoothDisconnectPage } from '../pages/myinfo/details/bluetooth-disconnect/bluetooth-disconnect';

import { ReRegisterPage } from '../pages/re-register/re-register';
import { SkinChartPage } from '../pages/skin-chart/skin-chart';
import { RegisterPage } from '../pages/register/register';
import { RegistercompletePage} from '../pages/register/registercomplete/registercomplete';
//케어존
import { CareZonePage } from '../pages/care-zone/care-zone';
import { CareZoneIngPage } from '../pages/care-zone-ing/care-zone-ing';
import { CareZoneMissionIngPage } from '../pages/care-zone-mission-ing/care-zone-mission-ing';
import { CareZoneMissionDeadlinePage } from '../pages/care-zone-mission-deadline/care-zone-mission-deadline';
import { CareZoneMissionDeadlineEndPage} from '../pages/care-zone-mission-deadline-end/care-zone-mission-deadline-end';
import { CareZoneMissionStartPage} from '../pages/care-zone-mission-start/care-zone-mission-start';
import { CareZoneMissionCompletePage} from '../pages/care-zone-mission-complete/care-zone-mission-complete';
import { NoticePage } from '../pages/myinfo/details/notice/notice';

import { ProgressBarModule } from "angular-progress-bar";
import { NgCircleProgressModule } from 'ng-circle-progress';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IonicStorageModule } from '@ionic/storage';

import { Storage } from '@ionic/storage';

import { KakaoCordovaSDK } from 'kakao-sdk';
import { Naver } from 'ionic-plugin-naver';
import { AuthService } from '../providers/auth-service';

import { Http, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
//import { PlinicErrorHandlerProvider } from '../providers/plinic-error-handler/plinic-error-handler';

import { ImagesProvider } from '../providers/images/images';
import { Transfer } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';

//피부측정 페이지
import { SkinMeasureStartPage } from '../pages/skin-measure-start/skin-measure-start';
import { DeviceConnectIngPage } from '../pages/device-connect-ing/device-connect-ing';
import { DeviceConnectCompletePage } from '../pages/device-connect-complete/device-connect-complete';
import { DeviceConnectFailPage } from '../pages/device-connect-fail/device-connect-fail';
import { DeviceSkinStartPage } from '../pages/device-skin-start/device-skin-start';
import { DeviceSkinIngPage } from '../pages/device-skin-ing/device-skin-ing';
//Bluetooth 모듈 추가
import { BluetoothLE } from '@ionic-native/bluetooth-le';

//다국어 처리 모듈 추가 20190510-추호선
import { TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

//이미지 모듈 개선 추가
import { HttpClientModule } from '@angular/common/http';
import { IonicImageLoader } from 'ionic-image-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationService, AnimatesDirective } from 'css-animator';

import { SelectSearchableModule } from 'ionic-select-searchable';
import { MultiPickerModule } from 'ion-multi-picker';


import { FCM } from '@ionic-native/fcm';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';


//콜센터 연결
import { CallNumber } from '@ionic-native/call-number';



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
    LoginpagePage,
    PasswordfindPage,
    AddinfoPage,
    //    LoginplinicPage,
    AboutPage,
    ContactPage,
    MyinfoPage,
    // TabsPage,
    HomePage,
    //SuccessHomePage,
    SkinChartPage,
    CareZonePage,
    CareZoneIngPage,
    CareZoneMissionIngPage,
    CareZoneMissionDeadlinePage,
    CareZoneMissionDeadlineEndPage,
    CareZoneMissionStartPage,
    CareZoneMissionCompletePage,
    PlinicManualPage,
    QnaPage,
    TermsPage,
    RegisterPage,
    ReRegisterPage,
    RegistercompletePage,
    AgreementPage,
    PersonalinfoPage,
    MarketingPage,
    SkinMeasureStartPage,
    DeviceConnectIngPage,
    DeviceConnectCompletePage,
    DeviceConnectFailPage,
    DeviceSkinStartPage,
    DeviceSkinIngPage,
    AnimatesDirective,
    BluetoothConnectIngPage,
    BluetoothDisconnectPage,
    NoticePage,
    GenderFilter,
    //UserCard,
  ],
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ProgressBarModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    IonicImageLoader.forRoot(),
    SelectSearchableModule,
    MultiPickerModule,
    NgCircleProgressModule.forRoot(),
    TranslateModule.forRoot({
   provide: TranslateLoader,
   useFactory: (createTranslateLoader),
   deps: [Http]
 }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    LoginpagePage,
    PasswordfindPage,
    AddinfoPage,
    AboutPage,
    ContactPage,
    MyinfoPage,
    //    TabsPage,
    HomePage,
    //SuccessHomePage,
    SkinChartPage,
    CareZonePage,
    CareZoneIngPage,
    CareZoneMissionIngPage,
    CareZoneMissionDeadlinePage,
    CareZoneMissionDeadlineEndPage,
    CareZoneMissionStartPage,
    CareZoneMissionCompletePage,
    PlinicManualPage,
    QnaPage,
    TermsPage,
    RegisterPage,
    ReRegisterPage,
    RegistercompletePage,
    AgreementPage,
    PersonalinfoPage,
    MarketingPage,
    SkinMeasureStartPage,
    DeviceConnectIngPage,
    DeviceConnectCompletePage,
    DeviceConnectFailPage,
    DeviceSkinStartPage,
    DeviceSkinIngPage,
    BluetoothConnectIngPage,
    BluetoothDisconnectPage,
    NoticePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    KakaoCordovaSDK,
    AuthService,
    IonicErrorHandler,
    Facebook,
    GooglePlus,
    ImagesProvider,
    Transfer,
    Camera,
    Naver,
    BluetoothLE,
    AnimationService,
    FCM,
    InAppBrowser,
    ThemeableBrowser,
    CallNumber,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, Storage]
    }

  ]
})
export class AppModule { }

export function createTranslateLoader(http: Http){
  return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}
