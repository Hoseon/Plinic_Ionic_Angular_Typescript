import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IdfindresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-idfindresult',
  templateUrl: 'idfindresult.html',
})
export class IdfindresultPage {
  credentials: any;
  result: any;
  findResult: Array<any> = new Array<any>();

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public viewCtrl: ViewController,
      public alertCtrl: AlertController,
      public platform : Platform,
      private auth : AuthService,
    ) {
  }

  async ionViewDidLoad() {
    if(this.navParams.get('credentials')) {
      this.credentials = await this.navParams.get('credentials');
    }

    if(this.credentials) {
      this.auth.idFindWithPhone(this.credentials).subscribe(data => {
        if(data) {
          for (let i = 0; i < data.user.length; i++) {
            this.findResult[i] = data.user[i].email;
          }
        }
        console.log(this.findResult);
        // this.result = data.id;
      }, error => {
        this.showErrorAlert();
      })
    }

    if(this.result !=='') {
      console.log("데이터 있음");
    }
    
    console.log('ionViewDidLoad IdfindresultPage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter IdfindresultPage');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter IdfindresultPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  // 이메일 마스킹 처리 2020-06-02
  emailSecurity(userEmail){
    var id = userEmail.split('@')[0]; 
    var mail = userEmail.split('@')[1]; 
    var maskingId = function(id){ 
      var splitId = id.substring(0,4); 
      for(var i = 1; i < id.length; i++){ 
        splitId += '*'; 
      } 
      return splitId; 
    }; 
    var maskingMail = function(mail){ 
      var splitMail = ''; 
      for(var i = 1; i < mail.length; i++){ 
        splitMail += '*'; 
      } splitMail += mail.substring(mail.length-1,mail.length); 
      return splitMail; 
    }; 
    userEmail = maskingId(id) + '@' + (mail); 
    return userEmail; 
  }

  showErrorAlert(){
    let alert2 = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: '알림',
      message: "조회된 회원정보가 없습니다",
      buttons: [
        {
          text: '확인',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert2.present();
  }

  setHome() {
    this.navCtrl.setRoot(LoginPage);
  }
}
