import { Component, ViewChild, Directive, HostListener, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, PopoverController, LoadingController, ModalController } from 'ionic-angular';
import { PopoverPage } from './popover/popover';
import { ImagesProvider } from '../../../providers/images/images';
import { CommunityWritePage } from '../community-write/community-write';

@IonicPage()
@Component({
  selector: 'page-community-modify',
  templateUrl: 'community-modify.html',
})
@Directive({
  selector: "ion-textarea[autoresize]" // Attribute selector
})

export class CommunityModifyPage{


  id: any;
  mode: any;
  beautyNoteOneLoadData: any;
  skinQnaOneLoadData: any;
  tags = [];
  comment_popover_option: any = "보기";
  select_popover_option: any = "보기";

  @ViewChild('myInput') myInput: ElementRef;



  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, private images: ImagesProvider,
    public viewCtrl: ViewController, public popoverCtrl: PopoverController, public element: ElementRef, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.platform.ready().then((readySource) => {


          //this.presentLoading();
    })
  }

  resize() {
      this.myInput.nativeElement.style.height = 'auto'
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
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
        if(this.select_popover_option==="수정"){
          setTimeout(() => {
            console.log('수정');
            let myModal = this.modalCtrl.create(CommunityWritePage);
            myModal.present();
          }, 100)
        }
        else if(this.select_popover_option==="삭제"){
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
        if(this.select_popover_option==="수정"){
        setTimeout(() => {
            console.log('수정');
            let myModal = this.modalCtrl.create(CommunityWritePage);
            myModal.present();
          }, 100)
      }
      else if(this.select_popover_option==="삭제"){
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
        if(this.comment_popover_option==="수정"){
          setTimeout(() => {
            console.log('수정');
            this.presentLoading();
            this.resize();
          }, 100)
        }
        else if(this.comment_popover_option==="삭제"){
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
        if(this.comment_popover_option==="수정"){
        setTimeout(() => {
          console.log('수정');
          this.presentLoading();
          this.resize();
        }, 100)
      }
      else if(this.comment_popover_option==="삭제"){
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



  ionViewCanEnter() {
    this.id = this.navParams.get('id');
    this.mode = this.navParams.get('mode');
    console.log("mode : " + this.mode);
    if (this.navParams.get('mode') === 'qna') {
      this.skinQnaOneLoad(this.id);
    } else {
      this.beautyNoteOneLoad(this.id);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityModifyPage');
  }

  public dissmiss() {
    this.viewCtrl.dismiss();
  }

  public beautyNoteOneLoad(id) {
    this.images.beautyNoteOneLoad(id).subscribe(data => {
      this.beautyNoteOneLoadData = data;
      this.tags = data.tags.split(",");
      console.log("태그 길이 : " + this.tags.length);
    });
  }

  public skinQnaOneLoad(id) {
    this.images.skinQnaOneLoad(id).subscribe(data => {
      this.skinQnaOneLoadData = data;
      this.tags = data.tags.split(",");
      console.log("태그 길이 : " + this.tags.length);
    });
  }


}
