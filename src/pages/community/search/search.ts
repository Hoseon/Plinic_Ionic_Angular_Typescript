import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, PopoverController, Slides, ModalController } from 'ionic-angular';
import { MyPage } from '../my/my';
import { ImagesProvider } from '../../../providers/images/images';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { AlignPopoverPage } from './align-popover/align-popover';
import { AuthService } from '../../../providers/auth-service';
import { AuthHttp, AuthModule, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { CommunityModifyPage } from '../community-modify/community-modify';
import { CommunityWritePage } from '../community-write/community-write';



/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {


  searchTerm: any = "";
  jsonData: any;
  jsonData2: any;
  items: any;
  items2: any;
  focus: boolean = false;
  page_view: boolean = false;
  communityBeautyLoadData: any;
  beautyNoteData: any;
  skinQnaData: any;
  select_popover_option: any = "최신순";
  @ViewChild(Slides) slides: Slides;
  tags: any;
  tempTags: any;
  tempdata: any;
  toggleTag: boolean = false;
  pageNum: any;
  page: any = "0";
  search_view: boolean = false;
  search_tip: boolean = true;
  userData: any;
  jwtHelper: JwtHelper = new JwtHelper();
  datamode: any = "date";
  tagTerms: any;




  constructor(
    public modalCtrl: ModalController, 
    private auth: AuthService, 
    public nav: NavController, 
    public navParams: NavParams, 
    public platform: Platform, 
    public viewCtrl: ViewController, 
    public popoverCtrl: PopoverController,
    private themeableBrowser: ThemeableBrowser, 
    private images: ImagesProvider
    ) {
    this.initializeItems();
  }

  search(event) {
    this.page_view = true;
    // console.log("serach =---------" + this.searchTerm);

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SearchPage');
  }

  initializeItems() {
    this.tempTags = [
      { "name": "#g1partners" }
    ]
    this.jsonData = [
      { "id": 1, "label": "saw", "name": "피부트러블" },
      { "id": 2, "label": "saw1", "name": "피부트러블관리" },
      { "id": 3, "label": "saw2", "name": "여드름" },
      { "id": 4, "label": "saw2", "name": "여름철" },
      { "id": 5, "label": "saw2", "name": "여름철피부" },
      { "id": 6, "label": "saw2", "name": "여름철피부관리" },
      { "id": 7, "label": "saw2", "name": "피부" },
      { "id": 8, "label": "saw2", "name": "피부트러블관리하자" },
    ];

    this.items = this.jsonData;
    this.items2 = this.tempTags;
  }

  ionViewWillEnter() {
    // this.setFilteredItems(event);
    this.loadItems();
    this.communityBeautyLoad(this.datamode);
    this.beautyNoteLoad(this.datamode);
    this.skinQnaLoad(this.datamode);
    this.getHashTags();

  }

  setFilteredItems(event) {
    // if (event.data === '#') {
    //   this.toggleTag = true;
    // } else {
    //   this.toggleTag = false;
    // }
    if (event) {
      // console.log(event.target.value);
      if (event.target.value.indexOf('#') >= 0) {
        this.tagTerms = this.searchTerm;
        this.tagTerms = this.tagTerms.replace("#","");
        this.toggleTag = true;
        this.page = "1";
      } else {
        this.toggleTag = false;
        this.page = "0";

      }

      if (event.target.value.length === 0 || event.target.value.length < 2) {
        // console.log("자릿수 두자리 미만");
        this.page_view = false;
        this.search_view = false;
        this.search_tip = true;
      } else if (event.target.value.length >= 2) {  //검색어 입려부터 연관 검색어가 보이도록 한다.
        this.search_view = true;
        this.search_tip = false;

      }
    }
    // if(event.target.value === '#'){
    //   console.log("샵검색 시작");
    // }
    // this.searchTerm = this.searchTerm.replace("#","");
    this.jsonData = this.filterItems(this.searchTerm);
    this.tempTags = this.tagfilterItems(this.searchTerm);

    // console.log("enterCheck : " + event);
  }

  filterItems(searchTerm) {
    // this.initializeItems();
    return this.items.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  }

  tagfilterItems(searchTerm) {
    // this.initializeItems();
    return this.items2.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      // return item.tags.toLowerCase().includes(searchTerm.toLowerCase());
    });

  }

  navigateToDetails(data) {
    // console.log("data============name" + data.name);
    // console.log("data============id" + data.id);
    this.page_view = true;
    this.searchTerm = data.name;
  }

  selectedTab(tab) {
    // this.slides.slideTo(tab);
    // console.log('  this.slides.slideTo(tab)===================' + tab);
    this.page = tab.toString();
  }

  onSearch(event) {
    // console.log("onSearch==========" + event.target.value)
  }

  onCancel(event) {
    this.viewCtrl.dismiss();
  }

  onFocus(event) {
    // console.log("onFocus==============" + event);
    this.focus = true
    this.page_view = false;
  }

  onChange(event) {
    // console.log("onChange==============" + event.target.value);

  }

  // 인기순/최신순 정렬 popover
  public select_popover(event) {
    if (this.platform.is('ios')) {
      let popover = this.popoverCtrl.create(AlignPopoverPage, {},
        {
          cssClass: "ios_align_popover"
        });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(popoverData => {
        // console.log(popoverData);
        this.select_popover_option = popoverData;
        if (this.select_popover_option === "최신순") {
          setTimeout(() => {
            // console.log('최신순');
            this.sortData("date");
            this.communityBeautyLoad("date");
            this.beautyNoteLoad("date");
            this.skinQnaLoad("date");
          }, 100)
        }
        else if (this.select_popover_option === "인기순") {
          // console.log('select_popover_option==========' + this.select_popover_option);
          this.sortData("views");
          this.communityBeautyLoad("views");
          this.beautyNoteLoad("views");
          this.skinQnaLoad("views");
        } else {
          this.select_popover_option = "최신순";
          this.sortData("date");
          this.communityBeautyLoad("date");
          this.beautyNoteLoad("date");
          this.skinQnaLoad("date");
        }
      });
    }
    else {
      let popover = this.popoverCtrl.create(AlignPopoverPage, {},
        {
          cssClass: "android_align_popover"
        });
      popover.present({
        ev: event
      });
      popover.onDidDismiss(popoverData => {
        // console.log(popoverData);
        this.select_popover_option = popoverData;
        if (this.select_popover_option === "최신순") {
          setTimeout(() => {
            this.sortData("date");
            //console.log('최신순');
          }, 100)
        }
        else if (this.select_popover_option === "인기순") {
          this.sortData("views");
          // console.log('select_popover_option==========' + this.select_popover_option);
        } else {
          this.select_popover_option = "최신순";
          this.sortData("date");
        }
      });
    }
  }

  public communityBeautyLoad(mode) {
    this.images.communityBeautyLoad().subscribe(data => {

      if(mode === "date"){
        // this.beautyNoteData = data;
        this.communityBeautyLoadData = data.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        });
      }

      if(mode === "views"){
        this.communityBeautyLoadData = data.sort((a, b) => {
          if (a.views > b.views) {
            return -1;
          }
          if (a.views < b.views) {
            return 1;
          }
          return 0;
        });
      }

      // this.communityBeautyLoadData = data;
      if (data !== '') {
        for (var i = 0; i < data.length; i++) {
          this.jsonData.push({
            "id": data[i]._id,
            "name": data[i].title,
            "views": data[i].views,
            "like": data[i].like,
            "body": data[i].body,
            "posturl": data[i].posturl,
            "createdAt": data[i].createdAt,
            "type": 'beauty',
          })
        }
        // console.log("this.communityBeautyLoadData : " + JSON.stringify(this.jsonData));
        this.items = this.jsonData;
      }
    });
  }

  public beautyNoteLoad(mode) {
    this.images.beautyNoteLoad().subscribe(data => {
      if(mode === "date"){
        // this.beautyNoteData = data;
        this.beautyNoteData = data.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        });
      }

      if(mode === "views"){
        this.beautyNoteData = data.sort((a, b) => {
          if (a.views > b.views) {
            return -1;
          }
          if (a.views < b.views) {
            return 1;
          }
          return 0;
        });
      }
      if (data !== '') {
        for (var i = 0; i < data.length; i++) {


          this.jsonData.push({
            "id": data[i]._id,
            "select": data[i].select,
            "name": data[i].title,
            "views": data[i].views,
            "like": data[i].like,
            "comments": data[i].comments,
            "tags": data[i].tags,
            "createdAt": data[i].createdAt,
            "type": 'note',
          })

        }
        // console.log("this.beautyNoteData : " + JSON.stringify(this.jsonData));
        this.items = this.jsonData;
      }

    });
  }

  public skinQnaLoad(mode) {
    this.images.skinQnaLoad().subscribe(data => {
      if(mode === "date"){
        // this.beautyNoteData = data;
        this.skinQnaData = data.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        });
      }

      if(mode === "views"){
        this.skinQnaData = data.sort((a, b) => {
          if (a.views > b.views) {
            return -1;
          }
          if (a.views < b.views) {
            return 1;
          }
          return 0;
        });
      }

      // this.skinQnaData = data;
      if (data !== '') {
        for (var i = 0; i < data.length; i++) {
          this.jsonData.push({
            "id": data[i]._id,
            "select": data[i].select,
            "name": data[i].title,
            "views": data[i].views,
            "like": data[i].like,
            "comments": data[i].comments,
            "tags": data[i].tags,
            "createdAt": data[i].createdAt,
            "type": 'qna',
          })

        }

        // console.log("this.skinQnaLoad : " + JSON.stringify(this.tags));
        // console.log("this.skinQnaLoadㅁ;ㅣ어ㅏㄴㄹ;미어ㅏㄴㄹ;ㅣ마ㅓㄴㅇㄹ;ㅣㅏㅁ넝;리ㅏ먼ㅇㄹ;ㅣㅏㅓ : " + JSON.stringify(this.items));
        this.items = this.jsonData;
        // console.log("데이터 : " + JSON.stringify(this.jsonData));

      }
    });
  }

  openBrowser_ioslike(url, title, id, user, mode) {
    // https://ionicframework.com/docs/native/themeable-browser/

    this.images.communityBeautyViewsUpdate(id).subscribe(data => {
      this.communityBeautyLoadData = data;
    });


    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {

          wwwImage: 'assets/img/like/like.png',
          // wwwImagePressed: 'assets/img/like/dislike.png',
          align: 'right',
          event: 'sharePressed'
        }
      ],
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    browser.insertCss({
      file: 'assets/img/close.png',
      code: '.navbar-fixed-top {display: block !important;}'
    });
    browser.reload();
    browser.on('closePressed').subscribe(data => {
      browser.close();
    })

    browser.on('sharePressed').subscribe(data => {
      browser.executeScript({
        code: ""
      });
      // console.log("idididididididid : " + id);
      // console.log("modemodemodemodemodemodemodemodmoe : " + mode);
      // console.log("useruseruseruseruseruseruseruser" + user);
      // console.log(data);
      // console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
      if (mode === 'tip') {
        // console.log("tiptiptiptiptiptiptiptiptiptiptip");
        //this.toast();
        // this.images.like(id, user).subscribe(data => {
        //   console.log("-----------------------------------------" + data);
        //
        // });
        // console.log("tip2tip2tip2tip2tip2tip2tiptiptiptiptip");

      } else if (mode === 'exhi') {
        // console.log("exhiexhiexhiexhiexhiexhiexhiexhi");

      } else {
        // console.log("nothingnothingnothingnothingnothingnothing");
      }
    })


  }

  openBrowser_ios(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {
          wwwImage: 'assets/img/like/like.png',
          imagePressed: 'assets/img/like/dislike.png',
          align: 'right',
          event: 'sharePressed'
        }
      ],
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    browser.insertCss({
      file: 'assets/img/close.png',
      code: '.navbar-fixed-top {display: block !important;}'
    });
    browser.reload();
    browser.on('closePressed').subscribe(data => {
      browser.close();
    })

    browser.on('sharePressed').subscribe(data => {
      // console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    })


  }


  openBrowser_androidlike(url, title, id, user, mode) {
    // https://ionicframework.com/docs/native/themeable-browser/

    this.images.communityBeautyViewsUpdate(id).subscribe(data => {
      this.communityBeautyLoadData = data;
    });

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {

          wwwImage: 'assets/img/like/like.png',
          // wwwImagePressed: 'assets/img/like/dislike.png',
          align: 'right',
          event: 'sharePressed'
        }
      ],
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    browser.insertCss({
      file: 'assets/img/close.png',
      code: '.navbar-fixed-top {display: block !important;}'
    });
    browser.reload();
    browser.on('closePressed').subscribe(data => {
      browser.close();
    })

    browser.on('sharePressed').subscribe(data => {
      browser.executeScript({
        code: ""
      });
      // console.log("idididididididid : " + id);
      // console.log("modemodemodemodemodemodemodemodmoe : " + mode);
      // console.log("useruseruseruseruseruseruseruser" + user);
      // console.log(data);
      // console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
      if (mode === 'tip') {
        // console.log("tiptiptiptiptiptiptiptiptiptiptip");
        //this.toast();
        // this.images.like(id, user).subscribe(data => {
        //   console.log("-----------------------------------------" + data);
        //
        // });
        // console.log("tip2tip2tip2tip2tip2tip2tiptiptiptiptip");

      } else if (mode === 'exhi') {
        // console.log("exhiexhiexhiexhiexhiexhiexhiexhi");

      } else {
        // console.log("nothingnothingnothingnothingnothingnothing");
      }
    })


  }


  openBrowser_android(url, title) {
    // https://ionicframework.com/docs/native/themeable-browser/

    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 55,
        color: '#6562b9'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: false,
        staticText: title
      },
      customButtons: [
        {
          wwwImage: 'assets/img/like/like.png',
          imagePressed: 'assets/img/like/dislike.png',
          align: 'right',
          event: 'sharePressed'
        }
      ],
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    browser.insertCss({
      file: 'assets/img/close.png',
      code: '.navbar-fixed-top {display: block !important;}'
    });
    browser.reload();
    browser.on('closePressed').subscribe(data => {
      browser.close();
    })

    browser.on('sharePressed').subscribe(data => {
      // console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    })

  }


  enterCheck(event) {
    // console.log(event);
  }


  getHashTags() {
    this.auth.getHashTags().subscribe(items => {
      if (items !== '' || !undefined || !null) {
        // console.log(items[0].tags);
        // for(var i = 0; i < items[0].tags.length; i++){
        //   console.log("tag 길이 : " + items[0].tags[i]);
        // }
        this.tags = items[0].tags.split(",");
        // console.log("태그 형태 : " + this.tags)
        // console.log("태그 형태 길이 : " + this.tags[0])
        for (var i = 0; i < this.tags.length; i++) {
          if (this.tags[i] !== '') {
            this.tempTags.push({
              // id: i,
              name: this.tags[i],
            })
          }
        }
        // console.log("태그 결과 : " + JSON.stringify(this.tempTags));
        this.items2 = this.tempTags;
        setTimeout(() => {
          this.tempdata = Array.from(new Set(
            this.items2.map(data => data.name)
          ));
        }, 0); // execute timeout function immediately, fakes async
        // console.log("과연 중복제거는 잘 되었나 : " + JSON.stringify(this.items2));
      }
    });
  }

  removeDuplicates() {
    setTimeout(() => {
      this.items2 = Array.from(new Set(
        this.items2.map(data => data.name)
      ));
    }, 0); // execute timeout function immediately, fakes async
    // console.log("과연 중복제거는 잘 되었나 : " + this.items2)
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
        };
      }
    });
  }

  public community_modify(id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, { id: id, mode: 'note' });
    myModal.present();
  }

  public community_qna_modify(id) {
    let myModal = this.modalCtrl.create(CommunityModifyPage, { id: id, mode: 'qna' });
    myModal.present();
  }



  public sortData(mode) {
    if (mode === 'date') {
      this.jsonData = this.jsonData.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      });
    }

    if (mode === 'views') {
      this.jsonData = this.jsonData.sort((a, b) => {
        if (a.views > b.views) {
          return -1;
        }
        if (a.views < b.views) {
          return 1;
        }
        return 0;
      });
    }
    // console.log("this JSON Data : " + JSON.stringify(this.jsonData));
  }




}
