import { ImagesProvider } from './../../providers/images/images';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ActionSheetController, AlertController, LoadingController, Platform, ToastController, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  images: any = [];
  photoSrc: any;
  cameraPhoto: any;
  imagePath: any;

  constructor(public navCtrl: NavController, private imagesProvider: ImagesProvider, private camera: Camera, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController,
    private alertCtrl: AlertController, public _DomSanitizer: DomSanitizer, ) {
    this.reloadImages();
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
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
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
      quality: 20,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
       this.imagePath = imagePath;
       this.imagePath = normalizeURL(this.imagePath);
       //this.photoSrc = 'data:image/jpg;base64,' + imagePath;
       //this.cameraPhoto = this._DomSanitizer.bypassSecurityTrustUrl(this.photoSrc)
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
