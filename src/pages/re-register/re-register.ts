import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController, ActionSheetController, normalizeURL, Events  } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ModifyEmailPage } from './modify-email/modify-email';
import { ModifyNumberPage } from './modify-number/modify-number';
import { ModifyPasswordPage } from './modify-password/modify-password';
import { ModifyNicknamePage } from './modify-nickname/modify-nickname';
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
  password: any;
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
  imagePath2: any;
  userimg_id: any;


  registerCredentials = { email: '', password: '', name: '', gender: '', country: '', birthday: '', skincomplaint: '', interest: '', user_jwt: 'true' };


  constructor(private imagesProvider: ImagesProvider, private actionSheetCtrl: ActionSheetController, private _camera: Camera, public nav: NavController, public navParams: NavParams, public auth: AuthService, private alertCtrl: AlertController,
    private platform: Platform, public viewCtrl: ViewController , private events: Events) {
    this.platform.ready().then(() => {
      //this.loadItems();
    });
  }

  ionViewWillEnter() {
    if(this.platform.is('ios')){
      this.loadItems();
    }
    if(this.platform.is('android')){
      this.loadimagePath();
      this.loadItems();
    }

  }

  ionViewDidEnter() {
    // this.loadimagePath();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReRegisterPage');
  }


  public loadimagePath() {
    this.auth.getUserStorageimagePath().then(items => {
      this.imagePath2 = items;

      // this.showPopup("this.imagePath3================" , items);
    });
  }

  public dissmiss() {
    this.viewCtrl.dismiss({
      imagePath: this.imagePath2
    }
    );
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
          id: data._id,
          email: data.email,
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
    this.events.subscribe('custom-user-events', (paramsVar) => {
        // Do stuff with "paramsVar"
        this.events.unsubscribe('custom-user-events'); // unsubscribe this event
        this.password = paramsVar;
        console.log("password=============="+ this.password);
    })
    this.nav.push(ModifyPasswordPage);
  }

  public modify_nickname() {
    this.events.subscribe('custom-user-events', (paramsVar) => {
        // Do stuff with "paramsVar"
        this.events.unsubscribe('custom-user-events'); // unsubscribe this event
        this.nickname = paramsVar;
        console.log("nickname=============="+ this.nickname);
    })
    this.nav.push(ModifyNicknamePage);
  }


  //20190619 회원정보 수정 카메라 모듈 추가
  public camera() {
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
      if (this.platform.is('ios')) {
        this.imagePath = imagePath;
        this.imagePath = normalizeURL(this.imagePath);
        this.imagePath2 = normalizeURL(this.imagePath);

        this.imagesProvider.user_udateImage(this.imagePath, this.userImgData).then(res => {
          this.viewCtrl.dismiss({ reload: true });
          // this.loading.dismiss();
        }, err => {
          // this.dismiss();
          this.showPopup("이미지 업로드", "이미지 업로드에 실패 하였습니다.");
        });
      } else {
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
      this.imagePath = this.imagePath;
      this.imagePath2 = this.imagePath;
      this.auth.setUserStorageimagePath(this.imagePath2);
    }
    }, (err) => {
      console.log('Error: ', err);
    });
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
