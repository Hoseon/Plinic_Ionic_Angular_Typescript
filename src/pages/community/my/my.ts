import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides, ModalController } from 'ionic-angular';
import { ImagesProvider } from '../../../providers/images/images';
import { MyCommunityModifyPage } from './my-community-modify/my-community-modify';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../../../providers/auth-service';

/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

   page = "0";
   skinQnaData: any;
   beautyNoteData: any;
   @ViewChild(Slides) slides: Slides;
   jwtHelper: JwtHelper = new JwtHelper();
   userData: any;
    id: any;
    mode: any;

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, private images: ImagesProvider, public modalCtrl: ModalController, public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
    this.id = this.navParams.get('id');
    this.mode = this.navParams.get('mode');
  }


  ionViewCanEnter() {
    this.loadItems();
  }

  ionViewWillEnter() {
    this.skinQnaLoad();
    this.beautyNoteLoad();

    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        //tabs[ key ].style.transform = 'translateY(0)';
        tabs[key].style.display = 'none';
      });
    }
  }


  public community_qna_modify(id) {
    this.nav.push(MyCommunityModifyPage, { id: id, mode: 'qna' });
  }
  public community_modify(id) {
    this.nav.push(MyCommunityModifyPage, { id: id, mode: 'qna' });

  }


  selectedTab(tab){
    this.slides.slideTo(tab);

    console.log('  this.slides.slideTo(tab)==================='+   this.slides.slideTo(tab));
  }

  slideChanged($event) {
    this.page = $event._snapIndex.toString();
    console.log(this.page);

    if(this.page!=='0' && this.page!=='1'){
      setTimeout(() => {
      this.slides.slideTo(0, 0);
  }, 100)
  }
}

public beautyNoteLoad() {
  this.images.beautyNoteLoad().subscribe(data => {
    this.beautyNoteData = data;
  });
}

public skinQnaLoad() {
  this.images.skinQnaLoad().subscribe(data => {
    this.skinQnaData = data;
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
          from: 'plinic',
        };
      }
    });
  }
}
