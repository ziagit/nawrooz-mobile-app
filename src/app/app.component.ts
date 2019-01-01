import { Component } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { Platform, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(private plt: Platform, public event: Events, translate: TranslateService) {
    translate.setDefaultLang('en');
    this.event.subscribe('language:change', (data) => {
      if (data == 'da' || data == 'pa') {
        this.plt.setDir('rtl', true)
        data == 'da' ? translate.use('da') : translate.use('pa')
      }else {
        this.plt.setDir('ltr', true)
        translate.use('en')
      }
    })


  }

}

