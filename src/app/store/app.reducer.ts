import {ActionReducerMap} from '@ngrx/store';

import * as fromShop from './reducers/product.reducer';

export interface AppState {
  shop: fromShop.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shop: fromShop.productReducer
};

