import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, PopoverController, Slides } from 'ionic-angular';
import { MyPage } from '../my/my';
import { ImagesProvider } from '../../../providers/images/images';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { AlignPopoverPage } from './align-popover/align-popover';

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
  items: any;
  focus: boolean = false;
  page_view: boolean = false;
  communityBeautyLoadData: any;
  beautyNoteData: any;
  skinQnaData: any;
  select_popover_option: any = "최신순";
  @ViewChild(Slides) slides: Slides;


  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, public popoverCtrl: PopoverController,
    private themeableBrowser: ThemeableBrowser, private images: ImagesProvider) {

    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeItems() {
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

    this.items = this.jsonData
    console.log("this.beautyNoteData : " + this.beautyNoteData);
  }

  ionViewWillEnter() {
    this.setFilteredItems(event);
    this.communityBeautyLoad();
    this.beautyNoteLoad();
    this.skinQnaLoad();
  }

  setFilteredItems(event) {
    this.jsonData = this.filterItems(this.searchTerm);
    console.log("enterCheck : " + event);
  }

  filterItems(searchTerm) {
    // this.initializeItems();
    return this.items.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  }

  navigateToDetails(data) {
    console.log("data============name" + data.name);
    console.log("data============id" + data.id);
    this.page_view = true;
    this.searchTerm = data.name;
  }

  selectedTab(tab) {
  //  this.slides.slideTo(tab);

    console.log('  this.slides.slideTo(tab)===================' + tab);
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
        console.log(popoverData);
        this.select_popover_option = popoverData;
        if (this.select_popover_option === "최신순") {
          setTimeout(() => {
            //console.log('최신순');
          }, 100)
        }
        else if (this.select_popover_option === "인기순") {
          console.log('select_popover_option==========' + this.select_popover_option);
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
        console.log(popoverData);
        this.select_popover_option = popoverData;
        if (this.select_popover_option === "최신순") {
          setTimeout(() => {
            //console.log('최신순');
          }, 100)
        }
        else if (this.select_popover_option === "인기순") {
          console.log('select_popover_option==========' + this.select_popover_option);
        }
      });
    }
  }

  public communityBeautyLoad() {
    this.images.communityBeautyLoad().subscribe(data => {
      this.communityBeautyLoadData = data;
      if (data !== '') {
        for (var i = 0; i < data.length; i++) {
          this.jsonData.push({
            "id": data[i]._id,
            "name": data[i].title,
            "views": data[i].views,
            "like": data[i].like,
            "body": data[i].body,
            "posturl": data[i].posturl,
            "type": 'beauty',
          })
        }
        console.log("this.communityBeautyLoadData : " + JSON.stringify(this.jsonData));
        this.items = this.jsonData;
      }
    });
  }

  public beautyNoteLoad() {
    this.images.beautyNoteLoad().subscribe(data => {
      this.beautyNoteData = data;
      if (data !== '') {
        for (var i = 0; i < data.length; i++) {
          this.jsonData.push({
            "id": data[i]._id,
            "select": data[i].select,
            "name": data[i].title,
            "views": data[i].views,
            "like": data[i].like,
            "comments" : data[i].comments,
            "type": 'note',
          })

        }
        console.log("this.beautyNoteData : " + JSON.stringify(this.jsonData));
        this.items = this.jsonData;
      }

    });
  }

  public skinQnaLoad() {
    this.images.skinQnaLoad().subscribe(data => {
      this.skinQnaData = data;
      if (data !== '') {
        for (var i = 0; i < data.length; i++) {
          this.jsonData.push({
            "id": data[i]._id,
            "select": data[i].select,
            "name": data[i].title,
            "views": data[i].views,
            "like": data[i].like,
            "comments" : data[i].comments,
            "type": 'qna',
          })

        }
        console.log("this.skinQnaLoad : " + JSON.stringify(this.jsonData));
        this.items = this.jsonData;
      }
    });
  }

  openBrowser_ioslike(url, title, id, user, mode) {
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
      console.log("idididididididid : " + id);
      console.log("modemodemodemodemodemodemodemodmoe : " + mode);
      console.log("useruseruseruseruseruseruseruser" + user);
      console.log(data);
      console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
      if (mode === 'tip') {
        console.log("tiptiptiptiptiptiptiptiptiptiptip");
        //this.toast();
        // this.images.like(id, user).subscribe(data => {
        //   console.log("-----------------------------------------" + data);
        //
        // });
        console.log("tip2tip2tip2tip2tip2tip2tiptiptiptiptip");

      } else if (mode === 'exhi') {
        console.log("exhiexhiexhiexhiexhiexhiexhiexhi");

      } else {
        console.log("nothingnothingnothingnothingnothingnothing");
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
      console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    })


  }


  openBrowser_androidlike(url, title, id, user, mode) {
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
      console.log("idididididididid : " + id);
      console.log("modemodemodemodemodemodemodemodmoe : " + mode);
      console.log("useruseruseruseruseruseruseruser" + user);
      console.log(data);
      console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
      if (mode === 'tip') {
        console.log("tiptiptiptiptiptiptiptiptiptiptip");
        //this.toast();
        // this.images.like(id, user).subscribe(data => {
        //   console.log("-----------------------------------------" + data);
        //
        // });
        console.log("tip2tip2tip2tip2tip2tip2tiptiptiptiptip");

      } else if (mode === 'exhi') {
        console.log("exhiexhiexhiexhiexhiexhiexhiexhi");

      } else {
        console.log("nothingnothingnothingnothingnothingnothing");
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
      console.log("customButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressedcustomButtonPressed")
    })

  }


  enterCheck(event){
    console.log(event);
  }



}
