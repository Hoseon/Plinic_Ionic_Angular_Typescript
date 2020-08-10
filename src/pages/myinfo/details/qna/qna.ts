import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { QnaWritePage } from './qna-write/qna-write';
import { AuthService } from '../../../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { QnaReadPage } from './qna-read/qna-read';


/**
 * Generated class for the QnaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qna',
  templateUrl: 'qna.html',
})
export class QnaPage {

  seeTabs;
  qna_select: any = '';
  qna_input: any = '';
  qnaData: any = '';
  qnaData_length: any;
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();


  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, public auth: AuthService) {

  }

  ionViewDidLoad() {
    this.seeTabs = false;
    // console.log('ionViewDidLoad QnaPage');
  }

  ionViewWillEnter() {
    this.loadItems();

    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        // tabs[ key ].style.transform = 'translateY(56px)';
        tabs[key].style.display = 'none';
      });
    } // end if


  }

  public qna_read(id) {
    // console.log("qna_ID : " + id)
    this.nav.push(QnaReadPage, { id: id });
    //this.nav.push(QnaReadPage);
  }

  public qna_write() {
    this.nav.push(QnaWritePage);
  }

  loadQna(email) {
    this.auth.getAllQna(email).subscribe(items => {
      this.qnaData = items;
      this.qnaData_length = items.length;
      console.log(items);
      console.log(items.length);
    })
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
        // console.log(this.userData);
        this.loadQna(this.userData.email);
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
        this.loadQna(this.userData.email);
      }
    });
  }
}
