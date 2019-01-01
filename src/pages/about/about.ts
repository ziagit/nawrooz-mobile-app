import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  title: string = 'Introductions';
  description: string = 'Nawrooz.com (Branded as Nawrooz Shopping) is the first and foremost Electronic Shopping Solution in Afghanistan. The Solution is a Revolution in Retail purchases with aim to Modernize and Digitalize the ongoing Shopping Practices and Methods in the Country. The Electronic Mechanism of Shopping is an Easy to Use, Fast, Accurate, Effective, Trustworthy and Reliable platform where Purchasers will order Product of need through Nawrooz’s available iOS/Andriod Mobile Application, Web Page, Call Center and Social Media Pages. We are directing to be a One-Stop Solution offering Wide-range and Comprehensive categories of Products and Items to Sale starting from Wearing, Electronics, Food, Beverages, Fashion, Automotive, Home Appliances, Health and Everything.'

  @ViewChild('map') MapElement;
  map:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap(){
    let latLong = new google.maps.LatLng(34.536116, 69.183869);
    let mapOptions={
      center: latLong,
      zoom:15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.MapElement.nativeElement, mapOptions)
  }

  openFacebook() {
    window.open('https://www.facebook.com/nawrooz.shopping/', '_blank');
  }

}
