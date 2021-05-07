import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform, ViewController } from "ionic-angular";
import { BLE } from "@ionic-native/ble";

// const SWITCH_CHARACTERISTIC = 'FF01';
// UUID:1800  (Generic Access Service)
// UUID:1801  (Terminal I/O Service, TIO)
// UUID:180A  (Environmental Sensing Service, ESS)
// UUID:FEFB  (device Information Service, DIS)

// //HM Soft Bluetooth Mod
const PLINIC_SERVICE = "FFE0";
const UUID_SERVICE = "FFE0";
const SWITCH_CHARACTERISTIC = "FFE1";

// { "characteristics": [{ "properties": ["Read", "WriteWithoutResponse", "Write", "Notify"], "isNotifying": false, "characteristic": "FFE1", "service": "FFE0" }],
// "id": "AAA346CC-CC32-A521-5489-EA4833037CE9",
// "rssi": -59,
// "advertising": { "kCBAdvDataIsConnectable": 1, "kCBAdvDataLocalName": "HMSoft", "kCBAdvDataServiceUUIDs": ["FFE0"], "kCBAdvDataServiceData": { "B000": { } }, "kCBAdvDataTxPowerLevel": 0, "kCBAdvDataManufacturerData": { } },
// "name": "HMSoft",
// "services": ["FFE0"] }

@IonicPage()
@Component({
  selector: "page-bletest",
  templateUrl: "bletest.html",
})
export class BleTestPage {
  scanStatus: any;
  scanCount: any = -1;
  scanStatusData: any;
  data16: any;
  data0: any;
  data1: any;
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  data6: any;
  data7: any;
  scanStatusData2: any;
  testData: Array<any> = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private ble: BLE,
    public zone: NgZone,
    public viewCtrl: ViewController, 
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ScreentemplatePage");
  }

  ionViewWillLeave(){
    this.ble.isConnected(this.scanStatusData.id).then(
      () => { 
        this.ble.disconnect(this.scanStatusData.id).then(() => {
          console.log("커넥션 종료");
        });
      },
      () => { 
        this.viewCtrl.dismiss();
      }
    );
  }

  ionViewWillEnter(){
    this.androidBackButton();
  }

  startScan() {
    this.ble.startScan([PLINIC_SERVICE]).subscribe((data) => {
      this.zone.run(
        () => {
          this.scanCount = this.scanCount + 1;

          this.ble.stopScan().then(
            (result) => {
              // this.scanStatus = "스캔 중단";
              console.log("스캔 중단 성공1");
            },
            (error) => {
              console.log("스캔 중단 실패");
              // this.scanStatus = "스캔 중단 실패";
            }
          );

          this.scanStatus = "스캔 성공";
          this.scanStatusData = data;
          this.scanStatusData2 = JSON.stringify(data);
        },
        (error) => {
          this.ble.stopScan().then(
            (result) => {
              console.log("스캔 중단 성공2");
              // this.scanStatus = "스캔 중단";
            },
            (error) => {
              console.log("스캔 중단 실패");
              // this.scanStatus = "스캔 중단 실패";
            }
          );
          this.scanStatus = "스캔 에러";
        }
      );
    });
  }

  stopScan() {
    this.ble.stopScan().then(
      (result) => {
        this.scanStatus = "스캔 중단";
      },
      (error) => {
        this.scanStatus = "스캔 중단 실패";
      }
    );
  }

  startConnect() {
    console.log(this.scanStatusData.id);
    this.ble.connect(this.scanStatusData.id).subscribe((data) => {
      this.ble.startNotification(this.scanStatusData.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(
          (buffer) => {
            this.zone.run(
              () => {
                this.scanStatus = "커넥션 성공";
                this.data16 = new Uint8Array(buffer);
                this.data0 = this.data16[0].toString();
                this.data1 = this.data16[1].toString();
                this.data2 = this.data16[2].toString();
                this.data3 = this.data16[3].toString();
                this.data4 = this.data16[4].toString();
                this.data5 = this.data16[5].toString();
                this.data6 = this.data16[6].toString();
                this.data7 = this.data16[7].toString();

                this.testData[0] = this.data0;
                this.testData[1] = this.data1;
                this.testData[2] = this.data2;
                this.testData[3] = this.data3;
                this.testData[4] = this.data4;
                this.testData[5] = this.data5;
                this.testData[6] = this.data6;
                this.testData[7] = this.data7;

                console.log(this.testData);

              },
              (error) => {
                this.scanStatus = "커넥션 실패(Notify 실패)";
                console.log(
                  "444444444444 노티피 에러 " + JSON.stringify(error)
                );
              }
            );
          },
          (disconnect) => {
            this.scanStatus = "BLE 비정상 연결해제";
          }
        );
    }, error => {
      this.scanStatus = "Connection 강제 종료처리";
    });
  }

  stopConnect() {
    this.ble.stopNotification(this.scanStatusData.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(result => {
      this.ble.disconnect(this.scanStatusData.id).then(result1 => {
        this.zone.run(
          () => {
            this.scanStatus = "BLE Stop Notify";
          });
      });
    })
  }

  //20201125 안드로이드 백 버튼 처리
  androidBackButton() {
    if(this.platform.is('android')) {
      this.platform.registerBackButtonAction(() => {
        this.ble.isConnected(this.scanStatusData.id).then(
          () => { 
            this.ble.disconnect(this.scanStatusData.id).then(() => {
              console.log("커넥션 종료");
              this.viewCtrl.dismiss();
            });
          },
          () => { 
            this.viewCtrl.dismiss();
          }
        );
      });
    }
  }

  close() {
    this.ble.isConnected(this.scanStatusData.id).then(
      () => { 
        this.ble.disconnect(this.scanStatusData.id).then(() => {
          console.log("커넥션 종료");
          this.viewCtrl.dismiss();
        });
      },
      () => { 
        this.viewCtrl.dismiss();
      }
    );
  }

}
