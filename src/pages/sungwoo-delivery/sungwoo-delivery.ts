import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform, ViewController, AlertController,} from "ionic-angular";
import { ImagesProvider } from "../../providers/images/images";
import { KakaoCordovaSDK, KLCustomTemplate, KLLinkObject, KLSocialObject, KLButtonObject, KLContentObject, KLFeedTemplate, AuthTypes } from 'kakao-sdk';

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
  detailData2: any;
  invoiceData: any;
  trackingDetails: any;
  isNoData: boolean = false;
  // mode: any;
  // registerDelivery = { Delivery_select: '',  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public images: ImagesProvider,
    public _kakaoCordovaSDK: KakaoCordovaSDK,

  ) {
    this.detailData2 = this.navParams.get('detailData');
  }

  ionViewDidLoad() {
    if (this.detailData2.status === 'status_ready' || this.detailData2.status === 'paid' || this.detailData2.status === 'deliver_ready') {
      this.isNoData = true;
    } else {
      console.log("ionViewDidLoad SungwooDeliveryPage");
      this.images.getUserOrdersTrackingInfo(this.detailData2.email, this.detailData2.deliverNo).subscribe((data) => {
        this.invoiceData = data;
        this.trackingDetails = data.trackingDetails;
        console.log(this.invoiceData);
      });  
    }
    
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

  kakaoChat() {
    let plusFriendTemplate = {
      plusFriendId: '_PMxjxjxb',
    };
    this._kakaoCordovaSDK
      .chatPlusFriend(plusFriendTemplate)
      .then(
        res => {
        },
        err => {
        }
      )
      .catch(err => {
      });
  }
}
