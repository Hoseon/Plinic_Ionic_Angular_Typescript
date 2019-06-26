import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
//import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

/**
 * Generated class for the CommunityModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-modify',
  templateUrl: 'community-modify.html',
})
export class CommunityModifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {

      this.platform.ready().then(() => {








        // if(this.platform.is('android')){
        // const bannerConfig: AdMobFreeBannerConfig = {
        //   // id: 'ca-app-pub-7820559752345148/7081946422',  //real id
        //   id: 'ca-app-pub-3940256099942544/6300978111',   //test id
        //  isTesting: true,
        //  autoShow: true
        // };
        // this.admobFree.banner.config(bannerConfig);
        //
        // this.admobFree.banner.prepare()
        //   .then(() => {
        //     // banner Ad is ready
        //     // if we set autoShow to false, then we will need to call the show method here
        //   })
        //   .catch(e => console.log(e));
        // }
    });
  //  this.admobFree.banner.show();

    // this.platform.registerBackButtonAction(() => {
    //   let nav = app._appRoot._getActivePortal() || app.getActiveNav();
    //   let activeView = nav.getActive();
    //      this.admobFree.banner.hide();
    //   if (activeView != null) {
    //     if (this.nav.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
    //       this.nav.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
    //     }
    //     else if (activeView.isOverlay) {
    //       activeView.dismiss();
    //     }
    //     else {
    //       // backgroundMode.moveToBackground();
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
    // });
  }

  ionViewWillEnter() {
  //  this.admobFree.banner.hide();
  }

  ionViewDidEnter() {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityModifyPage');



  }
}
