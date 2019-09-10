import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { QnaWritePage } from '../qna-write/qna-write';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../../../../providers/auth-service';
// import { LocalNotifications } from '@ionic-native/local-notifications';
import { format } from 'date-fns';


/**
 * Generated class for the QnaReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qna-read',
  templateUrl: 'qna-read.html',
})
export class QnaReadPage {

  id: any;
  userData: any;
  qnaDetailData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  email: any;
  temp: any;
  commentData: any;
  button: any;
  createdAt: any;

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, public auth: AuthService,  public alertCtrl: AlertController,
    // private localNotifications: LocalNotifications
   ) {
    this.platform.ready().then((readySource) => {

    });
}


  ionViewDidLoad() {
    // console.log('ionViewDidLoad QnaReadPage');
  }

  ionViewWillEnter() {
    this.id = this.navParams.get('id');
    this.loadItems();
    this.loadQna(this.id);
  }


  public qna_answer(answer){
    if(answer){
       console.log("answer=============="+ answer);
       // this.auth.get_qna_answer();
    }
    else{
      console.log("answer=============="+ answer);
    }
  }

  public qna_write(id) {
    // console.log("ididididid " + id);
    this.nav.push(QnaWritePage, { id: id });
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
        };
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
      }
    });
  }

 public loadQna(id){
    this.auth.getQna(id).subscribe(data => {
      this.qnaDetailData = data;
      this.qnaDetailData.createdAt = format(data[0].createdAt, 'YYYY.MM.DD');
      console.log("dddddddddd"+ this.qnaDetailData.createdAt);
      this.commentData = data[0].comments;
      if(data[0].comments.length > 0){
        this.button = true;
      } else {
        this.button = false;
      }
      // console.log("qnaData : " + JSON.stringify(data));
      // this.temp = JSON.stringify(qnaitems);
    })
  }

}
