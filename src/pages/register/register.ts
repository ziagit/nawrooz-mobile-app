import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ShopifyProvider } from '../../providers/shopify';
import gql from 'graphql-tag';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  visibility: boolean = false;
  private form: FormGroup;
  customerToken:string;
  countries = [
    { id: 1, name: 'Afghanistan' },
    { id: 2, name: 'India' },
    { id: 3, name: 'Pakistan' },
    { id: 4, name: 'Iran' },
    { id: 5, name: 'Turkish' }
  ]

  constructor(private storage: Storage,private shopify: ShopifyProvider, private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.form = this.fb.group({
      "email": [null, Validators.required],
      "password": [null, Validators.required],
      "password_confirmation": [null, Validators.required],
    });
  }

  ionViewDidLoad() { }
  showHideList() {
    if (this.visibility == false)
      this.visibility = true
    else
      this.visibility = false
  }

  registerCustomer() {
    this.shopify.client.mutate({
      mutation: gql`
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            userErrors {
              field
              message
            }
            customer {
              id
              email
            }
          }
        }
      `, variables: {
        "input": {
          "email": this.form.controls.email.value,
          "password": this.form.controls.password.value
        }
      }
    })
      .then(data => {
        console.log("Customer created:", data);
        this.getCustomerAccessToken();
        this.form.reset();
        this.navCtrl.push(LoginPage)
      },
        err => { console.log("This email is already registered.", err) })
  }
  getCustomerAccessToken(){
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
      `, variables:{
        "input": {
          "email": this.form.controls.email.value,
          "password": this.form.controls.password.value
        }
      }
    })
      .then(accessToken =>{
        this.storage.set('customerToken', accessToken);
      })
      .catch(error => console.error(error));
  }
}
