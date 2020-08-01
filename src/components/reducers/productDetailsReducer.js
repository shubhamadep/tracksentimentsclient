export const productDetailsReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_PRODUCT_DETAILS':
            return [
                {
                    listedProductsAndDetails: action.amazonScrapperAPIData.listedProductsAndDetails,
                    statusCode: action.amazonScrapperAPIData.statusCode
                }
            ]
    }
}