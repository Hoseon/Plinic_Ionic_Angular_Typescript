import { Component, Renderer, ElementRef, ViewChild, OnInit, Inject, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform, AlertController, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImagesProvider } from '../../providers/images/images';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { DOCUMENT } from '@angular/common';


declare var postcode: any;

/**
 * Generated class for the AdressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adress',
  templateUrl: 'adress.html',
})
export class AdressPage {

  ishidden: boolean = false;
  name: any;
  zonecode: any;
  address: any;
  detailAddress: any;
  desc: any;
  bname: any;
  buildingName: any;
  setInter: any;
  phonenumber: any;
  carezoneData2: any;
  userData: any;
  thumb_image: any;
  saveRewardData: any;
  postEmail: any;
  review: any;
  jwtHelper: JwtHelper = new JwtHelper();
  frm: FormGroup;
  timer: any;
  isPost: boolean = false;
  @ViewChild('daum_popup', { read: ElementRef }) popup: ElementRef;
  postData: any;
  newAddr: boolean = true;
  addressData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private auth: AuthService,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    private zone: NgZone,
    public images: ImagesProvider,
    @Inject(DOCUMENT) document,
  ) {
    // console.log(postcode);
  }

  ngOnInit() {
    this.frm = this.formBuilder.group({
        addr1: [''],
        addr2: [''],
        zonecode: [''],
    });
  }


  ionViewDidLoad() {

    window.addEventListener("message", (data: any) => {
      if (data.data.close) {
        this.zone.run(() => {
          this.isPost = false;
        })  
      } else {
        this.postData = data.data;
        this.address = this.postData.post.address;
        this.buildingName = this.postData.post.buildingName;
        this.zonecode = this.postData.post.zonecode;
        this.zone.run(() => {
          this.isPost = false;
        })
      }
    })
    console.log('ionViewDidLoad RewardPage');
    // this.carezoneData2 = this.navParams.get('mission');
    // console.log(this.carezoneData2);

  }

  ionViewDidEnter() {
    if (this.userData.email) {
      this.getUserAddress(this.userData.email);
    }
  }

  ionViewCanEnter() {
    this.loadItems();
  }

  ionViewCanLeave() {
    console.log('ionViewCanLeave Leave!!');
    clearInterval(this.setInter);
  }

  ionViewWillLeave(){
    console.log('ionViewCanLeave Leave!!');
    clearInterval(this.setInter);
  }



  public loadItems() {
    this.auth.getUserStorage().then(items => {

      if (items.from === 'kakao' || items.from === 'google' || items.from === 'naver') {
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
          snsid: items.snsid
        };
        if (this.userData.thumbnail_image === "" || this.userData.thumbnail_image === undefined) {
          this.thumb_image = false;
        } else {
          this.thumb_image = true;
        }
        this.name = this.userData.nickname;
        //this.chkmission(this.userData.email);
      } else {
        this.userData = {
          pushtoken: this.jwtHelper.decodeToken(items).pushtoken,
          accessToken: this.jwtHelper.decodeToken(items).accessToken,
          id: this.jwtHelper.decodeToken(items).id,
          age_range: this.jwtHelper.decodeToken(items).age_range,
          birthday: this.jwtHelper.decodeToken(items).birthday,
          email: this.jwtHelper.decodeToken(items).email,
          gender: this.jwtHelper.decodeToken(items).gender,
          nickname: this.jwtHelper.decodeToken(items).name,
          profile_image: this.jwtHelper.decodeToken(items).profile_image,
          thumbnail_image: this.jwtHelper.decodeToken(items).thumbnail_image,
          phonenumber : this.jwtHelper.decodeToken(items).phonenumber,
        };
        this.name = this.userData.nickname;
        this.phonenumber = this.userData.phonenumber;
        //this.chkmission(this.userData.email);
      }
    });
  }

  postFocusOut() {
    if (this.ishidden) {
      clearInterval(this.setInter);
      this.ishidden = false;  //데이터 들어 오면 우편번호는 iframe을 숨긴다.
    }
    this.isPost = false;
  }

  inputPhoneNumber() {
    var number = this.phonenumber.replace(/[^0-9]/g, "");
    // var number = obj.value.replace(/[^0-9]/g, "");
    var phone = "";

    if (number.length < 4) {
      return number;
    } else if (number.length < 7) {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3);
    } else if (number.length < 11) {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3, 3);
      phone += "-";
      phone += number.substr(6);
    } else {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3, 4);
      phone += "-";
      phone += number.substr(7);
    }
    this.phonenumber = phone;
  }

  

  registerReward() {

    if (this.carezoneData2) {
      this.saveRewardData = {
        name: this.name,
        missionid: this.carezoneData2._id,
        reward: true,
        product: this.carezoneData2.product,
        prodfilename: this.carezoneData2.prodfilename,
        prodoriginalname: this.carezoneData2.prodoriginalname,
        title: this.carezoneData2.title,
        startmission: this.carezoneData2.startmission,
        endmission: this.carezoneData2.endmission,
        zonecode: this.zonecode,
        address: this.address,
        detailAddress: this.detailAddress,
        desc: this.desc,
        bname: this.bname,
        buildingName: this.buildingName,
        phoneNumber: this.phonenumber,
        postemail: this.postEmail,
        review: this.review
      }
    }



    let alert = this.alertCtrl.create({
      cssClass: 'push_alert_cancel',
      title: "보상받기",
      message: "보상받기 작성을 완료 하시겠습니까?",
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
            this.auth.rewardSave(this.userData.email, this.saveRewardData).subscribe(data => {
              if (data) {
                let alert2 = this.alertCtrl.create({
                  cssClass: 'push_alert',
                  title: '글 작성',
                  message: "보상받기가 저장되었습니다.<br>플리닉에서 발송정보를 Email로 보내 드릴게요.",
                  buttons: [
                    {
                      text: '확인',
                      handler: () => {
                        //this.nav.pop();
                        clearInterval(this.setInter);
                        this.viewCtrl.dismiss({
                          // page_modify: this.page_modify
                        });
                      }
                    }
                  ]
                });
                alert2.present();
              }
              // this.nav.push(CareZoneMissionIngPage, { _id: id });
            },
              error => {
                this.showError(JSON.parse(error._body).msg);
              });
          }
        }]
    });
    alert.present();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: '배송정보 미입력',
      message: text +'를(을) 입력해주세요',
      buttons: [{
        text: '확인'
      }]
    });
    alert.present();
  }

  openPost() {
    if(this.isPost)
      this.isPost = false;
    else {
      this.isPost = true;
    }
  }

  closePost() {
    this.isPost = false;
  }

  tempRegiAddress() {
    if (!this.name) {
      this.showError('이름');
      return;
    } else if (!this.phonenumber) {
      this.showError('연락처')
      return;
    } else if (!this.address) {
      this.showError('주소')
      return;
    } else if (!this.buildingName) {
      this.showError('상세주소')
      return;
    } else if (!this.zonecode) {
      this.showError('우편번호')
      return;
    } else if (!this.desc) {
      this.showError('배송메세지')
      return;
    } else {
      var addr = {
        name: this.name,
        phonenumber: this.phonenumber,
        address: this.address,
        buildingName: this.buildingName,
        zonecode: this.zonecode,
        desc: this.desc,
      }
      this.auth.setUserStorageAddress(addr);
      this.alert("배송지가 임시 저장되었습니다");
    }
  }

  
  alert(text) {
    let alert2 = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: '배송지 저장',
      message: text,
      enableBackdropDismiss: true,
      buttons: [
        {
          text: '확인',
          handler: () => {
            //this.nav.pop();
            this.auth.getUserStorageAddress('storageAddress').then(data => {
              this.viewCtrl.dismiss({
                data: data,
                tempAddr: true,
              });
            });
          }
        }
      ]
    });
    alert2.onDidDismiss(()=>{
      this.auth.getUserStorageAddress('storageAddress').then(data => {
        this.viewCtrl.dismiss({
          data: data,
          tempAddr: true,
        });
      });
    });
    alert2.present();
  }

  alertUpdateMain(text) {
    let alert2 = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: '배송지 저장',
      message: text,
      enableBackdropDismiss: true,
      buttons: [
        {
          text: '확인',
          handler: () => {
            //this.nav.pop();
            this.auth.getUserStorageAddress('storageAddress').then(data => {
              this.viewCtrl.dismiss({
                //여기에 DB에서 주소를 가져 오라고 값을 전달
                data: data,
                tempAddr: false,
              });
            });
          }
        }
      ]
    });
    alert2.onDidDismiss(()=>{
      this.auth.getUserStorageAddress('storageAddress').then(data => {
        this.viewCtrl.dismiss({
          //여기에 DB에서 주소를 가져 오라고 값을 전달
          data: data,
          tempAddr: false,
        });
      });
    });
    alert2.present();
  }

  alertRegisterAddress(text) {
    let alert2 = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: '배송지 등록',
      message: text,
      enableBackdropDismiss: true,
      buttons: [
        {
          text: '확인',
          handler: () => {
            //this.nav.pop();
            // this.auth.getUserStorageAddress('storageAddress').then(data => {
              this.viewCtrl.dismiss({
                tempAddr: false,
              });
            // });
          }
        }
      ]
    });
    alert2.onDidDismiss(()=>{
      // this.auth.getUserStorageAddress('storageAddress').then(data => {
        this.viewCtrl.dismiss({
          tempAddr: false,
        });
      // });
    });
    alert2.present();
  }

  toggleAddr() {
    if (this.newAddr) {
      this.newAddr = false;
    } else {
      this.newAddr = true;
    }
  }

  registerAddress() {
    if (!this.name) {
      this.showError('이름');
      return;
    } else if (!this.phonenumber) {
      this.showError('연락처')
      return;
    } else if (!this.address) {
      this.showError('주소')
      return;
    } else if (!this.buildingName) {
      this.showError('상세주소')
      return;
    } else if (!this.zonecode) {
      this.showError('우편번호')
      return;
    } else if (!this.desc) {
      this.showError('배송메세지')
      return;
    } else {
      var addr = {
        name: this.name,
        phonenumber: this.phonenumber,
        address: this.address,
        buildingName: this.buildingName,
        zonecode: this.zonecode,
        desc: this.desc,
      }

      //MongoDB 주소록 저장
      this.auth.registerAddress(this.userData.email, addr).subscribe(data => {
        this.alertRegisterAddress("배송지가 저장되었습니다");  
      }, error => {
        alert('주소를 저장하지 못했습니다.<br>잠시 후 다시시도 해주세요');
      })
      
    }
  }


  getUserAddress(email)  {
    this.images.getUserAddress(email).subscribe(data => {
      this.addressData = data;
    }, error => {
        // alert("주소 정보 가져 오기 에러 발생1")
      })
  }

  updateMain(addressId) { //대표 주소 변경
    this.auth.setAddressMain(this.userData.email, addressId).subscribe(data => {
      if (data) {
        this.alertUpdateMain('메인 주소가 변경되었습니다.');
      }
    }, error => {
      this.alert('메인 주소록 변경 실패 잠시 후 다시 시도해주세요');
    })
  }

}
