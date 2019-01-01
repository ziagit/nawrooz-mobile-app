
import { Injectable } from '@angular/core';


@Injectable()
export class DataProvider {

  imageSlides = [
    {
      id: 1,
      img: 'assets/imgs/IVA-mobiles.jpg'
    },
    {
      id: 2,
      img: 'assets/imgs/Kent2.jpg'
    },
    {
      id: 3,
      img: 'assets/imgs/Prime-moiles.jpg'
    },
    {
      id: 4,
      img: 'assets/imgs/Supper-Cola.jpg'
    }
  ]
  getImages() {
    return this.imageSlides;
  }

 
}
