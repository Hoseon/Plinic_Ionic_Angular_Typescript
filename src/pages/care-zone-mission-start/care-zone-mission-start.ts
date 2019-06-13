import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Platform } from 'ionic-angular';
import { CareZoneMissionCompletePage } from '../care-zone-mission-complete/care-zone-mission-complete';
import { ImagesProvider } from '../../providers/images/images';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing'
/**
 * Generated class for the CareZoneMissionStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-mission-start',
  templateUrl: 'care-zone-mission-start.html',
})
export class CareZoneMissionStartPage {
  _id: any;
  loading: Loading;
  carezoneData: any;
  endDate: any;
  startDate: any;
  currentDate: Date = new Date();
  dday: any;
  getday: any;
  constructor(public nav: NavController, public navParams: NavParams, private images: ImagesProvider,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, public platform: Platform,
  ) {
    this.platform.ready().then((readySource) => {
      this._id = this.navParams.get('_id');
      this.roadmission(this._id);
      this.getDday();
    });


    //this._id = this.navParams.get('_id');
    //this.carezoneData = this.roadmission(this._id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneMissionStartPage');
  }


  public mission_complete() {
    this.nav.push(CareZoneMissionCompletePage);
  }

  public roadmission(id) {
    this.showLoading();
    this.images.missionRoad(id).subscribe(data => {
      if (data !== '') {
        this.carezoneData = data;
        this.startDate = data.startmission.substr(0, 10);
        this.endDate = data.endmission.substr(0, 10);
        //console.log(JSON.stringify(data));
        this.loading.dismiss();
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }

      this.getday = new Date(this.carezoneData.startmission);
      this.dday = this.diffdate(this.getday, this.currentDate);
      this.dday = parseInt(this.dday)
      //console.log("D-Day :" + this.dday);
    });

  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }


  satrtMission(id) {
    //console.log(id);
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "미션 참여",
      message: "미션을 정말 참여하시겠습니까? <br> 미션은 1개만 참여가 가능합니다.",
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            console.log('취소');
          }
        },
        {
          text: '확인',
          handler: () => {
            console.log('확인'),
              this.nav.push(CareZoneMissionIngPage, { _id: id });
          }
        }]
    });
    alert.present();
  }

  public diffdate(date1: Date = new Date(), date2: Date = new Date()) {
    return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
  }

  public getDday(){
    console.log(this.carezoneData);
    //this.getday = new Date(this.carezoneData.startmission)
    //this.dday = this.diffdate(this.getday, this.currentDate)
    //console.log("D-Day :" + this.dday);
  }

}
