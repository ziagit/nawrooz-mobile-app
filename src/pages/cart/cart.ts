import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ShopifyProvider } from '../../providers/shopify';
import { LoginPage } from '../login/login';
import gql from 'graphql-tag';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItem: boolean = true;
  items;
  totalPrice = 0;
  redirectUrl;
  cart;
  checkout;

  constructor(private iab: InAppBrowser, private storage: Storage, private shopify: ShopifyProvider, public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.getCartItems();
  }
  ionViewDidLoad() { }
  getCartItems() {
    this.storage.get('checkoutId').then((checkoutInStorage) => {
      if (checkoutInStorage != null) {
        this.shopify.shop.checkout.fetch(checkoutInStorage).then((checkout) => {
          this.checkout = checkout;
          this.totalPrice = checkout.totalPrice;
          this.items = checkout.lineItems;
        })
      } else {
        console.log("Sorry checkout not available.")
      }
    })
  }

  deleteFromCart(id) {
    this.storage.get('checkoutId').then((checkoutId) => {
      this.shopify.shop.checkout.removeLineItems(checkoutId, [id]).then(
        (res) => {
          console.log("Successfully deleted: ", id)
          setTimeout(() => {
            this.getCartItems();
          }, 0)
        })
    })
  }
 
  orderNow() {
    const options: InAppBrowserOptions={
      'hideurlbar':'yes'
    }
    let target='_selft';
    const browser = this.iab.create(this.checkout.webUrl,target, options);
    browser.on('loadstart').subscribe(event => {
      console.log("Error while openning browser.", event)
    });
  }
  
  pushItemDetail(data) {
    this.navCtrl.push(ProductDetailPage, { param: data })
  }

  doRefresh(refresher) {
    this.getCartItems();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
