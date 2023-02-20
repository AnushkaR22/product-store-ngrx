import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProductToCart, Products } from '../interface/product.interface';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../interface/cart.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productArray!: Products[];
  productQuantity: number = 0;
  cartData: Cart[];
  quantity: number = 1;

  constructor(private productService: ProductService, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProductsList();
    this.getCartProducts();
  }

  // getting products from API
  getProductsList() {
    this.productService.getProduct().subscribe({
      next: (product: any) => {
        this.productArray = product;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    })
  }

  getCartProducts() {
    this.productQuantity = 0;
    this.cartData = JSON.parse(localStorage.getItem('cart_items'));
    this.cartData.forEach((item: any) => {
      this.productQuantity += item.quantity;
    });
  }


  // adding product to cart
  addToCart(product: Products) {
    const productItem: AddProductToCart = {
      id: new Date().getTime().toString(),
      product: product,
      quantity: this.quantity
    }
    this.cartService.addToCart(productItem);
    this.getCartProducts();
    this.toastr.success('Successfully', 'Product added', { timeOut: 500 });
  }

  // check weather the product is present in cart or not
  productInCart(product) {
    return this.cartData.findIndex(p => p.product.id == product.id) != -1;
  }

  // delete product from cart
  deleteProduct(id: number) {
    let indextodelete = id;
    let result = this.cartData.splice(indextodelete, 1);
    this.cartService.updateCart(this.cartData);
    this.getCartProducts();
  }

  // increment quantity of product
  incrementQty(index: number) {
    this.cartData[index].quantity = this.cartData[index].quantity + 1;
    this.cartService.updateCart(this.cartData);
    this.getCartProducts();
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
  }
}
