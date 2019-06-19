import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { AlertController } from 'ionic-angular';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer'

/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagesProvider {

  apiURL = 'http://plinic.cafe24app.com/';
  //apiURL = 'http://localhost:8001/';

  constructor(public http: Http, private transfer: Transfer, private alertCtrl: AlertController) { }


  public bannerRoad() {
    return this.http.get(this.apiURL + 'banner/list')
      .map(response => response.json());
  }

  public carezoneRoad() {
    return this.http.get(this.apiURL + 'carezone/list')
      .map(response => response.json());
  }

  public missionRoad(id) {
    return this.http.get(this.apiURL + 'carezone/mission/' + id)
      .map(response => response.json());
  }

  public missionCount(id) {
    return this.http.get(this.apiURL + 'carezone/missioncount/' + id)
      .map(response => response.json());
  }

  public getMissionMember(id) {
    return this.http.get(this.apiURL + 'carezone/getmissionmember/' + id)
      .map(response => response.json());
  }

  public giveupMission(email) {
    return this.http.get(this.apiURL + 'carezone/giveupmission/' + email)
      .map(response => response.json());
  }

  public chkMission(email) {
    return this.http.get(this.apiURL + 'carezone/chkmission/' + email)
      .map(response => response.json());
  }

  public maincarezoneRoad() {
    return this.http.get(this.apiURL + 'carezone/main_list')
      .map(response => response.json());
  }

  public mainbeautyRoad() {
    return this.http.get(this.apiURL + 'beauty/main_list')
      .map(response => response.json());
  }

  getImages() {
    return this.http.get(this.apiURL + 'images').map(res => res.json());
  }

  deleteImage(img) {
    return this.http.delete(this.apiURL + 'images/' + img._id);
  }

  uploadImage(img, desc) {

    // Destination URL
    let url = this.apiURL + 'images';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'desc': desc }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }

  user_uploadImage(img, desc) {

    // Destination URL
    let url = this.apiURL + 'userimages';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'desc': desc }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }



  user_udateImage(img, desc) {
    console.log("------1234987123498712398471298341239871234982347" + desc.id)
    console.log("-------1234987123498712398471298341239871234982347" + desc.email)

    // Destination URL
    let url = this.apiURL + 'userupdateimages';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'id': desc.id, 'email': desc.email }
    };

    console.log("1234987123498712398471298341239871234982347" + desc.id)
    console.log("1234987123498712398471298341239871234982347" + desc.email)

    const fileTransfer: TransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }

  public getuser_updateImage(id) {
    return this.http.get(this.apiURL + 'userupdateimages/' + id)
      .map(response => response.json());
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
