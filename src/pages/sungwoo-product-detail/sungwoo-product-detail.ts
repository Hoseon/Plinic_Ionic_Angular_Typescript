import { Component, ElementRef, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform, PopoverController, AlertController } from "ionic-angular";
import { SungwooPickPage } from "../sungwoo-pick/sungwoo-pick";
import { ProductReviewPage } from "../product-review/product-review";
import { ImagesProvider } from "../../providers/images/images";
import { AuthService } from "../../providers/auth-service";
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { PopoverPage } from '../community/community-modify/popover/popover';
import { KakaoCordovaSDK, KLCustomTemplate, KLLinkObject, KLSocialObject, KLButtonObject, KLContentObject, KLFeedTemplate, AuthTypes } from 'kakao-sdk';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';




/**
 * Generated class for the SungwooProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sungwoo-product-detail",
  templateUrl: "sungwoo-product-detail.html",
})
export class SungwooProductDetailPage {
  product_num: any;
  cucumber: boolean;
  isShowMore: boolean;
  productData: any;
  productReview: any;
  productReviewAll: any;
  avgRating: any;
  userData: any;
  thumb_image: any;
  profileimg_url: any;
  jwtHelper: JwtHelper = new JwtHelper();
  from: any;
  isLike: boolean = true;
  testData: any;
  scrollPage = 0;
  sort: any = 'createdAt';
  maxPoint: any;
  comment_popover_option: any = "보기";
  comment_popover_option_textarea: any;
  @ViewChild('myInput') myInput: ElementRef;
  reviewData = { content: '', id: '', email: '' };
  updatevalue: any;
  isUpdate: Array<boolean> = new Array<boolean>();
  adUrl: any;
  productTitle: any;
  productURL: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public images: ImagesProvider,
    public authService: AuthService,
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    public element: ElementRef,
    public _kakaoCordovaSDK: KakaoCordovaSDK,
    private themeableBrowser: ThemeableBrowser,
  ) {
    this.platform.ready().then(() => {
      if (this.navParams.get("productData"))
        this.productData = this.navParams.get("productData");
      this.product_num = this.navParams.get("productData").product_num;
      this.getProductReview(this.product_num);
      this.getProductAllReview(this.product_num);
    });
  }

  async ionViewDidLoad() {
    await this.loadItems();
    
    // console.log("ionViewDidLoad SungwooProductDetailPage");
  }

  ionViewWillEnter(){
    this.randomUrl();
  }

  showMore(isTrue) {
    isTrue ? (this.isShowMore = true) : (this.isShowMore = false);
  }

  updateCucumber() {
    // console.log("Cucumbers new state:" + this.cucumber);
  }

  next(productData, userData) {
    console.log(productData);
    console.log(userData);
    this.navCtrl.push(SungwooPickPage, {productData : productData, userData : userData});
  }

  addComma(data_value) {
    //숫자 세자리 마다 컴마 붙히기
    return Number(data_value).toLocaleString("en");
  }

  write_Review(product_num) {
    this.navCtrl
      .push(ProductReviewPage, { productData: this.productData })
      .then(() => {
        this.navCtrl.getActive().onDidDismiss((data) => {
          this.getProductAllReview(this.product_num);
          this.getProductReviewReset(this.product_num);
        });
      });
  }

  getProductAllReview(product_num) {
    this.images.getProductAllReview(product_num).subscribe((data) => {
      // this.productReview = data;
      this.productReviewAll = data;
      this.avgRating = this.getAvgRating(data);
      // console.log("상품 리뷰 : " + JSON.stringify(this.productReview));
    });
  }

  getProductReview(product_num) {
    this.scrollPage = this.scrollPage+1;
    // this.images.getProductReview(product_num, this.scrollPage).subscribe((data) => {
    //   if (this.scrollPage === 1) {
    //     this.productReview = (data);
    //   } else {
    //     for(let i = 0; i < data.length; i++) {
    //       this.productReview.push(data[i]);
    //     }
    //   }
    //   // this.productReview = data;
    // });

    this.images.getProductReview2(product_num, this.scrollPage, this.sort).subscribe((data) => {
      if (this.scrollPage === 1) {
        this.productReview = (data);
      } else {
        for(let i = 0; i < data.length; i++) {
          this.productReview.push(data[i]);
        }
      }
      // this.productReview = data;
    });
  }

  getProductReviewReset(product_num) {
    // this.scrollPage = this.scrollPage+0;
    this.scrollPage = 1;
    // this.images.getProductReview(product_num, this.scrollPage).subscribe((data) => {
    //   if (this.scrollPage === 1) {
    //     this.productReview = (data);
    //   } else {
    //     for(let i = 0; i < data.length; i++) {
    //       this.productReview.push(data[i]);
    //     }
    //   }
    //   // this.productReview = data;
    // });

    this.images.getProductReview2(product_num, this.scrollPage, this.sort).subscribe((data) => {
      if (this.scrollPage === 1) {
        this.productReview = (data);
      } else {
        for(let i = 0; i < data.length; i++) {
          this.productReview.push(data[i]);
        }
      }
      // this.productReview = data;
    });
  }

  // 이메일 마스킹 처리 2020-06-02
  emailSecurity(userEmail) {
    var id = userEmail.split("@")[0];
    var mail = userEmail.split("@")[1];
    var maskingId = function (id) {
      var splitId = id.substring(0, 2);
      for (var i = 1; i < id.length; i++) {
        splitId += "*";
      }
      return splitId;
    };
    var maskingMail = function (mail) {
      var splitMail = "";
      for (var i = 1; i < mail.length; i++) {
        splitMail += "*";
      }
      splitMail += mail.substring(mail.length - 1, mail.length);
      return splitMail;
    };
    userEmail = maskingId(id) + "@" + mail;
    return userEmail;
  }

  getCovertKoreaTime(time) {
    return new Date(
      new Date(time).getTime() - new Date().getTimezoneOffset() * 60000
    ).toISOString();
  }

  getAvgRating(rating) {
    var avgRating = 0;
    rating.forEach((element) => {
      avgRating = avgRating + element.rating;
    });

    avgRating = avgRating / rating.length;
    if (Number.isNaN(avgRating)) {
      avgRating = 0;
    }
    return avgRating.toFixed(1);
  }

  like(product_num, email) {
    this.images.productLike(product_num, email).subscribe(
      (result) => {
        this.productData = result[0];
        for (let i = 0; i < result[0].likeUser.length; i++) {
          // console.log(result.docs2.likeUser[i].email)
          if (result[0].likeUser[i].email === email) {
            this.isLike = false;
          } 
        }
      },
      (error) => {
        alert("처리 에러 관리자에게 문의하세요");
      }
    );
  }

  dislike(product_num, email) {
    this.images.productdisLike(product_num, email).subscribe(
      (result) => {
        this.productData = result[0];
        this.isLike = true;
        for (let i = 0; i < result[0].likeUser.length; i++) {
          if (result[0].likeUser[i].email === email) {
            this.isLike = true;
          } 
        }
      },
      (error) => {
        alert("authService처리 에러 관리자에게 문의하세요");
      }
    );
  }

  public loadItems() {
    this.authService.getUserStorage().then((items) => {
      if (
        items.from === "kakao" ||
        items.from === "google" ||
        items.from === "naver"
      ) {
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
          snsid: items.snsid,
        };
        if (
          this.userData.thumbnail_image === "" ||
          this.userData.thumbnail_image === undefined
        ) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
        }
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
          from: "plinic",
        };

        this.from = "plinic";
      }

      if (this.productData) {
        for (let i = 0; i < this.productData.likeUser.length; i++) {
          // console.log(result.docs2.likeUser[i].email)
          this.productData.likeUser[0].email === this.userData.email ? this.isLike = false : this.isLike = true;
        }
      }
    });
  }

  onChange(event) {
    console.log(event);
    this.scrollPage = 1;
    this.images.getProductReview2(this.product_num, this.scrollPage, this.sort).subscribe((data) => {
      // if (this.scrollPage === 1) {
        this.productReview = (data);
      // } else {
        // for(let i = 0; i < data.length; i++) {
          // this.productReview.push(data[i]);
        // }
      // }
      // this.productReview = data;
    });
  }

  getMaxPoint(point, price) {
    var maxPercent;
    var amount;
    var sale;
    (maxPercent) = point;
    sale = Number(maxPercent)/100;
    amount = price;
    this.maxPoint = Number(amount) * sale;
    this.maxPoint = this.addComma(this.maxPoint);
    return this.maxPoint;
  }

  // 댓글 수정
  public comment_popover(event, i, email, id) {
    if (this.platform.is('ios') || this.platform.is('core')) {
      let popover = this.popoverCtrl.create(PopoverPage, {},
        {
          cssClass: "ios_comment_popover"
        });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(popoverData => {
        this.comment_popover_option = popoverData;
        if (popoverData === "수정") {
          this.isUpdate[i] = false;
          this.comment_popover_option_textarea = i;
          setTimeout(() => {
            // this.mytextarea.setFocus();
            this.myInput.nativeElement.focus();
            // this.presentLoading();
            this.resize();
          }, 100)
        }
        else if (popoverData === "삭제") {
          // console.log('comment_popover_option==========' + this.comment_popover_option);
          this.reviewData.email = email;
          this.reviewData.id = id;

          // this.reply.comment = document.getElementById('updatereply').getAttribute('ng-reflect-model');

          let alert = this.alertCtrl.create({
            cssClass: 'push_alert_cancel',
            title: "plinic",
            message: "댓글을 정말로 삭제하시겠습니까?",
            buttons: [
              {
                text: '취소',
                role: 'cancel',
                handler: () => {
                  console.log('취소');
                }
              },
              {
                text: '확인',
                handler: () => {
                  this.authService.productReviewDelete(this.reviewData).subscribe(data => {
                    if (data !== "") {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '댓글삭제',
                        message: "댓글이 정상적으로 삭제 되었습니다.",
                        enableBackdropDismiss: true,
                        buttons: [
                          {
                            text: '확인',
                            handler: () => {
                              // this.registerReply.comment = '';
                              this.comment_popover_option_textarea = -1;
                              // this.textareaResize();
                              this.getProductAllReview(this.product_num);
                              this.getProductReviewReset(this.product_num);
                            }
                          }
                        ]
                      });
                      alert2.onDidDismiss(()=>{
                        this.getProductAllReview(this.product_num);
                        this.getProductReviewReset(this.product_num);
                      });
                      alert2.present();
                    }
                    // this.nav.push(CareZoneMissionIngPage, { _id: id });
                  }, error => {
                    this.showError(JSON.parse(error._body).msg);
                  });
                }
              }]
          });
          alert.present();
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
        this.comment_popover_option = popoverData;
        if (popoverData === "수정") {
          this.comment_popover_option_textarea = i;
          setTimeout(() => {
            // this.mytextarea.setFocus();
            this.myInput.nativeElement.focus();
            // this.presentLoading();
            this.resize();
          }, 100)
        }
        else if (popoverData === "삭제") {
          // console.log('comment_popover_option==========' + this.comment_popover_option);
          this.reviewData.email = email;
          this.reviewData.id = id;
          // this.reply.comment = document.getElementById('updatereply').getAttribute('ng-reflect-model');

          let alert = this.alertCtrl.create({
            cssClass: 'push_alert_cancel',
            title: "plinic",
            message: "댓글을 정말로 삭제하시겠습니까?",
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
                  this.authService.productReviewDelete(this.reviewData).subscribe(data => {
                    if (data !== "") {
                      let alert2 = this.alertCtrl.create({
                        cssClass: 'push_alert',
                        title: '댓글삭제',
                        message: "댓글이 정상적으로 삭제 되었습니다.",
                        enableBackdropDismiss: true,
                        buttons: [
                          {
                            text: '확인',
                            handler: () => {
                              // this.registerReply.comment = '';
                              this.comment_popover_option_textarea = -1;
                              // this.textareaResize();
                              this.getProductReviewReset(this.product_num);
                              this.getProductAllReview(this.product_num);
                            }
                          }
                        ]
                      });
                      alert2.onDidDismiss(()=>{
                        this.getProductReviewReset(this.product_num);
                        this.getProductAllReview(this.product_num);
                      });
                      alert2.present();
                    }
                    // this.nav.push(CareZoneMissionIngPage, { _id: id });
                  }, error => {
                    this.showError(JSON.parse(error._body).msg);
                  });
                }
              }]
          });
          alert.present();
        }
      });
    }
  }

  resize() {
    setTimeout(() => {
      this.myInput.nativeElement.style.height = 'auto'
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    }, 100)
  }

  showError(text) {
    // this.loading.dismiss();

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: 'Plinic',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

  textareaResize() {
    setTimeout(() => {
      this.myInput.nativeElement.style.height = '40px'
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    }, 100)
  }

  protected adjustTextarea(): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    textArea.style.cursor = 'pointer';
    return;
  }

  protected adjustTextareaUpdate(event): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    textArea.style.cursor = 'pointer';
    this.updatevalue = event.target.value;
    return;
  }

  productReviewUpdate(email, id) {
    this.reviewData.email = email;
    this.reviewData.id = id; 
    
    this.reviewData.content = this.updatevalue;

    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "plinic",
      message: "댓글을 수정 하시겠습니까?",
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
            this.authService.productReviewUpdate(this.reviewData).subscribe(data => {
              if (data !== "") {
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert',
                  title: '댓글수정',
                  message: "댓글이 정상적으로 수정 되었습니다.",
                  enableBackdropDismiss: true,
                  buttons: [
                    {
                      text: '확인',
                      handler: () => {
                        // this.registerReply.comment = '';
                        this.comment_popover_option_textarea = -1;
                        this.textareaResize();
                        this.getProductReviewReset(this.product_num);
                      }
                    }
                  ]
                });
                this.comment_popover_option = "보기";
                alert2.onDidDismiss(()=>{
                  this.comment_popover_option_textarea = -1;
                  this.textareaResize();
                  this.getProductReviewReset(this.product_num);
                });
                alert2.present();
              }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            }, error => {
              this.showError(JSON.parse(error._body).msg);
            });
          }
        }]
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

  randomUrl() {
    var urlNo;
    urlNo = this.makeRandom(1,3);
    
    switch(urlNo) {
      case 1 : this.adUrl = 'assets/img/beauty/beauty_ad_4_.jpg';
               this.productTitle = '포인트샵 뷰셀리온 배너';
               this.productURL = 'https://smartstore.naver.com/beaucellion';
                break;
      case 2 : this.adUrl = 'assets/img/beauty/beauty_ad_5_.jpg';
               this.productTitle = '포인트샵 화장품 배너';
               this.productURL = 'https://smartstore.naver.com/plinic';
                break;
      case 3 : this.adUrl = 'assets/img/beauty/beauty_ad_6_.jpg';
               this.productTitle = '포인트샵 기기배너';
               this.productURL = 'https://smartstore.naver.com/plinic/products/4714726098';
                break;   
      default : this.adUrl = 'assets/img/beauty/beauty_ad_4.jpg';
                this.productTitle = '포인트샵 뷰셀리온 배너';
                this.productURL = 'https://smartstore.naver.com/beaucellion';
    }
  }


private makeRandom(min, max) {
      var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
      return RandVal;
}

  
openBrowser_android(url, title) {

  const options: ThemeableBrowserOptions = {
    toolbar: {
      height: 55,
      color: '#6562b9'
    },
    title: {
      color: '#FFFFFF',
      showPageTitle: true,
      staticText: title
    },
    closeButton: {
      wwwImage: 'assets/img/close.png',
      align: 'left',
      event: 'closePressed'
    },
    backButton: {
      wwwImage: 'assets/img/back.png',
      align: 'right',
      event: 'backPressed'
    },
    forwardButton: {
      wwwImage: 'assets/img/forward.png',
      align: 'right',
      event: 'forwardPressed'
    },
  };

  const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.productURL, '_blank', options);
  browser.insertCss({
    file: 'assets/img/close.png',
    code: '.navbar-fixed-top {display: block !important;}'
  });
  browser.reload();
  browser.on('closePressed').subscribe(data => {
    browser.close();
  })

  browser.on('sharePressed').subscribe(data => {
    console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
  })
}
  


}
