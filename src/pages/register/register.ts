import { IonicPage } from 'ionic-angular';
import { Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {AgreementPage } from '../agreement/agreement';
import {AddinfoPage} from '../register/addinfo/addinfo';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  createSuccess = false;
  public country: any;
  signupform: FormGroup;




  userData = { "password": "", "passwordconfirm": "", "email": ""};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad registerpage');
  }



  public email_delete(){
   this.userData.email="";
  }
  public password_delete(){
    this.userData.password="";
  }
  public passwordconfirm_delete(){
  this.userData.passwordconfirm="";
  }




  ngOnInit() {
     let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
     this.signupform = new FormGroup({
       password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
       passwordconfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
       email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
     });
  }

  public onChange(value){
    this.country = JSON.parse(value);
    console.log(value)
}

    public anddinfo(){
      if(this.userData.password===this.userData.passwordconfirm){
      this.nav.push(AddinfoPage,{
        email: this.userData.email,
        password: this.userData.password
      });
    }
    else{
       console.log("비밀번호 불일치");
       this.showPopup("오류","패스워드를 확인해주세요.");
    }
}


  public navpop(){
    this.nav.popTo(AgreementPage);
  }


  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      message: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }

}
