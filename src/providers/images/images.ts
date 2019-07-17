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

  public first_carezoneRoad() {
    return this.http.get(this.apiURL + 'carezone/firstlist')
      .map(response => response.json());
  }

  public second_carezoneRoad() {
    return this.http.get(this.apiURL + 'carezone/secondlist')
      .map(response => response.json());
  }

  public third_carezoneRoad() {
    return this.http.get(this.apiURL + 'carezone/thirdlist')
      .map(response => response.json());
  }

  public moresecond_carezoneRoad() {
    return this.http.get(this.apiURL + 'carezone/moresecondlist')
      .map(response => response.json());
  }

  public morethird_carezoneRoad() {
    return this.http.get(this.apiURL + 'carezone/morethirdlist')
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

  public communityEditorBeautyLoad() {
    return this.http.get(this.apiURL + 'commubeauty/editorlist')
      .map(response => response.json());
  }

  public communityBeautyLoad() {
    return this.http.get(this.apiURL + 'commubeauty/main_list')
      .map(response => response.json());
  }

  public beautyNoteLoad() {
    return this.http.get(this.apiURL + 'beautynote/main_list')
      .map(response => response.json());
  }

  public beautyNoteMainLoad() {
    return this.http.get(this.apiURL + 'beautynote/editorlist')
      .map(response => response.json());
  }

  public beautyNoteOneLoad(id) {
    return this.http.get(this.apiURL + 'beautynote/list/' + id)
      .map(response => response.json());
  }

  public skinQnaLoad() {
    return this.http.get(this.apiURL + 'skinqna/main_list')
      .map(response => response.json());
  }

  public skinQnaMainLoad() {
    return this.http.get(this.apiURL + 'skinqna/editorlist')
      .map(response => response.json());
  }

  public skinQnaOneLoad(id) {
    return this.http.get(this.apiURL + 'skinqna/list/' + id)
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
      // mimeType: 'image/jpeg',
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
      // mimeType: 'image/jpeg',
      mimeType: 'multipart/form-data',
      params: { 'desc': desc }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }



  user_udateImage(img, desc) {

    // Destination URL
    let url = this.apiURL + 'userupdateimages';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      // mimeType: 'image/jpeg',
      mimeType: 'multipart/form-data',
      params: { 'id': desc.id, 'email': desc.email }
    };

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

  beautyNote_uploadImage(img, desc) {

    // Destination URL
    let url = this.apiURL + 'userimages';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      // mimeType: 'image/jpeg',
      mimeType: 'multipart/form-data',
      params: { 'desc': desc }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }

  skinQna_uploadImage(img, desc) {

    // Destination URL
    let url = this.apiURL + 'userimages';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      // mimeType: 'image/jpeg',
      mimeType: 'multipart/form-data',
      params: { 'desc': desc }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }


}
