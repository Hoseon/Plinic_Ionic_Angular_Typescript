import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
//import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { ImagesProvider } from '../../../providers/images/images';


/**
 * Generated class for the CommunityModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-modify',
  templateUrl: 'community-modify.html',
})
export class CommunityModifyPage {

  id : any;
  mode : any;
  beautyNoteOneLoadData : any;
  skinQnaOneLoadData : any;
  tags = [];


  constructor(public navCtrl: NavController, private images : ImagesProvider, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController) {


    this.platform.ready().then((readySource) => {

    })
  }

  public dissmiss() {
    this.viewCtrl.dismiss();
  }


  ionViewCanEnter() {
      this.id = this.navParams.get('id');
      this.mode = this.navParams.get('mode');
      console.log("mode : " + this.mode);
      if(this.navParams.get('mode') === 'qna'){
        this.skinQnaOneLoad(this.id);
      } else{
        this.beautyNoteOneLoad(this.id);
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityModifyPage');
  }

  public beautyNoteOneLoad(id) {
    this.images.beautyNoteOneLoad(id).subscribe(data => {
      this.beautyNoteOneLoadData = data;
      this.tags = data.tags.split(",");
      console.log("태그 길이 : " + this.tags.length);
    });
  }

  public skinQnaOneLoad(id) {
    this.images.skinQnaOneLoad(id).subscribe(data => {
      this.skinQnaOneLoadData = data;
      this.tags = data.tags.split(",");
      console.log("태그 길이 : " + this.tags.length);
    });
  }

}
