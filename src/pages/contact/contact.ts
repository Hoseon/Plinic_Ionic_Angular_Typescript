import { Component, ViewChild  } from '@angular/core';
import { NavController, AlertController, Content  } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }
  ionViewDidLoad() {

  }

  ionViewDidEnter(){
    this.content.resize();
    console.log('ionViewDidLoad ContactPage');

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: '커뮤니티',
      message: '추후 업데이트 예정 <br> 감사합니다.',
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();

  }
}
