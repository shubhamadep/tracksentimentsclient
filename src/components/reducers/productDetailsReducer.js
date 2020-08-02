
export const productDetailsReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_PRODUCT_DETAILS':
            return [
                {
                    listedProductsAndDetails: action.amazonScrapperAPIData.listedProductsAndDetails,
                    statusCode: action.amazonScrapperAPIData.statusCode,
                    sellerName: action.amazonScrapperAPIData.sellerName,
                    sellerRating: action.amazonScrapperAPIData.sellerRating,
                    productCount: action.amazonScrapperAPIData.productCount,
                    sellerReviews: action.amazonScrapperAPIData.sellerReviews
                }
            ]
    }
}