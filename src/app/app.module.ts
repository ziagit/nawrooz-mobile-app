import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataProvider } from '../providers/data/data';

import { TabsPage } from '../pages/tabs/tabs';
import { WishListPage } from '../pages/wish-list/wish-list';
import { AccountPage } from '../pages/account/account';
import { CollectionPage } from '../pages/collection/collection';
import { CartPage } from '../pages/cart/cart';
import { ProductPage } from '../pages/product/product';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { CallPage } from '../pages/call/call';
import { AboutPage } from '../pages/about/about';
import { HelpPage } from '../pages/help/help';
import { LanguagePage } from '../pages/language/language';
import { CurrencyPage } from '../pages/currency/currency';
import { MenuPage } from '../pages/menu/menu';

import { ProductVariantPage } from '../pages/product-variant/product-variant';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AllProductsPage } from '../pages/all-products/all-products';
import { ShopifyProvider } from '../providers/shopify';
import { ImgFallbackModule } from 'ngx-img-fallback';

import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule} from "apollo-angular-link-http";
/* import { InMemoryCache } from "apollo-cache-inmemory"; */

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { IonicStorageModule } from '@ionic/storage';
import { SmsPage } from '../pages/sms/sms';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    CollectionPage,
    WishListPage,
    AccountPage,
    CartPage,
    ProductPage,
    AllProductsPage,
    ProductDetailPage,
    LoginPage,
    RegisterPage,
    SettingPage,
    CallPage,
    AboutPage,
    HelpPage,
    LanguagePage,
    CurrencyPage,
    MenuPage,
    ProductVariantPage,
    SmsPage
  ],
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ImgFallbackModule,
    HttpClientModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    CollectionPage,
    WishListPage,
    AccountPage,
    CartPage,
    ProductPage,
    ProductDetailPage,
    LoginPage,
    RegisterPage,
    SettingPage,
    CallPage,
    AboutPage,
    HelpPage,
    LanguagePage,
    CurrencyPage,
    MenuPage,
    ProductVariantPage,
    AllProductsPage,
    SmsPage
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    DataProvider,
    Apollo,
    ShopifyProvider,
    CallNumber,
    SMS
  ]
})
export class AppModule { }
