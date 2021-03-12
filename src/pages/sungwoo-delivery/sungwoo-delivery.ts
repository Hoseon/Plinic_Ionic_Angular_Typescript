import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ViewController,
  AlertController,
} from "ionic-angular";
import { ImagesProvider } from "../../providers/images/images";

/**
 * Generated class for the SungwooDeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sungwoo-delivery",
  templateUrl: "sungwoo-delivery.html",
})
export class SungwooDeliveryPage {
  cucumber: boolean;
  detailData: any;
  invoiceData: any;
  // mode: any;
  // registerDelivery = { Delivery_select: '',  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public images: ImagesProvider
  ) {
    this.platform.ready().then(() => {});
    if (this.navParams.get("detailData")) {
      this.detailData = this.navParams.get("detailData");
      this.invoiceData = {
        result: "Y",
        senderName: "",
        receiverName: "",
        itemName:
          "올뉴쏘렌토/더뉴쏘렌토 전용 반디LED 실내등 : 번호판등 2개/글로브박스등 1개",
        invoiceNo: "638456129441",
        receiverAddr: "",
        orderNumber: null,
        adUrl: null,
        estimate: "14∼16시",
        level: 6,
        complete: true,
        recipient: "",
        itemImage: null,
        trackingDetails: [
          {
            time: 1614936749000,
            timeString: "2021-03-05 18:32:29",
            code: null,
            where: "경북동구미",
            kind: "집화처리",
            telno: "054-473-5353",
            telno2: "",
            remark: null,
            level: 2,
            manName: "",
            manPic: "",
          },
          {
            time: 1614943994000,
            timeString: "2021-03-05 20:33:14",
            code: null,
            where: "구미",
            kind: "간선상차",
            telno: "",
            telno2: "",
            remark: null,
            level: 3,
            manName: "",
            manPic: "",
          },
          {
            time: 1614980507000,
            timeString: "2021-03-06 06:41:47",
            code: null,
            where: "대전HUB",
            kind: "간선하차",
            telno: "",
            telno2: "",
            remark: null,
            level: 3,
            manName: "",
            manPic: "",
          },
          {
            time: 1615197651000,
            timeString: "2021-03-08 19:00:51",
            code: null,
            where: "대전HUB",
            kind: "간선상차",
            telno: "",
            telno2: "",
            remark: null,
            level: 3,
            manName: "",
            manPic: "",
          },
          {
            time: 1615260402000,
            timeString: "2021-03-09 12:26:42",
            code: null,
            where: "연수",
            kind: "간선하차",
            telno: "032-456-7396",
            telno2: "",
            remark: null,
            level: 3,
            manName: "",
            manPic: "",
          },
          {
            time: 1615260462000,
            timeString: "2021-03-09 12:27:42",
            code: null,
            where: "연수",
            kind: "간선하차",
            telno: "032-456-7396",
            telno2: "",
            remark: null,
            level: 3,
            manName: "",
            manPic: "",
          },
          {
            time: 1615267600000,
            timeString: "2021-03-09 14:26:40",
            code: null,
            where: "인천먼우금집배점",
            kind: "배달출발\n(배달예정시간\n:14∼16시)",
            telno: "032-884-4555",
            telno2: "01088432766",
            remark: null,
            level: 5,
            manName: "윤치호",
            manPic: "",
          },
          {
            time: 1615271564000,
            timeString: "2021-03-09 15:32:44",
            code: null,
            where: "인천먼우금집배점",
            kind: "배달완료",
            telno: "032-884-4555",
            telno2: "01088432766",
            remark: null,
            level: 6,
            manName: "윤치호",
            manPic: "",
          },
        ],
        productInfo: null,
        zipCode: null,
        firstDetail: {
          time: 1614936749000,
          timeString: "2021-03-05 18:32:29",
          code: null,
          where: "경북동구미",
          kind: "집화처리",
          telno: "054-473-5353",
          telno2: "",
          remark: null,
          level: 2,
          manName: "",
          manPic: "",
        },
        completeYN: "Y",
        lastDetail: {
          time: 1615271564000,
          timeString: "2021-03-09 15:32:44",
          code: null,
          where: "인천먼우금집배점",
          kind: "배달완료",
          telno: "032-884-4555",
          telno2: "01088432766",
          remark: null,
          level: 6,
          manName: "윤치호",
          manPic: "",
        },
        lastStateDetail: {
          time: 1615271564000,
          timeString: "2021-03-09 15:32:44",
          code: null,
          where: "인천먼우금집배점",
          kind: "배달완료",
          telno: "032-884-4555",
          telno2: "01088432766",
          remark: null,
          level: 6,
          manName: "윤치호",
          manPic: "",
        },
      };
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SungwooDeliveryPage");
    // this.images.getUserOrdersTrackingInfo(this.detailData.email, "1234").subscribe((data) => {
    //     this.invoiceData = data;
    //     console.log(this.invoiceData);
    // });
  }

  updateCucumber() {
    console.log("Cucumbers new state:" + this.cucumber);
  }

  public measureBack() {
    this.viewCtrl.dismiss();
  }

  delivery_submit() {
    let alert = this.alertCtrl.create({
      cssClass: "delivery_alert",
      title: "배송지가 등록되었습니다",
      message: "등록된 배송지 변경 경로 <br> 배송지입력-등록된 배송지",
      buttons: [
        {
          text: "확인",
          handler: () => {
            console.log("확인"), this.navCtrl.pop();
          },
        },
      ],
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
