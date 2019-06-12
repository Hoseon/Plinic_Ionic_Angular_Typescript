import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, HttpModule } from '@angular/http';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform, AlertController } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Naver } from 'ionic-plugin-naver';

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

  constructor(private http: Http, public authHttp: AuthHttp, public storage: Storage,
    public _kakaoCordovaSDK: KakaoCordovaSDK, private platform: Platform, private alertCtrl: AlertController, private facebook: Facebook, private google: GooglePlus,
    public bluetoothle: BluetoothLE, public naver: Naver) {
    this.platform.ready().then(() => {
      this.checkToken();
      this.bluetooth_connect();
    });

    let loginOptions = {};
    loginOptions['authTypes'] = [
      AuthTypes.AuthTypeTalk,
      AuthTypes.AuthTypeStory,
      AuthTypes.AuthTypeAccount
    ];
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

    this.naver.login()
      .then(res =>
        this.userData = {
          accessToken: res.accessToken,
          expiresAt: res.expiresAt,
          refreshToken: res.refreshToken,
          tokenType: res.tokenType,
          from: 'naver'
        }
      ) // 성공
      .catch(error => this.showAlert("네이버 로그인을 하지 못했습니다. 관리자에게 문의 하세요")); // 실패
    //this.showAlert("접속 성공 :" + this.userData);

    if (this.userData.accessToken !== '') {
      this.storage.set('userData', this.userData);
      this.authenticationState.next(true);
      return this.userData;
    } else {
      this.authenticationState.next(false);
    }


    // if (this.userData !== '') {
    // this.naver.requestMe()
    // // .then(response => this.showAlert(JSON.stringify(response.response.gender)))
    //   .then(response =>
    //     this.userData = {
    //     age_range: response.response.age,
    //     birthday: response.response.birthday,
    //     email: response.response.email,
    //     gender: response.response.gender,
    //     id: response.response.id,
    //     name: response.response.name,
    //     nickname: response.response.nickname,
    //     thumbnail_image: response.response.profileImage
    //   }) // 성공
    //   .catch(error => console.error(error)); // 실패
    //this.showAlert("접속 성공 :" + JSON.stringify(this.userData));

    // } else {
    //   this.authenticationState.next(false);
    // }
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
        this.showAlert("Google에 로그인하지 못했습니다. 관리자에게 문의하세요.")
        // console.error(err)
      });
  }

  //페이스북 로그인 추가 2018-04-23 추호선
  public facebook_login() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = { email: profile['email'], first_name: profile['first_name'], thumbnail_image: profile['picture_large']['data']['url'], nickname: profile['name'], accessToken: response.authResponse.accessToken, from: 'facebook' }
        this.storage.set('userData', this.userData);
        this.authenticationState.next(true);
        return this.userData;
      });
    });

  }

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


  showAlert(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
