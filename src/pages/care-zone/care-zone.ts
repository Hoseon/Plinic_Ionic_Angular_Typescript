import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CareZoneIngPage } from '../care-zone-ing/care-zone-ing';
import { ImagesProvider } from '../../providers/images/images';
import { CareZoneMissionIngPage } from '../care-zone-mission-ing/care-zone-mission-ing'
import { CareZoneMissionStartPage } from '../care-zone-mission-start/care-zone-mission-start'
import { CareZoneMissionDeadlineEndPage } from '../care-zone-mission-deadline-end/care-zone-mission-deadline-end'
import { AuthService } from '../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';


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
  nickname: string;
  jwtHelper: JwtHelper = new JwtHelper();
  currentDate: Date = new Date();
  today: any = new Date().toISOString();
  new: Array<boolean> = new Array<boolean>();
  //kuliners: Array<any> = null;
  recruiting: Array<boolean> = new Array<boolean>();
  mdchuchun: Array<boolean> = new Array<boolean>();
  approaching: Array<boolean> = new Array<boolean>();
  endrecruit: Array<boolean> = new Array<boolean>();


  constructor(public platform: Platform, public nav: NavController,
    public navParams: NavParams, private images: ImagesProvider,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, public authService: AuthService, ) {
    this.platform.ready().then((readySource) => {
      this.carezoneData = this.roadcareZone();
      this.loadItems();
      //this.new = new Array<boolean>();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareZonePage');
  }

  public loadItems() {
    this.authService.getUserStorage().then(items => {

      //this.userData = items;

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


  public diffdate(date1: Date = new Date(), date2: Date = new Date()) {
    return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
  }

  public roadcareZone() {
    this.showLoading();
    this.images.carezoneRoad().subscribe(data => {
      if (data !== '') {
        for (let i = 0; i < data.length; i++) {
          data[i].startmission = new Date(data[i].startmission);
          this.new[i] = false;
          this.recruiting[i] = false;
          this.mdchuchun[i] = false;
          this.approaching[i] = false;
          this.endrecruit[i] = false;
          if(this.diffdate(this.currentDate, data[i].startmission) < -10){
            console.log("D-10 :");
            this.new[i] = true;
            this.recruiting[i] = true;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
            //this.new.splice(i, 0, true);
          } else if (this.diffdate(this.currentDate, data[i].startmission) < -7 ){
            console.log("D-7 :");
            this.new[i] = false;
            this.recruiting[i] = true;
            this.mdchuchun[i] = true;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
          } else if (this.diffdate(this.currentDate, data[i].startmission) < -3 || this.diffdate(this.currentDate, data[i].startmission) < 0){
            console.log("D-3 :");
            this.new[i] = false;
            this.recruiting[i] = true;
            this.mdchuchun[i] = false;
            this.approaching[i] = true;
            this.endrecruit[i] = false;
          } else if (this.diffdate(this.currentDate, data[i].startmission) >= 0){
            console.log("모집마감 :");
            this.new[i] = false;
            this.recruiting[i] = false;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = true;
          } else {
            console.log("11111");
            this.new[i] = false;
            this.recruiting[i] = true;
            this.mdchuchun[i] = false;
            this.approaching[i] = false;
            this.endrecruit[i] = false;
          }
        }
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
