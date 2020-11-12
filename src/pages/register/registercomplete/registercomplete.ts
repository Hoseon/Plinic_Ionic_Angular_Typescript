import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, IonicApp } from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';


/**
 * Generated class for the RegistercompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registercomplete',
  templateUrl: 'registercomplete.html',
})
export class RegistercompletePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public ionicApp: IonicApp) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistercompletePage');
}


  public completeclose(){
    // this.viewCtrl.dismiss().then(_ => {
    //      this.dismissAllModal();
    //  })
    console.log("completeclosecompleteclosecompleteclose");
    this.navCtrl.setRoot(TabsPage);

  }

  public dismissAllModal () {
          let activeModal = this.ionicApp._modalPortal.getActive();
          if (activeModal) {
              activeModal.dismiss().then(() => {
                  this.dismissAllModal()
              });
          }
      }

}
