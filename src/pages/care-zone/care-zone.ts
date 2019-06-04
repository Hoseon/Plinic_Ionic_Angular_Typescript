import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CareZoneIngPage } from '../care-zone-ing/care-zone-ing';
import { ImagesProvider } from '../../providers/images/images';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing'
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start'
import { CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end'
import { AuthService } from '../../providers/auth-service';


/**
 * Generated class for the CareZonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone',
  templateUrl: 'care-zone.html',
})
export class CareZonePage {
  carezoneData: any;
  loading: Loading;
  userData: any;
  constructor(public platform: Platform, public nav: NavController,
    public navParams: NavParams, private images: ImagesProvider,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, public authService: AuthService,) {
    this.platform.ready().then((readySource) => {
      this.carezoneData = this.roadcareZone();
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZonePage');
  }

  public loadItems(){
    this.authService.getUserStorage().then(items => {
      this.userData = items;
      console.log(this.userData);
      // this.userData = {
      //   accessToken: items.accessToken,
      //   id: items.id,
      //   age_range: items.age_range,
      //   birthday: items.birthday,
      //   email: items.email,
      //   gender: items.gender,
      //   nickname: items.nickname,
      //   profile_image: items.profile_image,
      //   thumbnail_image: items.thumbnail_image,
      // };
      // this.accessToken = items.accessToken
      // this.id = items.id
      // this.age_range = items.age_range
      // this.birthday = items.birthday
      // this.email = items.email
      // this.gender = items.gender
      // this.nickname = items.nickname
      // this.profile_image = items.profile_image
      // this.thumbnail_image =  items.thumbnail_image
    });
  }



  public carezone_ing() {
    this.nav.push(CareZoneIngPage);
  }
  public mission_ing() {
    this.nav.push(CareZoneMissionIngPage);
  }
  public mission_start(id) {
    console.log(id);
    //this.nav.push(CareZoneMissionStartPage);
    this.nav.push(CareZoneMissionStartPage, { _id: id });
  }
  public mission_deadline_end() {
    this.nav.push(CareZoneMissionDeadlineEndPage);
  }




  public roadcareZone() {
    this.showLoading();
    this.images.carezoneRoad().subscribe(data => {
      if(data !==''){
      this.carezoneData = data;
      //console.log(JSON.stringify(data));
      this.loading.dismiss();
    } else{
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
