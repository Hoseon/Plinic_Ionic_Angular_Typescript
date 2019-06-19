import { IonicPage } from 'ionic-angular';
import { Component} from '@angular/core';
import { NavController, AlertController, Platform, ActionSheetController, ModalController, normalizeURL } from 'ionic-angular';
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

  constructor(private _camera: Camera, private imagesProvider: ImagesProvider, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController,
    private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,
  public platform: Platform) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad registerpage');
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
     this.signupform = new FormGroup({
       password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
       passwordconfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
       email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
     });
  }

  public onChange(value){
    this.country = JSON.parse(value);
    console.log(value)
}

  public camera(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this._camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this._camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
    //
    // let alert = this.alertCtrl.create({
    //   cssClass: 'push_alert',
    //   title: "카메라 모듈 준비중",
    //   message: "카메라 적용중입니다.",
    //   buttons: [{
    //     text: '확인'
    //   }]
    // });
    // alert.present();
  }

    public anddinfo(){
      if(this.userData.password===this.userData.passwordconfirm){
      this.nav.push(AddinfoPage,{
        email: this.userData.email,
        password: this.userData.password,
        imagePath: this.imagePath2
      });
    }
    else{
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

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this._camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this._camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
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
      quality: 20,
      destinationType: this._camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,

    };

    // Get the data of an image
    this._camera.getPicture(options).then((imagePath) => {
      if(this.platform.is('ios')){
        this.imagePath = imagePath;
        this.imagePath = normalizeURL(this.imagePath);
        this.imagePath2 = normalizeURL(this.imagePath);
      }else {
        this.imagePath2 = "data:image/jpeg;base64," + imagePath;
      }
      //this.photoSrc = 'data:image/jpg;base64,' + imagePath;
      //this.cameraPhoto = this._DomSanitizer.bypassSecurityTrustUrl(this.photoSrc)
      // let modal = this.modalCtrl.create('UploadModalPage', { data: this.imagePath });
      // modal.present();
      // modal.onDidDismiss(data => {
      //   if (data && data.reload) {
      //     this.reloadImages();
      //   }
      // });
    }, (err) => {
      console.log('Error: ', err);
    });

  }

}
