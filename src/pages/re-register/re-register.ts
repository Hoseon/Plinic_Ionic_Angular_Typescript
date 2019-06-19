import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController, ActionSheetController, normalizeURL } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ModifyEmailPage } from './modify-email/modify-email';
import { ModifyNumberPage } from './modify-number/modify-number';
import { ModifyPasswordPage } from './modify-password/modify-password';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageLoader } from 'ionic-image-loader';
import { ImagesProvider } from './../../providers/images/images';





/**
 * Generated class for the ReRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-re-register',
  templateUrl: 're-register.html',
})
export class ReRegisterPage {

  createSuccess = false;
  userData: any;
  userImgData: any;
  accessToken: string;
  id: string;
  age_range: string;
  birthday: string;
  email: string;
  gender: string;
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
  jwtHelper: JwtHelper = new JwtHelper();
  thumb_image: any;

  images: any = [];
  photoSrc: any;
  cameraPhoto: any;
  imagePath: any;
  imagePath2 : any;
  userimg_id: any;


  registerCredentials = { email: '', password: '', name: '', gender: '', country: '', birthday: '', skincomplaint: '', interest: '', user_jwt: 'true' };


  constructor(private imagesProvider: ImagesProvider, private actionSheetCtrl: ActionSheetController, private _camera: Camera, public nav: NavController, public navParams: NavParams, public auth: AuthService, private alertCtrl: AlertController,
    private platform: Platform, public viewCtrl: ViewController) {
    this.platform.ready().then(() => {
      //this.loadItems();
    });
  }

  ionViewWillEnter() {
    this.loadItems();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReRegisterPage');
  }


  public dissmiss() {
    this.viewCtrl.dismiss();
  }


  public loadItems() {
    this.auth.getUserStorage().then(items => {

      if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver') {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: items.birthday,
          email: items.email,
          gender: items.gender,
          nickname: items.nickname,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
        }


      } else {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: items.birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: items.gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
        };

      }
      this.imagesProvider.getuser_updateImage(this.userData.email).subscribe(data => {
        console.log("imageupload Data :  " + data._id);
        this.userimg_id = data._id;
        this.userImgData = {
          id : data._id,
          email : data.email,
        }
        console.log(this.userImgData);
      })
    });
  }


  public modify_email() {

    this.nav.push(ModifyEmailPage);
  }

  public modify_number() {

    this.nav.push(ModifyNumberPage);
  }

  public modify_password() {

    this.nav.push(ModifyPasswordPage);
  }
  //20190619 회원정보 수정 카메라 모듈 추가
  public camera() {

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
      this.imagePath = imagePath;
      this.imagePath = normalizeURL(this.imagePath);
      this.imagePath2 = normalizeURL(this.imagePath);

      this.imagesProvider.user_udateImage(this.imagePath, this.userImgData).then(res => {
        this.viewCtrl.dismiss({reload: true});
        // this.loading.dismiss();
      }, err => {
        // this.dismiss();
        this.showPopup("이미지 업로드", "이미지 업로드에 실패 하였습니다.");
      });


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

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success !== '') {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error._body);
      });
  }



  public isReadonly() {
    return this.isReadonly;   //return true/false
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

}
