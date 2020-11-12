import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Loading, LoadingController } from 'ionic-angular';
import {LoginpagePage} from '../loginpage/loginpage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../providers/auth-service';

/**
 * Generated class for the PasswordfindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordfind',
  templateUrl: 'passwordfind.html',
})
export class PasswordfindPage {
  public country: any;
  signupform: FormGroup;
  userData = { "password": "", "passwordconfirm": "", "temp": "", "name" : "", "email" : "" , "birthday" : ""};
  myImage: any;
  myImage2: any;
  myImage3: any;
  loading: Loading;

  constructor(
      public nav: NavController, 
      public navParams: NavParams,
      private auth : AuthService,
      public alertCtrl : AlertController,
      public viewCtrl: ViewController,
      public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad PasswordfindPage');
    if(this.navParams.get('credentials')) {
      this.userData.email = this.navParams.get('credentials').email;
      this.userData.name = this.navParams.get('credentials').name;
      this.userData.birthday = this.navParams.get('credentials').birthday;
    }
  }

  public navpop(){
    this.nav.setRoot(LoginpagePage);
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let PASSWORDPATTERN = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    this.signupform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(PASSWORDPATTERN)]),
      passwordconfirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(PASSWORDPATTERN)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    });
  }

  public email_delete(){
    return this.userData.temp="";
  }

  public password_delete(){
    return this.userData.password="";
  }

  public passwordconfirm_delete(){
    ('passwordconfirm_delete');
    return this.userData.passwordconfirm="";
  }

  changeImage(image){
      if(image){
        return this.myImage = "assets/img/register/ic-system-clear-grey@3x.png"
      } else{
        return this.myImage = "assets/img/register/ic-system-clear-red@3x.png"
      }
  }

  changeImage2(image){
      if(image){
        return this.myImage2 = "assets/img/register/ic-system-clear-grey@3x.png"
      } else{
        return this.myImage2 = "assets/img/register/ic-system-clear-red@3x.png"
      }
  }
  changeImage3(image){
      if(image){
        return this.myImage3 = "assets/img/register/ic-system-clear-grey@3x.png"
      } else{
        return this.myImage3 = "assets/img/register/ic-system-clear-red@3x.png"
      }
  }

  public onChange(value){
    this.country = JSON.parse(value);
  }

  public addinfo() {
    this.showLoading();
    this.auth.passwordChange(this.userData).subscribe(data=> {
      if(data) {
        this.loading.dismiss();
        this.showSuccessAlert("", JSON.stringify(data.msg).replace('"', '').replace('"', ''));
      }
    }, error=> {
      this.loading.dismiss();;
      this.showErrorAlert("", JSON.stringify(error.msg).replace('"', '').replace('"', ''));
    })
  }

  showSuccessAlert(title, msg) {
    let alert2 = this.alertCtrl.create({
      cssClass: 'push_alert',
      // title: title,
      message: msg,
      buttons: [
        {
          text: '로그인 페이지가기',
          handler: () => {
            this.nav.setRoot(LoginpagePage);
          }
        }
      ]
    });
    alert2.present();
  }

  showErrorAlert(title, msg){
    let alert2 = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: msg,
      buttons: [
        {
          text: '확인',
          handler: () => {
            // this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert2.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '잠시만 기다려주세요'
    });
    this.loading.present();
  }


}
