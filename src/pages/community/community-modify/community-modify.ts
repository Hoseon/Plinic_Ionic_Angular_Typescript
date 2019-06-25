import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
// import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    // private admobFree: AdMobFree,
    public platform: Platform) {

      this.platform.ready().then(() => {
        // const bannerConfig: AdMobFreeBannerConfig = {
        //   id: 'ca-app-pub-7820559752345148/7081946422',  //real id
        //   // id: 'ca-app-pub-3940256099942544/6300978111',   //test id
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
    });
    // this.admobFree.banner.show();
  }


  ionViewDidEnter() {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityModifyPage');



  }
}
