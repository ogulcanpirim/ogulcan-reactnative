import { PRODUCT_FETCH, PRODUCT_ADD, PRODUCT_FETCH_FAIL, PRODUCT_ADD_FAIL } from "../types";
import ProductType from "../types/product";
import { BASE_URL, token } from "../../../api.config";

const fetchProducts = () => async (dispatch: any) => {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).catch(() =>
        dispatch({
            type: PRODUCT_FETCH_FAIL,
            payload: []
        })
    );
    const data = await response.json();
    if (response.status === 200) {
        dispatch({
            type: PRODUCT_FETCH,
            payload: data.products
        });
    }
}

const addProduct = (product: ProductType) => async (dispatch: any) => {
    
    const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    }).catch(() =>
        dispatch({
            type: PRODUCT_ADD_FAIL,
            payload: []
        })
    );

    if (response.status === 200 || response.status === 201) {
        dispatch({
            type: PRODUCT_ADD,
            payload: product
        });
    }
}

export {
    fetchProducts,
    addProduct,
}
