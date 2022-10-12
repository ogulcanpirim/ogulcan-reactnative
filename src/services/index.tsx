const BASE_URL = 'https://upayments-studycase-api.herokuapp.com/api';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9waXJpbUBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vb2d1bGNhbnBpcmltIiwiaWF0IjoxNjY1MzUxMDYyLCJleHAiOjE2NjU3ODMwNjJ9.nfcg5rZcwcYTc4jVWbM3lF8Qr19aKqKLefAXSjf4BEQ';

export const getProducts = async () => {

    const response = await fetch(`${BASE_URL}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return response.json();

}

export const getCategories = async () => {

    const response = await fetch(`${BASE_URL}/categories/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return response.json();
}

export const addProduct = async (product: Object) => {

    const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
    return response.json();
}