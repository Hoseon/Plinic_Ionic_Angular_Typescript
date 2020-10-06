import { Component } from '@angular/core';
import { IonicApp, AlertController, LoadingController, Loading, IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
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

  result1: any;
  result2: any;
  ageRange: any;
  step: any;

  diagnose_score: any;


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
    public ionicApp: IonicApp,
  ) {
    if(this.navParams.get('step')) {
      this.step = this.navParams.get('step')
    }
    

  }

  async ionViewDidLoad() {

    this.camerafile = this.navParams.get('file1');
    console.log(this.navParams.get('munjin'));
    if(this.navParams.get('munjin')) {
      this.diagnose_score = this.navParams.get('munjin');
    }
    
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
          skincomplaint: items.skincomplaint,
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
          id: this.jwtHelper.decodeToken(items).id,
          age_range: items.age_range,
          birthday: this.jwtHelper.decodeToken(items).birthday,
          skincomplaint: this.jwtHelper.decodeToken(items).skincomplaint,
          email: this.jwtHelper.decodeToken(items).email,
          gender: this.jwtHelper.decodeToken(items).gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
        };
      }
      this.getAgeRange();
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
    this.cameraTimer = Observable.interval(200).subscribe(x => {
      // this.cameraCount = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=&random+\=' + Math.random(); //회색 카메라
      this.cameraCount = 'http://192.168.1.1/protocol.csp?opt=snap&function=set&random+\=' + Math.random(); //중국 카메라 테스트 2020-09-09
      //http://192.168.1.1/snapshot.cgi?resolution=0&user=admin&pwd=admin
      i++;
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '피부촬영 분석중입니다'
    });
    this.loading.present();
  }
  
  camera2() {
    // this.showLoading();
    const fileTransfer: TransferObject = this.transfer.create();
    let url = 'http://192.168.1.1/protocol.csp?opt=snap&function=set'; //중국 카메라 2020-09-09
    // let url = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd='; //회색 카메라
    fileTransfer.download(url, cordova.file.dataDirectory + 'file2.jpg').then((entry) => {
      this.cameraCount = 'http://192.168.1.1/protocol.csp?opt=shutdown&function=set';
      this.cameraTimer.complete();
      console.log('download complete: ' + entry.toURL());
      this.camerafile2 = entry.toURL();
      if(this.userData && this.camerafile2 !== "") {
        this.showLoading();
        setTimeout(() => {
          if(this.step ==='first') {
            this.auth.cameraTest(this.camerafile, this.camerafile2, this.userData, this.diagnose_score).then(data => {
              // if (!data) {
              if(data) {
                this.result1 = data.result1;
                this.result2 = data.result2;
                console.log("실제 데이터는? : " + JSON.stringify(data));
              }          
                this.loading.dismiss();
                if(data) {
                  this.auth.skinAnaly(this.result1, this.result2, this.ageRange, this.userData, this.diagnose_score).subscribe(data => {
                    console.log("데이터 저장 완료")
                  }, error => {
                    console.log("데이터 저장 완료")
                  })
                }
                  
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert',
                  title: '사진 촬영',
                  message: "피부 분석이 완료 되었습니다",
                  buttons: [
                    // {
                    //   text: '취소',
                    //   role: 'cancel',
                    //   handler: () => {
                    //   }
                    // },
                    {
                      text: '확인',
                      handler: () => {
                        this.navCtrl.parent.select(4);
                      }
                    }
                  ]
                });
                alert2.present();
            });
          } else if (this.step ==='second') {
            this.auth.skinAnalySecondSave(this.camerafile, this.camerafile2, this.userData, this.step, this.diagnose_score).then(data => {
              // if (!data) {
                this.loading.dismiss();
                  
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert',
                  title: '사진 촬영',
                  message: "피부 분석이 완료 되었습니다",
                  buttons: [
                    // {
                    //   text: '취소',
                    //   role: 'cancel',
                    //   handler: () => {
                    //   }
                    // },
                    {
                      text: '확인',
                      handler: () => {
                        this.navCtrl.parent.select(4);
                      }
                    }
                  ]
                });
                alert2.present();
            },error => {
              alert("에러 발생");
            });
          }
        }, 5000);
        

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
  

  public dismissAllModal() {
    let activeModal = this.ionicApp._modalPortal.getActive();
    if (activeModal) {
      activeModal.dismiss().then(() => {
        this.dismissAllModal()
      });
    }
  }

  getAgeRange() {
    var age = 0;
    var age_range = '';
    age = Number(new Date().getFullYear()) - Number(this.userData.birthday.substr(0,4)) + 1 ;
    this.ageRange = String(age).substr(0,1) + '0';
  }

}
