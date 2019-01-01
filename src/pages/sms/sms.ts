import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
@Component({
  selector: 'page-sms',
  templateUrl: 'sms.html',
})
export class SmsPage {
  text: string;
  isSent: boolean = false;
  label: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sms: SMS, public viewCtrl: ViewController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmsPage');
  }
  send() {
    this.isSent = true;
    if (this.text !== '') {
      this.sms.send('0747209865', this.text).then(res=>{
        this.label=res;
      })
      this.text='';
    }
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
