import { Component, OnInit } from '@angular/core';
import { Cart, Products } from '../store/models/product.model';

import { ToastrService } from 'ngx-toastr';
import { select, Store } from '@ngrx/store';
import { AddProductToCart, RemoveProductFromCart, IncrementCartQuantity, DecrementCartQuantity } from '../store/actions/product.action';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productArray: Products[];
  cartData: Cart[];
  quantity: number = 1;

  constructor(private store: Store<fromApp.AppState>,  private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.getProductsList();
    this.getCartProducts();
  }

  // getting products from API
  getProductsList() {
    this.store.select(state => {
      return state;
    }).subscribe(state => {
      this.productArray = state.shop.products;
    })
  }

  // adding product to cart
  addToCart(product: Products) {
    const productItem: Cart = {
      id: new Date().getTime().toString(),
      product: product,
      quantity: this.quantity
    }
    this.store.dispatch(new AddProductToCart(productItem));
    this.toastr.success('Successfully', 'Product added', { timeOut: 500 });
  }

  
  // get cart products from localstorage 
  getCartProducts() {
    this.store.select('shop').subscribe(shop => {
      this.cartData = shop.cart;
    });
  }

  // check weather the product is present in cart or not
  productInCart(product) {
    return this.cartData.findIndex(p => p.product.id == product.id) != -1;
  }

  onIncrementCartItem(productId: string): void {
    this.store.dispatch(new IncrementCartQuantity(productId));
  }

  onDecrementCartItem(productId: string): void {
    this.store.dispatch(new DecrementCartQuantity(productId));
  }

  onRemoveCartItem(productId: string): void {
    this.store.dispatch(new RemoveProductFromCart(productId));
  }
}
