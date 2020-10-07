import { Component } from '@angular/core';
import { AlertController, LoadingController, Loading, IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture'
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { Observable } from 'rxjs/Rx';
declare var cordova: any;


/**
 * Generated class for the SkinChekCamera3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-chek-camera3',
  templateUrl: 'skin-chek-camera3.html',
})
export class SkinChekCamera3Page {

  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  isLoadMain : boolean = false;
  isLoadSub : boolean = false;
  loadMainData : any;
  loadSubData : any;
  diagnose_score: number = 2;
  diagnose_score2: number = 2;
  diagnose_score3: number = 2;
  diagnose_score4: number = 2;
  all_score: number = 0;
  isDisabledRange1 : boolean = true;
  isDisabledRange2 : boolean = true;
  isDisabledRange3 : boolean = true;
  isNext: boolean = false;
  cameraTimer: any;
  cameraCount: any;
  loading: Loading;

  camerafile: any;
  camerafile2: any;
  camerafile3: any;



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public auth: AuthService,
    public images: ImagesProvider,
    private loadingCtrl: LoadingController,
    private transfer: Transfer,
    private alertCtrl: AlertController,
  ) {
  }

  async ionViewDidLoad() {
    this.camerafile = this.navParams.get('file1');
    this.camerafile2 = this.navParams.get('file2');
    console.log('ionViewDidLoad SkinChekMunJinPage');
    await this.loadItems();
    this.macro_player();
  }

  async ionViewDidEnter(){
    console.log('ionViewDidLoad SkinChekMunJinPage');
  }

  async ionViewWillLeave() {
    await this.cameraTimer.complete();
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
    });
  }

  public next() {
    if(this.camerafile !=='' && this.camerafile2 !== "") {
     // this.showLoading();
      const fileTransfer: TransferObject = this.transfer.create();
      let url = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=';
      fileTransfer.download(url, cordova.file.dataDirectory + 'file3.jpg').then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.camerafile3 = entry.toURL();
        if(this.userData) {
          this.auth.cameraTest(this.camerafile, this.camerafile2, this.camerafile3, this.userData).then(data => {
            // if (!data) {
              this.loading.dismiss();
              let alert2 = this.alertCtrl.create({
                cssClass: 'push_alert',
                title: '사진 촬영',
                message: "사진이 저장 되었습니다.",
                buttons: [
                  {
                    text: '확인',
                    handler: () => {
                    }
                  }
                ]
              });
              alert2.present();
            // }
          });
        }
    }, (error) => {
      // handle error
    });
    } else {
      let alert2 = this.alertCtrl.create({
        cssClass: 'push_alert',
        title: '알림',
        message: "사진 촬영이 실패 했습니다!!",
        buttons: [
          {
            text: '확인',
            handler: () => {
            }
          }
        ]
      });
      alert2.present();
    }
    this.navCtrl.push(SkinDiagnoseFirstMoisturePage).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("설문 페이지 닫힘");
      });
    });
  }

  // 2020-05-13 근접카메라 실시간으로 앱에 보여주는 로직
  macro_player() {
    var i = 0;
    this.cameraTimer = Observable.interval(300).subscribe(x => {
      // this.cameraCount = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=&random+\=' + Math.random();
      this.cameraCount = 'http://192.168.1.1/snapshot.cgi?resolution=0&user=admin&pwd=admin&random+\=' + Math.random();
      //http://192.168.1.1/snapshot.cgi?resolution=0&user=admin&pwd=admin
      i++;
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  camera3() {
    this.showLoading();
    const fileTransfer: TransferObject = this.transfer.create();
    let url = 'http://192.168.1.1/snapshot.cgi?resolution=0&user=admin&pwd=admin';
    // let url = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=';
    fileTransfer.download(url, cordova.file.dataDirectory + 'file3.jpg').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.camerafile3 = entry.toURL();

      if(this.userData && this.camerafile3 !== '') {
        this.auth.cameraTest(this.camerafile, this.camerafile2, this.camerafile3, this.userData).then(data => {
          // if (!data) {
            this.loading.dismiss();
            let alert2 = this.alertCtrl.create({
              cssClass: 'push_alert',
              title: '사진 촬영',
              message: "사진이 저장 되었습니다.",
              buttons: [
                {
                  text: '확인',
                  handler: () => {
                  }
                }
              ]
            });
            alert2.present();
          // }
        });
      }

      // if(this.userData) {
      //   this.auth.eyeSkin(entry.toURL(), this.userData).then(data => {
      //     // if (!data) {
      //       this.loading.dismiss();
      //       let alert2 = this.alertCtrl.create({
      //         cssClass: 'push_alert',
      //         title: '사진 촬영',
      //         message: "사진이 저장 되었습니다.",
      //         buttons: [
      //           {
      //             text: '확인',
      //             handler: () => {
      //             }
      //           }
      //         ]
      //       });
      //       alert2.present();
      //     // }
      //   });
      // }
      
    }, (error) => {
      // handle error
    });
  }

  camera4(){
    // this.showLoading();
      if(this.userData) {
        this.auth.cameraTest(this.camerafile, this.camerafile2, this.camerafile3, this.userData).then(data => {
          // if (!data) {
            this.loading.dismiss();
            let alert2 = this.alertCtrl.create({
              cssClass: 'push_alert',
              title: '사진 촬영',
              message: "사진이 저장 되었습니다.",
              buttons: [
                {
                  text: '확인',
                  handler: () => {
                  }
                }
              ]
            });
            alert2.present();
          // }
        });
      }
  }
}
