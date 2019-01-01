import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }


  colors = [
    {
      id: 1,
      label: '',
      color: 'red'
    }, {
      id: 2,
      label: '',
      color: 'green'
    }, {
      id: 3,
      label: '',
      color: 'blue'
    }, {
      id: 4,
      label: '',
      color: 'yellow'
    }, {
      id: 4,
      label: '',
      color: 'gray'
    }
  ]
  sizes = [
    {
      id: 1,
      label: '24',
      color: 'red'
    }, {
      id: 2,
      label: '48',
      color: 'green'
    }, {
      id: 3,
      label: '80',
      color: 'blue'
    }, {
      id: 4,
      label: '54',
      color: 'yellow'
    }
  ]
  vendors = [
    {
      id: 1,
      label: 'RIVO',
      color: 'red'
    }, {
      id: 2,
      label: 'PRIME',
      color: 'green'
    }
  ]
}
