import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { IdfindresultPage } from '../idfindresult/idfindresult';

/**
 * Generated class for the IdfindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-idfind',
  templateUrl: 'idfind.html',
})
export class IdfindPage {
  myImage : any;
  registerCredentials = {
    name: '',
    birthday: '',
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdfindPage');
  }

  ionViewDidEnter(){
   
  }

  ionViewWillEnter(){
   
  }

  close() {
    this.viewCtrl.dismiss();
  }

  changeImage() {
    return this.myImage = "assets/img/register/ic-system-clear-grey@3x.png"
  }

  birthday() {
    console.log(this.registerCredentials.birthday);
  }

  public idFind() {
    this.navCtrl.push(IdfindresultPage,{credentials : this.registerCredentials}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("아이디 찾기 결과 페이지 담힘");
      });
    });
  }

}
