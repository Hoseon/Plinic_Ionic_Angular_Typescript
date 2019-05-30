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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public popoverCtrl: PopoverController) {
    // https://randomuser.me/api?results=50
    this.userResults = this.getLocalFile();
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
