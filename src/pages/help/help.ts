import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ShopifyProvider } from '../../providers/shopify';


@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  lelps=[
    {
      title:'HOW DO I PLACE AN ORDER?',
      desc:'Before you place an order you need to have an account then you would be able to purchase. Once you logged in added the desired items to your cart then click on checkout to proceed for shipping and payment methods, in this step you should provide shipping address and your contact information, At the end of procedure, you will get a greeding message.'
    },
    {
      title:'HOW DO I CHANGE OR CANCEL MY ORDER?',
      desc:'Once you logged in to your account all the orders you have placed will be listed, you can delete them one by one or all in once. Caution You can change or cancel your order before shipment if you placed on order and received an email or phone call confirmation from Nawrooz your changes or canceling the order would be useless'
    },
    {
      title:'I PLACED AN ORDER BUT DIDN’T RECEIVE',
      desc:'When you placing an order make sure to receive an email or phone call confirmation (within 2 to 5 hour) from Nawrooz, otherwise your order is not placed. If your order is confirmed by Nawrooz still you do not receive in the specified timing you should call to 0795 955 955.'
    },
    {
      title:' WHAT IS YOUR COVERAGE AREA?',
      desc:'For now, we are just operating in Kabul City.'
    },
    {
      title:'WHAT IS YOUR PAYMENT METHOD?',
      desc:'We are offering Cash-on-Delivery to our customers for every item purchased through our platform.'
    },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, private shopify: ShopifyProvider,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }

}
