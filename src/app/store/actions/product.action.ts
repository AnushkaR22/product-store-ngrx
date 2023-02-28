import { ProductActionTypes } from './product.action.types';
import { Cart, Products } from '../models/product.model';
import { Action } from '@ngrx/store';

export class AddProductToCart implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT_TO_CART;

    constructor(public payload: Cart) {
    }
}

export class RemoveProductFromCart implements Action {
    readonly type = ProductActionTypes.REMOVE_PRODUCT_FROM_CART;

    constructor(public payload: string) {
    }
}

export class IncrementCartQuantity implements Action {
    readonly type = ProductActionTypes.INCREMENT_CART_ITEM_QUANTITY;

    constructor(public payload: string) {
    }
}

export class DecrementCartQuantity implements Action {
    readonly type = ProductActionTypes.DECREMENT_CART_ITEM_QUANTITY;

    constructor(public payload: string) {
    }
}

export type ProductActions =  AddProductToCart | RemoveProductFromCart | IncrementCartQuantity | DecrementCartQuantity;
