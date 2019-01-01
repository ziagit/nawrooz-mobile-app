import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { ShopifyProvider } from '../../providers/shopify';

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
})
export class CollectionPage {
  collections: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private shopify:ShopifyProvider) {
 
  }
ionViewDidLoad(){
  this.getCollection();
}
getCollection(){
  this.shopify.shop.collection.fetchAll().then(collections=>{
    this.collections = collections;
  })
}
  buy(title, id) {
    this.navCtrl.push(ProductPage, {
      param: {
        title: title,
        id: id
      }
    })
  } 

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.collections = this.collections.filter((item) => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
  }
  onCancel(ev: any) {
    console.log("canceled.", ev)
  }

  doRefresh(refresher) {
    this.getCollection();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  formatText(){
    this.collections[4].body_html = this.collections[4].body_html.replace(/(<([^>]+)>)/ig,"")
  }
}
