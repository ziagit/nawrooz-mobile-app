import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';
/* import { SecureStorage } from '@ionic-native/secure-storage'; */
/* import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'; */
import { FormBuilder, Validators } from '../../../node_modules/@angular/forms';
/* import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage'; */
import gql from 'graphql-tag';

import { ShopifyProvider } from '../../providers/shopify';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userData = null;
  username: string;
  password: string;
  customerToken: string = "0a015e3806b9f94959334ce7179d4f97";
  loginForm;
  checkout;
  constructor(private storage: Storage, private shopify: ShopifyProvider, public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, private iab: InAppBrowser) {
    this.checkout = this.navParams.get('param');
    console.log("checkot: ", this.checkout)
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  login() {
    this.shopify.client.mutate({
      mutation: gql`
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
          customerAccessTokenCreate(input: $input) {
            userErrors {
              field
              message
            }
            customerAccessToken {
              accessToken
              expiresAt
            }
          }
        }
      `, variables: {
        "input": {
          "email": this.loginForm.controls.username.value,
          "password": this.loginForm.controls.password.value
        }
      }
    })
      .then(accessToken => {
        this.storage.set('customerToken', accessToken.data.customerAccessTokenCreate.customerAccessToken.accessToken);
        this.shopify.client.query({
          query: gql`
            query {
              node(id: "Z2lkOi8vc2hvcGlmeS9DaGVja291dC9hODBhZWJiZWY1NTI1ZmFiZmE4MzM5ODQ2NjQ2YjA5ZD9rZXk9YTE3ZmM5OTM5MDlkMDliODI0Yzg3N2RlZTI4OTBjMjU=") {
                ... on Checkout {
                  id
                  webUrl
                }
              }
            }
            `,
        }).then((checkout)=>{
          console.log("di: ", checkout)
        })
      })
      .catch(error => console.error(error));
  }

  pushRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }
}
