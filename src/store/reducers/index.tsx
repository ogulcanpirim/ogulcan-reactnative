import { combineReducers } from 'redux';
import ProductReducer from './products';
import CategoryReducer from './categories';

const appReducer = combineReducers({
    ProductReducer,
    CategoryReducer,
});

export default appReducer;

export type RootState = ReturnType<typeof appReducer>;