import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ActionSheetController, App, AlertController, normalizeURL, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthService } from '../../../providers/auth-service';
import { ImagesProvider } from '../../../providers/images/images';
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { DOCUMENT } from '@angular/common';

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
  note = { select: '', title: '', contents: '', tags: [], id: '' };
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  mode: any;

  topics = [];
  name: string;
  talks = [];
  preparedTags = [];
  skinQna: boolean = false;
  profileimg_url: any;
  page_write = "2";
  page_modify = "3";

  @ViewChild('image') imageElement: ElementRef;
  unregisterBackButtonAction: Function

  // ,preparedTags = [
  //   '#Ionic',
  //   '#Angular',
  //   '#Javascript',
  //   '#Mobile',
  //   '#Hybrid',
  //   '#CrossPlatform'
  // ]



  topic() {
    console.log(this.topics);
  }

  addTalk() {
    this.talks.push({ name: this.name, topics: this.topics });
  }


  ionViewWillLoad() {
  }

  constructor(private imagesProvider: ImagesProvider, public _camera: Camera, public actionSheetCtrl: ActionSheetController, public nav: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams, public platform: Platform, private auth: AuthService, public viewCtrl: ViewController, private alertCtrl: AlertController,
     public app: App, public element: ElementRef, @Inject(DOCUMENT) document) {

    this.platform.ready().then((readySource) => {

      if (this.navParams.get('qna')) {
        this.skinQna = true;
      }

        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            this.dissmiss();
        }, 99999);
    });
  }

  ionViewWillLeave(){
    this.unregisterBackButtonAction();
  }


  protected adjustTextarea(): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    return;
  }

  // 첨부이미지 삭제
  image_close(){
      setTimeout(() => {
      this.imageElement.nativeElement.remove();
      }, 100)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityWritePage');
  }

  ionViewCanEnter() {
    this.loadItems();
    this.getHashTags();
  }

  attache_image_hide() {
    if (this.imagePath2) {
      document.getElementById("attache_image").style.display = "none";
    }
  }

  attache_image_view() {
    if (this.imagePath2){
      document.getElementById("attache_image").style.display = "";
    }
  }

  public dissmiss() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "plinic",
      message: "글쓰기 작성을 취소하시겠습니까?",
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            console.log('취소');
          }
        },
        {
          text: '확인',
          handler: () => {
            console.log('확인'),
              this.viewCtrl.dismiss();
          }
        }]
    });
    alert.present();
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
        // console.log(this.userData);
      }
      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }

  registerNote() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "글 작성",
      message: "글쓰기 작성을 완료 하시겠습니까?",
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '확인',
          handler: () => {
            if (this.mode === true) {
              // this.note.id = this.id;
              // console.log("update Id :" + this.id);
              this.auth.noteSave(this.userData.email, this.note, this.imagePath2).then(data => {
                if (!data) {
                  let alert2 = this.alertCtrl.create({
                    cssClass: 'push_alert',
                    title: '글 작성',
                    message: "글쓰기가 정상적으로 수정 되었습니다.",
                    buttons: [
                      {
                        text: '확인',
                        handler: () => {
                          //this.nav.pop();
                          this.viewCtrl.dismiss({
                            page_modify : this.page_modify
                          });
                        }
                      }
                    ]
                  });
                  alert2.present();
                }
                // this.nav.push(CareZoneMissionIngPage, { _id: id });
              }, error => {
                this.showError(JSON.parse(error._body).msg);
              });

            } else {
              if (this.skinQna) {
                if (this.imagePath2) { //피부고민 이미지가 있을때
                  this.auth.communitySkinQnaImgSave(this.userData.email, this.note, this.imagePath2).then(data => {
                    if (data) {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '글 작성',
                        message: "글 작성이 정상적으로 등록 되었습니다.",
                        buttons: [
                          {
                            text: '확인',
                            handler: () => {
                              //this.nav.pop();
                              this.viewCtrl.dismiss({
                                page_write : this.page_write
                              });
                            }
                          }
                        ]
                      });
                      alert2.present();
                    }
                    // this.nav.push(CareZoneMissionIngPage, { _id: id });
                  }, error => {
                    this.showError(JSON.parse(error._body).msg);
                  });
                } else { //피부고민 이미지가 없을
                  this.auth.communitySkinQnaSave(this.userData.email, this.note).subscribe(data => {
                    if (data !== "") {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '글 작성',
                        message: "글 작성이 정상적으로 등록 되었습니다.",
                        buttons: [
                          {
                            text: '확인',
                            handler: () => {
                              //this.nav.pop();
                              this.viewCtrl.dismiss({
                                page_write : this.page_write
                              });
                            }
                          }
                        ]
                      });
                      alert2.present();
                    }
                    // this.nav.push(CareZoneMissionIngPage, { _id: id });
                  }, error => {
                    this.showError(JSON.parse(error._body).msg);
                  });

                }
              } else {
                //이미지가 있을때 저장
                if (this.imagePath2) {
                  this.auth.noteSave(this.userData.email, this.note, this.imagePath2).then(data => {
                    if (data) {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '글 작성',
                        message: "글 작성이 정상적으로 등록 되었습니다.",
                        buttons: [
                          {
                            text: '확인',
                            handler: () => {
                              //this.nav.pop();
                              this.viewCtrl.dismiss({
                                page_write : this.page_write
                              });
                            }
                          }
                        ]
                      });
                      alert2.present();
                    }
                  }, error => {
                    this.showError(JSON.parse(error._body).msg);
                  });
                } else { // 이미지가 없을 때 저장
                  this.auth.noteNoImgSave(this.userData.email, this.note).subscribe(data => {
                    if (data !== "") {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '글 작성',
                        message: "글 작성이 정상적으로 등록 되었습니다.",
                        buttons: [
                          {
                            text: '확인',
                            handler: () => {
                              //this.nav.pop();
                              this.viewCtrl.dismiss({
                                page_write : this.page_write
                              });
                            }
                          }
                        ]
                      });
                      alert2.present();
                    }
                  }, error => {
                    this.showError(JSON.parse(error._body).msg);
                  });
                }
              }
            }
          }
        }]
    });
    alert.present();


  }

  getHashTags() {
    this.auth.getHashTags().subscribe(items => {
      if (items !== '' || !undefined || !null) {
        // console.log(items[0].tags);
        this.preparedTags = items[0].tags.split(",");
        console.log(this.preparedTags);
      }
    });
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


}
