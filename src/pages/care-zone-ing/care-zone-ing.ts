import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController, AlertController } from 'ionic-angular';
import { ImagesProvider } from '../../providers/images/images';
import { AuthService } from '../../providers/auth-service';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing'
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start'
import { CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end'
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';


/**
 * Generated class for the CareZoneIngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-zone-ing',
  templateUrl: 'care-zone-ing.html',
})
export class CareZoneIngPage {
  carezoneData: any;
  loading: Loading;
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  thumb_image: any;
  imagePath: any;
  from: any;
  profileimg_url : any;
  constructor(public platform: Platform, public nav: NavController, public navParams: NavParams,
    private images: ImagesProvider, private loadingCtrl: LoadingController, private alertCtrl: AlertController, public authService: AuthService,) {
    this.platform.ready().then((readySource) => {
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CareZoneIngPage');
  }

  ionViewWillEnter() {

    this.carezoneData = this.roadcareZone();
    this.loadItems();
    this.loadimagePath();
  }


  public loadimagePath() {
    this.authService.getUserStorageimagePath().then(items => {
        this.imagePath = items;
});
}


public loadItems() {
  this.authService.getUserStorage().then(items => {

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
        from: 'plinic',
      };

      this.from= 'plinic';
    }
    this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
    this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
  });
}




  public mission_ing() {
    this.nav.push(CareZoneMissionIngPage);
  }
  public mission_start() {
    this.nav.push(CareZoneMissionStartPage);
  }
  public mission_deadline_end() {
    this.nav.push(CareZoneMissionDeadlineEndPage);
  }




  public roadcareZone() {
    this.showLoading();
    this.images.carezoneRoad().subscribe(data => {
      if (data !== '') {
        this.carezoneData = data;
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

  showAlert(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass:'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
