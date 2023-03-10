import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform, AlertController, Config, Loading, LoadingController } from 'ionic-angular';
// import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Naver } from 'ionic-plugin-naver';
import { FCM } from '@ionic-native/fcm';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer'
import { BLE } from '@ionic-native/ble';
import { reject } from 'q';
declare var cordova: any;
// declare var SignInWithApple: any;


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
  skincomplaint: string;

  constructor(email: string, name: string, birthday: string, gender: string, skincomplaint: string) {
    this.email = email;
    this.nickname = name;
  }
}

const TOKEN_KEY = 'userData';
const CONFIG = {
  apiUrl: 'http://plinic.cafe24app.com/',
  // apiUrl: 'http://localhost:8001/',
  subapiUrl: 'https://plinicshop.com/',
  adminapiUrl: 'http://plinicshop.com:50082/',
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
  pushToken: any;
  loading: Loading;

  constructor(
    private ble: BLE, 
    private transfer: Transfer, 
    private http: Http, 
    public authHttp: AuthHttp, 
    public storage: Storage,
    public _kakaoCordovaSDK: KakaoCordovaSDK, 
    private platform: Platform, 
    private alertCtrl: AlertController,
    // private facebook: Facebook,
    private google: GooglePlus,
    // public bluetoothle: BluetoothLE, 
    public naver: Naver,
    private fcm: FCM,
    public loadingCtrl: LoadingController
  ) {

    this.platform.ready().then(() => {

      // if (this.platform.is('ios')) {
      //   this.fcm.getToken().then(token => {
      //     this.pushToken = token;
      //     // console.log("FCM iOS Auth Token :::::::::::::" + token);
      //     //????????? ?????? ??????, ????????? ?????? ?????? ???????????? ????????? ?????? ???????????? ???????????? ?????? ????????? ????????? ????????? ??????(mongoDb)??? ????????????.
      //   })

      //   this.fcm.onTokenRefresh().subscribe(token => {
      //     this.pushToken = token;
      //     console.log("FCM iOS Auth Refresh Token :::::::::::::" + token);
      //   });
      // }


      // if (this.platform.is('android')) {
      //   this.fcm.getToken().then(token => {
      //     this.pushToken = token;
      //     console.log("FCM Auth Token :::::::::::::" + token);
      //   })
      //   this.fcm.onTokenRefresh().subscribe(token => {
      //     this.pushToken = token;
      //     console.log("FCM Auth Refresh Token :::::::::::::" + token);
      //   });
      // }


      this.checkToken();
      this.bluetooth_connect();
      // this.fcm.getToken().then(token => {
      //   this.push_token = token;
      //   console.log("push_token================="+ token);
      // })

    });


  }

  //2020-06-30 ??? ?????? ?????? ????????? 3?????? ?????? ?????? ?????? ??????
  public setHomePopUpCheck(check) {
    this.storage.set('HomePopup', check);
  }

  public getHomePopUpCheck() {
    return this.storage.get('HomePopup');
  }

  // ?????? ??????????????? ??????
  public setUserStoragetab(check) {
    this.storage.set('check', check);
  }

  public getUserStoragetab() {
    return this.storage.get('check');
  }

  //?????? ?????????????????? ??????
  public setUserStoragediagnose_first_check(check) {
    this.storage.set('check', check);
  }

  public getUserStoragediagnose_first_check() {
    return this.storage.get('check');
  }

  //?????? ?????????
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


  //??????????????? ?????????
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

  // ????????? ????????? ??????.. ?????? ????????? ??????
  public setUserStorageimagePath(imagePath) {
    this.storage.set('imagePath', imagePath);
  }

  public getUserStorageimagePath() {
    return this.storage.get('imagePath');
  }


  public get_qna_answer() {
    this.sendnotification("plinic", "???????????? ????????? ????????? ?????????????????????.");
  }

  //backend coding
  sendnotification(sname, msg) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',
      'key=' + "AIzaSyCAcTA318i_SVCMl94e8SFuXHhI5VtXdhU");   //?????????
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
      //??????
    }
    this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(payload), option)
      .map(res => res.json())
      .subscribe(data => {
        console.log("dddddddddddddddddddddd=================" + data);
      });
  }


  public bluetooth_connect() {
    // if (this.platform.is('cordova')) {
    //   this.bluetoothle.initialize().then(ble => {
    //     console.log('ble', ble.status) // logs 'enabled'
    //     if (ble.status === "enabled") {
    //       this.blu_connect = true;
    //       console.log('enabled====================', this.blu_connect);
    //     }
    //     else {
    //       this.blu_connect = false;
    //       console.log('disenabled====================', this.blu_connect);
    //     }
    //   });
    //   return this.blu_connect;
    // }
  }


  public naver_login() {
    console.log("????????? ????????? ?????? ----------------------------------------------------------");
    this.naver.login()
      .then(response => {
        this.userData = {
          accessToken: response['accessToken'],
          pushtoken: this.pushToken,
          from: 'naver'
        }
        this.naver.requestMe()
          .then(response2 => {
            this.userData = {
              accessToken: response['accessToken'],
              pushtoken: this.pushToken,
              email: response2.response.email,
              nickname: response2.response.name,
              id: response2.response.id,
              from: 'naver'
            }
            // this.userData.email = response.response.email;
            // this.userData.nickname = response.response.name;
            // this.userData.id = response.response.id;
            console.log("userdata ::: " + JSON.stringify(this.userData))
            if (this.userData !== '') {
              this.registerSnS(this.userData).subscribe(data => {
                console.log("?????????");
              }, error => {
                console.log("?????????");
              })
              this.storage.set('userData', this.userData);
              this.authenticationState.next(true);
              return this.userData;
            }
          }) // ??????
          .catch(error => console.error(error)); //
      }
      )
      .catch(error => console.error(error)); // ??????
    // if (this.userData !== '') {
    //   this.storage.set('userData', this.userData);
    //   this.authenticationState.next(true);
    //   return this.userData;
    // }
  }

   public naver_promise() {
    return new Promise((resolve, reject) => {
        this.naver.login()
        .then(response => {
          this.userData = {
            accessToken: response['accessToken'],
            pushtoken: this.pushToken,
            from: 'naver'
          }
          this.naver.requestMe()
          .then(response2 => {
            this.userData = {
              accessToken: response['accessToken'],
              pushtoken: this.pushToken,
              email: response2.response.email,
              nickname: response2.response.name,
              id: response2.response.id,
              from: 'naver'
            }
            console.log("userdata ::: " + JSON.stringify(this.userData))
            if (this.userData !== '') {
              this.snsexists(this.userData.email).subscribe(result=> {
                if(result) {
                  this.userData = {
                    birthday: result.user.birthday,
                    email: result.user.email,
                    gender: result.user.gender,
                    nickname: result.user.name,
                    skincomplaint: result.user.skincomplaint,
                    country: result.user.country,
                    from: result.user.from,
                    snsid: result.user.snsid
                  }
                  this.storage.set('userData', this.userData);
                  this.authenticationState.next(true);
                  return result;
                }
                if(!result) { //addinfo page??? ?????? ?????? ????????? ?????? ????????? ????????????.
                  resolve(this.userData);
                }
              })
            }
          }).catch(error => console.error(error));
        });
        
      // reject('naver promise reject');
    })
  }

  public async naver_logout() {
    console.log("???????????? ?????? -------------------------: ");
    // this.naver.logoutAndDeleteToken()
    //   .then(response => {
    // console.log("???????????? ?????? ---------------------------" + response)
    await this.deleteToken();
    await this.deleteUser();
    this.currentUser = null;
    await this.authenticationState.next(false);
    console.log("???????????? ?????? ---------------------------")
    // }) // ??????
    // .catch(error => console.error(error)); // ??????
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

  //?????? ????????? ?????? 2019-04-23 ?????????
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
          pushtoken: this.pushToken,
          from: 'google'
        };
        this.registerSnS(this.userData).subscribe(data => {
          console.log("?????????");
        }, error => {
          console.log("?????????");
        })
        this.storage.set('userData', this.userData);
        this.authenticationState.next(true);
        return this.userData;
      })
      .catch(err => {
        this.showAlert("Google??? ??????????????? ???????????????. ??????????????? ???????????????." + err)
        // console.error(err)
      });
  }

  //?????? ????????? ?????? 2019-04-23 ?????????
  public google_login_promise() {
    return new Promise((resolve, reject) => {

    
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
            pushtoken: this.pushToken,
            from: 'google'
          };
          console.log("userdata ::: " + JSON.stringify(this.userData))
            if (this.userData !== '') {
              this.snsexists(this.userData.email).subscribe(result=> {
                if(result) {
                  this.userData = {
                    birthday: result.user.birthday,
                    email: result.user.email,
                    gender: result.user.gender,
                    nickname: result.user.name,
                    skincomplaint: result.user.skincomplaint,
                    country: result.user.country,
                    from: result.user.from,
                    snsid: result.user.snsid
                  }
                  this.storage.set('userData', this.userData);
                  this.authenticationState.next(true);
                  return result;
                }
                if(!result) { //addinfo page??? ?????? ?????? ????????? ?????? ????????? ????????????.
                  resolve(this.userData);
                }
              })
            }
        })
        .catch(err => {
          this.showAlert("Google??? ??????????????? ???????????????. ??????????????? ???????????????." + err)
          // console.error(err)
        });
    })
  }

  // ?????? ????????? ?????? 2019-07-02 ?????????
  public apple_login() {
    cordova.plugins.SignInWithApple.signin (
      { requestedScopes: [0, 1] },
      (appleLoginResponse : any) => {
        console.log (appleLoginResponse)
        this.userData = {
            accessToken: appleLoginResponse['authorizationCode'],
            // id: appleLoginResponse['userId'],
            //age_range: succ['age_range'],
            //birthday: succ['birthday'],
            email: this.jwtHelper.decodeToken(appleLoginResponse.identityToken).email,
            //gender: succ['gender'],
            nickname: appleLoginResponse['fullName'].familyName + appleLoginResponse['fullName'].givenName,
            //profile_image: succ['profile_image'],
            // thumbnail_image: succ['imageUrl'],
            //use_email: succ['has_email'],
            pushtoken: '',
            from: 'apple'
        };
        this.registerSnS(this.userData).subscribe(data => {
          console.log("?????????");
        }, error => {
          console.error("?????? ????????? ?????????" + error);
        })
        this.storage.set('userData', this.userData);
        this.authenticationState.next(true);
        return this.userData;
      },
      (err : any) => {
        console.error ("????????? ????????? ?????? ?????? : " + err)
        console.log ("????????? ????????? ?????? ?????? : " +  JSON.stringify (err))
      })
  }

  public async apple_login_promise() {
    return new Promise((resolve, reject) => {
    cordova.plugins.SignInWithApple.signin (
      { requestedScopes: [0, 1] },
      (appleLoginResponse : any) => {
        console.log (appleLoginResponse)
        this.userData = {
            accessToken: appleLoginResponse['authorizationCode'],
            // id: appleLoginResponse['userId'],
            //age_range: succ['age_range'],
            //birthday: succ['birthday'],
            email: this.jwtHelper.decodeToken(appleLoginResponse.identityToken).email,
            //gender: succ['gender'],
            nickname: appleLoginResponse['fullName'].familyName + appleLoginResponse['fullName'].givenName,
            //profile_image: succ['profile_image'],
            // thumbnail_image: succ['imageUrl'],
            //use_email: succ['has_email'],
            pushtoken: '',
            from: 'apple'
        };

        if (this.userData !== '') {
          this.snsexists(this.userData.email).subscribe(result=> {
            if(result) {
              this.userData = {
                birthday: result.user.birthday,
                email: result.user.email,
                gender: result.user.gender,
                nickname: result.user.name,
                skincomplaint: result.user.skincomplaint,
                country: result.user.country,
                from: result.user.from,
                snsid: result.user.snsid
              }
              this.storage.set('userData', this.userData);
              this.authenticationState.next(true);
              return result;
            }
            if(!result) { //addinfo page??? ?????? ?????? ????????? ?????? ????????? ????????????.
              resolve(this.userData);
            }
          })
        }
        console.log(this.jwtHelper.decodeToken(appleLoginResponse.identityToken));

      },
      (err : any) => {
        console.error (err)
        console.log ( JSON.stringify (err))
      });
    }).catch(err => {
      alert("Apple??? ??????????????? ???????????????. ??????????????? ???????????????." + err)
    });
  }


  //???????????? ????????? ?????? 2018-04-23 ?????????
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
        let loginOptions = {};
        loginOptions['authTypes'] = [
          // AuthTypes.AuthTypeTalk,
          // AuthTypes.AuthTypeStory,
          AuthTypes.AuthTypeAccount
        ];
        console.log("????????? ????????? ?????? ::::::::::::::");
        this._kakaoCordovaSDK.login(loginOptions).then((res) => {
          console.log("????????? ????????? ?????? ::::::::::::::");
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
            pushtoken: this.pushToken,
            from: 'kakao'
          };
          this.registerSnS(this.userData).subscribe(data => {
            console.log("?????????");
          }, error => {
            console.log("?????????");
          })
          this.currentUser = res.properties['nickname'];
          this.storage.set('userData', this.userData);
          // console.log(JSON.stringify(this.userData))
          this.authenticationState.next(true);
          return this.userData;
        }).catch((err) => {
          console.log("kakao ---------------------- err" + err);
        })
    }

  
    public kakao_login_promise() {
      return new Promise((resolve, reject) => {
          let loginOptions = {};
          loginOptions['authTypes'] = [
            // AuthTypes.AuthTypeTalk,
            // AuthTypes.AuthTypeStory,
            AuthTypes.AuthTypeAccount
          ];
          console.log("????????? ????????? ?????? ::::::::::::::");
          this._kakaoCordovaSDK.login(loginOptions).then((res) => {
            console.log("????????? ????????? ?????? ::::::::::::::");
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
              pushtoken: this.pushToken,
              from: 'kakao'
            };
            // console.log("userdata ::: " + JSON.stringify(this.userData))
            if (this.userData !== '') {
              this.snsexists(this.userData.email).subscribe(result=> {
                if(result) {
                  this.userData = {
                    birthday: result.user.birthday,
                    email: result.user.email,
                    gender: result.user.gender,
                    nickname: result.user.name,
                    skincomplaint: result.user.skincomplaint,
                    country: result.user.country,
                    from: result.user.from,
                    snsid: result.user.snsid
                  }
                  this.storage.set('userData', this.userData);
                  this.authenticationState.next(true);
                  return result;
                }
                if(!result) { //addinfo page??? ?????? ?????? ????????? ?????? ????????? ????????????.
                  resolve(this.userData);
                }
              })
            }
            // this.registerSnS(this.userData).subscribe(data => {
              // console.log("?????????");
            // }, error => {
            //   console.log("?????????");
            // })
            // this.currentUser = res.properties['nickname'];
            // this.storage.set('userData', this.userData);
            // console.log(JSON.stringify(this.userData))
            // this.authenticationState.next(true);
            // return this.userData;
          }).catch((err) => {
            console.log("kakao ---------------------- err" + err);
          })
        })
      }

  public async kakao_authlogout() {
    await this.deleteToken();
    await this.deleteUser();
    this.currentUser = null;
    await this.authenticationState.next(false);

    // if(this.platform.is('cordova')){
    //   this._kakaoCordovaSDK.logout().then(() => {
    //     this.authenticationState.next(false);
    //   });
    //
    //   this.naver.logoutAndDeleteToken()
    //     .then(response => console.log(response)) // ??????
    //     .catch(error => console.log(error)); // ??????
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
      pushtoken: this.pushToken,
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
      pushtoken: this.pushToken,
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
      pushtoken: this.pushToken,
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
      pushtoken: this.pushToken,
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
        'pushtoken': body.pushtoken,
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
      pushtoken: this.pushToken,
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
      pushtoken: this.pushToken,
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
      pushtoken: this.pushToken,
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
      pushtoken: this.pushToken,
      tags: content.tags,
    };

    return this.http.post(CONFIG.apiUrl + 'api/skinqnaupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }


  //???????????? ??????
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
      pushtoken: this.pushToken,
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

  //???????????? ??????
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
      pushtoken: this.pushToken,
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
        'pushtoken': body.pushtoken,
        'tags': JSON.stringify(body.tags),
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options);
  }

  //????????? Save 20190709 ????????? ------------------------------------------
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

  //????????? Save & Update 20190709 ?????????  ------------------------------------------
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

  public missionSave(id, email, image, start, end, title, sub, maxmember, userimagefile, filename) {
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
      maxmember: maxmember,
      userImageFilename: userimagefile,
      filename: filename
    };
    return this.http.post(CONFIG.apiUrl + 'api/missionsave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  //2020-02-10 ????????? ?????????

  public challengeSave(id, email, image, start, end, title, sub, maxmember, userimagefile, filename) {
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
      maxmember: maxmember,
      userImageFilename: userimagefile,
      filename: filename
    };
    return this.http.post(CONFIG.apiUrl + 'api/challengesave', JSON.stringify(body), { headers: headers })
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
          skincomplaint: data.skincomplaint,
          country: data.country,
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
    // gender: "??????"
    // name: "?????????"
    // password: "$2a$10$41SKpY.5gQeMz/XviTQMtupl3tCb1eS8g6HKLDNj9Tme08xOYjyXW"
    // skincomplaint: "?????????"
    // __v: 0
    // _id: "5cc143f3eed1e1474303a58d"
    // __proto__: Object
  }

  // Register a new user at our API
  public registerSnS(userData) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let body = {
      email: userData.email,
      name: userData.name,
      gender: userData.gender,
      birthday: userData.birthday,
      skincomplaint: userData.skincomplaint,
      phonenumber: userData.phonenumber,
      country: userData.country,
      pushtoken: this.pushToken,
      user_jwt: false,
      imagePath: userData.profile_image,
      age_range: userData.age_range,
      from: userData.from,
      snsid: userData.snsid,
    };
    return this.http.post(CONFIG.apiUrl + 'api/registersns', JSON.stringify(body), { headers: headers })
      .map(response => response.json())
      .map(data => {
        this.userData = {
          birthday: data.user.birthday,
          email: data.user.email,
          gender: data.user.gender,
          nickname: data.user.name,
          skincomplaint: data.user.skincomplaint,
          country: data.user.country,
          from: data.user.from
        }
        this.storage.set('userData', this.userData);
        this.authenticationState.next(true);
        return data;
      });

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
    this.currentUser = new User(this.jwtHelper.decodeToken(this.userToken).email, this.jwtHelper.decodeToken(this.userToken).name, this.jwtHelper.decodeToken(this.userToken).birthday, this.jwtHelper.decodeToken(this.userToken).gender, this.jwtHelper.decodeToken(this.userToken).skincomplaint);
    // console.log(this.currentUser);
    // console.log("???????????? ???????????? ???????????? ???????????? ????????????" + token);
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

  //??????????????? ??????????????? ????????????, ?????????, ????????? ????????? ????????? ????????? ??????????????? ????????????.
  public getUserStorage() {
    return this.storage.get('userData');
  }

  public setUserStorage(userData) {
    this.storage.set('userData', userData);
  }

  public async logout() {
    this.currentUser = null;
    await this.deleteToken();
    await this.authenticationState.next(false);
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

  public getAllFaq() {
    return this.http.get(CONFIG.apiUrl + 'faq/list')
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

  public getChartScore(email, date) {
    return this.http.get(CONFIG.apiUrl + 'carezone/totalusetime/' + email + '/' + date)
      .map(response => response.json());
  }

  public getChartAllScore(email) {
    return this.http.get(CONFIG.apiUrl + 'carezone/totalallusetime/' + email)
      .map(response => response.json());
  }

  public getRankTotalUseTime(date) {
    return this.http.get(CONFIG.apiUrl + 'carezone/ranktotalusetime/' + date)
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

  //???????????? ?????? ?????? ??????
  public getHashTags() {
    return this.http.get(CONFIG.apiUrl + 'gethashtags/')
      .map(response => response.json());
  }

  //20190614 ?????? ????????? mission ???????????? post ????????? ?????? ??????



  showAlert(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }



  ///ble ?????? ?????? ?????? provider ?????? ??????

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

  public challengeUpdate(id, email, points) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      id: id,
      points: points,
    };

    // console.log("missionPointUpdate : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/challengeUpdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public challengeUpdate2(id, email, points) { //?????? 120???(2???) ?????? ?????????, ????????? ?????? ???????????? ????????? ?????? ?????? 2020-02-20
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      id: id,
      points: points,
    };

    // console.log("missionPointUpdate : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/challengeUpdate2', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public chulSukUpdate(email, chulcheck) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      chulcheck: chulcheck,
    };

    return this.http.post(CONFIG.apiUrl + 'api/chulsuk', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }
  

  public userTimeUpdate(email, points) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      points: points,
    };

    return this.http.post(CONFIG.apiUrl + 'api/usetimeupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  //2020-02-18 ????????? ????????? ?????? ?????? //20200522 ???????????? ????????? ??? ????????? ???????????? ??????????????? ??????.
  public userPointUpdate(email, points) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      userpoint : {
        point: points,
        updatedAt : new Date(),
        status : true
      },
      points: points,
    };

    return this.http.post(CONFIG.apiUrl + 'api/usepointupdate', JSON.stringify(body), { headers: headers })
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

  public getUserImage(email) {
    return this.http.get(CONFIG.apiUrl + 'userimages/' + email)
      .map(response => response.json());
  }

  public getHistoryMission(email) {
    return this.http.get(CONFIG.apiUrl + 'carezone/historymission/' + email)
      .map(response => response.json());
  }


  public getPostCodeCheck() {
    return this.http.get(CONFIG.apiUrl + 'api/daumjuso/mobile')
      .map(response => response.json());
  }

  public rewardSave(userdata, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: userdata,
      name: content.name,
      missionID: content.missionid,
      reward: true,
      product: content.product,
      prodfilename: content.prodfilename,
      prodoriginalname: content.prodoriginalname,
      title: content.title,
      startmission: content.startmission,
      endmission: content.endmission,
      zonecode: content.zonecode,
      address: content.address,
      detailAddress: content.detailAddress,
      desc: content.desc,
      bname: content.bname,
      buildingName: content.buildingName,
      phoneNumber: content.phoneNumber,
      postemail: content.email,
    };

    return this.http.post(CONFIG.apiUrl + 'api/rewardsave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public rewardChallengeSave(userdata, content) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: userdata,
      name: content.name,
      missionID: content.missionid,
      reward: true,
      product: content.product,
      prodfilename: content.prodfilename,
      prodoriginalname: content.prodoriginalname,
      title: content.title,
      startmission: content.startmission,
      endmission: content.endmission,
      zonecode: content.zonecode,
      address: content.address,
      detailAddress: content.detailAddress,
      desc: content.desc,
      bname: content.bname,
      buildingName: content.buildingName,
      phoneNumber: content.phoneNumber,
      postemail: content.email,
      review: content.review,
    };

    return this.http.post(CONFIG.apiUrl + 'api/rewardchallengesave', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public getUseTotalTime(id) {
    return this.http.get(CONFIG.apiUrl + 'totalusetime/' + id)
      .map(response => response.json());
  }

  //????????? ????????? ??????
  public updateUserNickname(email, nickname) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      nickname: nickname,
    };

    return this.http.post(CONFIG.apiUrl + 'api/userupdatenickname', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  //????????? ???????????? ??????
  public updateUserSkinComplaint(email, skincomplaint) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      skincomplaint: skincomplaint,
    };

    return this.http.post(CONFIG.apiUrl + 'api/updateskincomplaint', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  public snsPointUpdate(id, email, points) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
      id: id,
      snsPoint: points,
    };

    // console.log("missionPointUpdate : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'api/snspointupdate', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log(data);
        return data;
      });
  }

  public hairSkin(img, user) { // ?????? ?????? 2020-04-16
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    var age = user.birthday;
    console.log("????????? ?????? ?????????????" + age);
    age = age.substr(0,4);
    age = Number(2020) - Number(age);
    console.log("?????????? :" + age);
    // let body = {
    //   email: email,
    //   select: content.select,
    //   title: content.title,
    //   contents: content.contents,
    //   tags: content.tags,
    //   pushtoken: this.pushToken,
    // };

    let url = CONFIG.apiUrl + 'hairskin';

    var targetPath = img;
    var options: FileUploadOptions = {
      fileKey: 'hairimage',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'email': user.email,
        'gender': user.gender,
        'skincomplaint': user.skincomplaint,
        'nickname': user.nickname,
        'birthday': user.birthday,
        'age': user.age,
        // 'select': body.select,
        // 'title': body.title,
        // 'contents': body.contents,
        // 'pushtoken': body.pushtoken,
        // 'tags': JSON.stringify(body.tags),
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options);

  }

  public eyeSkin(img, user) { // ?????? ?????? 2020-04-16
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    var age = user.birthday;
    console.log("????????? ?????? ?????????????" + age);
    age = age.substr(0,4);
    age = Number(2020) - Number(age);
    console.log("?????????? :" + age);
    // let body = {
    //   email: email,
    //   select: content.select,
    //   title: content.title,
    //   contents: content.contents,
    //   tags: content.tags,
    //   pushtoken: this.pushToken,
    // };

    let url = CONFIG.apiUrl + 'eyeskin';

    var targetPath = img;
    var options: FileUploadOptions = {
      fileKey: 'eyeimage',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'email': user.email,
        'gender': user.gender,
        'skincomplaint': user.skincomplaint,
        'nickname': user.nickname,
        'birthday': user.birthday,
        'age': user.age,
        // 'select': body.select,
        // 'title': body.title,
        // 'contents': body.contents,
        // 'pushtoken': body.pushtoken,
        // 'tags': JSON.stringify(body.tags),
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options);
  }

  public foreheadSkin(img, user) { // ?????? ??????
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    var age = user.birthday;
    console.log("????????? ?????? ?????????????" + age);
    age = age.substr(0,4);
    age = Number(2020) - Number(age);
    console.log("?????????? :" + age);
    // let body = {
    //   email: email,
    //   select: content.select,
    //   title: content.title,
    //   contents: content.contents,
    //   tags: content.tags,
    //   pushtoken: this.pushToken,
    // };

    let url = CONFIG.apiUrl + 'foreheadskin';

    var targetPath = img;
    var options: FileUploadOptions = {
      fileKey: 'foreheadimage',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'email': user.email,
        'gender': user.gender,
        'skincomplaint': user.skincomplaint,
        'nickname': user.nickname,
        'birthday': user.birthday,
        'age': user.age,
        // 'select': body.select,
        // 'title': body.title,
        // 'contents': body.contents,
        // 'pushtoken': body.pushtoken,
        // 'tags': JSON.stringify(body.tags),
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options);

  }

  public cheekSkin(img, user) { //??? ??????
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    var age = user.birthday;
    age = age.substr(0,4);
    age = 2020 - Number(age);
    console.log("?????????? :" + age);
    // let body = {
    //   email: email,
    //   select: content.select,
    //   title: content.title,
    //   contents: content.contents,
    //   tags: content.tags,
    //   pushtoken: this.pushToken,
    // };

    let url = CONFIG.apiUrl + 'cheekskin';

    var targetPath = img;
    var options: FileUploadOptions = {
      fileKey: 'cheekimage',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'email': user.email,
        'gender': user.gender,
        'skincomplaint': user.skincomplaint,
        'nickname': user.nickname,
        'birthday': user.birthday,
        'age': user.age,
        // 'select': body.select,
        // 'title': body.title,
        // 'contents': body.contents,
        // 'pushtoken': body.pushtoken,
        // 'tags': JSON.stringify(body.tags),
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options);

  }

  //???????????? ????????? ?????? ?????? 2020-02-14
  public loadChulSuk(email) {
    return this.http.get(CONFIG.apiUrl + 'loadchulsuk/' + email)
      .map(response => response.json());
  }

  //????????? ????????? ?????? ?????? ?????? 2020-02-18
  public reloadUserPoint(email) {
    return this.http.get(CONFIG.apiUrl + 'reloadUserPoint/' + email)
      .map(response => response.json());
  }

  //????????? ????????? ????????? ????????? ???????????? 2020-07-01
  public reloadUserPointfromPlincShop(email) {
    return this.http.get(CONFIG.apiUrl + 'Point/getUserPlinicPoint/' + email)
      .map(response => response.json());
  }

  //????????? ????????? ?????? ?????? ??????
  public refreshUser(email) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email: email,
    };

    return this.http.post(CONFIG.apiUrl + 'api/loaduser', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        // console.log(data);
        this.storage.set('userData', data);
        return data;
      });
  }

  public plinicShopSignUp(credentials) {
    console.log("????????? ?????? ?????? : " + JSON.stringify(credentials));
    // let url = "http://localhost/Users/PlinicSignup";
    var headers = new Headers();
    var phoneNumber = credentials.phonenumber.replace(/-/gi, "");
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let body =  "UsrPassword=" + credentials.password  + 
                "&UsrName=" + credentials.name + 
                "&UsrPhone=" + phoneNumber + 
                "&UsrEmail=" + credentials.email + 
                "&UsrIsAgrdToUse=" + 'true' + 
                "&UsrIsAgrdPrivacy=" + 'true' +
                "&UsrIsEmailMrktAgrd=" + 'true' +
                "&UsrIsSmsMrktAgrd=" + 'true' +
                "&UsrSex=" + credentials.gender +
                "&UsrSkin=" + credentials.skincomplaint +
                "&UsrBirthday=" + credentials.birthday;
    return this.http.post(CONFIG.subapiUrl + 'Users/PlinicSignup' ,body,options)
    .map(res => res.json())
    .map(data => {
      return data;
    }, err => {
      console.log("Error : " + err);
    })
  }

  public plinicShopAddPoint(email, point, reason) {
    // let url = "http://localhost/Users/PlinicSignup";
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let body =  "id=" + email  + 
                "&point=" + point + 
                "&expire=" + 1096 +
                "&reason=" + reason; 
    return this.http.post(CONFIG.adminapiUrl + 'Point/PlinicAddPoint',body,options)
    .map(res => res.json())
    .map(data => {
      return data;
    }, err => {
      console.log("Error : " + err);
    })
  }

  //2020-03-17 SNS????????? ?????? ?????? ??????
  public plinicShopGetUserPoint() {

    var headers = new Headers();
    // headers.append('Access-Control-Allow-Origin' , '*http://plinicshop:50082*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers.append('Accept','application/json');
    // headers.append('content-type','application/json');
     let options = new RequestOptions({ headers:headers});
    // return this.http.get(CONFIG.apiUrl + 'users/snsexists/')
    return this.http.get(CONFIG.apiUrl + 'Point/getPlinicPoint', options)
    .map(response => response.json());
  }
  

  //2020-03-17 SNS????????? ?????? ?????? ??????
  public snsexists(email) {
      return this.http.get(CONFIG.apiUrl + 'users/snsexists/' + email)
      .map(response => response.json());
  }

  //2020-03-18 ?????? ????????? ?????? ?????? ??????
  public isReview() {
      return this.http.get(CONFIG.apiUrl + 'appreview')
      .map(response => response.json());
  }


  //2020-05-07 ????????? ?????? ????????? ??????
  public saveMyProduct(email, product, mode) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    if(mode==='main'){
      var urlmode = "savemymainproduct";
    }else {
      var urlmode = "savemysubproduct";
    }

    var preIngredient = {
      korean_name : product.ingredient.korean_name,
      english_name : product.ingredient.english_name,
      ewg_level : product.ingredient.ewg_level,
      purpose : product.ingredient.purpose
    }

    var saveProduct = {
      title: product.title,
      jejosa: product.jejosa,
      brand: product.brand,
      body: product.body,
      filename : product.filename,
      originalName : product.originalName,
      brand_name: product.brand_name,
      big_category: product.big_category,
      small_category: product.small_category,
      product_name: product.product_name,
      seller: product.seller,
      color_type: product.color_type,
      function: product.function,
      product_num: product.product_num,
      image_url: product.image_url,
      ingredient: preIngredient,
      weight: product.weight,
      price: product.price,
    }

    let body = {
      email : email,
      product: saveProduct,
    };

    return this.http.post(CONFIG.apiUrl + 'api/' + urlmode, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  public delAndSaveMyProduct(email, product, mode) { //2020-05-11 ?????? ????????? ?????? ??? ???????????? ?????? ??? ????????????.
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    if(mode==='main'){
      var urlmode = "delsavemymainproduct";
    }else {
      var urlmode = "delsavemysubproduct";
    }

    var preIngredient = {
      korean_name : product.ingredient.korean_name,
      english_name : product.ingredient.english_name,
      ewg_level : product.ingredient.ewg_level,
      purpose : product.ingredient.purpose
    }

    var saveProduct = {
      title: product.title,
      jejosa: product.jejosa,
      brand: product.brand,
      body: product.body,
      filename : product.filename,
      originalName : product.originalName,
      brand_name: product.brand_name,
      big_category: product.big_category,
      small_category: product.small_category,
      product_name: product.product_name,
      seller: product.seller,
      color_type: product.color_type,
      function: product.function,
      product_num: product.product_num,
      image_url: product.image_url,
      ingredient: preIngredient,
      weight: product.weight,
      price: product.price,
    }

    let body = {
      email : email,
      product: saveProduct,
    };

    return this.http.post(CONFIG.apiUrl + 'api/' + urlmode, JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }


  public cameraTest(img, img2, img3, user) { // ???????????? ?????? ????????? ?????? ??????

    console.log(img);
    console.log(img2);
    console.log(img3);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    var age = 37;
    // console.log("????????? ?????? ?????????????" + age);
    // age = age.substr(0,4);
    // age = Number(2020) - Number(age);
    // console.log("?????????? :" + age);
    // age = 37;
    // let body = {
    //   email: email,
    //   select: content.select,
    //   title: content.title,
    //   contents: content.contents,
    //   tags: content.tags,
    //   pushtoken: this.pushToken,
    // };

    // let url = CONFIG.apiUrl + 'hairskin';
    let url = 'http://ec2-3-34-189-215.ap-northeast-2.compute.amazonaws.com/api/?skin_feature=skin_tone,pores,wrinkles,diff';

    var targetPath = img;
    var targetPath2 = img2;
    var targetPath3 = img3;
    var options: FileUploadOptions = {
      // fileKey: 'hairimage',
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'email': user.email,
        'gender': user.gender,
        'skincomplaint': user.skincomplaint,
        'nickname': user.nickname,
        'birthday': user.birthday,
        'age': age,
        // 'select': body.select,
        // 'title': body.title,
        // 'contents': body.contents,
        // 'pushtoken': body.pushtoken,
        // 'tags': JSON.stringify(body.tags),
      }
    };
    const fileTransfer: TransferObject = this.transfer.create();
    return fileTransfer.upload(targetPath, url, options).then(data=>{
      var result1 = JSON.parse(data.response);
      console.log("??? ?????? (???) ??????  ?????? : " + JSON.stringify(result1));
      return fileTransfer.upload(targetPath2, url, options).then(data2=> {
        var result2 = JSON.parse(data2.response);
        console.log("??? ?????? (??????) ??????  ?????? : " + JSON.stringify(result2));
        return fileTransfer.upload(targetPath3, url, options).then(data3=> {
          var result3 = JSON.parse(data3.response);
          console.log("??? ?????? (??????) ??????  ?????? : " + JSON.stringify(result3));
        }, fail3=> {
          console.log("??? ??????  ??????  ?????? : " + JSON.stringify(fail3));
        })
      },fail2=> {
        console.log("??? ??????  ??????  ?????? : " + JSON.stringify(fail2));
      })
    }, fail1=> {
      console.log("??? ??????  ??????  ?????? : " + JSON.stringify(fail1));
    });
  }


  //????????? Save 20190709 ????????? ------------------------------------------
  public cameraTest2(files, email, score) {
    let formData = new FormData();
    for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
      console.log("?????? ????????? ??????" + i);
    }
    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    console.log("???????????? : " + JSON.stringify(formData));
    // console.log("skinChartSave Data : " + JSON.stringify(body));

    return this.http.post(CONFIG.apiUrl + 'cameratest', formData)
      .map(res => res.json())
      .map(data => {
        console.log("???????????? ?????? : " + data);
        return data;
      });
  }

  //2020-06-04 ????????? id(email) ??????
  public idFind(credentials) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      name : credentials.name,
      birthday: credentials.birthday,
    };

    return this.http.post(CONFIG.apiUrl + 'api/findId', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  public passwordReset(credentials) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email : credentials.email,
      name : credentials.name,
      birthday: credentials.birthday,
    };

    return this.http.post(CONFIG.apiUrl + 'api/validIdandSendemail', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  public passwordChange(credentials) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email : credentials.email,
      name : credentials.name,
      birthday: credentials.birthday,
      temp: credentials.temp,
      password: credentials.password
    };

    return this.http.post(CONFIG.apiUrl + 'api/changePassword', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  public checkUser(credentials) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    let body = {
      email : credentials.email
    };

    return this.http.post(CONFIG.apiUrl + 'api/checkUser', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  public changePush(email, ispush) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    let body = {
      email : email,
      ispush : ispush
    };

    return this.http.post(CONFIG.apiUrl + 'api/changepush', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }

  public getUserPush(email) {
    return this.http.get(CONFIG.apiUrl + 'userpush/' + email)
      .map(response => response.json());
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '????????? ??????????????????'
    });
    this.loading.present();
  }

  public updatePushToken(email, pushtoken) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      email : email,
      pushtoken : pushtoken
    }

    return this.http.post(CONFIG.apiUrl + 'api/updatepushtoken', JSON.stringify(body), {headers : headers} )
    .map(res => res.json())
    .map(data => {
      return data;
    })
  }

  public jsonBackSlash(data) {
    const removeBackSlash = data.replace(/\\/g,'');
    const replaceFirstBracket = removeBackSlash.replace(/\"{/g,'{');
    const replaceSecondBracket = replaceFirstBracket.replace(/\}"/g,'}'); 
    return replaceSecondBracket;
  }

  public compareAppVersion() {
    return this.http.get(CONFIG.apiUrl + 'appversion')
      .map(response => response.json());
  }

  public getOrderList(email, dateTime) {
    return this.http.get(CONFIG.apiUrl + 'Point/getUserOrder/' + email + '/' + dateTime)
      .map(response => response.json());
  }

  public billingsUser(key) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    let body = {
      key : key
    };

    return this.http.post(CONFIG.apiUrl + 'api/billings', JSON.stringify(body), { headers: headers })
      .map(res => res.json())
      .map(data => {
        return data;
      });
  }
}
