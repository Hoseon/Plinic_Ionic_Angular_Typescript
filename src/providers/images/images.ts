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
  // apiURL = 'http://localhost:8001/';

  constructor(public http: Http, private transfer: Transfer, private alertCtrl: AlertController) { }


  public bannerRoad() {
    return this.http.get(this.apiURL + 'banner/list')
      .map(response => response.json());
  }

  public topbannerLoad() {
    return this.http.get(this.apiURL + 'topbanner/list')
      .map(response => response.json());
  }

  public carezoneRoad() {
    return this.http.get(this.apiURL + 'carezone/list')
      .map(response => response.json());
  }

  public first_carezoneRoad() {
    return this.http.get(this.apiURL + 'carezone/challengefirstlist')
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

  public challangeCount(id) {
    return this.http.get(this.apiURL + 'carezone/challangecount/' + id)
      .map(response => response.json());
  }

  public challangeCount2(id, date) {
    return this.http.get(this.apiURL + 'carezone/challangecount/' + id + '/' + date)
      .map(response => response.json());
  }

  public missionCount(id) {
    return this.http.get(this.apiURL + 'carezone/challangecount/' + id)
      .map(response => response.json());
  }

  public missionUseTime(id, email) {
    return this.http.get(this.apiURL + 'carezone/missionusetime/' + id + '/' + email)
      .map(response => response.json());
  }

  //2020-02-10 챌린지 사용 횟수 구하기
  public challengeUseTime(id, email) {
    return this.http.get(this.apiURL + 'carezone/challengeusetime/' + id + '/' + email)
      .map(response => response.json());
  }

  //2020-02-20 챌린지 사용 횟수 구하기
  public challengeUseTime2(id, email) {
    return this.http.get(this.apiURL + 'carezone/challengeusetime2/' + id + '/' + email)
      .map(response => response.json());
  }

  // public missionPointUpdate(id, email, point) {
  //   return this.http.get(this.apiURL + 'carezone/missionpointupdate/' + id + '/' + email + '/' + point)
  //     .map(response => response.json());
  // }



  public getMissionMember(id) {
    return this.http.get(this.apiURL + 'carezone/getmissionmember/' + id)
      .map(response => response.json());
  }

  public getChallangeMember(id) {
    return this.http.get(this.apiURL + 'carezone/getchallangemember/' + id)
      .map(response => response.json());
  }

  public giveupMission(email) {
    return this.http.get(this.apiURL + 'carezone/giveupmission/' + email)
      .map(response => response.json());
  }

  public giveupChallenge(email) {
    return this.http.get(this.apiURL + 'carezone/giveupchallenge/' + email)
      .map(response => response.json());
  }

  public chkMission(email) {
    return this.http.get(this.apiURL + 'carezone/chkmission/' + email)
      .map(response => response.json());
  }

  public ChallengeChkMission(email) {
    return this.http.get(this.apiURL + 'carezone/challengechkmission/' + email)
      .map(response => response.json());
  }

  public challengeChkStartDate(email) {
    return this.http.get(this.apiURL + 'carezone/challengechkstart/' + email)
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

  public communityEditorHomeBeautyLoad() {
    return this.http.get(this.apiURL + 'commubeauty/home_list')
      .map(response => response.json());
  }

  public communityBeautyLoad() {
    return this.http.get(this.apiURL + 'commubeauty/main_list')
      .map(response => response.json());
  }

  public communityBeautyViewsUpdate(id) {
    return this.http.get(this.apiURL + 'commubeauty/list/' + id)
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

  public userSkinQnaLoad(email) {
    return this.http.get(this.apiURL + 'skinqna/skinqna_list/' + email)
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

  public exhibitionLoad() {
    return this.http.get(this.apiURL + 'exhibition/main_list/')
      .map(response => response.json());
  }

  public like(id, email) {
    return this.http.get(this.apiURL + 'commubeauty/beautylike/' + id + '/' + email)
      .map(response => response.json());
  }

  public noteLike(id, email) {
    return this.http.get(this.apiURL + 'beautynote/like/' + id + '/' + email)
      .map(response => response.json());
  }

  public noteDisLike(id, email) {
    return this.http.get(this.apiURL + 'beautynote/dislike/' + id + '/' + email)
      .map(response => response.json());
  }

  public skinQnaLike(id, email) {
    return this.http.get(this.apiURL + 'skinqna/like/' + id + '/' + email)
      .map(response => response.json());
  }

  public skinQnaDisLike(id, email) {
    return this.http.get(this.apiURL + 'skinqna/dislike/' + id + '/' + email)
      .map(response => response.json());
  }

  public chkUserImage(email) {
    return this.http.get(this.apiURL + 'carezone/chkuserimage/' + email)
      .map(response => response.json());
  }

  // public productLoad() { 20200707
  //   return this.http.get(this.apiURL + 'product/productlist')
  //     .map(response => response.json());
  // }

  public productLoad(search, page) {
    return this.http.get(this.apiURL + 'getProductList/' + search + '/' + page)
      .map(response => response.json());
  }

  public myMainProductLoad(email) {
    return this.http.get(this.apiURL + 'users/mymainproductlist/' + email)
      .map(response => response.json());
  }

  public mySubProductLoad(email) {
    return this.http.get(this.apiURL + 'users/mysubproductlist/' + email)
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



  public user_udateImage(img, desc) {

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

  public myuser_UploadImage(img, desc) { //My 에 프로필을 수정할때 등록된 사진이 없다면 새롭게 등록하게 한다.

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


  public getWeather(date, time) {
    return this.http.get(this.apiURL + 'getweather/' + date + '/' + time) 
      .map(response => response.json());
  }

  public getMise() {
    return this.http.get(this.apiURL + 'getmise') 
      .map(response => response.json());
  }

  public getUv() {
    return this.http.get(this.apiURL + 'getsun') 
      .map(response => response.json());
  }

  public getProductDetail(product_num) {
    return this.http.get(this.apiURL + 'getProductFindOne/' + product_num) 
      .map(response => response.json());
  }

  


}
