import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, ViewController, LoadingController, Loading } from 'ionic-angular';
import { DeviceConnectCompletePage } from '../device-connect-complete/device-connect-complete';
import { DeviceSkinIngPage } from '../device-skin-ing/device-skin-ing';
import { DeviceConnectFailPage } from '../device-connect-fail/device-connect-fail';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth-service';
import { Observable } from 'rxjs/Rx';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
declare var cordova: any;


// import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { BLE } from '@ionic-native/ble';
// import { SuccessHomePage } from '../success-home/success-home';
/**
 * Generated class for the DeviceCameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//Blue Mod S42
// const PLINIC_SERVICE = 'FEFB';
// const UUID_SERVICE = '180A';
// const SWITCH_CHARACTERISTIC = '2A50';

// //HM Soft Bluetooth Mod
const PLINIC_SERVICE = 'FFE0';
const UUID_SERVICE = 'FFE0';
const SWITCH_CHARACTERISTIC = 'FFE1';


// {"service":"1800","characteristic":"2a00","properties":["Read"]},
// {"service":"1800","characteristic":"2a01","properties":["Read"]},
// {"service":"1800","characteristic":"2a02","properties":["Read","Write"]},
// {"service":"1800","characteristic":"2a03","properties":["Write"]},
// {"service":"1800","characteristic":"2a04","properties":["Read"]},
// {"service":"1801","characteristic":"2a05","properties":["Indicate"],"descriptors":[{"uuid":"2902"}]},
// {"service":"ffe0","characteristic":"ffe1","properties":["Read","WriteWithoutResponse","Write","Notify"],"descriptors":[{"uuid":"2902"},{"uuid":"2901"}]}]}




//
//
// UUID:1800  (Generic Access Service)
// UUID:1801  (Terminal I/O Service, TIO)
// UUID:180A  (Environmental Sensing Service, ESS)
// UUID:FEFB  (device Information Service, DIS)
// const SWITCH_CHARACTERISTIC = 'FF01';



@IonicPage()
@Component({
  selector: 'page-device-camera',
  templateUrl: 'device-camera.html',
})
export class DeviceCameraPage {

  jwtHelper: JwtHelper = new JwtHelper();
  devices: any[] = [];
  statusMessage: string;

  output: any;
  message: String;
  responseTxt: any;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;

  carezoneData: any;


  peripheral: any = {};

  spintime: any = 0;

  cameraTimer: any;
  cameraCount: any;
  loading: Loading;
  userData: any;

  constructor(public auth: AuthService, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private ngZone: NgZone,
    // public bluetoothle: BluetoothLE,
    public ble: BLE,
    public platform: Platform, private alertCtrl: AlertController,
    private transfer: Transfer, private loadingCtrl: LoadingController,
  ) {
    this.platform.ready().then((readySource) => {

      // if (this.platform.is('android')) {
      //   // this.enableBluetooth();
      // }

      if (this.navParams.get('carezoneData')) {
        this.carezoneData = this.navParams.get('carezoneData');
        console.log("데이터 데리고 옴 : " + JSON.stringify(this.navParams.get('carezoneData')));
      }

      this.macro_player();

      // setTimeout(() => {
      // this.spintime = 1;
      // if (this.platform.is('cordova')) {
      //   this.scan();
      //   // this.bluetoothle.initialize().then(ble => {
      //   //   //console.log('ble', ble.status) // logs 'enabled'
      //   //   if (ble.status === "enabled") {
      //   //     this.navCtrl.push(DeviceConnectCompletePage);
      //   //   } else {
      //   //     this.navCtrl.push(DeviceConnectFailPage);
      //   //   }
      //   // });
      // } else {  // 웹 개발 시에는 무조건 성공페이지로 넘어가 데이터를 강제적으로 보여준다
      //   // this.navCtrl.push(DeviceConnectCompletePage); //20190813 플리닉 사용 시간을 위해서 바로 타임 측정 페이지로 넘어간다
      //   // this.navCtrl.push(DeviceSkinIngPage, {'carezoneData' : this.carezoneData});
      // }
      // // }, 3500);


      // setTimeout(() => {
      //   this.spintime = 1;
      //   if (this.platform.is('cordova')) {
      //     this.bluetoothle.initialize().then(ble => {
      //       //console.log('ble', ble.status) // logs 'enabled'
      //       if (ble.status === "enabled") {
      //         this.navCtrl.push(DeviceConnectCompletePage);
      //       } else {
      //         this.navCtrl.push(DeviceConnectFailPage);
      //       }
      //     });
      //   } else {  // 웹 개발 시에는 무조건 성공페이지로 넘어가 데이터를 강제적으로 보여준다
      //     this.navCtrl.push(DeviceConnectCompletePage);
      //   }
      // }, 3500);
    });

  }

  ionViewWillEnter() {

    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        // tabs[ key ].style.transform = 'translateY(56px)';
        tabs[key].style.display = 'none';
      });
    } // end if


  }


  ionViewDidLoad() {
    this.loadItems();
    console.log('ionViewDidLoad DeviceCameraPage');
  }
  
  ionViewDidEnter(){
    console.log('ionViewDidEnter DeviceCameraPage');
    console.log(this.userData);
  }


  ionViewWillLeave() {
    this.ble.stopScan();
    this.cameraTimer.complete();
  }

  // public successpage() {
  //   this.navCtrl.push(DeviceConnectCompletePage);
  // }

  public measureBack() {
    this.navCtrl.pop();
  }

  public deviceComplete() {
    this.navCtrl.push(DeviceConnectCompletePage);
  }

  public deviceFail() {
    // this.navCtrl.push(DeviceConnectFailPage);
    //this.navCtrl.setRoot(TabsPage);
    // if (this.navParams.get('carezoneData')) {
    this.viewCtrl.dismiss();
    // } else { //마이페이지에서는 parent select로 취소 되기 버튼이 되어야 한다.
    // this.navCtrl.parent.select(4);
    // }

  }


  public enableBluetooth() {
    this.ble.enable().then(
      success => {
        console.log("Bluetooth is enabled");
      },
      error => {
        console.log("The user did *not* enable Bluetooth");
      }
    );
  }


  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list
    // 시간내로 스캔 하는 방법
    // this.ble.scan([PLINIC_SERVICE], 10).subscribe(
    //   device => {
    //     console.log("aaaaa :" + device);
    //     this.onDeviceDiscovered(device);
    //     this.deviceSelected(device);
    //     this.navCtrl.push(DeviceConnectCompletePage, { device: device });
    //   },
    //   error => {
    //     console.log("bbbbb" + error);
    //     this.scanError(error);
    //     this.navCtrl.push(DeviceConnectFailPage);
    //   }
    // );
    // setTimeout(this.setStatus.bind(this), 10000, 'Scan complete')




    // 2020-01-31 충전시에 블루투스 신호가 감지 되는것을 막기 위해 처리------------------------------------------------------------------------------------------
    this.ble.startScan([PLINIC_SERVICE]).subscribe(
      device => {
        // this.onDeviceDiscovered(device);
        // this.deviceSelected(device);
        this.ble.stopScan();
        // this.navCtrl.push(DeviceSkinIngPage, { device: device, 'carezoneData': this.carezoneData }); //20190813 플리닉 전원을 킴과 동시에 시간을 측정해야 하므로 DeviceSkinIngPage로 바로 이동

        this.ble.connect(device.id).subscribe(
          peripheral => {
            console.log("1111111111111111111 커넥트 성공");
            // this.onConnected(peripheral);
            this.ble.startNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
              console.log("333333333 노티피 성공");
              var data2 = new Uint8Array(buffer);
              var data16 = data2[0].toString();
              var data_ = data2[1].toString();
              var result = '';
              var result = data16 + data_;
              console.log("노티피 데이터는 data2data2data2? : " + data2);
              console.log("노티피 데이터는 data16data16data16? : " + data16);
              console.log("노티피 데이터는 data_data_data_? : " + data_);
              console.log("노티피 데이터는 결과 : " + data16 + data_);
              if (result === '051') {
                this.ble.stopNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(result => {
                  this.ble.disconnect(device.id).then(result1 => {
                    console.log("디스커넥트 됨" + result1);
                    this.navCtrl.push(DeviceSkinIngPage, { device: device, 'carezoneData': this.carezoneData }); //20190813 플리닉 전원을 킴과 동시에 시간을 측정해야 하므로 DeviceSkinIngPage로 바로 이동
                  });
                })
              } else {
                console.log("노티피 데이터가 아닐 경우");
                // this.scan();
              }
            }, error => {
              console.log("444444444444 노티피 에러 " + JSON.stringify(error));
            });
          });
      },
      error => {
        // console.log("22222222222 + error" + error);
        this.scanError(error);
        this.ble.stopScan();
        this.navCtrl.push(DeviceConnectFailPage);
      }
    );
    // setTimeout(this.setStatus.bind(this), 10000, 'Scan complete')









    // // 2020-01-20 이전 메인보드로 돌아감 (케어모드만 포함하고 있음)------------------------------------------------------------------------------------------
    // this.ble.startScan([PLINIC_SERVICE]).subscribe(
    //   device => {
    //     // this.onDeviceDiscovered(device);
    //     // this.deviceSelected(device);
    //     this.ble.stopScan();
    //     this.navCtrl.push(DeviceSkinIngPage, { device: device, 'carezoneData': this.carezoneData }); //20190813 플리닉 전원을 킴과 동시에 시간을 측정해야 하므로 DeviceSkinIngPage로 바로 이동

    //     // this.ble.connect(device.id).subscribe(
    //     //   peripheral => {
    //         // console.log("1111111111111111111 커넥트 성공");
    //         // this.onConnected(peripheral);
    //         // this.ble.startNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
    //           // console.log("333333333 노티피 성공");
    //           // var data2 = new Uint8Array(buffer);
    //           // var data16 = data2[0].toString()
    //           // console.log("노티피 데이터는 ? : " + data16);
    //           // if (data16 === '17') {
    //             // this.ble.stopNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(result => {
    //               // this.ble.disconnect(device.id).then(result1 => {
    //                 // console.log("디스커넥트 됨" + result1);
    //                 // this.navCtrl.push(DeviceSkinIngPage, { device: device, 'carezoneData': this.carezoneData }); //20190813 플리닉 전원을 킴과 동시에 시간을 측정해야 하므로 DeviceSkinIngPage로 바로 이동
    //               // });
    //             // })
    //           // } else {
    //             // this.scan();
    //           // }
    //         // }, error => {
    //           // console.log("444444444444 노티피 에러 " + error);
    //         // });
    //       // });
    //   },
    //   error => {
    //     // console.log("22222222222 + error" + error);
    //     this.scanError(error);
    //     this.ble.stopScan();
    //     this.navCtrl.push(DeviceConnectFailPage);
    //   }
    // );
    // // setTimeout(this.setStatus.bind(this), 10000, 'Scan complete')


    // // 2020-01-20 기본 메인보드로 돌아가기전 (케어모드, 유수분 모드 포함하고 있음)------------------------------------------------------------------------------------------
    // this.ble.startScan([PLINIC_SERVICE]).subscribe(
    //   device => {
    //     // this.onDeviceDiscovered(device);
    //     // this.deviceSelected(device);
    //     this.ble.stopScan();
    //
    //     this.ble.connect(device.id).subscribe(
    //       peripheral => {
    //         // console.log("1111111111111111111 커넥트 성공");
    //         // this.onConnected(peripheral);
    //         this.ble.startNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
    //           // console.log("333333333 노티피 성공");
    //           var data2 = new Uint8Array(buffer);
    //           var data16 = data2[0].toString()
    //           // console.log("노티피 데이터는 ? : " + data16);
    //           if (data16 === '17') {
    //             this.ble.stopNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(result => {
    //               this.ble.disconnect(device.id).then(result1 => {
    //                 // console.log("디스커넥트 됨" + result1);
    //                 this.navCtrl.push(DeviceSkinIngPage, { device: device, 'carezoneData': this.carezoneData }); //20190813 플리닉 전원을 킴과 동시에 시간을 측정해야 하므로 DeviceSkinIngPage로 바로 이동
    //               });
    //             })
    //           } else {
    //             this.scan();
    //           }
    //         }, error => {
    //           // console.log("444444444444 노티피 에러 " + error);
    //         });
    //       });
    //   },
    //   error => {
    //     // console.log("22222222222 + error" + error);
    //     this.scanError(error);
    //     this.ble.stopScan();
    //     this.navCtrl.push(DeviceConnectFailPage);
    //   }
    // );
    // // setTimeout(this.setStatus.bind(this), 10000, 'Scan complete')
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
    this.navCtrl.push(DeviceConnectFailPage);

  }


  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    // this.navCtrl.push(DetailPage, {
    //   device: device
    // });

    // this.ble.connect(device.id).subscribe(
    //   peripheral => this.onConnected(peripheral),
    //   // peripheral => this.bleshowAlert('Disconnected', 'The peripheral unexpectedly disconnected')
    //   peripheral => this.bleshowAlert('Disconnected', '디바이스 연결이 중단 되었습니다.')
    // );
    //
    // this.ble.startNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
    //   console.log("Plinic G1Partners Notifi " + String.fromCharCode.apply(null, new Uint8Array(buffer)))
    // }, error => {
    //   console.log("Notifi Error : " + error);
    // })



    // this.startNotification();
  }

  onConnected(peripheral) {

    this.peripheral = peripheral;
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

    console.log("this.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.id : " + this.peripheral.id);
    // Update the UI with the current state of the switch characteristic
    this.ble.read(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(
      buffer => {
        let data = new Uint8Array(buffer);
        let data2 = String.fromCharCode.apply(null, new Uint8Array(buffer));
        console.log("data2 : data2 : data2 : data2 : data2 : data2 : data2 : data2 : data2 : data2 : data2 : " + data2)


        // console.log('switch characteristic 0' + data[0]);
        // console.log('switch characteristic 1' + data[1]);
        // console.log('switch characteristic 2' + data[2]);
        // console.log('switch characteristic 3' + data[3]);
        // console.log('switch characteristic 4' + data[4]);
        // console.log('switch characteristic 5' + data[5]);


        for (var i = 0; i < data.length; i++) {
          console.log("data" + i + "--- :" + data[i]);
        }
        // var array = new Uint8Array(string.length);
        // for (var i = 0, l = string.length; i < l; i++) {
        //   array[i] = string.charCodeAt(i);
        // }
        // return array.buffer;


        // this.ngZone.run(() => {
        //     this.power = data[0] !== 0;
        // });
      }
    )

    this.ble.startNotification(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
      console.log("Plinic G1Partners Notifi 8 " + String.fromCharCode.apply(null, new Uint8Array(buffer)));
      console.log("Plinic G1Partners Notifi 16" + String.fromCharCode.apply(null, new Uint16Array(buffer)));
    }, error => {
      console.log("Notifi Error : " + error);
    })

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
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  startNotification() {


  }


  // 2020-02-04 근접카메라 실시간으로 앱에 보여주는 로직
  macro_player() {
    var i = 0;
    this.cameraTimer = Observable.interval(300).subscribe(x => {
      this.cameraCount = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=&random+\=' + Math.random();
      i++;
      // for (var i = 0; i < this.timeremaining.length; i++) {
      // this.timeremaining[i]--;
      // console.log(this.timeremaining[i]--);
      // this.displayTime[i] = this.getSecondsAsDigitalClock(this.timeremaining[i]);
      // }
      // this.timeremaining--;
      // this.displayTime = this.getSecondsAsDigitalClock(this.timeremaining);
    });
  }

  // 20200416 근접카메라 서버 전송 로직
  eyeSkin() {
    this.showLoading();
    const fileTransfer: TransferObject = this.transfer.create();
    let url = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=';
    fileTransfer.download(url, cordova.file.dataDirectory + 'file.jpg').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      if(this.userData) {
        this.auth.eyeSkin(entry.toURL(), this.userData).then(data => {
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
  }

  // 20200416 근접카메라 서버 전송 로직
  hairSkin() {
    this.showLoading();
    const fileTransfer: TransferObject = this.transfer.create();
    let url = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=';
    fileTransfer.download(url, cordova.file.dataDirectory + 'file.jpg').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      if(this.userData) {
        this.auth.hairSkin(entry.toURL(), this.userData).then(data => {
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
  }

  // 20200204 근접카메라 서버 전송 로직
  foreheadSkin() {
    this.showLoading();
    const fileTransfer: TransferObject = this.transfer.create();
    let url = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=';
    fileTransfer.download(url, cordova.file.dataDirectory + 'file.jpg').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      if(this.userData) {
        this.auth.foreheadSkin(entry.toURL(), this.userData).then(data => {
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
  }

  // 20200204 근접카메라 서버 전송 로직
  cheekSkin() {
    this.showLoading();
    const fileTransfer: TransferObject = this.transfer.create();
    let url = 'http://192.168.1.1/snapshot.cgi?resolution=11&user=admin&pwd=';
    fileTransfer.download(url, cordova.file.dataDirectory + 'file.jpg').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      if(this.userData) {
        this.auth.cheekSkin(entry.toURL(), this.userData).then(data => {
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
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  public loadItems() {
    this.auth.getUserStorage().then(items => {
      // console.log("토큰 값을 가져 왔는가?" + JSON.stringify(items));
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
          pushtoken: items.pushtoken,
          from: items.from,
          snsid: items.snsid,
          totaluseitme: items.totalusetime,
          // totaluserpoint: items.totaluserpoint,
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          //this.thumb_image = false;
        } else {
          //this.thumb_image = true;
        }
      } else {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: this.jwtHelper.decodeToken(items).birthday,
          gender: this.jwtHelper.decodeToken(items).gender,
          skincomplaint: this.jwtHelper.decodeToken(items).skincomplaint,
          email: this.jwtHelper.decodeToken(items).email,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          pushtoken: this.jwtHelper.decodeToken(items).pushtoken,
          // totaluserpoint: this.jwtHelper.decodeToken(items).totaluserpoint,
          from: 'plinic',
          totaluseitme: items.totalusetime
        };
      }
      return this.userData;
      
    });
  }


}
