import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ActionSheetController, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthService } from '../../../providers/auth-service';
import { ImagesProvider } from '../../../providers/images/images';
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";

/**
 * Generated class for the CommunityWritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-write',
  templateUrl: 'community-write.html',
})
export class CommunityWritePage {

  images: any = [];
  photoSrc: any;
  cameraPhoto: any;
  imagePath: any;
  imagePath2: any;
  item: FormControl;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private actionSheetCtrl: ActionSheetController, private imagesProvider: ImagesProvider, private _camera: Camera, public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController) {
  }

  ionViewWillLoad() {
    this.item = this.formBuilder.control('');
    console.log("rich");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityWritePage');
  }


  public dissmiss() {
    this.viewCtrl.dismiss();
  }

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
      quality: 50,
      destinationType: this._camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      targetWidth: 300,
      targetHeight: 300
    };

    // Get the data of an image
    this._camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('ios')) {
        this.imagePath = imagePath;
        this.imagePath = normalizeURL(this.imagePath);
        this.imagePath2 = normalizeURL(this.imagePath);
      }
      else {
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
        // this.imagePath = "data:image/jpeg;base64," + this.imagePath;
        this.imagePath = this.imagePath;
        this.imagePath2 = this.imagePath;
        this.auth.setUserStorageimagePath(this.imagePath2);
      }
    }, (err) => {
      console.log('Error: ', err);
    });
  }



}
