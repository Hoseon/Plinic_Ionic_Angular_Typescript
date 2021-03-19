import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { MyinfoPage } from '../myinfo/myinfo';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { ImagesProvider } from '../../providers/images/images';
import { CommunityModifyPage } from '../community/community-modify/community-modify';

/**
 * Generated class for the MyqnaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myqna',
  templateUrl: 'myqna.html',
})
export class MyqnaPage {

  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  isnullData: boolean = false;
  totaluserpoint: any = 0;
  chkbtn: boolean = false;
  skinQnaData: any;


  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, private auth: AuthService, private images: ImagesProvider, private modalCtrl : ModalController) {
  }

  ionViewCanEnter(){
    console.log('ionViewCanEnter ChulsukCheckPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyqnaPage');
    this.loadItems();
  }

  ionViewDidEnter() { 
    console.log('ionViewDidEnter ChulsukCheckPage');
    this.skinQnaLoad();
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave ChulsukCheckPage');
  }

  close() {
    this.nav.pop();
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
        this.reloadUserPoint(this.userData.email);
        // this.chkmission(this.userData.email); 2020-02-10 챌린지 체크로 변경되어 주석 처리
        // this.challengeChkMission(this.userData.email);
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
        this.reloadUserPoint(this.userData.email);
        // this.chkmission(this.userData.email); 2020-02-10 챌린지 체크로 변경되어 주석 처리
        // this.chkUserImage(this.userData.email);
      }
    });
  }

  private reloadUserPoint(email) {
    
    // this.auth.reloadUserPoint(email).subscribe(data => {
    //   this.totaluserpoint = data;
    //   this.totaluserpoint = this.addComma(this.totaluserpoint);
    // });

    this.auth.reloadUserPointfromPlinc(email).subscribe(
      data => {
        this.totaluserpoint = JSON.stringify(data.totalPoint);
        this.totaluserpoint = this.addComma(this.userData.totaluserpoint);
      },
      error => {
        console.log(
          "사용자 개인포인트 불러오기 에러발생 : " + JSON.stringify(error)
        );
      }
    );
  }

  addComma(data_value) { //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString('en');
  }

  public myinfo() {
    this.nav.push(MyinfoPage);
  }

  public skinQnaLoad() {
    this.images.skinQnaLoad().subscribe(data => {
      this.skinQnaData = data;
    });
  }

  public community_modify(id) {
    // this.nav.push(MyCommunityModifyPage, { id: id, mode: 'qna' });
    let myModal = this.modalCtrl.create(CommunityModifyPage, {
      id: id,
      mode: 'qna'
    });
    myModal.onDidDismiss(data => {
      // this.ionViewWillEnter();
    });
    myModal.present();
  }

}
