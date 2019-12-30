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
    // this.device_disconnect();
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
        this.pointUpdate();
      } else {
        this.userTimeUpdate();
      }
    }, error => {
      if (this.navParams.get('carezoneData')) {
        this.pointUpdate();
      } else {
        this.userTimeUpdate();
      }
    })
  }

  deviceSelected(device) {

    // if (this.platform.is('ios')) {
    //   console.log("아이폰 블루투스");
    // } else if (this.platform.is('android')) {
    // console.log("안드로이드 블루투스");
    this.ble.startScan([PLINIC_SERVICE]).subscribe(
      device => {
        // console.log("스캔이 잘 되었는지?");
        this.ble.stopScan();
        // this.ble.disconnect(this.device.id).then(result =>{
        //   console.log("케어모드 커넥션 해제 : " + JSON.stringify(result));
        // })
        this.ble.connect(this.device.id).subscribe(
          peripheral => {
            // console.log("커넥션이 잘 되었는지??");
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
            // console.log("연결이 종료됨 케어모드");
            // this.bleshowAlert('Disconnected', '디바이스 연결이 중단 되었습니다.');
            if (this.navParams.get('carezoneData')) {
              this.pointUpdate();
              // this.navCtrl.pop().then(() => this.navCtrl.pop())
            } else {
              this.userTimeUpdate();
            //   this.navCtrl.pop().then(() => this.navCtrl.pop())
            }
          });
      });
  }

  onConnected(peripheral) {

    // console.log("디바이스 서비스 정보 : " + JSON.stringify(peripheral));

    this.ble.startNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
      // console.log("1234");
    })


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

      if (this.displayTime === "00:00:00") {
        this.step = "0단계";
        this.stepdesc = "화장품 도포";
        this.desc = "사용하시는 화장품을 골구로 넉넉하게 도포하세요";
      } else if (this.displayTime === "00:01:00") {
        this.step = "1단계";
        this.anipoint = true;
        this.animpoint = "anim-point";
        this.stepdesc = "좌측 볼 마사지(1분)";
        this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:02:00") {
        this.step = "2단계";
        this.animpoint = "anim-point2";
        this.stepdesc = "우측볼 마사지(1분)";
        this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:03:00") {
        this.step = "3단계";
        this.animpoint = "anim-point3";
        this.stepdesc = "이마 마사지(1분)";
        this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:04:00") {
        this.step = "4단계";
        this.animpoint = "anim-point4";
        this.stepdesc = "목 마사지(1분)";
        this.desc = "아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:05:00") {
        this.step = "5단계";
        this.animpoint = "anim-point5";
        this.stepdesc = "V라인 리프팅";
        this.desc = "아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:06:00") {
        this.device_disconnect();
      }
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
        if (this.navParams.get('carezoneData')) {
          this.pointUpdate();
        } else {
          this.userTimeUpdate();
        }
      }, error => {
        console.log("취소하기 블루투스 연결해제 에러" + error);
        if (this.navParams.get('carezoneData')) {
          this.pointUpdate();
        } else {
          this.userTimeUpdate();
        }
      });
    } else {
      if (this.navParams.get('carezoneData')) {
        this.pointUpdate();
      } else {
        this.userTimeUpdate();
      }
    }

  }

  pointUpdate(): void {
    this.auth.missionPointUpdate(this.carezoneData._id, this.userData.email, this.secondsRemaining).subscribe(data => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.stringify(data.msg).replace('"', ''));
    }, error => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.parse(error._body).msg);
    });
  }

  userTimeUpdate(): void {
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

}
