import React, { useState, useContext } from 'react';
import { Paper, InputBase, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import { getProductDetails } from 'util/product';
import { ProductDetailsContext } from '../../contexts/ProductDetailsContext';
import Badge from '@material-ui/core/Badge';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        backgroundColor: theme.palette.primary.background,
        height: '100vh'
    },
    inputBar: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: '2vh',
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        padding: '8px 10px'
      },
      iconButton: {
        padding: 10,
      },
}))
export default function SearchBar({setGettingData, setSellerID, sellerID}) {
    const classes = useStyles()
    const [value, setValue] = useState(sellerID);
    let products = {};
    const { productDetails, dispatch } = useContext(ProductDetailsContext)

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const defaultProps = {
      color: 'secondary',
      children: <PlayArrowIcon />,
    };

    async function handleGoClick() {

        setGettingData(true);
        setSellerID(value);
        products = await getProductDetails(value);     
        /*alert(JSON.stringify(products, null, 4));*/
        console.log(products)

        dispatch({type: 'UPDATE_PRODUCT_DETAILS', amazonScrapperAPIData: {
          listedProductsAndDetails: products['items'],
          statusCode: true,
          sellerName: products['sellerName'],
          sellerRating: products['seller_rating'],
          productCount: products['product_count'],
          sellerReviews: products['seller_review']
        }})

        setGettingData(false);
    };
    
    if(Object.keys(products).length === 0){

      console.log(sellerID);
      return(
              <div style={{ display: "flex" , width: '100%'}}>
                <Paper component="form" className={classes.inputBar} >
                  <InputBase
                    placeholder="Enter Amazon Seller ID"
                    className={classes.input}
                    inputProps={{ 'aria-label': 'seller id' }}
                    onChange={handleChange}
                    defaultValue={sellerID}
                  />
                  <IconButton type="submit" aria-label="search" align='right' onClick={handleGoClick}>
                    <Badge className={classes.iconButton} color="primary" badgeContent={"Try"} {...defaultProps} />
                  </IconButton>
                </Paper>
              </div>
        )

    }
}