import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';

@Component({
  selector: 'page-wish-list',
  templateUrl: 'wish-list.html',
})
export class WishListPage {
  cartItem: boolean = true;
  items;
  totalPrice = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.items="This functionality is in development."
  }

  deleteFromWishList(id) {
    console.log("deleted from wishlist")
  }

  pushCheckOut(item) {
    console.log('go to checkout page')
  }

  pushItemDetail(item) {
    console.log("go to item details")
  }

}
