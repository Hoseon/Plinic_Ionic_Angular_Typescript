import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController, IonicApp, ToastController, AlertController } from 'ionic-angular';
// import { SuccessHomePage } from '../success-home/success-home';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { BLE } from '@ionic-native/ble';

/**
 * Generated class for the DeviceSkinIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 //Blue Mod S42
 const PLINIC_SERVICE = 'FEFB';
 const UUID_SERVICE = 'FEFB';
 const SWITCH_CHARACTERISTIC = '00000001-0000-1000-8000-008025000000';
 // const SWITCH_CHARACTERISTIC = 'FF01';

 // //HM Soft Bluetooth Mod
 // const PLINIC_SERVICE = 'FFE0';
 // const UUID_SERVICE = 'FFE0';
 // const SWITCH_CHARACTERISTIC = 'FFE1';



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
  secondsRemaining: number = 0;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;

  step: any = '0단계';
  stepdesc: any = '화장품 도포';
  desc: any = '사용하시는 화장품을 골구로 넉넉하게 도포하세요.';

  anipoint: boolean = false;
  animpoint: any = "anim-point";

  peripheral: any = {};



  @Input() timeInSeconds: number;



  constructor(private alertCtrl : AlertController, private ble: BLE, public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public modalCtrl: ModalController,
    public viewCtrl: ViewController, public ionicApp: IonicApp, public toastCtrl: ToastController) {

    this.platform.ready().then((readySource) => {
      if (this.navParams.get('device')) {
        this.device = this.navParams.get('device');
        this.deviceSelected(this.device);
        // console.log("device skin ing Device id : " + this.device.id);
      }
      setTimeout(() => {
        this.startTimer();
        // this.timer.startTimer();
      }, 1000)
      // setTimeout(()=>{
      //   this.spintime = 1;
      //   this.navCtrl.setRoot(TabsPage);
      //   this.ble.disconnect(this.device.id).then(result => {
      //     console.log("ble skin ing disconnect OK : " + result);
      //     this.navCtrl.setRoot(TabsPage);
      //   }, error =>{
      //     console.log("ble skin ing disconnect error :" + error);
      //   })
      //
      //   if(platform.is('android')){
      //    const toast = this.toastCtrl.create({
      //     cssClass: 'blu_toast_android',
      //     message: '피부측정이 연결이 완료되었습니다.',
      //     duration: 3000,
      //     position: 'bottom'
      //   });
      //   toast.present();
      // }
      // else{
      //   const toast = this.toastCtrl.create({
      //    cssClass: 'blu_toast_ios',
      //    message: '피부측정이 완료되었습니다.',
      //    duration: 3000,
      //    position: 'bottom'
      //  });
      //  toast.present();
      // }
      // }, 3500);
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DeviceSkinIngPage');
  }

  ionViewDidLeave() {
    // this.device_disconnect();
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
        // console.log("ble skin ing disconnect OK : " + result);
        if (this.platform.is('android')) {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_android',
            message: '피부측정이 연결이 완료되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_ios',
            message: '피부측정이 완료되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      }, error => {
        // console.log("ble skin ing disconnect error :" + error);
        if (this.platform.is('android')) {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_android',
            message: '피부측정이 취소 되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_ios',
            message: '피부측정이 취소 되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      })


    // }, 1000);
  }

  device_canceldisconnect() {
    this.runTimer = false;
    console.log("device skin ing Device id : " + this.device.id);
    // setTimeout(() => {
      // this.spintime = 1;
      // this.navCtrl.setRoot(TabsPage);
      this.ble.disconnect(this.device.id).then(result => {
        // console.log("ble skin ing disconnect OK : " + result);
        this.navCtrl.setRoot(TabsPage);
        if (this.platform.is('android')) {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_android',
            message: '피부측정이 취소 되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_ios',
            message: '피부측정이 취소 되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      }, error => {
        // console.log("ble skin ing disconnect error :" + error);
        if (this.platform.is('android')) {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_android',
            message: '피부측정이 취소 되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          const toast = this.toastCtrl.create({
            cssClass: 'blu_toast_ios',
            message: '피부측정이 취소 되었습니다.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
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
      // peripheral => this.bleshowAlert('Disconnected', 'The peripheral unexpectedly disconnected')
      peripheral => this.bleshowAlert('Disconnected', '디바이스 연결이 중단 되었습니다.')
    );

    this.ble.startNotification(device.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).subscribe(buffer => {
      console.log("Plinic G1Partners Notifi " + String.fromCharCode.apply(null, new Uint8Array(buffer)))
    }, error => {
      console.log("Notifi Error : " + error);
    })



    // this.startNotification();
  }

  onConnected(peripheral) {

    this.peripheral = peripheral;
    // this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

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


        for( var i = 0; i < data.length; i ++){
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
      console.log("Plinic G1Partners Notifi " + String.fromCharCode.apply(null, new Uint8Array(buffer)));
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
    this.runTimer = false;
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
    // this.viewCtrl.dismiss();
    this.navCtrl.setRoot(TabsPage);

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

    this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);
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
    setTimeout(() => {
      if (!this.runTimer) { return; }
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
      if (this.secondsRemaining > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
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
}
