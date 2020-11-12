import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController, ActionSheetController, normalizeURL, Events, Loading, LoadingController, } from 'ionic-angular';
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

  loading: Loading;
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
  profileimg_url: any;

  checked: boolean = true;
  skincomplaint: any;

  registerCredentials = { email: '', password: '', name: '', gender: '', country: '', birthday: '', skincomplaint: '', interest: '', user_jwt: 'true' };


  constructor(private imagesProvider: ImagesProvider, private actionSheetCtrl: ActionSheetController, private _camera: Camera, public nav: NavController, public navParams: NavParams, public auth: AuthService, private alertCtrl: AlertController,
    private platform: Platform, public viewCtrl: ViewController, private events: Events, private loadingCtrl: LoadingController) {
    this.platform.ready().then(() => {
      if (this.navParams.get('userData')) {
        this.userData = this.navParams.get('userData');
        this.skincomplaint = this.userData.skincomplaint;
        this.authGetUserImage(this.userData.email);
        this.imageGetUserUpdateImage(this.userData.email);
      } else {
        this.loadItems();
      }
    });
  }

  ionViewWillEnter() {
    if (this.platform.is('ios')) {
      // this.loadItems();
    }
    if (this.platform.is('android')) {
      this.loadimagePath();
      // this.loadItems();
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
      // this.imagePath2 = items;

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
          from: items.from,
          snsid: items.snsid
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
          birthday: this.jwtHelper.decodeToken(items).birthday,
          gender: this.jwtHelper.decodeToken(items).gender,
          skincomplaint: this.jwtHelper.decodeToken(items).skincomplaint,
          email: this.jwtHelper.decodeToken(items).email,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: 'plinic'
        };
        this.skincomplaint = this.userData.skincomplaint;
        this.authGetUserImage(this.userData.email);
      }
      this.imageGetUserUpdateImage(this.userData.email);
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
      console.log("password==============" + this.password);
    })
    this.nav.push(ModifyPasswordPage);
  }

  public modify_nickname() {
    this.events.subscribe('custom-user-events', (paramsVar) => {
      // Do stuff with "paramsVar"
      this.events.unsubscribe('custom-user-events'); // unsubscribe this event
      this.nickname = paramsVar;
      console.log("nickname==============" + this.nickname);
    })
    this.nav.push(ModifyNicknamePage, {"userData" : this.userData}).then(()=>{
      this.nav.getActive().onDidDismiss(data =>{
        // this.auth.getUserStorage().then(data2 => {
        //     console.log("데이터2 " + JSON.stringify(data2))
        //     this.userData = {
        //       email : data2.email,
        //       nickname : data2.nickname,
        //       from: data2.from
        //     }
        // });
      })
    });
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
      if (this.platform.is('ios')) {          //아이폰
        this.imagePath = imagePath;
        this.imagePath = normalizeURL(this.imagePath);
        this.imagePath2 = normalizeURL(this.imagePath);
        if (!this.profileimg_url) {
          this.showLoading();
          this.imagesProvider.myuser_UploadImage(this.imagePath, this.userData.email).then(res => {
            this.loading.dismiss();
            this.viewCtrl.dismiss({ reload: true });
            // this.loading.dismiss();
          }, err => {
            this.loading.dismiss();
            // this.dismiss();
            this.showPopup("이미지 업로드", "이미지 업로드에 실패 하였습니다.");
          });
        } else {            //안드로이드
          this.showLoading();
          this.imagesProvider.user_udateImage(this.imagePath, this.userImgData).then(res => {
            this.loading.dismiss();
            this.viewCtrl.dismiss({ reload: true });
            // this.loading.dismiss();
          }, err => {
            this.loading.dismiss();
            // this.dismiss();
            this.showPopup("이미지 업로드", "이미지 업로드에 실패 하였습니다.");
          });
        }

      } else {
        this.imagePath = imagePath;
        this.imagePath = this.imagePath;
        this.imagePath2 = this.imagePath;
        if (!this.profileimg_url) {
          this.showLoading();
          this.imagesProvider.myuser_UploadImage(this.imagePath, this.userData.email).then(res => {
            this.loading.dismiss();
            this.viewCtrl.dismiss({ reload: true });
            // this.loading.dismiss();
          }, err => {
            this.loading.dismiss();
            // this.dismiss();
            this.showPopup("이미지 업로드", "이미지 업로드에 실패 하였습니다.");
          });
        } else {
          this.showLoading();
          this.imagesProvider.user_udateImage(this.imagePath, this.userImgData).then(res => {
            this.loading.dismiss();
            this.viewCtrl.dismiss({ reload: true });
            // this.loading.dismiss();
          }, err => {
            this.loading.dismiss();
            // this.dismiss();
            this.showPopup("이미지 업로드", "이미지 업로드에 실패 하였습니다.");
          });
        }
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

  showLoading() {
    if (this.platform.is("ios")) {
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        // duration: 1000,
        cssClass: 'sk-rotating-plane2'
      });
      this.loading.present();
    } else {
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        // duration: 1000,
        cssClass: 'sk-rotating-plane2'
      });
      this.loading.present();
    }
  }

  authGetUserImage(email) {
    this.auth.getUserImage(email).subscribe(items2 => {
      if (items2) {
        this.profileimg_url = "https://plinic.s3.ap-northeast-2.amazonaws.com/";
        this.profileimg_url = this.profileimg_url.concat(items2.filename + "?random+\=" + Math.random());
      }
    });
  }
  imageGetUserUpdateImage(email) {
    this.imagesProvider.getuser_updateImage(email).subscribe(data => {
      this.userimg_id = data._id;
      this.userImgData = {
        id: data._id,
        email: data.email,
      }
    })
  }

  save(){
    if(this.userData && this.skincomplaint){
      this.auth.updateUserSkinComplaint(this.userData.email, this.skincomplaint).subscribe(data => {
        if (data !== "") {
          this.showAlert("피부타입 저장", "피부타입 저장이 완료되었습니다. <br> 반영은 재 로그인 하면 변경됩니다.");
        }
      }, error => {
        this.showError("[오류] 피부타입 저장 실패 <br> 재 로그인 후 다시 시도해주세요.")
      })
    } else {
      this.showAlert("피부타입 저장실패", "[오류] 피부타입 저장을 위해 <br> 재 로그인 후 변경 바랍니다.");
    }
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: message,
      buttons: [
        {
          text: '확인',
          handler: () => {
            this.navpop();
            // this.setUserData();
          }
        }
      ]
    });
    alert.present();
  }


  showError(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }

  public navpop() {
    this.nav.pop();
  }

}
