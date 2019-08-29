import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform, AlertController } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Naver } from 'ionic-plugin-naver';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FCM } from '@ionic-native/fcm';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer'
import { BLE } from '@ionic-native/ble';


//Blue Mod S42
// const PLINIC_SERVICE = 'FEFB';
// const UUID_SERVICE = 'FEFB';
// const SWITCH_CHARACTERISTIC = 'FF00';

//HM Soft Bluetooth Mod
const PLINIC_SERVICE = 'FFE0';
const UUID_SERVICE = 'FFE0';
const SWITCH_CHARACTERISTIC = 'FFE1';


export class User {
  accessToken: string;
  id: string;
  age_range: string;
  birthday: string;
  email: string;
  gender: string;
  nickname: string;
  name: string;
  profile_image: string;
  thumbnail_image: string;
  imagePath: any;
  from: string;


  constructor(email: string, name: string) {
    this.email = email;
    this.nickname = name;
  }
}

const TOKEN_KEY = 'userData';
const CONFIG = {
  apiUrl: 'http://plinic.cafe24app.com/',
  // apiUrl: 'http://localhost:8001/',
};

@Injectable()
export class AuthService {

  authenticationState = new BehaviorSubject(false);

  currentUser: User;
  userToken = null;
  jwtHelper: JwtHelper = new JwtHelper();
  userData: any;
  blu_connect: boolean = false;
  push_token: any;
  currentDate: Date = new Date();


  devices: any[] = [];
  statusMessage: string;
  output: any;
  message: String;
  responseTxt: any;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  peripheral: any = {};


  constructor(private ble: BLE, private transfer: Transfer, private http: Http, public authHttp: AuthHttp, public storage: Storage,
    public _kakaoCordovaSDK: KakaoCordovaSDK, private platform: Platform, private alertCtrl: AlertController,
    // private facebook: Facebook,
    private google: GooglePlus,
    public bluetoothle: BluetoothLE, public naver: Naver, private localNotifications: LocalNotifications,
    // private fcm: FCM
  ) {

    this.platform.ready().then(() => {
      this.checkToken();
      this.bluetooth_connect();
      // this.fcm.getToken().then(token => {
      //   this.push_token = token;
      //   console.log("push_token================="+ token);
      // })
    });

    let loginOptions = {};
    loginOptions['authTypes'] = [
      AuthTypes.AuthTypeTalk,
      AuthTypes.AuthTypeStory,
      AuthTypes.AuthTypeAccount
    ];
  }

  // 최초 탭스이벤트 처리
  public setUserStoragetab(check) {
    this.storage.set('check', check);
  }

  public getUserStoragetab() {
    return this.storage.get('check');
  }

  //최초 실행검사인지 체크
  public setUserStoragediagnose_first_check(check) {
    this.storage.set('check', check);
  }

  public getUserStoragediagnose_first_check() {
    return this.storage.get('check');
  }

  //최초 데이터
  public setUserStoragediagnose_first_moisture(moisture) {
    this.storage.set('moisture', moisture);
  }

  public getUserStoragediagnose_first_moisture() {
    return this.storage.get('moisture');
  }

  public setUserStoragediagnose_first_oil(oil) {
    this.storage.set('oil', oil);
  }

  public getUserStoragediagnose_first_oil() {
    return this.storage.get('oil');
  }


  //두번째이상 데이터
  public setUserStoragediagnose_moisture(moisture) {
    this.storage.set('moisture', moisture);
  }

  public getUserStoragediagnose_moisture() {
    return this.storage.get('moisture');
  }

  public setUserStoragediagnose_oil(oil) {
    this.storage.set('oil', oil);
  }

  public getUserStoragediagnose_oil() {
    return this.storage.get('oil');
  }

  // 썸네일 이미지 저장.. 추후 서버로 변경
  public setUserStorageimagePath(imagePath) {
    this.storage.set('imagePath', imagePath);
  }

  public getUserStorageimagePath() {
    return this.storage.get('imagePath');
  }


  public get_qna_answer() {
    this.localNotifications.schedule({
      title: "plinic",
      text: '문의하신 질문에 답글이 작성되었습니다.',
      trigger: { at: new Date(new Date().getTime()) },
      led: 'FF0000',
      sound: null
    });

    this.sendnotification("plinic", "문의하신 질문에 답글이 작성되었습니다.");
  }

  //backend coding
  sendnotification(sname, msg) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',
      'key=' + "AIzaSyCAcTA318i_SVCMl94e8SFuXHhI5VtXdhU");   //서버키
    let option = new RequestOptions({ headers: headers });
    let payload = {
      "notification": {
        "title": sname,
        "body": msg,
        "badge": 1,
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY"
      },
      "priority": "high",
      "to": this.push_token,
      //토큰
    }
    this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(payload), option)
      .map(res => res.json())
      .subscribe(data => {
        console.log("dddddddddddddddddddddd=================" + data);
      });
  }


  public bluetooth_connect() {
    if (this.platform.is('cordova')) {
      this.bluetoothle.initialize().then(ble => {
        console.log('ble', ble.status) // logs 'enabled'
        if (ble.status === "enabled") {
          this.blu_connect = true;
          console.log('enabled====================', this.blu_connect);
        }
        else {
          this.blu_connect = false;
          console.log('disenabled====================', this.blu_connect);
        }
      });
      return this.blu_connect;
    }
  }


  public naver_login() {
    console.log("네이버 로그인 시작 ----------------------------------------------------------");
    this.naver.login()
      .then(response => {
        this.userData = {
          accessToken: response['accessToken'],
          from: 'naver'
        }
        this.naver.requestMe()
          .then(response => {
            this.userData.email = response.response.email;
            this.userData.nickname = response.response.name;
            this.userData.id = response.response.id;
            console.log("userdata ::: " + JSON.stringify(this.userData))
            if (this.userData !== '') {
              this.storage.set('userData', this.userData);
              this.authenticationState.next(true);
              return this.userData;
            }
          }) // 성공
          .catch(error => console.error(error)); // 실패
      }
      )
      .catch(error => console.error(error)); // 실패

    if (this.userData !== '') {
      this.storage.set('userData', this.userData);
      this.authenticationState.next(true);
      return this.userData;
    }
  }

  public naver_logout() {
    console.log("로그아웃 준비 -------------------------: ");
    // this.naver.logoutAndDeleteToken()
    //   .then(response => {
    // console.log("로그아웃 성공 ---------------------------" + response)
    this.deleteToken();
    this.deleteUser();
    this.currentUser = null;
    this.authenticationState.next(false);
    console.log("로그아웃 성공 ---------------------------")
    // }) // 성공
    // .catch(error => console.error(error)); // 실패
    // this.naver.logout().then(() => {
    //   this.deleteToken();
    //   this.deleteUser();
    //   this.currentUser = null;
    //   this.authenticationState.next(false);
    // }
    // );

    // this._naverCordovaSDK.unlinkApp().then(() => {
    //   //do your unregister proccess for your app
    // this.deleteToken();
    // this.deleteUser();
    // this.currentUser = null;
    // this.authenticationState.next(false);
    // }
    // );
  }



  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        //let decoded = this.jwtHelper.decodeToken(token);
        //let isExpired = this.jwtHelper.isTokenExpired(token);
        this.authenticationState.next(true);
        // if (!isExpired) {
        //   this.userData = decoded;
        //   this.authenticationState.next(true);
        // } else {
        //   this.storage.remove(TOKEN_KEY);
        // }
      } else {
        this.storage.remove(TOKEN_KEY);
      }
    });
  }

  //구글 로그인 추가 2018-04-23 추호선
  public google_login() {
    this.google.login({})
      .then(res => {
        //console.log(res)
        this.userData = {
          accessToken: res['accessToken'],
          id: res['userId'],
          //age_range: res['age_range'],
          //birthday: res['birthday'],
          email: res['email'],
          //gender: res['gender'],
          nickname: res['displayName'],
          //profile_image: res['profile_image'],
          thumbnail_image: res['imageUrl'],
          //use_email: res['has_email'],
          from: 'google'
        };
        this.storage.set('userData', this.userData);
        this.authenticationState.next(true);
        return this.userData;
      })
      .catch(err => {
        this.showAlert("Google에 로그인하지 못했습니다. 관리자에게 문의하세요." + err)
        // console.error(err)
      });
  }

  //페이스북 로그인 추가 2018-04-23 추호선
  // public facebook_login() {
  //   this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
  //     this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
  //       this.userData = { email: profile['email'], first_name: profile['first_name'], thumbnail_image: profile['picture_large']['data']['url'], nickname: profile['name'], accessToken: response.authResponse.accessToken, from: 'facebook' }
  //       this.storage.set('userData', this.userData);
  //       this.authenticationState.next(true);
  //       return this.userData;
  //     });
  //   });
  //
  // }

  public kakao_login() {
    this._kakaoCordovaSDK.login(AuthTypes.AuthTypeTalk).then((res) => {
      this.userData = {
        accessToken: res.accessToken,
        id: res.id,
        age_range: res.kakao_account['age_range'],
        birthday: res.kakao_account['birthday'],
        email: res.kakao_account['email'],
        gender: res.kakao_account['gender'],
        nickname: res.properties['nickname'],
        profile_image: res.properties['profile_image'],
        thumbnail_image: res.properties['thumbnail_image'],
        use_email: res.kakao_account['has_email'],
        from: 'kakao'
      };
      this.currentUser = res.properties['nickname'];
      this.storage.set('userData', this.userData);
      console.log(JSON.stringify(this.userData))
      this.authenticationState.next(true);
      return this.userData;

    })


  }

  public kakao_authlogout() {
    this.deleteToken();
    this.deleteUser();
    this.currentUser = null;
    this.authenticationState.next(false);

    // if(this.platform.is('cordova')){
    //   this._kakaoCordovaSDK.logout().then(() => {
    //     this.authenticationState.next(false);
    //   });
    //
    //   this.naver.logoutAndDeleteToken()
    //     .then(response => console.log(response)) // 성공
    //     .catch(error => console.log(error)); // 실패
    //
    //   this.google.logout();
    //   this.google.disconnect();
    // }
  }



  // Login a user with email + password and store the JWT
  public login(credentials) {
    return this.http.post(CONFIG.apiUrl + 'api/login', credentials)
      .map(response => response.json())
      .map(data => {
        this.setCurrentUser(data.token);
        this.authenticationState.next(true);
        return data.token;
      });
  }

  public qnaSave(email, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      select: content.qna_select,
      qna: content.qna_input,
    };

    console.log("qna : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/qnasave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public replySave(userData, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: userData.email,
      id: content.id,
      comment: content.comment,
    };

    console.log("ReplySave : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replysave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public replySnsSave(userData, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: userData.email,
      img_url: userData.thumbnail_image,
      id: content.id,
      comment: content.comment,
    };

    console.log("ReplySave : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replysave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public replyUpdate(content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: content.email,
      id: content.id,
      comment: content.comment,
    };

    console.log("Replyupdate : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replyupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public replyDelete(content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: content.email,
      id: content.id,
      comment: content.comment,
    };

    console.log("Replydelete : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replydelete', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }


  public replySkinQnaSave(userData, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: userData.email,
      id: content.id,
      comment: content.comment,
    };

    console.log("ReplySave : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replyskinqnasave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public replySkinQnaSnsSave(userData, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: userData.email,
      img_url: userData.thumbnail_image,
      id: content.id,
      comment: content.comment,
    };

    console.log("ReplySave : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replyskinqnasave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public replySkinQnaUpdate(content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: content.email,
      id: content.id,
      comment: content.comment,
    };

    console.log("Replyupdate : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replyskinqnaupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public replySkinQnaDelete(content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: content.email,
      id: content.id,
      comment: content.comment,
    };

    console.log("Replydelete : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replyskinqnadelete', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public qnaUpdate(email, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      id: content.id,
      email: email,
      select: content.qna_select,
      qna: content.qna_input,
    };

    console.log("qna : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/qnaupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public noteNoImgSave(email, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      select: content.select,
      title: content.title,
      contents: content.contents,
      tags: content.tags,
    };

    return this.http.post(CONFIG.apiUrl + 'api/notesave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public noteSave(email, content, img) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      select: content.select,
      title: content.title,
      contents: content.contents,
      tags: content.tags,
    };

    let url = CONFIG.apiUrl + 'beautynote';

    var targetPath = img;
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'email': body.email,
        'select': body.select,
        'title': body.title,
        'contents': body.contents,
        'tags': JSON.stringify(body.tags),
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options);

  }

  public noteImageUpdate(email, content, img) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      select: content.select,
      title: content.title,
      contents: content.contents,
      tags: content.tags,
    };

    let url = CONFIG.apiUrl + 'beautynote/noteUpdate/' + content._id;

    var targetPath = img;
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'email': body.email,
        'select': body.select,
        'title': body.title,
        'contents': body.contents,
        'tags': JSON.stringify(body.tags),
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options);

  }


  public noteNoImgUpdate(email, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      id: content._id,
      email: email,
      select: content.select,
      title: content.title,
      contents: content.contents,
      tags: content.tags,
    };

    return this.http.post(CONFIG.apiUrl + 'api/noteupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }





  public qnaImageUpdate(email, content, img) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      select: content.select,
      title: content.title,
      contents: content.contents,
      tags: content.tags,
    };

    let url = CONFIG.apiUrl + 'skinqna/qnaUpdate/' + content._id;

    var targetPath = img;
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'email': body.email,
        'select': body.select,
        'title': body.title,
        'contents': body.contents,
        'tags': JSON.stringify(body.tags),
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options);

  }

  public skinqnaNoImgUpdate(email, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      id: content._id,
      email: email,
      select: content.select,
      title: content.title,
      contents: content.contents,
      tags: content.tags,
    };

    return this.http.post(CONFIG.apiUrl + 'api/skinqnaupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }


  //피부노트 삭제
  public noteDelete(id) {
    return this.http.get(CONFIG.apiUrl + 'beautynote/delete/' + id)
      .map(response => response.json());
  }


  public communitySkinQnaSave(email, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      select: content.select,
      title: content.title,
      contents: content.contents,
      tags: content.tags,
    };

    console.log("note : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/skinqnasave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  //피부고민 삭제
  public skinQnaDelete(id) {
    return this.http.get(CONFIG.apiUrl + 'skinqna/delete/' + id)
      .map(response => response.json());
  }

  public communitySkinQnaImgSave(email, content, img) {
    let body = {
      email: email,
      select: content.select,
      title: content.title,
      contents: content.contents,
      tags: content.tags,
    };

    let url = CONFIG.apiUrl + 'skinqna';

    var targetPath = img;
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'email': body.email,
        'select': body.select,
        'title': body.title,
        'contents': body.contents,
        'tags': JSON.stringify(body.tags),
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options);
  }

  //문진표 Save 20190709 추호선 ------------------------------------------
  public skinChartSave(email, score) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      score: score,
      saveDate: this.currentDate,
    };

    // console.log("skinChartSave Data : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/skinchartsave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  //문진표 Save & Update 20190709 추호선  ------------------------------------------
  public skinChartUpdate(email, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      id: content.id,
      email: email,
      select: content.qna_select,
      qna: content.qna_input,
    };

    console.log("qna : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/skinchartupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public missionSave(id, email, image, start, end, title, sub, maxmember) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      missionID: id,
      email: email,
      image_url: image,
      startmission: start,
      endmission: end,
      title: title,
      body: sub,
      maxmember: maxmember
    };
    return this.http.post(CONFIG.apiUrl + 'api/missionsave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  // Register a new user at our API
  public register(credentials) {
    return this.http.post(CONFIG.apiUrl + 'api/register', credentials)
      .map(response => response.json())
      .map(data => {
        this.userData = {
          //accessToken: data.accessToken,
          //id: data.id,
          //age_range: data.kakao_account['age_range'],
          birthday: data.birthday,
          email: data.email,
          gender: data.gender,
          nickname: data.name,
          // profile_image: data.properties['profile_image'],
          // thumbnail_image: data.properties['thumbnail_image'],
          // use_email: data.kakao_account['has_email'],
          from: 'plinic'
        };
        this.setCurrentUser(data.token);
        this.authenticationState.next(true);
        return this.userData;
      });

    // birthday: "2019-07-25"
    // country: "Andorra"
    // email: "wjddn0313@naver.com"
    // gender: "남성"
    // name: "이정우"
    // password: "$2a$10$41SKpY.5gQeMz/XviTQMtupl3tCb1eS8g6HKLDNj9Tme08xOYjyXW"
    // skincomplaint: "복합성"
    // __v: 0
    // _id: "5cc143f3eed1e1474303a58d"
    // __proto__: Object
  }

  //The route to the pulbic information, not used currently
  public getPublicInformation() {
    return this.http.get(CONFIG.apiUrl + 'api/special')
      .map(response => response.json());
  }

  //The route to the secret information, only accesible with valid token
  public getSecretInformation() {
    return this.authHttp.get(CONFIG.apiUrl + 'api/protected/information')
      .map(response => response.json());
  }

  // Store the token and current user information local
  public setCurrentUser(token) {
    this.userToken = token;
    this.currentUser = new User(this.jwtHelper.decodeToken(this.userToken).email, this.jwtHelper.decodeToken(this.userToken).name);
    console.log(this.currentUser);
    return this.storage.set('userData', token);
  }

  // Remove the JWT from our storage
  public deleteToken() {
    this.userToken = '';
    return this.storage.set('userData', '');
  }

  public deleteUser() {
    this.userToken = '';
    return this.storage.set('userData', '');
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  //플리닉에서 사용되어질 사용자명, 이메일, 프로필 이미지 등등의 정보를 스토리지에 저장한다.
  public getUserStorage() {
    return this.storage.get('userData');
  }

  public logout() {
    this.currentUser = null;
    this.deleteToken();
    this.authenticationState.next(false);
    // this.nav.setRoot(LoginPage);
    // this.nav.popToRoot();
    //this.currentUser = null;
    //this.deleteToken();
    //this.authenticationState.next(false);
    //return Observable.create(observer => {
    //this.currentUser = null;
    //this.deleteToken();
    //this.authenticationState.next(false);
    //observer.next(true);
    //observer.complete();

    //});
  }

  loggedIn() {
    return this.storage.get('userData').then(token => {
      return tokenNotExpired(null, token);
    });
  }

  public getNotice() {
    return this.http.get(CONFIG.apiUrl + 'notice/main_list')
      .map(response => response.json());
  }

  public getAllNotice() {
    return this.http.get(CONFIG.apiUrl + 'notice/list')
      .map(response => response.json());
  }

  public getAllQna(email) {
    return this.http.get(CONFIG.apiUrl + 'qna/list/' + email)
      .map(response => response.json());
  }

  public getQna(id) {
    return this.http.get(CONFIG.apiUrl + 'qna/qna/' + id)
      .map(response => response.json());
  }

  public getSkinScore(email) {
    return this.http.get(CONFIG.apiUrl + 'userskinscore/' + email)
      .map(response => response.json());
  }

  public getSkinScoreMonth(email, date) {
    return this.http.get(CONFIG.apiUrl + 'userskinchart/' + email + '/' + date)
      .map(response => response.json());
  }

  //해쉬태그 모두 가져 오기
  public getHashTags() {
    return this.http.get(CONFIG.apiUrl + 'gethashtags/')
      .map(response => response.json());
  }

  //20190614 미션 시작시 mission 테이블에 post 정보를 날려 저장



  showAlert(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }



  ///ble 개발 향후 별도 provider 분리 필요

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([PLINIC_SERVICE], 10).subscribe(
      device => {
        console.log("aaaaa :" + device);
        this.onDeviceDiscovered(device);
        this.deviceSelected(device);
        // this.navCtrl.push(DeviceConnectCompletePage);
      },
      error => {
        console.log("bbbbb" + error);
        this.scanError(error);
        // this.navCtrl.push(DeviceConnectFailPage);
      }
    );
    return this.devices;
    // setTimeout(this.setStatus.bind(this), 10000, 'Scan complete')
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    // this.ngZone.run(() => {
    //   this.devices.push(device);
    // });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    // let toast = this.toastCtrl.create({
    //   message: 'Error scanning for Bluetooth low energy devices',
    //   position: 'middle',
    //   duration: 5000
    // });
    // toast.present();
    // this.navCtrl.push(DeviceConnectFailPage);

  }


  setStatus(message) {
    console.log(message);
    // this.ngZone.run(() => {
    //   this.statusMessage = message;
    // });
  }

  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    // this.navCtrl.push(DetailPage, {
    //   device: device
    // });

    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.bleshowAlert('Disconnected', 'The peripheral unexpectedly disconnected')
    );
  }

  onConnected(peripheral) {

    this.peripheral = peripheral;
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

    console.log("this.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.idthis.peripheral.id : " + this.peripheral.id);
    // Update the UI with the current state of the switch characteristic
    this.ble.read(this.peripheral.id, UUID_SERVICE, SWITCH_CHARACTERISTIC).then(
      buffer => {
        let data = new Uint8Array(buffer);
        console.log('switch characteristic 0' + data[0]);
        console.log('switch characteristic 1' + data[1]);
        console.log('switch characteristic 2' + data[2]);
        console.log('switch characteristic 3' + data[3]);
        console.log('switch characteristic 4' + data[4]);
        console.log('switch characteristic 5' + data[5]);
        // this.ngZone.run(() => {
        //     this.power = data[0] !== 0;
        // });
      }
    )

    // Update the UI with the current state of the dimmer characteristic
    // this.ble.read(this.peripheral.id, LIGHTBULB_SERVICE, DIMMER_CHARACTERISTIC).then(
    //   buffer => {
    //     let data = new Uint8Array(buffer);
    //     console.log('dimmer characteristic ' + data[0]);
    //     this.ngZone.run(() => {
    //       this.brightness = data[0];
    //     });
    //   }
    // )
  }


  bleshowAlert(title, message) {
    let alert = this.alertCtrl.create({
      cssClass: 'push_alert',
      title: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }



  public missionPointUpdate(id, email, points) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      id: id,
      points: points,
    };

    // console.log("missionPointUpdate : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/pointupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }


  public getmissionPoint(id, email) {
    return this.http.get(CONFIG.apiUrl + 'carezone/getmissionpoint/' + id + '/' + email)
      .map(response => response.json());
  }

  public replyCareZoneSave(userData, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: userData.email,
      img_url: userData.thumbnail_image,
      id: content.id,
      comment: content.comment,
    };

    console.log("ReplySave : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replycarezonesave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public replyCareZoneUpdate(content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: content.email,
      id: content.id,
      comment: content.comment,
    };

    console.log("Replyupdate : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replycarezoneupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public replyCareZoneDelete(content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: content.email,
      id: content.id,
      comment: content.comment,
    };

    console.log("Replydelete : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/replycarezonedelete', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }






}
