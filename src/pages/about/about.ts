import { ImagesProvider } from './../../providers/images/images';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ActionSheetController, AlertController, LoadingController, Platform, ToastController, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ImageLoader } from 'ionic-image-loader';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  images: any = [];
  photoSrc: any;
  cameraPhoto: any;
  imagePath: any;

  constructor(public navCtrl: NavController, private imagesProvider: ImagesProvider, private _camera: Camera, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController,
    private alertCtrl: AlertController, public _DomSanitizer: DomSanitizer, public auth: AuthService,
    private iab: InAppBrowser, private themeableBrowser: ThemeableBrowser, private imageLoader: ImageLoader,
  ) {
    this.reloadImages();
    //this.openBrowser("","플리닉");

  }

  openBrowser(url, title) {
    // this.browserTab.isAvailable()
    // .then(isAvailable => {
    //   if (isAvailable) {
    //     this.browserTab.openUrl('https://ionic.io');
    //   } else {
    //     // open URL with InAppBrowser instead or SafariViewController
    //   }
    // });
    // https://ionicframework.com/docs/native/themeable-browser/
    // const options: ThemeableBrowserOptions = {
    //   toolbar: {
    //     height: 44,
    //     color: '#6562b9'
    //   },
    //   title: {
    //     color: '#ffffffff',
    //     showPageTitle: false,
    //     staticText: title
    //   },
    //   // backButton: {
    //   //   wwwImage: 'assets/img/back.png',
    //   //   align: 'left',
    //   //   event: 'backPressed'
    //   // },
    //   // forwardButton: {
    //   //   wwwImage: 'assets/img/forward.png',
    //   //   align: 'left',
    //   //   event: 'forwardPressed'
    //   // },
    //   closeButton: {
    //     wwwImage: 'assets/img/close.png',
    //     align: 'left',
    //     event: 'closePressed'
    //   },
    //   // backButtonCanClose: true
    // };
    //
    // const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    // browser.insertCss({
    //   file: 'assets/img/close.png',
    //   code: '.navbar-fixed-top {display: block !important;}'
    // });
    // browser.reload();
    // browser.on('closePressed').subscribe(data => {
    //   browser.close();
    // })
  }






  reloadImages() {
    this.imagesProvider.getImages().subscribe(data => {
      this.images = data;
    });
  }

  deleteImage(img) {
    this.imagesProvider.deleteImage(img).subscribe(data => {
      this.reloadImages();
    });
  }

  openImage(img) {
    let modal = this.modalCtrl.create('PreviewModalPage', { img: img });
    modal.present();
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
      targetWidth: 500,
      targetHeight: 500
    };

    // Get the data of an image
    this._camera.getPicture(options).then((imagePath) => {
      this.imagePath = imagePath;
      this.imagePath = normalizeURL(this.imagePath);
      //this.photoSrc = 'data:image/jpg;base64,' + imagePath;
      //this.cameraPhoto = this._DomSanitizer.bypassSecurityTrustUrl(this.photoSrc)
      this.auth.setUserStorageimagePath(this.imagePath);
      let modal = this.modalCtrl.create('UploadModalPage', { data: this.imagePath });
      modal.present();
      modal.onDidDismiss(data => {
        if (data && data.reload) {
          this.reloadImages();
        }
      });
    }, (err) => {
      console.log('Error: ', err);
    });

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
