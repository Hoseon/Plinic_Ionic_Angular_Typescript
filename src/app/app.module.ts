import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


// import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { GenderFilter } from './../pipes/gender-filter';
//import { UserCard } from '../components/user-card/user-card';


//탭페이지 구성
// import { LoginPage } from '../pages/login/login';
//import { LoginplinicPage } from '../pages/loginplinic/loginplinic';
import { AboutPage } from '../pages/about/about';
// import { HomePage } from '../pages/home/home';
// //import {SuccessHomePage} from '../pages/success-home/success-home';
// import { MyinfoPage } from '../pages/myinfo/myinfo';
// import { TabsPage } from '../pages/tabs/tabs';
// import { AgreementPage } from '../pages/agreement/agreement';
// import { LoginpagePage } from '../pages/login/loginpage/loginpage';
import { AddinfoPage } from '../pages/register/addinfo/addinfo';
// import { PasswordfindPage } from '../pages/login/passwordfind/passwordfind';
// import { PlinicManualPage } from '../pages/myinfo/details/plinic-manual/plinic-manual';
// import { QnaPage } from '../pages/myinfo/details/qna/qna';
// import { TermsPage } from '../pages/myinfo/details/terms/terms';
// import { PersonalinfoPage } from '../pages/myinfo/details/personalinfo/personalinfo';
// import { MarketingPage } from '../pages/myinfo/details/marketing/marketing';
// import { BluetoothConnectIngPage } from '../pages/myinfo/details/bluetooth-connect-ing/bluetooth-connect-ing';
// import { BluetoothDisconnectPage } from '../pages/myinfo/details/bluetooth-disconnect/bluetooth-disconnect';

//수정페이지
// import { ReRegisterPage } from '../pages/re-register/re-register';
// import { ModifyEmailPage } from '../pages/re-register/modify-email/modify-email';
// import { ModifyNumberPage } from '../pages/re-register/modify-number/modify-number';
// import { ModifyPasswordPage } from '../pages/re-register/modify-password/modify-password';
// import { QnaWritePage } from '../pages/myinfo/details/qna/qna-write/qna-write';
// import { QnaReadPage } from '../pages/myinfo/details/qna/qna-read/qna-read';
//
//
import { SkinChartPage } from '../pages/skin-chart/skin-chart';
// import { RegisterPage } from '../pages/register/register';
// import { RegistercompletePage } from '../pages/register/registercomplete/registercomplete';
// //케어존
// import { CareZonePage } from '../pages/care-zone/care-zone';
// import { CareZoneIngPage } from '../pages/care-zone-ing/care-zone-ing';
import { CareZoneMissionIngPage } from '../pages/care-zone-mission-ing/care-zone-mission-ing';
import { CareZoneMissionDeadlinePage } from '../pages/care-zone-mission-deadline/care-zone-mission-deadline';
// import { CareZoneMissionDeadlineEndPage } from '../pages/care-zone-mission-deadline-end/care-zone-mission-deadline-end';
// import { CareZoneMissionStartPage } from '../pages/care-zone-mission-start/care-zone-mission-start';
import { CareZoneMissionCompletePage } from '../pages/care-zone-mission-complete/care-zone-mission-complete';
// import { NoticePage } from '../pages/myinfo/details/notice/notice';
//
// //피부측정 페이지
// import { SkinMeasureStartPage } from '../pages/skin-measure-start/skin-measure-start';
// import { DeviceConnectIngPage } from '../pages/device-connect-ing/device-connect-ing';
// import { DeviceConnectCompletePage } from '../pages/device-connect-complete/device-connect-complete';
// import { DeviceConnectFailPage } from '../pages/device-connect-fail/device-connect-fail';
// import { DeviceSkinStartPage } from '../pages/device-skin-start/device-skin-start';
// import { DeviceSkinIngPage } from '../pages/device-skin-ing/device-skin-ing';
//
// //뷰티팁
// import { BeautyTipAddPage } from '../pages/beauty-tip-add/beauty-tip-add';
//
// //커뮤니티
import { CommunityPage } from '../pages/community/community';
import { CommunityModifyPage } from '../pages/community/community-modify/community-modify';
import { CommunityWritePage } from '../pages/community/community-write/community-write';
// //import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
//
// //미션 시작하기
// import { MissionStartPage } from '../pages/care-zone-mission-ing/mission-start/mission-start';
// import { MissionVideoPage } from '../pages/care-zone-mission-ing/mission-video/mission-video';
//




//
import { HomePageModule } from '../pages/home/home.module';
//import {SuccessHomePage} from '../pages/success-home/success-home';
import { MyinfoPageModule } from '../pages/myinfo/myinfo.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { AgreementPageModule } from '../pages/agreement/agreement.module';
import { LoginPageModule } from '../pages/login/login.module';
import { LoginpagePageModule } from '../pages/login/loginpage/loginpage.module';
// import { AddinfoPageModule } from '../pages/register/addinfo/addinfo.module';
import { PasswordfindPageModule } from '../pages/login/passwordfind/passwordfind.module';
import { PlinicManualPageModule } from '../pages/myinfo/details/plinic-manual/plinic-manual.module';
import { QnaPageModule } from '../pages/myinfo/details/qna/qna.module';
import { TermsPageModule } from '../pages/myinfo/details/terms/terms.module';
import { PersonalinfoPageModule } from '../pages/myinfo/details/personalinfo/personalinfo.module';
import { MarketingPageModule } from '../pages/myinfo/details/marketing/marketing.module';
import { BluetoothConnectIngPageModule } from '../pages/myinfo/details/bluetooth-connect-ing/bluetooth-connect-ing.module';
import { BluetoothDisconnectPageModule } from '../pages/myinfo/details/bluetooth-disconnect/bluetooth-disconnect.module';
//
// //수정페이지
import { ReRegisterPageModule } from '../pages/re-register/re-register.module';
import { ModifyEmailPageModule } from '../pages/re-register/modify-email/modify-email.module';
import { ModifyNumberPageModule } from '../pages/re-register/modify-number/modify-number.module';
import { ModifyPasswordPageModule } from '../pages/re-register/modify-password/modify-password.module';
import { ModifyNicknamePageModule } from '../pages/re-register/modify-nickname/modify-nickname.module';
import { QnaWritePageModule } from '../pages/myinfo/details/qna/qna-write/qna-write.module';
import { QnaReadPageModule } from '../pages/myinfo/details/qna/qna-read/qna-read.module';
//
//
import { SkinChartPageModule } from '../pages/skin-chart/skin-chart.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { RegistercompletePageModule } from '../pages/register/registercomplete/registercomplete.module';
// //케어존
import { CareZonePageModule } from '../pages/care-zone/care-zone.module';
import { CareZoneIngPageModule } from '../pages/care-zone-ing/care-zone-ing.module';
import { CareZoneMissionIngPageModule } from '../pages/care-zone-mission-ing/care-zone-mission-ing.module';
import { CareZoneMissionDeadlinePageModule } from '../pages/care-zone-mission-deadline/care-zone-mission-deadline.module';
import { CareZoneMissionDeadlineEndPageModule } from '../pages/care-zone-mission-deadline-end/care-zone-mission-deadline-end.module';
import { CareZoneMissionStartPageModule } from '../pages/care-zone-mission-start/care-zone-mission-start.module';
import { CareZoneMissionCompletePageModule } from '../pages/care-zone-mission-complete/care-zone-mission-complete.module';
import { NoticePageModule } from '../pages/myinfo/details/notice/notice.module';
//
// //피부측정 페이지
import { SkinMeasureStartPageModule } from '../pages/skin-measure-start/skin-measure-start.module';
import { DeviceConnectIngPageModule } from '../pages/device-connect-ing/device-connect-ing.module';
import { DeviceConnectCompletePageModule } from '../pages/device-connect-complete/device-connect-complete.module';
import { DeviceConnectFailPageModule } from '../pages/device-connect-fail/device-connect-fail.module';
import { DeviceSkinStartPageModule } from '../pages/device-skin-start/device-skin-start.module';
import { DeviceSkinIngPageModule } from '../pages/device-skin-ing/device-skin-ing.module';
//
// //뷰티팁
import { BeautyTipAddPageModule } from '../pages/beauty-tip-add/beauty-tip-add.module';
//
// //커뮤니티
//import { CommunityPageModule } from '../pages/community/community.module';
//import { CommunityModifyPageModule } from '../pages/community/community-modify/community-modify.module';
import { PopoverPage } from '../pages/community/community-modify/popover/popover';
//import { CommunityWritePageModule } from '../pages/community/community-write/community-write.module';
//import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
//
// //미션 시작하기
import { MissionStartPageModule } from '../pages/care-zone-mission-ing/mission-start/mission-start.module';
import { MissionVideoPageModule } from '../pages/care-zone-mission-ing/mission-video/mission-video.module';


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
// import { KeyboardAttachDirective } from '../providers/keyboard-attach.directive';

import { Http, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
//import { PlinicErrorHandlerProvider } from '../providers/plinic-error-handler/plinic-error-handler';

import { ImagesProvider } from '../providers/images/images';
import { Transfer } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';


//Bluetooth 모듈 추가
import { BluetoothLE } from '@ionic-native/bluetooth-le';

//다국어 처리 모듈 추가 20190510-추호선
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

//이미지 모듈 개선 추가
import { HttpClientModule } from '@angular/common/http';
import { IonicImageLoader } from 'ionic-image-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { AnimationService, AnimatesDirective } from 'css-animator';

import { SelectSearchableModule } from 'ionic-select-searchable';
import { MultiPickerModule } from 'ion-multi-picker';


import { FCM } from '@ionic-native/fcm';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';


//콜센터 연결
import { CallNumber } from '@ionic-native/call-number';
import { LocalNotifications } from '@ionic-native/local-notifications';


//문진표
import { SkinDiagnoseMoisturePageModule } from '../pages/skin-diagnose-moisture/skin-diagnose-moisture.module';
import { SkinDiagnoseOilPageModule } from '../pages/skin-diagnose-oil/skin-diagnose-oil.module';
import { SkinDiagnoseFirstMoisturePageModule } from '../pages/skin-diagnose-first-moisture/skin-diagnose-first-moisture.module';
import { SkinDiagnoseFirstOilPageModule } from '../pages/skin-diagnose-first-oil/skin-diagnose-first-oil.module';


//태그
import {IonTagsInputModule} from "ionic-tags-input";
import {RlTagInputModule} from 'angular2-tag-input';



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
    // LoginPage,
    // LoginpagePage,
    // PasswordfindPage,
    AddinfoPage,
    //    LoginplinicPage,
    AboutPage,
    // MyinfoPage,
    // TabsPage,
    // HomePage,
    //SuccessHomePage,
    SkinChartPage,
    // CareZonePage,
    // CareZoneIngPage,
    CareZoneMissionIngPage,
    CareZoneMissionDeadlinePage,
    // CareZoneMissionDeadlineEndPage,
    // CareZoneMissionStartPage,
    CareZoneMissionCompletePage,
    // PlinicManualPage,
    // QnaPage,
    // TermsPage,
    // RegisterPage,
    // ReRegisterPage,
    // ModifyEmailPage,
    // ModifyNumberPage,
    // ModifyPasswordPage,
    // RegistercompletePage,
    // AgreementPage,
    // PersonalinfoPage,
    // MarketingPage,
    // SkinMeasureStartPage,
    // DeviceConnectIngPage,
    // DeviceConnectCompletePage,
    // DeviceConnectFailPage,
    // DeviceSkinStartPage,
    // DeviceSkinIngPage,
    // AnimatesDirective,
    // BluetoothConnectIngPage,
    // BluetoothDisconnectPage,
    // NoticePage,
    GenderFilter,
    // BeautyTipAddPage,
    // QnaWritePage,
    CommunityPage,
    CommunityModifyPage,
    CommunityWritePage,
    // MissionStartPage,
    // MissionVideoPage,
    // QnaReadPage,
    // KeyboardAttachDirective,
    PopoverPage,
  ],
  imports: [
    HttpModule,
    HomePageModule,
    MyinfoPageModule,
    TabsPageModule,
    AgreementPageModule,
    LoginpagePageModule,
    LoginPageModule,
    // AddinfoPageModule,
    PasswordfindPageModule,
    PlinicManualPageModule,
    QnaPageModule,
    TermsPageModule,
    PersonalinfoPageModule,
    MarketingPageModule,
    BluetoothConnectIngPageModule,
    BluetoothDisconnectPageModule,
    ReRegisterPageModule,
    ModifyEmailPageModule,
    ModifyNumberPageModule,
    ModifyPasswordPageModule,
    ModifyNicknamePageModule,
    QnaWritePageModule,
    QnaReadPageModule,
    // SkinChartPageModule,
    RegisterPageModule,
    RegistercompletePageModule,
    CareZonePageModule,
    CareZoneIngPageModule,
    // CareZoneMissionIngPageModule,
    // CareZoneMissionDeadlinePageModule,
    CareZoneMissionDeadlineEndPageModule,
    CareZoneMissionStartPageModule,
    // CareZoneMissionCompletePageModule,
    NoticePageModule,
    SkinMeasureStartPageModule,
    DeviceConnectIngPageModule,
    DeviceConnectCompletePageModule,
    DeviceConnectFailPageModule,
    DeviceSkinStartPageModule,
    DeviceSkinIngPageModule,
    BeautyTipAddPageModule,
    //CommunityPageModule,
  //  CommunityModifyPageModule,
    //CommunityWritePageModule,
    MissionStartPageModule,
    MissionVideoPageModule,
    BrowserAnimationsModule,
    SkinDiagnoseMoisturePageModule,
    SkinDiagnoseOilPageModule,
    SkinDiagnoseFirstMoisturePageModule,
    SkinDiagnoseFirstOilPageModule,
    BrowserModule,
    MultiPickerModule,
    IonicModule.forRoot(MyApp),
    ProgressBarModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    IonicImageLoader.forRoot(),
    RlTagInputModule,
    SelectSearchableModule,
    NgCircleProgressModule.forRoot(),
    IonTagsInputModule,
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
    // LoginPage,
    // LoginpagePage,
    // PasswordfindPage,
    AddinfoPage,
    // AboutPage,
    // MyinfoPage,
    //    TabsPage,
    // HomePage,
    //SuccessHomePage,
    SkinChartPage,
    // CareZonePage,
    // CareZoneIngPage,
    CareZoneMissionIngPage,
    CareZoneMissionDeadlinePage,
    // CareZoneMissionDeadlineEndPage,
    // CareZoneMissionStartPage,
    CareZoneMissionCompletePage,
    // PlinicManualPage,
    // QnaPage,
    // TermsPage,
    // RegisterPage,
    // ReRegisterPage,
    // ModifyEmailPage,
    // ModifyNumberPage,
    // ModifyPasswordPage,
    // RegistercompletePage,
    // AgreementPage,
    // PersonalinfoPage,
    // MarketingPage,
    // SkinMeasureStartPage,
    // DeviceConnectIngPage,
    // DeviceConnectCompletePage,
    // DeviceConnectFailPage,
    // DeviceSkinStartPage,
    // DeviceSkinIngPage,
    // BluetoothConnectIngPage,
    // BluetoothDisconnectPage,
    // NoticePage,
    // BeautyTipAddPage,
    // QnaWritePage,
    CommunityPage,
    CommunityModifyPage,
    CommunityWritePage,
    // MissionStartPage,
    // MissionVideoPage,
    // QnaReadPage,
    PopoverPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    KakaoCordovaSDK,
    AuthService,
    IonicErrorHandler,
    // Facebook,
    GooglePlus,
    ImagesProvider,
    Transfer,
    Camera,
    Naver,
    BluetoothLE,
    //AnimationService,
    FCM,
    InAppBrowser,
    ThemeableBrowser,
    CallNumber,
    LocalNotifications,
    //  AdMobFree,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, Storage]
    }

  ]
})
export class AppModule { }

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}
