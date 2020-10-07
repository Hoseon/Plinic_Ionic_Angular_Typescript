import { Component, Input } from '@angular/core';
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
  selector: 'page-device-skinsensor-ing',
  templateUrl: 'device-skinsensor-ing.html',
})
export class DeviceSkinSensorIngPage {

  spintime: any = 0;
  home: any;
  device: any;
  seconds: number;
  secondsRemaining: number = 1;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string = '';

  displayTime2: Observable<any>;

  step: any = '1단계';
  stepdesc: any = '좌측 볼 마사지(1분)';
  desc: any = '하단 막대가 모두 채워지도록 유수분 센서를 접촉해주세요.';

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

  result: Array<Number> = new Array<Number>();
  result2: Array<any> = new Array<any>();
  resultmoisture: any;

  notimeDate: Date = new Date();
  score: any;
  moisture: any;
  oil: any;

  percent: any = "0%";
  toggleToast: boolean = false;

  loadProgress: number = 0;

  isComplete: boolean = false;





  constructor(private images: ImagesProvider, private auth: AuthService, private alertCtrl: AlertController, private ble: BLE, public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public modalCtrl: ModalController,
    public viewCtrl: ViewController, public ionicApp: IonicApp, public toastCtrl: ToastController) {

    this.platform.ready().then((readySource) => {

      this.loadItems();

      if (this.navParams.get('carezoneData')) {
        this.carezoneData = this.navParams.get('carezoneData');
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
    this.device_canceldisconnect();
    // this.device_disconnect();
  }

  ionViewDidEnter() {
    if (this.navParams.get('device')) {
      // console.log("유수분 모드 측정 시작???");
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
    this.navCtrl.setRoot(TabsPage);
    this.ble.disconnect(this.device.id).then(result => {
      if (this.navParams.get('carezoneData')) {
        // this.pointUpdate();
      } else {
        // this.userTimeUpdate();
      }
    }, error => {
      if (this.navParams.get('carezoneData')) {
        // this.pointUpdate();
      } else {
        // this.userTimeUpdate();
      }
    })
  }

  deviceSelected(device) {
    this.ble.startScan([PLINIC_SERVICE]).subscribe(
      device => {
        console.log("스캔이 잘 되었는지?");
        this.ble.connect(this.device.id).subscribe(
          peripheral => {
            console.log("커넥션이 잘 되었는지??");
            // this.ble.refreshDeviceCache(device.id, 2000).then(result => {
            //   console.log("refresh sucess : " + result);
            //
            // }).catch(error => {
            //   console.log("refresh error : " + error);
            // });
            this.onConnected(peripheral);
          },
          // this.onConnected(peripheral),
          // peripheral => this.bleshowAlert('Disconnected', 'The peripheral unexpectedly disconnected')
          peripheral => { //디바이스 연결 중단되면 누적 처리 후 종료
            console.log("연결이 종료됨 유수분 측정");
            // this.bleshowAlert('Disconnected', '디바이스 연결이 중단 되었습니다.');
            if (this.navParams.get('carezoneData')) {
              // this.pointUpdate();
              this.navCtrl.pop().then(() => this.navCtrl.pop())
            } else {
              // this.userTimeUpdate();
              this.navCtrl.pop().then(() => this.navCtrl.pop())
            }
          }
        );
      }, error => {
        this.ble.stopScan().then(error=>{
          console.log("스킨센서 BLE 연동 대기 화면에서 스캔 종료 됨" + error);
        })
      });








    // this.ble.startNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
    //   console.log("Plinic G1Partners Notifi " + String.fromCharCode.apply(null, new Uint8Array(buffer)))
    // }, error => {
    //   console.log("Notifi Error : " + error);
    // })



    // this.startNotification();
  }

  onConnected(peripheral) {

    this.ble.stopScan().then(result=>{
      this.peripheral = peripheral;
    // console.log("---------------------------------노티피 시작 ------------------------------------------------");
    var i = 0;
    this.ble.startNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
      var data2 = new Uint8Array(buffer);
      var checkdata = data2[0].toString();
      // console.log("유수분 모드 인지? : " + checkdata);
      if (checkdata === '2') {
        // console.log("Plinic G1Partners Notifi 8 " + new Uint8Array(buffer));
        // var data2 = new Uint8Array(buffer);
        // console.log("data22222 : " + data2);
        var data3 = '';
        var data16 = '';
        // console.log(data2[3], data2[4]);
        // console.log(data2[3].toString(16) + data2[4].toString(16));
        data16 = data2[3].toString(16) + data2[4].toString(16);
        // console.log("data2[3].toString(16)" + data2[3].toString(16));
        // console.log("data2[4].toString(16)" + data2[4].toString(16));

        data3 = '0x' + data16;
        // console.log(data3);
        // console.log(parseInt(data3, 16));
        // console.log(i);
        // this.result[i] = 100 - ((parseInt(data3, 16) / 1023) * 100);
        this.resultmoisture = (100 - ((parseInt(data3, 16) / 1023) * 100)).toFixed(1);
        
        // console.log("수분 데이터 : " + this.resultmoisture);
        
        if (i >= 0 && i <= 10) { // 2020-02-26 기존에는 6개의 배열을 받았지만 센서의 민감도를 높히는 테스트를 하기 위해서 50개로 늘렸다
          // console.log(this.result[i]);
          if (parseFloat(this.resultmoisture) > 0.5) {
            // console.log("데이터가 1보다 큼");
            // console.log("데이터 순번 : " + i + "데이터 :" + this.result[i]);
            this.result2[i] = (100 - ((parseInt(data3, 16) / 1023) * 100)).toFixed(1);
            i++;
            this.toggleToast = true;
            if (i === 1) {
              this.percent = "10%"
              this.loadProgress = 10;
            } else if (i === 2) {
              this.percent = "20%"
              this.loadProgress = 20;
            } else if (i === 3) {
              this.percent = "30%"
              this.loadProgress = 30;
            } else if (i === 4) {
              this.percent = "40%"
              this.loadProgress = 40;
            } else if (i === 5) {
              this.percent = "50%"
              this.loadProgress = 50;
            } else if (i === 6) {
              this.percent = "60%"
              this.loadProgress = 60;
            } else if (i === 7) {
              this.percent = "70%"
              this.loadProgress = 70;
            } else if (i === 8) {
              this.percent = "80%"
              this.loadProgress = 80;
            } else if (i === 9) {
              this.percent = "90%"
              this.loadProgress = 90;
            } else if (i === 10) {
              this.percent = "100%"
              this.loadProgress = 100;
            } 
          } else if (parseFloat(this.resultmoisture) <= 0.4) {
            if (this.toggleToast) {
              this.showToast("유수분 센서를 피부에 정확하게 접촉해주세요.");
              this.toggleToast = false;
            }
          }
        } else if (i >= 11) {
          this.ble.stopNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(data => {
            var kkkk = 0;
            for (var k = 1; k < this.result2.length; k++) {
              // console.log(k + ":" + parseInt(this.result2[k]));
              kkkk += parseInt(this.result2[k]);  //갯수만큼 총 total값을 구한다
            }
            // console.log("kkkk" + (kkkk / 3).toFixed(1));
            this.moisture = (kkkk / 10).toFixed(1); // 누적된 배열의 갯구만큼 값을 나누어 평균 값을 구한다.

            var today = this.currentDate.getFullYear() + "-" + this.get2digits(this.currentDate.getMonth() + 1) + "-" + this.get2digits(this.currentDate.getDate());
            this.notimeDate = new Date(today);
            this.oil = this.getOilScore2(this.moisture);

            // console.log("수분 결과값 : " + this.moisture);
            // console.log("유분 결과값 : " + this.oil);
            
            this.score = {
              oil: this.oil,
              moisture: this.moisture,
              saveDate: this.notimeDate,
            }

            this.auth.skinChartSave(this.userData.email, this.score).subscribe(data => {
              if (data !== '') {
                if (this.platform.is('android')) {
                  this.showMissionsuccess();
                  
                  // const toast = this.toastCtrl.create({
                  //   cssClass: 'blu_toast_android',
                  //   message: '수분 측정 데이터 등록이 완료되었습니다.',
                  //   duration: 3000,
                  //   position: 'bottom'
                  // });
                  // toast.present();


                }
                else {
                  this.showMissionsuccess();
                  
                  
                  
                  // const toast = this.toastCtrl.create({
                  //   cssClass: 'blu_toast_ios',
                  //   message: '수분 측정 데이터 등록이 완료되었습니다.',
                  //   duration: 3000,
                  //   position: 'bottom'
                  // });
                  // toast.present();






                }
                // this.navCtrl.setRoot(TabsPage);
                this.isComplete = true;
                // 2020-03-20 측정완료가 되면 화면이 닫히는것이 아니라 결과 값을 그대로 보여준다.
                // this.viewCtrl.dismiss().then(_ => {
                //   this.ble.disconnect(this.peripheral.id);
                //   this.dismissAllModal();
                // })
              } else {
                this.viewCtrl.dismiss().then(_ => {
                  this.ble.disconnect(this.peripheral.id);
                  this.dismissAllModal();
                })
              }
            })
          })
        }
      } else if (checkdata !== '2') {
        // this.displayTime = 'false';
        // this.resultmoisture = '센서 연결 끊김';

        this.viewCtrl.dismiss().then(_ => {
          this.ble.disconnect(this.peripheral.id);
          this.dismissAllModal();
        })
      }
    }, error => {
      console.log("Notifi Error : " + error);
    })
    // console.log("---------------------------------노티피 종료 ------------------------------------------------");
    },error=> {
      console.log("유수분 측정 중 에러 발생 :" +error)
    })
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
    this.navCtrl.pop().then(() => this.navCtrl.pop())
    // this.navCtrl.remove(0, 5);

  }

  showAlert(title, message) {
    // this.runTimer = false;
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
    this.navCtrl.pop().then(() => this.navCtrl.pop())
    // this.navCtrl.remove(0, 5);


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

    this.subscriptionFourth = Observable.interval(1000).subscribe(x => {
      this.secondsRemaining++;
      this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);

      // if (this.displayTime === "00:00:00") {
      //   this.step = "0단계";
      //   this.stepdesc = "화장품 도포";
      //   this.desc = "사용하시는 화장품을 골구로 넉넉하게 도포하세요";
      // }
      if (this.displayTime === "00:00:00") {
        this.step = "1단계";
        this.anipoint = true;
        this.animpoint = "anim-point";
        this.stepdesc = "좌측 볼 마사지(1분)";
        this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:01:00") {
        this.step = "2단계";
        this.animpoint = "anim-point2";
        this.stepdesc = "우측볼 마사지(1분)";
        this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:02:00") {
        this.step = "3단계";
        this.animpoint = "anim-point3";
        this.stepdesc = "이마 마사지(1분)";
        this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:03:00") {
        this.step = "4단계";
        this.animpoint = "anim-point4";
        this.stepdesc = "목 마사지(1분)";
        this.desc = "아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:04:00") {
        this.step = "5단계";
        this.animpoint = "anim-point5";
        this.stepdesc = "V라인 리프팅";
        this.desc = "아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:06:00") {
        this.device_disconnect();
      }

      //
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
      //   this.step = "5단계";
      //   this.animpoint = "anim-point5";
      //   this.stepdesc = "V라인 리프팅";
      //   this.desc = "아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:06:00") {
      //   this.device_disconnect();
      // }

      // if (this.secondsRemaining > 0) {
      //   this.timerTick();
      // }
      // else {
      //   this.hasFinished = true;
      // }
      // }, 1000);

      // if (!this.runTimer) {
      //   // clearTimeout(timer);
      //   console.log("Clear Timeout");
      //   return;
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


  device_canceldisconnect() {
    this.runTimer = false;

    if (this.platform.is('cordova')) {
      this.ble.disconnect(this.device.id).then(result => {
        // this.navCtrl.pop().then(() => this.viewCtrl.dismiss())
        // this.viewCtrl.dismiss();
        this.navCtrl.popAll();
        if (this.navParams.get('carezoneData')) {
          // this.pointUpdate();
        } else {
          // this.userTimeUpdate();
        }
      }, error => {
        console.log("취소하기 블루투스 연결해제 에러" + error);
        // this.viewCtrl.dismiss();
        this.navCtrl.popAll();
        // this.navCtrl.pop().then(() => this.viewCtrl.dismiss())
        if (this.navParams.get('carezoneData')) {
          // this.pointUpdate();
        } else {
          // this.userTimeUpdate();
        }
      });
    } else {
      if (this.navParams.get('carezoneData')) {
        // this.pointUpdate();
        this.viewCtrl.dismiss();
        this.navCtrl.popAll();
      } else {
        // this.userTimeUpdate();
        this.viewCtrl.dismiss();
        this.navCtrl.popAll();
      }
    }

  }

  pointUpdate(): void {
    // console.log("this.carezoneData._id : " + this.carezoneData._id);
    // console.log("this.userData.email : " + this.userData.email);
    // console.log("this.secondsRemaining : " + this.secondsRemaining);
    this.auth.missionPointUpdate(this.carezoneData._id, this.userData.email, this.secondsRemaining).subscribe(data => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.stringify(data.msg).replace('"', ''));
    }, error => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.parse(error._body).msg);
    });
  }

  userTimeUpdate(): void {
    // console.log("this.carezoneData._id : " + this.carezoneData._id);
    // console.log("this.userData.email : " + this.userData.email);
    // console.log("this.secondsRemaining : " + this.secondsRemaining);
    this.auth.userTimeUpdate(this.userData.email, this.secondsRemaining).subscribe(data => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.stringify(data.msg).replace('"', ''));
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

  public get2digits(num) {
    return ("0" + num).slice(-2);
  }

  public dismissAllModal() {
    let activeModal = this.ionicApp._modalPortal.getActive();
    if (activeModal) {
      activeModal.dismiss().then(() => {
        this.dismissAllModal()
      });
    }
  }

  public showToast(text) {
    const toast = this.toastCtrl.create({
      // cssClass: 'blu_toast_android',
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  private getOilScore2(moisture) {
    var intMoisture = parseFloat(moisture);
    if (intMoisture <= 33.9 && intMoisture >= 0.1) {
      var result = (intMoisture / parseFloat("0.67"));
      var result2 = (Math.ceil(result*10)/10).toFixed(1);
    } else if (intMoisture <= 49.9 && intMoisture >= 34.0) {
      var result = (intMoisture / parseFloat("1.50"));
      var result2 = (Math.ceil(result*10)/10).toFixed(1);
    } else if (intMoisture <= 100 && intMoisture >= 50.0) {
      var result = (intMoisture / parseFloat("3.14"));
      var result2 = (Math.ceil(result*10)/10).toFixed(1);
    }
    console.log("테스트 결과는?" + Math.ceil(result*10)/10);
    return result2;
  }

  private getOilScore(moisture) { //수분에 근거한 유분 구하는 공식
    var intmoisture = parseFloat(moisture)
    var getOil = '';
    if (intmoisture >= 61) {
      getOil = '95.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 60.9 && intmoisture >= 60.0) {
      getOil = getOil = this.makeRandom(94, 95);
      getOil = getOil.concat('.' + this.makeRandom(0, 9));
    } else if (intmoisture <= 59.9 && intmoisture >= 59.0) {
      getOil = '93.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 58.9 && intmoisture >= 58.0) {
      getOil = '92.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 57.9 && intmoisture >= 57.0) {
      getOil = '91.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 56.9 && intmoisture >= 56.0) {
      getOil = '90.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 55.9 && intmoisture >= 55.0) {
      getOil = '89.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 54.9 && intmoisture >= 54.0) {
      getOil = '88.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 53.9 && intmoisture >= 53.0) {
      getOil = '87.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 52.9 && intmoisture >= 52.0) {
      getOil = getOil = '86.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 51.9 && intmoisture >= 51.0) {
      getOil = '85.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 50.9 && intmoisture >= 50.0) {
      getOil = '76.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 49.9 && intmoisture >= 49.0) {
      getOil = '70.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 48.9 && intmoisture >= 48.0) {
      getOil = '65.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 47.9 && intmoisture >= 47.0) {
      getOil = '57.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 46.9 && intmoisture >= 46.0) {
      getOil = '54.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 45.9 && intmoisture >= 37.0) {
      getOil = '53.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 36.9 && intmoisture >= 36.0) {
      getOil = '52.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 35.9 && intmoisture >= 35.0) {
      getOil = '50.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 34.9 && intmoisture >= 34.0) {
      getOil = '47.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 33.9 && intmoisture >= 33.0) {
      getOil = '45.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 32.9 && intmoisture >= 32.0) {
      getOil = '40.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 31.9 && intmoisture >= 31.0) {
      getOil = '35.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 30.9 && intmoisture >= 30.0) {
      getOil = '30.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 29.9 && intmoisture >= 29.0) {
      getOil = '25.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 28.9 && intmoisture >= 28.0) {
      getOil = '20.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 27.9 && intmoisture >= 27.0) {
      getOil = '15.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 26.9 && intmoisture >= 26.0) {
      getOil = '14.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 25.9 && intmoisture >= 25.0) {
      getOil = '13.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 24.9 && intmoisture >= 24.0) {
      getOil = '12.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 23.9 && intmoisture >= 23.0) {
      getOil = '11.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 22.9 && intmoisture >= 22.0) {
      getOil = '10.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 21.9 && intmoisture >= 21.0) {
      getOil = '9.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 20.9 && intmoisture >= 20.0) {
      getOil = '8.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 19.9 && intmoisture >= 19.0) {
      getOil = '7.';
      getOil = getOil.concat(this.makeRandom(0, 9));
    } else if (intmoisture <= 18.9 && intmoisture >= 1.0) {
      getOil = this.makeRandom(10, 1);
      getOil = getOil.concat('.' + this.makeRandom(0, 9));
    }
    return getOil;
  }

  private makeRandom(min, max) {
        var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandVal;
  }


  showMissionsuccess() {
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      cssClass: 'skin_alert_success',
      title: '유수분 측정',
      subTitle: '유수분 측정이 완료되었습니다',
      message: '수분 : ' + this.score.moisture +'<br /> 유분 : ' + this.score.oil,
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
            this.device_canceldisconnect();
          },
          cssClass: 'cancle_btn'
        },
        {
          text: '다시 측정',
          handler: () => {
            // this.device_canceldisconnect();  //2020-04-02 재측정이 되록 한다.
            this.continue_test();
            // this.navCtrl.parent.select(4);
            // let modal = this.modalCtrl.create(RewardPage, { mission: this.carezoneData2 });
            // modal.onDidDismiss(data => {
            //   this.ionViewDidEnter();
            // });
            // modal.present();
          }
        }]
    });
    alert.present();
  }


  continue_test() {
    this.isComplete = false;
    this.loadProgress = 0;
    this.ble.stopScan().then(result=>{
      // this.peripheral = peripheral;
    // console.log("---------------------------------노티피 시작 ------------------------------------------------");
    var i = 0;
    this.ble.startNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
      var data2 = new Uint8Array(buffer);
      var checkdata = data2[0].toString();
      // console.log("유수분 모드 인지? : " + checkdata);
      if (checkdata === '2') {
        // console.log("Plinic G1Partners Notifi 8 " + new Uint8Array(buffer));
        // var data2 = new Uint8Array(buffer);
        // console.log("data22222 : " + data2);
        var data3 = '';
        var data16 = '';
        // console.log(data2[3], data2[4]);
        // console.log(data2[3].toString(16) + data2[4].toString(16));
        data16 = data2[3].toString(16) + data2[4].toString(16);
        data3 = '0x' + data16;
        // console.log(data3);
        // console.log(parseInt(data3, 16));
        // console.log(i);
        // this.result[i] = 100 - ((parseInt(data3, 16) / 1023) * 100);
        this.resultmoisture = (100 - ((parseInt(data3, 16) / 1023) * 100)).toFixed(1);
        
        if (i >= 0 && i <= 10) { // 2020-02-26 기존에는 6개의 배열을 받았지만 센서의 민감도를 높히는 테스트를 하기 위해서 50개로 늘렸다
          // console.log(this.result[i]);
          if (parseFloat(this.resultmoisture) > 0.5) {
            // console.log("데이터가 1보다 큼");
            // console.log("데이터 순번 : " + i + "데이터 :" + this.result[i]);
            this.result2[i] = (100 - ((parseInt(data3, 16) / 1023) * 100)).toFixed(1);
            i++;
            this.toggleToast = true;
            if (i === 1) {
              this.percent = "10%"
              this.loadProgress = 10;
            } else if (i === 2) {
              this.percent = "20%"
              this.loadProgress = 20;
            } else if (i === 3) {
              this.percent = "30%"
              this.loadProgress = 30;
            } else if (i === 4) {
              this.percent = "40%"
              this.loadProgress = 40;
            } else if (i === 5) {
              this.percent = "50%"
              this.loadProgress = 50;
            } else if (i === 6) {
              this.percent = "60%"
              this.loadProgress = 60;
            } else if (i === 7) {
              this.percent = "70%"
              this.loadProgress = 70;
            } else if (i === 8) {
              this.percent = "80%"
              this.loadProgress = 80;
            } else if (i === 9) {
              this.percent = "90%"
              this.loadProgress = 90;
            } else if (i === 10) {
              this.percent = "100%"
              this.loadProgress = 100;
            } 
          } else if (parseFloat(this.resultmoisture) <= 0.4) {
            if (this.toggleToast) {
              this.showToast("유수분 센서를 피부에 정확하게 접촉해주세요.");
              this.toggleToast = false;
            }
          }
        } else if (i >= 11) {
          this.ble.stopNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(data => {
            var kkkk = 0;
            for (var k = 1; k < this.result2.length; k++) {
              // console.log(k + ":" + parseInt(this.result2[k]));
              kkkk += parseInt(this.result2[k]);  //갯수만큼 총 total값을 구한다
            }
            // console.log("kkkk" + (kkkk / 3).toFixed(1));
            this.moisture = (kkkk / 10).toFixed(1); // 누적된 배열의 갯구만큼 값을 나누어 평균 값을 구한다.

            var today = this.currentDate.getFullYear() + "-" + this.get2digits(this.currentDate.getMonth() + 1) + "-" + this.get2digits(this.currentDate.getDate());
            this.notimeDate = new Date(today);
            this.oil = this.getOilScore2(this.moisture);

            console.log("수분 결과값 : " + this.moisture);
            console.log("유분 결과값 : " + this.oil);
            
            this.score = {
              oil: this.oil,
              moisture: this.moisture,
              saveDate: this.notimeDate,
            }

            this.auth.skinChartSave(this.userData.email, this.score).subscribe(data => {
              if (data !== '') {
                if (this.platform.is('android')) {
                  this.showMissionsuccess();
                  
                  // const toast = this.toastCtrl.create({
                  //   cssClass: 'blu_toast_android',
                  //   message: '수분 측정 데이터 등록이 완료되었습니다.',
                  //   duration: 3000,
                  //   position: 'bottom'
                  // });
                  // toast.present();


                }
                else {
                  this.showMissionsuccess();
                  
                  
                  
                  // const toast = this.toastCtrl.create({
                  //   cssClass: 'blu_toast_ios',
                  //   message: '수분 측정 데이터 등록이 완료되었습니다.',
                  //   duration: 3000,
                  //   position: 'bottom'
                  // });
                  // toast.present();






                }
                // this.navCtrl.setRoot(TabsPage);
                this.isComplete = true;
                // 2020-03-20 측정완료가 되면 화면이 닫히는것이 아니라 결과 값을 그대로 보여준다.
                // this.viewCtrl.dismiss().then(_ => {
                //   this.ble.disconnect(this.peripheral.id);
                //   this.dismissAllModal();
                // })
              } else {
                this.viewCtrl.dismiss().then(_ => {
                  this.ble.disconnect(this.peripheral.id);
                  this.dismissAllModal();
                })
              }
            })
          })
        }
      } else if (checkdata !== '2') {
        // this.displayTime = 'false';
        // this.resultmoisture = '센서 연결 끊김';

        this.viewCtrl.dismiss().then(_ => {
          this.ble.disconnect(this.peripheral.id);
          this.dismissAllModal();
        })
      }
    }, error => {
      console.log("Notifi Error : " + error);
    })
    // console.log("---------------------------------노티피 종료 ------------------------------------------------");
    },error=> {
      console.log("유수분 측정 중 에러 발생 :" +error)
    })

  }

}
