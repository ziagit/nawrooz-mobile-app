import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'page-product-variant',
  templateUrl: 'product-variant.html',
})
export class ProductVariantPage {

  hasVariant: boolean = true;
  variants = [];
  itemTitle:string;
  form: FormGroup;
  constructor(private fb: FormBuilder, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.form = this.fb.group({
      selectedItem: [this.navParams.get('product').variants[0].id, Validators.required]
    });
  }

  ionViewDidLoad() {
    if (this.navParams.get('product').variants.length == 1) {
      this.variants = this.navParams.get('product').variants;
      this.itemTitle=this.navParams.get('product').title;
      this.hasVariant=false;
    } else {
      this.variants = this.navParams.get('product').variants;
    }
  }
  addItem() {
    this.viewCtrl.dismiss(this.form);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
