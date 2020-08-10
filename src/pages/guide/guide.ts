import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, ViewController, ModalController  } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing'



/**
 * Generated class for the GuidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html',
})
export class GuidePage {

  mode: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    ) {
  }

  ionViewDidLoad() {
    if(this.navParams.get('mode')) {
      this.mode = this.navParams.get('mode');
    }
    console.log('ionViewDidLoad GuidePage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter GuidePage');
  }

  public measureBack() {
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  start() {
    let myModal = this.modalCtrl.create(DeviceConnectIngPage, {mode : this.mode});
    myModal.onDidDismiss(data => {
      let tabs = document.querySelectorAll('.tabbar');
      if (tabs !== null) {
        Object.keys(tabs).map((key) => {
          // tabs[ key ].style.transform = 'translateY(0)';
          tabs[key].style.display = 'block';
          tabs[key].style.display = '';
        });
      }
    })
    myModal.present();
  }

}
