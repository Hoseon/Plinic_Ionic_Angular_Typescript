import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform, Loading, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../../../../providers/auth-service';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  userResults: Observable<any>;
  noticeData: any;
  selectedFilter = null;
  information: any[];
  loading: Loading;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public popoverCtrl: PopoverController,
    public authService: AuthService, 
    public platform: Platform,
    public loadingCtrl: LoadingController,
  ) {
       let localData = http.get('assets/information.json').map(res => res.json().items);
       localData.subscribe(data => {
         this.information = data;
       })
       this.noticeData = this.loadNotice();
       // https://randomuser.me/api?results=50
       this.userResults = this.getLocalFile();
     }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }
  toggleSection(i) {
    this.noticeData[i].open = !this.noticeData[i].open;
  }

  toggleItem(i, j) {
    this.noticeData[i].title[j].open = !this.noticeData[i].title[j].open;
  }

  getLocalFile() {
    return this.http.get('assets/results.json').
      map(res => res.json().results);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('FilterPopoverPage');
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      this.selectedFilter = data.filter;
    })
  }

  loadNotice(){
    this.showLoading();
    this.authService.getAllFaq().subscribe(items =>{
      this.loading.dismiss();
      this.noticeData = items;
      console.log(items);
    }, error => {
      this.loading.dismiss();
      console.log("FAQ 데이터 로딩 에러 : " + error);
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '데이터를 불러오는 중입니다.'
    });
    this.loading.present();
  }


}
