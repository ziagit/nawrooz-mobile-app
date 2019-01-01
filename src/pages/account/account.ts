import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { WishListPage } from '../wish-list/wish-list';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  cart;
  wishlist;
  constructor( public navCtrl: NavController) {
  }
  pushAccountSettingPage(){
    console.log('Account setting')
  }
  pushCartPage(){
    this.navCtrl.push(CartPage);
  }
  pushWishlistPage(){
    this.navCtrl.push(WishListPage);
  }
  pushBoughtPage(){
    console.log('bought page')
  }

}
