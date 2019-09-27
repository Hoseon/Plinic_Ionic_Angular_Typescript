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
const PLINIC_SERVICE = 'FEFB';
const UUID_SERVICE = '180A';
const SWITCH_CHARACTERISTIC = '2A50';

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
// const PLINIC_SERVICE = 'FFE0';
// const UUID_SERVICE = 'FFE0';
// const SWITCH_CHARACTERISTIC = 'FFE1';


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

      if (this.navParams.get('device')) {
        this.device = this.navParams.get('device');
        this.deviceSelected(this.device);
      }
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


    this.auth.getmissionPoint(this.carezoneData._id, this.userData.email).subscribe(data => {
      console.log("현재 날짜 : " + this.currentDate.getFullYear() + '-' + this.currentDate.getMonth() + '-' + this.currentDate.getDate());
      console.log("데이터 날짜 : " + new Date(data.usedmission[0].updatedAt).getFullYear() + '-' + new Date(data.usedmission[0].updatedAt).getMonth() + '-' + new Date(data.usedmission[0].updatedAt).getDate());
      console.log("data : " + JSON.stringify(data));
    }, error => {
      console.log("error : " + error);
    });
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
    console.log("device skin ing Device id : " + this.device.id);
    // setTimeout(() => {
    // this.spintime = 1;
    this.navCtrl.setRoot(TabsPage);
    this.ble.disconnect(this.device.id).then(result => {
      this.pointUpdate();

      // console.log("ble skin ing disconnect OK : " + result);
      // if (this.platform.is('android')) {
      //   const toast = this.toastCtrl.create({
      //     cssClass: 'blu_toast_android',
      //     message: '피부측정이 연결이 완료되었습니다.',
      //     duration: 3000,
      //     position: 'bottom'
      //   });
      //   toast.present();
      // }
      // else {
      //   const toast = this.toastCtrl.create({
      //     cssClass: 'blu_toast_ios',
      //     message: '피부측정이 완료되었습니다.',
      //     duration: 3000,
      //     position: 'bottom'
      //   });
      //   toast.present();
      // }
    }, error => {
      this.pointUpdate();

      // console.log("ble skin ing disconnect error :" + error);
      // if (this.platform.is('android')) {
      //   const toast = this.toastCtrl.create({
      //     cssClass: 'blu_toast_android',
      //     message: '피부측정이 취소 되었습니다.',
      //     duration: 3000,
      //     position: 'bottom'
      //   });
      //   toast.present();
      // }
      // else {
      //   const toast = this.toastCtrl.create({
      //     cssClass: 'blu_toast_ios',
      //     message: '피부측정이 취소 되었습니다.',
      //     duration: 3000,
      //     position: 'bottom'
      //   });
      //   toast.present();
      // }
    })


    // }, 1000);
  }




  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    // this.navCtrl.push(DetailPage, {
    //   device: device
    // });



    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      // this.onConnected(peripheral),
      // peripheral => this.bleshowAlert('Disconnected', 'The peripheral unexpectedly disconnected')
      peripheral => { //디바이스 연결 중단되면 누적 처리 후 종료
        // this.bleshowAlert('Disconnected', '디바이스 연결이 중단 되었습니다.');
        this.pointUpdate();
      }
    );





    // this.ble.startNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
    //   console.log("Plinic G1Partners Notifi " + String.fromCharCode.apply(null, new Uint8Array(buffer)))
    // }, error => {
    //   console.log("Notifi Error : " + error);
    // })



    // this.startNotification();
  }

  onConnected(peripheral) {

    console.log("디바이스 서비스 정보 : " + JSON.stringify(peripheral));

    this.peripheral = peripheral;
    // this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

    console.log("this.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.id : " + this.peripheral.id);


    // var test = new ArrayBuffer(16);
    //
    // var data = new Uint8Array(3).buffer;
    // data[0] = 16; // red
    // data[1] = 17; // green
    // data[2] = 1; // blue

    // let array = new Uint8Array([AT+LECCCD=0x10,0x0011,1]);

    // let array = this.strtoarray('AT+LECCCD=0x10,0x0011,1')
    // let buffer = new Uint8Array([16]).buffer;
    // // this.ble.write(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC, array).then(result =>{
    //   console.log("쓰기 기능" + JSON.stringify(result));
    // }).catch(error => {
    //       console.log(JSON.stringify(error));
    // });
    // Update the UI with the current state of the switch characteristic
    // this.ble.read(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(
    //   buffer => {
    //     let data = new Uint8Array(buffer);
    //     let data2 = String.fromCharCode.apply(null, new Uint8Array(buffer));
    //     console.log("data2 : data2 : data2 : data2 : data2 : data2 : data2 : data2 : data2 : data2 : data2 : " + JSON.stringify(data2));
    //
    //     for (var i = 0; i < data.length; i++) {
    //       console.log("data" + i + "--- :" + data[i]);
    //     }
    //     // var array = new Uint8Array(string.length);
    //     // for (var i = 0, l = string.length; i < l; i++) {
    //     //   array[i] = string.charCodeAt(i);
    //     // }
    //     // return array.buffer;
    //
    //
    //     // this.ngZone.run(() => {
    //     //     this.power = data[0] !== 0;
    //     // });
    //   }
    // )

    //

    console.log("---------------------------------노티피 시작 ------------------------------------------------");
    this.ble.startNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
      console.log("Plinic G1Partners Notifi " + String.fromCharCode.apply(null, new Uint8Array(buffer)));
    }, error => {
      console.log("Notifi Error : " + error);
    })
    console.log("---------------------------------노티피 종료 ------------------------------------------------");



    // this.ble.startStateNotifications().subscribe(state => {
    //   console.log("ble state ========================================================== " + state);
    // })
    //
    // this.ble.isEnabled().then(data => {
    //   console.log("is enabled???  --------------------------------" + data);
    // })

    // Update the UI with the current state of the dimmer characteristic
    // this.ble.read(this.peripheral.id, LIGHTBULB_SERVICE, DIMMER_CHARACTERISTIC).then(
    //   buffer => {
    //     let data = new Uint8Array(buffer);
    //     console.log('dimmer characteristic ' + data[0]);
    //     this.ngZone.run(() => {
    //       this.brightness = data[0];
    //     });
    //   }
    // )
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
      console.log("device skin ing Device id : " + this.device.id);
      // setTimeout(() => {
      // this.spintime = 1;
      // this.navCtrl.setRoot(TabsPage);
      this.ble.disconnect(this.device.id).then(result => {

        console.log("취소하기 블루투스 연결해제" + result);
        this.pointUpdate();
        // console.log("ble skin ing disconnect OK : " + result);
        // this.navCtrl.setRoot(TabsPage);
        // if (this.platform.is('android')) {
        //   const toast = this.toastCtrl.create({
        //     cssClass: 'blu_toast_android',
        //     message: '피부측정이 취소 되었습니다.',
        //     duration: 3000,
        //     position: 'bottom'
        //   });
        //   toast.present();
        // }
        // else {
        //   const toast = this.toastCtrl.create({
        //     cssClass: 'blu_toast_ios',
        //     message: '피부측정이 취소 되었습니다.',
        //     duration: 3000,
        //     position: 'bottom'
        //   });
        //   toast.present();
        // }
      }, error => {
        console.log("취소하기 블루투스 연결해제 에러" + error);
        this.pointUpdate();

        // console.log("ble skin ing disconnect error :" + error);
        // if (this.platform.is('android')) {
        //   const toast = this.toastCtrl.create({
        //     cssClass: 'blu_toast_android',
        //     message: '피부측정이 취소 되었습니다.',
        //     duration: 3000,
        //     position: 'bottom'
        //   });
        //   toast.present();
        // }
        // else {
        //   const toast = this.toastCtrl.create({
        //     cssClass: 'blu_toast_ios',
        //     message: '피부측정이 취소 되었습니다.',
        //     duration: 3000,
        //     position: 'bottom'
        //   });
        //   toast.present();
        // }
      });
    } else {
      console.log("this.secondsRemaining : " + this.secondsRemaining);
      console.log(this.userData.email);
      console.log(this.carezoneData._id);

      this.pointUpdate();
      // this.auth.missionPointUpdate(this.userData, this.carezoneData._id this.secondsRemaining).subscribe(data => {
      //   if (data !== "") {
      //     let alert2 = this.alertCtrl.create({
      //       cssClass: 'push_alert',
      //       title: '댓글달기',
      //       message: "댓글이 정상적으로 등록되었습니다.",
      //       buttons: [
      //         {
      //           text: '확인',
      //           handler: () => {
      //             this.registerReply.comment = '';
      //             this.textareaResize();
      //             this.update();
      //           }
      //         }
      //       ]
      //     });
      //     alert2.present();
      //   }
      //   // this.nav.push(CareZoneMissionIngPage, { _id: id });
      // }, error => {
      //   this.showError(JSON.parse(error._body).msg);
      // });
    }

  }

  pointUpdate(): void {
    console.log("this.carezoneData._id : " + this.carezoneData._id);
    console.log("this.userData.email : " + this.userData.email);
    console.log("this.secondsRemaining : " + this.secondsRemaining);
    this.auth.missionPointUpdate(this.carezoneData._id, this.userData.email, this.secondsRemaining).subscribe(data => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.stringify(data.msg).replace('"', ''));
    }, error => {
      this.subscriptionFourth.complete();
      this.showAlert("플리닉 종료", JSON.parse(error._body).msg);
    });
  }

  strtoarray(str){
      var buf = new ArrayBuffer(20); // 2 bytes for each char
      var bufView = new Uint8Array(buf);
      for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
  }

}
