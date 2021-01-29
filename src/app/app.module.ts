import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { GooglePlus } from '@ionic-native/google-plus';

import { GenderFilter } from './../pipes/gender-filter';
//import { UserCard } from '../components/user-card/user-card';
// import { Keyboard } from '@ionic-native/keyboard';

//탭페이지 구성
// import { LoginPage } from '../pages/login/login';
//import { LoginplinicPage } from '../pages/loginplinic/loginplinic';
import { AboutPage } from '../pages/about/about';
// import { HomePage } from '../pages/home/home';
// //import {SuccessHomePage} from '../pages/success-home/success-home';
import { MyinfoPage } from '../pages/myinfo/myinfo';
import { OrderDetailPageModule } from '../pages/order-detail/order-detail.module';
import { SettingPage } from '../pages/myinfo/setting/setting';
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
import { ReRegisterPage } from '../pages/re-register/re-register';
// import { ModifyEmailPage } from '../pages/re-register/modify-email/modify-email';
// import { ModifyNumberPage } from '../pages/re-register/modify-number/modify-number';
// import { ModifyPasswordPage } from '../pages/re-register/modify-password/modify-password';
// import { QnaWritePage } from '../pages/myinfo/details/qna/qna-write/qna-write';
// import { QnaReadPage } from '../pages/myinfo/details/qna/qna-read/qna-read';
//
//
import { SkinChartPage } from '../pages/skin-chart/skin-chart';
import { RegisterPage } from '../pages/register/register';
import { RegistercompletePage } from '../pages/register/registercomplete/registercomplete';
// //케어존
// import { CareZonePage } from '../pages/care-zone/care-zone';
// import { CareZoneIngPage } from '../pages/care-zone-ing/care-zone-ing';
import { CareZoneMissionIngPage } from '../pages/care-zone-mission-ing/care-zone-mission-ing';
import { ChalMissionIngPage } from '../pages/chal-mission-ing/chal-mission-ing';
import { CareZoneMissionDeadlinePage } from '../pages/care-zone-mission-deadline/care-zone-mission-deadline';
// import { CareZoneMissionDeadlineEndPage } from '../pages/care-zone-mission-deadline-end/care-zone-mission-deadline-end';
// import { CareZoneMissionStartPage } from '../pages/care-zone-mission-start/care-zone-mission-start';
import { CareZoneMissionCompletePage } from '../pages/care-zone-mission-complete/care-zone-mission-complete';
import { ChalGuidePageModule } from '../pages/chal-guide/chal-guide.module';
import { UseGuidePageModule } from '../pages/use-guide/use-guide.module';
import { SkinReadyPageModule } from '../pages/skin-ready/skin-ready.module';
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
// import { CommunityPage } from '../pages/community/community';
import { CommunityModifyPage } from '../pages/community/community-modify/community-modify';
import { CommunityWritePage } from '../pages/community/community-write/community-write';
import { CommunityPageModule } from '../pages/community/community.module';
import { CommunityTipPageModule } from '../pages/communityTip/communityTip.module';
import { MovieTipPagePageModule } from '../pages/movieTip/movieTip.module';
// import { CommunityModifyPageModule } from '../pages/community/community-modify/community-modify.module';
// import { CommunityWritePageModule } from '../pages/community/community-write/community-write.module';
// //import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
//
// //미션 시작하기
// import { MissionStartPage } from '../pages/care-zone-mission-ing/mission-start/mission-start';
// import { MissionVideoPage } from '../pages/care-zone-mission-ing/mission-video/mission-video';
//




//
import { HomePageModule } from '../pages/home/home.module';
//import {SuccessHomePage} from '../pages/success-home/success-home';
//import { MyinfoPageModule } from '../pages/myinfo/myinfo.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { AgreementPageModule } from '../pages/agreement/agreement.module';
import { LoginPageModule } from '../pages/login/login.module';
import { LoginpagePageModule } from '../pages/login/loginpage/loginpage.module';
// import { AddinfoPageModule } from '../pages/register/addinfo/addinfo.module';
import { PasswordfindPageModule } from '../pages/login/passwordfind/passwordfind.module';
import { IdfindPageModule } from '../pages/idfind/idfind.module';
import { PasswordresetPageModule } from '../pages/passwordreset/passwordreset.module';
import { IdfindresultPageModule } from '../pages/idfindresult/idfindresult.module';
import { PlinicManualPageModule } from '../pages/myinfo/details/plinic-manual/plinic-manual.module';
import { QnaPageModule } from '../pages/myinfo/details/qna/qna.module';
import { TermsPageModule } from '../pages/myinfo/details/terms/terms.module';
import { FaqPage } from '../pages/myinfo/details/faq/faq';
import { PersonalinfoPageModule } from '../pages/myinfo/details/personalinfo/personalinfo.module';
import { MarketingPageModule } from '../pages/myinfo/details/marketing/marketing.module';
import { BluetoothConnectIngPageModule } from '../pages/myinfo/details/bluetooth-connect-ing/bluetooth-connect-ing.module';
import { BluetoothDisconnectPageModule } from '../pages/myinfo/details/bluetooth-disconnect/bluetooth-disconnect.module';
//
// //수정페이지
//import { ReRegisterPageModule } from '../pages/re-register/re-register.module';
import { ModifyEmailPageModule } from '../pages/re-register/modify-email/modify-email.module';
import { ModifyNumberPageModule } from '../pages/re-register/modify-number/modify-number.module';
import { ModifyPasswordPageModule } from '../pages/re-register/modify-password/modify-password.module';
import { ModifyNicknamePageModule } from '../pages/re-register/modify-nickname/modify-nickname.module';
import { QnaWritePageModule } from '../pages/myinfo/details/qna/qna-write/qna-write.module';
import { QnaReadPageModule } from '../pages/myinfo/details/qna/qna-read/qna-read.module';
//
//
import { SkinChartPageModule } from '../pages/skin-chart/skin-chart.module';
//import { RegisterPageModule } from '../pages/register/register.module';
//import { RegistercompletePageModule } from '../pages/register/registercomplete/registercomplete.module';
// //케어존
import { CareZonePageModule } from '../pages/care-zone/care-zone.module';
import { CareZoneIngPageModule } from '../pages/care-zone-ing/care-zone-ing.module';
import { CareZoneMissionIngPageModule } from '../pages/care-zone-mission-ing/care-zone-mission-ing.module';
import { CareZoneMissionDeadlinePageModule } from '../pages/care-zone-mission-deadline/care-zone-mission-deadline.module';
import { CareZoneMissionDeadlineEndPageModule } from '../pages/care-zone-mission-deadline-end/care-zone-mission-deadline-end.module';
import { CareZoneMissionStartPageModule } from '../pages/care-zone-mission-start/care-zone-mission-start.module';
import { ChalMissionStartPageModule } from '../pages/chal-mission-start/chal-mission-start.module';
import { CareZoneMissionCompletePageModule } from '../pages/care-zone-mission-complete/care-zone-mission-complete.module';
import { NoticePageModule } from '../pages/myinfo/details/notice/notice.module';
//
// //피부측정 페이지
import { SkinMeasureStartPageModule } from '../pages/skin-measure-start/skin-measure-start.module';
import { DeviceConnectIngPageModule } from '../pages/device-connect-ing/device-connect-ing.module';
import { DeviceCameraPageModule } from '../pages/device-camera/device-camera.module';
import { DeviceConnectSkinIngPageModule } from '../pages/device-connect-skin-ing/device-connect-skin-ing.module';
import { DeviceConnectCompletePageModule } from '../pages/device-connect-complete/device-connect-complete.module';
import { DeviceConnectFailPageModule } from '../pages/device-connect-fail/device-connect-fail.module';
import { DeviceSkinStartPageModule } from '../pages/device-skin-start/device-skin-start.module';
import { DeviceSkinIngPageModule } from '../pages/device-skin-ing/device-skin-ing.module';
// import { DeviceSkinSensorIngPageModule } from '../pages/device-skinsensor-ing/device-skinsensor-ing.module';
import { DeviceSkinSensorIngPage } from '../pages/device-skinsensor-ing/device-skinsensor-ing';
//
// //뷰티팁
import { BeautyTipAddPageModule } from '../pages/beauty-tip-add/beauty-tip-add.module';
//
// //커뮤니티
//import { CommunityPageModule } from '../pages/community/community.module';
//import { CommunityModifyPageModule } from '../pages/community/community-modify/community-modify.module';
import { PopoverPage } from '../pages/community/community-modify/popover/popover';
import { AlignPopoverPage } from '../pages/community/search/align-popover/align-popover';
import { MyPage } from '../pages/community/my/my';
import { MyCommunityModifyPage } from '../pages/community/my/my-community-modify/my-community-modify';
import { SearchPage } from '../pages/community/search/search';
//import { CommunityWritePageModule } from '../pages/community/community-write/community-write.module';
//import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
//
// //미션 시작하기
import { MissionStartPageModule } from '../pages/care-zone-mission-ing/mission-start/mission-start.module';
import { MissionVideoPageModule } from '../pages/care-zone-mission-ing/mission-video/mission-video.module';

//20191022 케어 챌린지 보상 페이지
import { RewardPageModule } from '../pages/reward/reward.module'


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
// import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { BLE } from '@ionic-native/ble';

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
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';


//콜센터 연결
import { CallNumber } from '@ionic-native/call-number';


//문진표
import { SkinDiagnoseMoisturePageModule } from '../pages/skin-diagnose-moisture/skin-diagnose-moisture.module';
import { SkinDiagnoseOilPageModule } from '../pages/skin-diagnose-oil/skin-diagnose-oil.module';
import { SkinDiagnoseFirstMoisturePageModule } from '../pages/skin-diagnose-first-moisture/skin-diagnose-first-moisture.module';
import { SkinDiagnoseFirstOilPageModule } from '../pages/skin-diagnose-first-oil/skin-diagnose-first-oil.module';


//빌링 결제 
import { MembershipManagePageModule } from '../pages/bill/membership-manage/membership-manage.module';
import { MembershipListPageModule } from '../pages/bill/membership-list/membership-list.module';
import { BillCancel1PageModule } from '../pages/bill/bill-cancel1/bill-cancel1.module'
import { BillCancel2PageModule } from '../pages/bill/bill-cancel2/bill-cancel2.module'
import { BillCancel3PageModule } from '../pages/bill/bill-cancel3/bill-cancel3.module'
import { BillCancel4PageModule } from '../pages/bill/bill-cancel4/bill-cancel4.module'

//태그
import { RlTagInputModule } from 'angular2-tag-input';

//각종 소셜 쉐어 기능,,,
import { SocialSharing } from '@ionic-native/social-sharing';

import { CustomIconsModule } from 'ionic2-custom-icons'

//20190923 기기별로 분리하여 css정의 하기 위한 패키지
import { Device } from '@ionic-native/device';

//20200206 출석체크 페이지
// import { ChulsukCheckPageModule } from '../pages/chulsuk-check/chulsuk-check.module'
import { ChulsukCheckPage } from '../pages/chulsuk-check/chulsuk-check'

//20200421 나의 활동 페이지
import { MyqnaPageModule } from '../pages/myqna/myqna.module'

import { CalendarModule } from 'ionic3-calendar-en';

//20200214 달력 모듈 추가
import { NgCalendarModule } from 'ionic2-calendar';

//202020220 포인트 가이드 페이지 추가
import { GuidePageModule } from '../pages/guide/guide.module';
import { SkinGuidePageModule } from '../pages/skin-guide/skin-guide.module';


//20200424 피부 진단
import { CameraGuidePageModule } from '../pages/camera-guide/camera-guide.module';
import { CameraGuideFirstPageModule } from '../pages/camera-guide-first/camera-guide-first.module';
import { SkinChekPageModule } from '../pages/skin-chek/skin-chek.module';
import { SkinChekMunjinPageModule } from '../pages/skin-chek-munjin/skin-chek-munjin.module'
import { ItemSearchPage } from '../pages/item-search/item-search';
import { SkinChekConnectPageModule } from '../pages/skin-chek-connect/skin-chek-connect.module';
import { SkinChekConnect2PageModule } from '../pages/skin-chek-connect2/skin-chek-connect2.module';
import { SkinChekCamera1PageModule } from '../pages/skin-chek-camera1/skin-chek-camera1.module';
import { SkinChekCamera2PageModule } from '../pages/skin-chek-camera2/skin-chek-camera2.module';
import { SkinChekCamera3PageModule } from '../pages/skin-chek-camera3/skin-chek-camera3.module';
import { SkinChekCamera4PageModule } from '../pages/skin-chek-camera4/skin-chek-camera4.module';
import { SkinChekCamera5PageModule } from '../pages/skin-chek-camera5/skin-chek-camera5.module';
import { SkinChekChartPageModule } from '../pages/skin-chek-chart/skin-chek-chart.module';

import { PointGuidePageModule } from '../pages/point-guide/point-guide.module';
import { SkincheckGuidePageModule } from '../pages/skincheck-guide/skincheck-guide.module';

//20200701 포인트 적립/차감 내역
import { PointLogPageModule } from '../pages/point-log/point-log.module';


//20200709 화장품 상세정보
import { ProductDetailPageModule } from '../pages/product-detail/product-detail.module'
import { ProductDetailBuyPageModule } from '../pages/product-detail-buy/product-detail-buy.module';
import { ProductSungbunPageModule } from '../pages/product-sungbun/product-sungbun.module'

import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { PoreSizePageModule } from '../pages/pore-size/pore-size.module';
import { PoreCountPageModule } from '../pages/pore-count/pore-count.module';
import { SkinCleanPageModule } from '../pages/skin-clean/skin-clean.module';
import { SkinTonePageModule } from '../pages/skin-tone/skin-tone.module';
import { SkinMunjinPageModule } from '../pages/skin-munjin/skin-munjin.module';
//20200903 성우 연습
import { SungwooSettingPageModule } from '../pages/sungwoo-setting/sungwoo-setting.module';
//20200903 성우 오더 페이지 모듈 화 선언
import { SungwooOrderPageModule } from '../pages/sungwoo-order/sungwoo-order.module';
//20200921 성우 장바구니 페이지
import { SungwooCartPageModule } from '../pages/sungwoo-cart/sungwoo-cart.module';
//20200928 성우 상품 선택 페이지
import { SungwooPickPageModule } from '../pages/sungwoo-pick/sungwoo-pick.module';
//20201012 성우 상품 정보 페이지
import { SungwooProductDetailPageModule } from '../pages/sungwoo-product-detail/sungwoo-product-detail.module';
//20201020 성우 배송 조회 페이지
import { SungwooDeliveryPageModule } from '../pages/sungwoo-delivery/sungwoo-delivery.module';
//20201028 성우 뷰티 영상 페이지
import { SungwooBeautyPageModule } from '../pages/sungwoo-beauty/sungwoo-beauty.module';
//20201030 성우 화장품 메인 페이지
import { SungwooCosmeticsMainPageModule } from '../pages/sungwoo-cosmetics-main/sungwoo-cosmetics-main.module';
//20201104 성우 화장품 모아보기 페이지
import { SungwooCosmeticsTabPageModule } from '../pages/sungwoo-cosmetics-tab/sungwoo-cosmetics-tab.module';

//20201014 상품리뷰 페이지
import { ProductReviewPageModule } from '../pages/product-review/product-review.module';
//20201016 화장품 메인 페이지
import { ProductMainPageModule } from '../pages/product-main/product-main.module';

import { Geolocation } from '@ionic-native/geolocation';

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
    MyinfoPage,
    // TabsPage,
    // HomePage,
    //SuccessHomePage,
    SkinChartPage,
    // CareZonePage,
    // CareZoneIngPage,
    CareZoneMissionIngPage,
    ChalMissionIngPage,
    CareZoneMissionDeadlinePage,
    // CareZoneMissionDeadlineEndPage,
    // CareZoneMissionStartPage,
    CareZoneMissionCompletePage,
    // PlinicManualPage,
    // QnaPage,
    // TermsPage,
    RegisterPage,
    ReRegisterPage,
    // ModifyEmailPage,
    // ModifyNumberPage,
    // ModifyPasswordPage,
    RegistercompletePage,
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
    // CommunityPage,
    CommunityModifyPage,
    CommunityWritePage,
    // MissionStartPage,
    // MissionVideoPage,
    // QnaReadPage,
    // KeyboardAttachDirective,
    PopoverPage,
    MyPage,
    SearchPage,
    AlignPopoverPage,
    MyCommunityModifyPage,
    SettingPage,
    FaqPage,
    DeviceSkinSensorIngPage,
    ChulsukCheckPage,
    ItemSearchPage,
  ],
  imports: [
    PointLogPageModule,
    HttpModule,
    HomePageModule,
    MyqnaPageModule,
    //MyinfoPageModule,
    TabsPageModule,
    AgreementPageModule,
    LoginpagePageModule,
    LoginPageModule,
    // AddinfoPageModule,
    PasswordfindPageModule,
    IdfindPageModule,
    IdfindresultPageModule,
    PasswordresetPageModule,
    PlinicManualPageModule,
    QnaPageModule,
    TermsPageModule,
    PersonalinfoPageModule,
    MarketingPageModule,
    BluetoothConnectIngPageModule,
    BluetoothDisconnectPageModule,
    //ReRegisterPageModule,
    ModifyEmailPageModule,
    ModifyNumberPageModule,
    ModifyPasswordPageModule,
    ModifyNicknamePageModule,
    QnaWritePageModule,
    QnaReadPageModule,
    // SkinChartPageModule,
    //RegisterPageModule,
    //RegistercompletePageModule,
    CareZonePageModule,
    CareZoneIngPageModule,
    // CareZoneMissionIngPageModule,
    // CareZoneMissionDeadlinePageModule,
    CareZoneMissionDeadlineEndPageModule,
    CareZoneMissionStartPageModule,
    ChalMissionStartPageModule,
    // CareZoneMissionCompletePageModule,
    NoticePageModule,
    SkinMeasureStartPageModule,
    DeviceConnectIngPageModule,
    DeviceCameraPageModule,
    DeviceConnectSkinIngPageModule,
    DeviceConnectCompletePageModule,
    DeviceConnectFailPageModule,
    DeviceSkinStartPageModule,
    DeviceSkinIngPageModule,
    // DeviceSkinSensorIngPageModule,
    BeautyTipAddPageModule,
    CommunityPageModule,
    CommunityTipPageModule,
    MovieTipPagePageModule,
    // CommunityModifyPageModule,
    // CommunityWritePageModule,
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
    RewardPageModule,
    OrderDetailPageModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    CustomIconsModule,
    CalendarModule,
    NgCalendarModule,
    GuidePageModule,
    CameraGuidePageModule,
    CameraGuideFirstPageModule,
    SkinChekPageModule,
    SkinChekMunjinPageModule,
    SkinChekConnectPageModule,
    SkinChekConnect2PageModule,
    SkinGuidePageModule,
    SkinChekCamera1PageModule,
    SkinChekCamera2PageModule,
    SkinChekCamera3PageModule,
    SkinChekCamera4PageModule,
    SkinChekCamera5PageModule,
    SkinChekChartPageModule,
    // ChulsukCheckPageModule,
    ChalGuidePageModule,
    UseGuidePageModule,
    SkinReadyPageModule,
    PointGuidePageModule,
    SkincheckGuidePageModule,
    ProductDetailPageModule,
    ProductDetailBuyPageModule,
    ProductSungbunPageModule,
    MembershipManagePageModule,
    MembershipListPageModule,
    BillCancel1PageModule,
    BillCancel2PageModule,
    BillCancel3PageModule,
    BillCancel4PageModule,
    PoreSizePageModule,
    PoreCountPageModule,
    SkinCleanPageModule,
    SkinTonePageModule,
    SkinMunjinPageModule,
    SungwooSettingPageModule,
    SungwooOrderPageModule,
    SungwooCartPageModule,
    SungwooPickPageModule,
    SungwooProductDetailPageModule,
    SungwooDeliveryPageModule,
    SungwooBeautyPageModule,
    SungwooCosmeticsMainPageModule,
    SungwooCosmeticsTabPageModule,
    ProductReviewPageModule,
    ProductMainPageModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // LoginPage,
    // LoginpagePage,
    // PasswordfindPage,
    AddinfoPage,
    // AboutPage,
    MyinfoPage,
    //    TabsPage,
    // HomePage,
    //SuccessHomePage,
    SkinChartPage,
    // CareZonePage,
    // CareZoneIngPage,
    CareZoneMissionIngPage,
    ChalMissionIngPage,
    CareZoneMissionDeadlinePage,
    // CareZoneMissionDeadlineEndPage,
    // CareZoneMissionStartPage,
    CareZoneMissionCompletePage,
    // PlinicManualPage,
    // QnaPage,
    // TermsPage,
    RegisterPage,
    ReRegisterPage,
    // ModifyEmailPage,
    // ModifyNumberPage,
    // ModifyPasswordPage,
    RegistercompletePage,
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
    // CommunityPage,
    CommunityModifyPage,
    CommunityWritePage,
    // MissionStartPage,
    // MissionVideoPage,
    // QnaReadPage,
    PopoverPage,
    MyPage,
    SearchPage,
    AlignPopoverPage,
    MyCommunityModifyPage,
    SettingPage,
    FaqPage,
    DeviceSkinSensorIngPage,
    ChulsukCheckPage,
    ItemSearchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Keyboard,
    ScreenOrientation,
    KakaoCordovaSDK,
    AuthService,
    IonicErrorHandler,
    GooglePlus,
    ImagesProvider,
    Transfer,
    Camera,
    Naver,
    // BluetoothLE,
    FCM,
    ThemeableBrowser,
    CallNumber,
    BLE,
    SocialSharing,
    Device,
    Geolocation,
    OpenNativeSettings,
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
