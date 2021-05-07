import { Component, Input, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController, IonicApp, ToastController, AlertController } from 'ionic-angular';
// import { SuccessHomePage } from '../success-home/success-home';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing';

import { BLE } from '@ionic-native/ble';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { MyinfoPage } from '../myinfo/myinfo';

/**
 * Generated class for the DeviceSkinIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//Blue Mod S42
// const PLINIC_SERVICE = 'FEFB';
// const UUID_SERVICE = 'FEFB';
// const SWITCH_CHARACTERISTIC = '00000002-0000-1000-8000-008025000000';



// "디바이스 서비스 정보 :
// {"name":"BM + S42 E6C","id":"00: 80: 25: E7: 3E: 6C","advertising":{},"rssi":-64,
// "services":["1800","1801","180a","fefb"],
//  "characteristics":[
//   {"service":"1800","characteristic":"2a00","properties":["Read"]},
//   {"service":"1800","characteristic":"2a01","properties":["Read"]},
//   {"service":"1800","characteristic":"2a04","properties":["Read"]},
//   {"service":"1800","characteristic":"2aa6","properties":["Read"]},
//   {"service":"1801","characteristic":"2a05","properties":["Indicate"],"descriptors":[{"uuid":"2902"}]},
//   {"service":"180a","characteristic":"2a50","properties":["Read"]},
//   {"service":"fefb","characteristic":"00000009 - 0000 - 1000 - 8000 - 008025000000","properties":["Write"]},
//   {"service":"fefb","characteristic":"0000000a - 0000 - 1000 - 8000 - 008025000000","properties":["Indicate"],"descriptors":[{"uuid":"2902"}]},
//   {"service":"fefb","characteristic":"00000001 - 0000 - 1000 - 8000 - 008025000000","properties":["WriteWithoutResponse"]},
//   {"service":"fefb","characteristic":"00000002 - 0000 - 1000 - 8000 - 008025000000","properties":["Notify"],"descriptors":[{"uuid":"2902"}]},
//   {"service":"fefb","characteristic":"00000003 - 0000 - 1000 - 8000 - 008025000000","properties":["Write"]},
//   {"service":"fefb","characteristic":"00000004 - 0000 - 1000 - 8000 - 008025000000","properties":["Indicate"],"descriptors":[{"uuid":"2902"}]}]}",


// { "characteristics": [{ "properties": ["Read"], "isNotifying": false, "characteristic": "2A50", "service": "180A" },
// { "properties": ["Write"], "isNotifying": false, "characteristic": "00000009-0000-1000-8000-008025000000", "service": "FEFB" },
// { "properties": ["Indicate"], "isNotifying": false, "characteristic": "0000000A-0000-1000-8000-008025000000", "service": "FEFB" },
// { "properties": ["WriteWithoutResponse"], "isNotifying": false, "characteristic": "00000001-0000-1000-8000-008025000000", "service": "FEFB" },
// { "properties": ["Notify"], "isNotifying": false, "characteristic": "00000002-0000-1000-8000-008025000000", "service": "FEFB" },
// { "properties": ["Write"], "isNotifying": false, "characteristic": "00000003-0000-1000-8000-008025000000", "service": "FEFB" },
// { "properties": ["Indicate"], "isNotifying": false, "characteristic": "00000004-0000-1000-8000-008025000000", "service": "FEFB" }],
// "id": "3109E61F-A1BB-5BB3-08CE-99E3A83487D6",
// "rssi": -68,
// "advertising": { "kCBAdvDataLocalName": "BM+S42 347", "kCBAdvDataManufacturerData": { }, "kCBAdvDataServiceUUIDs": ["FEFB"], "kCBAdvDataIsConnectable": 1 },
// "name": "BM+S42 347",
// "services": ["180A", "FEFB"] }
//


// const SWITCH_CHARACTERISTIC = 'FF01';
//
//
// UUID:1800  (Generic Access Service)
// UUID:1801  (Terminal I/O Service, TIO)
// UUID:180A  (Environmental Sensing Service, ESS)
// UUID:FEFB  (device Information Service, DIS)

// //HM Soft Bluetooth Mod
const PLINIC_SERVICE = 'FFE0';
const UUID_SERVICE = 'FFE0';
const SWITCH_CHARACTERISTIC = 'FFE1';


// { "characteristics": [{ "properties": ["Read", "WriteWithoutResponse", "Write", "Notify"], "isNotifying": false, "characteristic": "FFE1", "service": "FFE0" }],
// "id": "AAA346CC-CC32-A521-5489-EA4833037CE9",
// "rssi": -59,
// "advertising": { "kCBAdvDataIsConnectable": 1, "kCBAdvDataLocalName": "HMSoft", "kCBAdvDataServiceUUIDs": ["FFE0"], "kCBAdvDataServiceData": { "B000": { } }, "kCBAdvDataTxPowerLevel": 0, "kCBAdvDataManufacturerData": { } },
// "name": "HMSoft",
// "services": ["FFE0"] }



@IonicPage()
@Component({
  selector: 'page-device-skin-ing',
  templateUrl: 'device-skin-ing.html',
})
export class DeviceSkinIngPage {

  spintime: any = 0;
  home: any;
  device: any;
  seconds: number;
  secondsRemaining: number = 1;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string = '';
  displayTimeFromDevice: string = '';
  displayTime2: Observable<any>;
  step: any = '1단계';
  stepdesc: any = '좌측 볼 마사지(1분)';
  desc: any = '원을 그리듯 아래에서 위로 마사지해주세요.';
  // step: any = '0단계';
  // stepdesc: any = '화장품 도포';
  // desc: any = '사용하시는 화장품을 골구로 넉넉하게 도포하세요.';
  anipoint: boolean = true;
  // anipoint: boolean = false;
  animpoint: any = "anim-point";
  peripheral: any = {};
  carezoneData: any;
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  currentDate: Date = new Date();
  @Input() timeInSeconds: number;
  subscriptionFourth: any;
  updateId: any;
  videoUrl: any;
  mode: any;
  intervalCheck: any;
  data16: any; //BLE Notifi로 받아 오는 정보 확인 필요
  data0: any; //BLE 첫번째~여덟번째 자리 데이터 8비트 데이터 전송에 필요한 변수 선언
  data1: any;
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  data6: any;
  data7: any;
  case1FailCount: number = 0; //Start와 end 의 값이 정확하지 않을때 실패 간주 처리 하며 3회 누적시 하드웨어 오류로 종료 처리.
  case2FailCount: number = 0; //CheckSum의 데이터가 맞지 않을때 3회 누적시 하드웨어 오류로 종료 처리
  useTime: any;
  useTimeCount: number = 0;

  testData: Array<any> = new Array<any>();
  isBatteryLow: boolean = false;
  btnDisabled: boolean = false;

  constructor(private images: ImagesProvider, private auth: AuthService, private alertCtrl: AlertController, private ble: BLE, public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public modalCtrl: ModalController,
    public viewCtrl: ViewController, public ionicApp: IonicApp, public toastCtrl: ToastController, public zone: NgZone) {

    this.platform.ready().then((readySource) => {

      this.loadItems();

      if (this.navParams.get('carezoneData')) {
        this.carezoneData = this.navParams.get('carezoneData');
      }

      if (this.navParams.get('mode')) {
        this.mode = this.navParams.get('mode');
      }

      // if (this.navParams.get('device')) {
      //   this.device = this.navParams.get('device');
      //   this.deviceSelected(this.device);
      // }
      // setTimeout(() => {
      this.startTimer();
      // }, 1000)
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DeviceSkinIngPage');
  }

  ionViewDidLeave() {
    // this.device_disconnect();
  }

  ionViewWillEnter(){
    this.randomUrl();
    this.androidBackButton();
  }

  ionViewWillLeave(){
    this.ble.isConnected(this.device.id).then(
      () => { 
        this.ble.disconnect(this.device.id).then(() => {
          console.log("커넥션 종료");
        });
      },
      () => {
        console.log("화면 빠져나가며서 BLE 연결해제")
      }
    );
  }

  ionViewDidEnter() {
    console.log("케어모드 : 세번째 블루투스 로딩");
    if (this.navParams.get('device')) {
      console.log("케어모드 : 두번재 블루투스 로딩");
      this.device = this.navParams.get('device');
      this.deviceSelected(this.device);
    }
    // this.auth.getmissionPoint(this.carezoneData._id, this.userData.email).subscribe(data => {
    //   // console.log("현재 날짜 : " + this.currentDate.getFullYear() + '-' + this.currentDate.getMonth() + '-' + this.currentDate.getDate());
    //   // console.log("데이터 날짜 : " + new Date(data.usedmission[0].updatedAt).getFullYear() + '-' + new Date(data.usedmission[0].updatedAt).getMonth() + '-' + new Date(data.usedmission[0].updatedAt).getDate());
    //   // console.log("data : " + JSON.stringify(data));
    // }, error => {
    //   console.log("error : " + error);
    // });
  }

  cancel() {
    this.navCtrl.pop();
  }


  cancel_home() {
    this.device_disconnect();
    this.navCtrl.setRoot('TabsPage');
  }

  device_disconnect() {
    this.runTimer = false;
    // console.log("device skin ing Device id : " + this.device.id);
    // setTimeout(() => {
    // this.spintime = 1;
    // this.navCtrl.setRoot(TabsPage);
    this.ble.disconnect(this.device.id).then(result => {
      if (this.navParams.get('carezoneData')) {
        // this.pointUpdate(); 2020-02-10 챌린지 2주차 기능 추가로 사용중단
        this.challengeUpdate();
      } else {
        this.userTimeUpdate();
      }
    }, error => {
      if (this.navParams.get('carezoneData')) {
        // this.pointUpdate(); 2020-02-10 챌린지 2주차 기능 추가로 사용중단
        this.challengeUpdate();
      } else {
        this.userTimeUpdate();
      }
    })
  }

  deviceFail_disconnect() {
    this.runTimer = false;
    this.ble.disconnect(this.device.id).then(result => {
      if (this.navParams.get('carezoneData')) {
        // this.pointUpdate(); 2020-02-10 챌린지 2주차 기능 추가로 사용중단
        // this.challengeUpdate();
      } else {
        // this.userTimeUpdate();
      }
    }, error => {
      if (this.navParams.get('carezoneData')) {
        // this.pointUpdate(); 2020-02-10 챌린지 2주차 기능 추가로 사용중단
        // this.challengeUpdate();
      } else {
        // this.userTimeUpdate();
      }
    })
  }

  deviceSelected(device) {
    // 2021-04-13 --------------------------------------------- //
    this.ble.connect(device.id).subscribe(
      data => {
      this.ble.startNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
            this.zone.run(
              () => {
                // this.scanStatus = "커넥션 성공";
                this.data16 = new Uint8Array(buffer);
                this.data0 = this.data16[0].toString();
                this.data1 = this.data16[1].toString();
                this.data2 = this.data16[2].toString();
                this.data3 = this.data16[3].toString();
                this.data4 = this.data16[4].toString();
                this.data5 = this.data16[5].toString();
                this.data6 = this.data16[6].toString();
                this.data7 = this.data16[7].toString();

                // this.testData[0] = this.data0;
                // this.testData[1] = this.data1;
                // this.testData[2] = this.data2;
                // this.testData[3] = this.data3;
                // this.testData[4] = this.data4;
                // this.testData[5] = this.data5;
                // this.testData[6] = this.data6;
                // this.testData[7] = this.data7;
                // console.log(this.testData);

                //2021-04-13 여기에 데이터 로직 적용
                //0번째, 7번째의 데이터가 0번째 = 
                if (this.data5 === '0') { //종료 처리를 받으면 무조건 종료 처리
                  console.log("정상 종료처리(0) 됨");
                  //종료되기전 299초만 처리 되기 때문에 종료처리일때 숫자를 한번 여기서 처리 해준다
                  this.useTime = this.data2 + this.data3 + this.data4;
                  if (this.useTime !== '000') {
                    this.useTimeCount = Number(this.useTime);  
                  }
                  
                  this.ble.disconnect(device.id).then(data => {
                    if (this.navParams.get('carezoneData')) {
                      this.challengeUpdate();
                    } else {
                      this.userTimeUpdate();
                    }  
                  }, error => {
                    this.bleshowAlert("블루투스 연결해제#01", "블루투스가 종료되었습니다.<br>케어 포인트는 자동으로 적립되었습니다.");
                    this.deviceFail_disconnect();
                  })
                } else { // 종료처리가 아니면 데이터 검증 필요
                  if (this.data5 === '2') { // 배터리가 부족할 경우 화면에 배터리 낮다는 표현을 한다.
                    this.isBatteryLow = true;
                  }
                  this.useTime = this.data2 + this.data3 + this.data4;
                  this.useTimeCount = Number(this.useTime);
                  if (this.data0 === '2' && this.data7 === '3') {
                    if ( Number(this.data0) + Number(this.data1) + Number(this.data2) + Number(this.data3) + Number(this.data4) + Number(this.data5) == Number(this.data6) ) {
                      this.case2FailCount = 0;
                    } else {
                      this.case2FailCount += 1;
                      console.log("CheckSum Error : " + this.case2FailCount);
                      if (Number(this.case2FailCount) == 2) {
                        this.showAlert('블루투스 종료(code#01)', '포인트가 적립되지 않았습니다.<br>앱과 기기를 종료 후 다시 시도해주세요');
                        this.deviceFail_disconnect();
                      }
                    }
                    this.case1FailCount = 0;
                    this.displayTimeFromDevice = this.getSecondsAsDigitalClock(this.useTimeCount);
                  } else {
                    this.case1FailCount += 1;
                    console.log("Start/End Error : " + this.case1FailCount);
                    if (Number(this.case1FailCount) == 2) {
                      this.showAlert('블루투스 종료(code#02)', '포인트가 적립되지 않았습니다.<br>앱과 기기를 종료 후 다시 시도해주세요.');
                      this.deviceFail_disconnect();
                    }
                  }
                }
              });
      }, notiError => {
          //사용자가 전월 꺼서 of
          // this.bleshowAlert("데이터 에러", "블루투스로 부터 데이터 수신에러<br>기기 점검 필요");
          // console.log("BLE 강제 연결 해제- HW확인 필요");
          // console.log(JSON.stringify(notiError));
          // this.scanStatus = "BLE 비정상 연결해제";
          });
      },
      disconnect => {
        if (this.data5 === '0') {
          console.log("BLE 종료 후 오류 disconnect----");
          // this.bleshowAlert("블루투스 연결 해제", "블루투스가 종료되었습니다.<br>케어 포인트는 자동으로 적립되었습니다.");
          if (this.navParams.get('carezoneData')) {
            this.challengeUpdateCase2(); //비정상적인 종료 처리가 챌린지 시간이 누적될수 있도록 해준다. 2021-04-20
          } else {
            this.userTimeUpdateCase2(); //비정상적인 종료 처리가 되도 포인트가 누적될수 있도록 해준다. 2021-04-20
          }    
        } else {
          console.log("BLE 오류 disconnect----");
          this.bleshowAlert("블루투스 연결해제#02", "블루투스가 종료되었습니다.<br>케어 포인트는 자동으로 적립되었습니다.");
          if (this.navParams.get('carezoneData')) {
            this.challengeUpdateCase2(); //비정상적인 종료 처리가 챌린지 시간이 누적될수 있도록 해준다. 2021-04-20
          } else {
            this.userTimeUpdateCase2(); //비정상적인 종료 처리가 되도 포인트가 누적될수 있도록 해준다. 2021-04-20
          }
        }
      
    });
    // ----------------------------------------------------- //


    // // ---------------2020-01-20 버전 유수분,케어모드 두가지 존재 하는-----------------------------------------------
    // this.ble.startScan([PLINIC_SERVICE]).subscribe(
    //   device => {
    //     this.ble.stopScan();
    //     this.ble.connect(this.device.id).subscribe(
    //       peripheral => {
    //         this.intervalCheck = setInterval(() => {
    //           console.log("커넥션이 정상적");
    //           let value = 1234;
    //           let buffer = new Uint8Array([value]).buffer;
    //           this.ble.write(this.device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC, buffer).then(result => {
    //               console.log("BLE 쓰기 성공");
    //               console.log(JSON.stringify(result));
    //           }, e => {
    //               console.log("BLE 쓰기 실패");
    //               console.log(JSON.stringify(e));
    //             }
    //           );  
    //         }, 60000);
    //         this.onConnected(peripheral);
    //       },
    //       peripheral => { //디바이스 연결 중단되면 누적 처리 후 종료
    //         console.log("커넥션이 종료처리 됨");
    //         clearInterval(this.intervalCheck);
    //         if (this.navParams.get('carezoneData')) {
    //         this.challengeUpdate();
    //         } else {
    //           this.userTimeUpdate();
    //         }
    //       }, 
    //     );
    //   });
  }

  onConnected(peripheral) {

    // console.log("디바이스 서비스 정보 : " + JSON.stringify(peripheral));
    
    //2021-04-01 잠시 주석 처리
    // this.ble.startNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
    //   // console.log("1234");
    // })


    // this.peripheral = peripheral;
    // var service_UUID = '1801';
    // var char_UUID = '2902';
    //
    // var read_UUID = '180a';
    // var read_char_UUID ='2a50';

    // console.log("---------------------------------노티피 시작 ------------------------------------------------");
    // var i = 0;
    // this.ble.startNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
    //   // console.log("그냥 버퍼 " + String.fromCharCode.apply(null, buffer));
    //   // console.log(this.stringToBytes(buffer));
    //   // console.log("Plinic G1Partners Notifi 8 " +  String.fromCharCode(parseInt(buffer,16)));
    //   // console.log("Plinic G1Partners Notifi 8 " +  String.fromCharCode.apply(null, new Uint8Array(buffer)));
    //   // console.log("Plinic G1Partners Notifi 16 " + String.fromCharCode.apply(null, new Uint16Array(buffer)));
    //   // console.log("Plinic G1Partners Notifi 32 " + String.fromCharCode.apply(null, new Uint32Array(buffer)));
    //   // console.log("Plinic G1Partners Notifi Uint8ClampedArray " + String.fromCharCode.apply(null, new Uint8ClampedArray(buffer)));
    //   // console.log("Plinic G1Partners Notifi 8 " + String.fromCharCode.apply(null, new Int8Array(buffer)));
    //   // console.log("Plinic G1Partners Notifi 16 " + String.fromCharCode.apply(null, new Int16Array(buffer)));
    //   // console.log("Plinic G1Partners Notifi 32 " + String.fromCharCode.apply(null, new Int32Array(buffer)));
    //
    //   console.log("Plinic G1Partners Notifi 8 " + new Uint8Array(buffer));
    //   var data2 = new Uint8Array(buffer);
    //   var data3 = '';
    //   var data16 = '';
    //   console.log(data2[3], data2[4]);
    //   console.log(data2[3].toString(16) + data2[4].toString(16));
    //   data16 = data2[3].toString(16) + data2[4].toString(16);
    //   data3  = '0x' + data16;
    //   console.log(data3);
    //   console.log(parseInt(data3, 16));
    //   console.log(i);
    //   i++;
    //   // console.log("data16 : " + parseInt(data16, 10));
    //
    //   // console.log("Plinic G1Partners Notifi 16 " + new Uint16Array(buffer));
    //   // console.log("Plinic G1Partners Notifi 32 " + new Uint32Array(buffer));
    //   // console.log("Plinic G1Partners Notifi 8 " + new Int8Array(buffer));
    //   // console.log("Plinic G1Partners Notifi 16 " + new Int16Array(buffer));
    //   // console.log("Plinic G1Partners Notifi 32 " + new Int32Array(buffer));
    //
    // }, error => {
    //   console.log("Notifi Error : " + error);
    // })
    // console.log("---------------------------------노티피 종료 ------------------------------------------------");
  }

  bleshowAlert(title, message) {
    this.runTimer = false;
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
    // this.viewCtrl.dismiss();
    // this.navCtrl.setRoot(CareZoneMissionIngPage);
    // this.navCtrl.parent.select(1);
    this.navCtrl.pop().then(() => this.navCtrl.pop().then(() => this.navCtrl.pop()));
    // this.navCtrl.remove(0, 5);

  }

  showAlert(title, message) {
    // this.runTimer = false;
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      // title: title,
      message: message,
      buttons: ['확인']
    });
    alert.present();
    // this.viewCtrl.dismiss();
    // this.navCtrl.setRoot(CareZoneMissionIngPage);
    // this.navCtrl.parent.select(1);
    // this.navCtrl.pop().then(() => this.navCtrl.pop());
    this.navCtrl.pop().then(() => this.navCtrl.pop().then(()=> this.navCtrl.pop()));
    // this.navCtrl.remove(0, 5);
  }

  showAlertwithCancel(title, message) {
    // this.runTimer = false;
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel2',
      title: title,
      message: message,
      buttons: [{
        text: '홈으로',
          handler: () => {
        // this.navCtrl.setRoot(TabsPage);
        this.viewCtrl.dismiss().then(() => this.navCtrl.setRoot(TabsPage));

          // this.viewCtrl.dismiss().then(() => this.viewCtrl.dismiss());
          console.log('홈으로 가기');
          }
        },
        {
          text: '마이페이지 확인',
          handler: () => {
          this.viewCtrl.dismiss().then(() => this.navCtrl.push(MyinfoPage));
          }
        }]
    });
    alert.present();
    this.navCtrl.pop().then(() => this.navCtrl.pop().then(()=> this.navCtrl.pop()));
  }

  showAlertwithCancelHome(title, message) {
    // this.runTimer = false;
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel2',
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: [{
        text: '홈으로',
          handler: () => {
        // this.navCtrl.setRoot(TabsPage);
        this.viewCtrl.dismiss().then(() => this.navCtrl.setRoot(TabsPage));

          // this.viewCtrl.dismiss().then(() => this.viewCtrl.dismiss());
          console.log('홈으로 가기');
          }
        },
        {
          text: '마이페이지 확인',
          handler: () => {
          this.viewCtrl.dismiss().then(() => this.navCtrl.push(MyinfoPage));
          }
        }]
    });
    alert.onDidDismiss(()=>{
      // this.viewCtrl.dismiss().then(() => this.navCtrl.setRoot(TabsPage));
    });
    alert.present();
    this.navCtrl.pop().then(() => this.navCtrl.pop().then(()=> this.navCtrl.pop()));
  }

  showAlertwithCancelMyinfo(title, message) {
    // this.runTimer = false;
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel2',
      title: title,
      message: message,
      buttons: [{
        text: '홈으로',
          handler: () => {
          this.viewCtrl.dismiss().then(() => this.navCtrl.setRoot(TabsPage));
          }
        },
        {
          text: '마이페이지 확인',
          handler: () => {
          this.viewCtrl.dismiss().then(() => this.navCtrl.pop());
          }
        }]
    });
    alert.present();
    this.navCtrl.pop().then(() => this.navCtrl.pop());
  }

  showAlertwithCancelChal(title, message) {
    // this.runTimer = false;
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel2',
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: [{
        text: '홈으로',
          handler: () => {
        // this.navCtrl.setRoot(TabsPage);
        this.viewCtrl.dismiss().then(() => this.navCtrl.setRoot(TabsPage));

          // this.viewCtrl.dismiss().then(() => this.viewCtrl.dismiss());
          console.log('홈으로 가기');
          }
        },
        {
          text: '챌린지 확인',
          handler: () => {
          // this.viewCtrl.dismiss().then(() => this.navCtrl.push(MyinfoPage));
          }
        }]
    });
    alert.present();
    this.navCtrl.pop().then(() => this.navCtrl.pop().then(()=> this.navCtrl.pop()));
  }


  initTimer() {
    if (!this.timeInSeconds) { this.timeInSeconds = 0; }

    // this.timer = <ITimer>{
    this.seconds = this.timeInSeconds,
      this.runTimer = false,
      this.hasStarted = false,
      this.hasFinished = false,
      this.secondsRemaining = this.timeInSeconds
    // };

    // this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);
  }

  startTimer() {
    this.hasStarted = true;
    this.runTimer = true;
    this.timerTick();
  }

  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    //------------------------------------ //
    // 2021-04-14 BLE 처리 로직 변경 대비
    this.subscriptionFourth = Observable.interval(1000).subscribe(x => {
      // this.secondsRemaining++;
      // this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);

      // if (this.displayTime === "00:00:00") {
      //   this.step = "0단계";
      //   this.stepdesc = "화장품 도포";
      //   this.desc = "사용하시는 화장품을 골구로 넉넉하게 도포하세요";
      // } else if (this.displayTime === "00:01:00") {
      //   this.step = "1단계";
      //   this.anipoint = true;
      //   this.animpoint = "anim-point";
      //   this.stepdesc = "좌측 볼 마사지(1분)";
      //   this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:02:00") {
      //   this.step = "2단계";
      //   this.animpoint = "anim-point2";
      //   this.stepdesc = "우측볼 마사지(1분)";
      //   this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:03:00") {
      //   this.step = "3단계";
      //   this.animpoint = "anim-point3";
      //   this.stepdesc = "이마 마사지(1분)";
      //   this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:04:00") {
      //   this.step = "4단계";
      //   this.animpoint = "anim-point4";
      //   this.stepdesc = "목 마사지(1분)";
      //   this.desc = "아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:05:00") {
      //   this.device_disconnect();
      //   this.step = "5단계";
      //   this.animpoint = "anim-point5";
      //   this.stepdesc = "V라인 리프팅";
      //   this.desc = "아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:06:00") {
      //   this.device_disconnect();
      // }
    });



  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
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
          totaluserpoint: items.totaluserpoint,
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
          totaluserpoint: items.totaluserpoint,
        };
      }
    });
  }


  device_canceldisconnect() {
    this.btnDisabled = true;
    this.runTimer = false;

    if (this.platform.is('cordova')) {
      this.ble.disconnect(this.device.id).then(result => {
        if (this.navParams.get('carezoneData')) {
          // this.pointUpdate(); 2020-02-10 챌린지 2주차 기능 추가로 사용중단
          this.challengeUpdate();
        } else {
          this.userTimeUpdate();
        }
      }, error => {
        console.log("취소하기 블루투스 연결해제 에러" + error);
        if (this.navParams.get('carezoneData')) {
          // this.pointUpdate(); 2020-02-10 챌린지 2주차 기능 추가로 사용중단
          this.challengeUpdate();
        } else {
          this.userTimeUpdate();
        }
      });
    } else {
      if (this.navParams.get('carezoneData')) {
          // this.pointUpdate(); 2020-02-10 챌린지 2주차 기능 추가로 사용중단
        this.challengeUpdate();
      } else {
        this.userTimeUpdate();
      }
    }

  }

  pointUpdate(): void {
    this.auth.missionPointUpdate(this.carezoneData._id, this.userData.email, this.secondsRemaining).subscribe(data => {
      this.subscriptionFourth.complete();
      this.showAlertwithCancel("플리닉 종료", JSON.stringify(data.msg).replace('"', '').replace('"', ''));
    }, error => {
      this.subscriptionFourth.complete();
      this.showAlertwithCancel("플리닉 종료", JSON.parse(error._body).msg);
    });
  }
  
  
  //2020-02-10 챌린지 기능 추가 챌린지에서 블루투스 사용후 적립 되는 부분
  challengeUpdate(): void {
    this.auth.challengeUpdate2(this.carezoneData._id, this.userData.email, this.useTimeCount).subscribe(data => {
      this.subscriptionFourth.complete();
      this.showAlertwithCancelChal("매일매일 사용하기", JSON.stringify(data.msg).replace('"', ''));
      // this.showAlert("플리닉 종료", JSON.stringify(data.msg).replace('"', ''));
    }, error => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.parse(error._body).msg);
    });
  }

  userTimeUpdate(): void {
    this.auth.userPointUpdate(this.userData.email, this.useTimeCount).subscribe(data => {
    // this.auth.userTimeUpdate(this.userData.email, this.secondsRemaining).subscribe(data => {
      this.subscriptionFourth.complete();
      if(this.mode === 'home') {
        this.showAlertwithCancelHome(JSON.stringify(data.point).replace('"', '').replace('"', ''), JSON.stringify(data.msg).replace('"', '').replace('"', ''));
      } else if (this.mode === 'myinfo') {
        this.showAlertwithCancelMyinfo(JSON.stringify(data.point).replace('"', '').replace('"', ''), JSON.stringify(data.msg).replace('"', '').replace('"', ''));
      }
    }, error => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.parse(error._body).msg);
    });
  }

  challengeUpdateCase2(): void {
    this.auth.challengeUpdate2(this.carezoneData._id, this.userData.email, this.useTimeCount).subscribe(data => {
      this.subscriptionFourth.complete();
    }, error => {
      this.subscriptionFourth.complete();
      console.log("플리닉 사용자 챌린지 시간 누적 업데이트");
    });
  }

  userTimeUpdateCase2(): void {
    this.auth.userPointUpdate(this.userData.email, this.useTimeCount).subscribe(data => {
      this.subscriptionFourth.complete();
    }, error => {
      this.subscriptionFourth.complete();
      console.log("플리닉 사용자 사용시간 누적 업데이트");
    });
  }

  userPlinicshopAddPoint(): void {
    this.auth.userPointUpdate(this.userData.email, this.secondsRemaining).subscribe(data => {
    // this.auth.userTimeUpdate(this.userData.email, this.secondsRemaining).subscribe(data => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.stringify(data.msg).replace('"', ''));
      // if(data) {
      //   this.auth.refreshUser(this.userData.email).subscribe(data2 => {
      //     console.log("포인트 업데이트 후 사용자 리프레쉬를 진행했나? : " + JSON.stringify(data2));
      //   });
      // }
    }, error => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.parse(error._body).msg);
    });
  }

  strtoarray(str) {
    var buf = new ArrayBuffer(20); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  // ASCII only
  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  // ASCII only
  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }


  private makeRandom(min, max) {
        var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandVal;
  }


  randomUrl() {
    var urlNo;
    urlNo = this.makeRandom(1,4);
    
    switch (urlNo) {
      //https://plinic.s3.ap-northeast-2.amazonaws.com/%5BVAP%5D210324_01.mp4 --> https://plinic.s3.ap-northeast-2.amazonaws.com/%5BVAP%5D210426_01_20210430.mp4
      //https://plinic.s3.ap-northeast-2.amazonaws.com/%5BVAP%5D210216_03.mp4 --> https://plinic.s3.ap-northeast-2.amazonaws.com/%5BVAP%5D210426_03_20210430.mp4
      //      
      case 1 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/%5BVAP%5D210426_01_20210430.mp4'; //2021-04-30 동영상 변경
               break;
      case 2 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/%5BVAP%5D210319_02.mp4';
               break;
      case 3: this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/%5BVAP%5D210426_03_20210430.mp4'; //2021-04-30 동영상 변경
               break;   
      case 4 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/%5BVAP%5D210304_04.mp4';
               break;   
      default : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/%5BVAP%5D210324_01.mp4';

      // case 1 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_guide_20200525.mp4';
      // // case 1 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_use_v1_720.mp4';
      //          break;
      // case 2 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/Plinic_SNS_Mini_Clipse_Ver02.mp4';
      //          break;
      // case 3 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_guide_20200525.mp4';
      //          break;   
      // case 4 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_eng.mp4';
      //          break;   
      // case 5 : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_clinic.mp4';
      //          break;   
      // default : this.videoUrl = 'https://plinic.s3.ap-northeast-2.amazonaws.com/plinic_guide_20200525.mp4';
    }
    console.log("현재 비디오 주소 : " + this.videoUrl);
  }

  //20201125 안드로이드 백 버튼 처리
  androidBackButton() {
    if(this.platform.is('android')) {
      this.platform.registerBackButtonAction(() => {
        this.ble.isConnected(this.device.id).then(
          () => { 
            this.ble.disconnect(this.device.id).then(() => {
              console.log("커넥션 종료");
              if (this.navParams.get('carezoneData')) {
                this.challengeUpdate();
              } else {
                this.userTimeUpdate();
              }
            });
          },
          () => {
            this.viewCtrl.dismiss();
          }
        );
      });
    }
  }

}
