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
    this.ble.connect(device.id).subscribe(
      peripheral => {
        this.ble.refreshDeviceCache(device.id, 2000).then(result =>{
          console.log("refresh sucess : " + result);

        }).catch(error =>{
          console.log("refresh error : " + error);
        });
        this.onConnected(peripheral);
      },
      // this.onConnected(peripheral),
      // peripheral => this.bleshowAlert('Disconnected', 'The peripheral unexpectedly disconnected')
      peripheral => { //디바이스 연결 중단되면 누적 처리 후 종료
        // this.bleshowAlert('Disconnected', '디바이스 연결이 중단 되었습니다.');
        if (this.navParams.get('carezoneData')) {
          this.pointUpdate();
        } else {
          this.userTimeUpdate();
        }
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

    // console.log("this.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.id : " + this.peripheral.id);


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

    // {"name":"BM+S42 E6C",
    // "id":"00:80:25:E7:3E:6C","advertising":{},
    // "rssi":60,
    // "services":["1800","1801","180a","fefb"],
    // "characteristics":[
    // {"service":"1800","characteristic":"2a00","properties":["Read"]},
    // {"service":"1800","characteristic":"2a01","properties":["Read"]},
    // {"service":"1800","characteristic":"2a04","properties":["Read"]},
    // {"service":"1800","characteristic":"2aa6","properties":["Read"]},
    // {"service":"1801","characteristic":"2a05","properties":["Indicate"],"descriptors":[{"uuid":"2902"}]},
    // {"service":"180a","characteristic":"2a50","properties":["Read"]},
    // {"service":"fefb","characteristic":"00000009-0000-1000-8000-008025000000","properties":["Write"]},
    // {"service":"fefb","characteristic":"0000000a-0000-1000-8000-008025000000","properties":["Indicate"],"descriptors":[{"uuid":"2902"}]},
    // {"service":"fefb","characteristic":"00000001-0000-1000-8000-008025000000","properties":["WriteWithoutResponse"]},
    // {"service":"fefb","characteristic":"00000002-0000-1000-8000-008025000000","properties":["Notify"],"descriptors":[{"uuid":"2902"}]},
    // {"service":"fefb","characteristic":"00000003-0000-1000-8000-008025000000","properties":["Write"]},
    // {"service":"fefb","characteristic":"00000004-0000-1000-8000-008025000000","properties":["Indicate"],"descriptors":[{"uuid":"2902"}]}]}

    // UUID:1800  (Generic Access Service)
    // UUID:1801  (Terminal I/O Service, TIO)
    // UUID:180A  (Environmental Sensing Service, ESS)
    // UUID:FEFB  (device Information Service, DIS)

    var service_UUID = '1801';
    var char_UUID = '2902';

    var read_UUID = '180a';
    var read_char_UUID ='2a50';

    // this.ble.startStateNotifications().subscribe(result => {
    //   console.log("블루트스 상태 변화 감지 : " + result);
    // }, error =>{
    //   console.log("블루투스 상태 변화 감지 에러 메세지 : " + error);
    // });

    // this.ble.connectedPeripheralsWithServices([PLINIC_SERVICE]).then(result =>{
    //   console.log("ios test ble : " + JSON.stringify(result));
    // }).catch(error =>{
    //   console.log("error ios test : " + error);
    // })

    console.log("---------------------------------노티피 시작 ------------------------------------------------");
    var i = 0;
    this.ble.startNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
      // console.log("그냥 버퍼 " + String.fromCharCode.apply(null, buffer));
      // console.log(this.stringToBytes(buffer));
      // console.log("Plinic G1Partners Notifi 8 " +  String.fromCharCode(parseInt(buffer,16)));
      // console.log("Plinic G1Partners Notifi 8 " +  String.fromCharCode.apply(null, new Uint8Array(buffer)));
      // console.log("Plinic G1Partners Notifi 16 " + String.fromCharCode.apply(null, new Uint16Array(buffer)));
      // console.log("Plinic G1Partners Notifi 32 " + String.fromCharCode.apply(null, new Uint32Array(buffer)));
      // console.log("Plinic G1Partners Notifi Uint8ClampedArray " + String.fromCharCode.apply(null, new Uint8ClampedArray(buffer)));
      // console.log("Plinic G1Partners Notifi 8 " + String.fromCharCode.apply(null, new Int8Array(buffer)));
      // console.log("Plinic G1Partners Notifi 16 " + String.fromCharCode.apply(null, new Int16Array(buffer)));
      // console.log("Plinic G1Partners Notifi 32 " + String.fromCharCode.apply(null, new Int32Array(buffer)));

      console.log("Plinic G1Partners Notifi 8 " + new Uint8Array(buffer));
      var data2 = new Uint8Array(buffer);
      var data3 = '';
      var data16 = '';
      console.log(data2[3], data2[4]);
      console.log(data2[3].toString(16) + data2[4].toString(16));
      data16 = data2[3].toString(16) + data2[4].toString(16);
      data3  = '0x' + data16;
      console.log(data3);
      console.log(parseInt(data3, 16));
      console.log(i);
      i++;
      // console.log("data16 : " + parseInt(data16, 10));

      // console.log("Plinic G1Partners Notifi 16 " + new Uint16Array(buffer));
      // console.log("Plinic G1Partners Notifi 32 " + new Uint32Array(buffer));
      // console.log("Plinic G1Partners Notifi 8 " + new Int8Array(buffer));
      // console.log("Plinic G1Partners Notifi 16 " + new Int16Array(buffer));
      // console.log("Plinic G1Partners Notifi 32 " + new Int32Array(buffer));

    }, error => {
      console.log("Notifi Error : " + error);
    })
    console.log("---------------------------------노티피 종료 ------------------------------------------------");

    // this.ble.read(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(result =>{
    //   console.log("read success : " + JSON.stringify(result));
    // }).catch(error => {
    //   console.log("read fail : " + JSON.stringify(error));
    // })

    // this.ble.write(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC, this.stringToBytes('abcd1234')).then(
    //   data =>{
    //     console.log("write 성공 : " + data);
    //   }, error=>{
    //     console.log("write 실패 : " + error);
    //   }
    // )

    // this.ble.read(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(
    //   buffer => {
    //     // var a = String.fromCharCode.apply(null, new Uint8Array(buffer))
    //
    //     var data = new Uint8Array(buffer);
    //     var str = String.fromCharCode.apply(String, data);
    //     console.log("읽기성공88 str : " + str[0]);
    //
    //     var data2 = new Uint16Array(buffer);
    //     var str2 = String.fromCharCode.apply(String, data2);
    //     console.log("읽기성공1616 str : " + str2[0]);
    //     console.log("읽기성공1616 str : " + str2[1]);
    //     console.log("읽기성공1616 str : " + str2[2]);
    //     console.log("읽기성공1616 str : " + str2[3]);
    //     console.log("읽기성공1616 str : " + str2[4]);
    //     console.log("읽기성공1616 str : " + str2[5]);
    //
    //     console.log("그냥받은 HEX0 : " + data2[0]);
    //     console.log("그냥받은 HEX1 : " + data2[1]);
    //     console.log("그냥받은 HEX2 : " + data2[2]);
    //     console.log("그냥받은 HEX3 : " + data2[3]);
    //     console.log("그냥받은 HEX4 : " + data2[4]);
    //     console.log("그냥받은 HEX5 : " + data2[5]);
    //
    //     var hex0 = String.fromCharCode.apply(String, data2[0]);
    //     var hex1 =String.fromCharCode.apply(String, data2[1]);
    //     var hex2 =String.fromCharCode.apply(String, data2[2]);
    //     var hex3 =String.fromCharCode.apply(String, data2[3]);
    //     var hex4 =String.fromCharCode.apply(String, data2[4]);
    //     var hex5 =String.fromCharCode.apply(String, data2[5]);
    //
    //     console.log("변환한 HEX0 : " + hex0);
    //     console.log("변환한 HEX1 : " + hex1);
    //     console.log("변환한 HEX2 : " + hex2);
    //     console.log("변환한 HEX3 : " + hex3);
    //     console.log("변환한 HEX4 : " + hex4);
    //     console.log("변환한 HEX5 : " + hex5);
    //
    //
    //     console.log("읽기 성공 : " + this.bytesToString(buffer));
    //     console.log("읽기 성공 data : " + this.bytesToString(data));
    //     // console.log('dimmer characteristic0 ' + this.bytesToString(buffer));
    //     // console.log('dimmer characteristic1 ' + this.bytesToString(data[1]));
    //     // console.log('dimmer characteristic2 ' + this.bytesToString(data[2]));
    //     // console.log('dimmer characteristic3 ' + this.bytesToString(data[3]));
    //     // console.log('dimmer characteristic4 ' + this.bytesToString(data[4]));
    //     // console.log('dimmer characteristic5 ' + this.bytesToString(data[5]));
    //     // console.log('dimmer characteristic6 ' + this.bytesToString(data[6]));
    //     // console.log('dimmer characteristic7 ' + this.bytesToString(data[7]));
    //     // this.ngZone.run(() => {
    //       // this.brightness = data[0];
    //     // });
    //   }
    // )
    //
    //
    //
    // this.ble.read(this.peripheral.id, '1805', '2A0F').then(
    //   buffer => {
    //     // var a = String.fromCharCode.apply(null, new Uint8Array(buffer))
    //
    //     var data = new Uint8Array(buffer);
    //     var str = String.fromCharCode.apply(String, data);
    //     console.log("읽기성공88 str : " + str[0]);
    //
    //     var data2 = new Uint16Array(buffer);
    //     var str2 = String.fromCharCode.apply(String, data2);
    //     console.log("읽기성공1616 str : " + str2[0]);
    //     console.log("읽기성공1616 str : " + str2[1]);
    //     console.log("읽기성공1616 str : " + str2[2]);
    //     console.log("읽기성공1616 str : " + str2[3]);
    //     console.log("읽기성공1616 str : " + str2[4]);
    //     console.log("읽기성공1616 str : " + str2[5]);
    //
    //     console.log("그냥받은 HEX0 : " + data2[0]);
    //     console.log("그냥받은 HEX1 : " + data2[1]);
    //     console.log("그냥받은 HEX2 : " + data2[2]);
    //     console.log("그냥받은 HEX3 : " + data2[3]);
    //     console.log("그냥받은 HEX4 : " + data2[4]);
    //     console.log("그냥받은 HEX5 : " + data2[5]);
    //
    //     var hex0 = String.fromCharCode.apply(String, data2[0]);
    //     var hex1 =String.fromCharCode.apply(String, data2[1]);
    //     var hex2 =String.fromCharCode.apply(String, data2[2]);
    //     var hex3 =String.fromCharCode.apply(String, data2[3]);
    //     var hex4 =String.fromCharCode.apply(String, data2[4]);
    //     var hex5 =String.fromCharCode.apply(String, data2[5]);
    //
    //     console.log("변환한 HEX0 : " + hex0);
    //     console.log("변환한 HEX1 : " + hex1);
    //     console.log("변환한 HEX2 : " + hex2);
    //     console.log("변환한 HEX3 : " + hex3);
    //     console.log("변환한 HEX4 : " + hex4);
    //     console.log("변환한 HEX5 : " + hex5);
    //
    //
    //     console.log("읽기 성공 : " + this.bytesToString(buffer));
    //     console.log("읽기 성공 data : " + this.bytesToString(data));
    //     // console.log('dimmer characteristic0 ' + this.bytesToString(buffer));
    //     // console.log('dimmer characteristic1 ' + this.bytesToString(data[1]));
    //     // console.log('dimmer characteristic2 ' + this.bytesToString(data[2]));
    //     // console.log('dimmer characteristic3 ' + this.bytesToString(data[3]));
    //     // console.log('dimmer characteristic4 ' + this.bytesToString(data[4]));
    //     // console.log('dimmer characteristic5 ' + this.bytesToString(data[5]));
    //     // console.log('dimmer characteristic6 ' + this.bytesToString(data[6]));
    //     // console.log('dimmer characteristic7 ' + this.bytesToString(data[7]));
    //     // this.ngZone.run(() => {
    //       // this.brightness = data[0];
    //     // });
    //   }
    // )



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

      //20191129
      if (this.displayTime === "00:00:00") {
        this.step = "1단계";
        this.anipoint = true;
        this.animpoint = "anim-point";
        this.stepdesc = "좌측 볼 마사지(1분)";
        this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:00:05") {
        this.step = "2단계";
        this.animpoint = "anim-point2";
        this.stepdesc = "우측볼 마사지(1분)";
        this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      } else if (this.displayTime === "00:00:08") {
        this.step = "3단계";
        // this.animpoint = "anim-point3";
        this.animpoint = "anim-point5";
        // this.stepdesc = "이마 마사지(1분)";
        this.stepdesc = "V라인 리프팅";
        this.desc = "아래에서 위로 마사지해주세요.";
      }
      else if (this.displayTime === "00:00:11") {
        this.device_disconnect();

        // this.step = "4단계";
        // this.animpoint = "anim-point4";
        // this.stepdesc = "목 마사지(1분)";
        // this.desc = "아래에서 위로 마사지해주세요.";
      }

      // else if (this.displayTime === "00:04:00") {
      //   this.step = "5단계";
      //   this.animpoint = "anim-point5";
      //   this.stepdesc = "V라인 리프팅";
      //   this.desc = "아래에서 위로 마사지해주세요.";
      // }
      // else if (this.displayTime === "00:06:00") {
      //   this.device_disconnect();
      // }



      //20191129 전시회를 위해서 기본로직 잠시 중
      // if (this.displayTime === "00:00:00") {
      //   this.step = "1단계";
      //   this.anipoint = true;
      //   this.animpoint = "anim-point";
      //   this.stepdesc = "좌측 볼 마사지(1분)";
      //   this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:01:00") {
      //   this.step = "2단계";
      //   this.animpoint = "anim-point2";
      //   this.stepdesc = "우측볼 마사지(1분)";
      //   this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:02:00") {
      //   this.step = "3단계";
      //   this.animpoint = "anim-point3";
      //   this.stepdesc = "이마 마사지(1분)";
      //   this.desc = "원을 그리듯 아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:03:00") {
      //   this.step = "4단계";
      //   this.animpoint = "anim-point4";
      //   this.stepdesc = "목 마사지(1분)";
      //   this.desc = "아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:04:00") {
      //   this.step = "5단계";
      //   this.animpoint = "anim-point5";
      //   this.stepdesc = "V라인 리프팅";
      //   this.desc = "아래에서 위로 마사지해주세요.";
      // } else if (this.displayTime === "00:06:00") {
      //   this.device_disconnect();
      // }



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

}
