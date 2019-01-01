import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CollectionPage } from '../collection/collection';
import { WishListPage } from '../wish-list/wish-list';
import { CartPage } from '../cart/cart';
import { SettingPage } from '../setting/setting';
import { MenuPage } from '../menu/menu';
import { ShopifyProvider } from '../../providers/shopify';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  home: any;
  collection: any;
  cart: any;
  wishList: any;
  setting: any;
  cartItem = [];
  cartLen;
  wishListLen;
  menu;
  checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC83MjQ2MWEyOTFhZGNlNGUyODg2MDU3NzljZTg5MWQ0MT9rZXk9ZjM2MThjNjM1YTkyOGMxN2FjZGMyZDQ5MjYzNGZhNGU=';
  constructor(private storage: Storage, private shopify: ShopifyProvider, public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.home = HomePage;
    this.collection = CollectionPage;
    this.cart = CartPage;
    this.wishList = WishListPage;
    this.setting = SettingPage;
    this.menu = MenuPage;
    this.getCart();
  }

  ionViewDidLoad() {

  }
  getCart(){
    this.storage.get('checkoutId').then((checkoutId)=>{
      this.shopify.shop.checkout.fetch(checkoutId).then((checkout) => {
        this.cartLen = checkout.lineItems.length;
      })
    })
    this.events.subscribe('cart:added', (data) => {
      this.cartLen = this.cartLen + data;
    });

    this.events.subscribe('wishlist:added', (data) => {
      this.wishListLen = this.wishListLen + data;
    })
  }

}
