import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, AlertController, App } from 'ionic-angular';


/**
 * Generated class for the CommunityWritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-write',
  templateUrl: 'community-write.html',
})
export class CommunityWritePage {

  tags = [];


  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform,  public viewCtrl: ViewController, private alertCtrl: AlertController, public app: App) {

    this.platform.ready().then((readySource) => {

    this.platform.registerBackButtonAction(() => {
      let nav = app._appRoot._getActivePortal() || app.getActiveNav();
      let activeView = nav.getActive();

      if (activeView != null) {
        if (this.nav.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
          this.nav.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
        }
        else if (activeView.isOverlay) {
          activeView.dismiss();
        }
        else {
          //backgroundMode.moveToBackground();
          // let alert = this.alertCtrl.create({
          //   cssClass: 'push_alert_cancel',
          //   title: "plinic",
          //   message: "글쓰기 작성을 취소하시겠습니까?",
          //   buttons: [
          //     {
          //       text: '취소',
          //       role: 'cancel',
          //       handler: () => {
          //         console.log('취소');
          //       }
          //     },
          //     {
          //       text: '확인',
          //       handler: () => {
          //         console.log('확인'),
          //           this.viewCtrl.dismiss();
          //       }
          //     }]
          // });
          // alert.present();
        }
      }
    });
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityWritePage');
  }

  attache_image_hide() {
    document.getElementById("attache_image").style.display = "none";
  }

  attache_image_view(){
    document.getElementById("attache_image").style.display = "";
  }

  public dissmiss() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "plinic",
      message: "글쓰기 작성을 취소하시겠습니까?",
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            console.log('취소');
          }
        },
        {
          text: '확인',
          handler: () => {
            console.log('확인'),
              this.viewCtrl.dismiss();
          }
        }]
    });
    alert.present();
  }

  onChange(val){
    console.log(val);
  }


}
