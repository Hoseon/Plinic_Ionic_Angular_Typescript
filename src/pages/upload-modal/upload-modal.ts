import { Component } from '@angular/core';
import { ImagesProvider } from './../../providers/images/images';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, Loading} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {
  imageData: any;
  desc: string;
  loading: Loading;

  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private imagesProvider: ImagesProvider, private alertCtrl: AlertController, private loding: LoadingController) {
    this.imageData = this.navParams.get('data');
  }

  saveImage() {
    this.showLoading();
    this.imagesProvider.uploadImage(this.imageData, this.desc).then(res => {
      this.viewCtrl.dismiss({reload: true});
      this.loading.dismiss();
    }, err => {
      this.dismiss();
      this.showAlert("Image upload failed");
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading() {
    this.loading = this.loding.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

}
