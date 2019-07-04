import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';

/**
 * Generated class for the MissionVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mission-video',
  templateUrl: 'mission-video.html',
})
export class MissionVideoPage {

  // @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public toastCtrl: ToastController) {

    this.platform.ready().then((readySource)=>{
      for(let i=2; i>0; i--){
        setTimeout(()=>{
          if(this.platform.is('android')){
           const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_android',
            message: i+'초 후 미션이 시작됩니다.',
            duration: 2000,
            position: 'bottom',
            showCloseButton: true
          });
          toast.present();
        }
        else{
          const toast = this.toastCtrl.create({
           cssClass: 'blu_toast_ios',
           message: i+'초 후 미션이 시작됩니다.',
           duration: 2000,
           position: 'bottom',
           showCloseButton: true
         });
         toast.present();
        }
    }, 2000);
    //this.delay(1000)
   continue;
  }

    });
  }

      ionViewDidEnter() {
}

//   delay(ms) {
//   return new Promise(resolve => setTimeout(() => {}, ms));
// }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionVideoPage');
    // let dimensions = this.content.getContentDimensions();
    // this.content.scrollTo(0, dimensions.scrollHeight+100, 100);
  }

}
