import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, Events, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { HelpPage } from '../help/help';
import { LanguagePage } from '../language/language';
import { CurrencyPage } from '../currency/currency';
import { CallNumber } from '@ionic-native/call-number';
import { SmsPage } from '../sms/sms';
/* import { CallNumber } from '@ionic-native/call-number';
import { TranslateService } from '../../../node_modules/@ngx-translate/core'; */


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  languages = [
    { id: 1, name: "en" },
    { id: 2, name: "da" },
    { id: 3, name: "pa" }
  ]
  lang: any;
  constructor(public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams, public popOverCtrl: PopoverController, public event: Events, private call: CallNumber) {
    /*     this.lang='en';
        this.translate.setDefaultLang('en');
        this.translate.use('en'); */
  }

  switchLanguage(language) {
    this.event.publish('language:change', language);
  }


  popOverCallPage() {
    this.call.callNumber('0747209865', true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  popOverSmsPage(){
    let modal=this.modalCtrl.create(SmsPage);
    modal.present();
  }
  popOverEmailPage(){
    window.open('https://www.gmail.com');
  }
  popOverLanguagePage(myEvent) {
    const popover = this.popOverCtrl.create(LanguagePage);
    popover.present({
      ev: myEvent
    });
  }
  popOverCurrencyPage(myEvent) {
    const popover = this.popOverCtrl.create(CurrencyPage);
    popover.present({
      ev: myEvent
    });
  }
  pushAccountPage() {
    this.navCtrl.push(LoginPage);
  }
  pushAboutPage() {
    this.navCtrl.push(AboutPage);
  }
  pushAboutHelpPage() {
    this.navCtrl.push(HelpPage);
  }
  goToFacebook() {
    window.open('https://www.facebook.com/nawrooz.shopping/', '_system');
  }
  goToTwitter() {
    window.open('https://twitter.com/NawroozShopping', '_system');
  }
  goToInstagram() {
    window.open('https://www.instagram.com/nawrooz.shopping/', '_system');
  }
  goToPinetrest() {
    window.open('https://www.pinterest.com/nawroozshopping', '_system');
  }
}
