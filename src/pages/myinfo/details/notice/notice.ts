import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
  selectedFilter = null;
  information: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public popoverCtrl: PopoverController) {
    let localData = http.get('assets/information.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    })
    // https://randomuser.me/api?results=50
    this.userResults = this.getLocalFile();
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
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


}
