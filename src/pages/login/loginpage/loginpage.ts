import { Component,Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ViewController } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
import {ScrollingHeaderModule} from 'ionic-scrolling-header';



/**
 * Generated class for the LoginpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginpagePage {


  @Input('yourDirective') content: Content;
  loading: Loading;
  registerCredentials = { email: '', password: '' };


  constructor(public nav: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
     private auth: AuthService, public viewCtrl: ViewController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpagePage');
  }


  public dissmiss(){
    this.viewCtrl.dismiss();
  }


  public onSubmit() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(data => {
      if (data !== '') {
        this.loading.dismiss();
        this.nav.setRoot('TabsPage')
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error._body);
      });
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
