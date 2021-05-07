import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
/**
 * Generated class for the OrderReturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-return',
  templateUrl: 'order-return.html',
  })
  

export class OrderReturnPage {

  detailData: any;
  reasonType: any = '';
  reasonDesc: any = '';
  loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public element: ElementRef,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    
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

  async showAlert() {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass:'push_alert_cancel3',
      title: '반품신청을 하시겠습니까?',
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
            console.log(this.reasonType);
            console.log(this.reasonDesc);
            this.updateReturnOrder('chs0131@hanmail.net', this.reasonType, this.reasonDesc);
          }
        },
      ]
    });
    alert.present();
  }

  billCancelCompleted() {
    let alertComplet = this.alertCtrl.create({
      cssClass:'push_alert_order',
      title: '반품신청 완료',
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

  validData() {
    // this.presentLoadingCustom();
    let alertComplet = this.alertCtrl.create({
      cssClass:'push_alert_order',
      title: '정보 미입력 오류',
      // enableBackdropDismiss: true,
      message: '유형과 사유를 구체적으로<br>입력해주세요',
      buttons: [{
        text: '확인',
        handler: () => {
          // this.navCtrl.pop();
        }
      },]
    });
    alertComplet.present();
  }

  errorData() {
    let alertComplet = this.alertCtrl.create({
      cssClass:'push_alert_order',
      title: '처리오류',
      message: '처리되지 않았습니다<br>관리자에게 문의해주세요',
      buttons: [{
        text: '확인',
        handler: () => {
        }
      },]
    });
    alertComplet.present();
  }

  statusToString(status) {
    switch (status) {
      case 'status_ready' : return '결제 확인중';
      case 'status_paid' : return '결제 확인';
      case 'deliver_ready' : return '배송 준비중';
      case 'deliver_during' : return '배송중';
      case 'deliver_completed' : return '배송 완료';
      case 'cencel_request' : return '취소 요청';
      case 'cencel_progress' : return '취소 처리중';
      case 'cencel_completed' : return '취소 완료';
      case 'return_request' : return '반품 요청';
      case 'return_progress' : return '반품 처리중';
      case 'return_completed' : return '반품 완료';
      case 'swap_request' : return '교환 요청';
      case 'swap_during' : return '교환중';
      case 'swap_completed' : return '교환 완료';
      default: return "결제 확인중";
    }
  }

  pop() {
    this.navCtrl.pop();
  }


  async updateReturnOrder(email, reasonType, reasonDesc) {
    this.presentLoadingCustom();
    if (email && reasonType && reasonDesc.length > 2) {
      await this.authService.updateReturnOrders(email, reasonType, reasonDesc, this.detailData._id).subscribe(data => { //서버처리 완료
        this.billCancelCompleted();
        this.loading.dismiss();
      }, error => {
        this.errorData();
        this.loading.dismiss();
      })
    } else {
      this.loading.dismiss();
      this.validData();
    } //내용 벨리데이션

  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      cssClass: 'plinic_alert',
      spinner: 'hide',
      content: `<img width="100px" height="100px" src="assets/img/loading/DualBall-1.9s-200px.gif" />`,
      duration: 10000
    });

    this.loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    this.loading.present();
  }

}
