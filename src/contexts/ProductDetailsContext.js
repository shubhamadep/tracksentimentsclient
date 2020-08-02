import React, { createContext, useReducer } from 'react';
import { productDetailsReducer } from 'components/reducers/productDetailsReducer.js'

export const ProductDetailsContext = createContext();

const ProductDetailsProvider = (props) => {
    const [productDetails, dispatch] = useReducer(productDetailsReducer, {
        listedProductsAndDetails: {},
        statusCode: false,
        gettingData: false
    });
    return (
        <ProductDetailsContext.Provider value={{productDetails, dispatch}}>
            {props.children}
        </ProductDetailsContext.Provider>
    );
}
 
export default ProductDetailsProvider;


// This code snippet can be used; if we dont need the reducer. 

// const ProductDetailsProvider = (props) => {
//     const [data, setproductDetails] = useState({
//         productDetails: 'Shubham',
//         fetchedData: false
//     });
//     return (
//         <ProductDetailsContext.Provider value={{data}}>
//             {props.children}
//         </ProductDetailsContext.Provider>
//     );
// }