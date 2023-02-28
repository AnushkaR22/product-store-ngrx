import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../store/models/product.model';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { IncrementCartQuantity, DecrementCartQuantity, RemoveProductFromCart } from '../store/actions/product.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cartData: Cart[];
  productQuantity: number = 0;
  cartTotal: number = 0;

  constructor(private store: Store<fromApp.AppState>, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getCartProducts();
  }

  // get cart products from localstorage 
  getCartProducts() {
    this.store.select('shop').subscribe(shop => {
      this.cartTotal = shop.cart.reduce((count, curItem) => {
        return count + (curItem.quantity * curItem.product.price);
      }, 0);
      this.cartData = shop.cart;
    });
  }

  // increment cart item
  onIncrementCartItem(productId: string): void {
    this.store.dispatch(new IncrementCartQuantity(productId));
  }

  // decrement cart item
  onDecrementCartItem(productId: string): void {
    this.store.dispatch(new DecrementCartQuantity(productId));
  }

  // remove item from cart
  onRemoveCartItem(productId: string): void {
    this.store.dispatch(new RemoveProductFromCart(productId));
    this.toastr.success('Successfully', 'Product removed from cart', { timeOut: 500 });
  }
}
