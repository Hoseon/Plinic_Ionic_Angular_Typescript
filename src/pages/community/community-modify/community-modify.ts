import { Component, ViewChild, Directive, HostListener, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, PopoverController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { PopoverPage } from './popover/popover';
import { ImagesProvider } from '../../../providers/images/images';
import { CommunityWritePage } from '../community-write/community-write';
import { AuthService } from '../../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';



@IonicPage()
@Component({
  selector: 'page-community-modify',
  templateUrl: 'community-modify.html',
})
// @Directive({
//   selector: "ion-textarea[autoresize]" // Attribute selector
// })

export class CommunityModifyPage {


  id: any;
  mode: any;
  beautyNoteOneLoadData: any;
  skinQnaOneLoadData: any;
  tags = [];
  comment_popover_option: any = "보기";
  select_popover_option: any = "보기";
  userData: any;
  profileimg_url: any;
  jwtHelper: JwtHelper = new JwtHelper();

  registerReply = { comment : '', id : ''};



  @ViewChild('myInput') myInput: ElementRef;


  constructor(private alertCtrl : AlertController, private auth: AuthService, public nav: NavController, public navParams: NavParams, public platform: Platform, private images: ImagesProvider,
    public viewCtrl: ViewController, public popoverCtrl: PopoverController, public element: ElementRef, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.platform.ready().then((readySource) => {


      //this.presentLoading();
    })
  }

  ionViewCanEnter() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityModifyPage');
    this.loadItems();
    this.id = this.navParams.get('id');
    this.mode = this.navParams.get('mode');
    console.log("mode : " + this.mode);
    if (this.navParams.get('mode') === 'qna') {
      this.skinQnaOneLoad(this.id);
    } else {
      this.beautyNoteOneLoad(this.id);
    }
  }

  ionViewDidEnter(){
    // console.log("refresh");
  }

  update(){
    this.viewCtrl._didLoad();
    // this.nav.setRoot(this.nav.getActive().component);
  }


  resize() {
    this.myInput.nativeElement.style.height = 'auto'
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  textareaResize() {
    this.myInput.nativeElement.style.height = '40px'
    // this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }





  // 글쓰기 수정 popover
  public select_popover(event) {
    if (this.platform.is('ios')) {
      let popover = this.popoverCtrl.create(PopoverPage, {},
        {
          cssClass: "ios_popover"
        });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(popoverData => {
        console.log(popoverData);
        this.select_popover_option = popoverData;
        if (this.select_popover_option === "수정") {
          setTimeout(() => {
            console.log('수정');
            let myModal = this.modalCtrl.create(CommunityWritePage);
            myModal.present();
          }, 100)
        }
        else if (this.select_popover_option === "삭제") {
          console.log('select_popover_option==========' + this.select_popover_option);
        }
      });
    }
    else {
      let popover = this.popoverCtrl.create(PopoverPage, {},
        {
          cssClass: "android_popover"
        });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(popoverData => {
        console.log(popoverData);
        this.select_popover_option = popoverData;
        if (this.select_popover_option === "수정") {
          setTimeout(() => {
            console.log('수정');
            let myModal = this.modalCtrl.create(CommunityWritePage);
            myModal.present();
          }, 100)
        }
        else if (this.select_popover_option === "삭제") {
          console.log('select_popover_option==========' + this.select_popover_option);
        }
      });
    }
  }


  // 댓글 수정
  public comment_popover(event) {
    if (this.platform.is('ios')) {
      let popover = this.popoverCtrl.create(PopoverPage, {},
        {
          cssClass: "ios_comment_popover"
        });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(popoverData => {
        console.log(popoverData);
        this.comment_popover_option = popoverData;
        if (this.comment_popover_option === "수정") {
          setTimeout(() => {
            console.log('수정');
            this.presentLoading();
            this.resize();
          }, 100)
        }
        else if (this.comment_popover_option === "삭제") {
          console.log('comment_popover_option==========' + this.comment_popover_option);
        }
      });
    }
    else {
      let popover = this.popoverCtrl.create(PopoverPage, {},
        {
          cssClass: "android_comment_popover"
        });
      popover.present({
        ev: event
      });

      popover.onDidDismiss(popoverData => {
        console.log(popoverData);
        this.comment_popover_option = popoverData;
        if (this.comment_popover_option === "수정") {
          setTimeout(() => {
            console.log('수정');
            this.presentLoading();
            this.resize();
          }, 100)
        }
        else if (this.comment_popover_option === "삭제") {
          console.log('comment_popover_option==========' + this.comment_popover_option);
        }
      });
    }
  }




  presentLoading() {
    const loader = this.loadingCtrl.create({
      cssClass: 'sk-rotating-plane',
      showBackdrop: true,
      duration: 50,
    });
    loader.present();
  }


  protected adjustTextarea(): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    return;
  }





  public dissmiss() {
    this.viewCtrl.dismiss();
  }

  public beautyNoteOneLoad(id) {
    this.images.beautyNoteOneLoad(id).subscribe(data => {
      this.beautyNoteOneLoadData = data;
      this.tags = data.tags.split(",");
      console.log("태그 길이 : " + this.tags.length);
      // for(var i = 0; i < data.length; i++){
      //
      // }
    });
  }

  public skinQnaOneLoad(id) {
    this.images.skinQnaOneLoad(id).subscribe(data => {
      this.skinQnaOneLoadData = data;
      this.tags = data.tags.split(",");
      console.log("태그 길이 : " + this.tags.length);
    });
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
      this.profileimg_url = "http://plinic.cafe24app.com/userimages/";
      this.profileimg_url = this.profileimg_url.concat(this.userData.email + "?random+\=" + Math.random());
    });
  }

  saveReply() {
    console.log(this.id);
    console.log(this.registerReply.comment);
    this.registerReply.id = this.id;
    this.auth.replySave(this.userData.email, this.registerReply).subscribe(data => {
      if (data !== "") {
        let alert2 = this.alertCtrl.create({
          cssClass: 'push_alert',
          title: '댓글달기',
          message: "댓글이 정상적으로 등록되었습니다.",
          buttons: [
            {
              text: '확인',
              handler: () => {
                this.registerReply.comment = '';
                this.textareaResize();
                this.update();
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



}
