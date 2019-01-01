import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProductPage } from '../product/product';
import { ProductDetailPage } from '../product-detail/product-detail';

import { SplashScreen } from '@ionic-native/splash-screen';
import { AllProductsPage } from '../all-products/all-products';
import { ShopifyProvider } from '../../providers/shopify';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  offers: any = [];
  imageSlide;
  collections: any = [];
  deals: any = [];
  news: any = [];
  product: any = [];
  pageNo: number = 1;
  dealId: string;
  newId: string;
  offerId: string;
  productNo: number = 50;
  collExist = false;
  constructor(private shopify: ShopifyProvider, public navCtrl: NavController, private provider: DataProvider, public splashScreen: SplashScreen) {
    this.imageSlide = this.provider.getImages();
  }
  ionViewDidLoad() {
    this.getCollections();
  }
  getCollections() {
    this.shopify.shop.collection.fetchAll().then((collections) => {
      for (let i in collections) {
        if (collections[i].handle == 'special-offers' || collections[i].handle == 'top-deals-products' || collections[i].handle == 'new-products') {
          console.log("ok")
        } else {
          this.collections[i] = collections[i];
        }
      }
      for (let i in collections) {
        if (collections[i].handle == 'special-offers') {
          this.getSpecialOffer(collections[i].id);
          this.offerId = collections[i].id;
        } else if (collections[i].handle == 'top-deals-products') {
          this.getTopDeals(collections[i].id);
          this.dealId = collections[i].id;
        } else if (collections[i].handle == 'new-products') {
          this.getNewProducts(collections[i].id);
          this.newId = collections[i].id;
        }
      }
    })
  }
  getSpecialOffer(id) {
    this.shopify.shop.collection.fetchWithProducts(id).then((collec) => {
      this.offers = collec.products;
    })
  }

  getTopDeals(id) {
    this.shopify.shop.collection.fetchWithProducts(id).then((collec) => {
      this.deals = collec.products;
    })
  }
  getNewProducts(id) {
    this.shopify.shop.collection.fetchWithProducts(id).then((collec) => {
      this.news = collec.products;
    })
  }

  doInfinite(infiniteScroll) {
    /*     this.pageNo += 10;
        this.provider.getNewProducts(this.pageNo).subscribe(res => {
          this.news = this.news.concat(res['products']);
          infiniteScroll.complete();
        }) */
  }

  viewNew(title, id) {
    this.navCtrl.push(AllProductsPage, {
      param: {
        title: title,
        id: this.newId
      }
    })
  }

  viewTopDeals(title, id) {
    this.navCtrl.push(AllProductsPage, {
      param: {
        title: title,
        id: this.dealId
      }
    })
  }

  pushProductDetailPage(data) {
    this.navCtrl.push(ProductDetailPage, { param: data })
  }
  pushProductPage(id, title) {
    this.navCtrl.push(ProductPage, {
      param:
      {
        id: id,
        title: title
      }
    });
  }

  formatText(text) {
    for (let i = 0; i < text.length; i++) {
      text[i].body_html = text[i].body_html.replace(/(<([^>]+)>)/ig, "")
    }
  }
  extractArray(data) {
    return data.id;
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.offers = this.offers.filter((item) => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
      this.deals = this.deals.filter((item) => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
      this.news = this.news.filter((item) => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
  }
  onCancel(ev: any) {
    console.log("canceled.", ev)
  }


}
