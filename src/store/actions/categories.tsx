import { CATEGORY_FETCH, CATEGORY_FETCH_FAIL } from "../types";
import { BASE_URL, token } from "../../../api.config";

const fetchCategories = () => async (dispatch: any) => {
    const response = await fetch(`${BASE_URL}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).catch(err =>
        dispatch({
            type: CATEGORY_FETCH_FAIL,
            payload: []
        })
    );
    const data = await response.json();
    if (response.status === 200) {
        dispatch({
            type: CATEGORY_FETCH,
            payload: data.categories
        });
    }
}

export {
    fetchCategories,
}
