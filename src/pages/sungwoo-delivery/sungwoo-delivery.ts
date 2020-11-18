import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the SungwooDeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sungwoo-delivery',
  templateUrl: 'sungwoo-delivery.html',
})
export class SungwooDeliveryPage {

  cucumber:boolean;
  // mode: any;
  // registerDelivery = { Delivery_select: '',  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    ) {
  
    this.platform.ready().then(() => {});

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SungwooDeliveryPage');
  }

  updateCucumber() {
    console.log('Cucumbers new state:' + this.cucumber);
  }

  public measureBack() {
    this.viewCtrl.dismiss();
  }

  delivery_submit() {
    let alert = this.alertCtrl.create({
      cssClass: 'delivery_alert',
      title: "배송지가 등록되었습니다",
      message: "등록된 배송지 변경 경로 <br> 배송지입력-등록된 배송지",
      buttons: [
        {
          text: '확인',
          handler: () => {
            console.log('확인'),
            this.navCtrl.pop();
          }
        }]
    });
    alert.present();
  }




  


  // qna_submit() {
  //   let alert = this.alertCtrl.create({
  //     cssClass: 'push_alert_cancel',
  //     title: "문의하기",
  //     message: "문의하기 내용을 전송하시겠습니까? <br> 관리자에게 답변을 받을 수 있습니다.",
  //     buttons: [
  //       {
  //         text: '취소',
  //         role: 'cancel',
  //         handler: () => {
  //         }
  //       },
  //       {
  //         text: '확인',
  //         handler: () => {
  //           if (this.mode === true) {
  //             this.registerQna.id = this.id;
  //             // console.log("update Id :" + this.id);
  //             this.auth.qnaUpdate(this.userData.email, this.registerQna).subscribe(data => {
  //               if (data !== "") {
  //                 let alert2 = this.alertCtrl.create({
  //                   cssClass: 'push_alert',
  //                   title: '문의하기',
  //                   message: "문의하기가 정상적으로 수정 되었습니다. <br>관리자에게 답변을 받을 수 있습니다.",
  //                   buttons: [
  //                     {
  //                       text: '확인',
  //                       handler: () => {
  //                         this.navCtrl.pop();
  //                       }
  //                     }
  //                   ]
  //                 });
  //                 alert2.present();
  //               }
  //               // this.nav.push(CareZoneMissionIngPage, { _id: id });
  //             }, error => {
  //               this.showError(JSON.parse(error._body).msg);
  //             });

  //           } else {
  //             this.auth.qnaSave(this.userData.email, this.registerQna).subscribe(data => {
  //               if (data !== "") {
  //                 let alert2 = this.alertCtrl.create({
  //                   cssClass: 'push_alert',
  //                   title: '문의하기',
  //                   message: "문의하신 내용이 접수되었습니다.<br>빠른 시간내에 답변 드리겠습니다.",
  //                   buttons: [
  //                     {
  //                       text: '확인',
  //                       handler: () => {
  //                         this.navCtrl.pop();
  //                       }
  //                     }
  //                   ]
  //                 });
  //                 alert2.present();
  //               }
  //               // this.nav.push(CareZoneMissionIngPage, { _id: id });
  //             }, error => {
  //               this.showError(JSON.parse(error._body).msg);
  //             });
  //           }
  //         }
  //       }]
  //   });
  //   alert.present();


  // }

}
