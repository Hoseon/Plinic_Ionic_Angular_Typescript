import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {AgreementPage } from '../agreement/agreement';
import {AddinfoPage} from '../register/addinfo/addinfo';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  createSuccess = false;
  public country: any;
  email: any;
  password: any;
  passwordconfirm: any;

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad registerpage');
  }


  public onChange(value){
    this.country = JSON.parse(value);
    console.log(value)
}

    public anddinfo(){
      this.nav.push(AddinfoPage,{
        email: this.email,
        password: this.password
      });
    }


  public navpop(){
    this.nav.popTo(AgreementPage);
  }

}
