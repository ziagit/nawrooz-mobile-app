import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Events } from 'ionic-angular';

import { ShopifyProvider } from '../../providers/shopify'

import { ModalController } from 'ionic-angular';
import { ProductVariantPage } from '../product-variant/product-variant';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  image;
  addToCartButton: string = "Add to Cart"
  cartItem: boolean = false;
  product;
  public tap: number = 1;
  package;
  hasVariant: boolean = true;
  productTitle;
  variantId: string;

  constructor(private storage: Storage, public http: HttpClient, public modalCtrl: ModalController, public shopify: ShopifyProvider, public events: Events, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('param');
  }
  ionViewDidLoad() {
    /* this.formatText(); */
    this.image = this.product.images[0];
    this.variantId = this.product.variants[0].id;
    if (this.product.variants.length == 1) {
      this.package = this.product.variants[0].title;
      this.hasVariant = false;
      this.productTitle = this.product.title;
    } else {
      this.package = this.product.variants[0].title;
      console.log('Var : ', this.product.variants[0].id)
    }
  }

  openVariant() {
    const modal = this.modalCtrl.create(ProductVariantPage, { product: this.product });
    modal.onDidDismiss(data => {
      for (let i in this.product.variants) {
        if (this.product.variants[i].id == data.value.selectedItem) {
          this.package = this.product.variants[i].title;
          this.variantId = data.value.selectedItem;
        }
      }
    })
    modal.present();
  }

  addToCart(qty) {
    this.storage.get('checkoutId').then(checkoutInStorage => {
      if (checkoutInStorage == null) {
        this.shopify.shop.checkout.create().then(newCheckout => {
          console.log("new created: ", newCheckout.id)
          this.storage.set('checkoutId', newCheckout.id);
          const lineItemsToAdd = [
            { variantId: this.variantId, quantity: qty }
          ];
          this.shopify.shop.addLineItems(newCheckout.id, lineItemsToAdd).then((addedItem) => {
            this.cartActionSheet();
            this.events.publish('cart:added', 1);
            console.log("Added to cart: ", addedItem)
          })
        })
      } else {
        this.shopify.shop.checkout.fetch(checkoutInStorage).then((checkout) => {
          if (checkout.completedAt == null) {
            const lineItemsToAdd = [
              { variantId: this.variantId, quantity: qty }
            ];
            this.shopify.shop.checkout.addLineItems(checkoutInStorage, lineItemsToAdd).then((addedItem) => {
              this.cartActionSheet();
              this.events.publish('cart:added', 1);
              console.log("Added to cart: ", addedItem)
            })
          } else {
            console.log("this checkout is completed.")
          }
        })
      }
    })
  }

  addToWishList(qty) {
    this.product.qty = qty;
    this.wishListctionSheet();
    this.events.publish('wishlist:added', 1);
  }

  tabIncrease(e) {
    this.tap++;
  }
  tabDecrease(e) {
    if (this.tap <= 1) {
      this.tap = 1;
    } else {
      this.tap--;
    }
  }

  changeImg(img) {
    this.image = img;
  }
  cartActionSheet() {
    const action = this.actionSheetCtrl.create({
      title: 'Added to card!'
    });
    action.present();
    setTimeout(() => action.dismiss(), 2000);
  }

  wishListctionSheet() {
    const action = this.actionSheetCtrl.create({
      title: 'Added to wish list!'
    });
    action.present();
    setTimeout(() => action.dismiss(), 2000);
  }

  formatText() {
    this.product.description = this.product.description.replace(/(<([^>]+)>)/ig, "")
  }

}
