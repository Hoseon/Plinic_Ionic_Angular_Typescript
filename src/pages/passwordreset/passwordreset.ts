import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ModalController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { IdfindresultPage } from '../idfindresult/idfindresult';
import { PasswordfindPage } from '../login/passwordfind/passwordfind';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  myImage : any;
  registerCredentials = {
    email: "",
    name: "",
    // birthday: "",
  };
  signupform: FormGroup;
  issendEmail: boolean = false;
  loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private auth: AuthService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdfindPage');
  }

  ionViewDidEnter(){
   
  }

  ionViewWillEnter(){
   
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let PASSWORDPATTERN = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    this.signupform = new FormGroup({
      // password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(PASSWORDPATTERN)]),
      // passwordconfirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(PASSWORDPATTERN)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    });
  }

  changeImage(image){
    if(image){
      return this.myImage = "assets/img/register/ic-system-clear-grey@3x.png"
    } else{
      return this.myImage = "assets/img/register/ic-system-clear-red@3x.png"
    }
}


  close() {
    this.viewCtrl.dismiss();
  }

  // birthday() {
  //   console.log(this.registerCredentials.birthday);
  // }

  public goPassword() {
    this.navCtrl.push(PasswordfindPage, {credentials : this.registerCredentials}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("아이디 찾기 결과 페이지 담힘");
      });
    });
  }

  public validCheck() {
    this.showLoading();
    this.auth.passwordReset(this.registerCredentials).subscribe(data => {
      if(data) {
        this.loading.dismiss();
        this.showSuccessAlert("임시 비번 발송", JSON.stringify(data.msg).replace('"', '').replace('"', ''));
        this.issendEmail = true;
      }
    },error => {
      this.loading.dismiss();
      this.showErrorAlert("오류", "사용자 정보를 찾지 못했습니다");
    })
  }

  showSuccessAlert(title, msg) {
    let alert2 = this.alertCtrl.create({
      cssClass: 'push_alert',
      // title: title,
      message: msg,
      buttons: [
        {
          text: '확인',
          handler: () => {
            // this.viewCtrl.dismiss();
            this.issendEmail = true;
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
            this.viewCtrl.dismiss();
            this.issendEmail = false;
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
