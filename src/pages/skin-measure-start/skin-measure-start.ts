import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { DeviceConnectIngPage } from '../device-connect-ing/device-connect-ing';
// import { TimerComponent } from './timer';

/**
 * Generated class for the SkinMeasureStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-measure-start',
  templateUrl: 'skin-measure-start.html',
})
export class SkinMeasureStartPage {

  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;

  @Input() timeInSeconds: number;


  // @ViewChild(TimerComponent) timer: TimerComponent;

  constructor(
    // private timer : TimerComponent,
    public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public platform: Platform) {

      // this.initTimer();
      // setTimeout(() => {
      //   console.log("start timer");
      //   this.timeInSeconds = 60;
      //   this.secondsRemaining  = 60;
      //   this.startTimer();
      //   // this.timer.startTimer();
      // }, 1000)


  }

  // ngOnInit() {

  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SkinMeasureStartPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  public measureStart() {
    this.navCtrl.push(DeviceConnectIngPage);
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
