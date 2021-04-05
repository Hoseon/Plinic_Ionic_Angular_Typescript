import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';

/**
 * Generated class for the OrderCancel3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-cancel3',
  templateUrl: 'order-cancel3.html',
  })
  

export class OrderCancel3Page {

  detailData: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public element: ElementRef,
    public alertCtrl: AlertController,
  ) {
    if (this.navParams.get('detailData')) {
      this.detailData = this.navParams.get('detailData');
      console.log(this.detailData);
    }
    
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
      title: '주문을 취소 하시겠습니까?',
      message: '더 좋은 상품과 서비스를<br>제공하기 위해 최선을 다하겠습니다.',
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
            this.billCancelCompleted();
          }
        },
      ]
    });
    alert.present();
  }

  billCancelCompleted() {
    let alertComplet = this.alertCtrl.create({
      cssClass:'push_alert',
      title: '주문취소 완료',
      enableBackdropDismiss: true,
      message: '더 좋은 상품과 서비스를<br>제공하기 위해 최선을 다하겠습니다.',
      buttons: [{
        text: '확인',
        handler: () => {
          // this.navCtrl.pop();
        }
      },]
    });
    alertComplet.onDidDismiss(() => {
      this.navCtrl.pop();
    })
    alertComplet.present();
  }

  statusToString(status) {
    if (status === 'ready') {
      //주문전
      return '주문완료'
    } else if (status === 'paid') {
      //결제완료
      return '결제완료'
    } else if (status === 'deliver_ready') {
      return '상품 준비중'
    } else if (status === 'deliver_during') {
      return '배송중'
    } else if (status === 'deliverComp') {
      return '배송완료'
    }
  }

  pop() {
    this.navCtrl.pop();
  }

}
