import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Client from 'shopify-buy';
import ApolloClient from 'apollo-boost';


@Injectable()
export class ShopifyProvider {

  client = new ApolloClient({
    uri: 'https://nawrooz.myshopify.com/api/graphql',
    headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': '2e19318981d0d6e619aca9fc0aea41a1'
    }
  });

  shop = Client.buildClient({
    domain: 'nawrooz.myshopify.com',
    storefrontAccessToken: '2e19318981d0d6e619aca9fc0aea41a1'
  });
  constructor(public http: HttpClient) {
  }
 

}
