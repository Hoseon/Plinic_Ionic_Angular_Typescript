import { Component, ViewChild, Directive, HostListener, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, PopoverController, LoadingController   } from 'ionic-angular';
import {PopoverPage} from './popover/popover';


@IonicPage()
@Component({
  selector: 'page-community-modify',
  templateUrl: 'community-modify.html',
})
@Directive({
	selector: "ion-textarea[autoresize]" // Attribute selector
})

export class CommunityModifyPage {




  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public viewCtrl: ViewController, public popoverCtrl: PopoverController, public element:ElementRef, public loadingCtrl: LoadingController) {


      //this.presentLoading();

  }


  presentLoading() {
      const loader = this.loadingCtrl.create({
        duration: 2000,
        cssClass: 'sk-rotating-plane',
        showBackdrop: true
      });
      loader.present();
    }


  protected adjustTextarea(): void {
  		let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
  		textArea.style.overflow = 'hidden';
  		textArea.style.height 	= 'auto';
  		textArea.style.height 	= textArea.scrollHeight + 'px';
  		return;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityModifyPage');
  }

  public dissmiss() {
    this.viewCtrl.dismiss();
  }


  public select_popover(event){
    if (this.platform.is('ios')) {
    let popover = this.popoverCtrl.create(PopoverPage,{},
    {
    cssClass: "ios_popover"
    });
    popover.present({
      ev: event
    });
  }
  else{
    let popover = this.popoverCtrl.create(PopoverPage,{},
    {
    cssClass: "android_popover"
    });
    popover.present({
      ev: event
    });
  }
}

  public comment_popover(event){
    if (this.platform.is('ios')) {
    let popover = this.popoverCtrl.create(PopoverPage,{},
    {
    cssClass: "ios_comment_popover"
    });
    popover.present({
      ev: event
    });
  }
  else{
    let popover = this.popoverCtrl.create(PopoverPage,{},
    {
    cssClass: "android_comment_popover"
    });
    popover.present({
      ev: event
    });
  }
}


}
