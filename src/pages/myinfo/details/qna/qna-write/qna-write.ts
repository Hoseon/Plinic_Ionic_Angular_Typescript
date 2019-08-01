import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, Loading, ViewController, Navbar  } from 'ionic-angular';
import { AuthService } from '../../../../../providers/auth-service';
// import { KeyboardAttachDirective } from '../../../../../providers/keyboard-attach.directive'
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
// import { Keyboard } from '@ionic-native/keyboard';




/**
 * Generated class for the QnaWritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qna-write',
  templateUrl: 'qna-write.html',
  // providers: [Keyboard]
})
export class QnaWritePage {

  id: any;
  loading: Loading;
  registerQna = { qna_select: '', qna_input: '', id: '' };
  qna_input: any;
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  qnaDetailData: any;
  mode: any;
  unregisterBackButtonAction: Function

  @ViewChild('navbar') navBar: Navbar;

  constructor(
    // public keyboard: Keyboard,
    public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController, private auth: AuthService
  , public viewCtrl: ViewController ) {

      this.platform.ready().then((readySource) => {

          this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
              this.dissmiss();
          }, 99999);
      });
  }

  ionViewDidEnter() {
      this.navBar.backButtonClick = () => {
        this.dissmiss();
      };

    }

  public dissmiss() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "plinic",
      message: "문의하기 작성을 취소하시겠습니까?",
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
            this.viewCtrl.dismiss();
          }
        }]
    });
    alert.present();
  }

  ionViewWillLeave(){
    this.unregisterBackButtonAction();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad QnaWritePage');
    // this.keyboard.disableScroll(true);
  }

  ionViewWillEnter() {
    if (this.navParams.get('id') === '' || this.navParams.get('id') !== undefined) {
      this.id = this.navParams.get('id');
      // console.log("write Id : " + this.id);
      this.loadQna(this.id, 'edit');
    }
    this.loadItems();
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        // tabs[ key ].style.transform = 'translateY(56px)';
        tabs[key].style.display = 'none';
      });
    } // end if
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
        // console.log(this.userData);
      }
    });
  }

  qna_submit() {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "문의하기",
      message: "문의하기 내용을 전송하시겠습니까? <br> 관리자에게 답변을 받을 수 있습니다.",
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
            if (this.mode === true) {
              this.registerQna.id = this.id;
              // console.log("update Id :" + this.id);
              this.auth.qnaUpdate(this.userData.email, this.registerQna).subscribe(data => {
                if (data !== "") {
                  let alert2 = this.alertCtrl.create({
                    cssClass: 'push_alert',
                    title: '문의하기',
                    message: "문의하기가 정상적으로 수정 되었습니다. <br>관리자에게 답변을 받을 수 있습니다.",
                    buttons: [
                      {
                        text: '확인',
                        handler: () => {
                          this.navCtrl.pop();
                        }
                      }
                    ]
                  });
                  alert2.present();
                }
                // this.nav.push(CareZoneMissionIngPage, { _id: id });
              }, error => {
                this.showError(JSON.parse(error._body).msg);
              });

            } else {
              this.auth.qnaSave(this.userData.email, this.registerQna).subscribe(data => {
                if (data !== "") {
                  let alert2 = this.alertCtrl.create({
                    cssClass: 'push_alert',
                    title: '문의하기',
                    message: "문의하기가 정상적으로 등록 되었습니다. <br>관리자에게 답변을 받을 수 있습니다.",
                    buttons: [
                      {
                        text: '확인',
                        handler: () => {
                          this.navCtrl.pop();
                        }
                      }
                    ]
                  });
                  alert2.present();
                }
                // this.nav.push(CareZoneMissionIngPage, { _id: id });
              }, error => {
                this.showError(JSON.parse(error._body).msg);
              });
            }
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


  public loadQna(id, mode) {
    this.auth.getQna(id).subscribe(data => {
      if (mode === 'edit') {
        this.mode = true;
      } else { this.mode = false }
      this.registerQna.qna_input = data[0].qna;
      switch (data[0].select) {
        case '배송문의': {
          this.registerQna.qna_select = '배송문의';
          break;
        }
        case '결제문의': {
          this.registerQna.qna_select = '결제문의';
          break;
        }
        case '제품문의': {
          this.registerQna.qna_select = '제품문의';
          break;
        }
        case '피부문의': {
          this.registerQna.qna_select = '피부문의';
          break;
        }
        case '플리닉문의': {
          this.registerQna.qna_select = '플리닉문의';
          break;
        }
        case '기타문의': {
          this.registerQna.qna_select = '기타문의';
          break;
        }
        default: {
          //statements;
          break;
        }
      }
      // this.commentData = data[0].comments;
      // if(data[0].comments.length > 0){
      //   this.button = true;
      // } else {
      //   this.button = false;
      // }
      // console.log("qnaData : " + JSON.stringify(data));
      // this.temp = JSON.stringify(qnaitems);
    })
  }



}
