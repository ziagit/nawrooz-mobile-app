import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProductDetailPage } from '../product-detail/product-detail';
import { MenuPage } from '../menu/menu';
import { ShopifyProvider } from '../../providers/shopify';


@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  products: any = [];
  collection;
  constructor(private shopify: ShopifyProvider, private provider: DataProvider, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {
    this.collection = this.navParams.get('param')
  }

  ionViewDidLoad() {
    this.shopify.shop.collection.fetchWithProducts(this.collection.id).then((collec)=>{
      console.log("collection ", this.collection)
      this.products = collec.products;
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

/*   presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="loader" [ngStyle]="myStyle"></div>`,
      duration: 3000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  } */
}
