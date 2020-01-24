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

export const updateSnapcash = function(data) {
    const { userSC, reviewerSC, userId, reviewerId } = data;
    const info = {
        userSC,
        reviewerSC
    }
    
    return axios.put(`/users/snapcash/${reviewerId}/${userId}`, info).then((result) =>{
        console.log(result);
        return {status: true};
    })
}

export const findByIdAndUpdateLikes = function(userid, likes){
    return axios.put(`/users/rating/${userid}`, {likes}).then(result => {
        return result
    }).catch(() => {
        return {status: false};
    });
}
