import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';


/**
 * Generated class for the RewardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html',
})
export class RewardPage {

  ishidden: boolean = false;
  name: any;
  zonecode: any;
  address: any;
  detailAddress: any;
  desc: any;
  bname: any;
  buildingName: any;
  setInter: any;
  phoneNumber: any;
  carezoneData2: any;
  userData: any;
  thumb_image: any;
  saveRewardData: any;
  postEmail: any;
  review: any;
  jwtHelper: JwtHelper = new JwtHelper();



  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private auth: AuthService, public alertCtrl: AlertController, public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardPage');
    this.carezoneData2 = this.navParams.get('mission');
    console.log(this.carezoneData2);
  }

  ionViewDidEnter() {

  }

  ionViewCanEnter() {
    this.loadItems();
  }

  ionViewCanLeave() {
    console.log('ionViewCanLeave Leave!!');
    clearInterval(this.setInter);
  }

  ionViewWillLeave(){
    console.log('ionViewCanLeave Leave!!');
    clearInterval(this.setInter);
  }



  public loadItems() {
    this.auth.getUserStorage().then(items => {

      if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver') {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: items.birthday,
          email: items.email,
          gender: items.gender,
          nickname: items.nickname,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
          from: items.from,
          snsid: items.snsid
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
        }
        //this.chkmission(this.userData.email);
      } else {
        this.userData = {
          accessToken: items.accessToken,
          id: items.id,
          age_range: items.age_range,
          birthday: items.birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: items.gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: items.profile_image,
          thumbnail_image: items.thumbnail_image,
        };
        // console.log(this.userData);
        //this.chkmission(this.userData.email);
      }
    });
  }

  daumposthide() {
    this.ishidden = false;
  }

  postCheck() {
    this.ishidden = true;
    this.setInter = setInterval(() => {
      this.auth.getPostCodeCheck().subscribe(data => {
        if (data) {
          this.zonecode = data['data'].zonecode;
          this.address = data['data'].address;
          this.buildingName = data['data'].buildingName;
          this.ishidden = false;  //데이터 들어 오면 우편번호는 iframe을 숨긴다.
          clearInterval(this.setInter);
        } else {
          console.log('다음주소 못가져옴 false');
        }
      })
    }, 1000);
  }

  postFocusOut() {
    if (this.ishidden) {
      clearInterval(this.setInter);
      this.ishidden = false;  //데이터 들어 오면 우편번호는 iframe을 숨긴다.
    }
  }

  inputPhoneNumber() {
    var number = this.phoneNumber.replace(/[^0-9]/g, "");
    // var number = obj.value.replace(/[^0-9]/g, "");
    var phone = "";

    if (number.length < 4) {
      return number;
    } else if (number.length < 7) {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3);
    } else if (number.length < 11) {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3, 3);
      phone += "-";
      phone += number.substr(6);
    } else {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3, 4);
      phone += "-";
      phone += number.substr(7);
    }
    this.phoneNumber = phone;
  }

  registerChallengeReward() {

    if (this.carezoneData2) {
      this.saveRewardData = {
        name: this.name,
        missionid: this.carezoneData2._id,
        reward: true,
        product: this.carezoneData2.product,
        prodfilename: this.carezoneData2.prodfilename,
        prodoriginalname: this.carezoneData2.prodoriginalname,
        title: this.carezoneData2.title,
        startmission: this.carezoneData2.startmission,
        endmission: this.carezoneData2.endmission,
        zonecode: this.zonecode,
        address: this.address,
        detailAddress: this.detailAddress,
        desc: this.desc,
        bname: this.bname,
        buildingName: this.buildingName,
        phoneNumber: this.phoneNumber,
        postemail: this.postEmail,
        review: this.review
      }
    }



    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "보상받기",
      message: "보상받기 작성을 완료 하시겠습니까?",
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
            this.auth.rewardChallengeSave(this.userData.email, this.saveRewardData).subscribe(data => {
              if (data) {
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert',
                  title: '글 작성',
                  message: "보상받기가 저장되었습니다.<br>플리닉에서 발송정보를 Email로 보내 드릴게요.",
                  buttons: [
                    {
                      text: '확인',
                      handler: () => {
                        //this.nav.pop();
                        clearInterval(this.setInter);
                        this.viewCtrl.dismiss({
                          // page_modify: this.page_modify
                        });
                      }
                    }
                  ]
                });
                alert2.present();
              }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            },
              error => {
                this.showError(JSON.parse(error._body).msg);
              });
          }
        }]
    });
    alert.present();
  }


  registerReward() {

    if (this.carezoneData2) {
      this.saveRewardData = {
        name: this.name,
        missionid: this.carezoneData2._id,
        reward: true,
        product: this.carezoneData2.product,
        prodfilename: this.carezoneData2.prodfilename,
        prodoriginalname: this.carezoneData2.prodoriginalname,
        title: this.carezoneData2.title,
        startmission: this.carezoneData2.startmission,
        endmission: this.carezoneData2.endmission,
        zonecode: this.zonecode,
        address: this.address,
        detailAddress: this.detailAddress,
        desc: this.desc,
        bname: this.bname,
        buildingName: this.buildingName,
        phoneNumber: this.phoneNumber,
        postemail: this.postEmail,
        review: this.review
      }
    }



    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "보상받기",
      message: "보상받기 작성을 완료 하시겠습니까?",
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
            this.auth.rewardSave(this.userData.email, this.saveRewardData).subscribe(data => {
              if (data) {
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert',
                  title: '글 작성',
                  message: "보상받기가 저장되었습니다.<br>플리닉에서 발송정보를 Email로 보내 드릴게요.",
                  buttons: [
                    {
                      text: '확인',
                      handler: () => {
                        //this.nav.pop();
                        clearInterval(this.setInter);
                        this.viewCtrl.dismiss({
                          // page_modify: this.page_modify
                        });
                      }
                    }
                  ]
                });
                alert2.present();
              }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            },
              error => {
                this.showError(JSON.parse(error._body).msg);
              });
          }
        }]
    });
    alert.present();
  }

  showError(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }

}
