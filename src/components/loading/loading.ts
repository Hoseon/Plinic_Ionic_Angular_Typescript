import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the LoadingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loading',
  templateUrl: 'loading.html'
})
export class LoadingComponent {

  text: string;

  constructor(
    public loadingCtrl: LoadingController,
  ) {
    console.log('Hello LoadingComponent Component');
    this.text = 'Hello World';
  }


  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/img/loading/loading.gif" />`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

}
