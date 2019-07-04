import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, AlertController  } from 'ionic-angular';
import { SkinDiagnoseFirstOilPage } from '../skin-diagnose-first-oil/skin-diagnose-first-oil';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the SkinDiagnoseFirstMoisturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-diagnose-first-moisture',
  templateUrl: 'skin-diagnose-first-moisture.html',
})
export class SkinDiagnoseFirstMoisturePage {


    diagnose_score: number = 2;
    diagnose_score2: number = 2;
    diagnose_score3: number = 2;
    diagnose_score4: number = 2;
    diagnose_score5: number = 2;

    all_score: number=0;

    constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, private alertCtrl: AlertController,
     public auth: AuthService  ) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SkinDiagnoseFirstMoisturePage');
    }

    public range_change(range){
      if(this.diagnose_score===1){
        this.all_score = this.all_score-1;
      }
      if(this.diagnose_score===2){
        this.all_score = this.all_score+0;
      }
      if(this.diagnose_score===3){
        this.all_score = this.all_score+1;
      }
        console.log("first_range" + range.value);
        console.log("this.first_all_score=============" + this.all_score);
        console.log("this.first_diagnose_score=============" + this.diagnose_score);
    }

    public range_change2(range){
      if(this.diagnose_score2===1){
        this.all_score = this.all_score-1;
      }
      if(this.diagnose_score2===2){
        this.all_score = this.all_score+0;
      }
      if(this.diagnose_score2===3){
        this.all_score = this.all_score+1;
      }
        console.log("first_range" + range.value);
        console.log("this.first_all_score=============" + this.all_score);
        console.log("this.first_diagnose_score2=============" + this.diagnose_score2);
    }

    public range_change3(range){
      if(this.diagnose_score3===1){
        this.all_score = this.all_score-1;
      }
      if(this.diagnose_score3===2){
        this.all_score = this.all_score+0;
      }
      if(this.diagnose_score3===3){
        this.all_score = this.all_score+1;
      }
        console.log("first_range" + range.value);
        console.log("this.first_all_score=============" + this.all_score);
        console.log("this.first_diagnose_score3=============" + this.diagnose_score3);
    }

    public range_change4(range){
      if(this.diagnose_score4===1){
        this.all_score = this.all_score-1;
      }
      if(this.diagnose_score4===2){
        this.all_score = this.all_score+0;
      }
      if(this.diagnose_score4===3){
        this.all_score = this.all_score+1;
      }
        console.log("first_range" + range.value);
        console.log("this.first_all_score=============" + this.all_score);
        console.log("this.first_diagnose_score4=============" + this.diagnose_score4);
    }

    public range_change5(range){
      if(this.diagnose_score5===1){
        this.all_score = this.all_score-1;
      }
      if(this.diagnose_score5===2){
        this.all_score = this.all_score+0;
      }
      if(this.diagnose_score5===3){
        this.all_score = this.all_score+1;
      }
        console.log("first_range" + range.value);
        console.log("this.first_all_score=============" + this.all_score);
        console.log("this.first_diagnose_score5=============" + this.diagnose_score5);
    }



    public next_page(){
        //this.showAlert(this.all_score);
        let alert = this.alertCtrl.create({
          cssClass: 'push_alert_cancel',
          title: 'Plinic',
          message: '다음 페이지로 이동합니다.',
          buttons: [
            {
              text: '취소',
              role: 'cancel',
              handler: () => {
              }
            },
            {
              text: '확인',
              handler: () => {
                    if(this.all_score<0){
                      this.all_score = 0;
                    }
                    this.auth.setUserStoragediagnose_first_moisture(this.all_score*20);
                    this.nav.push(SkinDiagnoseFirstOilPage);
                  }
              }]
        });
        alert.present();
    }


    showAlert(text) {
      let alert = this.alertCtrl.create({
        cssClass: 'push_alert',
        title: '알림',
        message: text,
        buttons: ['OK']
      });
      alert.present();
    }

    public dissmiss() {
      this.viewCtrl.dismiss();
    }

}