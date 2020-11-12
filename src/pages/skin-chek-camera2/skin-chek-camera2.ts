import { Component } from '@angular/core';
import { IonicApp, AlertController, LoadingController, Loading, IonicPage, NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture'
import { SkinChekCamera3Page } from '../skin-chek-camera3/skin-chek-camera3'
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { Observable } from 'rxjs/Rx';
import { PointLogPage } from '../point-log/point-log';
import { TabsPage } from '../tabs/tabs';
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
  cameraCountShutdown: any;
  loading: Loading;

  camerafile: any;
  camerafile2: any;
  camerafile3: any;

  result1: any;
  result2: any;
  ageRange: any;
  step: any;

  diagnose_score: any;

  isSkinAnaly: boolean = false;
  isMainLoading: boolean = false;
  isSubLoading: boolean = false;


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
    public modalCtrl: ModalController,
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
  
  public async camera2() {
    // this.showLoading();
    this.isSkinAnaly = true;
    this.isMainLoading = true;
    this.isSubLoading = true;
    const fileTransfer: TransferObject = this.transfer.create();
    let url = 'http://192.168.1.1/protocol.csp?opt=snap&function=set'; //중국 카메라 2020-09-09
    // let url = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd='; //회색 카메라
    fileTransfer.download(url, cordova.file.dataDirectory + 'file2.jpg').then((entry) => {
      this.cameraCountShutdown = 'http://192.168.1.1/protocol.csp?opt=shutdown&function=set';
      setTimeout(() => {
        this.cameraTimer.complete();  
        console.log("전원 OFF 타이머 종료");
      }, 1000);
      // this.cameraTimer.complete();
      console.log('download complete: ' + entry.toURL());
      this.camerafile2 = entry.toURL();
      if(this.userData && this.camerafile2 !== "") {
        // this.showLoading();
        setTimeout(() => {
          if(this.step ==='first') {
            this.auth.cameraTest(this.camerafile, this.camerafile2, this.userData, this.diagnose_score).then(data => {
              // if (!data) {
              if(data) {
                this.result1 = data.result1;
                this.result2 = data.result2;
                console.log("실제 데이터는? : " + JSON.stringify(data));
              }          
                // this.loading.dismiss();////////////////////
                this.isMainLoading = false;
                this.isSubLoading = false;

                if(data) {
                  this.auth.skinAnaly(this.result1, this.result2, this.ageRange, this.userData, this.diagnose_score).subscribe(data2 => {
                    console.log("데이터 저장 완료")
                    this.images.getCheckSkinReport(this.userData.email).subscribe(data3 => {

                      var skinreport = {
                        isreport : true,
                        updatedAt : new Date()
                      }
                      
                      if(data3 === null) {
                        //사용자가 처음 등록한 사용자라면 무조건 세이브 처리 해준다.
                        if(this.userData.from === 'naver' || this.userData.from === 'kakao' || this.userData.from === 'google') { //sns회원인지 구분
                          this.auth.plinicShopAddPoint(this.userData.snsid, 100, '피부 측정').subscribe(data4 => {
                            console.log("플리닉샵 포인트 누적 : " + data4);
                          }, error => {
                            console.log("플리닉샵 포인트 누적 에러 발생 : " + error);
                          });
                          this.auth.skinReportUpdate(this.userData.email, skinreport).subscribe(data5 => {
                            console.log("Skin-Chek-Camera2 : skinReportUpdate 포인트 누적 완료")
                          }, error => {
                  
                          });
                        } else {
                          this.auth.plinicShopAddPoint(this.userData.email, 100, '피부 측정').subscribe(data4 => {
                            console.log("플리닉샵 포인트 누적 : " + data4);
                          }, error => {
                            console.log("플리닉샵 포인트 누적 에러 발생 : " + error);
                          });
                          this.auth.skinReportUpdate(this.userData.email, skinreport).subscribe(data5 => {
                            console.log("Skin-Chek-Camera2 : skinReportUpdate 포인트 누적 완료")
                          }, error => {

                          });
                        }
                      }
                    }, error => {
                      //에러 처리
                    });

                  }, error => {
                    console.log("데이터 저장 완료")
                  })
                }
                  
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert_cancel2',
                  title: '피부 측정이 완료되었습니다',
                  message: "100P가 적립 되었습니다.",

                  buttons: [{
                    text: '포인트 적립 확인',
                      handler: () => {
                        this.navCtrl.setRoot(TabsPage).then(() => {
                          let myModal = this.modalCtrl.create(PointLogPage);
                            myModal.onDidDismiss(data => {
                            });
                            myModal.present();
                        });
                      }
                    },
                    {
                      text: '피부리포트 확인',  
                      handler: () => {
                        this.navCtrl.parent.select(4);
                      }
                    }]
                });
                alert2.present();
            });
          } else if (this.step ==='second') {
            this.auth.skinAnalySecondSave(this.camerafile, this.camerafile2, this.userData, this.step, this.diagnose_score).then(data => {

              this.images.getCheckSkinReport(this.userData.email).subscribe(data2 => {

                var skinreport = {
                  isreport : true,
                  updatedAt : new Date()
                }

                if(data2 === null) {
                  //사용자가 처음 등록한 사용자라면 무조건 세이브 처리 해준다.
                  if(this.userData.from === 'naver' || this.userData.from === 'kakao' || this.userData.from === 'google') { //sns회원인지 구분
                    this.auth.plinicShopAddPoint(this.userData.snsid, 100, '피부 측정').subscribe(data3 => {
                      console.log("플리닉샵 포인트 누적 : " + data3);
                    }, error => {
                      console.log("플리닉샵 포인트 누적 에러 발생 : " + error);
                    });
                    this.auth.skinReportUpdate(this.userData.email, skinreport).subscribe(data3 => {

                      this.isMainLoading = false;
                      this.isSubLoading = false;

                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert_cancel2',
                        title: '피부 측정이 완료되었습니다',
                        message: "100P가 적립 되었습니다.",
                        buttons: [{
                          text: '포인트 적립 확인', 
                            handler: () => {
                              this.navCtrl.setRoot(TabsPage).then(() => {
                                let myModal = this.modalCtrl.create(PointLogPage);
                                  myModal.onDidDismiss(data => {
                                  });
                                  myModal.present();
                              });
                            }
                          },
                          {
                            text: '피부리포트 확인',
                            handler: () => {
                              this.navCtrl.parent.select(4);
                            }
                          }]
                      });
                      alert2.present();
                    }, error => {
            
                    });
                  } else {
                    this.auth.plinicShopAddPoint(this.userData.email, 100, '피부 측정').subscribe(data2 => {
                      console.log("플리닉샵 포인트 누적 : " + data2);
                    }, error => {
                      console.log("플리닉샵 포인트 누적 에러 발생 : " + error);
                    });
                    this.auth.skinReportUpdate(this.userData.email, skinreport).subscribe(data => {
                      this.isMainLoading = false;
                      this.isSubLoading = false;

                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert_cancel2',
                        title: '피부 측정이 완료되었습니다',
                        message: "100P가 적립 되었습니다.",
                        buttons: [{
                          text: '포인트 적립 확인', 
                            handler: () => {
                              this.navCtrl.setRoot(TabsPage).then(() => {
                                let myModal = this.modalCtrl.create(PointLogPage);
                                  myModal.onDidDismiss(data => {
                                  });
                                  myModal.present();
                              });
                            }
                          },
                          {
                            text: '피부리포트 확인',
                            handler: () => {
                              this.navCtrl.parent.select(4);
                            }
                          }]
                      });
                      alert2.present();
                    }, error => {

                    });
                  }
                } else {
                  //사용자의 데이터가 존재 한다면 제일 마지막 측정 날짜를 비교한다.
                  // console.log(JSON.stringify(data));
                  // console.log("스킨리포트 날짜 : " + data.skinreport[0].updatedAt);
                  // console.log("데이터의 날짜" + this.getCovertKoreaTime(data.skinreport[0].updatedAt).substr(0,10));
                  // console.log("오늘의 날짜 : " + this.getCovertKoreaTime(new Date()).substr(0,10));
                  if(this.getCovertKoreaTime(data2.skinreport[(data2.skinreport.length)-1].updatedAt).substr(0,10) === this.getCovertKoreaTime(new Date()).substr(0,10)) {
                    //같은 날짜는 포인트 누적을 하지 않음
                    console.log("날짜가 같음");
                    this.isMainLoading = false;
                    this.isSubLoading = false;

                    let alert2 = this.alertCtrl.create({
                      cssClass: 'push_alert_cancel2',
                      title: '피부 측정이 완료되었습니다',
                      message: "오늘은 이미 100P가 누적되었습니다",
                      buttons: [{
                        text: '포인트 적립 확인', 
                          handler: () => {
                            this.navCtrl.setRoot(TabsPage).then(() => {
                              let myModal = this.modalCtrl.create(PointLogPage);
                                myModal.onDidDismiss(data => {
                                });
                                myModal.present();
                            });
                          }
                        },
                        {
                          text: '피부리포트 확인',
                          handler: () => {
                            this.navCtrl.parent.select(4);
                          }
                        }]
                    });
                    alert2.present();
                  } else if (data) {
                    //날짜가 같지 않을댄 누적을 한다.
                    if(this.userData.from === 'naver' || this.userData.from === 'kakao' || this.userData.from === 'google') { //sns회원인지 구분
                      this.auth.plinicShopAddPoint(this.userData.snsid, 100, '피부 측정').subscribe(data2 => {
                        console.log("플리닉샵 포인트 누적 : " + data2);
                      }, error => {
                        console.log("플리닉샵 포인트 누적 에러 발생 : " + error);
                      });
                      this.auth.skinReportUpdate(this.userData.email, skinreport).subscribe(data => {
  
                        this.isMainLoading = false;
                        this.isSubLoading = false;
  
                        let alert2 = this.alertCtrl.create({
                          cssClass: 'push_alert_cancel2',
                          title: '피부 측정이 완료되었습니다',
                          message: "100P가 적립 되었습니다.",
                          buttons: [{
                            text: '포인트 적립 확인', 
                              handler: () => {
                                this.navCtrl.setRoot(TabsPage).then(() => {
                                  let myModal = this.modalCtrl.create(PointLogPage);
                                    myModal.onDidDismiss(data => {
                                    });
                                    myModal.present();
                                });
                              }
                            },
                            {
                              text: '피부리포트 확인',
                              handler: () => {
                                this.navCtrl.parent.select(4);
                              }
                            }]
                        });
                        alert2.present();
                      }, error => {
              
                      });
                    } else {
                      this.auth.plinicShopAddPoint(this.userData.email, 100, '피부 측정').subscribe(data2 => {
                        console.log("플리닉샵 포인트 누적 : " + data2);
                      }, error => {
                        console.log("플리닉샵 포인트 누적 에러 발생 : " + error);
                      });
                      this.auth.skinReportUpdate(this.userData.email, skinreport).subscribe(data => {
                        this.isMainLoading = false;
                        this.isSubLoading = false;
  
                        let alert2 = this.alertCtrl.create({
                          cssClass: 'push_alert_cancel2',
                          title: '피부 측정이 완료되었습니다',
                          message: "100P가 적립 되었습니다.",
                          buttons: [{
                            text: '포인트 적립 확인', 
                              handler: () => {
                                this.navCtrl.setRoot(TabsPage).then(() => {
                                  let myModal = this.modalCtrl.create(PointLogPage);
                                    myModal.onDidDismiss(data => {
                                    });
                                    myModal.present();
                                });
                              }
                            },
                            {
                              text: '피부리포트 확인',
                              handler: () => {
                                this.navCtrl.parent.select(4);
                              }
                            }]
                        });
                        alert2.present();
                      }, error => {
  
                      });
                    }
                  }
                }
              }, error => {
                //에러 처리
              });

                // this.isMainLoading = false;
                // this.isSubLoading = false;

                // let alert2 = this.alertCtrl.create({
                //   cssClass: 'push_alert_cancel2',
                //   title: '피부 측정이 완료되었습니다',
                //   message: "100P가 적립 되었습니다.",
                //   buttons: [{
                //     text: '포인트 적립 확인', 
                //       handler: () => {
                //         this.navCtrl.setRoot(TabsPage).then(() => {
                //           let myModal = this.modalCtrl.create(PointLogPage);
                //             myModal.onDidDismiss(data => {
                //             });
                //             myModal.present();
                //         });
                //       }
                //     },
                //     {
                //       text: '피부리포트 확인',
                //       handler: () => {
                //         this.navCtrl.parent.select(4);
                //       }
                //     }]
                // });
                // alert2.present();
            },error => {
              alert("에러 발생");
            });
          } else if (this.step ==='first_update') { //비교 이미지 변경할때 필요한 기능 정의 필요
            this.auth.cameraTest(this.camerafile, this.camerafile2, this.userData, this.diagnose_score).then(data => {
              // if (!data) {
              if(data) {
                this.result1 = data.result1;
                this.result2 = data.result2;
                console.log("실제 데이터는? : " + JSON.stringify(data));
              }          
                // this.loading.dismiss();////////////////////
                this.isMainLoading = false;
                this.isSubLoading = false;

                if(data) {
                  this.auth.updateSkinAnaly(this.result1, this.result2, this.ageRange, this.userData, this.diagnose_score).subscribe(data2 => {
                    console.log("데이터 저장 완료")

                  }, error => {
                    console.log("데이터 저장 완료")
                  })
                }
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert_cancel2',
                  title: '최초 측정이 변경되었습니다',
                  message: "최초 이미지가 변경되었습니다",

                  buttons: [{
                    text: '임시테스트',
                      handler: () => {
                        this.navCtrl.setRoot(TabsPage).then(() => {
                          let myModal = this.modalCtrl.create(PointLogPage);
                            myModal.onDidDismiss(data3 => {
                            });
                            myModal.present();
                        });
                      }
                    },
                    {
                      text: '피부리포트 확인',  
                      handler: () => {
                        this.navCtrl.parent.select(4);
                      }
                    }]
                });
                alert2.present();
            });
          }
        }, 10000);
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

  goToReport () {
    this.navCtrl.parent.select(4);
  }

  getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset()*60000).toISOString()
  }

}
