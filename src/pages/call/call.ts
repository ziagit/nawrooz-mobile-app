import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {
phoneNumber:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallPage');
  }

/*   async callUs():Promise<any>{
    try{
      await this.call.callNumber("0747209865", true)
    }
    catch(e){
      console.error(e)
    }
  } */
}
