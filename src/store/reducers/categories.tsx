import { CATEGORY_FETCH, CATEGORY_FETCH_FAIL } from '../types';

const initialstate = {
    categories: [],
};

type Action = {
    type: string,
    payload?: any
}

export default (state: any = initialstate, action: Action) => {
    switch (action.type) {
        case CATEGORY_FETCH:
            return {
                ...state,
                categories: action.payload,
                error: false,
            };
        case CATEGORY_FETCH_FAIL:
            return {
                ...state,
                categories: [],
                error: true
            };
        default:
            return state;
    }
};