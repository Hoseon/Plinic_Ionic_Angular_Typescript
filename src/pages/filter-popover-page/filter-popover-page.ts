import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filter-popover-page',
  templateUrl: 'filter-popover-page.html',
})
export class FilterPopoverPage {

  constructor(public viewCtrl: ViewController) {
  }

  close(filter) {
    this.viewCtrl.dismiss({filter: filter});
  }

}
