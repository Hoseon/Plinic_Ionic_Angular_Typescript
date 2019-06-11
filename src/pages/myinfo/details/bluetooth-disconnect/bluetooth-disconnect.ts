import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform  } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';

/**
 * Generated class for the BluetoothDisconnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetooth-disconnect',
  templateUrl: 'bluetooth-disconnect.html',
})
export class BluetoothDisconnectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,  public bluetoothle: BluetoothLE) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothDisconnectPage');
  }



  public connect_stop(){
    this.bluetoothle.removeAllServices();
    this.bluetoothle.isEnabled();
    console.log('connect_stop==============');
  }
}
