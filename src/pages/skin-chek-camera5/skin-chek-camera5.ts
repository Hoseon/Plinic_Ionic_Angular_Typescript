import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform, AlertController, ModalController, App} from "ionic-angular";
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { TabsPage } from '../tabs/tabs';
import { PointLogPage } from '../point-log/point-log';


declare var cordova: any;



/**
 * Generated class for the SkinChekCamera3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-skin-chek-camera5",
  templateUrl: "skin-chek-camera5.html",
})
export class SkinChekCamera5Page {
  file1: any;
  file2: any;
  isSubLoading = false;
  userData: any;
  diagnose_score: any;
  isSkinAnaly: boolean = false;
  isMainLoading: boolean = false;
  cameraCountShutdown: any;
  cameraTimer: any;
  step: any;
  result1: any;
  result2: any;
  ageRange: any;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    private transfer: Transfer,
    public auth: AuthService,
    public images: ImagesProvider,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public app: App,
  ) {
    if (this.navParams.get("file1")) {
      this.file1 = this.navParams.get("file1");
    }

    if (this.navParams.get("file2")) {
      this.file2 = this.navParams.get("file2");
    }

    if (this.navParams.get("userData")) {
      this.userData = this.navParams.get("userData");
    }

    if (this.navParams.get("diagnose_score")) {
      this.diagnose_score = this.navParams.get("diagnose_score");
    }

    if (this.navParams.get("ageRange")) {
      this.ageRange = this.navParams.get("ageRange");
    }

    if (this.navParams.get("step")) {
      this.step = this.navParams.get("step");
    }

    console.log("file1의 경로 : " + this.file1);
    console.log("file2의 경로 : " + this.file2);
    console.log("userData 경로 : " + this.userData);
    console.log("diagnose_score 경로 : " + this.diagnose_score);
    console.log("ageRange 경로 : " + this.ageRange);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SkinChekCamera5Page");
    this.camera2();
  }

  public async camera2() {
    // this.showLoading();
    this.isSkinAnaly = true;
    this.isMainLoading = true;
    this.isSubLoading = true;
    
    if(this.userData && this.file1 !== "" && this.file2 !== "") {
      console.log("11111111111111");
      // this.showLoading();
      setTimeout(() => {
        if(this.step ==='first') {
          this.auth.cameraTest(this.file1, this.file2, this.userData, this.diagnose_score).then(data => {
            // if (!data) {
            if(data) {
              this.result1 = data.result1;
              this.result2 = data.result2;
              console.log("실제 데이터는? : " + JSON.stringify(data));
            }          
              // this.loading.dismiss();////////////////////
              this.isMainLoading = false;
              this.isSubLoading = false;

              if(data.result1 && data.result2) {
                console.log("데이터는 넘어 왔는가?");
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
                        // this.auth.plinicShopAddPoint(this.userData.snsid, 100, '피부진단').subscribe(data4 => {
                        //   console.log("플리닉샵 포인트 누적 : " + data4);
                        // }, error => {
                        //   console.log("플리닉샵 포인트 누적 에러 발생 : " + error);
                        // });
                        this.auth.skinReportUpdate(this.userData.email, skinreport).subscribe(data5 => {
                          console.log("Skin-Chek-Camera2 : skinReportUpdate 포인트 누적 완료")
                        }, error => {
                
                        });
                      } else {
                        // this.auth.plinicShopAddPoint(this.userData.email, 100, '피부진단').subscribe(data4 => {
                        //   console.log("플리닉샵 포인트 누적 : " + data4);
                        // }, error => {
                        //   console.log("플리닉샵 포인트 누적 에러 발생 : " + error);
                        // });
                        this.auth.skinReportUpdate(this.userData.email, skinreport).subscribe(data5 => {
                          console.log("Skin-Chek-Camera2 : skinReportUpdate 포인트 누적 완료")
                        }, error => {

                        });
                      }
                    }

                    let alert2 = this.alertCtrl.create({
                      cssClass: 'push_alert_cancel2',
                      title: '피부 측정이 완료되었습니다',
                      message: "100P가 적립 되었습니다.",
                      enableBackdropDismiss: true,
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
                    alert2.onDidDismiss(()=>{
                      this.navCtrl.parent.select(4);
                    });
                    alert2.present();

                  }, error => {
                    //에러 처리
                    let alert2 = this.alertCtrl.create({
                      cssClass: 'push_alert_cancel2',
                      title: '피부 분석에 실패했습니다',
                      message: "측정한 이미지가 정확하지 않거나<br>인터넷 연결상태가 고르지 못합니다",
                      enableBackdropDismiss: true,
                      buttons: [{
                        text: '다시 측정하기',
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
                          text: '피부리포트 첫화면 가기',  
                          handler: () => {
                            this.navCtrl.parent.select(4);
                          }
                        }]
                    });
                    alert2.onDidDismiss(()=>{
                      this.navCtrl.parent.select(4);
                    });
                    alert2.present();
                  });

                }, error => {
                  console.log("데이터 저장 완료")
                })
              } else {
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert_cancel2',
                  title: '피부 분석에 실패했습니다',
                  message: "측정한 이미지가 정확하지 않거나<br>인터넷 연결상태가 고르지 못합니다",
                  enableBackdropDismiss: true,
                  buttons: [{
                    text: '다시 측정하기',
                      handler: () => {
                        this.navCtrl.parent.select(4);
                      }
                    },
                    {
                      text: '피부리포트 첫화면 가기',  
                      handler: () => {
                        this.navCtrl.parent.select(4);
                      }
                    }]
                });
                alert2.onDidDismiss(()=>{
                  this.navCtrl.parent.select(4);
                });
                alert2.present();
              }
          });
        } else if (this.step ==='second') {
          console.log("222222222222222");
          this.auth.skinAnalySecondSave(this.file1, this.file1, this.userData, this.step, this.diagnose_score).then(data => {
          console.log("333333333333333");
            if(data) { //피부 측정 성공시 
              this.images.getCheckSkinReport(this.userData.email).subscribe(data2 => {
          console.log("44444444444");
                var skinreport = {
                  isreport : true,
                  updatedAt : new Date()
                }
                if(data2 === null) {
                  //사용자가 처음 등록한 사용자라면 무조건 세이브 처리 해준다.
                  if(this.userData.from === 'naver' || this.userData.from === 'kakao' || this.userData.from === 'google') { //sns회원인지 구분
                    this.auth.plinicShopAddPoint(this.userData.email, 100, '피부진단').subscribe(data3 => {
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
                        enableBackdropDismiss: true,
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
                      alert2.onDidDismiss(()=>{
                        this.navCtrl.parent.select(4);
                      });
                      alert2.present();
                    }, error => {
            
                    });
                  } else {
                    this.auth.plinicShopAddPoint(this.userData.email, 100, '피부진단').subscribe(data2 => {
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
                        enableBackdropDismiss: true,
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
                      alert2.onDidDismiss(()=>{
                        this.navCtrl.parent.select(4);
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
                      enableBackdropDismiss: true,
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
                    alert2.onDidDismiss(()=>{
                      this.navCtrl.parent.select(4);
                    });
                    alert2.present();
                  } else if (data) {
                    //날짜가 같지 않을댄 누적을 한다.
                    if(this.userData.from === 'naver' || this.userData.from === 'kakao' || this.userData.from === 'google') { //sns회원인지 구분
                      this.auth.plinicShopAddPoint(this.userData.email, 100, '피부진단').subscribe(data2 => {
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
                          enableBackdropDismiss: true,
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
                        alert2.onDidDismiss(()=>{
                          this.navCtrl.parent.select(4);
                        });
                        alert2.present();
                      }, error => {
              
                      });
                    } else {
                      this.auth.plinicShopAddPoint(this.userData.email, 100, '피부진단').subscribe(data2 => {
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
                          enableBackdropDismiss: true,
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
                        alert2.onDidDismiss(()=>{
                          this.navCtrl.parent.select(4);
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
            } else { //피부 측정 실패시
              let alert2 = this.alertCtrl.create({
                cssClass: 'push_alert_cancel2',
                title: '피부 분석에 <span class="red_text">실패</div>했습니다',
                message: "측정한 이미지가 정확하지 않거나<br>인터넷 연결상태가 고르지 못합니다",
                enableBackdropDismiss: true,
                buttons: [{
                  text: '다시 측정하기',
                    handler: () => {
                      this.navCtrl.parent.select(4);
                    }
                  },
                  {
                    text: '피부리포트 첫화면 가기',  
                    handler: () => {
                      this.navCtrl.parent.select(4);
                    }
                  }]
              });
              alert2.onDidDismiss(()=>{
                this.navCtrl.parent.select(4);
              });
              alert2.present();
            }
          },error => {
            let alert2 = this.alertCtrl.create({
              cssClass: 'push_alert_cancel2',
              title: '피부 분석에 실패했습니다',
              message: "측정한 이미지가 정확하지 않거나<br>인터넷 연결상태가 고르지 못합니다",
              enableBackdropDismiss: true,
              buttons: [{
                text: '다시 측정하기',
                  handler: () => {
                    this.navCtrl.parent.select(4);
                  }
                },
                {
                  text: '피부리포트 첫화면 가기',  
                  handler: () => {
                    this.navCtrl.parent.select(4);
                  }
                }]
            });
            alert2.onDidDismiss(()=>{
              this.navCtrl.parent.select(4);
            });
            alert2.present();
          });
        } else if (this.step ==='first_update') { //비교 이미지 변경할때 필요한 기능 정의 필요
          this.auth.cameraTest(this.file1, this.file2, this.userData, this.diagnose_score).then(data => {
            // if (!data) {
            if(data) {
              this.result1 = data.result1;
              this.result2 = data.result2;
              console.log("실제 데이터는? : " + JSON.stringify(data));
            }          
              this.isMainLoading = false;
              this.isSubLoading = false;
              if(data.result1 && data.result2) {
                this.auth.updateSkinAnaly(this.result1, this.result2, this.ageRange, this.userData, this.diagnose_score).subscribe(data2 => {
                  let alert2 = this.alertCtrl.create({
                    cssClass: 'push_alert_cancel2',
                    title: '최초 측정이 변경되었습니다',
                    message: "최초 이미지가 변경되었습니다",
                    enableBackdropDismiss: true,
                    buttons: [{
                      text: '포인트 확인가기',
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
                  alert2.onDidDismiss(()=>{
                    this.navCtrl.parent.select(4);
                  });
                  alert2.present();


                }, error => {
                  let alert2 = this.alertCtrl.create({
                    cssClass: 'push_alert_cancel2',
                    title: '피부 분석에 실패했습니다',
                    message: "측정한 이미지가 정확하지 않거나<br>인터넷 연결상태가 고르지 못합니다",
                    enableBackdropDismiss: true,
                    buttons: [{
                      text: '다시 측정하기',
                        handler: () => {
                          this.navCtrl.parent.select(4);
                        }
                      },
                      {
                        text: '피부리포트 첫화면 가기',  
                        handler: () => {
                          this.navCtrl.parent.select(4);
                        }
                      }]
                  });
                  alert2.onDidDismiss(()=>{
                    this.navCtrl.parent.select(4);
                  });
                  alert2.present();
                })
              } else {
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert_cancel2',
                  title: '피부 분석에 실패했습니다',
                  message: "측정한 이미지가 정확하지 않거나<br>인터넷 연결상태가 고르지 못합니다",
                  enableBackdropDismiss: true,
                  buttons: [{
                    text: '다시 측정하기',
                      handler: () => {
                        this.navCtrl.parent.select(4);
                      }
                    },
                    {
                      text: '피부리포트 첫화면 가기',  
                      handler: () => {
                        this.navCtrl.parent.select(4);
                      }
                    }]
                });
                alert2.onDidDismiss(()=>{
                  this.navCtrl.parent.select(4);
                });
                alert2.present();
              }
          });
        }
      }, 1000);
    } else {
      let alert2 = this.alertCtrl.create({
        cssClass: 'push_alert',
        title: '알림',
        message: "사진 촬영이 실패 했습니다!!",
        enableBackdropDismiss: true,
        buttons: [
          {
            text: '확인',
            handler: () => {
            }
          }
        ]
      });
      alert2.onDidDismiss(()=>{
        this.navCtrl.parent.select(4);
      });
      alert2.present();
    }

  }

  getAgeRange() {
    var age = 0;
    var age_range = '';
    age = Number(new Date().getFullYear()) - Number(this.userData.birthday.substr(0,4)) + 1 ;
    this.ageRange = String(age).substr(0,1) + '0';
  }

  getCovertKoreaTime(time) {
    return new Date(new Date(time).getTime() - new Date().getTimezoneOffset()*60000).toISOString()
  }


}
