import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../../../../providers/auth-service';

/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {

  userResults: Observable<any>;
  noticeData: any;
  selectedFilter = null;
  information: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public popoverCtrl: PopoverController,
     public authService: AuthService, public platform: Platform) {

    let localData = http.get('assets/information.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    })
    this.noticeData = this.loadNotice();
    // https://randomuser.me/api?results=50
    this.userResults = this.getLocalFile();
  }

  toggleSection(i) {
    this.noticeData[i].open = !this.noticeData[i].open;
  }

  toggleItem(i, j) {
    this.noticeData[i].title[j].open = !this.noticeData[i].title[j].open;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');
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
    this.authService.getAllNotice().subscribe(items =>{
      this.noticeData = items;
      console.log(items);
    })
  }


}
