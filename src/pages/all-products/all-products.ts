import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ShopifyProvider } from '../../providers/shopify';


@Component({
  selector: 'page-all-products',
  templateUrl: 'all-products.html',
})
export class AllProductsPage {

  products: any = [];
  collection;
  pageNo: number = 1;
  collectionId: string = '';
  constructor(private shopify: ShopifyProvider, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {
    this.collection = this.navParams.get('param');
  }

  ionViewDidLoad() {
    this.shopify.shop.collection.fetchWithProducts(this.collection.id).then((collec) => {
      this.products = collec.products
    })
  }

  openPopup(myEvent) {
    let popover = this.popoverCtrl.create(MenuPage);
    popover.present({
      ev: myEvent
    });
  }

  pushProductDetailPage(product) {
    this.navCtrl.push(ProductDetailPage, { param: product })
  }

  formatText(text) {
    for (let i = 0; i < text.length; i++) {
      text[i].body_html = text[i].body_html.replace(/(<([^>]+)>)/ig, "")
    }
  }
  doInfinite(infiniteScroll){
    console.log("loading");
  }

}
