import { Component,Input, ViewChild, Inject,ElementRef  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ViewController } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
import { AgreementPage} from '../../agreement/agreement';
import { PasswordfindPage} from '../passwordfind/passwordfind';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Naver} from 'ionic-plugin-naver';

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

   @ViewChild("messageInput") public messageInput: ElementRef;
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  userData: any;
  signupform: FormGroup;


  constructor(public nav: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController, public naver: Naver,
     private auth: AuthService, public viewCtrl: ViewController, @Inject(DOCUMENT) document) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpagePage');
  }

  ngOnInit() {
     let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
     this.signupform = new FormGroup({
       password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
       passwordconfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
       email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
     });
  }

  public setInputFocus(){
      var elem:any = this.messageInput;
      elem._native.nativeElement.focus(); // Keep the focus on input field.

  }

//   public hide(){
//     console.log('hide');
//     document.getElementById("hide").style.display = "none";
// }
//
//   public view(){
//       console.log('visible');
//     document.getElementById("hide").style.display = "";
// }



  public agreepage(){
     this.nav.push(AgreementPage);
  }
  public passwordfind(){
     this.nav.push(PasswordfindPage);
  }
  public dissmiss(){
    this.viewCtrl.dismiss();
  }

  public naver_login(){
       this.naver.login()
         .then(response => console.log(response))
         .catch(error => console.error(error));
  }

  public kakao_login() {
    this.showLoading()
    this.userData = this.auth.kakao_login();
    this.loading.dismiss();
  }


  public google_login(){
    this.showLoading()
    this.auth.google_login();
    this.loading.dismiss();
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
