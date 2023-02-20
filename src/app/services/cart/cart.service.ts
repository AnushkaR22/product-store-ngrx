import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AddProductToCart, Products } from 'src/app/interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: any[] = [];
  subject = new Subject<any>();

  constructor() { }

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
    this.subject.next('changed');
  }

  addToCart(addedProduct: AddProductToCart) {
    this.items.push(addedProduct);
    this.saveCart();
  }

  getCartProducts() {
    return localStorage.getItem('cart_items');
  }

  clearCart() {
    localStorage.clear();
  }

  updateCart(product: any) {
    localStorage.setItem('cart_items', JSON.stringify(product));
  }

}