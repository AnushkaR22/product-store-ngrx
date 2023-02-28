import { Cart, Products } from '../models/product.model';
import * as ProductActions from '../actions/product.action'
import { ProductActionTypes } from '../actions/product.action.types';
import { product } from 'src/app/data/products';

export interface State {
    products: Array<Products>;
    cart: Array<Cart>;
}

const initialState: State = {
    products:product,
    cart: []
};

export function productReducer(state = initialState, action: ProductActions.ProductActions) {
    let updatedCart;
    let updatedItemIndex;

    switch (action.type) {

        case ProductActionTypes.INCREMENT_CART_ITEM_QUANTITY:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item.id === action.payload
            );

            if (updatedCart[updatedItemIndex].quantity > 9) {
                return state;
            }

            const incrementedItem = {
                ...updatedCart[updatedItemIndex]
            };

            incrementedItem.quantity++;

            updatedCart[updatedItemIndex] = incrementedItem;


            return { ...state, cart: updatedCart };

        case ProductActionTypes.DECREMENT_CART_ITEM_QUANTITY:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item.id === action.payload
            );

            if (updatedCart[updatedItemIndex].quantity < 2) {
                return state;
            }


            const decrementedItem = {
                ...updatedCart[updatedItemIndex]
            };

            decrementedItem.quantity--;

            updatedCart[updatedItemIndex] = decrementedItem;

            return { ...state, cart: updatedCart };

        case ProductActionTypes.ADD_PRODUCT_TO_CART:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(item => item.id === action.payload.id);

            if (updatedItemIndex < 0) {
                updatedCart.push({ ...action.payload, quantity: 1 });
            } else {
                const updatedItem = {
                    ...updatedCart[updatedItemIndex]
                };

                updatedItem.quantity++;
                updatedCart[updatedItemIndex] = updatedItem;
            }

            return { ...state, cart: updatedCart };
        case ProductActionTypes.REMOVE_PRODUCT_FROM_CART:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item.id === action.payload
            );

            updatedCart.splice(updatedItemIndex, 1);

            return { ...state, cart: updatedCart };
        default:
            return state;

    }

}
