import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, AlertController, ToastController  } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SkinDiagnoseFirstMoisturePage } from '../skin-diagnose-first-moisture/skin-diagnose-first-moisture';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the SkinDiagnoseFirstOilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-skin-diagnose-first-oil',
  templateUrl: 'skin-diagnose-first-oil.html',
})
export class SkinDiagnoseFirstOilPage {


    diagnose_score: number = 2;
    diagnose_score2: number = 2;
    diagnose_score3: number = 2;
    diagnose_score4: number = 2;
    diagnose_score5: number = 2;

    all_oil_score: number=0;


    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, private alertCtrl: AlertController,
    public auth: AuthService, public toastCtrl: ToastController  ) {


    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SkinDiagnoseOilPage');
    }


    public range_change(range){
      if(this.diagnose_score===1){
        this.all_oil_score = this.all_oil_score-1;
      }
      if(this.diagnose_score===2){
        this.all_oil_score = this.all_oil_score+0;
      }
      if(this.diagnose_score===3){
        this.all_oil_score = this.all_oil_score+1;
      }
        console.log("first_range" + range.value);
        console.log("first_all_oil_score=============" + this.all_oil_score);
        console.log("first_diagnose_score=============" + this.diagnose_score);
    }

    public range_change2(range){
      if(this.diagnose_score2===1){
        this.all_oil_score = this.all_oil_score-1;
      }
      if(this.diagnose_score2===2){
        this.all_oil_score = this.all_oil_score+0;
      }
      if(this.diagnose_score2===3){
        this.all_oil_score = this.all_oil_score+1;
      }
        console.log("first_range" + range.value);
        console.log("first_all_oil_score=============" + this.all_oil_score);
        console.log("first_diagnose_score2=============" + this.diagnose_score2);
    }

    public range_change3(range){
      if(this.diagnose_score3===1){
        this.all_oil_score = this.all_oil_score-1;
      }
      if(this.diagnose_score3===2){
        this.all_oil_score = this.all_oil_score+0;
      }
      if(this.diagnose_score3===3){
        this.all_oil_score = this.all_oil_score+1;
      }
        console.log("first_range" + range.value);
        console.log("first_all_score=============" + this.all_oil_score);
        console.log("first_diagnose_score3=============" + this.diagnose_score3);
    }

    public range_change4(range){
      if(this.diagnose_score4===1){
        this.all_oil_score = this.all_oil_score-1;
      }
      if(this.diagnose_score4===2){
        this.all_oil_score = this.all_oil_score+0;
      }
      if(this.diagnose_score4===3){
        this.all_oil_score = this.all_oil_score+1;
      }
        console.log("first_range" + range.value);
        console.log("first_all_score=============" + this.all_oil_score);
        console.log("first_diagnose_score4=============" + this.diagnose_score4);
    }

    public range_change5(range){
      if(this.diagnose_score5===1){
        this.all_oil_score = this.all_oil_score-1;
      }
      if(this.diagnose_score5===2){
        this.all_oil_score = this.all_oil_score+0;
      }
      if(this.diagnose_score5===3){
        this.all_oil_score = this.all_oil_score+1;
      }
        console.log("first_range" + range.value);
        console.log("first_all_score=============" + this.all_oil_score);
        console.log("first_diagnose_score5=============" + this.diagnose_score5);
    }


    public next_page(){
      //this.showAlert(this.all_score);
      if(this.all_oil_score<0){
        this.all_oil_score = 0;
      }
      this.auth.setUserStoragediagnose_first_oil(this.all_oil_score*20);
      this.auth.setUserStoragediagnose_first_check(true);
      if(this.platform.is('android')){
       const toast = this.toastCtrl.create({
        cssClass: 'blu_toast_android',
        message: '최초 스킨차트 문진표 등록이 완료되었습니다.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      }
      else{
        const toast = this.toastCtrl.create({
         cssClass: 'blu_toast_ios',
         message: '최초 스킨차트 문진표 등록이 완료되었습니다.',
         duration: 3000,
         position: 'bottom'
       });
       toast.present();
    }
    this.navCtrl.setRoot(TabsPage);
  }


  public dissmiss(){
    this.navCtrl.popTo(SkinDiagnoseFirstMoisturePage);
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


  }
