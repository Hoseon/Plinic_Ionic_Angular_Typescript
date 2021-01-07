import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { SkinChekCamera4Page } from "../skin-chek-camera4/skin-chek-camera4";


/**
 * Generated class for the SkinChekCamera3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-skin-chek-camera3",
  templateUrl: "skin-chek-camera3.html",
})
export class SkinChekCamera3Page {
  file1: any;
  file2: any;
  userData: any;
  diagnose_score: any;
  isSubLoading = true;
  ageRange: any;
  step: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
  ) {
    if (this.navParams.get("file1")) {
      this.file1 = this.navParams.get("file1");
    }

    if (this.navParams.get("file2")) {
      this.file2 = this.navParams.get("file2");
    }

    if (this.navParams.get("userData")) {
      this.userData = this.navParams.get("userData");
    }

    if (this.navParams.get("diagnose_score")) {
      this.diagnose_score = this.navParams.get("diagnose_score");
    }

    if (this.navParams.get("ageRange")) {
      this.ageRange = this.navParams.get("ageRange");
    }

    if (this.navParams.get("step")) {
      this.step = this.navParams.get("step");
    }

    console.log("file1의 경로 : " + this.file1);
    console.log("file2의 경로 : " + this.file2);
    console.log("userData 경로 : " + this.userData);
    console.log("diagnose_score 경로 : " + this.diagnose_score);
    console.log("ageRange 경로 : " + this.ageRange);
    console.log("step 경로 : " + this.step);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SkinChekCamera3Page");
    this.awiat10Second();
  }

  awiat10Second() {
    setTimeout(() => {
      if(this.file1 && this.file2 && this.userData && this.diagnose_score) {
        this.navCtrl.push(SkinChekCamera4Page,{file1:this.file1, file2:this.file2, userData: this.userData, diagnose_score: this.diagnose_score, ageRange: this.ageRange, step: this.step}).then(() => {
          this.navCtrl.getActive().onDidDismiss(data => {
            console.log("카메라3 페이지 닫힘");
          });
        });
      }
    }, 11000);
  }
}
