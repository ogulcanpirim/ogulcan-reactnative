import { PRODUCT_FETCH, PRODUCT_ADD, PRODUCT_FETCH_FAIL } from '../types';
import ProductType from '../types/product';

const initialstate = {
    products: [],
};



type Action = {
    type: string,
    payload?: ProductType[]
}

export default (state: any = initialstate, action: Action) => {
    switch (action.type) {
        case PRODUCT_FETCH:
            return {
                ...state,
                products: action.payload,
                error: false,
            };
        case PRODUCT_ADD:
            return {
                ...state,
                products: [...state.products, action.payload],
                error: false,
            }
        case PRODUCT_FETCH_FAIL:
            return {
                ...state,
                products: [],
                error: true
            }
        default:
            return state;
    }
};