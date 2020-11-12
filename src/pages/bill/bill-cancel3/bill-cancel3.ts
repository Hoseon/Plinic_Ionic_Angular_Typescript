import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';

/**
 * Generated class for the BillCancel3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-cancel3',
  templateUrl: 'bill-cancel3.html',
})
export class BillCancel3Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public element: ElementRef,
    public alertCtrl: AlertController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillCancel3Page');
  }

  protected adjustTextarea(): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    return;
  }

  showAlert() {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass:'push_alert_cancel3',
      title: '해지 신청을 하시겠습니까?',
      message: '기간만료일 2020.10.14<br>기간만료 후 일주일 내 제품을 보내주세요',
      buttons: [
        {
          text: '정기결제 유지',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '해지 신청',
          handler: () => {
            this.billCancelCompleted();
          }
        },
      ]
    });
    alert.present();
  }

  billCancelCompleted() {
    let alertComplet = this.alertCtrl.create({
      cssClass:'push_alert_bill',
      title: '해지신청이 완료되었습니다.',
      message: '받는 곳 : <br> 인천광역시 연수구 <br>송도미래로 스마트밸리 E 508호<br>(주)지원파트너스',
      buttons: [{
        text: '확인',
        handler: () => {
    
        }
      },]
    });
    alertComplet.present();
  }
}
