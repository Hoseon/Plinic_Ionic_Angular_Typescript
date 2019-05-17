import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Platform } from 'ionic-angular';
import { CareZoneMissionDeadlinePage } from '../care-zone-mission-deadline/care-zone-mission-deadline';
import { ImagesProvider } from '../../providers/images/images';

/**
 * Generated class for the CareZoneMissionIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-mission-ing',
  templateUrl: 'care-zone-mission-ing.html',
})
export class CareZoneMissionIngPage {

  public loadProgress: number = 0;

  _id: any;
  loading: Loading;
  carezoneData: any;
  endDate: any;
  imgUrl: any;
  constructor(public nav: NavController, public navParams: NavParams,
    private images: ImagesProvider,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, public platform: Platform, ) {
    this._id = this.navParams.get('_id');
    console.log("ing : " + this._id);
    this.roadmission(this._id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZoneMissionIngPage');
  }

  ngOnInit() {
    // 프로그레스바 로직
    setInterval(() => {
      if (this.loadProgress < 100)
        this.loadProgress += 1;
      else
        clearInterval(this.loadProgress);
    }, 50);
  }

  public roadmission(id) {
    this.showLoading();
    this.images.missionRoad(id).subscribe(data => {
      if (data !== '') {
        this.carezoneData = data;
        this.endDate = data.endmission.substr(0, 10);
        this.imgUrl = "http://plinic.cafe24app.com/carezone_prodimages/".concat(data._id);
        //this.imgUrl.includes(data._id);
        //console.log(JSON.stringify(this.carezoneData));
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




  public mission_deadline() {

    this.nav.push(CareZoneMissionDeadlinePage);
  }

  navpop(){
    this.nav.pop();
  }



}
