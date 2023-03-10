import { IonicPage } from 'ionic-angular';
import { Component} from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ActionSheetController, ModalController, normalizeURL, ViewController, Loading, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from './../../providers/images/images';
import {AgreementPage } from '../agreement/agreement';
import {AddinfoPage} from '../register/addinfo/addinfo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageLoader } from 'ionic-image-loader';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  createSuccess = false;
  public country: any;
  signupform: FormGroup;
  myImage: any;
  myImage2: any;
  myImage3: any;
  userData = { "password": "", "passwordconfirm": "", "email": ""};

  images: any = [];
  photoSrc: any;
  cameraPhoto: any;
  imagePath: any;
  imagePath2 : any;
  unregisterBackButtonAction: Function;
  loading : Loading;
  isPush: boolean;

  constructor(
      private _camera: Camera, 
      private imagesProvider: ImagesProvider, 
      private actionSheetCtrl: ActionSheetController, 
      private modalCtrl: ModalController,
      private nav: NavController, 
      private auth: AuthService, 
      private alertCtrl: AlertController, 
      public platform: Platform, 
      public viewCtrl: ViewController,
      public loadingCtrl: LoadingController,
      public navParams: NavParams,
    ) {


    this.platform.ready().then((readySource) => {

    });

  }

  public dissmiss() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "plinic",
      message: "회원가입을 취소하시겠습니까?",
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

  ionViewWillEnter(){
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            this.dissmiss();
        }, 99999);
  }

  ionViewWillLeave(){
    this.unregisterBackButtonAction();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad registerpage');
    if(this.navParams.get('ispush')) {
      this.isPush = this.navParams.get('ispush');
    }
  }



  public email_delete(){
      console.log('email_delete');
   return this.userData.email="";
  }
  public password_delete(){
      console.log('password_delete');
    return this.userData.password="";
  }
  public passwordconfirm_delete(){
      console.log('passwordconfirm_delete');
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


  ngOnInit() {
     let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
     let PASSWORDPATTERN = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
     this.signupform = new FormGroup({
       password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(PASSWORDPATTERN)]),
       passwordconfirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(PASSWORDPATTERN)]),
       email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
     });
  }

  public onChange(value){
    this.country = JSON.parse(value);
    console.log(value)
}

  public anddinfo(){
    this.showLoading();
    if(this.userData.password===this.userData.passwordconfirm){
    this.auth.checkUser(this.userData).subscribe(data => {
      this.loading.dismiss();
      this.nav.push(AddinfoPage,{
        email: this.userData.email,
        password: this.userData.password,
        imagePath: this.imagePath2,
        ispush: this.isPush
      });
    }, error => {
      // console.log(JSON.stringify(error._body.msg));
      this.loading.dismiss();
      this.showAlert("아이디 오류", "이미 가입되어 있는 아이디 입니다.");
      // this.showAlert("아이디 오류", JSON.stringify(error.msg).replace('"', '').replace('"', ''))
    }) 
  } else{
      let alert = this.alertCtrl.create({
        cssClass: 'push_alert',
        title: "비밀번호 불일치",
        message: "패스워드를 확인해주세요.",
        buttons: [{
          text: '확인'
        }]
      });
      alert.present();
      console.log("비밀번호 불일치");
  }
}



  public navpop(){
    this.nav.popTo(AgreementPage);
  }


  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      message: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }


  public camera(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '이미지 선택방법',
      buttons: [
        {
          text: '앨범에서 가져오기',
          handler: () => {
            this.takePicture(this._camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '카메라 촬영하기',
          handler: () => {
            this.takePicture(this._camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '취소',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  reloadImages() {
    this.imagesProvider.getImages().subscribe(data => {
      this.images = data;
    });
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this._camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      // saveToPhotoAlbum: true,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      targetWidth: 500,
      targetHeight: 500
    };

    // Get the data of an image
    this._camera.getPicture(options).then((imagePath) => {
      if(this.platform.is('ios')){
        this.imagePath = imagePath;
        this.imagePath = normalizeURL(this.imagePath);
        this.imagePath2 = normalizeURL(this.imagePath);
      }
      else{
        // if (imagePath == null) {
        //       alert("선택된 사진이 없습니다.");
        //       return false;
        //   }
        //   // 안드로이드는 파일이름 뒤에 ?123234234 형식의 내용이 붙어 오는 경우가 있으므로,
        //   // 이 경우 ? 이하 내용을 잘라버린다.
        //   var p = imagePath.toLowerCase().lastIndexOf('?');
        //   if (p > -1) {
        //       imagePath = imagePath.substring(0, p);
        //   }
        //   // 안드로이드는 확장자가 없는 경우가 있으므로, 이 경우 확장자를 강제로 추가한다.
        //   if (imagePath.toLowerCase().lastIndexOf('.') < 0) {
        //       imagePath += '.jpg';
        //   }
      this.imagePath = imagePath;
    //  this.imagePath = "data:image/jpeg;base64," + this.imagePath;
      this.imagePath =  this.imagePath;
      this.imagePath2 = this.imagePath;
      //this.auth.setUserStorageimagePath(this.imagePath2);
    }
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  dataURItoBlob(dataURI) {
// codej adapted from:
//  http://stackoverflow.com/questions/33486352/
//cant-upload-image-to-aws-s3-from-ionic-camera
  let binary = atob(dataURI.split(',')[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
};

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: message,
      buttons: [{
        text: '확인',
        handler: () => {
        }
      }]
    });
      alert.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '잠시만 기다려주세요'
    });
    this.loading.present();
  }

}
