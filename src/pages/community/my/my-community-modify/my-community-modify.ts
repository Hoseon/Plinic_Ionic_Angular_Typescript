import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, ModalController } from 'ionic-angular';
import { PopoverPage } from '../../community-modify/popover/popover';
import { ImagesProvider } from '../../../../providers/images/images';
import { CommunityWritePage } from '../../community-write/community-write';
import { AuthService } from '../../../../providers/auth-service';



/**
 * Generated class for the MyCommunityModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-community-modify',
  templateUrl: 'my-community-modify.html',
})
export class MyCommunityModifyPage {


  select_popover_option: any = "보기";
  skinQnaData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public popoverCtrl: PopoverController, private auth: AuthService,
  public modalCtrl: ModalController, private images: ImagesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCommunityModifyPage');
  }
  ionViewWillEnter() {
    this.skinQnaLoad();
  }
  
  public skinQnaLoad() {
    this.images.skinQnaLoad().subscribe(data => {
      this.skinQnaData = data;
    });
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


}
