import { Component } from '@angular/core';
import { AlertController, LoadingController, Loading, IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture'
import { SkinChekCamera3Page } from '../skin-chek-camera3/skin-chek-camera3'
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { Observable } from 'rxjs/Rx';
declare var cordova: any;


/**
 * Generated class for the SkinChekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-chek-camera2',
  templateUrl: 'skin-chek-camera2.html',
})
export class SkinChekCamera2Page {

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
    if(this.camerafile2 !== "") {
      this.navCtrl.push(SkinChekCamera3Page,{file1:this.camerafile, file2:this.camerafile2}).then(() => {
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log("카메라2 페이지 닫힘");
        });
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
  
  camera2() {
    // this.showLoading();
    const fileTransfer: TransferObject = this.transfer.create();
    let url = 'http://192.168.1.1/snapshot.cgi?resolution=0&user=admin&pwd=admin';
    // let url = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=';
    fileTransfer.download(url, cordova.file.dataDirectory + 'file2.jpg').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.camerafile2 = entry.toURL();
      if(this.camerafile2 !== "") {
        this.navCtrl.push(SkinChekCamera3Page,{file1:this.camerafile, file2:this.camerafile2}).then(() => {
          this.navCtrl.getActive().onDidDismiss(data => {
            console.log("카메라2 페이지 닫힘");
          });
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
      
    }, (error) => {
      // handle error
    });
  }
  
}
