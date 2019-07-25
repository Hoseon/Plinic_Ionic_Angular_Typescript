import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { SkinMeasureStartPage } from '../../../skin-measure-start/skin-measure-start';
import { BLE } from '@ionic-native/ble';
// import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

//Blue Mod S42
// const PLINIC_SERVICE = 'FEFB';
// const UUID_SERVICE = 'FEFB';
// const SWITCH_CHARACTERISTIC = 'FF00';

//HM Soft Bluetooth Mod
const PLINIC_SERVICE = 'FFE0';
const UUID_SERVICE = 'FFE0';
const SWITCH_CHARACTERISTIC = 'FFE1';



/**
 * Generated class for the BluetoothConnectIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetooth-connect-ing',
  templateUrl: 'bluetooth-connect-ing.html',
})
export class BluetoothConnectIngPage {

  devices: any[] = [];
  statusMessage: string;
  output:any;
  message:String;
  responseTxt:any;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  peripheral: any = {};




  constructor(
    private ble: BLE,
    // private bluetoothSerial: BluetoothSerial,
    public navCtrl: NavController, public alertCtrl : AlertController, public navParams: NavParams, public platform: Platform, public toastCtrl: ToastController, private ngZone: NgZone) {
      // bluetoothSerial.enable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothConnectIngPage');
  }


  public connect_start() {
    this.navCtrl.push(SkinMeasureStartPage);
  }


  // startScanning() {
  //   this.pairedDevices = null;
  //   this.unpairedDevices = null;
  //   this.gettingDevices = true;
  //   this.bluetoothSerial.discoverUnpaired().then((success) => {
  //     this.unpairedDevices = success;
  //     this.gettingDevices = false;
  //     success.forEach(element => {
  //
  //     });
  //   },
  //     (err) => {
  //       console.log(err);
  //     })
  //
  //   this.bluetoothSerial.list().then((success) => {
  //     this.pairedDevices = success;
  //   },
  //     (err) => {
  //
  //     })
  // }
  // success = (data) => alert(data);
  // fail = (error) => alert(error);
  //
  // selectDevice(address: any) {
  //
  //   let alert = this.alertCtrl.create({
  //     title: 'Connect',
  //     message: 'Do you want to connect with?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Connect',
  //         handler: () => {
  //           this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
  //
  //         }
  //       }
  //     ]
  //   });
  //   alert.present(
  //
  //   );
  //
  // }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([PLINIC_SERVICE], 5).subscribe(
      device => {
        console.log("aaaaa :" + device);
        this.onDeviceDiscovered(device);
      },
      error => {
        console.log("bbbbb" + error);
        this.scanError(error)
      }
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
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

    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
    );
  }

  onConnected(peripheral) {

    this.peripheral = peripheral;
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

    console.log("this.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.id : " + this.peripheral.id);
    // Update the UI with the current state of the switch characteristic
    this.ble.read(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(
      buffer => {
        let data = new Uint8Array(buffer);
        console.log('switch characteristic 0' + data[0]);
        console.log('switch characteristic 1' + data[1]);
        console.log('switch characteristic 2' + data[2]);
        console.log('switch characteristic 3' + data[3]);
        console.log('switch characteristic 4' + data[4]);
        console.log('switch characteristic 5' + data[5]);
        // this.ngZone.run(() => {
        //     this.power = data[0] !== 0;
        // });
      }
    )

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



  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


}
