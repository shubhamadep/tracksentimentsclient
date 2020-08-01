import React, { Component, useContext } from 'react';
import { ProductDetailsContext } from 'contexts/ProductDetailsContext';

const DisplayAPIData = () => {
    const contextData = useContext(ProductDetailsContext)
    const { listedProductsAndDetails, statusCode } = contextData.data
    const displayData = statusCode ? listedProductsAndDetails : "No data fetched using API. Please try again.."
    return (  
        <div>
            {displayData}
        </div>
    );
}
 
export default DisplayAPIData;
