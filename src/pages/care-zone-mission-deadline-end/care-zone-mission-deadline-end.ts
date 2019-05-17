import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Platform } from 'ionic-angular';
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start';
import { ImagesProvider } from '../../providers/images/images';
/**
 * Generated class for the CareZoneMissionDeadlineEndPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-mission-deadline-end',
  templateUrl: 'care-zone-mission-deadline-end.html',
})
export class CareZoneMissionDeadlineEndPage {

  _id: any;
  loading: Loading;
  carezoneData: any;
  endDate: any;

  constructor(public nav: NavController, public navParams: NavParams,
    private images: ImagesProvider,private loadingCtrl: LoadingController, private alertCtrl: AlertController, public platform: Platform,
  ) {

    this.platform.ready().then((readySource) => {
      this._id = this.navParams.get('_id');
      this.roadmission(this._id);
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneMissionDeadlineEndPage');
  }


  public mission_start() {
    this.nav.push(CareZoneMissionStartPage);
  }


  public roadmission(id) {
    this.showLoading();
    this.images.missionRoad(id).subscribe(data => {
      if (data !== '') {
        this.carezoneData = data;
        this.endDate = data.endmission.substr(0, 10);
        //console.log(JSON.stringify(data));
        this.loading.dismiss();
      } else {
        this.showError("이미지를 불러오지 못했습니다. 관리자에게 문의하세요.");
      }
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




}
