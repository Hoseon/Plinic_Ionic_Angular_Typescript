import { Component, Input, ViewChild, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ViewController, Platform, ModalController } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
import { AgreementPage } from '../../agreement/agreement';
import { PasswordfindPage } from '../passwordfind/passwordfind';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Naver } from 'ionic-plugin-naver';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
// import { AnimationService, AnimationBuilder } from 'css-animator';
import { IdfindPage } from '../../idfind/idfind';
import { PasswordresetPage } from '../../passwordreset/passwordreset';
import { AddinfoPage } from '../../register/addinfo/addinfo';


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
  animations: [
    trigger('myvisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('* => *', animate('.20s'))
    ]),
    trigger('fadeInOut', [
      transition(':enter', [ // "void => *"
        style({ opacity: 0 }),
        group([
          animate('0s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(-100%, 0 ,0)', offset: 0 }),
            // style({ opacity: 0.5, transform: 'translate3d(20%, 0 ,0)', offset: 0.5 }),
            style({ opacity: 1, transform: 'translate3d(0, 0 ,0)', offset: 1 })
          ])),
          animate('1s .5s ease', style({
            color: '#ff0000'
          })
        )
        ])
      ]),
      transition(':leave', [ // "* => void"
        animate('0s ease-out', keyframes([
          style({ opacity: 1, transform: 'translate3d(0, 0 ,0)', offset: 0 }),
          // style({ opacity: 0.5, transform: 'translate3d(-20%, 0 ,0)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translate3d(100%, 0 ,0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class LoginpagePage {
  @ViewChild("messageInput") public messageInput: ElementRef;
  // private animator: AnimationBuilder;
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  userData: any;
  signupform: FormGroup;
  show: boolean = true;
  visibleState = 'visible';
  startTime = null;
  endTime = null;
  myImage: any;
  myImage2 : any;
  isReview: boolean = false;

  @ViewChild('myElement') myElem;
  constructor(
    public nav: NavController, 
    public navParams: NavParams,
    // animationService: AnimationService,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    public naver: Naver ,
    public platform: Platform,
    private auth: AuthService, 
    public viewCtrl: ViewController, 
    @Inject(DOCUMENT) document,
    public modalCtrl: ModalController,
  ) {
      // this.animator = animationService.builder();
  }


  ionViewDidLoad() {
    console.log('ionViewCanEnter Loginpage');
    this.auth.isReview().subscribe(async result =>{
      var data = await result;
      this.isReview = data.isReview;
    })
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      passwordconfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(EMAILPATTERN)])
    });
  }


  public email_delete(){
      console.log('email_delete');
   return this.registerCredentials.email="";
  }
  public password_delete(){
      console.log('password_delete');
    return this.registerCredentials.password="";
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

  public setInputFocus() {
    var elem: any = this.messageInput;
    elem._native.nativeElement.focus(); // Keep the focus on input field.
  }

    public hide(){
        console.log('hide');
        document.getElementById("hide").style.display = "none";
  }

    public view(){
        console.log('visible');
      document.getElementById("hide").style.display = "";
  }



  public agreepage() {
    this.viewCtrl.dismiss();
    this.nav.push(AgreementPage);
  }
  public idFind() {
    let modal = this.modalCtrl.create(IdfindPage);
    modal.onDidDismiss(data => {
      console.log("아이디 찾기 페이지 닫힘");
    });
    modal.present();
  }
  public passwordreset() {
    let modal = this.modalCtrl.create(PasswordresetPage);
    modal.onDidDismiss(data => {
      console.log("패스워드 찾기 페이지 닫힘");
    });
    modal.present();
  }

  public passwordfind() {
    let modal = this.modalCtrl.create(PasswordfindPage);
    modal.onDidDismiss(data => {
      console.log("패스워드 찾기 페이지 닫힘");
    });
    modal.present();
  }

  public dissmiss() {
    this.viewCtrl.dismiss();
  }

  public naver_login() {
    this.auth.naver_promise().then(snsUserdata=>{
      console.log("리졸브 결과는? : " +JSON.stringify(snsUserdata));
      if(snsUserdata) {
        const modal = this.modalCtrl.create(AddinfoPage, {snsUserdata : snsUserdata});
        modal.present();
      }
    }).catch(reject => {
      console.log("네이버 로그인 실패" + reject);
    })

    // this.naver.login()
    //   .then(
    //     response => console.log(response)
    //   )
    //   .catch(
    //     error => console.error(error)
    //   );
    //   this.viewCtrl.dismiss()
  }

  public kakao_login() {
    // this.viewCtrl.dismiss();
    // this.showLoading()
    // this.userData = this.auth.kakao_login();
    // this.loading.dismiss();
    this.auth.kakao_login_promise().then(snsUserdata=>{
      console.log("리졸브 결과는? : " +JSON.stringify(snsUserdata));
      if(snsUserdata) {
        const modal = this.modalCtrl.create(AddinfoPage, {snsUserdata : snsUserdata});
        modal.present();
      }
    }).catch(reject => {
      console.log("카카오 로그인 실패" + reject);
    })
  }

  public apple_login() {

    this.auth.apple_login_promise().then(snsUserdata=>{
      console.log("애플 리졸브 결과는? : " +JSON.stringify(snsUserdata));
      if(snsUserdata) {
        const modal = this.modalCtrl.create(AddinfoPage, {snsUserdata : snsUserdata});
        modal.present();
      }
    }).catch(reject => {
      console.log("애플 로그인 실패" + reject);
    });
    
    // cordova.plugins.SignInWithApple.signin(
    //   { requestedScopes: [0, 1] },
    //   function(succ){
    //     console.log(succ)
    //     alert(JSON.stringify(succ))
    //   },
    //   function(err){
    //     console.error(err)
    //     console.log(JSON.stringify(err))
    //   }
    // )
  }


  public google_login() {
    // this.viewCtrl.dismiss();
    // this.showLoading()
    // this.auth.google_login();
    // this.loading.dismiss();
    this.auth.google_login_promise().then(snsUserdata=>{
      console.log("리졸브 결과는? : " +JSON.stringify(snsUserdata));
      if(snsUserdata) {
        const modal = this.modalCtrl.create(AddinfoPage, {snsUserdata : snsUserdata});
        modal.present();
      }
    }).catch(reject => {
      console.log("구글 로그인 실패" + reject);
    })
  }


  public onSubmit() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(data => {
      if (data !== '') {
        this.loading.dismiss();
        // this.nav.setRoot('TabsPage')
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(JSON.parse(error._body).msg);
        // this.showError(error._body);
      });
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '잠시만 기다려주세요'
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
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

  animateElem() {
    // this.animator.setType('flipInX').show(this.myElem.nativeElement);
  }

  toggleVisible() {
    this.show = !this.show;
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
  }

  animationStarted(ev) {
    this.startTime = new Date();
  }

  animationFinished(ev) {
    this.endTime = new Date();
  }


}
