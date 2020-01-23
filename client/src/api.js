import axios from 'axios';

export const fetchProducts =  function() {    
    return axios.get('/products')
    .then((result) => {
        return result.data
    })
    .catch(e => {
        console.warn(e);
    })
};

export const fetchUsers =  function() {
    return axios.get('/users')
    .then((result) => {
        return result.data
    })
    .catch(e => {
        console.warn(e);
    })
}

export const fetchRecentBuyers = function(pogid) {
    return axios.get(`/products/${pogid}`)
    .then((result) => {
        const productData = result.data;
        if(productData) {
            return productData[0].recentlyPurchasedUsers
        }
    })
    .catch(e => {
        console.warn(e);
    })
}
