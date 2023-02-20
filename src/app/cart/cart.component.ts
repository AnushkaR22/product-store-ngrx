import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../interface/cart.interface';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cartData: Cart[];
  productQuantity: number = 0;
  cartTotal: number = 0;

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.getCartProducts();
    this.calculateTotal();
  }

  // get cart products from localstorage 
  getCartProducts() {
    this.productQuantity = 0;
    this.cartData = JSON.parse(localStorage.getItem('cart_items'));
    this.cartData.forEach((item: any) => {
      if (item.product.id) {
        this.productQuantity += item.quantity;
      }
    });
    this.calculateTotal();
  }

  // increment quantity of product
  incrementQty(index: number) {
    this.cartData[index].quantity = this.cartData[index].quantity + 1;
    this.cartService.updateCart(this.cartData);
    this.getCartProducts();
    this.calculateTotal();
  }

  // decrement quantity of product
  decrementQty(index: number) {
    if (this.cartData[index].quantity > 1) {
      this.cartData[index].quantity = this.cartData[index].quantity - 1;
      this.cartService.updateCart(this.cartData);
    }
    else {
      this.deleteProduct(index);
    }
    this.getCartProducts();
    this.calculateTotal();
  }

  // total amount for all the products in cart
  calculateTotal() {
    this.cartTotal = 0;
    this.cartData.forEach((product: any) => {
      product.product.total = product.product.price * product.quantity;
      this.cartTotal += product.product.total;
    })
  }

  // delete an item from cart
  deleteProduct(id: number) {
    let indextodelete = id;
    let result = this.cartData.splice(indextodelete, 1);
    this.cartService.updateCart(this.cartData);
    this.getCartProducts();
  }
}
